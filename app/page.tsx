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
  ThumbsUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// ---------- Data ----------

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

// ---------- Modal for Footer/CTA Links ----------

function FooterModal({ link, onClose }: { link: string, onClose: () => void }) {
  const content = {
    "how-to": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">How-to Guides</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li>Identify repetitive tasks that take up your team's valuable time.</li>
          <li>Choose the right Automari AI Agent for each workflow.</li>
          <li>Integrate our solutions with your existing tools — no coding needed.</li>
          <li>Train our AI with your company data for a personalized experience.</li>
          <li>Measure results, optimize, and scale!</li>
        </ul>
        <CTA />
      </>
    ),
    "success-stories": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Success Stories</h2>
        <ul className="list-disc pl-6 mb-4 text-slate-200">
          <li><b>Miami Beach Paint:</b> Slashed response times from hours to minutes and increased customer satisfaction by 40%.</li>
          <li><b>Rodriguez Construction:</b> Eliminated double bookings and streamlined project coordination.</li>
          <li><b>Local Law Firm:</b> Automated email triage, saving over 10 hours/week for their partners.</li>
        </ul>
        <CTA />
      </>
    ),
    "templates": (
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
    ),
    "partners": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Our Trusted Partners</h2>
        <p className="mb-4 text-slate-300">We collaborate with leading tech, finance, and logistics partners to deliver seamless automations for every industry.</p>
        <CTA />
      </>
    ),
    "exchange": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Idea Exchange</h2>
        <p className="mb-4 text-slate-300">Submit your pain points or discover ideas from other businesses. We turn your bottlenecks into breakthroughs!</p>
        <CTA />
      </>
    ),
    "about": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Who We Are</h2>
        <p className="mb-4 text-slate-300">Automari is an American agency at the forefront of the AI automation revolution. Combining faith, diligence, and innovation, we empower businesses to work smarter, not harder.</p>
        <CTA />
      </>
    ),
    "careers": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Join Our Mission</h2>
        <p className="mb-4 text-slate-300">We’re always looking for passionate, innovative minds to join our mission. If you love solving real-world problems and want to shape the future of work, let’s talk!</p>
        <CTA />
      </>
    ),
    "contact": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Get in Touch</h2>
        <p className="mb-4 text-slate-300">Questions? Ideas? Ready to automate? Reach out and let’s discuss your business goals.</p>
        <CTA />
      </>
    ),
    "press": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Automari in the News</h2>
        <p className="mb-4 text-slate-300">See how Automari is shaping the future of work and empowering American businesses.</p>
        <CTA />
      </>
    ),
    "terms": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Terms & Conditions</h2>
        <p className="mb-4 text-slate-300">We believe in transparency. Read our service terms and understand how we keep your data secure and your business compliant.</p>
        <CTA />
      </>
    ),
    "privacy": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Privacy Policy</h2>
        <p className="mb-4 text-slate-300">Your privacy matters. Automari is GDPR-compliant and committed to safeguarding your information.</p>
        <CTA />
      </>
    ),
    "academy": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Automari Academy</h2>
        <p className="mb-4 text-slate-300">Free resources, tutorials, and webinars to help you and your team become automation experts.</p>
        <CTA />
      </>
    ),
    "community": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Join Our Community</h2>
        <p className="mb-4 text-slate-300">Network with other business leaders, share ideas, and get support in our exclusive Automari Community.</p>
        <CTA />
      </>
    ),
    "help": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Help Center</h2>
        <p className="mb-4 text-slate-300">Get answers to common questions and find troubleshooting tips.</p>
        <CTA />
      </>
    ),
    "blog": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Blog</h2>
        <p className="mb-4 text-slate-300">Insights, case studies, and the latest news from the automation frontier.</p>
        <CTA />
      </>
    ),
    "webinars": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Webinars</h2>
        <p className="mb-4 text-slate-300">Join our free live events and learn from automation experts.</p>
        <CTA />
      </>
    ),
    "security": (
      <>
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Security at Automari</h2>
        <p className="mb-4 text-slate-300">We use the latest technologies to keep your data safe. Security is our top priority.</p>
        <CTA />
      </>
    ),
    "disclaimer": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Disclaimer</h2>
        <p className="mb-4 text-slate-300">Information on this site is for educational purposes. For personalized advice, contact us directly.</p>
        <CTA />
      </>
    ),
    "bounty": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Bug Bounty</h2>
        <p className="mb-4 text-slate-300">Help us keep Automari secure! Report any vulnerabilities and earn rewards.</p>
        <CTA />
      </>
    ),
    "ethics": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Ethics & Compliance</h2>
        <p className="mb-4 text-slate-300">We’re committed to ethical AI development and strict legal compliance. Learn more about our standards.</p>
        <CTA />
      </>
    ),
    "learn-more": (
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
    ),
  }
  if (!content[link]) return null
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
          <h3 className="text-xl font-bold text-blue-300">
            {link.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
          </h3>
          <button onClick={onClose}>
            <X className="h-7 w-7 text-slate-300 transition hover:text-red-400" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">{content[link]}</div>
      </motion.div>
    </motion.div>
  )
}

// ... EmailLeadForm, AnimatedLogo, OptimistSection unchanged from above ...

// ---------- Main ----------

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* ... animated backgrounds, navigation, hero, agents, testimonials, informative Q&A, contact section, etc... */}

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
          {/* Futuristic Footer Navigation */}
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
