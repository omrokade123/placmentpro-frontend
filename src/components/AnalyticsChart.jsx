import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function AnalyticsChart({ data }) {
  if (!data?.length) return null;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-lg">
          <p className="text-sm font-semibold mb-1">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            Score: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-b border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
            <TrendingUp size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Performance Trend</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your progress over time
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-gray-800"
            />
            
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              className="dark:stroke-gray-600"
              style={{ fontSize: "12px" }}
            />
            
            <YAxis
              stroke="#9ca3af"
              className="dark:stroke-gray-600"
              style={{ fontSize: "12px" }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

