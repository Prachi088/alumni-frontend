import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const C = {
  navy:  "#0B1D35",
  navy2: "#112444",
  navy3: "#1a3258",
  gold:  "#C8963E",
  gold2: "#E8B55A",
  muted: "#8A9AB5",
  white: "#FFFFFF",
};

const features = [
  { icon: "🔗", title: "Alumni Network",    desc: "Connect with SATI graduates working across India and abroad. Send connection requests and grow your professional circle." },
  { icon: "💼", title: "Job Board",          desc: "Alumni post real job openings exclusively for SATI students. Apply with one click and track your applications." },
  { icon: "📅", title: "Events",             desc: "Stay updated on alumni meets, technical webinars, campus drives, and other college events. Register in seconds." },
  { icon: "👤", title: "Rich Profiles",      desc: "Showcase your batch, branch, company, and skills. Let recruiters and peers find you by what you know." },
  { icon: "🤝", title: "Connection Requests", desc: "Send and receive connection requests. Accept or reject — you stay in control of your network." },
  { icon: "🏫", title: "SATI Community",     desc: "An exclusive space for Samrat Ashok Technological Institute students and alumni only." },
];

const steps = [
  { num: "01", title: "Register",       desc: "Create your account with your email. Choose Student or Alumni role." },
  { num: "02", title: "Fill profile",   desc: "Add your batch, branch, company, and skills so others can find you." },
  { num: "03", title: "Connect",        desc: "Browse the network, send connection requests, and build your circle." },
  { num: "04", title: "Explore",        desc: "Browse jobs, register for events, and stay connected with SATI." },
];

function StatCard({ label, value }) {
  return (
    <div style={s.statCard}>
      <div style={s.statNum}>{value}</div>
      <div style={s.statLabel}>{label}</div>
    </div>
  );
}

