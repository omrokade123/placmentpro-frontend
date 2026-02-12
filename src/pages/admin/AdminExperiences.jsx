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
        `/admin/experiences?status=${status}&page=${page}&limit=10`,
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Experience Moderation</h1>
      <CreateAdminExperienceDialog onCreated={loadExperiences} />

      {/* FILTER */}
      <div className="flex gap-2">
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
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((exp) => (
              <TableRow
                key={exp._id}
                className="
       cursor-pointer
       hover:bg-muted/50
     "
                onClick={() => setSelected(exp)}
              >
                <TableCell>{exp.companyId?.name}</TableCell>

                <TableCell>{exp.role}</TableCell>

                <TableCell>{exp.userId?.name}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      exp.status === "approved" ? "default" : "secondary"
                    }
                  >
                    {exp.status}
                  </Badge>
                </TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <EditExperienceDialog
                      experience={exp}
                      onUpdated={loadExperiences}
                    />

                    <Button size="sm" onClick={() => approve(exp._id)}>
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => reject(exp._id)}
                    >
                      Reject
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteExp(exp._id)}
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
      <div className="flex justify-end gap-2 mt-4">
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

      {/* DRAWER */}
      <ExperienceDrawer
        experience={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
