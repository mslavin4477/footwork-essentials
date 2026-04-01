import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  FolderDown,
  Swords,
  X,
} from "lucide-react";
import logo from "./assets/logo.png";

/* ───────────────────── COURSE NAVBAR ───────────────────── */

const CourseNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-center h-16">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Cory Sandhagen MMA" className="h-8" />
        </a>
      </div>
    </div>
  </nav>
);

/* ───────────────────── HERO ───────────────────── */

const CourseHero = () => (
  <section className="relative pt-32 pb-12 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    <div className="absolute inset-0 technical-grid opacity-20" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[hsl(var(--primary)/.08)] rounded-full blur-[120px] pointer-events-none" />

    <div className="relative max-w-6xl mx-auto px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[0.9] mb-4"
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
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-xl mx-auto"
      >
        7 modules. Almost two hours of instruction. It's all yours.
      </motion.p>
    </div>
  </section>
);

/* ───────────────────── ACCESS CARD ───────────────────── */

const AccessCard = () => (
  <section className="relative pb-16 overflow-hidden">
    <div className="absolute inset-0 bg-background" />

    <div className="relative max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="max-w-lg mx-auto"
      >
        <a
          href="https://www.corysandhagenmma.com/purchase?product_id=5242361&coupon_code=FREEFOOTWORK"
          className="group block relative p-8 bg-card border border-[hsl(var(--primary)/.3)] rounded-sm shadow-[0_0_40px_hsl(210_80%_50%_/_0.15)] hud-corner hover:border-[hsl(var(--primary)/.6)] hover:shadow-[0_0_60px_hsl(210_80%_50%_/_0.25)] transition-all duration-300"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-5 bg-[hsl(var(--primary)/.15)] border border-[hsl(var(--primary)/.3)] rounded-sm group-hover:bg-[hsl(var(--primary)/.25)] transition-colors">
              <FolderDown className="w-7 h-7 text-primary" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl mb-3">
              CLAIM YOUR FREE COURSE
            </h2>

            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              7 modules. Almost two hours of instruction. Yours for free.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(210_70%_40%)] text-white font-semibold rounded-sm shadow-[0_0_30px_hsl(210_80%_50%_/_0.3)] group-hover:shadow-[0_0_50px_hsl(210_80%_50%_/_0.5)] transition-all duration-300 btn-shimmer clip-angular-small">
              Get Instant Access — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────── ESSENTIALS OF STRIKING UPSELL ───────────────────── */

const StrikingUpsell = () => (
  <section className="relative py-16 overflow-hidden section-divider noise-bg">
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--background))]" />
    <div className="absolute inset-0 technical-grid-fine opacity-20" />

    <div className="relative max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        <a
          href="/striking"
          className="group block relative p-8 bg-card border border-[hsl(0_72%_51%_/_0.3)] rounded-sm shadow-[0_0_40px_hsl(0_72%_51%_/_0.1)] hud-corner hover:border-[hsl(0_72%_51%_/_0.5)] hover:shadow-[0_0_60px_hsl(0_72%_51%_/_0.2)] transition-all duration-300"
          style={{
            "--hud-top": "hsl(25 95% 55% / 0.6)",
            "--hud-bottom": "hsl(0 72% 51% / 0.6)",
          } as React.CSSProperties}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(0_72%_51%)] via-[hsl(25_95%_55%)] to-[hsl(0_72%_51%)]" />

          {/* Override HUD corners to red/orange */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[hsl(25_95%_55%_/_0.6)]" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[hsl(0_72%_51%_/_0.6)]" />

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-5 bg-[hsl(0_72%_51%_/_0.15)] border border-[hsl(0_72%_51%_/_0.3)] rounded-sm group-hover:bg-[hsl(0_72%_51%_/_0.25)] transition-colors">
              <Swords className="w-7 h-7 text-[hsl(0_72%_51%)]" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl mb-3">
              THE ESSENTIALS OF{" "}
              <span className="font-brush text-[hsl(0_72%_51%)] -rotate-1 inline-block" style={{ textShadow: "0 0 20px hsl(0 72% 51% / 0.5)" }}>
                STRIKING
              </span>
            </h2>

            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
              Want to level up your striking? Check out the full system — defense, offense, counters, clinch work, and more.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white font-semibold rounded-sm shadow-[0_0_30px_hsl(0_72%_51%_/_0.3)] group-hover:shadow-[0_0_50px_hsl(0_72%_51%_/_0.5)] transition-all duration-300 btn-shimmer clip-angular-small">
              Check It Out
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────── FOOTER ───────────────────── */

const CourseFooter = () => (
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
        <span>&copy; {new Date().getFullYear()} Cory Sandhagen MMA. All rights reserved.</span>
        <span className="font-mono text-[hsl(var(--accent)/.6)]">FOOTWORK // ESSENTIALS</span>
      </div>
    </div>
  </footer>
);

/* ───────────────────── FLOATING BOTTOM BAR ───────────────────── */

const StrikingBottomBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after 3s delay
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);

    // Hide when the upsell section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false);
      },
      { threshold: 0.3 }
    );

    // Observe the upsell section by ID
    const target = document.getElementById("striking-upsell");
    if (target) observer.observe(target);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-[hsl(220_15%_7%/.95)] backdrop-blur-md border-t border-[hsl(0_72%_51%_/_0.3)] shadow-[0_-4px_30px_hsl(0_72%_51%_/_0.15)]">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-[hsl(0_72%_51%_/_0.15)] border border-[hsl(0_72%_51%_/_0.3)] rounded-sm flex-shrink-0">
                  <Swords className="w-4 h-4 text-[hsl(0_72%_51%)]" />
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Level up your striking
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="/striking"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(15_80%_45%)] text-white text-sm font-semibold rounded-sm shadow-[0_0_20px_hsl(0_72%_51%_/_0.3)] hover:shadow-[0_0_30px_hsl(0_72%_51%_/_0.5)] transition-all btn-shimmer"
                >
                  Check It Out
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setDismissed(true)}
                  className="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────────────────── PAGE ───────────────────── */

export default function CoursePage() {
  return (
    <main className="font-body bg-background text-foreground overflow-x-hidden">
      <CourseNavbar />
      <CourseHero />
      <AccessCard />
      <div id="striking-upsell">
        <StrikingUpsell />
      </div>
      <CourseFooter />
      <StrikingBottomBar />
    </main>
  );
}
