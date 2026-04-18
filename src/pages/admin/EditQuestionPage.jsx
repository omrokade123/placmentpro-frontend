import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api/axios";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import CompanyDropdown from "@/components/CompanyDropdown";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditQuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({});
  const [options, setOptions] = useState([]);

  //--------------------------------

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/admin/questions/${id}`);

        const q = res.data;

        setForm({
          questionText: q.questionText,
          topic: q.topic,
          difficulty: q.difficulty,
          explanation: q.explanation,
          cognitiveLevel: q.cognitiveLevel,
          questionType: q.questionType,
          companyTags: q.companyTags || [],
        });

        setOptions(q.options || []);
      } catch {
        toast.error("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  //--------------------------------

  const handleOptionChange = (i, val) => {
    const updated = [...options];
    updated[i].text = val;

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

  const update = async () => {
    try {
      setSaving(true);

      await API.put(`/admin/questions/${id}`, {
        ...form,
        options,
      });

      toast.success("Question updated");
      navigate("/admin/questions");
    } catch(error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  //--------------------------------

  if (loading) {
    return <div className="p-10">Loading question...</div>;
  }

  //--------------------------------

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
    <div className="max-w-4xl mx-auto space-y-6 py-10">
      <h1 className="text-3xl font-bold">Edit Question</h1>

      {/* QUESTION */}
      <Textarea
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
        value={form.difficulty}
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
        value={form.cognitiveLevel}
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
        value={form.companyTags?.[0]}
        onChange={(val) =>
          setForm({
            ...form,
            companyTags: [val],
          })
        }
      />

      {/* EXPLANATION */}
      <Textarea
        value={form.explanation}
        onChange={(e) =>
          setForm({
            ...form,
            explanation: e.target.value,
          })
        }
      />

      <Button disabled={saving} onClick={update}>
        {saving ? "Saving..." : "Update Question"}
      </Button>
    </div>
    </div>
  );
}
