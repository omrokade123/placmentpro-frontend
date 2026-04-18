import { useEffect, useState } from "react";
import API from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Building2, Briefcase, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default function MyExperiences() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/experiences/my", {
          user,
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          className: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
          icon: <CheckCircle2 size={14} />,
        };
      case "rejected":
        return {
          className: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
          icon: <AlertCircle size={14} />,
        };
      default:
        return {
          className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
          icon: <Clock size={14} />,
        };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Interview Experiences</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Interview Experiences</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track and manage your shared experiences
          </p>
        </div>
        {data.length > 0 && (
          <Badge variant="outline" className="text-sm px-3 py-1">
            {data.length} {data.length === 1 ? "Experience" : "Experiences"}
          </Badge>
        )}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <Card className="rounded-2xl shadow-sm border-dashed">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="text-gray-400 dark:text-gray-500" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No experiences yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              You haven't shared any interview experiences yet. Start sharing to help others!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Experience Cards */}
      <div className="grid gap-4">
        {data.map((exp) => {
          const statusConfig = getStatusConfig(exp.status);
          
          return (
            <Card
              key={exp._id}
              className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-800"
            >
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                        <Building2 size={18} className="text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {exp.companyId?.name || "Company Name"}
                        </h2>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <Briefcase size={14} />
                          <span>{exp.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge
                    className={`${statusConfig.className} flex items-center gap-1.5 px-3 py-1 font-medium capitalize`}
                  >
                    {statusConfig.icon}
                    {exp.status}
                  </Badge>
                </div>

                {/* Admin Remarks */}
                {exp.adminRemarks && (
                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-1">
                          Admin Feedback
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                          {exp.adminRemarks}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Metadata (Optional - you can add dates, etc.) */}
                {exp.createdAt && (
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Submitted on {new Date(exp.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
