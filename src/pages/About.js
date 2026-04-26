import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const C = {
  navy:  "var(--color-dark-bg)",
  navy2: "var(--color-dark-card)",
  navy3: "var(--color-dark-surface)",
  gold:  "var(--color-accent-gold)",
  gold2: "var(--color-accent-gold-light)",
  muted: "var(--color-text-muted)",
  white: "var(--color-text-primary)",
};

const features = [
  { icon: "🔗", title: "Alumni Network",      desc: "Connect with SATI graduates working across India and abroad." },
  { icon: "💼", title: "Job Board",            desc: "Alumni post real job openings exclusively for SATI students." },
  { icon: "📅", title: "Events",               desc: "Stay updated on alumni meets, webinars, and campus drives." },
  { icon: "👤", title: "Rich Profiles",        desc: "Showcase your batch, branch, company, and skills." },
  { icon: "🤝", title: "Connection Requests",  desc: "Send and accept requests — you control your network." },
  { icon: "🏫", title: "SATI Community",       desc: "An exclusive space for SATI students and alumni only." },
];

const steps = [
  { num: "01", title: "Register",      desc: "Create your account with your email. Choose Student or Alumni." },
  { num: "02", title: "Fill profile",  desc: "Add your batch, branch, company, and skills." },
  { num: "03", title: "Connect",       desc: "Browse the network and send connection requests." },
  { num: "04", title: "Explore",       desc: "Browse jobs, register for events, grow your circle." },
];

