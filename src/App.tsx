import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  X,
  Mail,
  CheckCircle2,
  Footprints,
  Zap,
  Target,
  TrendingUp,
  Trophy,
  Swords,
  ArrowUpRight,
  Menu,
  Loader2,
} from "lucide-react";
import logo from "./assets/logo.png";

/* ───────────────────── NAVBAR ───────────────────── */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="Cory Sandhagen MMA" className="h-8" />
            </a>
            <div className="hidden md:flex items-center gap-1">
              {["What You'll Learn", "Curriculum", "Instructor"].map((label) => (
                <button
                  key={label}
                  onClick={() =>
                    scrollTo(label.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-"))
                  }
                  className="px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)/.5)] rounded-sm transition-all"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("get-access")}
                className="ml-4 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(210_70%_40%)] text-white rounded-sm shadow-[0_0_30px_hsl(210_80%_50%_/_0.3)] hover:shadow-[0_0_40px_hsl(210_80%_50%_/_0.4)] transition-all flex items-center gap-1"
              >
                Get Free Access
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <button
              className="md:hidden p-2 rounded-sm hover:bg-[hsl(var(--secondary)/.5)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-20 md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {["What You'll Learn", "Curriculum", "Instructor"].map((label, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() =>
                    scrollTo(label.toLowerCase().replace(/[^a-z]/g, "-").replace(/-+/g, "-"))
                  }
                  className="font-display text-3xl text-left py-3 border-b border-border/30 hover:text-primary transition-colors"
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollTo("get-access")}
                className="mt-6 w-full py-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(210_70%_40%)] text-white font-semibold rounded-sm shadow-[0_0_30px_hsl(210_80%_50%_/_0.3)]"
              >
                Get Free Access
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ───────────────────── EMAIL FORM ───────────────────── */

const EmailForm = ({ variant = "hero" }: { variant?: "hero" | "section" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const FORM_ID = import.meta.env.VITE_KIT_FORM_ID || "YOUR_FORM_ID";
      const TAG_IDS = (import.meta.env.VITE_KIT_TAG_IDS || "")
        .split(",")
        .map((id: string) => id.trim())
        .filter(Boolean);

      const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: import.meta.env.VITE_KIT_API_KEY || "YOUR_API_KEY",
          email,
          ...(TAG_IDS.length > 0 && { tags: TAG_IDS }),
        }),
      });

      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 p-4 rounded-sm border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.05)] ${
          variant === "section" ? "max-w-md mx-auto" : ""
        }`}
      >
        <CheckCircle2 className="w-6 h-6 text-[hsl(var(--accent))] flex-shrink-0" />
        <div>
          <p className="font-semibold text-[hsl(var(--foreground))]">You're in!</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Check your inbox for instant access to Footwork Essentials.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={variant === "section" ? "max-w-md mx-auto" : ""}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[hsl(var(--secondary))] border border-border rounded-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="group px-6 py-3.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(210_70%_40%)] text-white font-semibold rounded-sm shadow-[0_0_30px_hsl(210_80%_50%_/_0.3)] hover:shadow-[0_0_50px_hsl(210_80%_50%_/_0.5)] transition-all duration-300 btn-shimmer clip-angular-small disabled:opacity-60 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Get Free Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">{errorMsg}</p>
      )}
      <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
        100% free. No credit card required. Unsubscribe anytime.
      </p>
    </form>
  );
};

/* ───────────────────── HERO ───────────────────── */

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoOpen) setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-3/5">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        </div>
        <div className="absolute inset-y-0 left-0 hidden lg:block lg:w-2/5 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="absolute inset-0 technical-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.3)_70%,hsl(var(--background))_100%)]" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase bg-[hsl(var(--primary)/.1)] text-primary border border-[hsl(var(--primary)/.3)] clip-angular-small">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Free Course — Instant Access
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.9] mb-6"
          >
            FOOTWORK
            <br />
            <span className="font-brush text-primary text-glow -rotate-2 inline-block">
              ESSENTIALS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-xl mb-8 leading-relaxed"
          >
            Master the movement fundamentals used at the highest level of MMA.
            Learn beginner to advanced footwork from UFC contender
            <span className="text-[hsl(var(--foreground))] font-medium"> Cory Sandhagen</span>.
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <EmailForm variant="hero" />
          </motion.div>

          {/* Preview button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <button
              className="group flex items-center gap-2 text-base font-medium text-[hsl(var(--foreground)/.8)] hover:text-accent transition-colors"
              onClick={() => setIsVideoOpen(true)}
            >
              <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[hsl(var(--accent)/.5)] bg-[hsl(var(--accent)/.1)] group-hover:bg-[hsl(var(--accent)/.2)] transition-colors">
                <span
                  className="absolute inset-0 rounded-full border border-[hsl(var(--accent)/.3)] animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <Play className="w-4 h-4 text-accent ml-0.5" />
              </span>
              Preview Course
            </button>
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              <span className="font-mono text-accent">1:48:11</span> of instruction
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Video modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setIsVideoOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-border/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[hsl(var(--accent)/.5)] pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[hsl(var(--accent)/.5)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[hsl(var(--accent)/.5)] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[hsl(var(--accent)/.5)] pointer-events-none" />
              <iframe
                src="https://player.hotmart.com/embed/VZoPMkpGRn?autoplay=1"
                title="Course Preview — Footwork Essentials"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm font-mono text-white/50 uppercase tracking-wider">
                Press ESC or click outside to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ───────────────────── OVERVIEW ───────────────────── */

const features = [
  {
    icon: Footprints,
    title: "Body Mechanics & Footwork",
    description:
      "Master the foundational body mechanics and movement patterns essential for effective footwork in fighting.",
    stat: "14:41",
  },
  {
    icon: Target,
    title: "Beginner Techniques",
    description:
      "Core techniques and drills to build a solid foundation — understanding the technical movements needed for good footwork.",
    stat: "28:49",
  },
  {
    icon: TrendingUp,
    title: "Intermediate Concepts",
    description:
      "Level up with more complex movement patterns and concepts that build on the beginner fundamentals.",
    stat: "30:19",
  },
  {
    icon: Zap,
    title: "Advanced Drills",
    description:
      "High-level drills and concepts for those with a strong understanding of the sport — refined movement at the elite level.",
    stat: "19:44",
  },
];

const Overview = () => (
  <section
    id="what-you-ll-learn"
    className="relative py-20 overflow-hidden section-divider noise-bg"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--background))]" />
    <div className="absolute inset-0 technical-grid-fine opacity-30" />

    <div className="relative max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-accent border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.05)]">
          <Footprints className="w-3 h-3" />
          What You'll Learn
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
          COMPLETE <span className="text-primary text-glow">FOOTWORK SYSTEM</span>
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          From basic mechanics to advanced movement — a progressive system covering
          every aspect of footwork for fighting.
        </p>
      </motion.div>

      {/* Course metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <div className="grid grid-cols-4 border border-border rounded-sm bg-card/50 overflow-hidden">
          {[
            { value: "7", label: "Modules" },
            { value: "1:48", label: "Hours" },
            { value: "∞", label: "Replays" },
            { value: "FREE", label: "Price", highlight: true },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`p-4 sm:p-5 text-center ${i < 3 ? "border-r border-border" : ""}`}
            >
              <div
                className={`font-mono text-2xl sm:text-3xl mb-1 ${
                  m.highlight ? "text-primary" : "text-accent"
                }`}
              >
                {m.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {features.map((f) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative p-6 border border-border rounded-sm bg-card hover:border-[hsl(var(--accent)/.5)] transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[hsl(var(--accent)/.4)] group-hover:border-accent transition-colors" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[hsl(var(--primary)/.4)] group-hover:border-primary transition-colors" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[hsl(var(--secondary))] border border-border rounded-sm group-hover:bg-[hsl(var(--primary)/.2)] group-hover:border-[hsl(var(--primary)/.5)] transition-all">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="px-2 py-1 bg-[hsl(var(--secondary))] rounded-sm">
                <span className="font-mono text-sm text-accent">{f.stat}</span>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl mb-2">{f.title}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────── CURRICULUM ───────────────────── */

const modules = [
  { title: "Introduction", duration: "1:30", lessons: 1 },
  { title: "Body Mechanics & Footwork", duration: "14:41", lessons: 1 },
  { title: "Beginner Techniques", duration: "28:49", lessons: 1 },
  { title: "Intermediate Concepts", duration: "30:19", lessons: 1 },
  { title: "Advanced Drills", duration: "19:44", lessons: 1 },
  { title: "Power & Speed Exercises", duration: "13:08", lessons: 1 },
  { title: "Recap", duration: "0:38", lessons: 1 },
];

const Curriculum = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <section id="curriculum" className="relative py-20 overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 technical-grid opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-primary border border-[hsl(var(--primary)/.3)] bg-[hsl(var(--primary)/.05)]">
            <Play className="w-3 h-3" />
            Full Curriculum
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
            COMPLETE <span className="text-primary text-glow">BREAKDOWN</span>
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            7 modules covering the full spectrum of footwork — from mechanics to advanced drills
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <div className="grid grid-cols-3 border border-border rounded-sm bg-card/50 overflow-hidden">
            <div className="p-4 text-center border-r border-border">
              <div className="font-mono text-2xl text-accent">7</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Modules
              </div>
            </div>
            <div className="p-4 text-center border-r border-border">
              <div className="font-mono text-2xl text-accent">108</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Minutes
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="font-mono text-2xl text-primary">FREE</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Price
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setOpenModule(openModule === i ? null : i)}
                className={`w-full border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${
                  openModule === i
                    ? "border-[hsl(var(--accent)/.5)] bg-card"
                    : "border-border bg-card hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-4 px-4 py-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center border rounded-sm font-mono text-sm transition-all ${
                      openModule === i
                        ? "bg-[hsl(var(--primary)/.2)] border-[hsl(var(--primary)/.5)] text-primary"
                        : "bg-[hsl(var(--secondary))] border-border text-accent"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-lg">{mod.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-[hsl(var(--muted-foreground))]">
                    <span>{mod.duration}</span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() =>
              document.getElementById("get-access")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--secondary))] border border-border rounded-sm text-sm font-medium hover:border-[hsl(var(--primary)/.5)] hover:bg-[hsl(var(--primary)/.1)] transition-all group"
          >
            Get Free Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────────────────── INSTRUCTOR ───────────────────── */

