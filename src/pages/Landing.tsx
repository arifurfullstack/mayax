import { Link } from "react-router-dom";
import { MayaLogo } from "@/components/MayaLogo";

const tiers = [
  {
    name: "Basic",
    price: "$99",
    delay: "24h delay",
    color: "from-slate-500/20 to-slate-600/10",
    border: "border-slate-400/30",
    badge: "bg-slate-500/20 text-slate-300",
    features: ["Access to all leads (24h delay)", "Email delivery", "Wallet top-ups", "Basic filters"],
  },
  {
    name: "Pro",
    price: "$299",
    delay: "12h delay",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-400/40",
    badge: "bg-blue-500/20 text-blue-300",
    features: ["12h early access", "Email + Webhook delivery", "Advanced filters", "Auto-Pay rules"],
  },
  {
    name: "Elite",
    price: "$899",
    delay: "6h delay",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-400/40",
    badge: "bg-emerald-500/20 text-emerald-300",
    popular: true,
    features: ["6h early access", "Priority leads", "Auto-Pay automation", "Webhook + CRM sync"],
  },
  {
    name: "VIP",
    price: "$2,000",
    delay: "Instant",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-400/40",
    badge: "bg-amber-500/20 text-amber-300",
    features: ["Instant lead access", "First-pick advantage", "Dedicated support", "Full automation suite"],
  },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "AI-Scored Leads",
    desc: "Every lead gets a 0–100 AI quality score and A+/A/B/C grade — so you know exactly what you're buying.",
    color: "text-emerald-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Auto-Pay Rules",
    desc: "Set criteria once — grades, provinces, budget caps — and let the platform buy matching leads automatically.",
    color: "text-amber-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Webhook + Email Delivery",
    desc: "Leads are pushed directly to your CRM via webhook or email the moment you purchase.",
    color: "text-blue-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "PII-Safe Marketplace",
    desc: "Browse leads anonymously. Full contact details are only revealed after purchase.",
    color: "text-purple-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
      </svg>
    ),
    title: "Prepaid Wallet",
    desc: "Top up your wallet balance and spend only on leads you actually want — no monthly surprises.",
    color: "text-rose-400",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Tier-Based Early Access",
    desc: "Higher tiers get leads hours before competitors. VIP dealers see every lead the moment it drops.",
    color: "text-cyan-400",
  },
];