function About() {
  const navigate  = useNavigate();
  const [stats, setStats]     = useState({ users: null, jobs: null, events: null });
  const [menuOpen, setMenuOpen] = useState(false);

  // If already logged in, show a "Go to Dashboard" option prominently
  const isLoggedIn = !!localStorage.getItem("userId");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/users`).then(r => r.json()).catch(() => null),
      fetch(`${API_URL}/api/jobs`).then(r => r.json()).catch(() => null),
      fetch(`${API_URL}/api/events`).then(r => r.json()).catch(() => null),
    ]).then(([users, jobs, events]) => {
      setStats({
        users:  Array.isArray(users)  ? users.length  : "50",
        jobs:   Array.isArray(jobs)   ? jobs.length   : "20",
        events: Array.isArray(events) ? events.length : "10",
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

          {/* Hamburger — shown on mobile via inline style + CSS class */}
          <button
            className="about-ham"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={s.ham}
          >
            <span style={s.hamLine} />
            <span style={s.hamLine} />
            <span style={s.hamLine} />
          </button>

          {/* Desktop nav links */}
          <div className="about-nav-links" style={s.navLinks}>
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/dashboard")} style={s.navLink}>Dashboard</button>
                <button onClick={() => { localStorage.clear(); navigate("/about"); }} style={s.navLinkGhost}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} style={s.navLink}>Login</button>
                <button onClick={() => navigate("/login")} style={s.navLinkPrimary}>Register →</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={s.drawer}>
            {isLoggedIn ? (
              <>
                <button onClick={() => { navigate("/dashboard"); setMenuOpen(false); }} style={s.drawerLinkPrimary}>Go to Dashboard</button>
                <button onClick={() => { localStorage.clear(); setMenuOpen(false); }} style={s.drawerLink}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} style={s.drawerLink}>Login</button>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} style={s.drawerLinkPrimary}>Register for free</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <a href="https://www.satiengg.in/" target="_blank" rel="noopener noreferrer" style={{ ...s.heroBadge, textDecoration:"none", cursor:"pointer" }}>
            Samrat Ashok Technological Institute · Vidisha, MP ↗
          </a>
          <h1 style={s.heroTitle}>
            Connecting SATI<br />
            <span style={{ color: C.gold2 }}>Students &amp; Alumni</span>
          </h1>
          <p style={s.heroSub}>
            One platform to network, find jobs, discover events, and stay connected
            with the SATI community — wherever life takes you.
          </p>
          <div style={s.heroBtns}>
            {isLoggedIn ? (
              <button onClick={() => navigate("/dashboard")} style={s.btnPrimary}>Go to Dashboard →</button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} style={s.btnPrimary}>Get Started — it's free</button>
                <button onClick={() => navigate("/login")} style={s.btnOutline}>Login</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={s.statsSection}>
        <div style={s.statsGrid}>
          {[
            { label: "Registered Members", val: stats.users },
            { label: "Jobs Posted",         val: stats.jobs  },
            { label: "Events Hosted",       val: stats.events },
            { label: "Years of SATI",       val: "60"         },
          ].map((st, i) => (
            <div key={i} style={s.statCard}>
              <div style={s.statNum}>{st.val !== null ? `${st.val}+` : "..."}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.section}>
        <div style={s.inner}>
          <div style={s.sectionLabel}>What we offer</div>
          <h2 style={s.sectionTitle}>Everything in one place</h2>
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
        <div style={s.inner}>
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
        <div style={s.inner}>
          <div style={s.sectionLabel}>Who it's for</div>
          <h2 style={s.sectionTitle}>Built for two audiences</h2>
          <div style={s.audienceGrid}>
            <div style={s.audienceCard}>
              <div style={{ ...s.badge, background:"rgba(94,130,240,0.15)", color:"#7ba3f5" }}>Students</div>
              <h3 style={s.audienceTitle}>Current SATI Students</h3>
              <ul style={s.list}>
                {["Browse jobs posted by alumni","Register for campus & alumni events","Send connection requests to alumni","Get mentorship and career guidance","Track your job applications"].map((t,i)=>(
                  <li key={i} style={s.listItem}>
                    <span style={s.check}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ ...s.audienceCard, border:`1px solid rgba(200,150,62,0.35)` }}>
              <div style={{ ...s.badge, background:"rgba(200,150,62,0.15)", color:C.gold2 }}>Alumni</div>
              <h3 style={s.audienceTitle}>SATI Graduates</h3>
              <ul style={s.list}>
                {["Post job openings at your company","Create and manage events","Connect with current students","Give back to the SATI community","Manage your professional profile"].map((t,i)=>(
                  <li key={i} style={s.listItem}>
                    <span style={{ ...s.check, color:C.gold2 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaWrap}>
        <div style={s.ctaBox}>
          <h2 style={s.ctaTitle}>
            {isLoggedIn ? "Welcome back! Ready to explore?" : "Ready to join the SATI network?"}
          </h2>
          <p style={s.ctaSub}>
            {isLoggedIn ? "Your dashboard is waiting." : "Register for free. It takes less than a minute."}
          </p>
          <button
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
            style={s.btnPrimary}
          >
            {isLoggedIn ? "Go to Dashboard →" : "Create your account →"}
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.inner}>
          <div style={s.footerTop}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={s.brandBox}>SATI</div>
                <span style={{ color:C.white, fontWeight:700, fontSize:15 }}>Alumni Portal</span>
              </div>
              <p style={s.footerDesc}>
                Samrat Ashok Technological Institute<br/>
                Vidisha, Madhya Pradesh — 464001<br/>
                Connecting generations of SATI engineers.
              </p>
              <a
                href="https://www.satiengg.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={s.collegeLink}
              >
                🌐 Visit official college website →
              </a>
            </div>
            <div style={s.footerLinks}>
              <span style={s.footerHead}>Quick links</span>
              {isLoggedIn
                ? <button onClick={()=>navigate("/dashboard")} style={s.footerLink}>Dashboard</button>
                : <button onClick={()=>navigate("/login")}     style={s.footerLink}>Login / Register</button>
              }
              <button onClick={()=>navigate("/jobs")}   style={s.footerLink}>Jobs</button>
              <button onClick={()=>navigate("/events")} style={s.footerLink}>Events</button>
              <button onClick={()=>navigate("/about")}  style={s.footerLink}>About</button>
              <a href="https://www.satiengg.in/" target="_blank" rel="noopener noreferrer" style={{ ...s.footerLink, textDecoration:"none", display:"block" }}>College Website ↗</a>
            </div>
          </div>
          <div style={s.footerBottom}>
            © {new Date().getFullYear()} SATI Alumni Portal · Built with React + Spring Boot
          </div>
        </div>
      </footer>

      {/* ── Responsive CSS ── */}
      <style>{`
        .about-ham { display: none !important; }
        @media (max-width: 640px) {
          .about-ham { display: flex !important; }
          .about-nav-links { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ───── styles ───── */
const s = {
  page: { background:"linear-gradient(135deg, var(--color-dark-bg) 0%, var(--color-dark-card) 100%)", color:C.white, fontFamily:"var(--font-primary)", minHeight:"100vh" },

  nav: { background:C.navy2, borderBottom:"1px solid var(--color-border)", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(10px)" },
  navInner: { maxWidth:1100, margin:"0 auto", padding:"0 24px", height:70, display:"flex", alignItems:"center", justifyContent:"space-between" },
  brand: { display:"flex", alignItems:"center", gap:12 },
  brandBox: { width:40, height:40, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:C.navy, flexShrink:0, boxShadow:"0 4px 12px rgba(212,165,116,0.3)" },
  brandText: { fontSize:15, fontWeight:700, color:C.white },
  navLinks: { display:"flex", alignItems:"center", gap:12 },
  navLink: { background:"none", border:"none", color:C.muted, fontSize:14, cursor:"pointer", padding:"9px 16px", borderRadius:8, transition:"all 0.3s ease" },
  navLinkPrimary: { background:`linear-gradient(135deg,${C.gold},${C.gold2})`, border:"none", color:C.navy, fontSize:13, fontWeight:700, cursor:"pointer", padding:"10px 20px", borderRadius:8, boxShadow:"0 4px 12px rgba(212,165,116,0.3)", transition:"all 0.3s ease" },
  navLinkGhost: { background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", color:"#fca5a5", fontSize:13, cursor:"pointer", padding:"9px 18px", borderRadius:8, transition:"all 0.3s ease" },
  ham: { display:"flex", flexDirection:"column", gap:5, background:"none", border:"none", cursor:"pointer", padding:6, transition:"all 0.3s ease" },
  hamLine: { display:"block", width:22, height:2, background:C.muted, borderRadius:2, transition:"all 0.3s ease" },
  drawer: { background:C.navy2, borderTop:"1px solid var(--color-border-light)", padding:"16px 24px 20px", display:"flex", flexDirection:"column", gap:12 },
  drawerLink: { background:"none", border:"none", color:C.muted, fontSize:15, cursor:"pointer", padding:"11px 0", textAlign:"left", transition:"all 0.3s ease" },
  drawerLinkPrimary: { background:`linear-gradient(135deg,${C.gold},${C.gold2})`, border:"none", color:C.navy, fontSize:14, fontWeight:700, cursor:"pointer", padding:"13px 20px", borderRadius:8, textAlign:"center", boxShadow:"0 4px 12px rgba(212,165,116,0.3)", transition:"all 0.3s ease" },

  hero: { padding:"100px 24px 80px", textAlign:"center" },
  heroInner: { maxWidth:760, margin:"0 auto" },
  heroBadge: { display:"inline-block", background:"rgba(212,165,116,0.12)", color:C.gold2, border:"1px solid rgba(212,165,116,0.25)", padding:"8px 18px", borderRadius:20, fontSize:12, fontWeight:700, marginBottom:28, letterSpacing:"0.3px", backdrop:"blur(10px)" },
  heroTitle: { fontSize:"clamp(32px,8vw,56px)", fontWeight:800, lineHeight:1.15, margin:"0 0 24px", color:C.white, fontFamily:"var(--font-accent)", letterSpacing:"-0.02em" },
  heroSub: { fontSize:"clamp(15px,3vw,18px)", color:C.muted, lineHeight:1.8, margin:"0 auto 42px", maxWidth:580 },
  heroBtns: { display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" },

  btnPrimary: { background:`linear-gradient(135deg,${C.gold},${C.gold2})`, border:"none", color:C.navy, fontSize:15, fontWeight:700, cursor:"pointer", padding:"14px 32px", borderRadius:10, boxShadow:"0 4px 16px rgba(212,165,116,0.3)", transition:"all 0.3s ease" },
  btnOutline: { background:"rgba(255,255,255,0.05)", border:`1px solid var(--color-border)`, color:C.gold2, fontSize:15, fontWeight:600, cursor:"pointer", padding:"14px 32px", borderRadius:10, transition:"all 0.3s ease" },

  statsSection: { background:C.navy2, padding:"48px 24px", borderTop:"1px solid var(--color-border-light)", borderBottom:"1px solid var(--color-border-light)" },
  statsGrid: { maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:18 },
  statCard: { background:"rgba(212,165,116,0.08)", border:"1px solid var(--color-border)", borderRadius:14, padding:"24px 18px", textAlign:"center", transition:"all 0.3s ease" },
  statNum: { fontSize:"clamp(28px,6vw,38px)", fontWeight:800, color:C.gold2, marginBottom:8 },
  statLabel: { fontSize:13, color:C.muted, fontWeight:600 },

  section: { padding:"80px 24px" },
  inner: { maxWidth:1100, margin:"0 auto" },
  sectionLabel: { fontSize:12, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:C.gold, marginBottom:12, opacity:0.8 },
  sectionTitle: { fontSize:"clamp(24px,6vw,36px)", fontWeight:800, color:C.white, marginBottom:48, lineHeight:1.2, fontFamily:"var(--font-accent)" },

  featGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 },
  featCard: { background:C.navy2, border:"1px solid var(--color-border)", borderRadius:16, padding:"28px 24px", transition:"all 0.3s ease" },
  featIcon: { fontSize:32, marginBottom:16 },
  featTitle: { fontSize:16, fontWeight:700, color:C.white, marginBottom:10 },
  featDesc: { fontSize:13, color:C.muted, lineHeight:1.7 },

  stepsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:24 },
  stepCard: { background:"rgba(255,255,255,0.03)", border:"1px solid var(--color-border)", borderRadius:16, padding:"28px 24px", transition:"all 0.3s ease" },
  stepNum: { fontSize:38, fontWeight:800, color:"rgba(212,165,116,0.2)", marginBottom:14, lineHeight:1 },
  stepTitle: { fontSize:16, fontWeight:700, color:C.white, marginBottom:10 },
  stepDesc: { fontSize:13, color:C.muted, lineHeight:1.7 },

  audienceGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:28 },
  audienceCard: { background:C.navy2, border:"1px solid var(--color-border)", borderRadius:18, padding:"32px 28px", transition:"all 0.3s ease" },
  badge: { display:"inline-block", padding:"6px 16px", borderRadius:20, fontSize:12, fontWeight:700, marginBottom:16 },
  audienceTitle: { fontSize:18, fontWeight:700, color:C.white, marginBottom:18 },
  list: { listStyle:"none", padding:0, margin:0 },
  listItem: { fontSize:14, color:C.muted, padding:"11px 0", borderBottom:"1px solid var(--color-border-light)", display:"flex", alignItems:"center", gap:12 },
  check: { color:"var(--color-accent-green)", fontWeight:700, fontSize:15, flexShrink:0 },

  ctaWrap: { padding:"0 24px 64px" },
  ctaBox: { maxWidth:1100, margin:"0 auto", background:`linear-gradient(135deg, ${C.navy3} 0%, rgba(212,165,116,0.08) 100%)`, border:"1px solid var(--color-border)", borderRadius:20, padding:"64px 32px", textAlign:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.24)" },
  ctaTitle: { fontSize:"clamp(22px,6vw,32px)", fontWeight:800, color:C.white, marginBottom:14, fontFamily:"var(--font-accent)" },
  ctaSub: { fontSize:16, color:C.muted, marginBottom:36 },

  footer: { background:C.navy2, borderTop:"1px solid var(--color-border-light)", padding:"54px 24px 28px" },
  footerTop: { display:"flex", gap:54, flexWrap:"wrap", marginBottom:44, justifyContent:"space-between" },
  footerDesc: { fontSize:13, color:C.muted, lineHeight:1.8, marginTop:12 },
  footerLinks: { display:"flex", flexDirection:"column", gap:8 },
  footerHead: { fontSize:11, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", color:C.gold, marginBottom:8 },
  footerLink: { background:"none", border:"none", color:C.muted, fontSize:13, cursor:"pointer", textAlign:"left", padding:"4px 0", transition:"all 0.3s ease" },
  footerBottom: { borderTop:"1px solid var(--color-border-light)", paddingTop:24, fontSize:12, color:C.muted },
  collegeLink: { display:"inline-block", marginTop:14, fontSize:13, color:C.gold2, textDecoration:"none", borderBottom:`1px solid rgba(212,165,116,0.35)`, paddingBottom:2, transition:"all 0.3s ease" },
};

export default About;