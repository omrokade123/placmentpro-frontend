import { useEffect, useState } from "react";
import { fetchExperiences } from "../api/experience.js";
import ExperienceCard from "../components/ExperienceCard";
import ShareExperienceDialog from "../components/ShareExperienceDialog";
import { Button } from "@/components/ui/button";
import { Search, Filter, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Interview() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetchExperiences();
      setExperiences(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.companyId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Interview Experiences
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Learn from real interview experiences shared by the community
            </p>
          </div>
          <ShareExperienceDialog onSuccess={loadExperiences} />
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* You can add filter button here */}
        </div>
      </div>

      {/* STATS */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Experiences
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
              {experiences.length}
            </p>
          </div>
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/50 rounded-xl p-4">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              Companies
            </p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-200 mt-1">
              {new Set(experiences.map((e) => e.companyId?.name)).size}
            </p>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50 rounded-xl p-4">
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Success Rate
            </p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">
              {experiences.length > 0
                ? Math.round(
                    (experiences.filter((e) => e.finalResult === "selected")
                      .length /
                      experiences.length) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="text-gray-400 dark:text-gray-500" size={28} />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? "No experiences found" : "No experiences yet"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search query"
              : "Be the first to share your interview experience!"}
          </p>
        </div>
      )}

      {/* FEED */}
      <div className="grid gap-6">
        {filteredExperiences.map((exp) => (
          <ExperienceCard key={exp._id} exp={exp} onUpdate={loadExperiences} />
        ))}
      </div>
    </div>
  );
}