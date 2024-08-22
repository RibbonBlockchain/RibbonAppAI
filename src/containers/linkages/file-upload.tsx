import { ArrowUp } from "iconsax-react";
import { useUploadTrainingFiles } from "@/api/ai";
import React, { useState, ChangeEvent } from "react";

interface FileUploadProps {
  //
}

const FileUpload: React.FC<FileUploadProps> = () => {
  const { mutate } = useUploadTrainingFiles();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Only get the first file

    if (!selectedFile) return;

    // Clear previous error and file states
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    // Automatically call mutate to upload the file
    mutate({ body: { file: selectedFile }, id: 2 });
  };

  return (
    <div className="mt-2 flex flex-col gap-4 items-start">
      <div className="flex flex-wrap gap-4">
        {file ? (
          <div className="w-[110px] h-[110px] bg-gray-100 border border-[#E5E7EB] rounded-[8px] flex items-center justify-center relative">
            {filePreview ? (
              <img
                src={filePreview as string}
                alt={`File preview`}
                className="max-w-full max-h-full rounded-[8px]"
              />
            ) : (
              <div className="text-xs text-[#98A2B3]">{fileName}</div>
            )}
          </div>
        ) : (
          <span className="text-xs text-[#98A2B3]">No file chosen</span>
        )}
      </div>

      <div className="flex flex-row gap-4 items-center">
        <div className="relative flex flex-row items-center">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] cursor-pointer flex items-center"
          >
            <span className="text-xs">Upload file</span>
          </label>
          <ArrowUp size="16" color="#ffffff" className="absolute right-2" />
        </div>
        <p className="text-xs text-[#98A2B3]">Any file type</p>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
