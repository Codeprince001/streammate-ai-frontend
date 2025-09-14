"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Users, Tv, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Conversational Search",
    description: "Tell us your vibe — StreamMate handles the rest with AI magic.",
  },
  {
    icon: <Tv className="w-6 h-6" />,
    title: "Cross-Platform",
    description: "Netflix, Prime, Disney+, Hulu — all in one AI-powered hub.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Group Balancer",
    description: "Movie night? StreamMate finds the perfect compromise for everyone.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Smart Binge Planner",
    description: "Got 3 hours? AI builds the perfect binge-worthy lineup.",
  },
];

const faqs = [
  {
    q: "Do I need a subscription?",
    a: "StreamMate AI is free to use with basic features. Premium plans unlock advanced personalization.",
  },
  {
    q: "Which platforms are supported?",
    a: "We integrate Netflix, Prime, Disney+, Hulu, and more. New platforms are added regularly.",
  },
  {
    q: "Is my data private?",
    a: "Yes. We never share your viewing habits with third parties. Privacy is our priority.",
  },
  {
    q: "Can I use it with friends?",
    a: "Absolutely! Our group balancer makes sure everyone’s preferences are considered.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold">SM</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StreamMate AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:scale-105 transition cursor-pointer border">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center">
          <motion.h2
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover your perfect show <br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StreamMate AI
            </span>
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tired of scrolling? Let AI find movies and shows that fit your mood,
            time, and vibe — across Netflix, Prime, Disney+, and more.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/discover">
              <Button size="lg">Start Exploring</Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h3
            className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose StreamMate AI?
          </motion.h3>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-gray-50 cursor-pointer dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mx-auto">
                  {f.icon}
                </div>
                <h4 className="mt-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h4>
                <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.h3
            className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h3>

          <div className="mt-12 space-y-6">
            {faqs.map((f, i) => (
              <FAQItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} StreamMate AI. All rights reserved.
      </footer>
    </div>
  );
}

// --- FAQ Accordion ---
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200  dark:border-gray-700 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left  cursor-pointer"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="mt-3 text-gray-600 dark:text-gray-400">{answer}</p>
      )}
    </div>
  );
}
