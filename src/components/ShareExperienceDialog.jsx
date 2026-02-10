// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import CompanyDropdown from "./CompanyDropdown";

// import { useState } from "react";
// import { createExperience } from "../api/experience";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function ShareExperienceDialog({ onSuccess }) {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     role: "",
//     companyId: "",
//     companyName: "",
//     finalResult: "",
//     adviceForJuniors: "",
//     keyLearnings: "",
//     tags: "",
//     isOther: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);


//   const [rounds, setRounds] = useState([
//     {
//       roundType: "Technical",
//       questionsAsked: "",
//       difficultyRating: 3,
//     },
//   ]);

//   const handleRoundChange = (i, field, value) => {
//     const updated = [...rounds];
//     updated[i][field] = value;
//     setRounds(updated);
//   };

//   const addRound = () => {
//     setRounds([
//       ...rounds,
//       {
//         roundType: "Technical",
//         questionsAsked: "",
//         difficultyRating: 3,
//       },
//     ]);
//   };

//   const submit = async (e) => {
//     e?.preventDefault(); // safe optional chaining

//     if (loading) return;

//     setLoading(true);

//     try {
//       const payload = {
//         ...form,

//         keyLearnings: form.keyLearnings.split(",").map((s) => s.trim()),

//         tags: form.tags.split(",").map((s) => s.trim()),

//         rounds: rounds.map((r) => ({
//           ...r,
//           questionsAsked: r.questionsAsked
//             .split("\n")
//             .map((q) => q.trim())
//             .filter(Boolean), 
//         })),
//       };

//       const res = await createExperience(payload);
//       setOpen(false);
//       toast.success("Experince created successfully");
//       onSuccess?.();
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error.response?.data?.message || "Failed to submit experience",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Share Experience</Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Share Interview Experience</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           {/* COMPANY */}
//           <CompanyDropdown
//             value={form.companyId}
//             onChange={(val) => {
//               if (val === "other") {
//                 setForm({
//                   ...form,
//                   companyId: "",
//                   isOther: true,
//                 });
//               } else {
//                 setForm({
//                   ...form,
//                   companyId: val,
//                   companyName: "",
//                   isOther: false,
//                 });
//               }
//             }}
//           />
//           {form.isOther && (
//             <Input
//               placeholder="Enter Company Name"
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   companyName: e.target.value,
//                 })
//               }
//             />
//           )}

//           {/* ROLE */}
//           <Input
//             placeholder="Role (SDE, Analyst...)"
//             value={form.role}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 role: e.target.value,
//               })
//             }
//           />

//           {/* ROUNDS */}
//           <div className="space-y-3">
//             <h3 className="font-semibold">Interview Rounds</h3>

//             {rounds.map((r, i) => (
//               <div key={i} className="border p-4 rounded-lg space-y-2">
//                 <Select
//                   onValueChange={(v) => handleRoundChange(i, "roundType", v)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Round Type" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value="Aptitude">Aptitude</SelectItem>
//                     <SelectItem value="Technical">Technical</SelectItem>
//                     <SelectItem value="HR">HR</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Textarea
//                   placeholder="Questions asked (one per line)"
//                   onChange={(e) =>
//                     handleRoundChange(i, "questionsAsked", e.target.value)
//                   }
//                 />

//                 <Input
//                   type="number"
//                   min={1}
//                   max={5}
//                   placeholder="Difficulty (1-5)"
//                   onChange={(e) =>
//                     handleRoundChange(
//                       i,
//                       "difficultyRating",
//                       Number(e.target.value),
//                     )
//                   }
//                 />
//               </div>
//             ))}

//             <Button variant="outline" onClick={addRound}>
//               + Add Round
//             </Button>
//           </div>

//           {/* RESULT */}
//           <Select onValueChange={(v) => setForm({ ...form, finalResult: v })}>
//             <SelectTrigger>
//               <SelectValue placeholder="Final Result" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="selected">Selected</SelectItem>
//               <SelectItem value="rejected">Rejected</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//             </SelectContent>
//           </Select>

//           <Textarea
//             placeholder="Advice for juniors"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 adviceForJuniors: e.target.value,
//               })
//             }
//           />

//           <Input
//             placeholder="Key learnings (comma separated)"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 keyLearnings: e.target.value,
//               })
//             }
//           />

//           <Input
//             placeholder="Tags (DSA, Java...)"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 tags: e.target.value,
//               })
//             }
//           />

//           <Button className="w-full" disabled={loading} onClick={submit}>
//             {loading && (
//               <span
//                 className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin "
//               />
//             )}

//             {loading ? "Submitting..." : "Submit Experience"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }



