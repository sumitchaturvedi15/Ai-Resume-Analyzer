import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { extractTextFromPDF } from "../utils/extractText";

type Props = {
  setResult: (res: any) => void;
  role: string;
  experience: string;
};

export default function FileUpload({ setResult, role, experience }: Props) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles: File[]) => {
    setError("");

    const file = acceptedFiles[0];
    if (!file) return;

    if (!role || !experience) {
      setError("Please enter role and experience first");
      return;
    }

    setFileName(file.name);
    setLoading(true);

    try {
      const text = await extractTextFromPDF(file);

      if (!text || text.length < 20) {
        setError("Invalid PDF. Try another file.");
        setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:5000/analyze", {
        resumeText: text,
        role,
        experience,
      });

      if (!res.data) {
        setError("No response from server");
        setLoading(false);
        return;
      }

      setResult(res.data.result || res.data);
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  return (
    <div className="mt-6">

      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Upload Resume
      </h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
        ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50 scale-[1.01]"
            : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-indigo-600 font-medium">
              Analyzing your resume...
            </p>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-700 font-medium">📄 {fileName}</p>
            <p className="text-sm text-gray-400">
              Click or drag to replace file
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-lg font-medium">
              Drag & drop your resume
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or{" "}
              <span className="text-indigo-500 font-semibold">
                browse files
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supported format: PDF
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}