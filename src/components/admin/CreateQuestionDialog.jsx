import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import CompanyDropdown from "@/components/CompanyDropdown";

import { useState } from "react";
import API from "@/api/axios";
import { toast } from "react-hot-toast";

export default function CreateQuestionDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //--------------------------------

  const [form, setForm] = useState({
    questionText: "",
    topic: "",
    difficulty: "medium",
    explanation: "",
    questionType: "mcq",
    cognitiveLevel: "apply",
    companyTags: [],
  });

  //--------------------------------

  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  //--------------------------------

  const handleOptionChange = (i, value) => {
    const updated = [...options];
    updated[i].text = value;

    setOptions(updated);
  };

  //--------------------------------

  const selectCorrect = (i) => {
    const updated = options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === i,
    }));

    setOptions(updated);
  };

  //--------------------------------

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  //--------------------------------

  const createQuestion = async () => {
    if (!form.questionText) {
      return toast.error("Enter question");
    }

    if (form.questionType === "mcq") {
      const validOptions = options.filter((o) => o.text);

      if (validOptions.length < 2) {
        return toast.error("Add at least 2 options");
      }

      if (!validOptions.some((o) => o.isCorrect)) {
        return toast.error("Select correct answer");
      }
    }

    //--------------------------------

    try {
      setLoading(true);

      await API.post("/admin/questions", {
        ...form,
        options,
      });

      toast.success("Question created");

      setOpen(false);

      onCreated?.();
    } catch {
      toast.error("Creation failed");
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Question</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
        </DialogHeader>

        {/* QUESTION */}
        <Textarea
          placeholder="Enter question..."
          value={form.questionText}
          onChange={(e) =>
            setForm({
              ...form,
              questionText: e.target.value,
            })
          }
        />

        {/* OPTIONS */}
        {form.questionType === "mcq" && (
          <div className="space-y-2">
            <h3 className="font-semibold">Options</h3>

            {options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder={`Option ${i + 1}`}
                  value={opt.text}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />

                <Button
                  variant={opt.isCorrect ? "default" : "outline"}
                  onClick={() => selectCorrect(i)}
                >
                  Correct
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addOption}>
              + Add Option
            </Button>
          </div>
        )}

        {/* TOPIC */}
        <Input
          placeholder="Topic (DBMS, OS...)"
          value={form.topic}
          onChange={(e) =>
            setForm({
              ...form,
              topic: e.target.value,
            })
          }
        />

        {/* DIFFICULTY */}
        <Select
          defaultValue="medium"
          onValueChange={(v) =>
            setForm({
              ...form,
              difficulty: v,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {/* COGNITIVE */}
        <Select
          defaultValue="apply"
          onValueChange={(v) =>
            setForm({
              ...form,
              cognitiveLevel: v,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="remember">Remember</SelectItem>

            <SelectItem value="understand">Understand</SelectItem>

            <SelectItem value="apply">Apply</SelectItem>

            <SelectItem value="analyze">Analyze</SelectItem>
          </SelectContent>
        </Select>

        {/* COMPANY */}
        <CompanyDropdown
          onChange={(val) =>
            setForm({
              ...form,
              companyTags: [val],
            })
          }
        />

        {/* EXPLANATION */}
        <Textarea
          placeholder="Explanation..."
          value={form.explanation}
          onChange={(e) =>
            setForm({
              ...form,
              explanation: e.target.value,
            })
          }
        />

        <Button disabled={loading} onClick={createQuestion} className="w-full">
          {loading ? "Creating..." : "Create Question"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
