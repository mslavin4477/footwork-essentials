import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  Timer,
  X,
  Target,
  Shield,
  Zap,
  Crosshair,
  TrendingUp,
  Brain,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  ChevronDown,
  Trophy,
  Swords,
  Quote,
  Check,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
  Menu,
} from "lucide-react";

// ── Asset imports ──
import heroVideo from "./assets/striking/hero-video-v2.mp4";
import heroPoster from "./assets/striking/hero-poster.jpg";
import featureDefense from "./assets/striking/feature-defense.mp4";
import featureStriking from "./assets/striking/feature-striking.mp4";
import featureCounter from "./assets/striking/feature-counter.mp4";
import featureMovement from "./assets/striking/feature-movement.mp4";
import instructorImage from "./assets/striking/cory-transparent.png";
import logo from "./assets/striking/logo.png";

/* ═══════════════════════════════════════════════
   SCOPED CSS VARIABLES
   The striking page uses a red/orange palette
   that differs from the footwork blue theme.
   We apply them via a wrapper div with inline style.
   ═══════════════════════════════════════════════ */

const strikingVars: React.CSSProperties & Record<string, string> = {
  "--s-background": "220 15% 4%",
  "--s-foreground": "0 0% 96%",
  "--s-card": "220 15% 7%",
  "--s-primary": "0 72% 51%",
  "--s-primary-foreground": "0 0% 100%",
  "--s-secondary": "220 15% 12%",
  "--s-muted": "220 10% 18%",
  "--s-muted-foreground": "220 10% 55%",
  "--s-accent": "25 95% 55%",
  "--s-accent-foreground": "220 15% 4%",
  "--s-border": "220 15% 15%",
} as any;

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */

const navLinks = [
  { label: "Overview", href: "#s-overview" },
  { label: "Curriculum", href: "#s-curriculum" },
  { label: "Instructor", href: "#s-instructor" },
  { label: "Pricing", href: "#s-pricing" },
];

const StrikingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
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
            ? "bg-[hsl(220_15%_4%/.95)] backdrop-blur-md border-b border-[hsl(220_15%_15%/.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="Cory Sandhagen MMA" className="h-8" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm font-medium text-[hsl(220_10%_55%)] hover:text-[hsl(0_0%_96%)] hover:bg-[hsl(220_15%_12%/.5)] rounded-sm transition-all"
                >
                  {link.label}
                </button>
              ))}
              <button
                className="ml-4 px-4 py-2 text-sm font-semibold bg-gradient-to-br from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)] hover:shadow-[0_0_30px_hsl(0_72%_51%_/_0.4)] transition-all flex items-center gap-1"
                onClick={() => scrollToSection("#s-pricing")}
              >
                Enroll Now
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-sm hover:bg-[hsl(220_15%_12%/.5)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[hsl(220_15%_4%/.98)] backdrop-blur-lg pt-20 md:hidden"
          >
            <div className="px-6 py-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className="font-display text-3xl text-left py-3 border-b border-[hsl(220_15%_15%/.3)] hover:text-[hsl(0_72%_51%)] hover:border-[hsl(0_72%_51%/.5)] transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    className="w-full mt-6 py-4 bg-gradient-to-br from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white font-semibold rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)]"
                    onClick={() => scrollToSection("#s-pricing")}
                  >
                    Enroll Now — $249
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */

const StrikingHero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoOpen) setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Split Background - Video on Right */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-3/5">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroPoster}
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_15%_4%)] via-[hsl(220_15%_4%/.4)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_15%_4%/.5)] via-transparent to-[hsl(220_15%_4%/.3)]" />
        </div>

        <div className="absolute inset-y-0 left-0 hidden lg:block lg:w-2/5 bg-[hsl(220_15%_4%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_15%_4%)] via-[hsl(220_15%_4%/.7)] to-[hsl(220_15%_4%/.3)] lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[hsl(220_15%_4%)] via-transparent to-transparent" />
        <div className="absolute inset-0 technical-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(220_15%_4%/.3)_70%,hsl(220_15%_4%)_100%)]" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase bg-[hsl(0_72%_51%/.1)] text-[hsl(0_72%_51%)] border border-[hsl(0_72%_51%/.3)] clip-angular-small">
              <span className="w-1.5 h-1.5 bg-[hsl(0_72%_51%)] rounded-full" />
              Generation II — Now Available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.9] mb-6"
          >
            THE ESSENTIALS
            <br />
            <span className="text-[hsl(0_72%_51%)]">OF </span>
            <span
              className="font-brush text-[hsl(0_72%_51%)] -rotate-2 inline-block"
              style={{ textShadow: "0 0 20px hsl(0 72% 51% / 0.5)" }}
            >
              STRIKING
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[hsl(220_10%_55%)] max-w-xl mb-8 leading-relaxed"
          >
            Master the exact striking system used at the highest level of MMA.
            Learn devastating punches, kicks, elbows, and knees from UFC contender
            <span className="text-[hsl(0_0%_96%)] font-medium"> Cory Sandhagen</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button
              className="group relative bg-gradient-to-br from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white font-semibold text-lg px-8 py-4 rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)] hover:shadow-[0_0_60px_hsl(0_72%_51%_/_0.5)] transition-all duration-300 clip-angular-small"
              onClick={() => scrollToSection("s-pricing")}
            >
              <span className="flex items-center gap-2">
                Start Training — $249
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              className="group flex items-center gap-2 text-lg font-medium text-[hsl(0_0%_96%/.8)] hover:text-[hsl(25_95%_55%)] transition-colors"
              onClick={() => setIsVideoOpen(true)}
            >
              <span className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[hsl(25_95%_55%/.5)] bg-[hsl(25_95%_55%/.1)] group-hover:bg-[hsl(25_95%_55%/.2)] transition-colors">
                <span
                  className="absolute inset-0 rounded-full border border-[hsl(25_95%_55%/.3)] animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <Play className="w-4 h-4 text-[hsl(25_95%_55%)] ml-0.5" />
              </span>
              Preview Course
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 text-sm text-[hsl(220_10%_55%)]"
          >
            <span className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              Instant access
            </span>
            <span className="text-[hsl(220_15%_15%)]">&bull;</span>
            <span>30-day guarantee</span>
            <span className="text-[hsl(220_15%_15%)]">&bull;</span>
            <span>Lifetime updates</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220_15%_4%)] to-transparent pointer-events-none z-10" />

      {/* Video Preview Modal */}
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
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-[hsl(220_15%_15%/.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[hsl(25_95%_55%/.5)] pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[hsl(25_95%_55%/.5)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[hsl(25_95%_55%/.5)] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[hsl(25_95%_55%/.5)] pointer-events-none" />
              <iframe
                src="https://player.hotmart.com/embed/4RzPMom5LV?autoplay=1"
                title="Course Preview - The Essentials of Striking"
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

/* ═══════════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════════ */

const courseMetrics = [
  { value: "30+", label: "Techniques" },
  { value: "8", label: "Modules" },
  { value: "\u221E", label: "Replays" },
  { value: "UFC", label: "Level", highlight: true },
];

const skillCoverage = [
  { name: "Defensive Essentials", duration: "71:04", percent: 85 },
  { name: "Essential Attacks", duration: "59:15", percent: 72 },
  { name: "Counter Techniques", duration: "50:16", percent: 60 },
];

const overviewFeatures = [
  {
    icon: Shield,
    title: "Defensive Systems",
    description:
      "71+ minutes of defensive fundamentals \u2014 blocks, slips, parries, and distance management.",
    stat: "71:04",
    statLabel: "Runtime",
    video: featureDefense,
  },
  {
    icon: Target,
    title: "Precision Striking",
    description:
      "Master optimal form for punches, kicks, elbows, and knees with maximum impact.",
    stat: "59:15",
    statLabel: "Runtime",
    video: featureStriking,
  },
  {
    icon: Zap,
    title: "Counter Attacks",
    description:
      "Turn defense into devastating offense with elite-level counter-striking techniques.",
    stat: "50:16",
    statLabel: "Runtime",
    video: featureCounter,
  },
  {
    icon: Crosshair,
    title: "Movement Mastery",
    description:
      "Angle creation, in-and-out patterns, lateral movement, and feints that deceive.",
    stat: "30:12",
    statLabel: "Runtime",
    video: featureMovement,
  },
];

const StrikingOverview = () => (
  <section
    id="s-overview"
    className="relative py-20 overflow-hidden section-divider noise-bg"
  >
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_15%_8%)] to-[hsl(220_15%_5%)]" />
    <div className="absolute inset-0 technical-grid-fine opacity-30" />

    <div className="relative max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-[hsl(25_95%_55%)] border border-[hsl(25_95%_55%/.3)] bg-[hsl(25_95%_55%/.05)]">
          <Brain className="w-3 h-3" />
          System Overview
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
          COMPLETE <span className="text-[hsl(0_72%_51%)]">STRIKING SYSTEM</span>
        </h2>
        <p className="text-lg text-[hsl(220_10%_55%)] max-w-2xl mx-auto">
          A methodical breakdown of every technique, drilled and refined at the highest level of
          competition.
        </p>
      </motion.div>

      {/* Course Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <div className="grid grid-cols-4 border border-[hsl(220_15%_15%)] rounded-sm bg-[hsl(220_15%_7%/.5)] overflow-hidden">
          {courseMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`p-4 sm:p-5 text-center ${
                index < 3 ? "border-r border-[hsl(220_15%_15%)]" : ""
              }`}
            >
              <div
                className={`font-mono text-2xl sm:text-3xl mb-1 ${
                  metric.highlight ? "text-[hsl(0_72%_51%)]" : "text-[hsl(25_95%_55%)]"
                }`}
              >
                {metric.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[hsl(220_10%_55%)] uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid - landscape video cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-16 max-w-5xl mx-auto">
        {overviewFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-video border border-[hsl(220_15%_15%)] rounded-sm hover:border-[hsl(25_95%_55%/.5)] transition-all duration-300 overflow-hidden"
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                >
                  <source src={feature.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_15%_4%/.9)] via-[hsl(220_15%_4%/.4)] to-transparent" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[hsl(25_95%_55%/.4)] group-hover:border-[hsl(25_95%_55%)] transition-colors z-10" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[hsl(0_72%_51%/.4)] group-hover:border-[hsl(0_72%_51%)] transition-colors z-10" />

              {/* Content - positioned at bottom */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6">
                {/* Icon badge - top right */}
                <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[hsl(220_15%_12%/.8)] backdrop-blur border border-[hsl(220_15%_15%)] rounded-sm group-hover:bg-[hsl(0_72%_51%/.2)] group-hover:border-[hsl(0_72%_51%/.5)] transition-all">
                  <Icon className="w-5 h-5 text-[hsl(0_72%_51%)]" />
                </div>

                {/* Runtime badge - top left */}
                <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur rounded-sm">
                  <div className="font-mono text-sm text-[hsl(25_95%_55%)]">{feature.stat}</div>
                </div>

                {/* Title and description */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl mb-2">{feature.title}</h3>
                  <p className="text-sm text-[hsl(220_10%_55%)] leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skill Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <div className="p-5 border border-[hsl(220_15%_15%)] rounded-sm bg-[hsl(220_15%_7%/.5)]">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-xs font-mono text-[hsl(25_95%_55%)] uppercase tracking-wider">
              <Award className="w-3 h-3" />
              Skill Coverage
            </span>
            <span className="text-xs font-mono text-[hsl(220_10%_55%)]">180+ min total</span>
          </div>

          <div className="space-y-3">
            {skillCoverage.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="font-mono text-[hsl(25_95%_55%)]">{skill.duration}</span>
                </div>
                <div className="h-1.5 bg-[hsl(220_15%_12%)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(25_95%_55%)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Transformation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative p-6 sm:p-8 bg-[hsl(0_72%_51%)] rounded-sm overflow-hidden max-w-5xl mx-auto"
      >
        <div className="absolute inset-0 technical-grid opacity-10" />

        <div className="relative grid sm:grid-cols-3 gap-6 items-center">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-white/70" />
              <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Transformation
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mb-3 text-white">
              FROM FUNDAMENTALS TO{" "}
              <span className="text-[hsl(25_95%_55%)]">FIGHT-READY</span>
            </h3>
            <p className="text-white/80 leading-relaxed mb-4 text-sm sm:text-base">
              Each lesson builds progressively — you're not just learning techniques, you're
              <span className="text-white font-medium"> building a complete system</span>.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-[10px] sm:text-xs font-mono bg-white/10 border border-white/20 rounded-sm text-white/90">
                Beginner &rarr; Advanced
              </span>
              <span className="px-2 py-1 text-[10px] sm:text-xs font-mono bg-white/10 border border-white/20 rounded-sm text-white/90">
                HD Video
              </span>
              <span className="px-2 py-1 text-[10px] sm:text-xs font-mono bg-white/10 border border-white/20 rounded-sm text-white/90">
                Mobile-Ready
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-block p-4 sm:p-5 bg-white/10 border border-white/20 rounded-sm">
              <div className="font-mono text-4xl sm:text-5xl text-white mb-1">5+</div>
              <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wide">
                Hours of
                <br />
                Elite Training
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   CURRICULUM
   ═══════════════════════════════════════════════ */

const modules = [
  {
    title: "Introduction",
    duration: "3:13",
    lessons: ["Welcome to The Essentials of Striking: Generation II"],
  },
  {
    title: "Defensive Essentials",
    duration: "71:04",
    lessons: [
      "Fundamental defensive stance and positioning",
      "Head movement and slip techniques",
      "Parrying and blocking fundamentals",
      "Distance management and footwork",
      "Defensive combinations and drills",
    ],
  },
  {
    title: "Essential Attacks",
    duration: "59:15",
    lessons: [
      "Jab and cross fundamentals",
      "Hooks and uppercuts mastery",
      "Kick techniques: roundhouse, front, side",
      "Elbow and knee strikes",
      "Combination building and flow",
    ],
  },
  {
    title: "Counter Essentials",
    duration: "50:16",
    lessons: [
      "Counter-punching principles",
      "Reading and reacting to opponents",
      "Timing and distance for counters",
      "Counter kick setups",
      "Defensive to offensive transitions",
    ],
  },
  {
    title: "Crashes",
    duration: "25:21",
    lessons: [
      "Closing distance effectively",
      "Crash entries and exits",
      "Pressure fighting techniques",
    ],
  },
  {
    title: "Attacking with Movement",
    duration: "30:12",
    lessons: [
      "Angle creation and cutting",
      "In-and-out movement patterns",
      "Lateral movement attacks",
      "Feints and level changes",
    ],
  },
  {
    title: "Switching Stances",
    duration: "19:56",
    lessons: [
      "Stance switching fundamentals",
      "Power generation from switches",
      "Deceptive stance changes",
    ],
  },
  {
    title: "Essentials in the Clinch",
    duration: "34:03",
    lessons: [
      "Clinch entries and control",
      "Dirty boxing techniques",
      "Knee strikes in clinch",
      "Breaking and resetting from clinch",
    ],
  },
  {
    title: "Summary and Review",
    duration: "3:42",
    lessons: ["Course summary and next steps"],
  },
];

const StrikingCurriculum = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const totalMinutes = modules.reduce((acc, module) => {
    const [min, sec] = module.duration.split(":").map(Number);
    return acc + min + sec / 60;
  }, 0);

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <section id="s-curriculum" className="relative py-20 overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-[hsl(220_15%_4%)]" />
      <div className="absolute inset-0 technical-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-[hsl(0_72%_51%)] border border-[hsl(0_72%_51%/.3)] bg-[hsl(0_72%_51%/.05)]">
            <PlayCircle className="w-3 h-3" />
            Full Curriculum
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
            COMPLETE <span className="text-[hsl(0_72%_51%)]">BREAKDOWN</span>
          </h2>
          <p className="text-lg text-[hsl(220_10%_55%)] max-w-2xl mx-auto">
            {modules.length} modules &bull; {totalLessons} lessons &bull;{" "}
            {Math.floor(totalMinutes / 60)}+ hours of expert instruction
          </p>
        </motion.div>

        {/* Curriculum Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <div className="grid grid-cols-3 border border-[hsl(220_15%_15%)] rounded-sm bg-[hsl(220_15%_7%/.5)] overflow-hidden">
            <div className="p-4 text-center border-r border-[hsl(220_15%_15%)]">
              <div className="font-mono text-2xl text-[hsl(25_95%_55%)]">{modules.length}</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wider">
                Modules
              </div>
            </div>
            <div className="p-4 text-center border-r border-[hsl(220_15%_15%)]">
              <div className="font-mono text-2xl text-[hsl(25_95%_55%)]">{totalLessons}</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wider">
                Lessons
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="font-mono text-2xl text-[hsl(25_95%_55%)]">
                {Math.floor(totalMinutes)}+
              </div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wider">
                Minutes
              </div>
            </div>
          </div>
        </motion.div>

        {/* Curriculum List - Custom Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {modules.map((module, index) => {
            const isOpen = openModule === index;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={`border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${
                    isOpen
                      ? "border-[hsl(25_95%_55%/.5)] bg-[hsl(220_15%_7%)]"
                      : "border-[hsl(220_15%_15%)] bg-[hsl(220_15%_7%)] hover:border-[hsl(220_15%_15%/.8)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : index)}
                    className="w-full px-4 py-3 hover:bg-[hsl(220_15%_12%/.3)] transition-colors"
                  >
                    <div className="flex items-center gap-4 text-left w-full">
                      {/* Module Number */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center border rounded-sm font-mono text-sm transition-all ${
                          isOpen
                            ? "bg-[hsl(0_72%_51%/.2)] border-[hsl(0_72%_51%/.5)] text-[hsl(0_72%_51%)]"
                            : "bg-[hsl(220_15%_12%)] border-[hsl(220_15%_15%)] text-[hsl(25_95%_55%)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg truncate">{module.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-[hsl(220_10%_55%)]">
                          <span>{module.lessons.length} lessons</span>
                        </div>
                      </div>

                      {/* Duration & chevron */}
                      <div className="flex items-center gap-2 text-sm font-mono text-[hsl(220_10%_55%)]">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <div className="ml-14 pt-2 border-t border-[hsl(220_15%_15%/.5)]">
                            <ul className="space-y-2 mt-3">
                              {module.lessons.map((lesson) => (
                                <li key={lesson} className="flex items-start gap-3 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-[hsl(25_95%_55%)] flex-shrink-0 mt-0.5" />
                                  <span className="text-[hsl(220_10%_55%)]">{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Below Curriculum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() =>
              document.getElementById("s-pricing")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(220_15%_12%)] border border-[hsl(220_15%_15%)] rounded-sm text-sm font-medium hover:border-[hsl(0_72%_51%/.5)] hover:bg-[hsl(0_72%_51%/.1)] transition-all group"
          >
            Get Full Access
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   INSTRUCTOR
   ═══════════════════════════════════════════════ */

const instructorStats = [
  { value: "18", label: "Pro Wins", Icon: Trophy },
  { value: "#4", label: "UFC Ranking", Icon: TrendingUp },
  { value: "UFC", label: "Bantamweight", Icon: Swords },
  { value: "10+", label: "Years Pro", Icon: Target },
];

const StrikingInstructor = () => (
  <section
    id="s-instructor"
    className="relative py-20 overflow-hidden section-divider noise-bg"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_15%_8%)] to-[hsl(220_15%_5%)]" />
    <div className="absolute inset-0 technical-grid-fine opacity-20" />

    <div className="relative max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-[hsl(25_95%_55%)] border border-[hsl(25_95%_55%/.3)] bg-[hsl(25_95%_55%/.05)]">
            <Swords className="w-3 h-3" />
            Your Instructor
          </span>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-2">CORY</h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            <span
              className="font-brush text-[hsl(0_72%_51%)] -rotate-1 inline-block"
              style={{ textShadow: "0 0 20px hsl(0 72% 51% / 0.5)" }}
            >
              SANDHAGEN
            </span>
          </h2>

          <p className="text-lg text-[hsl(220_10%_55%)] leading-relaxed mb-4">
            UFC Bantamweight contender and one of the most dynamic strikers in mixed martial arts.
            Known for his creative combinations and unorthodox techniques that have earned him
            <span className="text-[hsl(0_0%_96%)] font-medium"> 7 performance bonuses</span>.
          </p>

          <p className="text-[hsl(220_10%_55%)] leading-relaxed mb-8">
            With a professional record built on spectacular finishes and technical mastery, Cory's
            teaching methodology focuses on practical application — the same techniques he uses
            against the best fighters in the world.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {instructorStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-3 bg-[hsl(220_15%_12%/.5)] border border-[hsl(220_15%_15%)] rounded-sm text-center"
              >
                <stat.Icon className="w-4 h-4 text-[hsl(25_95%_55%)] mx-auto mb-2" />
                <div className="font-mono text-xl text-[hsl(0_0%_96%)]">{stat.value}</div>
                <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div className="relative p-4 bg-[hsl(220_15%_7%)] border-l-2 border-[hsl(0_72%_51%)]">
            <Quote className="absolute top-2 right-2 w-6 h-6 text-[hsl(0_72%_51%/.2)]" />
            <p className="text-sm text-[hsl(220_10%_55%)] italic">
              "I want to share everything I've learned competing at the highest level. This course is
              the foundation that made me who I am as a striker."
            </p>
            <p className="mt-2 text-xs font-mono text-[hsl(25_95%_55%)]">— Cory Sandhagen</p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center"
        >
          <img
            src={instructorImage}
            alt="Cory Sandhagen - UFC Fighter"
            loading="lazy"
            decoding="async"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════ */

const pricingFeatures = [
  { text: "5+ hours of HD video content" },
  { text: "8 comprehensive training modules" },
  { text: "Lifetime access to all materials" },
  { text: "Defensive & offensive techniques" },
  { text: "Counter-striking mastery" },
  { text: "Clinch work fundamentals" },
  { text: "Stance switching techniques" },
  { text: "Mobile-friendly learning" },
];

const StrikingPricing = () => (
  <section
    id="s-pricing"
    className="relative py-20 overflow-hidden section-divider noise-bg"
  >
    <div className="absolute inset-0 bg-[hsl(220_15%_4%)]" />
    <div className="absolute inset-0 technical-grid opacity-[0.15]" />

    {/* Accent glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(0_72%_51%/.1)] rounded-full blur-[150px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-[hsl(0_72%_51%)] border border-[hsl(0_72%_51%/.3)] bg-[hsl(0_72%_51%/.05)]">
          <Sparkles className="w-3 h-3" />
          Get Started Today
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
          START YOUR{" "}
          <span
            className="text-[hsl(0_72%_51%)]"
            style={{ textShadow: "0 0 20px hsl(0 72% 51% / 0.5)" }}
          >
            TRAINING
          </span>
        </h2>
        <p className="text-lg text-[hsl(220_10%_55%)] max-w-2xl mx-auto">
          One-time investment. Lifetime access. Elite-level instruction.
        </p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-lg mx-auto"
      >
        <div className="relative p-8 bg-[hsl(220_15%_7%)] border border-[hsl(0_72%_51%/.3)] rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)] hud-corner">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(0_72%_51%)] via-[hsl(25_95%_55%)] to-[hsl(0_72%_51%)]" />

          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono tracking-wider uppercase bg-gradient-to-br from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)]">
              <Zap className="w-3 h-3" />
              Complete Access
            </span>
          </div>

          {/* Price Section */}
          <div className="text-center mb-8 pt-4">
            <h3 className="font-display text-2xl mb-4 text-[hsl(220_10%_55%)]">
              THE ESSENTIALS OF STRIKING
            </h3>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span
                className="font-mono text-6xl md:text-7xl text-[hsl(0_72%_51%)]"
                style={{ textShadow: "0 0 20px hsl(0 72% 51% / 0.5)" }}
              >
                $249
              </span>
            </div>
            <p className="text-sm text-[hsl(220_10%_55%)]">
              One-time payment &bull;{" "}
              <span className="text-[hsl(25_95%_55%)]">or $23/month</span>
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {pricingFeatures.map((feature) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-[hsl(220_15%_12%)]">
                  <Check className="w-3 h-3 text-[hsl(25_95%_55%)]" />
                </div>
                <span className="text-[hsl(220_10%_55%)]">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="group w-full bg-gradient-to-br from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white font-semibold text-base sm:text-lg py-5 sm:py-6 rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.35)] hover:shadow-[0_0_60px_hsl(0_72%_51%_/_0.5)] transition-all duration-300 btn-shimmer"
            onClick={() =>
              (window.location.href =
                "https://www.corysandhagenmma.com/purchase?product_id=5678625")
            }
          >
            <span className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Enroll Now — Get Instant Access</span>
              <span className="sm:hidden">Enroll Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[hsl(220_10%_55%)]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[hsl(25_95%_55%)]" />
              Instant Access
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[hsl(25_95%_55%)]" />
              30-Day Guarantee
            </span>
          </div>
        </div>
      </motion.div>

      {/* Value Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="-mt-4 max-w-lg mx-auto relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-[hsl(0_72%_51%/.5)] to-transparent" />

        <div className="pt-10 px-6 pb-6 bg-[hsl(220_15%_7%/.3)] border border-[hsl(220_15%_15%/.5)] border-t-0 rounded-b-sm">
          <h4 className="text-center font-mono text-xs text-[hsl(220_10%_55%)] uppercase tracking-wider mb-4">
            What You're Getting
          </h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-mono text-3xl text-[hsl(25_95%_55%)]">5+</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wide">
                Hours
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl text-[hsl(25_95%_55%)]">8</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wide">
                Modules
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl text-[hsl(25_95%_55%)]">30+</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wide">
                Techniques
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl text-[hsl(25_95%_55%)]">{"\u221E"}</div>
              <div className="text-[10px] text-[hsl(220_10%_55%)] uppercase tracking-wide">
                Lifetime
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Urgency Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center text-sm text-[hsl(220_10%_55%)]"
      >
        Train with the same techniques Cory uses against the best fighters in the world.
        <span className="text-[hsl(0_72%_51%)] font-medium"> Start today.</span>
      </motion.p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════ */

const faqs = [
  {
    question: "What skill level is this course designed for?",
    answer:
      "The Essentials of Striking is designed for all levels \u2014 from complete beginners to experienced fighters looking to refine their technique. Cory breaks down every technique from the fundamentals up, so you'll build a solid foundation regardless of where you're starting.",
  },
  {
    question: "Do I need any equipment to follow along?",
    answer:
      "No equipment is required to learn the techniques. However, to practice effectively, a heavy bag and focus mitts are recommended. Many drills can be done with shadow boxing alone.",
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "You get lifetime access. Once you purchase, the course is yours forever \u2014 including any future updates Cory adds to the curriculum.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes. If you're not completely satisfied within the first 30 days, contact us for a full refund. No questions asked.",
  },
  {
    question: "Can I watch on mobile or tablet?",
    answer:
      "Absolutely. The course is fully optimized for all devices \u2014 phone, tablet, laptop, or TV. Train wherever you are.",
  },
  {
    question: "How is this different from YouTube tutorials?",
    answer:
      "This is a complete, structured system \u2014 not random techniques. Every lesson builds on the last, taught by an active UFC contender who uses these exact techniques at the highest level. You're getting the same knowledge that costs $500+/hour in private sessions.",
  },
];

const StrikingFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="s-faq" className="relative py-20 overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-[hsl(220_15%_4%)]" />
      <div className="absolute inset-0 technical-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-mono tracking-wider uppercase text-[hsl(25_95%_55%)] border border-[hsl(25_95%_55%/.3)] bg-[hsl(25_95%_55%/.05)]">
            <HelpCircle className="w-3 h-3" />
            Common Questions
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
            FREQUENTLY <span className="text-[hsl(0_72%_51%)]">ASKED</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={`border rounded-sm overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-[hsl(25_95%_55%/.5)] bg-[hsl(220_15%_7%)]"
                      : "border-[hsl(220_15%_15%)] bg-[hsl(220_15%_7%)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left hover:bg-[hsl(220_15%_12%/.3)] transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <p className="text-[hsl(220_10%_55%)] leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

const StrikingFooter = () => (
  <footer className="relative py-12 bg-[hsl(220_15%_7%)] border-t border-[hsl(220_15%_15%)] overflow-hidden">
    <div className="absolute inset-0 technical-grid-fine opacity-10" />

    <div className="relative max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo & tagline */}
        <div className="text-center md:text-left">
          <img src={logo} alt="Cory Sandhagen MMA" className="h-10 mb-3 mx-auto md:mx-0" />
          <p className="text-sm text-[hsl(220_10%_55%)]">
            Elite striking instruction from a UFC contender
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://corysandhagenmma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[hsl(220_10%_55%)] hover:text-[hsl(25_95%_55%)] transition-colors"
          >
            Main Site
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="https://corysandhagenmma.com/p/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(220_10%_55%)] hover:text-[hsl(0_0%_96%)] transition-colors"
          >
            Privacy
          </a>
          <a
            href="https://corysandhagenmma.com/p/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(220_10%_55%)] hover:text-[hsl(0_0%_96%)] transition-colors"
          >
            Terms
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-6 border-t border-[hsl(220_15%_15%/.5)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(220_10%_55%)]">
        <span>&copy; {new Date().getFullYear()} Cory Sandhagen MMA. All rights reserved.</span>
        <span className="font-mono text-[hsl(25_95%_55%/.6)]">GEN_II // STRIKING ESSENTIALS</span>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function StrikingPage() {
  return (
    <main
      className="font-body bg-[hsl(220_15%_4%)] text-[hsl(0_0%_96%)] overflow-x-hidden"
      style={strikingVars}
    >
      <StrikingNavbar />
      <StrikingHero />
      <StrikingOverview />
      <StrikingCurriculum />
      <StrikingInstructor />
      <StrikingPricing />
      <StrikingFAQ />
      <StrikingFooter />
    </main>
  );
}
