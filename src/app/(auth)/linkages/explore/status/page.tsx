"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadLinkageStatus } from "@/api/linkage";

// Utility function to handle file uploads
const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = event.target.files ? event.target.files[0] : null;
  if (file) {
    setFile(file);
  }
};

const CreateStatus = () => {
  const router = useRouter();
  const { mutate } = useUploadLinkageStatus();

  const [statusType, setStatusType] = useState<"text" | "media">("media");
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [mediaCaption, setMediaCaption] = useState<string>(""); // State for media caption
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    if (statusType === "media" && selectedMedia) {
      formData.append("file", selectedMedia);
    }

    mutate(
      { file: formData as any, linkageId: 2 },
      {
        onSuccess: () => {
          setTimeout(() => {
            toast.success("Status uploaded successfully!");
            setIsSubmitting(false);
            setSelectedMedia(null);
            setStatusText("");
            setMediaCaption("");
            setStatusType("text");
            router.push("/linkages/explore");
          }, 2000);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100 w-full">
      <div className="bg-white w-full p-4 sm:p-6">
        <h2 className="text-2xl font-semibold mb-4">Create a New Status</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Status Type Selector */}
          <div className="flex gap-4 mb-4">
            {/* <label className="flex items-center">
              <input
                type="radio"
                name="statusType"
                value="media"
                checked={statusType === "media"}
                onChange={() => setStatusType("media")}
                className="mr-2"
              />
              <span>Image/Video</span>
            </label> */}
            {/* <label className="flex items-center text-gray-400">
              <input
                type="radio"
                name="statusType"
                value="text"
                checked={statusType === "text"}
                // onChange={() => setStatusType("text")}
                onChange={() => {}}
                className="mr-2"
              />
              <span>Text</span>
            </label> */}
          </div>

          {/* Conditionally Render Input Based on Status Type */}
          {statusType === "media" ? (
            <div className="flex flex-col gap-2">
              {selectedMedia ? (
                <div className="relative">
                  {selectedMedia.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(selectedMedia)}
                      alt="Selected media"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(selectedMedia)}
                      controls
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedMedia(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                  >
                    X
                  </button>
                  {/* Caption Input for Media */}
                  <input
                    type="text"
                    value={mediaCaption}
                    onChange={(e) => setMediaCaption(e.target.value)}
                    placeholder="Add a caption..."
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
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
                    accept="image/*,video/*"
                    onChange={(e) => handleFileChange(e, setSelectedMedia)}
                    className="hidden"
                  />
                  <span>Upload an Image or Video</span>
                </label>
              )}
            </div>
          ) : (
            <textarea
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="Add status text..."
              className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
            />
          )}

          {/* Submit Button */}
          <div className="absolute bottom-6 w-full px-6 flex self-center justify-center items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 w-full rounded-md text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Uploading..." : "Upload Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStatus;
