import Button from "../button";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import BgEffect from "../questionnarie/bg-effect";
import Rating from "@/containers/dashboard/ratings";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onChange: (newRating: number) => void;
  handleSubmit: () => void;
};

const RateTaskModal: React.FC<Props> = (props) => {
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full z-10 max-w-md transform overflow-hidden rounded-t-[32px] rounded-b-[20px] bg-white text-left align-middle shadow-xl transition-all">
                <BgEffect />

                <div className="z-10 mt-2 p-4">
                  <Dialog.Title
                    as="h3"
                    className={cn("text-base py-4 font-bold text-black")}
                  >
                    You did it!
                  </Dialog.Title>

                  <p className="text-sm text-[#434343] font-normal ">
                    Tah dah! You just completed a live saving task. We help
                    thousands of users everyday to earn extra money to improve
                    their income. We want to help you too.
                  </p>

                  <div className="z-10 mt-8 p-4 flex flex-col gap-4 rounded-2xl bg-[#F2EEFF] text-[#434343]">
                    <p className="text-sm font-semibold">
                      How would you rate this survey?
                    </p>
                    <div className="z-10">
                      <Rating
                        initialRating={0}
                        maxRating={5}
                        onChange={props.onChange}
                        // onChange={(newRating: any) =>
                        //   console.log("New rating:", newRating)
                        // }
                      />
                    </div>
                    <div className="flex text-xs font-medium justify-between">
                      <p>Very bad</p>
                      <p>Very good</p>
                    </div>
                  </div>

                  <Button
                    onClick={props.handleSubmit}
                    className="rounded-xl mt-16 mb-10"
                  >
                    Submit
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

export default RateTaskModal;
