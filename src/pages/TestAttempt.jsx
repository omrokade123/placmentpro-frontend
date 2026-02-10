// import { useParams } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function TestAttempt() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const hasSubmitted = useRef(false);

//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);

//   const timerRef = useRef(null);
//   const expiryRef = useRef(null);

//   const handleSubmit = async () => {
//     if (hasSubmitted.current) return;

//     hasSubmitted.current = true;

//     clearInterval(timerRef.current);

//     try {
//       const res = await API.post(`/practice/submit/${id}`, { answers });
//       toast.success("Test submtted successfully");
//       navigate(`/practice/result/${id}`, {
//         state: res.data,
//       });
//     } catch (err) {
//       if (err.response?.status === 400) {
//         navigate(`/practice/result/${id}`);
//         toast.error(err);
//       } else {
//         console.log("Submission failed:", err.response?.data);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchTest = async () => {
//       try {
//         const res = await API.get(`/practice/test/${id}`);

//         setQuestions(res.data.questions);

//         const start = new Date(res.data.startTime).getTime();
//         const duration = res.data.duration * 1000;

//         expiryRef.current = start + duration;

//         // const remaining = Math.floor((start + duration - Date.now()) / 1000);

//         // const safeRemaining = remaining > 0 ? remaining : 0;

//         // setTimeLeft(safeRemaining);

//         timerRef.current = setInterval(() => {
//           const remaining = Math.floor((expiryRef.current - Date.now()) / 1000);

//           if (remaining <= 0) {
//             if (!hasSubmitted.current) {
//               hasSubmitted.current = true;

//               clearInterval(timerRef.current);

//               handleSubmit();
//             }

//             setTimeLeft(0);
//             return;
//           }

//           setTimeLeft(remaining);
//         }, 1000);
//       } catch {
//         console.log("Failed to load test");
//       }
//     };

//     fetchTest();

//     return () => clearInterval(timerRef.current);
//   }, [id]);

//   if (!questions.length) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Loading Test...
//       </div>
//     );
//   }

//   const question = questions[current];

//   const handleAnswer = (option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [question._id]: option,
//     }));
//   };

//   const formatTime = (seconds) => {
//     if (seconds <= 0) return "00:00";

//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;

//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div
//       className="
//       min-h-screen
//       bg-gray-50 dark:bg-gray-950
//       p-8
//       grid grid-cols-4 gap-8
//       "
//     >
//       {/* ✅ QUESTION AREA */}
//       <div className="col-span-3">
//         <div
//           className="
//           bg-white dark:bg-gray-900
//           p-8
//           rounded-2xl
//           shadow-sm
//           "
//         >
//           {/* Question Count */}
//           <div className="flex justify-between items-center mb-4">
//             <p className="text-gray-500">
//               Question {current + 1} of {questions.length}
//             </p>

//             <div
//               className={`font-semibold text-lg ${timeLeft < 60 ? "text-red-600" : "text-gray-700 dark:text-gray-300"}`}
//             >
//               ⏳ {formatTime(timeLeft)}
//             </div>
//           </div>

//           {/* Question */}
//           <h2 className="text-xl font-semibold mb-6">
//             {question.questionText}
//           </h2>

//           {/* Options */}
//           <div className="space-y-3">
//             {question.options.map((opt, i) => {
//               const selected = answers[question._id] === opt;

//               return (
//                 <button
//                   key={i}
//                   onClick={() => handleAnswer(opt)}
//                   className={`
//                     w-full text-left
//                     p-4 rounded-xl border
//                     transition

//                     hover:bg-gray-100
//                     dark:hover:bg-gray-800

//                     ${
//                       selected
//                         ? "border-black dark:border-white"
//                         : "border-gray-200 dark:border-gray-700"
//                     }
//                   `}
//                 >
//                   {opt}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-between mt-8">
//             <button
//               disabled={current === 0}
//               onClick={() => setCurrent((prev) => prev - 1)}
//               className="
//               px-4 py-2 rounded-lg
//               bg-gray-200 dark:bg-gray-700
//               disabled:opacity-50
//               "
//             >
//               Previous
//             </button>

//             <button
//               disabled={hasSubmitted.current}
//               onClick={() =>
//                 current === questions.length - 1
//                   ? handleSubmit() 
//                   : setCurrent((prev) => prev + 1)
//               }
//               className="
//               px-6 py-2 rounded-lg
//               bg-black text-white
//               hover:scale-105 transition
//               "
//             >
//               {current === questions.length - 1 ? "Submit Test" : "Next"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ QUESTION PALETTE */}
//       <div
//         className="
//         bg-white dark:bg-gray-900
//         p-6
//         rounded-2xl
//         shadow-sm
//         h-fit
//         sticky top-8
//         "
//       >
//         <h3 className="font-semibold mb-4">Questions</h3>

//         <div className="grid grid-cols-5 gap-3">
//           {questions.map((q, index) => {
//             const isAnswered = answers[q._id];
//             const isCurrent = index === current;

