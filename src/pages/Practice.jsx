import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTest } from "../api/practice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  Brain,
  Target,
  FileQuestion,
  Rocket,
  Sparkles,
  Clock,
  Code,
  Calculator,
} from "lucide-react";

export default function Practice() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("easy");
  const [totalQuestions, setTotalQuestions] = useState("10");
  const [testType, setTestType] = useState("aptitude");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    console.log("Generating with:", {
      difficulty,
      totalQuestions,
      testType,
    });

    setGenerating(true);

    try {
      const res = await generateTest({
        difficulty,
        totalQuestions: Number(totalQuestions),
        testType,
      });

      console.log("TEST RESPONSE:", res);

      navigate(`/practice/test/${res.testId}`);
      toast.success("Practice test generated successfully! 🎉");
    } catch (err) {
      console.log("GEN ERROR:", err.response?.data || err);
      toast.error("Failed to generate test");
    } finally {
      setGenerating(false);
    }
  };

  const difficultyConfig = {
    easy: {
      color:
        "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
      icon: "🟢",
      desc: "Perfect for beginners",
    },
    medium: {
      color:
        "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      icon: "🟡",
      desc: "Moderate challenge",
    },
    hard: {
      color:
        "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
      icon: "🔴",
      desc: "For advanced learners",
    },
  };

  const estimatedTime = Math.ceil(Number(totalQuestions) * 1.5);

  return (
    <div className="space-y-8 max-w-3xl">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Tests</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Configure your personalized test and start practicing
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Difficulty
              </p>
              <p className="font-bold capitalize">{difficulty}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FileQuestion
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Questions
              </p>
              <p className="font-bold">{totalQuestions}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Est. Time
              </p>
              <p className="font-bold">~{estimatedTime} min</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CONFIG CARD */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
          <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold">Test Configuration</h2>
        </div>

        {/* Test Type - FIXED WITH MORE SPACING */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
            <Brain size={18} />
            Test Type
          </label>
          <Select value={testType} onValueChange={setTestType}>
            <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900">
              <SelectItem value="aptitude" className="h-16 cursor-pointer">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Calculator size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-base">Aptitude</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Logical reasoning & mathematics
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="technical" className="h-16 cursor-pointer">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Code size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-base">Technical</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Programming & CS concepts
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
            <Target size={18} />
            Difficulty Level
          </label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900">
              {Object.entries(difficultyConfig).map(([key, config]) => (
                <SelectItem key={key} value={key} className="h-14 cursor-pointer">
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-2xl">{config.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold capitalize text-base">{key}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {config.desc}
                      </p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge
            className={`${difficultyConfig[difficulty].color} px-3 py-1.5 text-xs font-medium`}
          >
            {difficultyConfig[difficulty].icon} Selected:{" "}
            {difficultyConfig[difficulty].desc}
          </Badge>
        </div>

        {/* Total Questions */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
            <FileQuestion size={18} />
            Number of Questions
          </label>
          <Select value={totalQuestions} onValueChange={setTotalQuestions}>
            <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900">
              <SelectItem value="5" className="h-12 cursor-pointer">
                <div className="flex items-center justify-between w-full gap-8 py-1">
                  <span className="font-semibold text-base">5 Questions</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ~8 min
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="10" className="h-12 cursor-pointer">
                <div className="flex items-center justify-between w-full gap-8 py-1">
                  <span className="font-semibold text-base">10 Questions</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ~15 min
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="15" className="h-12 cursor-pointer">
                <div className="flex items-center justify-between w-full gap-8 py-1">
                  <span className="font-semibold text-base">15 Questions</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ~23 min
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="20" className="h-12 cursor-pointer">
                <div className="flex items-center justify-between w-full gap-8 py-1">
                  <span className="font-semibold text-base">20 Questions</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ~30 min
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-1">
                Your Custom Test
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                You'll get <strong>{totalQuestions} {testType}</strong> questions
                at <strong>{difficulty}</strong> level. Estimated time:{" "}
                <strong>~{estimatedTime} minutes</strong>
              </p>
            </div>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
        >
          {generating ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating Your Test...
            </>
          ) : (
            <>
              <Rocket size={20} className="mr-2" />
              Generate Test & Start Practicing
            </>
          )}
        </Button>
      </div>
    </div>
  );
}