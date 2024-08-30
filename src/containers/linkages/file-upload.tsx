import { ArrowUp } from "iconsax-react";
import { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import { useUploadLinkageFile } from "@/api/linkage";

const FileUpload = () => {
  const params = useParams();
  const id = Number(params.id);

  const { mutate } = useUploadLinkageFile();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    mutate(
      { id, file: formData as any },
      {
        onSuccess: () => console.log("File uploaded successfully"),
        onError: (error) => console.error("Upload failed", error),
      }
    );
  };

  return (
    <div className="mt-2 flex flex-col gap-4 items-start">
      <Toaster />
      <div className="w-full flex flex-wrap gap-4">
        {filePreview && (
          <div className="w-full flex flex-row items-center justify-between text-xs text-[#98A2B3] ">
            <div>{file ? file.name : "No file chosen"}</div>
            <X
              onClick={handleRemoveFile}
              className="text-red-500 mr-6"
              size={18}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 flex-start items-start">
        <div className="flex flex-row gap-2 items-center">
          <div className="relative flex flex-row items-center">
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="*/*"
            />
            <label
              htmlFor="fileInput"
              className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#FFFFFF52] text-[#98A2B3] cursor-pointer flex items-center"
            >
              <span className="text-xs">Select a file</span>
            </label>
            <ArrowUp size="16" color="#ffffff" className="absolute right-2" />
          </div>

          <p className="text-xs text-[#98A2B3]">jpg, png, pdf, docs, xlsx...</p>
        </div>

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-[8px] text-xs"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
