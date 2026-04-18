import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { useRef } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Brain, MessageSquare, CheckCircle } from "lucide-react";

const MockInterview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { startMockInterview, submitAnswer, loading } = useInterview();

  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const speakQuestion = (text) => {
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const startInterview = async () => {
      const data = await startMockInterview(interviewId);

      if (!data) return;

      setQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);

      speakQuestion(data.question.question);
    };

    startInterview();
  }, [interviewId]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setAnswer(transcript);
    };

    recognition.onend = () => {
      // if user didn't manually stop, restart listening
      if (isListening && recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        setIsListening(false);
      }
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  // useEffect(() => {
  //   if (question?.question) {
  //     speakQuestion(question.question);
  //   }
  // }, [question]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.warn("Recognition already started");
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    setIsListening(false);
    recognitionRef.current.stop();
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    const data = await submitAnswer(interviewId, answer);
    if (!data) {
      console.error("Submit answer failed");
      return;
    }

    setAnswer("");

    if (data.interviewCompleted) {
      navigate(`/interview/interview-feedback/${interviewId}`, {
        state: { feedback: data.feedback },
      });
    } else {
      setQuestion(data.question);
      setQuestionNumber(data.questionNumber);

      speakQuestion(data.question.question);
    }
  };

  if (loading || (!question && !feedback)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Starting interview...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Mock Interview
          </h1>

          <Button
            variant="outline"
            onClick={() => navigate("/interview")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Exit Interview
          </Button>
        </div>

        {/* PROGRESS */}

        {!feedback && (
          <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={20} className="text-purple-600" />
                Interview Progress
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Progress
                value={(questionNumber / totalQuestions) * 100}
                className="h-3"
              />

              <div className="flex justify-between text-sm">
                <Badge variant="secondary">
                  Question {questionNumber} / {totalQuestions}
                </Badge>

                <Badge>
                  {question?.type === "behavioral" ? "Behavioral" : "Technical"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* QUESTION SECTION */}

        {!feedback && (
          <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <CardHeader className="bg-purple-50 dark:bg-purple-950/30 border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare size={20} />
                Interview Question
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <p className="text-lg font-medium leading-relaxed">
                {question?.question}
              </p>

              <textarea
                className="w-full border rounded-lg p-4 min-h-[140px] bg-white dark:bg-gray-900"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {isListening && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-end gap-1 h-6">
                    <span className="w-1 bg-red-500 animate-[wave_1s_infinite]"></span>
                    <span className="w-1 bg-red-500 animate-[wave_1s_infinite_0.2s]"></span>
                    <span className="w-1 bg-red-500 animate-[wave_1s_infinite_0.4s]"></span>
                    <span className="w-1 bg-red-500 animate-[wave_1s_infinite_0.6s]"></span>
                    <span className="w-1 bg-red-500 animate-[wave_1s_infinite_0.8s]"></span>
                  </div>

                  <p className="text-sm text-red-500 font-medium animate-pulse">
                    Listening... Speak your answer
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                {!isListening ? (
                  <Button
                    onClick={startListening}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    🎤 Start Voice Answer
                  </Button>
                ) : (
                  <Button
                    onClick={stopListening}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    ⏹ Stop Recording
                  </Button>
                )}
                <Button
                  onClick={() => speakQuestion(question.question)}
                  className=" bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  🔊 Replay Question
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || isListening}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {questionNumber === totalQuestions
                    ? "Finish Interview"
                    : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FEEDBACK SECTION */}

        {feedback && (
          <Card className="border-2 border-gray-200 dark:border-gray-800 shadow-lg">
            <CardHeader className="bg-green-50 dark:bg-green-950/30 border-b">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={22} className="text-green-600" />
                Interview Feedback
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-green-600">
                  {feedback.overallScore} / 10
                </h2>

                <p className="text-muted-foreground">Overall Interview Score</p>
              </div>

              {/* STRENGTHS */}

              <div>
                <h3 className="font-semibold mb-2">Strengths</h3>

                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WEAKNESSES */}

              <div>
                <h3 className="font-semibold mb-2">Areas to Improve</h3>

                <ul className="space-y-2">
                  {feedback.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUGGESTIONS */}

              <div>
                <h3 className="font-semibold mb-2">Suggestions</h3>

                <ul className="space-y-2">
                  {feedback.suggestions.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500 font-bold">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => navigate("/interview")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Back to Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
