import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import API from "@/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ViewQuestionDialog({ questionId, open, onClose }) {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //--------------------------------

  useEffect(() => {
    if (!open || !questionId) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/admin/questions/${questionId}`);

        setQuestion(res.data);
      } catch {
        toast.error("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open, questionId]);

  //--------------------------------

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Question Detail</DialogTitle>
        </DialogHeader>

        {loading && <div>Loading...</div>}

        {question && (
          <div className="space-y-5">
            {/* QUESTION */}
            <div className="p-5 border rounded-xl">
              <h2 className="font-semibold mb-3">{question.questionText}</h2>

              {/* OPTIONS */}
              {question.questionType === "mcq" && (
                <div className="space-y-2">
                  {question.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-3 border rounded-lg
       ${
         opt.isCorrect
           ? "border-green-500 bg-green-50 dark:bg-green-900/20"
           : ""
       }`}
                    >
                      {opt.text}

                      {opt.isCorrect && <Badge className="ml-2">Correct</Badge>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* META */}
            <div className="flex gap-2 flex-wrap">
              <Badge>{question.topic}</Badge>
              <Badge>{question.difficulty}</Badge>

              {question.cognitiveLevel && (
                <Badge variant="outline">{question.cognitiveLevel}</Badge>
              )}
            </div>

            {/* EXPLANATION */}
            {question.explanation && (
              <div className="border p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Explanation</h3>

                <p className="text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            {/* ACTION */}
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  onClose(false);
                  navigate(`/admin/questions/${questionId}`);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
