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
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

import CreateCompanyDialog from "@/components/admin/CreateCompanyDialog.jsx";
import EditCompanyDialog from "@/components/admin/EditCompanyDialog";

// Status badge styles
const statusStyle = {
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700",
  pending:  "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300  border border-amber-200  dark:border-amber-700",
  rejected: "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300    border border-red-200    dark:border-red-700",
};

// Difficulty badge styles
const difficultyStyle = {
  easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700",
  medium: "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300  border border-amber-200  dark:border-amber-700",
  hard:   "bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-300    border border-red-200    dark:border-red-700",
};

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [status, setStatus]       = useState("pending");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [pages, setPages]         = useState(1);
  const [loading, setLoading]     = useState(false);

  //------------------------------------------------

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/admin/companies?status=${status}&search=${search}&page=${page}&limit=10`
      );
      setCompanies(res.data.data);
      setPages(res.data.pages);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  //------------------------------------------------

  useEffect(() => {
    setPage(1);
  }, [status, search]);

  useEffect(() => {
    loadCompanies();
  }, [status, search, page]);

  //------------------------------------------------

  const approve = async (id) => {
    try {
      await API.put(`/admin/companies/${id}/approve`);
      toast.success("Company approved");
      loadCompanies();
    } catch {
      toast.error("Approval failed");
    }
  };

  //------------------------------------------------

  const reject = async (id) => {
    const confirmReject = confirm("Reject this company?");
    if (!confirmReject) return;
    try {
      await API.put(`/admin/companies/${id}/reject`);
      toast.success("Company rejected");
      loadCompanies();
    } catch {
      toast.error("Reject failed");
    }
  };

  //------------------------------------------------

  const deleteCompany = async (id) => {
    const confirmDelete = confirm("Delete this company?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/admin/companies/${id}`);
      toast.success("Deleted successfully");
      loadCompanies();
    } catch {
      toast.error("Delete failed");
    }
  };

  //------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              Company Registry
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review and manage companies submitted by users and admins
            </p>
          </div>
          <CreateCompanyDialog onCreated={loadCompanies} />
        </div>

        {/* ── Filter Bar ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <Input
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 max-w-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Status tabs */}
          <div className="flex gap-1.5 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700">
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
        </div>

        {/* ── Table ── */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              Loading companies…
            </div>
          ) : companies.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-400 dark:text-gray-500 text-sm">
              No {status} companies found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 py-3 px-4">
                    User Added
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
                {companies.map((company, idx) => (
                  <TableRow
                    key={company._id}
                    className={`border-b border-gray-100 dark:border-gray-800 transition-colors
                      hover:bg-blue-50/50 dark:hover:bg-blue-900/10
                      ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/40 dark:bg-gray-800/20"}`}
                  >
                    <TableCell className="py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      {company.name}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      {company.difficultyLevel ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${difficultyStyle[company.difficultyLevel?.toLowerCase()] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"}`}>
                          {company.difficultyLevel}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-sm">—</span>
                      )}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      {company.isUserAdded ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                          User
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                          Admin
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyle[company.status] || statusStyle.pending}`}>
                        {company.status}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 px-4">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => approve(company._id)}
                          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white border-0 text-xs h-7 px-3"
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => reject(company._id)}
                          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-xs h-7 px-3"
                        >
                          Reject
                        </Button>

                        <EditCompanyDialog
                          company={company}
                          onUpdated={loadCompanies}
                        />

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteCompany(company._id)}
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
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-4 text-sm"
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
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 h-8 px-4 text-sm"
          >
            Next →
          </Button>
        </div>

      </div>
    </div>
  );
}