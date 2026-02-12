import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import API from "@/api/axios";
import { toast } from "sonner";

export default function CreateCompanyDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!name) {
      return toast.error("Enter company name");
    }

    try {
      setLoading(true);

      await API.post("/admin/companies", {
        name,
      });

      toast.success("Company created");

      setOpen(false);
      setName("");

      onCreated?.();
    } catch {
      toast.error("Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Company</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={create} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
