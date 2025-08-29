// src/components/FileUpload.tsx
import React, { useRef, useState } from "react";

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // MB
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  maxSize = 25,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptAttr = acceptedTypes
    .map((p) => {
      const t = p.trim();
      return t.endsWith("/") && !t.endsWith("/*") ? t + "*" : t;
    })
    .join(",");

  function isAccepted(file: File): boolean {
    if (!acceptedTypes.length) return true;
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();
    for (let i = 0; i < acceptedTypes.length; i++) {
      const pat = acceptedTypes[i].trim().toLowerCase();
      if (pat === "*/*") return true;
      if (pat.startsWith(".") && name.endsWith(pat)) return true;
      if (pat.endsWith("/*") && type.startsWith(pat.slice(0, -1))) return true;
      if (pat.endsWith("/") && type.startsWith(pat)) return true;
      if (type === pat) return true;
    }
    return false;
  }

  function validate(files: File[]): File[] {
    const maxBytes = Math.max(1, maxSize) * 1024 * 1024;
    const cap = Math.max(1, maxFiles);
    if (files.length > cap) {
      setError("Too many files selected. Maximum allowed is " + maxFiles + ".");
      return [];
    }
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > maxBytes) {
        setError('"' + f.name + '" exceeds the ' + maxSize + " MB limit.");
        return [];
      }
      if (!isAccepted(f)) {
        setError('"' + f.name + '" is not an accepted type.');
        return [];
      }
    }
    setError(null);
    return files;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    const cap = Math.max(1, maxFiles);
    const selected: File[] = Array.prototype.slice.call(list, 0, cap);
    const ok = validate(selected);
    if (ok.length > 0) onFileUpload(ok);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        multiple={maxFiles > 1}
        accept={acceptAttr}
        onChange={handleChange}
      />
      {error ? <div className="mt-2 text-xs text-red-600">{error}</div> : null}
    </div>
  );
};

export default FileUpload;
