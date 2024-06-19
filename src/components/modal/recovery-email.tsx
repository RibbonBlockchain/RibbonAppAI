import Image from "next/image";
import Button from "../button";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ArrowDown, ArrowDownUp, ArrowLeft, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  recoveryEmail: string;
  handleRecoveryEmailChange: (e: any) => void;
};

const RecoveryEmailModal: React.FC<Props> = (props) => {
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

        <div className="fixed inset-0 h-[screen] overflow-y-auto">
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
              <Dialog.Panel className="w-[95%] max-w-[380px] h-full px-4 py-10  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mb-16 flex flex-end self-end">
                  <X stroke="#939393" onClick={props.closeModal} />
                </div>

                <div className="flex -mt-10 text-black  flex-row items-center justify-center text-sm font-normal">
                  Recover your wallet with your recovery email address
                </div>

                <input
                  type="email"
                  value={props.recoveryEmail}
                  onChange={props.handleRecoveryEmailChange}
                  className="w-full border mt-5 py-4 px-2 rounded-md text-sm font-normal text-[#434343] break-words"
                  placeholder="Enter your recovery email here"
                />

                <div className="w-[60%] flex items-center justify-center mx-auto p-4">
                  <Button
                    onClick={props.handleClick}
                    className="rounded-md mt-8"
                  >
                    Continue
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

export default RecoveryEmailModal;
