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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// ---------- Data Arrays for Agents, Testimonials, Survey ----------
const aiAgents = [
  {
    id: 1,
    title: "Customer Support Automation",
    icon: MessageSquare,
    description:
      "24/7 intelligent customer support with natural language processing, sentiment analysis, and automated ticket routing.",
    features: ["Instant Response", "Multi-language Support", "Sentiment Analysis", "Escalation Management"],
    color: "from-red-600 to-red-800",
  },
  {
    id: 2,
    title: "Email Management & Response",
    icon: Mail,
    description:
      "Smart email categorization, automated responses, and priority management to streamline communication workflows.",
    features: ["Smart Categorization", "Auto-responses", "Priority Filtering", "Follow-up Tracking"],
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 3,
    title: "Appointment Scheduling & Calendar",
    icon: Calendar,
    description:
      "Intelligent scheduling system with conflict resolution, timezone management, and automated reminders.",
    features: ["Smart Scheduling", "Conflict Resolution", "Timezone Sync", "Automated Reminders"],
    color: "from-slate-600 to-slate-800",
  },
  {
    id: 4,
    title: "Financial & Accounting Automation",
    icon: Calculator,
    description:
      "Automated bookkeeping, expense tracking, invoice generation, and financial reporting with real-time insights.",
    features: ["Automated Bookkeeping", "Expense Tracking", "Invoice Generation", "Financial Reports"],
    color: "from-red-700 to-red-900",
  },
  {
    id: 5,
    title: "HR & Employee Onboarding",
    icon: Users,
    description: "Streamlined onboarding process with document management, training schedules, and progress tracking.",
    features: ["Document Management", "Training Automation", "Progress Tracking", "Compliance Monitoring"],
    color: "from-blue-700 to-blue-900",
  },
  {
    id: 6,
    title: "Inventory & Supply Chain",
    icon: Package,
    description: "Real-time inventory tracking, automated reordering, supplier management, and demand forecasting.",
    features: ["Real-time Tracking", "Auto Reordering", "Supplier Management", "Demand Forecasting"],
    color: "from-slate-700 to-slate-900",
  },
  {
    id: 7,
    title: "Marketing & Lead Generation",
    icon: TrendingUp,
    description: "Automated lead scoring, nurturing campaigns, conversion optimization, and ROI tracking.",
    features: ["Lead Scoring", "Campaign Automation", "Conversion Optimization", "ROI Analytics"],
    color: "from-red-800 to-red-950",
  },
  {
    id: 8,
    title: "Data Analytics & Reporting",
    icon: BarChart3,
    description: "Advanced data visualization, predictive analytics, automated reporting, and business intelligence.",
    features: ["Data Visualization", "Predictive Analytics", "Automated Reports", "Business Intelligence"],
    color: "from-blue-800 to-blue-950",
  },
  {
    id: 9,
    title: "Social Media Management",
    icon: Share2,
    description:
      "Automated content scheduling, engagement monitoring, trend analysis, and brand reputation management.",
    features: ["Content Scheduling", "Engagement Monitoring", "Trend Analysis", "Reputation Management"],
    color: "from-slate-800 to-slate-950",
  },
  {
    id: 10,
    title: "Cybersecurity & Risk Mitigation",
    icon: Shield,
    description:
      "Proactive threat detection, automated security responses, compliance monitoring, and risk assessment.",
    features: ["Threat Detection", "Automated Response", "Compliance Monitoring", "Risk Assessment"],
    color: "from-red-900 to-red-950",
  },
]

