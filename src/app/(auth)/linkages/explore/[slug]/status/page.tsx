"use client";

import clsx from "clsx";
import toast from "react-hot-toast";
import { ArrowLeft2 } from "iconsax-react";
import React, { useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useGetLinkageBySlug, useUploadLinkageStatus } from "@/api/linkage";

const CreateStatus = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { mutate, isPending } = useUploadLinkageStatus();
  const { data } = useGetLinkageBySlug(slug);

  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaCaption, setMediaCaption] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Ensure only image or video files are selected
    if (
      !selectedFile.type.startsWith("image") &&
      !selectedFile.type.startsWith("video")
    ) {
      toast.error("Only image and video files are allowed!");
      return;
    }

    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
    setSelectedMedia(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setSelectedMedia(null);
  };

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", mediaCaption);

    const linkageId = data?.data.id;
    if (!linkageId) {
      toast.error("Linkage ID is missing!");
      return;
    }

    mutate(
      { body: formData as any, linkageId },
      {
        onSuccess: () => {
          setTimeout(() => {
            toast.success("Status uploaded successfully!");
            setFile(null);
            setFilePreview(null);
            setMediaCaption("");
            setSelectedMedia(null);
            router.push("/linkages/explore");
          }, 2000);
        },
      }
    );
  };

  const isUploadDisabled = !file || isPending;

  return (
    <main className="relative min-h-screen w-full text-white bg-[#0B0228] p-4 sm:p-6 pb-16">
      <div className="flex flex-row items-center gap-4 mt-2 mb-6">
        <ArrowLeft2
          size="24"
          color="#ffffff"
          className="my-2"
          onClick={() => router.back()}
        />
        <p className="text-[20px] font-bold">Add a status</p>
      </div>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        {/* Conditionally Render Input for Media */}
        {selectedMedia ? (
          <div className="relative">
            {/* Preview the media */}
            {selectedMedia.type.startsWith("image") ? (
              <img
                src={filePreview as string}
                alt="Selected media"
                className="w-full h-48 object-cover rounded-md"
              />
            ) : selectedMedia.type.startsWith("video") ? (
              <video
                src={filePreview as string}
                controls
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md">
                <span>Unsupported File Type</span>
              </div>
            )}

            {/* Remove File Button */}
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 text-white rounded-full bg-black opacity-75 hover:opacity-100"
            >
              X
            </button>

            {/* Caption Input for Media */}
            <input
              type="text"
              value={mediaCaption}
              placeholder="Add a caption..."
              onChange={(e) => setMediaCaption(e.target.value)}
              className="mt-6 w-full bg-inherit py-3 px-2 rounded-[8px] border border-[#E5E7EB86] text-sm text-white placeholder:text-[#98A2B3] focus:ring-0 focus:outline-none"
            />
          </div>
        ) : (
          <label
            htmlFor="media-upload"
            className="flex items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer"
          >
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*" // Restrict to image and video files
              onChange={handleFileChange}
              className="hidden"
            />
            <span>Upload an Image or Video</span>
          </label>
        )}

        {/* Submit Button */}
        <div className="absolute bottom-6 w-full px-6 flex self-center justify-center items-center">
          <button
            type="submit"
            disabled={isUploadDisabled}
            className={clsx(
              "my-10 w-full rounded-[8px] py-3 font-bold text-sm flex items-center justify-center",
              isUploadDisabled
                ? "border-stone-300 bg-stone-400/50 text-white cursor-not-allowed"
                : "bg-white text-[#290064]"
            )}
          >
            {isPending ? <SpinnerIcon /> : "Upload status"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateStatus;
