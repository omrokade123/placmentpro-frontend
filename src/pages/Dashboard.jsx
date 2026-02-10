import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analytics";
import AnalyticsChart from "@/components/AnalyticsChart";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch {
        console.log("Analytics error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-500 text-center mt-20">
        Loading dashboard...
      </div>
    );
  }

  if (!analytics?.totalTests) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">No tests attempted yet.</h2>

        <p className="text-gray-500 mt-2">
          Start practicing to see your analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>

        <p className="text-gray-500">Here's your preparation overview.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* TOTAL TESTS */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Tests Taken</p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.totalTests ?? 0}
          </h2>
        </div>

        {/* ACCURACY */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Avg Accuracy</p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.accuracy ?? 0}%
          </h2>
        </div>

        {/* WEAK TOPICS */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">Weak Topics</p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.weakTopics?.length ?? 0}
          </h2>
        </div>
      </div>
      <AnalyticsChart data={analytics?.trendData} />
    </div>
  );
}
