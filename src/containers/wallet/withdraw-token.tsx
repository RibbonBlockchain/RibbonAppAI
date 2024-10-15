import Image from "next/image";
import React, { Fragment } from "react";
import Button from "@/components/button";
import { Transition, Dialog } from "@headlessui/react";
import { SpinnerIcon } from "@/components/icons/spinner";
import { ArrowDownUp, ArrowLeft, InfoIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  destination: string;
  handleDestinationInput: (e: any) => void;
  amount: string;
  handleAmountInput: (e: any) => void;
  isPending: any;
  usdcTokenBalance: any;
  USDvalue: any;
};

const WithdrawUSDCToken: React.FC<Props> = (props) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <div className="overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[480px] mb-0 px-4 py-10 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-12">
                  <ArrowLeft stroke="#939393" onClick={props.closeModal} />
                  <div className="flex -mt-6 text-black flex-row items-center justify-center text-base font-semibold">
                    Send
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-sm">Send from</p>
                    <div className="border rounded-[10px] p-4 flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-[35px] h-[35px] flex items-center ">
                          <Image
                            width={35}
                            height={35}
                            src={"/assets/usdc.png"}
                            alt="coin logo"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-base font-semibold">USDC</p>
                          <p className="text-xs text-[#626262]">
                            Balance: {props.usdcTokenBalance} USDC
                          </p>
                        </div>
                      </div>
                      <ArrowDownUp stroke="#7C56FE" width={18} height={18} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-sm">To</p>
                    <input
                      type="text"
                      value={props.destination}
                      onChange={props.handleDestinationInput}
                      className="border py-4 px-2 rounded-md text-sm font-medium text-[#434343] break-words"
                      placeholder=""
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <p className="font-semibold text-sm">Network</p>
                      <InfoIcon stroke="#000" width={14} height={14} />
                    </div>
                    <input
                      value={"Base Ethereum L2"}
                      className="w-full text-sm text-gray-500 py-3.5 px-2 border-[1px] border-[#F2EEFF] rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-sm">Amount</p>
                    <div className="border rounded-[10px] p-4 flex flex-col gap-2">
                      <div className="flex flex-row items-center justify-between">
                        <input
                          type="number"
                          value={props.amount}
                          onChange={props.handleAmountInput}
                          className="border-gray-200 border py-2 px-3 rounded-md w-[60%]"
                          placeholder="0"
                        />
                        <p>USDC</p>
                      </div>

                      <div className="flex gap-1 px-2 flex-row">
                        <p>{props.USDvalue}</p>
                        <p>USD</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[60%] flex items-center justify-center mx-auto mt-2 p-4">
                  <Button
                    disabled={props.isPending}
                    onClick={props.handleClick}
                    className="rounded-md mt-4 mb-4"
                  >
                    {props.isPending ? <SpinnerIcon /> : "Confirm"}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WithdrawUSDCToken;
