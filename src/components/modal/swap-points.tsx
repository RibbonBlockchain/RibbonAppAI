import Image from "next/image";
import Button from "../button";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";
import { ArrowDownUp, ArrowLeft } from "lucide-react";
import { SpinnerIcon } from "../icons/spinner";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  pointInput: string;
  handlePointInput: (e: any) => void;
  isPending: any;
  pointsBalance: any;
  wldBalance: any;
};

const SwapPointToWorldToken: React.FC<Props> = (props) => {
  const router = useRouter();

  const WLDValue = Number(props.pointInput) / 5000;
  const WLDTotalValue = WLDValue * 4.8;

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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[95%] max-w-[480px] h-full px-4 py-10  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16">
                  <ArrowLeft stroke="#939393" onClick={props.closeModal} />
                  <div className="flex -mt-10 text-black  flex-row items-center justify-center text-base font-semibold">
                    Swap
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <div className="border rounded-[10px] p-4">
                    <div className="flex mb-4 flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-[35px] h-[35px] flex items-center ">
                          <Image
                            width={35}
                            height={35}
                            src={"/images/ribbon.svg"}
                            alt="coin logo"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-base font-normal">PTS</p>
                          <p className="text-xs text-[#626262]">
                            {props.pointsBalance} Points
                          </p>
                        </div>
                      </div>
                      <ArrowDownUp stroke="#7C56FE" />
                    </div>

                    <hr />

                    <div className="flex mt-4 flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          value={props.pointInput}
                          onChange={props.handlePointInput}
                          className="border-none py-2 px-2 rounded-md w-[90%]"
                          placeholder="0"
                        />
                        <p>$ 0</p>
                      </div>
                      <p>Sell</p>
                    </div>
                  </div>

                  <ArrowDownUp stroke="#7C56FE" className="self-center flex" />

                  <div className="border rounded-[10px] p-4">
                    <div className="flex mb-4 flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-[35px] h-[35px] flex items-center ">
                          <Image
                            width={35}
                            height={35}
                            src={"/images/world-coin.png"}
                            alt="coin logo"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-base font-normal">Worldcoin</p>
                          <p className="text-xs text-[#626262]">
                            {props.wldBalance} WLD
                          </p>
                        </div>
                      </div>
                      <ArrowDownUp stroke="#7C56FE" />
                    </div>

                    <hr />

                    <div className="flex mt-4 flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p>{WLDValue} WLD</p>
                        <p>$ {WLDTotalValue}</p>
                      </div>
                      <p>Buy</p>
                    </div>
                  </div>
                </div>

                <div className="w-[60%] flex items-center justify-center mx-auto mt-2 p-4">
                  <Button
                    disabled={props.isPending}
                    onClick={props.handleClick}
                    className="rounded-md mt-16 mb-4"
                  >
                    {props.isPending ? <SpinnerIcon /> : "Swap"}
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

export default SwapPointToWorldToken;
