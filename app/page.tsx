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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

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

export default function AutomariWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [surveyData, setSurveyData] = useState<Record<string, any>>({})
  const [surveyStep, setSurveyStep] = useState(0)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveySubmitted, setSurveySubmitted] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  const handleSurveyChange = (questionId: string, value: any) => {
    setSurveyData((prev) => ({ ...prev, [questionId]: value }))
  }

  const currentQuestion = surveyQuestions[surveyStep]
  const isLastStep = surveyStep === surveyQuestions.length - 1

  // --- Hero Logo Animation Section ---
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

      {/* ... The rest of your site (Navigation, Hero, AI Agents, Testimonials, Survey Modal, Contact, etc.) ... */}

      {/* Footer */}
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
                  href="tel:561-201-4365"
                  className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-lg">561-201-4365</span>
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
          {/* All footer links are direct CTAs */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-slate-200">
            <div>
              <h5 className="font-semibold text-lg mb-3 text-blue-200">Solutions</h5>
              <ul className="space-y-2">
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">How-to Guides</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">Success Stories</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-blue-400 transition">Templates</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">Partner Directory</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-blue-400 transition">Idea Exchange</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3 text-red-200">Company</h5>
              <ul className="space-y-2">
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">About Us</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">Careers</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-red-400 transition">Contact</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">Press</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-red-400 transition">Terms & Conditions</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3 text-blue-200">Resources</h5>
              <ul className="space-y-2">
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-blue-400 transition">Automari Academy</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">Community</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-blue-400 transition">Help Center</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-blue-400 transition">Webinars</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-blue-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3 text-red-200">Legal & More</h5>
              <ul className="space-y-2">
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">Disclaimer</a></li>
                <li><a href="tel:561-201-4365" className="hover:text-red-400 transition">Bug Bounty</a></li>
                <li><a href="mailto:contactautomari@gmail.com" className="hover:text-red-400 transition">Ethics & Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center">
            <p className="text-slate-300 text-base mb-4">
              Empowering American businesses to thrive in the intelligent automation era.<br />
              Every link is a direct line to our team—call or email and get real answers, real fast.
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
      </footer>
    </div>
  )
}
