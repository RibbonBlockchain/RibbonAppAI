import React from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
} from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { parseEther } from "viem";
import abi from "./Abi.json";
import abi2 from "./Abi2.json";
import { useEffect } from "react";
import Web3 from "web3";
const ButtonGroup = () => {
  const { address } = useAccount();
  let network = baseSepolia;
  const bounding_curve = "0xE7bAB14fd484562b53c91c625D16368beb494DD3";
  const ribbonfactory = "0x0008ACAFe1024E1CE8e5CB628Cf302A94375938e";
  let memetoken = "0x18d63D4D460909E277d9744792D220F0B6aF0990";
  const { data: writeData, writeContract, isError } = useWriteContract();

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  console.log("isError", isError);
  console.log("address", address);

  useEffect(() => {
    if (receipt) {
      // <div className="flex gap-x-2 flex-col gap-y-2 items-center ">
      //   <span>successfully deployed your meme token</span>

      console.log("call endpoint here to save address to bakend");

      console.log(result?.data, "result?");

      console.log("successfull");
      //  checkContractAddress()
    }
  }, [receipt]);

  async function creatememe() {
    writeContract({
      abi,
      address: ribbonfactory,
      functionName: "createMemecoin",
      // name, symbol, emebdUrl props
      args: [
        address,
        bounding_curve,
        "Police",
        "POL",
        "https://www.tiktok.com/@slimblaqcomedy/video/7485300178245668101?is_from_webapp=1&sender_device=pc",
      ],
      // amount props
      value: parseEther("0.0000002"),
      chain: network,
      account: address,
    });
  }

  const result = useReadContract({
    abi,
    address: ribbonfactory,
    functionName: "memeIdentifcation",
    args: [address],
    chainId: network.id,
  });

  console.log("result data:", result.data);

  async function buymeme() {
    const web3 = new Web3(
      "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G"
    );
    const contract = new web3.eth.Contract(abi2, memetoken);
    // amount props
    const amount = 0.000002;
    const tokenamount = await contract.methods
      .getEthBuyQuote(amount * 10 ** 18)
      .call();

    // use this to get post url
    // const tokenposturl = await contract.methods.posturlC().call();
    // console.log(tokenposturl,"tokenpost url")

    // slippage props
    const slipage = 5;
    const amountafterslip =
      Number(tokenamount) - Number(tokenamount) * (slipage / 100);
    const amountafterslips = BigInt(amountafterslip);
    console.log(amountafterslips, amountafterslips.toString());
    writeContract({
      abi: abi2,
      address: "0x18d63D4D460909E277d9744792D220F0B6aF0990",
      functionName: "buy",
      args: [address, address, 0, 0],
      value: parseEther(`${amount}`),
      chain: network,
      account: address,
    });
  }

  async function sellmeme() {
    const web3 = new Web3(
      "https://base-sepolia.g.alchemy.com/v2/liLaWcC6Ivga84e3rgy3h2WbPmKEHO1G"
    );

    const contract = new web3.eth.Contract(abi2, memetoken);
    const tokenamount = await contract.methods.balanceOf(address).call();
    console.log(tokenamount, "balance");
    const ethamount = await contract.methods
      .getTokenSellQuote(tokenamount)
      .call();
    console.log(ethamount, "ll");
    const slipage = 5;
    const amountafterslip =
      Number(ethamount) - Math.round(Number(ethamount) * (slipage / 100));
    const amountafterslips = BigInt(amountafterslip);

    writeContract({
      abi: abi2,
      address: "0x18d63D4D460909E277d9744792D220F0B6aF0990",
      functionName: "sell",
      args: [tokenamount, address, 0, amountafterslips],
      chain: network,
      account: address,
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <button onClick={creatememe}>create token</button>
      <button onClick={buymeme}>Buy meme</button>
      <button onClick={sellmeme}>Sell meme</button>
    </div>
  );
};

export default ButtonGroup;
