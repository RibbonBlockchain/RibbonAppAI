import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
};

const PinResetSuccessful: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => router.push("/account")}
      >
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
              <Dialog.Panel className="w-[260px] max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="mt-2 p-4">
                  <p className="text-center text-lg text-[#080808] font-bold ">
                    Pin Updated!
                  </p>

                  <hr className="h-[1px] mt-4" />

                  <p
                    onClick={() => router.push("/account")}
                    className="mt-4 mb-4 text-center text-lg font-bold text-[#7C56FE]"
                  >
                    OK
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PinResetSuccessful;
