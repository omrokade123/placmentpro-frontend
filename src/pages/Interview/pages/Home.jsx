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
  CardFooter
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
      resume: file
    });

    if (report?._id) {
      navigate(`/interview/${report._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">

      {/* HERO */}
      <section className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-300 dark:border-purple-700">
            AI Interview Preparation
          </Badge>
          <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Crack Every Interview
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Upload your resume and job description to generate a
          personalized interview preparation strategy powered by AI.
        </p>

      </section>


      {/* GENERATOR */}
      <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">

        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target size={24} className="text-purple-600 dark:text-purple-400" />
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
              className="min-h-48 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
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

          <h2 className="text-3xl font-bold">
            Recent Interview Plans
          </h2>

          <ScrollArea className="h-100 rounded-xl border border-gray-200 dark:border-gray-800 p-4">

            <div className="grid md:grid-cols-2 gap-6">

              {reports.map((r) => {
                const scoreColor = r.matchScore >= 80 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700'
                  : r.matchScore >= 60
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700';
                
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

                      <Badge className={`font-bold text-base border-2 ${scoreColor}`}>
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
}

export default Home;