import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CompanyDropdown from "./CompanyDropdown";
import { useState } from "react";
import { createExperience } from "../api/experience";
import toast from "react-hot-toast";
import {
  Building2,
  Briefcase,
  Plus,
  Trash2,
  Lightbulb,
  Tag,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ShareExperienceDialog({ onSuccess }) {
  const [form, setForm] = useState({
    role: "",
    companyId: "",
    companyName: "",
    finalResult: "",
    adviceForJuniors: "",
    keyLearnings: "",
    tags: "",
    isOther: false,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [rounds, setRounds] = useState([
    {
      roundType: "Technical",
      questionsAsked: "",
      difficultyRating: 3,
    },
  ]);

  const handleRoundChange = (i, field, value) => {
    const updated = [...rounds];
    updated[i][field] = value;
    setRounds(updated);
  };

  const addRound = () => {
    setRounds([
      ...rounds,
      {
        roundType: "Technical",
        questionsAsked: "",
        difficultyRating: 3,
      },
    ]);
  };

  const removeRound = (index) => {
    if (rounds.length > 1) {
      setRounds(rounds.filter((_, i) => i !== index));
    }
  };

  const submit = async (e) => {
    e?.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        ...form,
        keyLearnings: form.keyLearnings.split(",").map((s) => s.trim()),
        tags: form.tags.split(",").map((s) => s.trim()),
        rounds: rounds.map((r) => ({
          ...r,
          questionsAsked: r.questionsAsked
            .split("\n")
            .map((q) => q.trim())
            .filter(Boolean),
        })),
      };

      await createExperience(payload);
      setOpen(false);
      toast.success("Experience shared successfully! 🎉");
      
      // Reset form
      setForm({
        role: "",
        companyId: "",
        companyName: "",
        finalResult: "",
        adviceForJuniors: "",
        keyLearnings: "",
        tags: "",
        isOther: false,
      });
      setRounds([
        {
          roundType: "Technical",
          questionsAsked: "",
          difficultyRating: 3,
        },
      ]);
      
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to submit experience"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
          <Sparkles size={18} className="mr-2" />
          Share Experience
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-800">
          <DialogTitle className="text-2xl font-bold">
            Share Your Interview Experience
          </DialogTitle>
          <DialogDescription>
            Help others by sharing your interview journey. Your experience can guide future candidates!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* COMPANY & ROLE SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-lg">Company & Role</h3>
            </div>

            <CompanyDropdown
              value={form.companyId}
              onChange={(val) => {
                if (val === "other") {
                  setForm({
                    ...form,
                    companyId: "",
                    isOther: true,
                  });
                } else {
                  setForm({
                    ...form,
                    companyId: val,
                    companyName: "",
                    isOther: false,
                  });
                }
              }}
            />

            {form.isOther && (
              <Input
                placeholder="Enter Company Name"
                value={form.companyName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    companyName: e.target.value,
                  })
                }
                className="border-dashed"
              />
            )}

            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-gray-400" />
              <Input
                placeholder="Role (e.g., SDE-1, Data Analyst, Product Manager)"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* INTERVIEW ROUNDS SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-lg">Interview Rounds</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                {rounds.length} {rounds.length === 1 ? "Round" : "Rounds"}
              </Badge>
            </div>

            <div className="space-y-4">
              {rounds.map((r, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-800 p-5 rounded-xl space-y-3 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                      Round {i + 1}
                    </span>
                    {rounds.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRound(i)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>

                  <Select
                    value={r.roundType}
                    onValueChange={(v) => handleRoundChange(i, "roundType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Round Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aptitude">📝 Aptitude</SelectItem>
                      <SelectItem value="Technical">💻 Technical</SelectItem>
                      <SelectItem value="HR">👔 HR Round</SelectItem>
                      <SelectItem value="Managerial">👨‍💼 Managerial</SelectItem>
                      <SelectItem value="System Design">🏗️ System Design</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    placeholder="Questions asked (one per line)&#10;e.g.,&#10;- Explain SOLID principles&#10;- Design a URL shortener&#10;- Tell me about yourself"
                    value={r.questionsAsked}
                    onChange={(e) =>
                      handleRoundChange(i, "questionsAsked", e.target.value)
                    }
                    rows={4}
                    className="resize-none"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Difficulty: {r.difficultyRating}/5
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={r.difficultyRating}
                      onChange={(e) =>
                        handleRoundChange(
                          i,
                          "difficultyRating",
                          Number(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Easy</span>
                      <span>Hard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={addRound}
              className="w-full border-dashed border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <Plus size={16} className="mr-2" />
              Add Another Round
            </Button>
          </div>

          {/* RESULT SECTION */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Final Result</h3>
            <Select
              value={form.finalResult}
              onValueChange={(v) => setForm({ ...form, finalResult: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Final Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="selected">✅ Selected</SelectItem>
                <SelectItem value="rejected">❌ Rejected</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ADVICE SECTION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-lg">Advice for Juniors</h3>
            </div>
            <Textarea
              placeholder="Share your wisdom! What would you tell someone preparing for this interview?"
              value={form.adviceForJuniors}
              onChange={(e) =>
                setForm({
                  ...form,
                  adviceForJuniors: e.target.value,
                })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          {/* KEY LEARNINGS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-lg">Key Learnings</h3>
            </div>
            <Input
              placeholder="Separate with commas (e.g., Practice mock interviews, Review basics, Stay calm)"
              value={form.keyLearnings}
              onChange={(e) =>
                setForm({
                  ...form,
                  keyLearnings: e.target.value,
                })
              }
            />
          </div>

          {/* TAGS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag size={20} className="text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-lg">Tags</h3>
            </div>
            <Input
              placeholder="Add relevant tags (e.g., DSA, Java, System Design, React)"
              value={form.tags}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value,
                })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            disabled={loading}
            onClick={submit}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Sparkles size={18} className="mr-2" />
                Submit Experience
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}