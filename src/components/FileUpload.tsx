import React, { useCallback, useRef, useState } from "react";

export type FileUploadProps = {
  /** Callback invoked with validated files */
  onFileUpload: (files: File[]) => void;
  /** Accept list (extensions like ".csv", ".json", or mime patterns like "image/*") */
  acceptedTypes?: string[];
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum size per file in MB */
  maxSize?: number;
  /** Optional extra class names for the root */
  className?: string;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  maxSize = 25, // MB
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const acceptAttr = acceptedTypes.join(",");

  const validateFiles = useCallback(
    (files: File[]): File[] => {
      setError(null);
      if (!files.length) return [];

      const maxBytes = maxSize * 1024 * 1024;

      // Enforce count
      if (files.length > maxFiles) {
        setError(`Too many files. Max allowed is ${maxFiles}.`);
        return [];
      }

      // Enforce size & type
      const ok: File[] = [];
      for (const f of files) {
        if (f.size > maxBytes) {
          setError(`"${f.name}" exceeds ${maxSize} MB limit.`);
          return [];
        }
        if (!isAcceptedType(f, acceptedTypes)) {
          setError(`"${f.name}" is not an accepted type.`);
          return [];
        }
        ok.push(f);
      }
      return ok;
    },
    [acceptedTypes, maxFiles, maxSize]
  );

  const isAcceptedType = (file: File, patterns: string[]) => {
    if (!patterns.length) return true;
    // If any pattern matches, accept
    return patterns.some((p) => {
      const pattern = p.trim().toLowerCase();
      if (pattern === "*/*") return true;

      if (pattern.startsWith(".")) {
        // extension check
        return file.name.toLowerCase().endsWith(pattern);
      }
      if (pattern.endsWith("/*")) {
        // mime family, e.g., image/*
        const family = pattern.slice(0, -2);
        return file.type.toLowerCase().startsWith(`${family}/`);
      }
      // exact mime, e.g., application/json
      return file.type.toLowerCase() === pattern;
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    const validated = validateFiles(arr);
    if (validated.length) {
      onFileUpload(validated);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className={classNames("space-y-3", className)}>
      <div
        className={classNames(
          "rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          dragActive ? "border-blue-500 bg-slate-800/60" : "border-slate-600 bg-slate-800/40"
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        aria-label="File uploader"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
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
            Accepted: {acceptedTypes.join(", ") || "any"} • Max files: {maxFiles} • Max size: {maxSize} MB each
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={maxFiles > 1}
          accept={acceptAttr}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
};