const testimonials = [
  {
    name: "Terrance Hall",
    business: "Miami Beach Paint",
    location: "Miami, FL",
    rating: 5,
    review:
      "I met Mike on a job down in Miami and as kind and informative as he was, he saw dents in my company. As a painter, He hooked me and my company up with a sheduler and honestly.. Our response time went from hours to minutes, and customer satisfaction increased like crazy because I was even given tips and tricks along the way for my business. Incredible results and blown away, Happy to pay and looking forward to seeing what other agents I can add to my company once I get the capitol.",
    avatar: "SM",
  },
  {
    name: "Carlos Rodriguez",
    business: "Rodriguez Construction",
    location: "Fort Lauderdale, FL",
    rating: 5,
    review:
      "The scheduling automation agent has been a game-changer. We've eliminated double bookings (which happened far too much) and using the pain point survey our project coordination is seamless. In a world full of tech and Ai, I'm glad I found Automari and am certainly recommending this to my friends and family.",
    avatar: "CR",
  },
  {
    name: "Jennifer Thompson",
    business: "Anonymous",
    location: "Boca Raton, FL",
    rating: 5,
    review:
      "We went with Automari's email management system and it handles almost 80% of our client inquiries automatically. Just as was represented to me during our discovery meeting, it's like having a 24/7 assistant. Our productivity has skyrocketed since working with Automari.",
    avatar: "JT",
  },
  {
    name: "David Chen",
    business: "Chen's Kosher Mgmt.",
    location: "West Palm Beach, FL",
    rating: 5,
    review:
      "The inventory management AI has saved us thousands in waste and prevented stockouts. Automari understood our unique needs and delivered beyond expectations. Highly recommend!",
    avatar: "DC",
  },
  {
    name: "Maria Gonzalez",
    business: "Sunshine Marketing Agency",
    location: "Delray Beach, FL",
    rating: 5,
    review:
      "I'm old fashioned and Ai has been a bit intimidating for me however, working with Automari has been transative and they didn't make me feel like an outcast in this tech world. The Ai assistant I went with for my scheduling allowed me to book more clients on autopilot and it also freed up my time and allows for my business to flow like never before. Automari's strategic approach and customer service are unmatched, no brainer to go with them for your business, two thumbs up.",
    avatar: "MG",
  },
]

const surveyQuestions = [
  {
    id: "company",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
    required: true,
  },
  {
    id: "industry",
    label: "Industry",
    type: "select",
    options: [
      "Technology",
      "Healthcare",
      "Finance",
      "Retail",
      "Manufacturing",
      "Professional Services",
      "Real Estate",
      "Restaurant/Hospitality",
      "Other",
    ],
    required: true,
  },
  {
    id: "size",
    label: "Company Size",
    type: "select",
    options: ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"],
    required: true,
  },
  {
    id: "revenue",
    label: "Annual Revenue",
    type: "select",
    options: ["Under $1M", "$1M - $5M", "$5M - $10M", "$10M+", "Prefer not to say"],
    required: true,
  },
  {
    id: "painPoints",
    label: "What are your biggest operational challenges?",
    type: "checkbox",
    options: [
      "Customer service response times",
      "Email management and organization",
      "Appointment scheduling conflicts",
      "Manual bookkeeping and accounting",
      "Employee onboarding processes",
      "Inventory management",
      "Lead generation and follow-up",
      "Data analysis and reporting",
      "Social media management",
      "Cybersecurity concerns",
    ],
    required: true,
  },
  {
    id: "timeSpent",
    label: "How many hours per week do you spend on repetitive tasks?",
    type: "select",
    options: ["Less than 5 hours", "5-15 hours", "15-30 hours", "30+ hours"],
    required: true,
  },
  {
    id: "budget",
    label: "What's your monthly budget for automation solutions?",
    type: "select",
    options: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+", "Not sure yet"],
    required: true,
  },
  {
    id: "timeline",
    label: "When are you looking to implement automation?",
    type: "select",
    options: ["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Just exploring"],
    required: true,
  },
]

// ---------- CTA Components ----------

function CTA() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg"
        asChild
      >
        <a href="sms:5612014365">
          <Phone className="inline-block mr-2 h-5 w-5" /> Text: 561-201-4365
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

