import { useLocation, useNavigate } from "react-router";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CheckCircle, ArrowLeft, Brain, TrendingUp } from "lucide-react";

const InterviewFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const feedback = location.state?.feedback;

  if (!feedback) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No feedback available</p>
      </div>
    );
  }

  const scoreColor =
    feedback.overallScore >= 8
      ? "text-green-500"
      : feedback.overallScore >= 6
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Interview Feedback
          </h1>

          <Button
            variant="outline"
            onClick={() => navigate("/interview")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Reports
          </Button>
        </div>

        {/* SCORE CARD */}

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              Overall Performance
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 text-center">
            <h2 className={`text-5xl font-bold ${scoreColor}`}>
              {feedback.overallScore}/10
            </h2>

            <p className="text-muted-foreground mt-2">AI Evaluation Score</p>
          </CardContent>
        </Card>

        {/* STRENGTHS */}

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Strengths
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <ul className="space-y-2">
              {feedback.strengths?.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* WEAKNESSES */}

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-red-50 dark:bg-red-950/30 border-b">
            <CardTitle className="flex items-center gap-2">
              <Brain className="text-red-500" />
              Areas to Improve
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <ul className="space-y-2">
              {feedback.weaknesses?.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* SUGGESTIONS */}

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b">
            <CardTitle>Suggestions for Improvement</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <ul className="space-y-2">
              {feedback.suggestions?.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-500 font-bold">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b">
            <CardTitle>💡 Interview Tip</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
              Use the STAR method while answering behavioral questions:
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">→</span>
                <b>S</b>ituation – Describe the context
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">→</span>
                <b>T</b>ask – Explain your responsibility
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">→</span>
                <b>A</b>ction – What actions you took
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">→</span>
                <b>R</b>esult – What was the outcome
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewFeedback;
