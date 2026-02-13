import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { useRef, useState } from "react";
import API from "@/api/axios";
import { toast } from "react-hot-toast";

export default function BulkUploadDialog({ onUploaded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedCount, setDetectedCount] = useState(null);

  // 🔥 Use ref instead of state to prevent freezing
  const jsonRef = useRef("");

  //--------------------------------------------------
  // Handle Manual JSON Paste
  //--------------------------------------------------

  const handleTextareaChange = (e) => {
    jsonRef.current = e.target.value;
    setDetectedCount(null); // reset preview count
  };

  //--------------------------------------------------
  // Handle JSON File Upload
  //--------------------------------------------------

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.name.endsWith(".json")) {
      toast.error("Please upload a .json file");
      return;
    }

    try {
      const text = await file.text();
      jsonRef.current = text;
      setDetectedCount(null);
      toast.success("File loaded successfully");
    } catch {
      toast.error("Failed to read file");
    }
  };

  //--------------------------------------------------
  // Validate JSON Before Upload
  //--------------------------------------------------

  const validateJSON = () => {
    let parsed;

    try {
      parsed = JSON.parse(jsonRef.current);
    } catch {
      toast.error("Invalid JSON format");
      return null;
    }

    if (!Array.isArray(parsed)) {
      toast.error("JSON must be an array of questions");
      return null;
    }

    if (parsed.length === 0) {
      toast.error("No questions found");
      return null;
    }

    // 🔥 Limit bulk size (very important)
    if (parsed.length > 200) {
      toast.error("Maximum 200 questions per upload");
      return null;
    }

    setDetectedCount(parsed.length);
    return parsed;
  };

  //--------------------------------------------------
  // Upload
  //--------------------------------------------------

  const handleUpload = async () => {
    const parsed = validateJSON();
    if (!parsed) return;

    try {
      setLoading(true);

      await API.post("/admin/questions/bulk", parsed);

      toast.success(`${parsed.length} questions uploaded`);

      setOpen(false);
      setDetectedCount(null);
      jsonRef.current = "";

      onUploaded?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------------

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Bulk Upload</Button>
      </DialogTrigger>

      {/* 🔥 Proper Scrollable Layout */}
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
        </DialogHeader>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {/* File Upload */}
          <div>
            <label className="text-sm font-medium">Upload JSON File</label>

            <Input type="file" accept=".json" onChange={handleFileUpload} />
          </div>

          {/* OR Divider */}
          <div className="text-center text-sm text-muted-foreground">
            — OR Paste JSON Below —
          </div>

          {/* JSON Textarea */}
          <Textarea
            placeholder="Paste JSON array here..."
            className="min-h-[350px] font-mono text-sm"
            onChange={handleTextareaChange}
          />

          {/* Preview Count */}
          {detectedCount !== null && (
            <div className="text-sm text-green-600">
              {detectedCount} questions detected
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t flex justify-between">
          <Button variant="outline" onClick={validateJSON}>
            Validate
          </Button>

          <Button disabled={loading} onClick={handleUpload}>
            {loading ? "Uploading..." : "Upload Questions"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
