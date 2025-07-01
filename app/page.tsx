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

// ---------- Informative CTA Components for Footer/Links ----------

const FooterLinkContent: Record<string, { title: string; content: JSX.Element }> = {
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

// Call-To-Action block to use everywhere
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

// ----------------- Modal for Footer/CTA Links -----------------

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

// ----------------- Lead Capture Email Form (for all forms) -----------------

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
      // This uses Formspree, which will forward to contactautomari@gmail.com
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

// ---------- Rest of your code (AI Agents, Testimonials, etc.) ----------
// (No changes needed in those sections except as noted below)

export default function AutomariWebsite() {
  // ...your existing state and logic...
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [surveyData, setSurveyData] = useState<Record<string, any>>({})
  const [surveyStep, setSurveyStep] = useState(0)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveySubmitted, setSurveySubmitted] = useState(false)
  const [footerModal, setFooterModal] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // ...EmailLeadForm, AnimatedLogo, CTA, and FooterModal functions are above...

  // --- Optimist section for the middle Q&A ---
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

  // --- Hero Logo Animation Section (as above) ---
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

  // --- The rest of your main return follows as usual, with the following changes:

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* ...Animated backgrounds as before... */}

      {/* ...Navigation, Hero, AI Agents, Testimonials, etc. as before... */}

      {/* --------- Enhanced Futuristic/Informative Middle Section --------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/70 to-red-900/80 rounded-3xl p-10 shadow-2xl border border-slate-700/40 backdrop-blur-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-slate-200 to-red-300 bg-clip-text text-transparent text-center">
            The Truth About AI Automation for Business
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-8 mt-8">
            {/* Industry Stats */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-200 mb-2 flex items-center"><BarChart3 className="mr-2 h-5 w-5" />Industry Stats</h3>
              <ul className="text-slate-100 text-base mb-4 space-y-2">
                <li>🌐 The AI automation market is projected to surpass <b>$1 trillion</b> by 2030.</li>
                <li>⚡ Businesses using AI automation see <b>up to 30% cost reduction</b> in operations.</li>
                <li>📈 85% of executives say AI will be a competitive advantage in the next 3 years.</li>
              </ul>
            </div>
            {/* Pessimist */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-200 mb-2 flex items-center"><ThumbsUp className="mr-2 h-5 w-5" />Pessimist’s Questions, Answered</h3>
              <ul className="text-slate-100 text-base mb-4 space-y-2">
                <li>
                  <b>“Is AI just hype?”</b><br/>
                  <span className="text-slate-400">No. AI is already saving American businesses billions by automating repetitive tasks. It’s not the future—it’s now.</span>
                </li>
                <li>
                  <b>“Will it replace jobs?”</b><br/>
                  <span className="text-slate-400">AI handles the boring work, letting real people focus on what matters. It creates new, higher-value roles.</span>
                </li>
                <li>
                  <b>“Is it only for tech giants?”</b><br/>
                  <span className="text-slate-400">No. Small & medium businesses are the biggest adopters—automation levels the playing field.</span>
                </li>
              </ul>
            </div>
            {/* Optimist */}
            <OptimistSection />
          </div>
          <div className="mt-8 text-center">
            <span className="text-slate-300">
              Even if you don’t choose Automari, you’ll leave with real knowledge on why automation is the new American advantage.
            </span>
          </div>
        </motion.div>
      </section>

      {/* --------- Survey Modal (no changes needed) ---------- */}

      {/* --------- Contact Section (add EmailLeadForm) --------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-red-950/20 to-blue-950/20">
        <div className="max-w-4xl mx-auto text-center">
          {/* ...existing text/buttons as before... */}
          <div className="mb-8">
            <EmailLeadForm
              cta="Get My Free Assessment"
              placeholder="Your best email"
              message="We will send you actionable automation recommendations — and we never spam."
            />
          </div>
          {/* ...rest of contact section... */}
        </div>
      </section>

      {/* --------- Enhanced Footer with Modal Links and EmailLeadForm --------- */}
      <footer className="relative border-t border-slate-700/50 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 to-slate-900 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-blue-950/10" />
        <div className="relative max-w-7xl mx-auto">
          {/* ...company info and quick stats as before... */}
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
                        {FooterLinkContent[link]?.title || link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Email Form at bottom for lead gen */}
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
