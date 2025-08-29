// src/components/FileUpload.tsx
import React, { useMemo, useRef, useState } from "react";

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string[]; // Example: [".csv", "image/*", "application/json"]
  maxFiles?: number;        // Max number of files per selection
  maxSize?: number;         // Max size per file in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  maxSize = 25,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Build input accept attribute string
  const acceptAttr = useMemo(() => {
    return acceptedTypes
      .map((pattern) => {
        const trimmed = pattern.trim();
        if (trimmed.endsWith("/") && !trimmed.endsWith("/*")) {
          return `${trimmed}*`; // normalize "image/" → "image/*"
        }
        return trimmed;
      })
      .join(",");
  }, [acceptedTypes]);

  const isAccepted = (file: File): boolean => {
    if (!acceptedTypes.length) return true;

    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();

    for (const raw of acceptedTypes) {
      const pat = raw.trim().toLowerCase();

      if (pat === "*/*") return true; // allow any type
      if (pat.startsWith(".") && name.endsWith(pat)) return true; // extension
      if (pat.endsWith("/*") && type.startsWith(pat.slice(0, -1))) return true; // family
      if (pat.endsWith("/") && type.startsWith(pat)) return true; // mime prefix
      if (type === pat) return true; // exact match
    }

    return false;
  };

  const validate = (files: File[]): File[] => {
    const maxBytes = Math.max(1, maxSize) * 1024 * 1024;

    if (files.length > Math.max(1, maxFiles)) {
      setError(`Too many files selected. Maximum allowed is ${maxFiles}.`);
      return [];
    }

    for (const f of files) {
      if (f.size > maxBytes) {
        setError(`"${f.name}" exceeds the ${maxSize} MB limit.`);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;

    const selected = Array.from(list).slice(0, Math.max(1, maxFiles));
    const ok = validate(selected);

    if (ok.length) {
      onFileUpload(ok);
    }

    // reset so choosing the same file again still triggers change
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptAttr}
        onChange={handleChange}
      />
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
};

export default FileUpload;
