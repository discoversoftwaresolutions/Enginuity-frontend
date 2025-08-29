
```tsx
// src/components/FileUpload.tsx
import React, { useRef, useState } from "react";

export interface FileUploadProps {
  /** Called with validated files */
  onFileUpload: (files: File[]) => void;
  /** Extensions (".csv"), exact mimes ("application/json"), or families ("image/*"). */
  acceptedTypes?: string[];
  /** Maximum number of files per selection */
  maxFiles?: number;
  /** Maximum size per file, in MB */
  maxSize?: number;
  /** Optional extra class names for the wrapper */
  className?: string;
}

/**
 * Minimal, robust uploader:
 * - Native <input type="file"> (no drag/drop to keep surface area small)
 * - Validates count, size (MB), and type against acceptedTypes
 * - Normalizes odd patterns like "image/" → "image/*" for the accept attribute
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes = ["*/*"],
  maxFiles = 5,
  maxSize = 25,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  /** Normalize patterns for the <input accept> attribute */
  const acceptAttr = acceptedTypes
    .map((p) => {
      const t = p.trim();
      if (t.endsWith("/") && !t.endsWith("/*")) return `${t}*`; // "image/" -> "image/*"
      return t;
    })
    .join(",");

  const isAccepted = (file: File): boolean => {
    if (!acceptedTypes.length) return true;
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();

    return acceptedTypes.some((raw) => {
      const pat = raw.trim().toLowerCase();

      if (pat === "*/*") return true;

      if (pat.startsWith(".")) {
        // Extension match, e.g., ".csv"
        return name.endsWith(pat);
      }

      if (pat.endsWith("/*")) {
        // Family match, e.g., "image/*"
        const family = pat.slice(0, -1); // keep the slash
        return type.startsWith(family);
      }

      if (pat.endsWith("/")) {
        // Normalize odd pattern like "image/" to "image/*"
        return type.startsWith(pat);
      }

      // Exact MIME, e.g., "application/json"
      return type === pat;
    });
  };

  const validate = (files: File[]): File[] => {
    const maxBytes = Math.max(1, maxSize) * 1024 * 1024;

    if (files.length > maxFiles) {
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
    if (ok.length) onFileUpload(ok);

    // Allow selecting the same file again
    if (inputRef.current) inputRef.current.value = "";
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
```
