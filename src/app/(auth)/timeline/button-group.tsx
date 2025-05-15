"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { parseEther } from "viem";
import abi from "./Abi.json";
import abi2 from "./Abi2.json";
import Web3 from "web3";
import { useAddTokenAddress } from "@/api/timeline/index";

const ButtonGroup = () => {
  const { address } = useAccount();
  const network = baseSepolia;
  const bounding_curve = "0xE7bAB14fd484562b53c91c625D16368beb494DD3";
  const ribbonfactory = "0x0008ACAFe1024E1CE8e5CB628Cf302A94375938e";
  const [memetoken, setMemetoken] = useState(
    "0x18d63D4D460909E277d9744792D220F0B6aF0990"
  );

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Token creation form states
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  // Buy/Sell states
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("5");
  const [isPending, setIsPending] = useState(false);

  const { data: writeData, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({ hash: writeData });

  const { mutate: addTokenAddress } = useAddTokenAddress();

  const result = useReadContract({
    abi,
    address: ribbonfactory,
    functionName: "memeIdentifcation",
    args: [address],
    chainId: network.id,
  });

  console.log("result data:", result.data);
  console.log("address", address);

  useEffect(() => {
    if (receipt) {
      async function fetchAddressAndData() {
        const web3 = new Web3(
          "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G"
        );
        const contract = new web3.eth.Contract(abi, ribbonfactory);
        const checkadd = await contract.methods
          .memeIdentifcation(address)
          .call();

        console.log("checkadd ===>", checkadd);

        // @ts-ignore
        const contract2 = new web3.eth.Contract(abi2, checkadd);
        const tokenposturl = await contract2.methods.posturl().call();
        console.log(tokenposturl, "tokenpost url");

        console.log("call endpoint here to save address to bakend");
        console.log(result?.data, "result?");
        console.log("successfull");

        addTokenAddress({ body: { address: "", embedId: "" } });
      }
      fetchAddressAndData();
    }
  }, [receipt]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createMeme = async () => {
    if (!name || !symbol || !embedUrl) return;
    setIsPending(true);

    try {
      await writeContract({
        abi,
        address: ribbonfactory,
        functionName: "createMemecoin",
        args: [address, bounding_curve, name, symbol, embedUrl],
        value: parseEther("0.0000002"),
        chain: network,
        account: address,
      });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating meme:", error);
    } finally {
      setIsPending(false);
    }
  };

  const buyMeme = async () => {
    if (!amount || isNaN(Number(amount))) return;
    setIsPending(true);

    try {
      const web3 = new Web3(
        "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G"
      );

      const contract = new web3.eth.Contract(abi2, memetoken);
      const tokenamount = await contract.methods
        .getEthBuyQuote(Number(amount) * 10 ** 18)
        .call();

      const slipage = Number(slippage) || 5;
      const amountafterslip =
        Number(tokenamount) - Number(tokenamount) * (slipage / 100);
      const amountafterslips = BigInt(amountafterslip);
      console.log(amountafterslips, amountafterslips.toString());

      await writeContract({
        abi: abi2,
        address: "0x18d63D4D460909E277d9744792D220F0B6aF0990",
        functionName: "buy",
        args: [address, address, 0, 0],
        value: parseEther(amount),
        chain: network,
        account: address,
      });
      setIsBuyModalOpen(false);

      console.log("buy successful");
    } catch (error) {
      console.error("Error buying meme:", error);
    } finally {
      setIsPending(false);
    }
  };

  const sellMeme = async () => {
    if (!amount || isNaN(Number(amount))) return;
    setIsPending(true);

    try {
      const web3 = new Web3(
        "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G"
      );

      const contract = new web3.eth.Contract(abi2, memetoken);
      const tokenamount = await contract.methods.balanceOf(address).call();
      const sellAmount = parseEther(amount);

      if (Number(sellAmount) > Number(tokenamount)) {
        alert("You don't have enough tokens");
        return;
      }

      const ethamount = await contract.methods
        .getTokenSellQuote(sellAmount)
        .call();
      console.log(ethamount, "ll");

      const slipage = Number(slippage) || 5;
      const amountafterslip =
        Number(ethamount) - Math.round(Number(ethamount) * (slipage / 100));
      const amountafterslips = BigInt(amountafterslip);

      await writeContract({
        abi: abi2,
        address: "0x18d63D4D460909E277d9744792D220F0B6aF0990",
        functionName: "sell",
        args: [sellAmount, address, 0, amountafterslips],
        chain: network,
        account: address,
      });

      console.log("sell successful");

      setIsSellModalOpen(false);
    } catch (error) {
      console.error("Error selling meme:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Token
        </button>
        <button
          onClick={() => setIsBuyModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Buy Meme
        </button>
        <button
          onClick={() => setIsSellModalOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sell Meme
        </button>
      </div>

      {/* Create Token Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Token</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="Token Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Symbol</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="Token Symbol"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Embed URL
              </label>
              <input
                type="text"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="https://example.com/meme"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Logo</label>
              <input
                type="file"
                onChange={handleLogoChange}
                className="w-full p-2 border rounded bg-inherit"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2 h-16 w-16 object-cover"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="Token description"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={createMeme}
                disabled={!name || !symbol || !embedUrl || isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buy Token Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Buy Meme Tokens</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Amount (ETH)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="0.00"
                step="0.0001"
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Slippage (%)
              </label>
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="5"
                min="0"
                max="100"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={buyMeme}
                disabled={!amount || isNaN(Number(amount)) || isPending}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isPending ? "Processing..." : "Buy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Token Modal */}
      {isSellModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0B0228] rounded-lg shadow-xl text-white p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Sell Meme Tokens</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Amount (Tokens)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="0.00"
                step="1"
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Slippage (%)
              </label>
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-full p-2 border rounded bg-inherit"
                placeholder="5"
                min="0"
                max="100"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsSellModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={sellMeme}
                disabled={!amount || isNaN(Number(amount)) || isPending}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isPending ? "Processing..." : "Sell"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
