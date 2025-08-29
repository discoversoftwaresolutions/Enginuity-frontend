import React, { useRef } from "react";

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;   // per selection
  maxSize?: number;    // MB per file (ignored in stub)
  className?: string;
}

/** Minimal stub: native file input → forwards files to onFileUpload */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptedTypes.join(",")}
        onChange={(e) => {
          const list = e.target.files;
          if (!list) return;
          const files = Array.from(list).slice(0, Math.max(1, maxFiles));
          onFileUpload(files);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
    </div>
  );
};
