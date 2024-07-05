"use client";

import { X } from "lucide-react";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Button from "../button";
import CoinSVG from "@/public/images/coin";

export interface TTasks {
  id: number;
  taskTitle: string;
  reward: any;
  description: any;
}

type Props = {
  isOpen: boolean | undefined;
  closeModal: () => void;
  task?: TTasks | null;
  handleStartTask: () => void;
};

const TaskDetailsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  task,
  handleStartTask,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
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
              <Dialog.Panel className="w-full min-w-[280px] max-w-[400px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="w-full flex flex-col gap-6 px-4 xs:px-8 py-10">
                  <div className="flex flex-col gap-4">
                    <div className="mb-2 flex flex-row items-center justify-between">
                      <p className="text-[20px] font-bold">{task?.taskTitle}</p>

                      <X fill="#939393" onClick={closeModal} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h1 className="text-sm font-bold text-[#282729]">
                        Taks to be completed
                      </h1>
                      <p className="text-sm font-normal text-[#626262] ">
                        {task?.description}Click on the follow button on our
                        twitter profile page.{" "}
                      </p>
                    </div>

                    <div className="flex flex-row p-3 items-center border border-[#D6CBFF] rounded-[12px] ">
                      <CoinSVG fill="#A81DA6" height={24} width={24} />
                      <div>
                        <p className="text-[10px] font-semibold text-[#626262]">
                          REWARD
                        </p>
                        <p className="text-[22px] font-semibold text-[#A81DA6]">
                          {task?.reward * 5000} points
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleStartTask}
                      className="border mt-4  border-purple-200 text-base font-semibold bg-purple-600 rounded-full"
                    >
                      Start
                    </Button>
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

export default TaskDetailsModal;
