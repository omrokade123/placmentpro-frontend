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

// Difficulty badge styles
const difficultyStyle = {
  easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700",
  medium: "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300  border border-amber-200  dark:border-amber-700",
  hard:   "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300    border border-red-200    dark:border-red-700",
};

// Topic badge styles
const topicStyle = {
  aptitude:  "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300   border border-blue-200   dark:border-blue-700",
  reasoning: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-200 dark:border-violet-700",
  verbal:    "bg-pink-100   text-pink-700   dark:bg-pink-900/40   dark:text-pink-300   border border-pink-200   dark:border-pink-700",
  coding:    "bg-cyan-100   text-cyan-700   dark:bg-cyan-900/40   dark:text-cyan-300   border border-cyan-200   dark:border-cyan-700",
};

export default function AdminQuestions() {
  const navigate = useNavigate();

  const [questions, setQuestions]     = useState([]);
  const [search, setSearch]           = useState("");
  const [topic, setTopic]             = useState("");
  const [selectedId, setSelectedId]   = useState(null);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [loading, setLoading]         = useState(false);

  //--------------------------------

  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/admin/questions?page=${page}&limit=10`);
      setQuestions(res.data.questions);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              Question Bank
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage aptitude, reasoning, verbal and coding questions
            </p>
          </div>

          <div className="flex gap-2">
            <BulkUploadDialog onUploaded={load} />
            <CreateQuestionDialog onCreated={load} />
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <Input
            placeholder="Search question..."
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* ── Table ── */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              Loading questions…
            </div>
          ) : questions.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              No questions found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4 w-1/2">
                    Question
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Topic
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {questions.map((q, idx) => (
                  <TableRow
                    key={q._id}
                    onClick={() => setSelectedId(q._id)}
                    className={`cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors
                      hover:bg-blue-50/50 dark:hover:bg-blue-900/10
                      ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/40 dark:bg-gray-800/20"}`}
                  >
                    <TableCell className="py-3 px-4 max-w-md">
                      <p className="truncate text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {q.questionText}
                      </p>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${topicStyle[q.topic] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                        {q.topic}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${difficultyStyle[q.difficulty] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}>
                        {q.difficulty}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/questions/${q._id}`);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white border-0 text-xs h-7 px-3"
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
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-xs h-7 px-3"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Prev button */}
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-3 text-sm"
            >
              ←
            </Button>

            {/* Page number buttons — cap at 7 to avoid overflow */}
            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
              const p = i + 1;
              return (
                <Button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 p-0 text-sm font-medium rounded-lg transition-colors ${
                    page === p
                      ? "bg-blue-600 dark:bg-blue-700 text-white border-0 shadow-sm"
                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {p}
                </Button>
              );
            })}

            {/* Next button */}
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-3 text-sm"
            >
              →
            </Button>
          </div>
        </div>

        {/* ── View Dialog ── */}
        <ViewQuestionDialog
          questionId={selectedId}
          open={!!selectedId}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}