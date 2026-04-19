import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { upvoteExperience } from "../api/experience";
import {
  Building2,
  Briefcase,
  ThumbsUp,
  User,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Tag,
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ExperienceCard({ exp, onUpdate }) {
  const [upvoting, setUpvoting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleUpvote = async () => {
    if (upvoting) return;
    try {
      setUpvoting(true);
      await upvoteExperience(exp._id);
      toast.success("Upvoted!");
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to upvote");
      console.error(error);
    } finally {
      setUpvoting(false);
    }
  };

  const getResultConfig = (result) => {
    switch (result?.toLowerCase()) {
      case "selected":
        return {
          className:
            "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
          icon: <CheckCircle2 size={12} />,
        };
      case "rejected":
        return {
          className:
            "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
          icon: <AlertCircle size={12} />,
        };
      default:
        return {
          className:
            "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
          icon: <Clock size={12} />,
        };
    }
  };

  const resultConfig = getResultConfig(exp.finalResult);

  const getDifficultyColor = (rating) => {
    if (rating >= 4)
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (rating >= 3)
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  };

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-800">
      <CardContent className="p-5">
        {/* COMPACT HEADER */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <Building2 size={18} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg truncate">
                {exp.companyId?.name || "Company"}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Briefcase size={14} />
                <span className="truncate">{exp.role}</span>
              </div>
            </div>
          </div>

          <Badge
            className={`${resultConfig.className} flex items-center gap-1 px-2 py-1 text-xs font-medium capitalize shrink-0`}
          >
            {resultConfig.icon}
            {exp.finalResult}
          </Badge>
        </div>

        {/* QUICK INFO */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <span className="font-medium">{exp.rounds?.length || 0}</span> rounds
          </span>
          {exp.tags && exp.tags.length > 0 && (
            <>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <Tag size={14} className="shrink-0" />
                <span className="truncate text-xs">
                  {exp.tags.slice(0, 2).join(", ")}
                  {exp.tags.length > 2 && ` +${exp.tags.length - 2}`}
                </span>
              </div>
            </>
          )}
        </div>

        {/* ADVICE PREVIEW (if not expanded) */}
        {!expanded && exp.adviceForJuniors && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 italic">
            💡 {exp.adviceForJuniors}
          </p>
        )}

        {/* EXPANDED DETAILS */}
        {expanded && (
          <div className="space-y-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            {/* ROUNDS */}
            {exp.rounds && exp.rounds.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Interview Rounds
                </h4>
                <div className="space-y-2">
                  {exp.rounds.map((r, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {i + 1}. {r.roundType}
                        </span>
                        <Badge
                          className={`${getDifficultyColor(r.difficultyRating)} text-xs px-2 py-0.5`}
                        >
                          {r.difficultyRating}/5
                        </Badge>
                      </div>

                      {r.questionsAsked && r.questionsAsked.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {r.questionsAsked.map((q, idx) => (
                            <p
                              key={idx}
                              className="text-xs text-gray-600 dark:text-gray-400 pl-2 border-l-2 border-gray-300 dark:border-gray-700"
                            >
                              {q}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADVICE */}
            {exp.adviceForJuniors && (
              <div className="bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb
                    size={16}
                    className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-amber-900 dark:text-amber-200 mb-1">
                      Advice for Juniors
                    </h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                      {exp.adviceForJuniors}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* KEY LEARNINGS */}
            {exp.keyLearnings && exp.keyLearnings.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Award
                    size={14}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-300">
                    Key Learnings
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.keyLearnings.map((learning, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-white dark:bg-gray-900 text-xs px-2 py-0.5"
                    >
                      {learning}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* ALL TAGS */}
            {exp.tags && exp.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Tag size={14} className="text-gray-600 dark:text-gray-400" />
                  <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-300">
                    Tags
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <User size={14} />
              <span className="truncate max-w-30">
                {exp.userId?.name || "Admin"}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              disabled={upvoting}
              className="h-7 px-2 group hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
            >
              <ThumbsUp
                size={14}
                className={`mr-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                  upvoting ? "animate-pulse" : ""
                }`}
              />
              <span className="text-xs font-semibold">{exp.upvotes || 0}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-7 px-2 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={14} className="ml-1" />
              </>
            ) : (
              <>
                View Details <ChevronDown size={14} className="ml-1" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}