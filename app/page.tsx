"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Phone, Mail, Menu, X, MessageSquare, Calendar, Calculator, Users, Package,
  TrendingUp, BarChart3, Share2, Shield, MapPin, Star, CheckCircle
} from "lucide-react"
import Image from "next/image"

// Simple reusable button
function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className={
        "rounded-full px-6 py-2 font-semibold shadow " +
        (props.className || "")
      }
    >
      {children}
    </button>
  )
}

// Simple reusable card
function Card({ children, ...props }: any) {
  return (
    <div
      {...props}
      className={
        "rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg " +
        (props.className || "")
      }
    >
      {children}
    </div>
  )
}

// Simple input
function Input({ ...props }: any) {
  return (
    <input
      {...props}
      className={
        "rounded px-4 py-2 border border-slate-600 bg-slate-900 text-white w-full " +
        (props.className || "")
      }
    />
  )
}

// ---------- Data ----------
// (Keep your original aiAgents, testimonials, surveyQuestions arrays with cutoffs fixed)
const aiAgents = [/* ... use your original array ... */]
const testimonials = [
  {
    name: "Terrance Hall",
    business: "Miami Beach Paint",
    location: "Miami, FL",
    rating: 5,
    review:
      "I met Mike on a job down in Miami. As kind and informative as he was, he noticed areas where my company could be more efficient. As a painter, he hooked me and my company up with a scheduler and honestly... Our response times and client satisfaction have never been better!",
    avatar: "SM",
  },
  {
    name: "Carlos Rodriguez",
    business: "Rodriguez Construction",
    location: "Fort Lauderdale, FL",
    rating: 5,
    review:
      "The scheduling automation agent has been a game-changer. We've eliminated double bookings (which happened far too much) and with the pain point survey, our project coordination is seamless. Invaluable!",
    avatar: "CR",
  },
  {
    name: "Jennifer Thompson",
    business: "Anonymous",
    location: "Boca Raton, FL",
    rating: 5,
    review:
      "We went with Automari's email management system and it handles almost 80% of our client inquiries automatically. Just as was represented to me during our discovery meeting, it's like having a 24/7 team member!",
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
      "I'm old fashioned and AI has been a bit intimidating for me; however, working with Automari has been transformative and they didn't make me feel like an outcast in this tech world. The AI assistant is a lifesaver!",
    avatar: "MG",
  },
]
// ... (surveyQuestions as in your code) ...

// ---------- Email Lead Form ----------
function EmailLeadForm({ cta, placeholder, message }: any) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        setSubmitted(true)
        setEmail("")
      }}
      className="flex flex-col sm:flex-row items-center gap-2"
    >
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        disabled={submitted}
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-red-600 text-white"
        disabled={submitted}
      >
        {submitted ? "Thank you!" : cta}
      </Button>
      {submitted && <span className="text-green-400 ml-3">{message || "We'll be in touch soon!"}</span>}
    </form>
  )
}

// ---------- CTA ----------
function CTA() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button
        className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 text-lg font-bold"
        as="a"
        href="sms:5612014365"
      >
        <Phone className="inline-block mr-2 h-5 w-5" /> Text: 561-201-4365
      </Button>
      <Button
        className="border border-blue-400 text-blue-300 mt-2"
        as="a"
        href="mailto:contactautomari@gmail.com"
      >
        <Mail className="inline-block mr-2 h-5 w-5" /> Email: contactautomari@gmail.com
      </Button>
    </div>
  )
}