function About() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: "...", jobs: "...", events: "..." });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/users`).then(r => r.json()).catch(() => []),
      fetch(`${API_URL}/api/jobs`).then(r => r.json()).catch(() => []),
      fetch(`${API_URL}/api/events`).then(r => r.json()).catch(() => []),
    ]).then(([users, jobs, events]) => {
      setStats({
        users:  Array.isArray(users)  ? users.length  : "50+",
        jobs:   Array.isArray(jobs)   ? jobs.length   : "20+",
        events: Array.isArray(events) ? events.length : "10+",
      });
    });
  }, []);

  return (
    <div style={s.page}>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.brand}>
            <div style={s.brandBox}>SATI</div>
            <span style={s.brandText}>Alumni Portal</span>
          </div>

          {/* Hamburger — visible on mobile */}
          <button
            style={s.ham}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={s.hamLine} />
            <span style={s.hamLine} />
            <span style={s.hamLine} />
          </button>

          {/* Desktop links */}
          <div style={s.navLinks}>
            <button onClick={() => navigate("/")}         style={s.navLink}>Login</button>
            <button onClick={() => navigate("/dashboard")} style={s.navLinkPrimary}>Go to Dashboard</button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={s.drawer}>
            <button onClick={() => { navigate("/"); setMenuOpen(false); }}          style={s.drawerLink}>Login</button>
            <button onClick={() => { navigate("/dashboard"); setMenuOpen(false); }} style={s.drawerLinkPrimary}>Go to Dashboard</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.heroBadge}>Samrat Ashok Technological Institute</div>
          <h1 style={s.heroTitle}>
            Connecting SATI<br />
            <span style={{ color: C.gold2 }}>Students & Alumni</span>
          </h1>
          <p style={s.heroSub}>
            One platform to network, find jobs, discover events, and stay connected
            with the SATI community — wherever life takes you.
          </p>
          <div style={s.heroBtns}>
            <button onClick={() => navigate("/")} style={s.btnPrimary}>Get Started</button>
            <a href="#features" style={s.btnOutline}>Learn More</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={s.statsSection}>
        <div style={s.statsGrid}>
          <StatCard label="Registered Members" value={`${stats.users}+`} />
          <StatCard label="Jobs Posted"         value={`${stats.jobs}+`} />
          <StatCard label="Events Hosted"       value={`${stats.events}+`} />
          <StatCard label="Years of SATI"       value="60+" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>What we offer</div>
          <h2 style={s.sectionTitle}>Everything you need in one place</h2>
          <div style={s.featGrid}>
            {features.map((f, i) => (
              <div key={i} style={s.featCard}>
                <div style={s.featIcon}>{f.icon}</div>
                <h3 style={s.featTitle}>{f.title}</h3>
                <p style={s.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ ...s.section, background: C.navy2 }}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>How it works</div>
          <h2 style={s.sectionTitle}>Up and running in 4 steps</h2>
          <div style={s.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepNum}>{step.num}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>Who it's for</div>
          <h2 style={s.sectionTitle}>Built for two audiences</h2>
          <div style={s.audienceGrid}>

            <div style={s.audienceCard}>
              <div style={{ ...s.audienceBadge, background: "rgba(94,130,240,0.15)", color: "#7ba3f5" }}>Students</div>
              <h3 style={s.audienceTitle}>Current SATI Students</h3>
              <ul style={s.audienceList}>
                <li style={s.audienceItem}>Browse jobs posted by alumni</li>
                <li style={s.audienceItem}>Register for campus & alumni events</li>
                <li style={s.audienceItem}>Send connection requests to alumni</li>
                <li style={s.audienceItem}>Get mentorship and career guidance</li>
                <li style={s.audienceItem}>Track your job applications</li>
              </ul>
            </div>

            <div style={{ ...s.audienceCard, border: `1px solid rgba(200,150,62,0.35)` }}>
              <div style={{ ...s.audienceBadge, background: "rgba(200,150,62,0.15)", color: C.gold2 }}>Alumni</div>
              <h3 style={s.audienceTitle}>SATI Graduates</h3>
              <ul style={s.audienceList}>
                <li style={s.audienceItem}>Post job openings at your company</li>
                <li style={s.audienceItem}>Create and manage events</li>
                <li style={s.audienceItem}>Connect with current students</li>
                <li style={s.audienceItem}>Give back to the SATI community</li>
                <li style={s.audienceItem}>Manage your professional profile</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={s.ctaSection}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaTitle}>Ready to join the SATI network?</h2>
          <p style={s.ctaSub}>Register for free. It takes less than a minute.</p>
          <button onClick={() => navigate("/")} style={s.btnPrimary}>Create your account</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerTop}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={s.brandBox}>SATI</div>
                <span style={{ color: C.white, fontWeight: 700, fontSize: 15 }}>Alumni Portal</span>
              </div>
              <p style={s.footerDesc}>
                Samrat Ashok Technological Institute, Vidisha, Madhya Pradesh.<br />
                Connecting generations of SATI engineers.
              </p>
            </div>
            <div style={s.footerLinks}>
              <span style={s.footerLinkHead}>Quick links</span>
              <button onClick={() => navigate("/")}         style={s.footerLink}>Login / Register</button>
              <button onClick={() => navigate("/dashboard")} style={s.footerLink}>Dashboard</button>
              <button onClick={() => navigate("/jobs")}      style={s.footerLink}>Jobs</button>
              <button onClick={() => navigate("/events")}    style={s.footerLink}>Events</button>
            </div>
          </div>
          <div style={s.footerBottom}>
            <span>© {new Date().getFullYear()} SATI Alumni Portal. Built with React + Spring Boot.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ─────────────────────────── styles ─────────────────────────── */
const s = {
  page:    { background: C.navy, color: C.white, fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif", minHeight: "100vh" },

  /* nav */
  nav:     { background: C.navy2, borderBottom: "1px solid rgba(200,150,62,0.15)", position: "sticky", top: 0, zIndex: 100 },
  navInner:{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand:   { display: "flex", alignItems: "center", gap: 10 },
  brandBox:{ width: 38, height: 38, background: `linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: C.navy, flexShrink: 0 },
  brandText:{ fontSize: 15, fontWeight: 700, color: C.white },
  navLinks:{ display: "flex", alignItems: "center", gap: 12, "@media(max-width:600px)": { display: "none" } },
  navLink: { background: "none", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", padding: "8px 14px", borderRadius: 8 },
  navLinkPrimary: { background: `linear-gradient(135deg,${C.gold},${C.gold2})`, border: "none", color: C.navy, fontSize: 13, fontWeight: 700, cursor: "pointer", padding: "9px 18px", borderRadius: 8 },
  ham:     { display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6 },
  hamLine: { display: "block", width: 22, height: 2, background: C.muted, borderRadius: 2 },
  drawer:  { background: C.navy2, borderTop: "1px solid rgba(200,150,62,0.1)", padding: "12px 20px 16px", display: "flex", flexDirection: "column", gap: 8 },
  drawerLink:        { background: "none", border: "none", color: C.muted, fontSize: 15, cursor: "pointer", padding: "10px 0", textAlign: "left" },
  drawerLinkPrimary: { background: `linear-gradient(135deg,${C.gold},${C.gold2})`, border: "none", color: C.navy, fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "11px 18px", borderRadius: 8, textAlign: "center" },

  /* hero */
  hero:     { padding: "80px 20px 64px", textAlign: "center" },
  heroInner:{ maxWidth: 720, margin: "0 auto" },
  heroBadge:{ display: "inline-block", background: "rgba(200,150,62,0.15)", color: C.gold2, border: "1px solid rgba(200,150,62,0.25)", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 },
  heroTitle:{ fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 20px", color: C.white },
  heroSub:  { fontSize: "clamp(15px, 3vw, 18px)", color: C.muted, lineHeight: 1.7, margin: "0 auto 36px", maxWidth: 560 },
  heroBtns: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },

  /* buttons */
  btnPrimary: { background: `linear-gradient(135deg,${C.gold},${C.gold2})`, border: "none", color: C.navy, fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "13px 30px", borderRadius: 10 },
  btnOutline: { background: "none", border: `1px solid rgba(200,150,62,0.4)`, color: C.gold2, fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "13px 30px", borderRadius: 10, textDecoration: "none", display: "inline-block" },

  /* stats */
  statsSection: { background: C.navy2, padding: "40px 20px", borderTop: "1px solid rgba(200,150,62,0.1)", borderBottom: "1px solid rgba(200,150,62,0.1)" },
  statsGrid:    { maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 },
  statCard:     { background: "rgba(200,150,62,0.08)", border: "1px solid rgba(200,150,62,0.15)", borderRadius: 12, padding: "20px 16px", textAlign: "center" },
  statNum:      { fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 800, color: C.gold2, marginBottom: 6 },
  statLabel:    { fontSize: 13, color: C.muted },

  /* section shell */
  section:      { padding: "72px 20px" },
  sectionInner: { maxWidth: 1100, margin: "0 auto" },
  sectionLabel: { fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.gold, marginBottom: 10 },
  sectionTitle: { fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: C.white, marginBottom: 48, lineHeight: 1.2 },

  /* features */
  featGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  featCard: { background: C.navy2, border: "1px solid rgba(200,150,62,0.12)", borderRadius: 14, padding: "24px 22px" },
  featIcon: { fontSize: 28, marginBottom: 14 },
  featTitle:{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 },
  featDesc: { fontSize: 14, color: C.muted, lineHeight: 1.65 },

  /* how it works */
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 },
  stepCard:  { background: C.navy, border: "1px solid rgba(200,150,62,0.12)", borderRadius: 14, padding: "24px 20px" },
  stepNum:   { fontSize: 36, fontWeight: 800, color: "rgba(200,150,62,0.25)", marginBottom: 12, lineHeight: 1 },
  stepTitle: { fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 },
  stepDesc:  { fontSize: 14, color: C.muted, lineHeight: 1.65 },

  /* audience */
  audienceGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
  audienceCard:  { background: C.navy2, border: "1px solid rgba(200,150,62,0.12)", borderRadius: 16, padding: "28px 24px" },
  audienceBadge: { display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 14 },
  audienceTitle: { fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 16 },
  audienceList:  { listStyle: "none", padding: 0, margin: 0 },
  audienceItem:  { fontSize: 14, color: C.muted, padding: "8px 0", borderBottom: "1px solid rgba(200,150,62,0.06)", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 },

  /* cta */
  ctaSection: { background: `linear-gradient(135deg, ${C.navy3}, rgba(200,150,62,0.12))`, border: "1px solid rgba(200,150,62,0.2)", margin: "0 20px 40px", borderRadius: 20, padding: "56px 24px", textAlign: "center" },
  ctaInner:   { maxWidth: 560, margin: "0 auto" },
  ctaTitle:   { fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, color: C.white, marginBottom: 12 },
  ctaSub:     { fontSize: 16, color: C.muted, marginBottom: 32 },

  /* footer */
  footer:      { background: C.navy2, borderTop: "1px solid rgba(200,150,62,0.12)", padding: "48px 20px 24px" },
  footerInner: { maxWidth: 1100, margin: "0 auto" },
  footerTop:   { display: "flex", gap: 48, flexWrap: "wrap", marginBottom: 40 },
  footerDesc:  { fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 320 },
  footerLinks: { display: "flex", flexDirection: "column", gap: 8 },
  footerLinkHead: { fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: C.gold, marginBottom: 4 },
  footerLink:  { background: "none", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", textAlign: "left", padding: "2px 0" },
  footerBottom:{ borderTop: "1px solid rgba(200,150,62,0.1)", paddingTop: 20, fontSize: 12, color: C.muted },
};

/* ── Inject mobile responsive CSS ── */
const mobileCSS = `
  @media (max-width: 600px) {
    .about-nav-links { display: none !important; }
    .about-ham { display: flex !important; }
    .about-cta { margin: 0 0 32px !important; border-radius: 12px !important; }
  }
`;

const StyleTag = () => <style>{mobileCSS}</style>;

function AboutWithStyle() {
  return (
    <>
      <StyleTag />
      <About />
    </>
  );
}

export default AboutWithStyle;