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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { toast } from "react-hot-toast";

import ExperienceDrawer from "@/components/admin/ExperienceDrawer";
import EditExperienceDialog from "@/components/admin/EditExperienceDialog";
import CreateAdminExperienceDialog from "@/components/admin/CreateAdminExperienceDialog";

export default function AdminExperiences() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("pending");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  //------------------------------------------------

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/admin/experiences?status=${status}&page=${page}&limit=10`
      );
      setData(res.data.data);
      setPages(res.data.pages);
    } catch {
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    loadExperiences();
  }, [page, status]);

  //------------------------------------------------

  const approve = async (id) => {
    try {
      await API.put(`/admin/experiences/${id}/approve`);
      toast.success("Experience approved");
      loadExperiences();
    } catch {
      toast.error("Approval failed");
    }
  };

  //------------------------------------------------

  const reject = async (id) => {
    const remarks = prompt("Enter rejection reason");
    if (!remarks) return;
    try {
      await API.put(`/admin/experiences/${id}/reject`, { remarks });
      toast.success("Experience rejected");
      loadExperiences();
    } catch {
      toast.error("Reject failed");
    }
  };

  //------------------------------------------------

  const deleteExp = async (id) => {
    const confirmDelete = confirm("Delete this experience?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/admin/experiences/${id}`);
      toast.success("Deleted");
      loadExperiences();
    } catch {
      toast.error("Delete failed");
    }
  };

  //------------------------------------------------

  // Status badge color map
  const statusVariant = {
    approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
    pending:  "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300  border-amber-200  dark:border-amber-700",
    rejected: "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300    border-red-200    dark:border-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              Experience Moderation
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review and manage user-submitted interview experiences
            </p>
          </div>
          <CreateAdminExperienceDialog onCreated={loadExperiences} />
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-fit border border-gray-200 dark:border-gray-700">
          {["pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150 ${
                status === s
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              Loading experiences…
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              No {status} experiences found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Company
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Role
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    User
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((exp, idx) => (
                  <TableRow
                    key={exp._id}
                    onClick={() => setSelected(exp)}
                    className={`cursor-pointer border-b border-gray-100 dark:border-gray-800 transition-colors
                      hover:bg-blue-50/50 dark:hover:bg-blue-900/10
                      ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/40 dark:bg-gray-800/20"}`}
                  >
                    <TableCell className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      {exp.companyId?.name}
                    </TableCell>

                    <TableCell className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {exp.role}
                    </TableCell>

                    <TableCell className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {exp.userId?.name}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusVariant[exp.status] || statusVariant.pending}`}>
                        {exp.status}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-wrap gap-2">
                        <EditExperienceDialog experience={exp} onUpdated={loadExperiences} />

                        <Button
                          size="sm"
                          onClick={() => approve(exp._id)}
                          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white border-0 text-xs h-7 px-3"
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => reject(exp._id)}
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-xs h-7 px-3"
                        >
                          Reject
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteExp(exp._id)}
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs h-7 px-3"
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
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-4 text-sm"
          >
            ← Prev
          </Button>

          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
            Page {page} of {pages}
          </span>

          <Button
            variant="outline"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-4 text-sm"
          >
            Next →
          </Button>
        </div>

        {/* ── Drawer ── */}
        <ExperienceDrawer
          experience={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
}