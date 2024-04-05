import Image from "next/image";
import Button from "../button";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  closeModal?: () => void;
};

const VerifyIdentity: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => router.push("/dashboard")}
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
          <div className="fixed inset-0 bg-black/5" />
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
                  <Image
                    src={"/images/group.png"}
                    alt="verify-identity"
                    width={100}
                    height={100}
                    className="flex mx-auto"
                  />

                  <Dialog.Title
                    as="h3"
                    className={cn(
                      "text-2xl text-center px-6 py-4 font-bold  text-black"
                    )}
                  >
                    Let’s verify your identity{" "}
                  </Dialog.Title>

                  <p className="text-center text-base text-[#434343] font-normal ">
                    To keep your account safe, verification is required to
                    access withdrawals
                  </p>

                  <Button
                    onClick={() => router.push("/account/kyc")}
                    className="rounded-lg text-base font-bold mt-16 mb-4 "
                  >
                    Verify Identity
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

export default VerifyIdentity;
