import { ArrowUp } from "iconsax-react";
import { useUploadTrainingFiles } from "@/api/ai";
import React, { useState, ChangeEvent } from "react";

interface FileUploadProps {
  //
}

const FileUpload: React.FC<FileUploadProps> = () => {
  const { mutate } = useUploadTrainingFiles();

  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    (string | ArrayBuffer | null)[]
  >([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const newFiles: File[] = [];
    const newFilePreviews: (string | ArrayBuffer | null)[] = [];
    const newFileNames: string[] = [];
    let valid = true;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (!validTypes.includes(file.type)) {
        setError(
          "One or more files have invalid type. Please upload files with the following types: jpg, png, pdf, doc, docx, xlsx."
        );
        valid = false;
        break;
      }

      newFiles.push(file);
      newFileNames.push(file.name);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newFilePreviews.push(reader.result);
          if (newFilePreviews.length === selectedFiles.length) {
            setFiles(newFiles);
            setFileNames(newFileNames);
            setFilePreviews(newFilePreviews);
            setError(null);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newFilePreviews.push(null);
        if (newFilePreviews.length === selectedFiles.length) {
          setFiles(newFiles);
          setFileNames(newFileNames);
          setFilePreviews(newFilePreviews);
          setError(null);
        }
      }
    }

    if (!valid) {
      setFiles([]);
      setFilePreviews([]);
      setFileNames([]);
    }
    mutate({ body: { file: files }, id: 2 });
  };

  return (
    <div className="mt-2 flex flex-col gap-4 items-start">
      <div className="flex flex-wrap gap-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="w-[110px] h-[110px] bg-gray-100 border border-[#E5E7EB] rounded-[8px] flex items-center justify-center relative"
            >
              {filePreviews[index] ? (
                <img
                  src={filePreviews[index] as string}
                  alt={`File preview ${index}`}
                  className="max-w-full max-h-full rounded-[8px]"
                />
              ) : (
                <div className="text-xs text-[#98A2B3]">{fileNames[index]}</div>
              )}
            </div>
          ))
        ) : (
          <span className="text-xs text-[#98A2B3]">No files chosen</span>
        )}
      </div>

      <div className="flex flex-row gap-4 items-center">
        <div className="relative flex flex-row items-center">
          <input
            id="fileInput"
            type="file"
            className="hidden"
            multiple
            accept=".jpg, .png, .pdf, .doc, .docx, .xlsx"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="min-w-[110px] px-2.5 appearance-none bg-inherit py-3 rounded-[8px] border border-[#E5E7EB] text-[#98A2B3] cursor-pointer flex items-center"
          >
            <span className="text-xs">Upload files</span>
          </label>
          <ArrowUp size="16" color="#ffffff" className="absolute right-2" />
        </div>
        <p className="text-xs text-[#98A2B3]">jpg, png, pdf, docs, xlsx...</p>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
