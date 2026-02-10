import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AttemptHistory() {
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      const res = await API.get("/practice/attempts");

      setAttempts(res.data);
    };

    fetchAttempts();
  }, []);

  return (
    <div
      className="
    min-h-screen  p-8
    "
    >
      <h1
        className="
      text-3xl font-bold mb-6
      "
      >
        Attempt History
      </h1>

      <div className="space-y-4">
        {attempts.map((a, i) => (
          <div
            key={i}
            className="
            bg-white dark:bg-gray-900
            p-6
            rounded-2xl
            shadow-md
            flex
            justify-between
            items-center
            hover:shadow-md
            transition
            "
          >
            {/* LEFT */}
            <div>
              <p className="font-semibold">
                Score: {a.score} / {a.totalQuestions}
              </p>

              <p className="text-gray-500 text-sm">
                Accuracy: {a.accuracy.toFixed(1)}%
              </p>

              <p className="text-sm mt-1">Difficulty: {a.difficulty}</p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(a.submittedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {a.weakTopics?.map((t) => (
                <span
                  key={t}
                  className="
                    text-xs
                    px-2 py-1
                    bg-red-200
                    dark:bg-red-800
                    rounded-full
                    "
                >
                  {t}
                </span>
              ))}
            </div>
            {/* RIGHT */}
            <button
              onClick={() => navigate(`/practice/result/${a._id}`)}
              className="
              px-4 py-2
              rounded-lg
              bg-black text-white
              hover:scale-105
              transition
              "
            >
              View Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