//             return (
//               <button
//                 key={q._id}
//                 onClick={() => setCurrent(index)}
//                 className={`
//                   w-10 h-10
//                   rounded-lg
//                   text-sm font-medium
//                   transition

//                   ${
//                     isCurrent
//                       ? "bg-black text-white"
//                       : isAnswered
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-200 dark:bg-gray-700"
//                   }
//                 `}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>

//         {/* Legend */}
//         <div className="mt-6 space-y-2 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-black rounded"></div>
//             Current
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-green-500 rounded"></div>
//             Answered
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
//             Not Answered
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";

export default function TestAttempt() {
  const navigate = useNavigate();
  const { id } = useParams();
  const hasSubmitted = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const expiryRef = useRef(null);

  const handleSubmit = async () => {
    if (hasSubmitted.current) return;

    hasSubmitted.current = true;

    clearInterval(timerRef.current);

    try {
      const res = await API.post(`/practice/submit/${id}`, { answers });
      toast.success("Test submitted successfully! 🎉");
      navigate(`/practice/result/${id}`, {
        state: res.data,
      });
    } catch (err) {
      if (err.response?.status === 400) {
        navigate(`/practice/result/${id}`);
        toast.error("Already submitted");
      } else {
        console.log("Submission failed:", err.response?.data);
        toast.error("Failed to submit test");
      }
    }
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await API.get(`/practice/test/${id}`);

        setQuestions(res.data.questions);

        const start = new Date(res.data.startTime).getTime();
        const duration = res.data.duration * 1000;

        expiryRef.current = start + duration;

        timerRef.current = setInterval(() => {
          const remaining = Math.floor((expiryRef.current - Date.now()) / 1000);

          if (remaining <= 0) {
            if (!hasSubmitted.current) {
              hasSubmitted.current = true;

              clearInterval(timerRef.current);

              handleSubmit();
            }

            setTimeLeft(0);
            return;
          }

          setTimeLeft(remaining);
        }, 1000);
      } catch {
        console.log("Failed to load test");
        toast.error("Failed to load test");
      }
    };

    fetchTest();

    return () => clearInterval(timerRef.current);
  }, [id]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading Test...</p>
      </div>
    );
  }

  const question = questions[current];

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [question._id]: option,
    }));
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeLeft < 60;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 grid grid-cols-4 gap-8">
      {/* ✅ QUESTION AREA */}
      <div className="col-span-3">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          {/* Question Count */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-sm font-semibold px-3 py-1.5"
              >
                Question {current + 1} of {questions.length}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-800"
              >
                {answeredCount} answered
              </Badge>
            </div>

            <div
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all
                ${
                  isTimeCritical
                    ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800"
                    : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800"
                }
              `}
            >
              <Clock size={18} />
              <span className="text-lg tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-semibold mb-6 leading-relaxed text-gray-900 dark:text-gray-100">
            {question.questionText}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const selected = answers[question._id] === opt;
              const optionLabel = String.fromCharCode(65 + i);

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`
                    w-full text-left
                    p-4 rounded-xl border-2
                    transition-all duration-200
                    flex items-start gap-3

                    ${
                      selected
                        ? "border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/30 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <span
                    className={`
                      w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                      ${
                        selected
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }
                    `}
                  >
                    {optionLabel}
                  </span>
                  <span
                    className={`
                      flex-1 pt-0.5 font-medium
                      ${
                        selected
                          ? "text-purple-900 dark:text-purple-200"
                          : "text-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {opt}
                  </span>
                  {selected && (
                    <CheckCircle2
                      size={20}
                      className="text-purple-600 dark:text-purple-400 flex-shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((prev) => prev - 1)}
              className="
                px-6 py-2.5 rounded-xl font-medium
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all
              "
            >
              Previous
            </button>

            <button
              disabled={hasSubmitted.current}
              onClick={() =>
                current === questions.length - 1
                  ? handleSubmit()
                  : setCurrent((prev) => prev + 1)
              }
              className={`
                px-8 py-2.5 rounded-xl font-semibold text-white
                transition-all transform hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                ${
                  current === questions.length - 1
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                }
              `}
            >
              {current === questions.length - 1 ? "Submit Test" : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ QUESTION PALETTE */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm h-fit sticky top-8 border border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Questions
        </h3>

        <div className="grid grid-cols-5 gap-2.5">
          {questions.map((q, index) => {
            const isAnswered = answers[q._id];
            const isCurrent = index === current;

            return (
              <button
                key={q._id}
                onClick={() => setCurrent(index)}
                className={`
                  aspect-square
                  rounded-lg
                  text-sm font-semibold
                  transition-all duration-200

                  ${
                    isCurrent
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md ring-2 ring-purple-300 dark:ring-purple-700 scale-110"
                      : isAnswered
                        ? "bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 space-y-2.5 text-sm pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-md"></div>
            <span className="text-gray-700 dark:text-gray-300">Current</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-green-500 dark:bg-green-600 rounded-md"></div>
            <span className="text-gray-700 dark:text-gray-300">Answered</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <span className="text-gray-700 dark:text-gray-300">Not Answered</span>
          </div>
        </div>
      </div>
    </div>
  );
}