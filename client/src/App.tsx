import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState<any>(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-8">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Get ATS score, skill gaps & personalized improvements
          </p>
        </div>

        <div className="bg-white/70 border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Target Job Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 font-medium">
                Desired Role
              </label>
              <input
                type="text"
                placeholder="Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 font-medium">
                Experience
              </label>
              <input
                type="text"
                placeholder="Fresher / 2 years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

          </div>
        </div>

        <FileUpload
          setResult={setResult}
          role={role}
          experience={experience}
        />

        <Result result={result} />

      </div>
    </div>
  );
}

export default App;