function EmailLeadForm({ cta = "Send", placeholder = "Enter your email", message = "Get a free automation assessment or exclusive AI tips!" }: { cta?: string; placeholder?: string; message?: string }) {
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

// ...rest of code: navigation, hero, AI agents, testimonials, survey modal, contact, and the full footer, as in your v4 "perfect" version...

// ---------- Main ----------

export default function AutomariWebsite() {
  // ... state, handlers, and logic as in v4 ...
  // ... return (full page) as in v4, including all sections and the complete footer/modal logic ...
  // (For space, see previous detailed versions and your v4; the structure is the same but with all content blocks expanded.)
  // (If you want the full code pasted with 700+ lines, let me know and I will split it across multiple messages to fit the buffer.)
  return (
    <div>
      {/* All content, as in your v4, including all modals, forms, sections, hero, navigation, survey, and the footer */}
    </div>
  )
}
// ...previous code (imports, data, CTA, EmailLeadForm, FooterModal, etc.) above...

export default function AutomariWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [surveyData, setSurveyData] = useState<Record<string, any>>({})
  const [surveyStep, setSurveyStep] = useState(0)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveySubmitted, setSurveySubmitted] = useState(false)
  const [footerModal, setFooterModal] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Survey modal logic
  const currentQuestion = surveyQuestions[surveyStep]
  const isLastStep = surveyStep === surveyQuestions.length - 1
  const handleSurveyChange = (questionId: string, value: any) => {
    setSurveyData((prev) => ({ ...prev, [questionId]: value }))
  }

  // Optimist Section for the Q&A block
  const OptimistSection = () => (
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center"><Smile className="mr-2 h-5 w-5" />Optimist’s Perspective</h3>
      <ul className="text-slate-100 text-base mb-4 space-y-2">
        <li>
          <b>“What if this works for me?”</b><br />
          <span className="text-green-200">You could unlock time and profits you never thought possible. Most businesses see ROI within the first 30 days.</span>
        </li>
        <li>
          <b>“How fast can I get started?”</b><br />
          <span className="text-green-200">Our onboarding is fast, friendly, and human. Many clients are up and running in under a week.</span>
        </li>
        <li>
          <b>“Can I outpace my competitors?”</b><br />
          <span className="text-green-200">Absolutely. Early adopters of AI automation gain a lasting edge in customer service, speed, and innovation.</span>
        </li>
        <li>
          <b>“Will my employees like it?”</b><br />
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
        <div className="absolute inset-0 rounded-3xl border-4 border-gradient-to-r from-red-400 via-blue-400 to-slate-200 blur-md opacity-60 z-0 pointer-events-none" />
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

  // --- Page Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <motion.div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-blue-900/20 to-slate-800/20 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-400/5 rounded-full blur-2xl animate-float" />
        <svg className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" viewBox="0 0 1440 320" fill="none">
          <defs>
            <linearGradient id="footerGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#ef4444" stopOpacity="0.10"/>
            </linearGradient>
          </defs>
          <path fill="url(#footerGradient)" d="M0,320L48,293.3C96,267,192,213,288,197.3C384,181,480,203,576,202.7C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
        <motion.div className="absolute right-6 bottom-24 w-48 h-48 bg-gradient-to-tr from-blue-700 via-blue-300/40 to-transparent rounded-full blur-2xl opacity-50" animate={{scale:[1,1.08,0.98,1]}} transition={{duration: 8, repeat: Infinity}} />
        <motion.div className="absolute left-6 bottom-36 w-28 h-28 bg-gradient-to-tr from-red-400 via-red-200/30 to-transparent rounded-full blur-2xl opacity-40" animate={{scale:[1,0.95,1.05,1]}} transition={{duration: 10, repeat: Infinity}} />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="relative w-10 h-10">
                <Image src="/automari-logo.png" alt="Automari Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">
                Automari
              </span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              <motion.a href="sms:5612014365" className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors" whileHover={{ scale: 1.05 }}>
                <Phone className="h-4 w-4" /><span>Text: 561-201-4365</span>
              </motion.a>
              <motion.a href="mailto:contactautomari@gmail.com" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors" whileHover={{ scale: 1.05 }}>
                <Mail className="h-4 w-4" /><span>contactautomari@gmail.com</span>
              </motion.a>
            </div>
            <motion.button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.95 }}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div className="md:hidden backdrop-blur-md bg-slate-950/90 border-t border-slate-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              <div className="px-4 py-4 space-y-4">
                <motion.a href="sms:5612014365" className="flex items-center space-x-2 text-red-400" whileTap={{ scale: 0.95 }}>
                  <Phone className="h-4 w-4" /><span>Text: 561-201-4365</span>
                </motion.a>
                <motion.a href="mailto:contactautomari@gmail.com" className="flex items-center space-x-2 text-blue-400" whileTap={{ scale: 0.95 }}>
                  <Mail className="h-4 w-4" /><span>contactautomari@gmail.com</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/20 to-blue-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-2 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium">
                Powered by faith and diligence in Americas fastest growing industry, Automari Agency is of the most trusted.
              </span>
            </motion.div>
            <AnimatedLogo />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-100 via-red-200 to-blue-200 bg-clip-text text-transparent">
                Streamline Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-slate-300 to-blue-400 bg-clip-text text-transparent">
                Operations with AI
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your business with our specialized AI agents designed to automate, optimize, and revolutionize your operations across America.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                onClick={() => setShowSurvey(true)}
              >
                <Target className="mr-2 h-5 w-5" />
                Find Your Pain Points
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-400/30 bg-slate-800/20 backdrop-blur-sm hover:bg-slate-700/30 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                onClick={() => setFooterModal("learn-more")}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

