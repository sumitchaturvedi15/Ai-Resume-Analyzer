type ResultType = {
  atsScore: number;
  missingSkills: string[];
  improvements: string[];
  jobRoles: string[];
};

export default function Result({ result }: { result: ResultType }) {
  if (!result) return null;

  const getScoreStyle = (score: number) => {
    if (score >= 75)
      return {
        bar: "from-green-400 to-green-600",
        text: "text-green-600",
      };
    if (score >= 50)
      return {
        bar: "from-yellow-400 to-yellow-500",
        text: "text-yellow-600",
      };
    return {
      bar: "from-red-400 to-red-500",
      text: "text-red-600",
    };
  };

  const scoreStyle = getScoreStyle(result.atsScore);

  return (
    <div className="mt-10 space-y-6">

      <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          ATS Score
        </h2>

        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className={`h-4 bg-gradient-to-r ${scoreStyle.bar} transition-all duration-700`}
            style={{ width: `${result.atsScore}%` }}
          />
        </div>

        <p className={`mt-3 text-2xl font-bold ${scoreStyle.text}`}>
          {result.atsScore} / 100
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {result.missingSkills?.map((skill, i) => (
              <span
                key={i}
                className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Recommended Roles
          </h2>

          <div className="flex flex-wrap gap-2">
            {result.jobRoles?.map((role, i) => (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Improvements
        </h2>

        <ul className="space-y-3 text-gray-700">
          {result.improvements?.map((imp, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-indigo-500 mt-1">●</span>
              <span className="leading-relaxed">{imp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}