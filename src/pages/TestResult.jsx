import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function TestResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await API.get(`/practice/result/${id}`);

      setResult(res.data);
    };

    fetchResult();
  }, [id]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Result...
      </div>
    );
  }

  return (
    <div
      className="
    min-h-screen
    bg-gray-50 dark:bg-gray-950
    flex flex-col items-center
    p-10
    "
    >
      <div
        className="
      bg-white dark:bg-gray-900
      rounded-3xl
      shadow-lg
      p-10
      w-full
      max-w-3xl
      text-center
      "
      >
        {/* SCORE */}
        <h1 className="text-5xl font-bold mb-4">
          {result.score} / {result.total}
        </h1>

        {/* ACCURACY */}
        <p className="text-xl text-gray-500 mb-8">
          Accuracy: {result.accuracy.toFixed(1)}%
        </p>

        {result.weakTopics?.length > 0 && (
          <div
            className="
            mt-6
            p-4
            rounded-xl
            bg-red-50
            dark:bg-red-900/20
           "
          >
            <h3 className="font-semibold text-red-600 mb-2">Focus Areas</h3>

            <div className="flex gap-2 flex-wrap">
              {result.weakTopics.map((topic) => (
                <span
                  key={topic}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-red-200
                    dark:bg-red-800
                    text-sm
                    "
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {result.strongTopics?.length > 0 && (
          <div
            className="
                mt-4
                p-4
                rounded-xl
                bg-green-50
                dark:bg-green-900/20
            "
          >
            <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>

            <div className="flex gap-2 flex-wrap">
              {result.strongTopics.map((topic) => (
                <span
                  key={topic}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-green-200
                    dark:bg-green-800
                    text-sm
                    "
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PERFORMANCE MESSAGE */}
        <div className="mb-10">
          {result.accuracy >= 80 && (
            <p className="text-green-500 font-semibold text-lg">
              Excellent Performance 🚀
            </p>
          )}

          {result.accuracy >= 50 && result.accuracy < 80 && (
            <p className="text-yellow-500 font-semibold text-lg">
              Good Job — Keep Improving 👍
            </p>
          )}

          {result.accuracy < 50 && (
            <p className="text-red-500 font-semibold text-lg">
              Needs Improvement — Practice More 💪
            </p>
          )}
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => navigate("/practice")}
            className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
          >
            Take Another Test
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-black text-white hover:scale-105 transition "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <div
        className="
        mt-10
        w-full
        max-w-3xl
        space-y-6
        "
      >
        {result.review.map((item, index) => (
          <div
            key={index}
            className={`
                p-6
                rounded-2xl
                shadow-sm
                border
                ${item.isCorrect ? "border-green-500" : "border-red-500"}
                bg-white dark:bg-gray-900
                `}
          >
            {/* Question */}
            <h3 className="font-semibold mb-4">
              Q{index + 1}. {item.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {item.options.map((opt, i) => {
                const isUser = opt === item.selectedAnswer;

                const isCorrect = opt === item.correctAnswer;

                return (
                  <div
                    key={i}
                    className={`
              p-3 rounded-lg border

              ${
                isCorrect
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : isUser
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-200 dark:border-gray-700"
              }
              `}
                  >
                    <div className="flex justify-between">
                      <span>{opt}</span>

                      {opt === item.correctAnswer && (
                        <span className="text-green-600 font-semibold">
                          Correct
                        </span>
                      )}

                      {opt === item.selectedAnswer &&
                        opt !== item.correctAnswer && (
                          <span className="text-red-600 font-semibold">
                            Your Answer
                          </span>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
