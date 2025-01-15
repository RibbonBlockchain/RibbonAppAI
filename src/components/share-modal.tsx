import { X } from "lucide-react";
import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Head from "next/head";
import { LinkedIn, Twitter } from "@/public/assets";
import { Facebook, Whatsapp } from "iconsax-react";

type Props = {
  isOpen: boolean | undefined;
  closeModal: () => void;
  inviteLink: string;
  title: string;
  note: string;
};

const ShareTimeline: React.FC<Props> = (props) => {
  const url = window.location.href;
  const shareLink = `${url}`;

  const title = `
  New Update on Our Web App! 🚀

  🔗 Click here for the latest updates: ${shareLink}

  Stay tuned for more exciting features! ✨
  `;

  return (
    <>
      {/* Open Graph Meta Tags */}
      <Head>
        <meta property="og:title" content={`New Update on Our Web App!`} />
        <meta
          property="og:description"
          content={`Check out the latest updates on our app! It's going to be a game-changer!`}
        />
        <meta
          property="og:image"
          content={"https://example.com/default-image.jpg"}
        />
        <meta property="og:url" content={shareLink} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        {/* Optional Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`New Update on Our Web App!`} />
        <meta
          name="twitter:description"
          content={`Check out the latest updates on our app! It's going to be a game-changer!`}
        />
        <meta
          name="twitter:image"
          content="https://example.com/default-image.jpg"
        />
      </Head>

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
                <Dialog.Panel className="w-full max-w-[320px] sm:max-w-[400px] xl:max-w-[420px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex flex-col gap-6 py-10">
                    <div className="flex flex-col gap-4">
                      <div className="px-4 xs:px-8 flex flex-row items-center justify-end">
                        <X onClick={props.closeModal} />
                      </div>
                    </div>

                    <hr className="px-4 xs:px-8" />

                    <div className="w-full px-4 xs:px-8 flex flex-col gap-1.5">
                      <p className="text-sm font-medium text-gray-900 mb-4">
                        Share this exciting update with your friends!
                      </p>

                      <div className="w-full flex flex-row items-center justify-between">
                        <TwitterShareButton
                          url={shareLink}
                          title={title as any}
                        >
                          <div className="bg-gray-400 flex items-center justify-center rounded-full w-[48px] h-[48px]">
                            <Twitter />
                          </div>
                          <p className="text-xs text-gray-500 font-normal">
                            Twitter
                          </p>
                        </TwitterShareButton>

                        <FacebookShareButton
                          url={shareLink}
                          title={title as any}
                        >
                          <div className="bg-gray-400 flex items-center justify-center rounded-full w-[48px] h-[48px]">
                            <Facebook />
                          </div>
                          <p className="text-xs text-gray-500 font-normal">
                            Facebook
                          </p>
                        </FacebookShareButton>

                        <LinkedinShareButton
                          url={shareLink}
                          title={title as any}
                        >
                          <div className="bg-gray-400 flex items-center justify-center rounded-full w-[48px] h-[48px]">
                            <LinkedIn />
                          </div>
                          <p className="text-xs text-gray-500 font-normal">
                            LinkedIn
                          </p>
                        </LinkedinShareButton>

                        <WhatsappShareButton
                          url={shareLink}
                          title={title as any}
                        >
                          <div className="bg-gray-400 flex items-center justify-center rounded-full w-[48px] h-[48px]">
                            <Whatsapp />
                          </div>
                          <p className="text-xs text-gray-500 font-normal">
                            WhatsApp
                          </p>
                        </WhatsappShareButton>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareTimeline;