const stats = [
  { value: "2,400+", label: "Leads Listed Monthly" },
  { value: "98%", label: "Delivery Success Rate" },
  { value: "340+", label: "Approved Dealerships" },
  { value: "< 2min", label: "Avg. Purchase Time" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[hsl(220_45%_8%)] text-white overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-2xl bg-[hsl(220_45%_8%/0.85)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <MayaLogo variant="light" />
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-[hsl(150_45%_33%)] hover:bg-[hsl(150_45%_28%)] transition-all duration-200 shadow-lg shadow-emerald-900/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[hsl(150_45%_33%/0.08)] blur-[120px]" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(214_60%_54%/0.06)] blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] rounded-full bg-[hsl(42_52%_54%/0.05)] blur-[120px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(hsl(214 60% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(214 60% 60%) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Canada's #1 Car Buyer Lead Marketplace
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Connect With{" "}
              <span className="bg-gradient-to-r from-[hsl(150_45%_50%)] to-[hsl(214_60%_60%)] bg-clip-text text-transparent">
                Ready-to-Buy
              </span>{" "}
              Car Shoppers
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-xl">
              Lead Compass gives Canadian dealerships instant access to AI-scored, verified car-buyer leads. Browse the live marketplace, set automated purchase rules, and grow your lot — without the cold-call grind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[hsl(150_45%_33%)] hover:bg-[hsl(150_45%_28%)] font-bold text-base transition-all duration-200 shadow-xl shadow-emerald-900/40 hover:shadow-emerald-900/60 hover:-translate-y-0.5"
              >
                Apply for Access
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 font-semibold text-base transition-all duration-200"
              >
                Sign In to Dashboard
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              {["Supabase Secured", "Canadian Leads Only", "No Monthly Lock-In"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-white/40 text-xs">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Preview card stack */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Card 3 (back) */}
              <div className="absolute -top-3 -right-4 w-full rounded-2xl border border-white/8 bg-white/3 h-48 rotate-3" />
              {/* Card 2 (mid) */}
              <div className="absolute -top-1.5 -right-2 w-full rounded-2xl border border-white/10 bg-white/5 h-48 rotate-1" />
              {/* Card 1 (front) */}
              <div className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-white/40 mb-1">Lead #LC-2847</div>
                    <div className="font-bold text-xl">J.R.</div>
                    <div className="text-white/50 text-sm">Online Buyer · Toronto, ON</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold text-sm">A+</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Credit Score", value: "720–780" },
                    { label: "AI Score", value: "94 / 100" },
                    { label: "Income", value: "$85K/yr" },
                    { label: "Vehicle", value: "SUV Pref." },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-white/5 px-3 py-2">
                      <div className="text-white/40 text-xs mb-0.5">{item.label}</div>
                      <div className="font-semibold text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {["DL", "Pay", "Bank", "Pre-✓"].map((doc) => (
                    <span key={doc} className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-medium">{doc}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white/40 text-xs">Lead Price</div>
                  <div className="font-extrabold text-lg text-emerald-400">$24.00</div>
                </div>
                <button className="mt-3 w-full py-2.5 rounded-lg bg-[hsl(150_45%_33%)] hover:bg-[hsl(150_45%_28%)] font-semibold text-sm transition-colors">
                  Purchase Lead →
                </button>
              </div>

              {/* Live badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-[hsl(220_45%_14%)] border border-white/15 rounded-xl px-4 py-2.5 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/80">38 leads live now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/8 bg-white/3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-sm text-white/45">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Simple Process</div>
            <h2 className="text-4xl font-extrabold">How It Works</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">From signup to your first lead purchase in under 10 minutes.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            {[
              { step: "01", title: "Apply", desc: "Complete the 4-step dealership registration — business info, contact, CRM delivery setup." },
              { step: "02", title: "Get Approved", desc: "Admin reviews your application. Approvals typically happen within 24 hours." },
              { step: "03", title: "Browse Leads", desc: "Access the live marketplace, filter by credit, grade, province, and more." },
              { step: "04", title: "Purchase & Convert", desc: "Buy leads instantly. Full contact details delivered to your inbox or CRM." },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl border border-white/12 bg-white/5 flex items-center justify-center text-2xl font-extrabold text-white/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 relative bg-white/2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[hsl(214_60%_54%/0.05)] blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Platform Features</div>
            <h2 className="text-4xl font-extrabold">Everything You Need to Win More Deals</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              Built specifically for Canadian dealerships — with every tool to find, filter, and close quality leads.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 hover:border-white/15 p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(42_52%_54%/0.04)] blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Subscription Tiers</div>
            <h2 className="text-4xl font-extrabold">Early Access Is Everything</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              VIP dealers see leads the moment they drop. Every tier below waits longer. Choose your competitive edge.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border ${tier.border} bg-gradient-to-b ${tier.color} p-6 flex flex-col ${tier.popular ? "ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-900/20" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className={`self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${tier.badge}`}>
                  {tier.delay}
                </div>
                <div className="font-extrabold text-3xl mb-1">{tier.price}<span className="text-base font-normal text-white/40">/mo</span></div>
                <div className="font-bold text-lg mb-5">{tier.name}</div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`text-center py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${tier.popular ? "bg-[hsl(150_45%_33%)] hover:bg-[hsl(150_45%_28%)] text-white shadow-lg shadow-emerald-900/30" : "border border-white/15 hover:border-white/30 hover:bg-white/5"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">
            All plans include wallet-based prepaid top-ups. No contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-white/12 bg-gradient-to-br from-emerald-950/60 via-[hsl(220_45%_12%)] to-blue-950/40 p-14 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[hsl(150_45%_33%/0.15)] blur-[80px] rounded-full" />
            </div>
            <div className="relative">
              <h2 className="text-4xl font-extrabold mb-4">Ready to Find Your Next Customer?</h2>
              <p className="text-white/55 mb-8 text-lg">
                Join 340+ approved Canadian dealerships already purchasing AI-scored leads on Lead Compass.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[hsl(150_45%_33%)] hover:bg-[hsl(150_45%_28%)] font-bold text-base transition-all duration-200 shadow-xl shadow-emerald-900/40 hover:-translate-y-0.5"
                >
                  Apply for a Dealer Account
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 font-semibold text-base transition-all duration-200"
                >
                  Already a member? Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <MayaLogo variant="light" />
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Lead Compass. All rights reserved. Canadian Dealers Only.</p>
          <div className="flex gap-6 text-sm text-white/35">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
