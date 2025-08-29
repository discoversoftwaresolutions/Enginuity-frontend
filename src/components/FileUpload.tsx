// src/components/FileUpload.tsx
import React, { useRef, useState } from "react";

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string[]; // e.g. [".csv", "image/*"]
  maxFiles?: number;        // per upload
  maxSize?: number;         // MB per file
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  maxSize = 25,
  className,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptAttr = acceptedTypes.join(",");

  const isAccepted = (file: File) => {
    if (!acceptedTypes.length) return true;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return acceptedTypes.some((p) => {
      const pat = p.toLowerCase().trim();
      if (pat === "*/*") return true;
      if (pat.startsWith(".")) return name.endsWith(pat);
      if (pat.endsWith("/*")) return type.startsWith(pat.slice(0, -1));
      return type === pat;
    });
  };

  const validate = (files: File[]) => {
    const maxBytes = maxSize * 1024 * 1024;
    if (files.length > maxFiles) {
      setError(`Too many files. Max ${maxFiles}.`);
      return [];
    }
    for (const f of files) {
      if (f.size > maxBytes) {
        setError(`"${f.name}" exceeds ${maxSize} MB.`);
        return [];
      }
      if (!isAccepted(f)) {
        setError(`"${f.name}" is not an accepted type.`);
        return [];
      }
    }
    setError(null);
    return files;
  };

  const handle = (list: FileList | null) => {
    if (!list) return;
    const files = validate(Array.from(list));
    if (files.length) onFileUpload(files);
  };

  return (
    <div className={className}>
      <div
        className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          drag ? "border-blue-500 bg-slate-800/60" : "border-slate-600 bg-slate-800/40"
        }`}
        onDragOver={(e) => {
          e.preventDefault(); e.stopPropagation(); setDrag(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault(); e.stopPropagation(); setDrag(false);
        }}
        onDrop={(e) => {
          e.preventDefault(); e.stopPropagation(); setDrag(false); handle(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        aria-label="File uploader"
      >
        <div className="flex flex-col items-center gap-2">
          <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="2" />
          </svg>
          <p className="text-slate-200 text-sm">
            Drag & drop files here, or{" "}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
            >
              browse
            </button>
          </p>
          <p className="text-slate-400 text-xs">
            Accepted: {acceptedTypes.join(", ")} • Max files: {maxFiles} • Max size: {maxSize} MB each
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={maxFiles > 1}
          accept={acceptAttr}
          onChange={(e) => handle(e.target.files)}
        />
      </div>

      {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
    </div>
  );
};
