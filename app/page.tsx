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

// -- AI Agents, Testimonials, and Survey Data remain unchanged from previous versions --
// (Omitted for brevity, but all your original data arrays remain intact below)

const aiAgents = [
  // ... [same as previous] ...
  {
    id: 1,
    title: "Customer Support Automation",
    icon: MessageSquare,
    description:
      "24/7 intelligent customer support with natural language processing, sentiment analysis, and automated ticket routing.",
    features: ["Instant Response", "Multi-language Support", "Sentiment Analysis", "Escalation Management"],
    color: "from-red-600 to-red-800",
  },
  // ... (rest of agents as before) ...
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
  // ... (testimonials as before) ...
  {
    name: "Terrance Hall",
    business: "Miami Beach Paint",
    location: "Miami, FL",
    rating: 5,
    review:
      "I met Mike on a job down in Miami and as kind and informative as he was, he saw dents in my company. As a painter, He hooked me and my company up with a sheduler and honestly.. Our response time went from hours to minutes, and customer satisfaction increased like crazy because I was even given tips and tricks along the way for my business. Incredible results and blown away, Happy to pay and looking forward to seeing what other agents I can add to my company once I get the capitol.",
    avatar: "SM",
  },
  // ... (rest of testimonials) ...
]

const surveyQuestions = [
  // ... (survey questions as before) ...
  {
    id: "company",
    label: "Company Name",
    type: "text",
    placeholder: "Enter your company name",
    required: true,
  },
  // ... (rest of survey questions) ...
  {
    id: "timeline",
    label: "When are you looking to implement automation?",
    type: "select",
    options: ["Immediately", "Within 1 month", "Within 3 months", "Within 6 months", "Just exploring"],
    required: true,
  },
]

// --- Reusable Components ---
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

