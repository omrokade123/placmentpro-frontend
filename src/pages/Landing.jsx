import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Brain, BarChart2, Zap, BookOpen, Users, Trophy,
  Clock, Star, FileText, TrendingUp, Target, CheckCircle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Zap,
    title: "Adaptive Practice",
    desc: "Our engine detects your weak areas and generates tests tailored to improve them in real time.",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    desc: "Practice real interview scenarios with AI-driven feedback and company-specific question sets.",
  },
  {
    icon: FileText,
    title: "Real Experiences",
    desc: "Read verified interview experiences from students who cracked top companies like TCS, Infosys, and Wipro.",
  },
];

const stats = [
  { value: "12,000+", label: "Students enrolled" },
  { value: "500+",    label: "Companies covered" },
  { value: "50,000+", label: "Questions in bank" },
  { value: "92%",     label: "Report confidence gain" },
];

const steps = [
  {
    num: "01",
    title: "Create your profile",
    desc: "Set your target companies and skill level. Takes under 2 minutes.",
    badge: { text: "Free", color: "green" },
  },
  {
    num: "02",
    title: "Take adaptive practice tests",
    desc: "The engine picks questions based on your weak areas and adjusts difficulty in real time.",
    badge: { text: "AI-powered", color: "blue" },
  },
  {
    num: "03",
    title: "Review your AI report",
    desc: "Get a detailed report after each test — topic scores, time analysis, and improvement tips.",
    badge: null,
  },
  {
    num: "04",
    title: "Simulate real interviews",
    desc: "Practice company-specific mock interviews and read verified student experiences.",
    badge: null,
  },
  {
    num: "05",
    title: "Track progress & earn badges",
    desc: "Streak tracking, leaderboard rankings, and achievement badges keep you motivated.",
    badge: { text: "New", color: "amber" },
  },
];

const topics = [
  "Quantitative aptitude", "Logical reasoning", "Verbal ability",
  "Data interpretation", "Coding — DSA", "Number series",
  "Blood relations", "Seating arrangement", "Reading comprehension",
  "Puzzles", "SQL basics", "OOP concepts",
];

const highlights = [
  { icon: BookOpen,   title: "Question bank",           desc: "50,000+ questions across 4 topics with difficulty tagging and company filters." },
  { icon: Clock,      title: "Timed mock tests",         desc: "Company-pattern tests with real exam time pressure to build speed and accuracy." },
  { icon: BarChart2,  title: "Progress analytics",       desc: "Visual reports with score trends and time-per-question breakdown." },
  { icon: TrendingUp, title: "Leaderboard",              desc: "Compete with peers and see where you rank nationally." },
  { icon: Trophy,     title: "Achievements",             desc: "Unlock badges for streaks, perfect scores, and topic milestones." },
  { icon: FileText,   title: "Interview experiences",    desc: "Verified reports from students who cracked top placement rounds." },
];

const testimonials = [
  {
    initials: "AR", name: "Arjun R.", role: "Placed at TCS Digital", color: "blue",
    quote: "The adaptive tests helped me identify I was weak at blood relations. After two weeks of focused practice, I cleared the reasoning section without stress.",
  },
  {
    initials: "PS", name: "Priya S.", role: "Placed at Infosys SP", color: "green",
    quote: "The interview experiences section is gold. I read 10 verified reports for Infosys and knew exactly what to expect on the day.",
  },
  {
    initials: "KM", name: "Karan M.", role: "Placed at Wipro Turbo", color: "yellow",
    quote: "The streak system kept me consistent. I practiced for 30 days straight and my average score went from 58% to 81%.",
  },
  {
    initials: "SL", name: "Sneha L.", role: "Placed at Accenture", color: "purple",
    quote: "Filtering questions by company gave me a realistic feel of their actual exam pattern. Highly recommend for any serious aspirant.",
  },
];

