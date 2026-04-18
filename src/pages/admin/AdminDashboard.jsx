import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import API from "@/api/axios";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadstate = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.log("Failed to load stat", err);
      }
    };
    loadstate();
  }, []);
  if (!stats) {
    return <div className="p-10 text-lg">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 🔥 TOP STRIP */}
      <div
        className="
        bg-linear-to-r
        from-slate-900
        to-slate-800
        text-white
        p-10
        shadow-lg
      "
      >
        <h1 className="text-4xl font-bold">Admin Control Center</h1>

        <p className="text-slate-300 mt-2">
          Manage platform activity, approvals, and users.
        </p>
      </div>

      {/* 🔥 FLOATING CONTENT */}
      <div
        className="
        p-10
        mt-5
        space-y-10
      "
      >
        {/* STATS */}
        <div className="grid grid-cols-3 gap-8">
          <Card
            className="
            rounded-2xl
            shadow-xl
            border-0
          "
          >
            <CardContent className="p-6">
              <p className="text-slate-500">Pending Experiences</p>

              <h2 className="text-5xl font-bold mt-2">{stats.pendingExperiences}</h2>
            </CardContent>
          </Card>

          <Card
            className="
            rounded-2xl
            shadow-xl
            border-0
          "
          >
            <CardContent className="p-6">
              <p className="text-slate-500">Pending Companies</p>

              <h2 className="text-5xl font-bold mt-2">{stats.pendingCompanies}</h2>
            </CardContent>
          </Card>

          <Card
            className="
            rounded-2xl
            shadow-xl
            border-0
          "
          >
            <CardContent className="p-6">
              <p className="text-slate-500">Total Users</p>

              <h2 className="text-5xl font-bold mt-2">{stats.totalUsers}</h2>
            </CardContent>
          </Card>
        </div>

        {/* 🔥 ACTION CARDS */}
        <div className="grid grid-cols-2 gap-8">
          <Card
            className="
            rounded-2xl
            shadow-lg
            hover:shadow-2xl
            transition
            cursor-pointer
            hover:scale-[1.02] 
          "
          onClick={() => navigate("/admin/experiences")}

          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold">Review Experiences</h3>

              <p className="text-slate-500 mt-2">
                Approve or reject interview submissions.
              </p>

              <Button className="mt-6">Open Panel →</Button>
            </CardContent>
          </Card>

          <Card
            className="
            rounded-2xl
            shadow-lg
            hover:shadow-2xl
            transition
            cursor-pointer
            hover:scale-[1.02]
          "
          onClick={()=> navigate("/admin/companies")}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold">Validate Companies</h3>

              <p className="text-slate-500 mt-2">
                Manage user-added companies.
              </p>

              <Button className="mt-6">Review Now →</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
