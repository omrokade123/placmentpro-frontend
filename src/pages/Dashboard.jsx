import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analytics";
import AnalyticsChart from "@/components/AnalyticsChart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  Calendar,
  Zap,
  BookOpen,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!analytics?.totalTests) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-2xl w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-6">
              <Brain className="text-purple-600 dark:text-purple-400" size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-3">Start Your Journey!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              No tests attempted yet. Take your first practice test to see your
              analytics and track your progress.
            </p>
            <Button
              onClick={() => navigate("/practice")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 px-8 font-semibold shadow-lg"
            >
              <Sparkles size={18} className="mr-2" />
              Start Practicing Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPerformanceStatus = () => {
    const accuracy = analytics?.accuracy ?? 0;
    if (accuracy >= 80) {
      return {
        label: "Excellent",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        borderColor: "border-green-200 dark:border-green-800",
        icon: <Award className="text-green-600 dark:text-green-400" size={24} />,
      };
    } else if (accuracy >= 60) {
      return {
        label: "Good",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-200 dark:border-blue-800",
        icon: <Target className="text-blue-600 dark:text-blue-400" size={24} />,
      };
    } else {
      return {
        label: "Keep Improving",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
        borderColor: "border-orange-200 dark:border-orange-800",
        icon: <TrendingUp className="text-orange-600 dark:text-orange-400" size={24} />,
      };
    }
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome back! 👋</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Here's your preparation overview and progress
        </p>
      </div>

      {/* PERFORMANCE STATUS BANNER */}
      <Card
        className={`rounded-2xl border-2 ${performanceStatus.borderColor} ${performanceStatus.bgColor} overflow-hidden`}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">
              {performanceStatus.icon}
            </div>
            <div className="flex-1">
              <h3 className={`text-2xl font-bold ${performanceStatus.color}`}>
                {performanceStatus.label} Performance!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep up the momentum and continue practicing
              </p>
            </div>
            <Button
              onClick={() => navigate("/practice")}
              className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-11 px-6 font-semibold"
            >
              Practice Now
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TOTAL TESTS */}
        <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-500 to-cyan-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Brain size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline" className="text-xs">
                Total
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {analytics?.totalTests ?? 0}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tests Completed
            </p>
          </CardContent>
        </Card>

        {/* ACCURACY */}
        <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-green-50 dark:bg-green-950/30"
              >
                Avg
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {analytics?.accuracy ?? 0}%
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average Accuracy
            </p>
          </CardContent>
        </Card>

        {/* WEAK TOPICS */}
        <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="h-2 bg-linear-to-r from-orange-500 to-red-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <AlertCircle
                  size={24}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-orange-50 dark:bg-orange-950/30"
              >
                Focus
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {analytics?.weakTopics?.length ?? 0}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Areas to Improve
            </p>
          </CardContent>
        </Card>

        {/* STRONG TOPICS */}
        <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle2
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <Badge
                variant="outline"
                className="text-xs bg-purple-50 dark:bg-purple-950/30"
              >
                Strength
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {analytics?.strongTopics?.length ?? 0}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Strong Areas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CHART */}
      <AnalyticsChart data={analytics?.trendData } />

      {/* TOPICS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* WEAK TOPICS */}
        {analytics?.weakTopics && analytics.weakTopics.length > 0 && (
          <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <TrendingDown
                    size={20}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Focus Areas</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Topics that need more practice
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {analytics.weakTopics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700 px-3 py-1.5"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* STRONG TOPICS */}
        {analytics?.strongTopics && analytics.strongTopics.length > 0 && (
          <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Your Strengths</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Topics you're excelling at
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {analytics.strongTopics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700 px-3 py-1.5"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap size={20} className="text-purple-600 dark:text-purple-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/practice")}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
            >
              <Brain size={24} className="text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <p className="font-semibold">Practice Test</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start a new practice session
                </p>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/attempts")}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="font-semibold">View History</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Check past attempts
                </p>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/experiences")}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 dark:hover:border-green-700 transition-colors"
            >
              <BookOpen size={24} className="text-green-600 dark:text-green-400" />
              <div className="text-left">
                <p className="font-semibold">Experiences</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Read interview stories
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}