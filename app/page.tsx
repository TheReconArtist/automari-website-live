"use client"

import { useState, useEffect } from "react"
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
  CheckCircle,
  MapPin,
  Target,
  Send,
  Smile,
  ThumbsUp,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const aiAgents = [
  // ... [unchanged, as in previous versions] ...
  // (Omitted for brevity—no changes from your previous file)
]

const testimonials = [
  // ... [unchanged, as in previous versions] ...
  // (Omitted for brevity—no changes from your previous file)
]

const surveyQuestions = [
  // ... [unchanged, as in previous versions] ...
  // (Omitted for brevity—no changes from your previous file)
]

// Reusable CTA Section
function CTA() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg"
        asChild
      >
        <a href="tel:561-201-4365">
          <Phone className="inline-block mr-2 h-5 w-5" /> Text or Call: 561-201-4365
        </a>
      </Button>
      <Button
        variant="outline"
        className="text-blue-300 border-blue-400 mt-2"
        asChild
      >
        <a href="mailto:contactautomari@gmail.com">
          <Mail className="inline-block mr-2 h-5 w-5" /> Email: contactautomari@gmail.com
        </a>
      </Button>
    </div>
  )
}

// Email Lead Form for all forms (Footer/Contact)
function EmailLeadForm({
  cta = "Send",
  placeholder = "Enter your email",
  message = "Get a free automation assessment or exclusive AI tips!"
}: { cta?: string; placeholder?: string; message?: string }) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent) {
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

// Footer Link Modal Content (as before)
const FooterLinkContent = {
  "how-to": {
    title: "How-to Guides",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">How to Automate Your Business with AI</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Identify repetitive tasks that take up your team's valuable time.</li>
          <li>Choose the right Automari AI Agent for each workflow.</li>
          <li>Integrate our solutions with your existing tools — no coding needed.</li>
          <li>Train our AI with your company data for a personalized experience.</li>
          <li>Measure results, optimize, and scale!</li>
        </ul>
        <CTA />
      </>
    )
  },
  "success-stories": {
    title: "Success Stories",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Real Businesses, Real Results</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>
            <b>Miami Beach Paint:</b> Slashed response times from hours to minutes and increased customer satisfaction by 40%.
          </li>
          <li>
            <b>Rodriguez Construction:</b> Eliminated double bookings and streamlined project coordination.
          </li>
          <li>
            <b>Local Law Firm:</b> Automated email triage, saving over 10 hours/week for their partners.
          </li>
        </ul>
        <CTA />
      </>
    )
  },
  "templates": {
    title: "Templates",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">AI Automation Templates</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Customer Support Bot</li>
          <li>Appointment Scheduler</li>
          <li>Email Responder</li>
          <li>Invoice Generator</li>
        </ul>
        <p className="mb-4 text-slate-300">Get started in minutes — just customize, connect, and launch!</p>
        <CTA />
      </>
    )
  },
  "partners": {
    title: "Partner Directory",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Our Trusted Partners</h2>
        <p className="mb-4 text-slate-300">We collaborate with leading tech, finance, and logistics partners to deliver seamless automations for every industry.</p>
        <CTA />
      </>
    )
  },
  "exchange": {
    title: "Idea Exchange",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Share & Discover Automation Ideas</h2>
        <p className="mb-4 text-slate-300">Submit your pain points or discover ideas from other businesses. We turn your bottlenecks into breakthroughs!</p>
        <CTA />
      </>
    )
  },
  "about": {
    title: "About Us",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Who We Are</h2>
        <p className="mb-4 text-slate-300">Automari is an American agency at the forefront of the AI automation revolution. Combining faith, diligence, and innovation, we empower businesses to work smarter, not harder.</p>
        <CTA />
      </>
    )
  },
  "careers": {
    title: "Careers",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Join Our Mission</h2>
        <p className="mb-4 text-slate-300">We’re always looking for passionate, innovative minds to join our mission. If you love solving real-world problems and want to shape the future of work, let’s talk!</p>
        <CTA />
      </>
    )
  },
  "contact": {
    title: "Contact Us",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Get in Touch</h2>
        <p className="mb-4 text-slate-300">Questions? Ideas? Ready to automate? Reach out and let’s discuss your business goals.</p>
        <CTA />
      </>
    )
  },
  "press": {
    title: "Press",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Automari in the News</h2>
        <p className="mb-4 text-slate-300">See how Automari is shaping the future of work and empowering American businesses.</p>
        <CTA />
      </>
    )
  },
  "terms": {
    title: "Terms & Conditions",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Terms & Conditions</h2>
        <p className="mb-4 text-slate-300">We believe in transparency. Read our service terms and understand how we keep your data secure and your business compliant.</p>
        <CTA />
      </>
    )
  },
  "privacy": {
    title: "Privacy Policy",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Privacy Policy</h2>
        <p className="mb-4 text-slate-300">Your privacy matters. Automari is GDPR-compliant and committed to safeguarding your information.</p>
        <CTA />
      </>
    )
  },
  "academy": {
    title: "Automari Academy",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Automari Academy</h2>
        <p className="mb-4 text-slate-300">Free resources, tutorials, and webinars to help you and your team become automation experts.</p>
        <CTA />
      </>
    )
  },
  "community": {
    title: "Community",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Join Our Community</h2>
        <p className="mb-4 text-slate-300">Network with other business leaders, share ideas, and get support in our exclusive Automari Community.</p>
        <CTA />
      </>
    )
  },
  "help": {
    title: "Help Center",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Help Center</h2>
        <p className="mb-4 text-slate-300">Get answers to common questions and find troubleshooting tips.</p>
        <CTA />
      </>
    )
  },
  "blog": {
    title: "Blog",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Blog</h2>
        <p className="mb-4 text-slate-300">Insights, case studies, and the latest news from the automation frontier.</p>
        <CTA />
      </>
    )
  },
  "webinars": {
    title: "Webinars",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Webinars</h2>
        <p className="mb-4 text-slate-300">Join our free live events and learn from automation experts.</p>
        <CTA />
      </>
    )
  },
  "security": {
    title: "Security",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Security at Automari</h2>
        <p className="mb-4 text-slate-300">We use the latest technologies to keep your data safe. Security is our top priority.</p>
        <CTA />
      </>
    )
  },
  "disclaimer": {
    title: "Disclaimer",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Disclaimer</h2>
        <p className="mb-4 text-slate-300">Information on this site is for educational purposes. For personalized advice, contact us directly.</p>
        <CTA />
      </>
    )
  },
  "bounty": {
    title: "Bug Bounty",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Bug Bounty</h2>
        <p className="mb-4 text-slate-300">Help us keep Automari secure! Report any vulnerabilities and earn rewards.</p>
        <CTA />
      </>
    )
  },
  "ethics": {
    title: "Ethics & Compliance",
    content: (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Ethics & Compliance</h2>
        <p className="mb-4 text-slate-300">We’re committed to ethical AI development and strict legal compliance. Learn more about our standards.</p>
        <CTA />
      </>
    )
  },
  "learn-more": {
    title: "Learn More",
    content: (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Learn More About Automari</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Discover how automation can immediately impact your bottom line.</li>
          <li>See industry benchmarks and ROI statistics.</li>
          <li>Learn about our white-glove onboarding & ongoing support.</li>
          <li>Still have questions? Book a discovery call or send us a text!</li>
        </ul>
        <CTA />
      </>
    )
  }
}