// ---------- Modal for Footer/CTA Links ----------
function FooterModal({ link, onClose }: { link: string, onClose: () => void }) {
  // ...use your content object as in your code, but with cutoffs fixed...
  // For brevity, we show a simple stub here
  const content: Record<string, JSX.Element> = {
    "about": (
      <>
        <h2 className="text-2xl font-bold text-red-300 mb-2">Who We Are</h2>
        <p className="mb-4 text-slate-300">
          Automari is an American agency at the forefront of the AI automation revolution. Combining faith, diligence, and innovation, we empower businesses to work smarter.
        </p>
        <CTA />
      </>
    ),
    // ...add all other modal entries from your original code...
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

// ---------- Hero Section ----------
function Hero({ onSurveyOpen }: { onSurveyOpen: () => void }) {
  return (
    <section className="pt-24 pb-16 text-center relative z-10">
      <div className="mx-auto max-w-3xl">
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent mb-4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Automate Your Business. <br />Unlock Your Potential.
        </motion.h1>
        <motion.p
          className="text-xl text-slate-300 mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Automari delivers AI-powered automation for small businesses—save time, boost profits, and focus on what matters.
        </motion.p>
        <Button
          className="bg-gradient-to-r from-blue-600 to-red-600 text-white text-lg font-bold px-8 py-3 shadow-lg"
          onClick={onSurveyOpen}
        >
          Take the Pain Point Survey
        </Button>
      </div>
    </section>
  )
}

// ---------- AI Agents Grid ----------
function AgentsSection({ expandedCard, setExpandedCard }: any) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">AI Agents for Every Workflow</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiAgents.map((agent, i) => {
          const isExpanded = expandedCard === agent.id
          return (
            <motion.div
              key={agent.id}
              layout
              className={`cursor-pointer transition-all duration-300 ${isExpanded ? "col-span-1 sm:col-span-2 lg:col-span-1 z-10 shadow-2xl scale-105" : ""}`}
              onClick={() => setExpandedCard(isExpanded ? null : agent.id)}
            >
              <Card className={`bg-gradient-to-br ${agent.color} text-white`}>
                <div className="flex items-center mb-2">
                  <agent.icon className="h-7 w-7 mr-2" />
                  <span className="text-lg font-semibold">{agent.title}</span>
                </div>
                <p className="mb-2 text-slate-200">{agent.description}</p>
                <ul className="mb-2 text-sm space-y-1">
                  {agent.features.map((f: string) => (
                    <li key={f} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isExpanded && (
                  <div className="mt-3 text-slate-100">
                    <p>Contact us to see a live demo of this agent in action!</p>
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// ---------- Testimonials ----------
function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-red-950">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {testimonials.map((t, i) => (
          <Card key={i} className="max-w-xs flex flex-col items-center">
            <div className="bg-slate-700 rounded-full w-14 h-14 flex items-center justify-center mb-2 text-xl font-bold">{t.avatar}</div>
            <div className="flex items-center mb-1">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-300" />
              ))}
            </div>
            <p className="mb-2 text-slate-200">"{t.review}"</p>
            <div className="text-sm text-slate-400">{t.name} <span className="text-slate-500">| {t.business}</span></div>
            <div className="text-xs text-slate-500">{t.location}</div>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ---------- Survey Modal ----------
function SurveyModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<any>({})
  const [submitted, setSubmitted] = useState(false)
  const q = surveyQuestions[step]
  if (!open) return null
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-blue-800"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-300">Pain Point Survey</h2>
          <button onClick={onClose}>
            <X className="w-7 h-7 text-slate-300 hover:text-red-400" />
          </button>
        </div>
        {submitted ? (
          <div className="text-green-400 text-center">
            <CheckCircle className="mx-auto mb-3" />
            <p>Thank you! We'll review your responses and reach out soon.</p>
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault()
              if (step < surveyQuestions.length - 1) setStep(step + 1)
              else setSubmitted(true)
            }}
          >
            <label className="block font-semibold mb-1">{q.label}{q.required ? "*" : ""}</label>
            {q.type === "text" && (
              <Input
                type="text"
                required={q.required}
                placeholder={q.placeholder}
                value={data[q.id] || ""}
                onChange={e => setData({ ...data, [q.id]: e.target.value })}
              />
            )}
            {q.type === "select" && (
              <select
                className="w-full px-4 py-2 rounded bg-slate-900 border border-slate-600 text-white"
                required={q.required}
                value={data[q.id] || ""}
                onChange={e => setData({ ...data, [q.id]: e.target.value })}
              >
                <option value="">Select...</option>
                {q.options.map((o: string) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            )}
            {q.type === "checkbox" && (
              <div className="space-y-2">
                {q.options.map((o: string) => (
                  <label key={o} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={data[q.id]?.includes(o)}
                      onChange={e => {
                        const arr = data[q.id] || []
                        setData({
                          ...data,
                          [q.id]: e.target.checked
                            ? [...arr, o]
                            : arr.filter((x: string) => x !== o)
                        })
                      }}
                    />
                    {o}
                  </label>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <Button
                type="button"
                className="bg-slate-700 text-white"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-red-600 text-white"
              >
                {step === surveyQuestions.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

// ---------- Main Export ----------
export default function AutomariWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [footerModal, setFooterModal] = useState<string | null>(null)
  const [surveyOpen, setSurveyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-30 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 bg-opacity-90 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Image src="/automari-logo.png" alt="Automari Logo" width={40} height={40} className="object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">Automari</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#agents" className="hover:text-blue-300">Solutions</a>
            <a href="#testimonials" className="hover:text-blue-300">Testimonials</a>
            <a href="#contact" className="hover:text-blue-300">Contact</a>
            <Button className="bg-blue-700 text-white" onClick={() => setSurveyOpen(true)}>
              Survey
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-700 px-4 pb-4">
            <a href="#agents" className="block py-2 hover:text-blue-300">Solutions</a>
            <a href="#testimonials" className="block py-2 hover:text-blue-300">Testimonials</a>
            <a href="#contact" className="block py-2 hover:text-blue-300">Contact</a>
            <Button className="bg-blue-700 text-white mt-2 w-full" onClick={() => setSurveyOpen(true)}>
              Survey
            </Button>
          </div>
        )}
      </nav>

      <main className="pt-24">
        <Hero onSurveyOpen={() => setSurveyOpen(true)} />
        <div id="agents"><AgentsSection expandedCard={expandedCard} setExpandedCard={setExpandedCard} /></div>
        <div id="testimonials"><TestimonialsSection /></div>
        {/* Add more main sections (FAQ, contact, etc.) as needed */}
      </main>

      {/* Footer */}
      <footer id="contact" className="relative border-t border-slate-700/50 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 to-slate-900 z-10">
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

      <AnimatePresence>
        {surveyOpen && <SurveyModal open={surveyOpen} onClose={() => setSurveyOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
