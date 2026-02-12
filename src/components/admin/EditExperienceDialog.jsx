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

import { useState, useEffect } from "react";
import API from "@/api/axios";
import { toast } from "sonner";

export default function EditExperienceDialog({ experience, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "",
    finalResult: "",
    adviceForJuniors: "",
    keyLearnings: "",
    tags: "",
  });

  //--------------------------------

  useEffect(() => {
    if (experience) {
      setForm({
        role: experience.role || "",
        finalResult: experience.finalResult || "",
        adviceForJuniors: experience.adviceForJuniors || "",

        keyLearnings: experience.keyLearnings?.join(", ") || "",

        tags: experience.tags?.join(", ") || "",
      });
    }
  }, [experience]);

  //--------------------------------

  const update = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,

        keyLearnings: form.keyLearnings
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await API.put(`/admin/experiences/${experience._id}`, payload);

      toast.success("Experience updated");

      setOpen(false);

      onUpdated?.();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <Input
          placeholder="Final Result"
          value={form.finalResult}
          onChange={(e) =>
            setForm({
              ...form,
              finalResult: e.target.value,
            })
          }
        />

        <Textarea
          placeholder="Advice"
          value={form.adviceForJuniors}
          onChange={(e) =>
            setForm({
              ...form,
              adviceForJuniors: e.target.value,
            })
          }
        />

        <Input
          placeholder="Key Learnings"
          value={form.keyLearnings}
          onChange={(e) =>
            setForm({
              ...form,
              keyLearnings: e.target.value,
            })
          }
        />

        <Input
          placeholder="Tags"
          value={form.tags}
          onChange={(e) =>
            setForm({
              ...form,
              tags: e.target.value,
            })
          }
        />

        <Button disabled={loading} onClick={update}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