```typescript name=app/page.tsx
      {/* AI Agents Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">
                Our AI Agents
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover our specialized AI agents, each designed to tackle specific business challenges and drive
              operational excellence across American enterprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent, index) => {
              const IconComponent = agent.icon
              const isExpanded = expandedCard === agent.id

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card
                    className={`relative overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 cursor-pointer group ${
                      isExpanded ? "scale-105 z-10" : ""
                    }`}
                    onClick={() => setExpandedCard(isExpanded ? null : agent.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${agent.color} bg-opacity-20 backdrop-blur-sm border border-slate-600/30`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">
                        {agent.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{agent.description}</p>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-slate-600/30 pt-4 mt-4"
                          >
                            <h4 className="text-sm font-semibold text-red-400 mb-3">Key Features:</h4>
                            <ul className="space-y-2">
                              {agent.features.map((feature, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                  className="flex items-center text-sm text-slate-300"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">
                Success Stories from South Florida
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how Mike and the Automari team have transformed local businesses across South Florida.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-400">{testimonial.business}</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">"{testimonial.review}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      "use client"

import { useState, useEffect, useRef } from "react"
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
  Globe,
  HelpCircle,
  FileText,
  Briefcase,
  Info,
  Lock,
  BookOpen,
  FileWarning,
  CheckCircle,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// ...DATA ARRAYS (aiAgents, testimonials, surveyQuestions) ARE THE SAME AS BEFORE...

// ---------- CTA Components ----------

function CTA() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg"
        asChild
      >
        <a href="sms:5612014365">
          <Phone className="inline-block mr-2 h-5 w-5" /> Text: 561-201-4365
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

// ---------- Email Lead Form ----------
function EmailLeadForm({ cta = "Send", placeholder = "Enter your email", message = "Get a free automation assessment or exclusive AI tips!" }: { cta?: string; placeholder?: string; message?: string }) {
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

// ---------- Footer Modal Content ----------

function FooterModal({ link, onClose }: { link: string, onClose: () => void }) {
  const modalContent: Record<string, JSX.Element> = {
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
    "success-stories": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center"><CheckCircle className="mr-2" />Success Stories</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li><b>Miami Beach Paint:</b> Cut response times from hours to minutes, boosting satisfaction 40%.</li>
          <li><b>Rodriguez Construction:</b> No more double bookings; project coordination now runs on autopilot.</li>
          <li><b>Boca Law Firm:</b> Email triage automation saves partners 10+ hours weekly.</li>
        </ul>
        <p className="text-slate-400">Real results, real people. Ask us for more case studies!</p>
        <CTA />
      </>
    ),
    "templates": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center"><BookOpen className="mr-2" />AI Automation Templates</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Customer Support Chatbot</li>
          <li>Appointment Scheduler</li>
          <li>Email Auto-Responder</li>
          <li>Invoice Generator</li>
        </ul>
        <p className="text-slate-400">We’ll personalize every template to your workflow, so it’s not “cookie cutter”.</p>
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
    // ...all other modal "content" keys as before...
    "learn-more": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2 flex items-center"><Info className="mr-2" />Learn More About Automari</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>See industry benchmarks and ROI stats.</li>
          <li>Get access to our white-glove onboarding.</li>
          <li>Ask about our ongoing human support.</li>
        </ul>
        <CTA />
      </>
    ),
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

// --- Interactive "Ask Me Anything" Box ---
function AskMeAnythingBox() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="fixed right-5 bottom-5 z-[100]">
      <motion.div
        className={`rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-red-600 hover:shadow-xl cursor-pointer flex items-center px-4 py-3 space-x-3 transition-all`}
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

// --- Social Media Icons for Footer ---
const SocialMediaIcons = () => (
  <div className="flex justify-center space-x-5 mt-5">
    <a href="#" target="_blank" aria-label="Instagram" className="hover:text-pink-400"><Instagram className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Facebook" className="hover:text-blue-400"><Facebook className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Twitter" className="hover:text-blue-300"><Twitter className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="TikTok" className="hover:text-black"><Tiktok className="h-6 w-6" /></a>
    <a href="#" target="_blank" aria-label="Indeed" className="hover:text-blue-600"><Briefcase className="h-6 w-6" /></a>
  </div>
)

// ...the rest of your main page rendering (see previous message for hero, agents, testimonials, Q&A, survey, contact, etc)...

// --- FINAL FOOTER ---

// -- Place this at the bottom of your return as the last section, right above </div> --
{AskMeAnythingBox()}
<footer className="relative border-t border-slate-700/50 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 to-slate-900 z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-blue-950/10" />
  <div className="relative max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      {/* Company Info */}
      <div className="text-center md:text-left">
        <motion.div
          className="flex items-center justify-center md:justify-start space-x-3 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-12 h-12">
            <Image src="/automari-logo.png" alt="Automari Logo" fill className="object-contain" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">
            Automari
          </span>
        </motion.div>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Powered by faith and diligence, Automari Agency is the trusted partner for AI-driven automation and operational excellence.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
      {/* Contact Info */}
      <div className="text-center">
        <h4 className="text-xl font-semibold text-white mb-6">Get in Touch</h4>
        <div className="space-y-4">
          <motion.a
            href="sms:5612014365"
            className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="h-5 w-5" />
            <span className="text-lg">Text: 561-201-4365</span>
          </motion.a>
          <motion.a
            href="mailto:contactautomari@gmail.com"
            className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="h-5 w-5" />
            <span className="text-lg">contactautomari@gmail.com</span>
          </motion.a>
          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <MapPin className="h-5 w-5" />
            <span>Serving South Florida</span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="text-center md:text-right">
        <h4 className="text-xl font-semibold text-white mb-6">Our Impact</h4>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-red-400">500+</div>
            <div className="text-slate-400">Hours Saved Weekly</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">50+</div>
            <div className="text-slate-400">Businesses Automated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-300">99%</div>
            <div className="text-slate-400">Client Satisfaction</div>
          </div>
        </div>
      </div>
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
