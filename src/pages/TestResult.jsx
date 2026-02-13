import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Home,
  RotateCcw,
  Award,
  Brain,
  AlertCircle,
} from "lucide-react";

export default function TestResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await API.get(`/practice/result/${id}`);
        setResult(res.data);
      } catch (err) {
        console.error(err);
        navigate("/practice");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading Result...
        </p>
      </div>
    );
  }

  if (!result) return null;

  const accuracy = result?.accuracy ? result.accuracy.toFixed(1) : "0";
  const correctAnswers = result.score;
  const totalQuestions = result.review.length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Performance level
  const getPerformanceConfig = () => {
    if (accuracy >= 80) {
      return {
        message: "Excellent Performance!",
        emoji: "🎉",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        borderColor: "border-green-200 dark:border-green-800",
        icon: (
          <Trophy className="text-green-600 dark:text-green-400" size={32} />
        ),
      };
    } else if (accuracy >= 50) {
      return {
        message: "Good Job - Keep Improving!",
        emoji: "👍",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        icon: (
          <Target className="text-yellow-600 dark:text-yellow-400" size={32} />
        ),
      };
    } else {
      return {
        message: "Needs Improvement - Practice More!",
        emoji: "💪",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        borderColor: "border-red-200 dark:border-red-800",
        icon: (
          <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
        ),
      };
    }
  };

  const performanceConfig = getPerformanceConfig();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Test Results</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here's how you performed
          </p>
        </div>

        {/* SCORE CARD */}
        <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
          {/* Score Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Brain size={32} />
              </div>
            </div>
            <h2 className="text-6xl font-bold mb-2">
              {correctAnswers}/{totalQuestions}
            </h2>
            <p className="text-xl opacity-90">Accuracy: {accuracy}%</p>
          </div>

          <CardContent className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Total
                </p>
                <p className="text-2xl font-bold">{totalQuestions}</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                  Correct
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {correctAnswers}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                  Incorrect
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {incorrectAnswers}
                </p>
              </div>
            </div>

            {/* Performance Message */}
            <div
              className={`${performanceConfig.bgColor} border-2 ${performanceConfig.borderColor} rounded-xl p-4 mb-6`}
            >
              <div className="flex items-center gap-3">
                {performanceConfig.icon}
                <div>
                  <p className={`text-lg font-bold ${performanceConfig.color}`}>
                    {performanceConfig.message} {performanceConfig.emoji}
                  </p>
                </div>
              </div>
            </div>

            {/* Topics Section */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Strong Topics */}
              {result.strongTopics?.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp
                      size={18}
                      className="text-green-600 dark:text-green-400"
                    />
                    <h3 className="font-semibold text-green-900 dark:text-green-200">
                      Strengths
                    </h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {result.strongTopics.map((topic, idx) => (
                      <Badge
                        key={idx}
                        className="bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Weak Topics */}
              {result.weakTopics?.length > 0 && (
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown
                      size={18}
                      className="text-red-600 dark:text-red-400"
                    />
                    <h3 className="font-semibold text-red-900 dark:text-red-200">
                      Focus Areas
                    </h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {result.weakTopics.map((topic, idx) => (
                      <Badge
                        key={idx}
                        className="bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/practice")}
                variant="outline"
                className="flex-1 h-12 font-semibold"
              >
                <RotateCcw size={18} className="mr-2" />
                Take Another Test
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                className="flex-1 h-12 font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Home size={18} className="mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* REVIEW SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-2xl font-bold">Answer Review</h2>
          </div>

          {result.review.map((item, index) => (
            <Card
              key={index}
              className={`rounded-xl border-2 overflow-hidden transition-all hover:shadow-md ${
                item.isCorrect
                  ? "border-green-200 dark:border-green-800"
                  : "border-red-200 dark:border-red-800"
              }`}
            >
              <CardContent className="p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-semibold text-lg flex-1">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      Q{index + 1}.
                    </span>
                    {item.question}
                  </h3>
                  {item.isCorrect ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700 flex items-center gap-1 px-3 py-1">
                      <CheckCircle2 size={14} />
                      Correct
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700 flex items-center gap-1 px-3 py-1">
                      <XCircle size={14} />
                      Incorrect
                    </Badge>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {item.options.map((opt, i) => {
                    const isUser = opt === item.selectedAnswer;
                    const isCorrect = opt === item.correctAnswer;
                    const optionLabel = String.fromCharCode(65 + i);

                    let className = "p-4 rounded-lg border-2 transition-all ";

                    if (isCorrect) {
                      className +=
                        "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30";
                    } else if (isUser) {
                      className +=
                        "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30";
                    } else {
                      className +=
                        "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50";
                    }

                    return (
                      <div key={i} className={className}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <span
                              className={`
                                w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                                ${
                                  isCorrect
                                    ? "bg-green-600 text-white"
                                    : isUser
                                      ? "bg-red-600 text-white"
                                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                }
                              `}
                            >
                              {optionLabel}
                            </span>
                            <span
                              className={`font-medium ${
                                isCorrect
                                  ? "text-green-900 dark:text-green-200"
                                  : isUser
                                    ? "text-red-900 dark:text-red-200"
                                    : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {opt}
                            </span>
                          </div>

                          {isCorrect && (
                            <Badge className="bg-green-600 text-white flex items-center gap-1">
                              <CheckCircle2 size={14} />
                              Correct Answer
                            </Badge>
                          )}

                          {isUser && !isCorrect && (
                            <Badge className="bg-red-600 text-white flex items-center gap-1">
                              <XCircle size={14} />
                              Your Answer
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary for incorrect answers - ADDED */}
                {!item.isCorrect && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex items-start gap-2">
                      <XCircle size={16} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          Your answer:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.selectedAnswer || "Not answered"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          Correct answer:
                        </span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.correctAnswer}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}