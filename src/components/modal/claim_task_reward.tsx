import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
};

const ClaimTaskReward: React.FC<Props> = (props) => {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mt-2 p-4">
                  <Dialog.Title
                    as="h3"
                    className={cn(
                      "text-2xl text-center px-6 py-4 font-bold  text-black"
                    )}
                  >
                    Successful!
                  </Dialog.Title>

                  <p className="text-center text-base text-[#434343] font-normal ">
                    Your responses have been recorded successfully
                  </p>

                  <Button
                    onClick={props.handleClick}
                    className="rounded-md mt-16 mb-4"
                  >
                    Claim your reward
                    <Image
                      src="/images/questionnaire/coins.png"
                      alt="coins"
                      width={22}
                      height={18}
                    />
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

export default ClaimTaskReward;
