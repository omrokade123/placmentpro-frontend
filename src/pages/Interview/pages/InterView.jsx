import { useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useParams, useNavigate } from "react-router";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Progress } from "@/components/ui/progress";

import { ArrowLeft, Zap, Brain, Calendar, FileDown, Target } from "lucide-react";

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { report, getReportById, loading } = useInterview();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading interview report...</p>
      </div>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "text-green-500"
      : report.matchScore >= 60
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Interview Preparation Guide
          </h1>

          <p className="text-muted-foreground text-lg flex items-center gap-2">
            <Target size={18} className="text-purple-600 dark:text-purple-400" />
            Role: <span className="font-semibold text-gray-900 dark:text-white">{report.title}</span>
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => navigate("/interview")}
          className="h-11 gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      {/* MATCH SCORE */}
      <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap size={22} className="text-yellow-500" />
            Match Score
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">

          <Progress value={report.matchScore} className="h-3" />

          <div className="flex items-center justify-between">
            <p className={`text-3xl font-bold ${scoreColor}`}>
              {report.matchScore}%
            </p>
            
            <Badge className={scoreColor + " border-2 text-base px-4 py-2"}>
              {report.matchScore >= 80
                ? "Strong Match"
                : report.matchScore >= 60
                ? "Good Match"
                : "Needs Work"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            {report.matchScore >= 80
              ? "✓ Excellent fit for this role. Focus on mastering the technical depth."
              : report.matchScore >= 60
              ? "→ Good foundation. Fill the skill gaps for stronger candidacy."
              : "⚠ Significant skill gaps detected. Priority areas highlighted below."}
          </p>

        </CardContent>
      </Card>

      {/* SKILL GAPS */}
      <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Brain size={22} className="text-red-600 dark:text-red-400" />
            Skill Gaps
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            {report.skillGaps.map((gap, i) => (
              <Badge key={i} className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-2 border-red-300 dark:border-red-700 text-sm px-3 py-2">
                {gap.skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MAIN CONTENT */}
      <Tabs defaultValue="technical" className="space-y-4">

        <TabsList className="grid grid-cols-3 w-full h-12 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="technical" className="rounded-md font-semibold">⚙️ Technical</TabsTrigger>
          <TabsTrigger value="behavioral" className="rounded-md font-semibold">💬 Behavioral</TabsTrigger>
          <TabsTrigger value="roadmap" className="rounded-md font-semibold">🗺️ Roadmap</TabsTrigger>
        </TabsList>

        {/* TECHNICAL QUESTIONS */}
        <TabsContent value="technical">
          <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/30 border-b border-gray-200 dark:border-gray-800">
              <CardTitle>Technical Questions</CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="space-y-2">

                {report.technicalQuestions.map((q, i) => (
                  <AccordionItem key={i} value={`tech-${i}`} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg px-4">

                    <AccordionTrigger className="text-left font-semibold hover:text-blue-600 dark:hover:text-blue-400">
                      Q{i + 1}. {q.question}
                    </AccordionTrigger>

                    <AccordionContent className="space-y-4 pt-4">

                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2">
                          💡 What the interviewer wants to know:
                        </p>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          {q.intention}
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                        <p className="text-sm font-bold text-green-900 dark:text-green-200 mb-2">
                          ✓ Model Answer:
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-300">
                          {q.answer}
                        </p>
                      </div>

                    </AccordionContent>

                  </AccordionItem>
                ))}

              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BEHAVIORAL QUESTIONS */}
        <TabsContent value="behavioral">
          <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <CardHeader className="bg-purple-50 dark:bg-purple-950/30 border-b border-gray-200 dark:border-gray-800">
              <CardTitle>Behavioral Questions</CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="space-y-2">

                {report.behavioralQuestions.map((q, i) => (
                  <AccordionItem key={i} value={`beh-${i}`} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg px-4">

                    <AccordionTrigger className="text-left font-semibold hover:text-purple-600 dark:hover:text-purple-400">
                      Q{i + 1}. {q.question}
                    </AccordionTrigger>

                    <AccordionContent className="space-y-4 pt-4">

                      <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                        <p className="text-sm font-bold text-purple-900 dark:text-purple-200 mb-2">
                          💡 What the interviewer wants to know:
                        </p>
                        <p className="text-sm text-purple-800 dark:text-purple-300">
                          {q.intention}
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                        <p className="text-sm font-bold text-green-900 dark:text-green-200 mb-2">
                          ✓ Model Answer:
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-300">
                          {q.answer}
                        </p>
                      </div>

                    </AccordionContent>

                  </AccordionItem>
                ))}

              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROADMAP */}
        <TabsContent value="roadmap">
          <div className="grid gap-4">

            {report.preparationPlan.map((day) => (

              <Card key={day.day} className="border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
                <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b border-gray-200 dark:border-gray-800">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar size={20} className="text-green-600 dark:text-green-400" />
                    Day {day.day} — {day.focus}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-4">

                  <ul className="space-y-2">

                    {day.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-green-600 dark:text-green-400 font-bold mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{task}</span>
                      </li>
                    ))}

                  </ul>

                </CardContent>

              </Card>

            ))}

          </div>
        </TabsContent>

      </Tabs>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

        <Button
          variant="outline"
          className="h-12 border-2 gap-2"
          onClick={() => navigate("/interview")}
        >
          <ArrowLeft size={18} />
          Back to Plans
        </Button>

      </div>

      </div>
    </div>
  );
}

export default Interview;