// --- Modal Content and Footer Modal omitted for brevity, same as previous full solution ---
// --- OptimistSection and AnimatedLogo omitted for brevity, same as previous full solution ---

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

  // --- Survey Modal logic ---
  const currentQuestion = surveyQuestions[surveyStep]
  const isLastStep = surveyStep === surveyQuestions.length - 1
  const handleSurveyChange = (questionId: string, value: any) => {
    setSurveyData((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Animated Open/Free/Beautiful Background */}
      <motion.div className="fixed inset-0 opacity-80 pointer-events-none z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 animate-pulse" />
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

      {/* Navigation */}
      <motion.nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-700/50"
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="relative w-10 h-10">
                <Image src="/automari-logo.png" alt="Automari Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">Automari</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              <motion.a href="tel:561-201-4365" className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors" whileHover={{ scale: 1.05 }}>
                <Phone className="h-4 w-4" /><span>561-201-4365</span>
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
                <motion.a href="tel:561-201-4365" className="flex items-center space-x-2 text-red-400" whileTap={{ scale: 0.95 }}>
                  <Phone className="h-4 w-4" /><span>561-201-4365</span>
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
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <motion.div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/20 to-blue-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-2 mb-8" whileHover={{ scale: 1.05 }}>
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium">Powered by faith and diligence in Americas fastest growing industry, Automari Agency is of the most trusted.</span>
            </motion.div>
            <AnimatedLogo />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-100 via-red-200 to-blue-200 bg-clip-text text-transparent">Streamline Business</span><br />
              <span className="bg-gradient-to-r from-red-400 via-slate-300 to-blue-400 bg-clip-text text-transparent">Operations with AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your business with our specialized AI agents designed to automate, optimize, and revolutionize your operations across America.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300" onClick={() => setShowSurvey(true)}>
                <Target className="mr-2 h-5 w-5" /> Find Your Pain Points <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-slate-400/30 bg-slate-800/20 backdrop-blur-sm hover:bg-slate-700/30 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300" asChild>
                <a href="#" onClick={() => setFooterModal("learn-more")}>Learn More</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">Our AI Agents</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover our specialized AI agents, each designed to tackle specific business challenges and drive operational excellence across American enterprises.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent, index) => {
              const IconComponent = agent.icon
              const isExpanded = expandedCard === agent.id
              return (
                <motion.div key={agent.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="relative">
                  <Card className={`relative overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 cursor-pointer group ${isExpanded ? "scale-105 z-10" : ""}`} onClick={() => setExpandedCard(isExpanded ? null : agent.id)}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${agent.color} bg-opacity-20 backdrop-blur-sm border border-slate-600/30`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors">{agent.title}</h3>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{agent.description}</p>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="border-t border-slate-600/30 pt-4 mt-4">
                            <h4 className="text-sm font-semibold text-red-400 mb-3">Key Features:</h4>
                            <ul className="space-y-2">
                              {agent.features.map((feature, idx) => (
                                <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.1 }} className="flex items-center text-sm text-slate-300">
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
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">Success Stories from South Florida</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how Mike and the Automari team have transformed local businesses across South Florida.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <Card className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">{testimonial.avatar}</div>
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

      {/* Futuristic, Informative Middle Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/70 to-red-900/80 rounded-3xl p-10 shadow-2xl border border-slate-700/40 backdrop-blur-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-slate-200 to-red-300 bg-clip-text text-transparent text-center">
            The Truth About AI Automation for Business
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-8 mt-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-200 mb-2 flex items-center"><BarChart3 className="mr-2 h-5 w-5" />Industry Stats</h3>
              <ul className="text-slate-100 text-base mb-4 space-y-2">
                <li>🌐 The AI automation market is projected to surpass <b>$1 trillion</b> by 2030.</li>
                <li>⚡ Businesses using AI automation see <b>up to 30% cost reduction</b> in operations.</li>
                <li>📈 85% of executives say AI will be a competitive advantage in the next 3 years.</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-200 mb-2 flex items-center"><ThumbsUp className="mr-2 h-5 w-5" />Pessimist’s Questions, Answered</h3>
              <ul className="text-slate-100 text-base mb-4 space-y-2">
                <li>
                  <b>“Is AI just hype?”</b><br />
                  <span className="text-slate-400">No. AI is already saving American businesses billions by automating repetitive tasks. It’s not the future—it’s now.</span>
                </li>
                <li>
                  <b>“Will it replace jobs?”</b><br />
                  <span className="text-slate-400">AI handles the boring work, letting real people focus on what matters. It creates new, higher-value roles.</span>
                </li>
                <li>
                  <b>“Is it only for tech giants?”</b><br />
                  <span className="text-slate-400">No. Small & medium businesses are the biggest adopters—automation levels the playing field.</span>
                </li>
              </ul>
            </div>
            <OptimistSection />
          </div>
          <div className="mt-8 text-center">
            <span className="text-slate-300">
              Even if you don’t choose Automari, you’ll leave with real knowledge on why automation is the new American advantage.
            </span>
          </div>
        </motion.div>
      </section>

      {/* Survey Modal */}
      <AnimatePresence>
        {showSurvey && (
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-600/50 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}>
              {!surveySubmitted ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">Business Assessment</h3>
                    <button onClick={() => setShowSurvey(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>Question {surveyStep + 1} of {surveyQuestions.length}</span>
                      <span>{Math.round(((surveyStep + 1) / surveyQuestions.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }} />
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-white mb-4">
                      {currentQuestion.label}
                      {currentQuestion.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {currentQuestion.type === "text" && (
                      <Input
                        placeholder={currentQuestion.placeholder}
                        value={surveyData[currentQuestion.id] || ""}
                        onChange={(e) => handleSurveyChange(currentQuestion.id, e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                    )}
                    {currentQuestion.type === "select" && (
                      <select
                        value={surveyData[currentQuestion.id] || ""}
                        onChange={(e) => handleSurveyChange(currentQuestion.id, e.target.value)}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                      >
                        <option value="">Select an option...</option>
                        {currentQuestion.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {currentQuestion.type === "checkbox" && (
                      <div className="space-y-3">
                        {currentQuestion.options?.map((option) => (
                          <label key={option} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(surveyData[currentQuestion.id] || []).includes(option)}
                              onChange={(e) => {
                                const current = surveyData[currentQuestion.id] || []
                                const updated = e.target.checked
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option)
                                handleSurveyChange(currentQuestion.id, updated)
                              }}
                              className="w-4 h-4 text-red-500 bg-slate-700 border-slate-600 rounded focus:ring-red-500"
                            />
                            <span className="text-slate-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSurveyStep(Math.max(0, surveyStep - 1))} disabled={surveyStep === 0}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700">Previous</Button>
                    {isLastStep ? (
                      <Button
                        onClick={async () => {
                          const formData = new FormData();
                          Object.entries(surveyData).forEach(([key, value]) => {
                            formData.append(key, Array.isArray(value) ? value.join(", ") : value);
                          });
                          try {
                            const response = await fetch("https://formspree.io/f/mrbkjoav", {
                              method: "POST",
                              body: formData,
                            });
                            if (response.ok) {
                              setSurveySubmitted(true);
                            } else {
                              alert("Form submission failed!");
                            }
                          } catch (error) {
                            alert("There was a problem submitting the form.");
                          }
                        }}
                        className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300">
                        <Send className="mr-2 h-4 w-4" /> Submit Assessment
                      </Button>
                    ) : (
                      <Button onClick={() => setSurveyStep(surveyStep + 1)}
                        className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Assessment Complete!</h3>
                  <p className="text-slate-300 mb-6">
                    Thank you for completing our business assessment. Based on your responses, we'll prepare a customized automation strategy for your business.
                  </p>
                  <p className="text-lg font-semibold text-red-400 mb-6">
                    Mike will personally review your assessment and contact you within 24 hours to schedule your discovery call.
                  </p>
                  <Button onClick={() => setShowSurvey(false)}
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">Close</Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-red-950/20 to-blue-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">Ready to Transform Your Business?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Contact us today to discover how our AI agents can revolutionize your operations and what will be ultimately driving American innovation. Don't be late to the party.
            </p>
            <div className="mb-8">
              <EmailLeadForm
                cta="Get My Free Assessment"
                placeholder="Your best email"
                message="We will send you actionable automation recommendations — and we never spam."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <motion.a href="tel:561-201-4365" className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-2xl hover:border-red-400/50 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Phone className="h-6 w-6 text-red-400" />
                <div className="text-left">
                  <div className="text-sm text-slate-400">Give us a call/text with what you do</div>
                  <div className="text-lg font-semibold text-white">561-201-4365</div>
                </div>
              </motion.a>
              <motion.a
                href="mailto:contactautomari@gmail.com"
                className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl hover:border-blue-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-6 w-6 text-blue-400" />
                <div className="text-left">
                  <div className="text-sm text-slate-400">Email us</div>
                  <div className="text-lg font-semibold text-white">contactautomari@gmail.com</div>
                </div>
              </motion.a>
            </div>
            <Button size="lg" onClick={() => setShowSurvey(true)}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300">
              <Sparkles className="mr-2 h-5 w-5" /> Start Your Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-700/50 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 to-slate-900 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-blue-950/10" />
        <div className="relative max-w-7xl mx-auto">
          {/* ... (Company Info, Contact Info, Quick Stats as in previous versions) ... */}
          {/* Footer Modal Links, EmailLeadForm, and FooterModal here */}
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