const Instructor = () => (
  <section id="instructor" className="relative py-20 overflow-hidden section-divider noise-bg">
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--background))]" />
    <div className="absolute inset-0 technical-grid-fine opacity-20" />

    <div className="relative max-w-6xl mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-accent border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.05)]">
            <Swords className="w-3 h-3" />
            Your Instructor
          </span>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-2">CORY</h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span className="font-brush text-primary text-glow -rotate-1 inline-block">
              SANDHAGEN
            </span>
          </h2>

          <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
            UFC Bantamweight contender and one of the most dynamic strikers in mixed martial arts.
            Known for his creative movement and unorthodox techniques that have earned him
            <span className="text-[hsl(var(--foreground))] font-medium"> 7 performance bonuses</span>.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 gap-3 mb-8"
        >
          {[
            { value: "18", label: "Pro Wins", Icon: Trophy },
            { value: "#4", label: "UFC Ranking", Icon: TrendingUp },
            { value: "UFC", label: "Bantamweight", Icon: Swords },
            { value: "10+", label: "Years Pro", Icon: Target },
          ].map((s) => (
            <div
              key={s.label}
              className="p-3 bg-[hsl(var(--secondary)/.5)] border border-border rounded-sm text-center"
            >
              <s.Icon className="w-4 h-4 text-accent mx-auto mb-2" />
              <div className="font-mono text-xl">{s.value}</div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ───────────────────── CTA / EMAIL CAPTURE ───────────────────── */

const CTASection = () => (
  <section id="get-access" className="relative py-20 overflow-hidden section-divider noise-bg">
    <div className="absolute inset-0 bg-background" />
    <div className="absolute inset-0 technical-grid opacity-15" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--primary)/.1)] rounded-full blur-[150px] pointer-events-none" />

    <div className="relative max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-primary border border-[hsl(var(--primary)/.3)] bg-[hsl(var(--primary)/.05)]">
          <Zap className="w-3 h-3" />
          100% Free
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
          START YOUR <span className="text-primary text-glow">TRAINING</span>
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Get instant, free access to the complete Footwork Essentials course.
          Enter your email below and start training today.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-lg mx-auto"
      >
        <div className="relative p-8 bg-card border border-[hsl(var(--primary)/.3)] rounded-sm shadow-[0_0_40px_hsl(210_80%_50%_/_0.15)] hud-corner">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(210_70%_40%)] text-white rounded-sm shadow-[0_0_30px_hsl(210_80%_50%_/_0.3)]">
              <Zap className="w-3 h-3" />
              Free Access
            </span>
          </div>

          <div className="text-center mb-8 pt-4">
            <h3 className="font-display text-2xl mb-4 text-[hsl(var(--muted-foreground))]">
              FOOTWORK ESSENTIALS
            </h3>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="font-mono text-5xl md:text-6xl text-primary text-glow line-through opacity-40">
                $149
              </span>
              <span className="font-mono text-5xl md:text-6xl text-accent text-glow-accent">
                FREE
              </span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              No credit card required
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              "7 comprehensive modules",
              "Beginner to advanced techniques",
              "1:48+ hours of HD video",
              "Power & speed exercises",
              "Lifetime access to all materials",
              "Mobile-friendly learning",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-[hsl(var(--secondary))]">
                  <CheckCircle2 className="w-3 h-3 text-accent" />
                </div>
                <span className="text-[hsl(var(--muted-foreground))]">{text}</span>
              </div>
            ))}
          </div>

          {/* Email form */}
          <EmailForm variant="section" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center text-sm text-[hsl(var(--muted-foreground))]"
      >
        Train with the same movement system Cory uses against the best fighters in the world.
        <span className="text-primary font-medium"> Start today — for free.</span>
      </motion.p>
    </div>
  </section>
);

/* ───────────────────── FOOTER ───────────────────── */

const Footer = () => (
  <footer className="relative py-12 bg-card border-t border-border overflow-hidden">
    <div className="absolute inset-0 technical-grid-fine opacity-10" />
    <div className="relative max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <img src={logo} alt="Cory Sandhagen MMA" className="h-10 mb-3 mx-auto md:mx-0" />
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Elite movement instruction from a UFC contender
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://corysandhagenmma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] hover:text-accent transition-colors"
          >
            Main Site
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="https://corysandhagenmma.com/p/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            Privacy
          </a>
          <a
            href="https://corysandhagenmma.com/p/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(var(--muted-foreground))]">
        <span>© {new Date().getFullYear()} Cory Sandhagen MMA. All rights reserved.</span>
        <span className="font-mono text-[hsl(var(--accent)/.6)]">FOOTWORK // ESSENTIALS</span>
      </div>
    </div>
  </footer>
);

/* ───────────────────── APP ───────────────────── */

function App() {
  return (
    <main className="font-body bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Overview />
      <Curriculum />
      <Instructor />
      <CTASection />
      <Footer />
    </main>
  );
}

export default App;
