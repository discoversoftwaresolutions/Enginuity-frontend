import React, { useMemo, useRef, useState } from "react";

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  /**
   * Accept patterns for the file input, e.g. [".csv", "image/*", "application/json"].
   * Defaults to ["*/*"].
   */
  acceptedTypes?: string[];
  /** Maximum number of files per selection. Defaults to 5. */
  maxFiles?: number;
  /** Maximum size per file in MB. Defaults to 25. */
  maxSize?: number;
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

  // Build the accept attribute (e.g., "image/*,application/json,.csv")
  const acceptAttr = useMemo(() => {
    return acceptedTypes
      .map((p) => {
        const t = p.trim();
        // Normalize "image/" -> "image/*"
        if (t.endsWith("/") && !t.endsWith("/*")) return `${t}*`;
        return t;
      })
      .join(",");
  }, [acceptedTypes]);

  const isAccepted = (file: File): boolean => {
    if (!acceptedTypes.length) return true;

    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();

    for (const raw of acceptedTypes) {
      const pat = raw.trim().toLowerCase();

      // Wildcard: any type
      if (pat === "*/*") return true;

      // Extension match: ".csv", ".json", etc.
      if (pat.startsWith(".")) {
        if (name.endsWith(pat)) return true;
        continue;
      }

      // MIME family: "image/*", "video/*"
      if (pat.endsWith("/*")) {
        const family = pat.slice(0, -1); // keep trailing slash
        if (type.startsWith(family)) return true;
        continue;
      }

      // MIME prefix ending with slash (normalized to family above)
      if (pat.endsWith("/")) {
        if (type.startsWith(pat)) return true;
        continue;
      }

      // Exact MIME match: "application/json"
      if (type === pat) return true;
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
    if (ok.length) onFileUpload(ok);

    // Reset so choosing the same file fires onChange again
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
