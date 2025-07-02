"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Phone,
  Mail,
  Menu,
  X,
  MessageSquare,
  Calendar,
  Calculator,
  Users,
  Package,
  TrendingUp,
  BarChart3,
  Share2,
  Shield,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  Target,
  Instagram,
  Facebook,
  Twitter,
  Tiktok,
  HelpCircle,
  FileText,
  Briefcase,
  Info,
  BookOpen,
  FileWarning,
  CheckCircle,
  Send,
  Smile
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// ---- DATA ARRAYS ----

const aiAgents = [
  // ... (Your aiAgents array stays unchanged)
  // Paste your full aiAgents array here as in your code
  // I have omitted it for brevity, but you should leave the full array
]

const testimonials = [
  // ... (Your testimonials array unchanged)
  // Paste your full testimonials array here as in your code
]

const surveyQuestions = [
  // ... (Your surveyQuestions array unchanged)
  // Paste your full surveyQuestions array here as in your code
]

// ---- CTA Component ----
function CTA() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg" asChild>
        <a href="sms:5612014365">
          <Phone className="inline-block mr-2 h-5 w-5" /> Text: 561-201-4365
        </a>
      </Button>
      <Button variant="outline" className="text-blue-300 border-blue-400 mt-2" asChild>
        <a href="mailto:contactautomari@gmail.com">
          <Mail className="inline-block mr-2 h-5 w-5" /> Email: contactautomari@gmail.com
        </a>
      </Button>
    </div>
  )
}

// ---- Email Lead Form ----
function EmailLeadForm({ cta = "Send", placeholder = "Enter your email", message = "Get a free automation assessment or exclusive AI tips!" }) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSent(false)
    try {
      const res = await fetch("https://formspree.io/f/mrbkjoav", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ email })
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError("Submission failed, please try again!")
      }
    } catch (e) {
      setError("Network error, please try again!")
    }
    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col items-center gap-2 mt-2 mb-2">
      <label className="sr-only" htmlFor="footer-email-lead">Email</label>
      <Input
        id="footer-email-lead"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-slate-800/70 border-slate-600 text-white placeholder-slate-400"
        disabled={sent}
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-6 py-2 font-semibold rounded-full mt-1"
        disabled={sent || loading}
      >
        {sent ? "Sent!" : cta}
      </Button>
      <span className="text-xs text-slate-400">{message}</span>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </form>
  )
}

// ---- Social Media Icons ----
const SocialMediaIcons = () => (
  <div className="flex justify-center space-x-5 mt-5">
    <a href="#" target="_blank" aria-label="Instagram" className="hover:text-pink-400"><Instagram className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Facebook" className="hover:text-blue-400"><Facebook className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Twitter" className="hover:text-blue-300"><Twitter className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="TikTok" className="hover:text-black"><Tiktok className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Indeed" className="hover:text-blue-600"><Briefcase className="h-6 w-6" /></a>
  </div>
)

// ---- Ask Me Anything Box ----
function AskMeAnythingBox() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  return (
    <div className="fixed right-5 bottom-5 z-[100]">
      <motion.div
        className="rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-red-600 hover:shadow-xl cursor-pointer flex items-center px-4 py-3 space-x-3 transition-all"
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(!open)}
      >
        <HelpCircle className="h-6 w-6" />
        <span className="font-bold">Ask Me Anything</span>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 bottom-16 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 z-[101] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="font-bold text-lg mb-2 flex items-center gap-2 text-blue-200">
              <HelpCircle className="h-5 w-5" /> Ask Me Anything
            </div>
            <Input
              ref={inputRef}
              placeholder="Type your question..."
              className="mb-3"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  window.open("https://chat.openai.com/", "_blank")
                }
              }}
            />
            <Button
              className="w-full bg-gradient-to-r from-red-600 to-blue-600 mt-2"
              onClick={() => window.open("https://chat.openai.com/", "_blank")}
            >
              <Send className="mr-1 h-4 w-4" /> Get AI Answer
            </Button>
            <div className="text-xs text-slate-500 mt-2 text-center">Powered by ChatGPT</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---- Footer Modal ----
