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

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);

  const loadExperiences = async () => {
    const res = await API.get("/admin/experiences/pending");

    setExperiences(res.data);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const approve = async (id) => {
    await API.put(`/admin/experiences/${id}/approve`);

    loadExperiences();
  };

  const reject = async (id) => {
    await API.put(`/admin/experiences/${id}/reject`);

    loadExperiences();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Experience Approvals</h1>

        <p className="text-muted-foreground">
          Review and moderate user submissions
        </p>
      </div>

      {/* TABLE */}
      <div
        className="
       bg-white
       rounded-2xl
       shadow-sm
       border
     "
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {experiences.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-400"
                >
                  No pending approvals 🎉
                </TableCell>
              </TableRow>
            )}
            {experiences.map((exp) => (
              <TableRow key={exp._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {exp.companyId?.name}
                </TableCell>

                <TableCell>{exp.role}</TableCell>

                <TableCell>{exp.userId?.name}</TableCell>

                <TableCell>
                  <Badge variant="bg-yellow-100 text-yellow-700">Pending</Badge>
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => approve(exp._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => reject(exp._id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