const faqs = [
  { q: "Is PlacementPro free to use?",                     a: "Yes — the core practice tests, question bank, and progress tracking are completely free. Always." },
  { q: "Which companies are covered?",                      a: "We cover 500+ companies including TCS, Infosys, Wipro, Accenture, Cognizant, HCL, and many more." },
  { q: "How are the adaptive tests different?",             a: "Our engine analyses your past responses and picks questions that target your specific weak sub-topics, adjusting difficulty dynamically." },
  { q: "Can I submit my own interview experience?",         a: "Yes. After logging in you can submit a detailed interview report. It goes through a brief moderation review before being published." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const badgeClass = {
  green:  "bg-green-100  text-green-700  dark:bg-green-900/40  dark:text-green-300",
  blue:   "bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300",
  amber:  "bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const avatarClass = {
  blue:   "bg-blue-100   text-blue-700   dark:bg-blue-900/50   dark:text-blue-300",
  green:  "bg-green-100  text-green-700  dark:bg-green-900/50  dark:text-green-300",
  yellow: "bg-amber-100  text-amber-700  dark:bg-amber-900/50  dark:text-amber-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
};

function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      {label && (
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">
          {label}
        </p>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Landing() {
  const { token } = useContext(AuthContext);
  const navigate  = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">

      {/* ── NAVBAR ── */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="bg-black dark:bg-white text-white dark:text-black w-9 h-9 flex items-center justify-center rounded-lg">
            <Brain size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">PlacementPro</span>
        </div>

        <div className="flex items-center gap-3">
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition px-3 py-1.5"
            >
              Login
            </button>
          )}
          <button
            onClick={() => navigate(token ? "/dashboard" : "/register")}
            className="bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-2 rounded-lg hover:opacity-85 transition font-medium"
          >
            {token ? "Dashboard" : "Get started free"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="flex flex-col items-center text-center px-6 py-28 border-b border-gray-100 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5"
        >
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${badgeClass.blue}`}>
            <Star size={11} />
            AI-powered placement preparation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight tracking-tight"
        >
          Crack your placement with confidence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-gray-500 dark:text-gray-400 mt-6 text-lg max-w-xl leading-relaxed"
        >
          Adaptive practice tests, real interview experiences, AI-generated
          reports, and streak tracking — everything you need to land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-9 justify-center"
        >
          <button
            onClick={() => navigate(token ? "/dashboard" : "/register")}
            className="bg-black dark:bg-white text-white dark:text-black px-7 py-3.5 rounded-xl text-base font-semibold hover:scale-105 transition"
          >
            Start for free
          </button>
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="border border-gray-300 dark:border-gray-700 px-7 py-3.5 rounded-xl text-base hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Login
            </button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-gray-400 dark:text-gray-600"
        >
          Joined by 12,000+ students from 200+ colleges across India
        </motion.p>
      </section>

      {/* ── STATS ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 dark:border-gray-800">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col items-center justify-center py-10 px-4 text-center
              ${i < stats.length - 1 ? "border-r border-gray-100 dark:border-gray-800" : ""}`}
          >
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ── CORE FEATURES ── */}
      <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader
          label="What you get"
          title="Everything you need, nothing you don't"
          subtitle="PlacementPro is laser-focused on one goal: getting you placed."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-7 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 transition"
            >
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-5">
                <f.icon size={18} className="text-white dark:text-black" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader
          label="How it works"
          title="From signup to offer letter"
          subtitle="A simple 5-step system designed to take you from zero to placement-ready."
        />
        <div className="flex flex-col border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden max-w-3xl">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start gap-5 p-6
                ${i < steps.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}
                hover:bg-gray-50 dark:hover:bg-gray-900/60 transition`}
            >
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-600 min-w-[24px] pt-0.5">
                {step.num}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
              {step.badge && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${badgeClass[step.badge.color]}`}>
                  {step.badge.text}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader
          label="Topic coverage"
          title="Every section of every placement exam"
          subtitle="From classic aptitude to advanced DSA — we've got all the topics that matter."
        />
        <div className="flex flex-wrap gap-3">
          {topics.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="text-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700
                         text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500
                         hover:bg-gray-50 dark:hover:bg-gray-800/60 transition cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── PLATFORM HIGHLIGHTS ── */}
      <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader label="Platform features" title="Everything in one place" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition"
            >
              <div className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <h.icon size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{h.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader
          label="Student stories"
          title="Real feedback, real results"
          subtitle="Thousands of students have used PlacementPro to prepare and succeed."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${avatarClass[t.color]}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* ── FAQ ── */}
      <section className="px-6 md:px-10 py-20 border-b border-gray-100 dark:border-gray-800">
        <SectionHeader label="FAQ" title="Common questions" />
        <div className="flex flex-col border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-6 ${i < faqs.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle size={15} className="text-gray-400 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1.5">{faq.q}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="text-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
            Ready to begin?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Start practicing today.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-9 max-w-md mx-auto">
            Join 12,000+ students already preparing smarter. Free forever, no credit card required.
          </p>
          <button
            onClick={() => navigate(token ? "/dashboard" : "/register")}
            className="bg-black dark:bg-white text-white dark:text-black px-9 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition inline-flex items-center gap-2"
          >
            Begin now <Target size={18} />
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 px-6 md:px-10 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-black dark:bg-white text-white dark:text-black w-7 h-7 flex items-center justify-center rounded-md">
              <Brain size={14} />
            </div>
            <span className="font-bold text-sm tracking-tight">PlacementPro</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {new Date().getFullYear()} PlacementPro. Built to get you placed.
          </p>
          <div className="flex gap-5 text-xs text-gray-400 dark:text-gray-600">
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition">Privacy</span>
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition">Terms</span>
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition">Contact</span>
          </div>
        </div>
      </footer>

    </div>
  );
}