// Footer Modal
function FooterModal({ link, onClose }: { link: string, onClose: () => void }) {
  const entry = FooterLinkContent[link]
  if (!entry) return null
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
          <h3 className="text-xl font-bold text-blue-300">{entry.title}</h3>
          <button onClick={onClose}>
            <X className="h-7 w-7 text-slate-300 transition hover:text-red-400" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {entry.content}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Optimist Section
const OptimistSection = () => (
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center"><Smile className="mr-2 h-5 w-5" />Optimist’s Perspective</h3>
    <ul className="text-slate-100 text-base mb-4 space-y-2">
      <li>
        <b>“What if this works for me?”</b><br/>
        <span className="text-green-200">You could unlock time and profits you never thought possible. Most businesses see ROI within the first 30 days.</span>
      </li>
      <li>
        <b>“How fast can I get started?”</b><br/>
        <span className="text-green-200">Our onboarding is fast, friendly, and human. Many clients are up and running in under a week.</span>
      </li>
      <li>
        <b>“Can I outpace my competitors?”</b><br/>
        <span className="text-green-200">Absolutely. Early adopters of AI automation gain a lasting edge in customer service, speed, and innovation.</span>
      </li>
      <li>
        <b>“Will my employees like it?”</b><br/>
        <span className="text-green-200">Teams love ditching boring tasks for meaningful work. Morale and retention go up, not down!</span>
      </li>
    </ul>
  </div>
)

// Animated Logo
const AnimatedLogo = () => (
  <div className="flex justify-center mb-8">
    <motion.div
      className="relative w-40 h-40 sm:w-56 sm:h-56 drop-shadow-2xl"
      initial={{ scale: 0.8, rotate: -10 }}
      animate={{ scale: [1, 1.08, 0.96, 1.04, 1], rotate: [0, 15, -10, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
      whileHover={{ scale: 1.12, rotate: 8 }}
      whileTap={{ scale: 0.98, rotate: -5 }}
      style={{
        perspective: "1000px"
      }}
    >
      {/* Glowing 3D border */}
      <div className="absolute inset-0 rounded-3xl border-4 border-gradient-to-r from-red-400 via-blue-400 to-slate-200 blur-md opacity-60 z-0 pointer-events-none" />
      {/* Animated Sparkles */}
      <motion.div
        className="absolute w-6 h-6 left-2 top-2 bg-gradient-to-tr from-blue-400/80 to-white/30 rounded-full blur-lg z-10"
        animate={{ y: [0, 10, -10, 0], opacity: [0.8, 0.6, 0.8, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", delay: 0.5 }}
      />
      <motion.div
        className="absolute w-4 h-4 right-4 bottom-4 bg-gradient-to-tr from-red-400/70 to-white/20 rounded-full blur-md z-10"
        animate={{ y: [0, -12, 8, 0], opacity: [0.7, 0.4, 0.7, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop", delay: 1.5 }}
      />
      {/* 3D/Layered Logo */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-blue-200/10 to-red-400/10 z-0"
        style={{ filter: "blur(20px)" }}
        animate={{ opacity: [0.6, 0.4, 0.65, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden z-20"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 6px 2px rgba(255,255,255,0.2)"
        }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: [0, 25, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
      >
        <Image
          src="/automari-logo.png"
          alt="Automari 3D Logo"
          fill
          className="object-contain scale-110"
          priority
        />
      </motion.div>
    </motion.div>
  </div>
)

export default function AutomariWebsite() {
  // ...existing state...
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [surveyData, setSurveyData] = useState<Record<string, any>>({})
  const [surveyStep, setSurveyStep] = useState(0)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveySubmitted, setSurveySubmitted] = useState(false)
  const [footerModal, setFooterModal] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // ...rest of the code as in previous examples...

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated Open/Free/Beautiful Background */}
      <motion.div className="fixed inset-0 opacity-80 pointer-events-none z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 animate-pulse" />
        {/* Animated Circles and Blobs for Open/Futuristic Look */}
        <motion.div
          className="absolute top-10 left-1/2 w-[80vw] h-[60vw] max-w-2xl bg-gradient-to-tr from-blue-600/20 via-blue-400/30 to-blue-800/10 rounded-full blur-2xl"
          style={{ x: "-50%" }}
          animate={{ scale: [1, 1.07, 0.96, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-red-600/30 via-red-400/20 to-blue-900/30 rounded-full blur-3xl"
          animate={{ y: [0, 30, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-blue-500/25 to-blue-300/25 rounded-full blur-3xl"
          animate={{ x: [0, -25, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />
        <svg className="absolute bottom-0 left-0 w-full h-40 pointer-events-none" viewBox="0 0 1440 320" fill="none">
          <defs>
            <linearGradient id="footerGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#ef4444" stopOpacity="0.10"/>
            </linearGradient>
          </defs>
          <path fill="url(#footerGradient)" d="M0,320L48,293.3C96,267,192,213,288,197.3C384,181,480,203,576,202.7C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
      </motion.div>

      {/* ...rest of the site as in prior versions, including: */}
      {/* Navigation, Hero (with <AnimatedLogo />), AI Agents, Testimonials, */}
      {/* ...Futuristic/Informative Middle Section with <OptimistSection /> */}
      {/* ...Survey Modal, Contact Section with <EmailLeadForm /> */}
      {/* ...Footer with modal links, <EmailLeadForm />, and <FooterModal /> */}

      {/* -- The above is designed to be extremely mobile-friendly with open, "free" animated backgrounds and responsive layouts -- */}
    </div>
  )
}

// --- The rest of your sections (Navigation, Hero, AI Agents, Testimonials, etc.) ---
// --- should use the code structure and sections from the previous response, with this upgraded background and mobile-first adjustments ---
