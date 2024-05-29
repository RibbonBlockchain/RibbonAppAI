import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

// dark mode implementation

const DailyRewardClaimedPage: React.FC<Props> = (props) => {
  const router = useRouter();

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[80%] max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1B1B1B] text-left align-middle shadow-xl transition-all">
                <div className="mt-8 mb-5 p-4">
                  <div className="flex w-full flex-col items-center justify-center ">
                    <div className="">
                      <Image
                        width={196}
                        height={250}
                        className=""
                        alt="giftbox"
                        src="/images/gift-box.png"
                      />
                    </div>

                    <h3 className="text-2xl flex flex-row gap-2 text-primary dark:text-white font-extrabold mt-10">
                      Reward claimed
                      <Image
                        width={30}
                        height={30}
                        alt="smiley-emoji"
                        src="/images/love-smiley-emoji.png"
                      />
                    </h3>

                    <div className="flex mt-2 flex-row items-center justify-center gap-1 w-[80%] py-2 rounded-full bg-[#F2eeff] dark:bg-[#151515]">
                      <Image
                        alt="cup"
                        width={29}
                        height={31}
                        src="/images/questionnaire/cup.png"
                      />
                      <span className="text-[12px] dark:text-white">
                        + 1000 points
                      </span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DailyRewardClaimedPage;
