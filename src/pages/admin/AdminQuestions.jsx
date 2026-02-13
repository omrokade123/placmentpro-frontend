import { useEffect, useState } from "react";
import API from "@/api/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "react-hot-toast";

import CreateQuestionDialog from "@/components/admin/CreateQuestionDialog";

import BulkUploadDialog from "@/components/admin/BulkUploadDialog";
import { useNavigate } from "react-router-dom";
import ViewQuestionDialog from "@/components/admin/ViewQuestionDialog";

export default function AdminQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //--------------------------------

  // const load = async () => {
  //   try {
  //     const res = await API.get(
  //       `/admin/questions?search=${search}&topic=${topic}`,
  //     );

  //     setQuestions(res.data.data);
  //   } catch {
  //     toast.error("Failed to load");
  //   }
  // };

  // useEffect(() => {
  //   load();
  // }, [search, topic]);
  const load = async () => {
    const res = await API.get(`/admin/questions?page=${page}&limit=10`);

    setQuestions(res.data.questions);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    load();
  }, [page]);

  //--------------------------------

  const deleteQ = async (id) => {
    if (!confirm("Delete question?")) return;

    await API.delete(`/admin/questions/${id}`);

    toast.success("Deleted");

    load();
  };

  //--------------------------------

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Question Bank</h1>

        <div className="flex gap-2">
          <BulkUploadDialog onUploaded={load} />
          <CreateQuestionDialog onCreated={load} />
        </div>
      </div>

      <Input
        placeholder="Search question..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {questions.map((q) => (
            <TableRow
              key={q._id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedId(q._id)}
            >
              <TableCell className="max-w-md truncate">
                {q.questionText}
              </TableCell>

              <TableCell>{q.topic}</TableCell>

              <TableCell>{q.difficulty}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/questions/${q._id}`);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQ(q._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewQuestionDialog
        questionId={selectedId}
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2 mt-6 justify-center">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