function FooterModal({ link, onClose }) {
  const modalContent = {
    "how-to": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center"><FileText className="mr-2" />How-to Guides</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Understand your bottlenecks: List top 3 tasks that eat the most time.</li>
          <li>Contact Automari for a free automation walkthrough & demo tailored to your business.</li>
          <li>We’ll recommend the best-fit AI agent (no coding or tech headaches required).</li>
          <li>Our team handles the setup and training using your company’s data.</li>
          <li>Your staff gets a simple onboarding session – and your ROI starts in days, not months.</li>
        </ul>
        <p className="text-slate-400">Ready to start? We’ll never push you to DIY – our mission is to do it for you, with you.</p>
        <CTA />
      </>
    ),
    "about": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2 flex items-center"><Info className="mr-2" />About Automari</h2>
        <p className="mb-4 text-slate-300">
          Automari is a South Florida-born automation agency on a mission: <b>bring AI’s time-saving power to everyday American businesses</b>.<br /><br />
          We’re a team of process geeks, creative thinkers, and faith-driven consultants. Our belief? <b>Automation should be personal</b>. That means hands-on service, custom solutions, and real relationships.
          <br /><br />
          We blend top-tier AI technology with old-school business values: <b>honesty, diligence, and God-driven integrity</b>. From solo entrepreneurs to 100+ employee firms – if you want to work smarter, Automari is your edge.
        </p>
        <CTA />
      </>
    ),
    "disclaimer": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2 flex items-center"><FileWarning className="mr-2" />Disclaimer</h2>
        <p className="mb-4 text-slate-300">
          The information on this website is provided for general educational purposes only and does not constitute business, legal, or financial advice. For personalized recommendations, please contact Automari directly.
          <br /><br />
          Automari does not guarantee specific business outcomes. Results may vary based on your unique business context and implementation of recommended strategies. 
          <br /><br />
          <b>All trademarks and brands mentioned are property of their respective owners.</b>
        </p>
        <CTA />
      </>
    ),
    // Add the rest of your modal content keys as needed
  }
  if (!modalContent[link]) return null
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center px-2 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900 via-blue-950 to-red-950 border border-slate-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
        initial={{ scale: 0.93, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 40 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-blue-300">{link.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</h3>
          <button onClick={onClose}>
            <X className="h-7 w-7 text-slate-300 transition hover:text-red-400" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {modalContent[link]}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---- Main Component ----

export default function AutomariWebsite() {
  const [footerModal, setFooterModal] = useState(null)

  // All your main page content goes here...
  // For brevity I am omitting the main sections (navigation, hero, AI agents, testimonials, Q&A, survey modal, etc.)
  // You would paste your full (working) main sections here, as in your previous v4.

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* ...ALL YOUR MAIN PAGE SECTIONS HERE (navigation, hero, agents, testimonials, Q&A, survey modal, etc.)... */}

      <AskMeAnythingBox />

      <footer className="relative border-t border-slate-700/50 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 to-slate-900 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-blue-950/10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            {/* ...as in your previous footer... */}
          </div>
          {/* Footer Navigation */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-slate-200">
            {[
              { title: "Solutions", links: ["how-to", "success-stories", "templates", "partners", "exchange"] },
              { title: "Company", links: ["about", "careers", "contact", "press", "terms", "privacy"] },
              { title: "Resources", links: ["academy", "community", "help", "blog", "webinars", "security"] },
              { title: "Legal & More", links: ["disclaimer", "bounty", "ethics", "learn-more"] }
            ].map((col, idx) => (
              <div key={col.title}>
                <h5 className={`font-semibold text-lg mb-3 ${idx % 2 === 0 ? "text-blue-200" : "text-red-200"}`}>{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <button
                        className="hover:text-blue-400 transition bg-transparent text-left w-full"
                        onClick={() => setFooterModal(link)}
                        style={{ outline: "none" }}
                      >
                        {link.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col md:flex-row items-center gap-4 justify-center">
            <EmailLeadForm
              cta="Stay In the Loop"
              placeholder="Enter your email"
              message="Get updates, tips, and exclusive offers from Automari."
            />
          </div>
          <SocialMediaIcons />
          <div className="border-t border-slate-700/50 pt-8 text-center">
            <p className="text-slate-300 text-base mb-4">
              Empowering American businesses to thrive in the intelligent automation era. Tomorrow’s solutions, delivered today.
            </p>
            <div className="flex justify-center items-center space-x-2 text-xs text-slate-600">
              <span>🇺🇸</span>
              <span>Made in America</span>
              <span>•</span>
              <span>Powered by Innovation</span>
              <span>•</span>
              <span>Driven by God</span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {footerModal && (
            <FooterModal link={footerModal} onClose={() => setFooterModal(null)} />
          )}
        </AnimatePresence>
      </footer>
    </div>
  )
}
