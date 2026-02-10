import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

export default function Landing() {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-gray-200 dark:border-gray-800">

        <div className="flex items-center gap-2">
          <div className="bg-black text-white w-9 h-9 flex items-center justify-center rounded-lg">
            <Brain size={18} />
          </div>

          <h1 className="text-xl font-bold">
            PlacementPro
          </h1>
        </div>

        <button
          onClick={() =>
            navigate(token ? "/dashboard" : "/login")
          }
          className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          {token ? "Go to Dashboard" : "Login"}
        </button>

      </nav>


      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold max-w-3xl leading-tight"
        >
          Crack Your Placement With Confidence 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-6 text-lg max-w-2xl"
        >
          AI-powered practice tests, adaptive learning,
          and real interview experiences — everything you need
          to land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-8"
        >

          <button
            onClick={() =>
              navigate(token ? "/dashboard" : "/register")
            }
            className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border px-6 py-3 rounded-xl text-lg hover:bg-gray-100 transition"
          >
            Login
          </button>

        </motion.div>

      </section>


      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-24">

        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-gray-500 mt-3">
              {feature.desc}
            </p>
          </motion.div>
        ))}

      </section>


      {/* FINAL CTA */}
      <section className="text-center pb-24">

        <h2 className="text-3xl font-bold">
          Start Practicing Today.
        </h2>

        <button
          onClick={() =>
            navigate(token ? "/dashboard" : "/register")
          }
          className="mt-6 bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition"
        >
          Begin Now 🚀
        </button>

      </section>

    </div>
  );
}

const features = [
  {
    title: "Adaptive Practice",
    desc:
      "Our engine detects your weak areas and generates tests tailored to improve them."
  },
  {
    title: "Mock Interviews",
    desc:
      "Practice real interview scenarios with AI-driven feedback."
  },
  {
    title: "Real Experiences",
    desc:
      "Learn from students who cracked top companies."
  }
];
