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

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [loading, setLoading] = useState(false);

  //------------------------------------------------

  const loadCompanies = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/admin/companies?status=${status}&search=${search}&page=${page}&limit=10`,
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
    setPage(1); // reset page on filter
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Company Registry</h1>

        <CreateCompanyDialog onCreated={loadCompanies} />
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3">
        <Input
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        {["pending", "approved", "rejected"].map((s) => (
          <Button
            key={s}
            variant={status === s ? "default" : "outline"}
            onClick={() => setStatus(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>User Added</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>{company.name}</TableCell>

                <TableCell>{company.difficultyLevel || "—"}</TableCell>

                <TableCell>{company.isUserAdded ? "Yes" : "Admin"}</TableCell>

                <TableCell>
                  <Badge>{company.status}</Badge>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => approve(company._id)}>
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => reject(company._id)}
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
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="px-3 py-1">
          {page} / {pages}
        </span>

        <Button
          variant="outline"
          disabled={page === pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
