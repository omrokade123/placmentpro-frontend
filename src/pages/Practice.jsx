// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateTest } from "../api/practice";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import toast from "react-hot-toast";
// import {
//   Brain,
//   Target,
//   FileQuestion,
//   Rocket,
//   Sparkles,
//   Clock,
//   Code,
//   Calculator,
// } from "lucide-react";

// export default function Practice() {
//   const navigate = useNavigate();

//   const [difficulty, setDifficulty] = useState("easy");
//   const [totalQuestions, setTotalQuestions] = useState("10");
//   const [testType, setTestType] = useState("aptitude");
//   const [generating, setGenerating] = useState(false);

//   const handleGenerate = async () => {
//     console.log("Generating with:", {
//       difficulty,
//       totalQuestions,
//       testType,
//     });

//     setGenerating(true);

//     try {
//       const res = await generateTest({
//         difficulty,
//         totalQuestions: Number(totalQuestions),
//         testType,
//       });

//       console.log("TEST RESPONSE:", res);

//       navigate(`/practice/test/${res.testId}`);
//       toast.success("Practice test generated successfully! 🎉");
//     } catch (err) {
//       console.log("GEN ERROR:", err.response?.data || err);
//       toast.error("Failed to generate test");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const difficultyConfig = {
//     easy: {
//       color:
//         "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
//       icon: "🟢",
//       desc: "Perfect for beginners",
//     },
//     medium: {
//       color:
//         "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
//       icon: "🟡",
//       desc: "Moderate challenge",
//     },
//     hard: {
//       color:
//         "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
//       icon: "🔴",
//       desc: "For advanced learners",
//     },
//   };

//   const estimatedTime = Math.ceil(Number(totalQuestions) * 1.5);

//   return (
//     <div className="space-y-8 max-w-3xl">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Practice Tests</h1>
//         <p className="text-gray-500 dark:text-gray-400 mt-1">
//           Configure your personalized test and start practicing
//         </p>
//       </div>

//       {/* QUICK STATS */}
//       <div className="grid grid-cols-3 gap-4">
//         <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//               <Target size={20} className="text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Difficulty
//               </p>
//               <p className="font-bold capitalize">{difficulty}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
//               <FileQuestion
//                 size={20}
//                 className="text-purple-600 dark:text-purple-400"
//               />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Questions
//               </p>
//               <p className="font-bold">{totalQuestions}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-800">
//           <CardContent className="p-4 flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
//               <Clock size={20} className="text-green-600 dark:text-green-400" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Est. Time
//               </p>
//               <p className="font-bold">~{estimatedTime} min</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* CONFIG CARD */}
//       <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
//         <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
//           <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />
//           <h2 className="text-xl font-bold">Test Configuration</h2>
//         </div>

//         {/* Test Type - FIXED WITH MORE SPACING */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
//             <Brain size={18} />
//             Test Type
//           </label>
//           <Select value={testType} onValueChange={setTestType}>
//             <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-white dark:bg-gray-900">
//               <SelectItem value="aptitude" className="h-16 cursor-pointer">
//                 <div className="flex items-center gap-3 py-2">
//                   <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                     <Calculator size={20} className="text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-semibold text-base">Aptitude</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Logical reasoning & mathematics
//                     </p>
//                   </div>
//                 </div>
//               </SelectItem>
//               <SelectItem value="technical" className="h-16 cursor-pointer">
//                 <div className="flex items-center gap-3 py-2">
//                   <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
//                     <Code size={20} className="text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-semibold text-base">Technical</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Programming & CS concepts
//                     </p>
//                   </div>
//                 </div>
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Difficulty */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
//             <Target size={18} />
//             Difficulty Level
//           </label>
//           <Select value={difficulty} onValueChange={setDifficulty}>
//             <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-white dark:bg-gray-900">
//               {Object.entries(difficultyConfig).map(([key, config]) => (
//                 <SelectItem key={key} value={key} className="h-14 cursor-pointer">
//                   <div className="flex items-center gap-3 py-1">
//                     <span className="text-2xl">{config.icon}</span>
//                     <div className="text-left">
//                       <p className="font-semibold capitalize text-base">{key}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {config.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Badge
//             className={`${difficultyConfig[difficulty].color} px-3 py-1.5 text-xs font-medium`}
//           >
//             {difficultyConfig[difficulty].icon} Selected:{" "}
//             {difficultyConfig[difficulty].desc}
//           </Badge>
//         </div>

