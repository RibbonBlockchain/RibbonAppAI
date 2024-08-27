import { ArrowUp } from "iconsax-react";
import { useUploadLinkageAIFile } from "@/api/ai";
import React, { useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";

const FileUpload = () => {
  const params = useParams();
  const id = Number(params.id);

  const { mutate } = useUploadLinkageAIFile();

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

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // Assuming the mutate function accepts FormData directly
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
      <div className="flex flex-wrap gap-4">
        <div className="w-[110px] h-[110px] bg-inherit border border-[#FFFFFF36] rounded-[8px] flex items-center justify-center relative">
          {filePreview && (
            <div className="text-xs text-[#98A2B3]">
              {file ? file.name : "No file chosen"}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <div className="relative flex flex-row items-center">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="*/*" // Optional: restrict to certain file types if needed
          />
          <label
            htmlFor="fileInput"
            className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#FFFFFF52] text-[#98A2B3] cursor-pointer flex items-center"
          >
            <span className="text-xs">Upload file</span>
          </label>
          <ArrowUp size="16" color="#ffffff" className="absolute right-2" />
        </div>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-[8px] text-xs"
        >
          Upload
        </button>
        <p className="text-xs text-[#98A2B3]">Any file type</p>
      </div>
    </div>
  );
};

export default FileUpload;
