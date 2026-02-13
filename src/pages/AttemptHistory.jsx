import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Target,
  TrendingUp,
  Eye,
  Award,
  AlertCircle,
  FileText,
  Clock,
} from "lucide-react";

export default function AttemptHistory() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await API.get("/practice/attempts");
        setAttempts(res.data);
      } catch (error) {
        console.error("Failed to fetch attempts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return {
          color:
            "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
          icon: "🟢",
        };
      case "medium":
        return {
          color:
            "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
          icon: "🟡",
        };
      case "hard":
        return {
          color:
            "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
          icon: "🔴",
        };
      default:
        return {
          color:
            "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
          icon: "⚪",
        };
    }
  };

  const getPerformanceBadge = (accuracy) => {
    if (accuracy >= 80) {
      return {
        label: "Excellent",
        color:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700",
        icon: <Award size={14} />,
      };
    } else if (accuracy >= 60) {
      return {
        label: "Good",
        color:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700",
        icon: <TrendingUp size={14} />,
      };
    } else if (accuracy >= 40) {
      return {
        label: "Fair",
        color:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700",
        icon: <Target size={14} />,
      };
    } else {
      return {
        label: "Needs Work",
        color:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700",
        icon: <AlertCircle size={14} />,
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading attempts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Attempt History
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track your progress and review past tests
              </p>
            </div>
          </div>
        </div>

        {/* STATS SUMMARY */}
        {attempts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total Tests
                  </p>
                  <p className="text-xl font-bold">{attempts.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Target
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Avg. Accuracy
                  </p>
                  <p className="text-xl font-bold">
                    {(
                      attempts.reduce((sum, a) => sum + (a.accuracy || 0), 0) /
                      attempts.length
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Award
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Best Score
                  </p>
                  <p className="text-xl font-bold">
                    {Math.max(...attempts.map((a) => a.accuracy || 0)).toFixed(
                      1,
                    )}
                    %
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* EMPTY STATE */}
        {attempts.length === 0 && (
          <Card className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-gray-400 dark:text-gray-500" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">No attempts yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
                You haven't taken any practice tests yet. Start practicing to
                see your history here!
              </p>
              <Button
                onClick={() => navigate("/practice")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Take Your First Test
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ATTEMPTS LIST */}
        <div className="space-y-4">
          {attempts.map((attempt, index) => {
            const difficultyConfig = getDifficultyConfig(
              attempt.testId?.difficulty,
            );
            const performanceBadge = getPerformanceBadge(attempt.accuracy || 0);
            const accuracy = attempt.accuracy?.toFixed(1) ?? 0;

            return (
              <Card
                key={attempt._id || index}
                className="rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="p-4 md:p-6">
                  {/* Mobile Layout */}
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                          <FileText
                            size={20}
                            className="text-purple-600 dark:text-purple-400"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-lg">
                            {attempt.score} / {attempt.testId?.totalQuestions}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Score
                          </p>
                        </div>
                      </div>

                      {/* Performance Badge */}
                      <Badge
                        className={`${performanceBadge.color} flex items-center gap-1.5 px-3 py-1.5 font-medium w-fit`}
                      >
                        {performanceBadge.icon}
                        {performanceBadge.label}
                      </Badge>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp
                            size={14}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Accuracy
                          </p>
                        </div>
                        <p className="font-bold text-lg">{accuracy}%</p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-1">
                          <Target
                            size={14}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Difficulty
                          </p>
                        </div>
                        <Badge
                          className={`${difficultyConfig.color} text-xs px-2 py-0.5 w-fit`}
                        >
                          {difficultyConfig.icon}{" "}
                          <span className="capitalize ml-1">
                            {attempt.testId?.difficulty || "N/A"}
                          </span>
                        </Badge>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar
                            size={14}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Date
                          </p>
                        </div>
                        <p className="font-semibold text-sm">
                          {new Date(attempt.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText
                            size={14}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Type
                          </p>
                        </div>
                        <p className="font-semibold text-sm capitalize">
                          {attempt.testId?.testType || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Weak Topics */}
                    {attempt.weakTopics && attempt.weakTopics.length > 0 && (
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle
                            size={14}
                            className="text-red-600 dark:text-red-400"
                          />
                          <p className="text-xs font-semibold text-red-900 dark:text-red-200">
                            Focus Areas
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {attempt.weakTopics.map((topic, idx) => (
                            <Badge
                              key={idx}
                              className="bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700 text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={() =>
                        navigate(`/practice/result/${attempt._id}`)
                      }
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-11 font-semibold"
                    >
                      <Eye size={18} className="mr-2" />
                      View Detailed Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