//         {/* Total Questions */}
//         <div className="space-y-3">
//           <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
//             <FileQuestion size={18} />
//             Number of Questions
//           </label>
//           <Select value={totalQuestions} onValueChange={setTotalQuestions}>
//             <SelectTrigger className="h-14 text-base border-2 bg-white dark:bg-gray-900">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-white dark:bg-gray-900">
//               <SelectItem value="5" className="h-12 cursor-pointer">
//                 <div className="flex items-center justify-between w-full gap-8 py-1">
//                   <span className="font-semibold text-base">5 Questions</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     ~8 min
//                   </span>
//                 </div>
//               </SelectItem>
//               <SelectItem value="10" className="h-12 cursor-pointer">
//                 <div className="flex items-center justify-between w-full gap-8 py-1">
//                   <span className="font-semibold text-base">10 Questions</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     ~15 min
//                   </span>
//                 </div>
//               </SelectItem>
//               <SelectItem value="15" className="h-12 cursor-pointer">
//                 <div className="flex items-center justify-between w-full gap-8 py-1">
//                   <span className="font-semibold text-base">15 Questions</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     ~23 min
//                   </span>
//                 </div>
//               </SelectItem>
//               <SelectItem value="20" className="h-12 cursor-pointer">
//                 <div className="flex items-center justify-between w-full gap-8 py-1">
//                   <span className="font-semibold text-base">20 Questions</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     ~30 min
//                   </span>
//                 </div>
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Info Box */}
//         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
//           <div className="flex items-start gap-3">
//             <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
//               <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-1">
//                 Your Custom Test
//               </h4>
//               <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
//                 You'll get <strong>{totalQuestions} {testType}</strong> questions
//                 at <strong>{difficulty}</strong> level. Estimated time:{" "}
//                 <strong>~{estimatedTime} minutes</strong>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* GENERATE BUTTON */}
//         <Button
//           onClick={handleGenerate}
//           disabled={generating}
//           className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
//         >
//           {generating ? (
//             <>
//               <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//               Generating Your Test...
//             </>
//           ) : (
//             <>
//               <Rocket size={20} className="mr-2" />
//               Generate Test & Start Practicing
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }

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
  Zap,
  TrendingUp,
  Award,
  ChevronDown,
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

  const testTypeConfig = {
    aptitude: {
      icon: Calculator,
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      color: "text-blue-600 dark:text-blue-400",
      title: "Aptitude Test",
      desc: "Logical reasoning & mathematics",
    },
    technical: {
      icon: Code,
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      color: "text-purple-600 dark:text-purple-400",
      title: "Technical Test",
      desc: "Programming & CS concepts",
    },
  };

  const difficultyConfig = {
    easy: {
      color:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      gradient: "from-emerald-500 to-teal-500",
      icon: "🟢",
      desc: "Perfect for beginners",
      tagline: "Build confidence",
    },
    medium: {
      color:
        "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      gradient: "from-amber-500 to-orange-500",
      icon: "🟡",
      desc: "Moderate challenge",
      tagline: "Level up your skills",
    },
    hard: {
      color:
        "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      gradient: "from-rose-500 to-pink-500",
      icon: "🔴",
      desc: "For advanced learners",
      tagline: "Master the challenge",
    },
  };

  const questionsOptions = [
    { value: "5", time: 8 },
    { value: "10", time: 15 },
    { value: "15", time: 23 },
    { value: "20", time: 30 },
  ];

  const estimatedTime = Math.ceil(Number(totalQuestions) * 1.5);

  const currentTestType = testTypeConfig[testType];
  const currentDifficulty = difficultyConfig[difficulty];
  const currentQuestions = questionsOptions.find((opt) => opt.value === totalQuestions);
  const TestTypeIcon = currentTestType.icon;

  return (
    <div className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* HERO HEADER WITH GRADIENT */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-linear-to-br from-purple-600 via-indigo-600 to-blue-600 p-6 md:p-12 shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-2 md:px-3 py-1 text-xs md:text-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight">
              Practice Tests
            </h1>
            <p className="text-blue-100 text-base md:text-xl max-w-2xl">
              Configure your personalized test and master your skills with AI-generated questions
            </p>
          </div>
        </div>

        {/* STATS CARDS - Enhanced Design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
          <Card className="group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                      <Target size={20} className="text-white md:w-6 md:h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Difficulty Level
                    </p>
                    <p className="text-xl md:text-2xl font-bold capitalize mt-1 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {difficulty}
                    </p>
                  </div>
                </div>
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                      <FileQuestion size={20} className="text-white md:w-6 md:h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Total Questions
                    </p>
                    <p className="text-xl md:text-2xl font-bold mt-1 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {totalQuestions}
                    </p>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                      <Clock size={20} className="text-white md:w-6 md:h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Estimated Time
                    </p>
                    <p className="text-xl md:text-2xl font-bold mt-1 bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ~{estimatedTime} min
                    </p>
                  </div>
                </div>
                <Award className="w-4 h-4 md:w-5 md:h-5 text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAIN CONFIG CARD - Premium Design */}
        <Card className="rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-5 md:p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Test Configuration
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Customize your practice experience
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8 space-y-6 md:space-y-8">
            {/* Test Type - WORKING DROPDOWN */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain size={18} className="text-blue-600 dark:text-blue-400 md:w-5 md:h-5" />
                </div>
                <label className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  Test Type
                </label>
              </div>

              {/* Display Selected Value */}
              <div className="w-full p-4 md:p-5 border-2 border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-linear-to-br ${currentTestType.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <TestTypeIcon size={28} className="text-white md:w-8 md:h-8" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                      {currentTestType.title}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {currentTestType.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(testTypeConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const isSelected = testType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setTestType(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 shadow-lg scale-[1.02]"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-linear-to-br ${config.gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-900 dark:text-white">
                            {config.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {config.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty - WORKING DROPDOWN */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={18} className="text-orange-600 dark:text-orange-400 md:w-5 md:h-5" />
                </div>
                <label className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  Difficulty Level
                </label>
              </div>

              {/* Display Selected Value */}
              <div className="w-full p-4 md:p-5 border-2 border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${currentDifficulty.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <span className="text-3xl md:text-4xl">{currentDifficulty.icon}</span>
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-base md:text-lg capitalize text-gray-900 dark:text-white">
                      {difficulty}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {currentDifficulty.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(difficultyConfig).map(([key, config]) => {
                  const isSelected = difficulty === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setDifficulty(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? "border-orange-500 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/30 shadow-lg scale-[1.02]"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                          <span className="text-2xl">{config.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold capitalize text-sm text-gray-900 dark:text-white">
                            {key}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {config.tagline}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Questions - WORKING DROPDOWN */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileQuestion size={18} className="text-purple-600 dark:text-purple-400 md:w-5 md:h-5" />
                </div>
                <label className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  Number of Questions
                </label>
              </div>

              {/* Display Selected Value */}
              <div className="w-full p-4 md:p-5 border-2 border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="font-bold text-white text-2xl md:text-3xl">
                      {totalQuestions}
                    </span>
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
                      {totalQuestions} Questions
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={14} className="flex-shrink-0" />
                      <span>~{currentQuestions?.time || estimatedTime} minutes</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {questionsOptions.map((option) => {
                  const isSelected = totalQuestions === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTotalQuestions(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        isSelected
                          ? "border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/30 shadow-lg scale-[1.02]"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="font-bold text-white text-xl">
                            {option.value}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900 dark:text-white">
                            {option.value} Qs
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 mt-0.5">
                            <Clock size={10} />
                            {option.time}m
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary Card - Premium Style */}
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 p-4 md:p-6">
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/30 dark:bg-white/5 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles size={18} className="text-white md:w-5 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm md:text-base text-blue-900 dark:text-blue-100 mb-2">
                    🎯 Your Custom Test Ready
                  </h4>
                  <p className="text-xs md:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    Get ready for{" "}
                    <span className="font-bold px-2 py-0.5 bg-white/50 dark:bg-white/10 rounded whitespace-nowrap">
                      {totalQuestions} {testType}
                    </span>{" "}
                    questions at{" "}
                    <span className="font-bold px-2 py-0.5 bg-white/50 dark:bg-white/10 rounded whitespace-nowrap">
                      {difficulty}
                    </span>{" "}
                    level. Estimated time:{" "}
                    <span className="font-bold px-2 py-0.5 bg-white/50 dark:bg-white/10 rounded whitespace-nowrap">
                      ~{estimatedTime} min
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* GENERATE BUTTON - Enhanced with animation */}
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full h-14 md:h-16 text-base md:text-lg font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 rounded-xl md:rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {generating ? (
                <>
                  <span className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2 md:mr-3" />
                  <span className="relative z-10">Generating Your Test...</span>
                </>
              ) : (
                <>
                  <Rocket size={20} className="mr-2 md:mr-3 group-hover:animate-bounce relative z-10 md:w-6 md:h-6" />
                  <span className="relative z-10">Generate Test & Start Practicing</span>
                </>
              )}
            </Button>

            {/* Quick Tips */}
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <span>💡</span>
              <span className="text-center">Pro tip: Start with easy level to build confidence</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}