import { useState, useRef, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Upload, FileText, Sparkles, Clock, Target } from "lucide-react";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef();

  // Fetch reports on component mount
  useEffect(() => {
    getReports();
  }, []);

  const handleFileUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert("Job description is required");
      return;
    }

    if (!file && !selfDescription.trim()) {
      alert("Upload resume or provide self description");
      return;
    }

    const report = await generateReport({
      jobDescription,
      selfDescription,
      resume: file,
    });

    if (report?._id) {
      navigate(`/interview/${report._id}`);
    }
  };

  function LoadingScreen() {
    return (
      <div className="flex flex-col items-center justify-center gap-0 py-12">
        {/* ── Rolling circles ── */}
        <div className="relative w-[120px] h-[120px] mb-10">
          {/* Static center dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-5 h-5 rounded-full bg-gray-900 dark:bg-white opacity-10"
          />

          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-[1.5px]
                        border-transparent border-t-gray-900/20 border-r-gray-900/20
                        dark:border-t-white/20 dark:border-r-white/20
                        animate-spin [animation-duration:2.4s]"
          />

          {/* Middle ring */}
          <div
            className="absolute top-1/2 left-1/2 w-[88px] h-[88px]
                        -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]
                        border-transparent border-t-gray-900/30 border-l-gray-900/30
                        dark:border-t-white/30 dark:border-l-white/30
                        animate-spin [animation-duration:1.8s] [animation-direction:reverse]"
          />

          {/* Inner ring */}
          <div
            className="absolute top-1/2 left-1/2 w-14 h-14
                        -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]
                        border-transparent border-t-gray-900/50 dark:border-t-white/50
                        animate-spin [animation-duration:1.1s]"
          />
        </div>

        {/* ── Text ── */}
        <h3 className="text-[17px] font-medium text-gray-900 dark:text-gray-50 text-center mb-2">
          We are generating your interview report
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          Kindly wait for a few seconds
        </p>

        {/* ── Bouncing dots ── */}
        <div className="flex gap-1.5 items-center mb-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white opacity-20
                       animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* ── Step indicators ── */}
        <div className="flex flex-col gap-2.5 w-full max-w-sm">
          {[
            { label: "Collecting interview responses", state: "done" },
            { label: "Analysing your answers", state: "active" },
            { label: "Evaluating strengths & gaps", state: "waiting" },
            { label: "Compiling final report", state: "waiting" },
          ].map(({ label, state }) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border
              ${
                state === "done"
                  ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                  : state === "active"
                    ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-40"
              }`}
            >
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                {state === "done" && (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      className="text-green-600 dark:text-green-400"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {state === "active" && (
                  <div
                    className="w-4 h-4 rounded-full border-[1.5px]
                                border-gray-300 dark:border-gray-600
                                border-t-gray-900 dark:border-t-white
                                animate-spin"
                  />
                )}
              </div>
              <span
                className={`text-[13px] ${
                  state === "waiting"
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 md:p-8">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HERO */}
        <section className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles
              className="text-purple-600 dark:text-purple-400"
              size={24}
            />
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-300 dark:border-purple-700">
              AI Interview Preparation
            </Badge>
            <Sparkles
              className="text-purple-600 dark:text-purple-400"
              size={24}
            />
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Crack Every Interview
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload your resume and job description to generate a personalized
            interview preparation strategy powered by AI.
          </p>
        </section>

        {/* GENERATOR */}
        <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b border-gray-200 dark:border-gray-800">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target
                size={24}
                className="text-purple-600 dark:text-purple-400"
              />
              Create Interview Plan
            </CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-8 pt-8">
            {/* JOB DESCRIPTION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Job Description</span>
                <Badge variant="destructive">Required</Badge>
              </div>

              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here... Include role, responsibilities, and required skills."
                className="h-48 resize-none overflow-y-auto border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
              />
            </div>

            {/* PROFILE */}
            <div className="space-y-6">
              {/* FILE UPLOAD */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Resume</span>
                </div>

                {file ? (
                  <Card className="p-4 flex justify-between items-center border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                    <div>
                      <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                        ✓ {file.name}
                      </p>

                      <p className="text-xs text-green-700 dark:text-green-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={removeFile}
                    >
                      Remove
                    </Button>
                  </Card>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-dashed border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-semibold"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload size={18} className="mr-2" />
                    Upload Resume (PDF/DOCX)
                  </Button>
                )}

                <input
                  hidden
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
              </div>

              <Separator />

              {/* SELF DESCRIPTION */}
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>Self Description</span>
              </div>
              <Textarea
                placeholder="describe your skills, experience, and background here..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="min-h-32 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
              />

              <Alert className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800">
                <AlertDescription className="text-blue-900 dark:text-blue-200 font-medium">
                  💡 Tip: Both a resume and self description are required.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>AI generation ~30 seconds</span>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold h-11 px-8"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Generate Strategy
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* RECENT REPORTS */}

        {reports?.length > 0 && (
          <section className="space-y-6 pb-12">
            <h2 className="text-3xl font-bold">Recent Interview Plans</h2>

            <ScrollArea className="h-100 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <div className="grid md:grid-cols-2 gap-6">
                {reports.map((r) => {
                  const scoreColor =
                    r.matchScore >= 80
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700"
                      : r.matchScore >= 60
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700";

                  return (
                    <Card
                      key={r._id}
                      className="cursor-pointer hover:shadow-lg border-2 border-gray-200 dark:border-gray-800 transition-all hover:border-purple-400 dark:hover:border-purple-600"
                      onClick={() => navigate(`/interview/${r._id}`)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-2">
                          {r.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>

                        <Badge
                          className={`font-bold text-base border-2 ${scoreColor}`}
                        >
                          {r.matchScore}%
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
