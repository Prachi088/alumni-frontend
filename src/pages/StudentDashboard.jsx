import { useState, useEffect } from "react";
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
  primary: "var(--color-primary)",
  green: "var(--color-accent-green)",
  blue: "var(--color-accent-blue)",
};

const S = {
  portal:    { display:"flex", minHeight:"100vh", fontFamily:"var(--font-primary)", background:C.navy, color:C.white },
  sidebar:   { width:260, background:C.navy2, borderRight:"1px solid var(--color-border)", display:"flex", flexDirection:"column", flexShrink:0, boxShadow:"0 4px 16px rgba(0,0,0,0.2)" },
  brand:     { padding:"24px 20px 16px", borderBottom:"1px solid var(--color-border-light)" },
  brandLogo: { width:48, height:48, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:C.navy, marginBottom:10, boxShadow:"0 4px 12px rgba(212,165,116,0.3)", transition:"all 0.3s ease" },
  navSec:    { padding:"16px 14px 6px", fontSize:11, color:C.gold, letterSpacing:"1.5px", fontWeight:700, textTransform:"uppercase" },
  main:      { flex:1, overflow:"auto" },
  topbar:    { padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--color-border-light)", background:"rgba(15,20,25,0.9)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(10px)" },
  content:   { padding:"24px 28px" },
  card:      { background:C.navy2, border:"1px solid var(--color-border)", borderRadius:14, padding:22, marginBottom:24, transition:"all 0.3s ease", boxShadow:"var(--shadow-sm)" },
  cardTitle: { fontSize:16, fontWeight:700, color:C.white, marginBottom:16, fontFamily:"var(--font-accent)", letterSpacing:"-0.01em" },
  input:     { width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid var(--color-border)", background:"rgba(255,255,255,0.05)", color:C.white, fontSize:13, marginBottom:12, boxSizing:"border-box", fontFamily:"inherit", transition:"all 0.3s ease" },
  btn:       { padding:"10px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit", transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)" },
  statsRow:  { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:16, marginBottom:24 },
  statCard:  { background:C.navy2, border:"1px solid var(--color-border)", borderRadius:14, padding:20, transition:"all 0.3s ease", boxShadow:"var(--shadow-sm)", position:"relative", overflow:"hidden" },
  flash:     { padding:"12px 18px", borderRadius:10, marginBottom:18, fontSize:13, fontWeight:600, border:"1px solid", display:"flex", alignItems:"center", gap:10 },
};

function NavItem({ icon, label, active, onClick }) {
  const [hov, setHov] = useState(false);
  const base = { display:"flex", alignItems:"center", gap:11, padding:"11px 16px", margin:"3px 8px", borderRadius:9, cursor:"pointer", fontSize:13, transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", fontWeight:"500" };
  const style = active
    ? { ...base, background:"rgba(212,165,116,0.15)", color:C.gold2, fontWeight:600, borderLeft:`3px solid ${C.gold}`, paddingLeft:13 }
    : hov
    ? { ...base, background:"rgba(148,163,184,0.1)", color:C.white }
    : { ...base, color:C.muted };
  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize:16 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Profile editor (same as Alumni's ProfileInline) ───────────────────────────
function ProfileInline({ userId, flash }) {
  const [isEditing,   setIsEditing]   = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [profile,     setProfile]     = useState({ name:"", email:"", role:"", batch:"", branch:"", company:"", skills:"" });

  useEffect(() => {
    fetch(`${API_URL}/api/users/${userId}`)
      .then(r => r.json())
      .then(data => setProfile({
        name:    data.name    || "",
        email:   data.email   || "",
        role:    data.role    || "",
        batch:   data.batch   || "",
        branch:  data.branch  || "",
        company: data.company || "",
        skills:  data.skills  || "",
      }))
      .catch(() => {});
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...profile };
    if (newPassword) payload.password = newPassword;
    try {
      const res = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("name", updated.name);
        setProfile(p => ({ ...p, ...updated }));
        setNewPassword("");
        flash("✅ Profile saved!", true);
        setIsEditing(false);
      } else {
        flash("❌ Save failed", false);
      }
    } catch {
      flash("❌ Cannot reach server", false);
    }
    setSaving(false);
  };

  const inputStyle = {
    width:"100%", padding:"11px 14px", borderRadius:9,
    border:"1px solid var(--color-border)", background:"rgba(255,255,255,0.05)",
    color:C.white, fontSize:13, outline:"none", boxSizing:"border-box", marginBottom:3,
    fontFamily:"inherit", transition:"all 0.3s ease",
  };

  const Field = ({ label, fieldKey, type="text" }) => (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:11, color:C.muted, fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      {isEditing
        ? <input type={type} value={profile[fieldKey]} onChange={e => setProfile({ ...profile, [fieldKey]: e.target.value })} style={inputStyle} />
        : <div style={{ fontSize:14, color:C.white, padding:"10px 0", borderBottom:"1px solid var(--color-border-light)", fontWeight:"500" }}>{profile[fieldKey] || <span style={{ color:C.muted, fontStyle:"italic" }}>—</span>}</div>
      }
    </div>
  );

  return (
        <div style={{ maxWidth:600 }}>
      <div style={{ fontSize:22, fontWeight:800, color:C.white, marginBottom:24, fontFamily:"var(--font-accent)", letterSpacing:"-0.01em" }}>👤 My Profile</div>
      <div style={{ background:`linear-gradient(135deg, ${C.navy2} 0%, rgba(30,41,59,0.8) 100%)`, border:"1px solid var(--color-border)", borderRadius:16, padding:32, backdropFilter:"blur(10px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:32 }}>
          <div style={{ width:68, height:68, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:24, color:C.navy, boxShadow:"0 8px 24px rgba(212,165,116,0.3)" }}>
            {(profile.name || "?")[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white }}>{profile.name || "—"}</div>
            <div style={{ fontSize:12, color:C.blue, marginTop:4, fontWeight:600 }}>📚 Student</div>
          </div>
        </div>
        <Field label="Full Name"    fieldKey="name" />
        <Field label="Email"        fieldKey="email" type="email" />
        <Field label="Batch / Year" fieldKey="batch" />
        <Field label="Branch"       fieldKey="branch" />
        <Field label="Skills"       fieldKey="skills" />
        {isEditing && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>New Password (leave blank to keep)</div>
            <input type="password" placeholder="Enter new password..." value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} />
          </div>
        )}
        <div style={{ display:"flex", gap:12, marginTop:24 }}>
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={saving} style={{ padding:"11px 24px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 12px rgba(212,165,116,0.3)", transition:"all 0.3s ease" }}>
                {saving ? "Saving..." : "✓ Save Changes"}
              </button>
              <button onClick={() => setIsEditing(false)} style={{ padding:"11px 20px", background:"rgba(148,163,184,0.1)", color:C.muted, border:"1px solid var(--color-border)", borderRadius:9, fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"all 0.3s ease" }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} style={{ padding:"11px 24px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 12px rgba(212,165,116,0.3)", transition:"all 0.3s ease" }}>
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main StudentDashboard ─────────────────────────────────────────────────────
export default function StudentDashboard() {
  const navigate = useNavigate();
  const userId   = Number(localStorage.getItem("userId"));
  const name     = localStorage.getItem("name") || "Student";

  const [tab,        setTab]      = useState("dashboard");
  const [jobs,       setJobs]     = useState([]);
  const [events,     setEvents]   = useState([]);
  const [alumni,     setAlumni]   = useState([]);
  const [appliedIds, setApplied]  = useState(() => JSON.parse(localStorage.getItem("appliedJobIds")  || "[]"));
  const [regIds,     setRegIds]   = useState(() => JSON.parse(localStorage.getItem("registeredEventIds") || "[]"));
  const [sentIds,    setSentIds]  = useState(() => JSON.parse(localStorage.getItem("sentRequestIds") || "[]"));
  const [acceptedIds, setAcceptedIds] = useState([]);
  const [flash,      setFlash]    = useState(null);
  const [search,     setSearch]   = useState("");
  const [apiError,   setApiError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showFlash = (msg, ok = true) => { setFlash({ msg, ok }); setTimeout(() => setFlash(null), 3000); };

  const fetchAll = () => {
    setApiError(null);
    let successCount = 0;

    fetch(`${API_URL}/api/jobs`).then(r => r.json()).then(setJobs).then(() => successCount++).catch(() => setApiError("Backend not reachable"));
    fetch(`${API_URL}/api/events`).then(r => r.json()).then(setEvents).then(() => successCount++).catch(() => setApiError("Backend not reachable"));
    fetch(`${API_URL}/api/users`).then(r => r.json()).then(d => setAlumni(d.filter(u => u.role === "alumni"))).then(() => successCount++).catch(() => setApiError("Backend not reachable"));
    fetch(`${API_URL}/api/connections/accepted/${userId}`).then(r => r.json()).then(data => setAcceptedIds(data.map(c => c.userId))).catch(() => {});
  };

  useEffect(() => { fetchAll(); }, []);

  const applyJob = async (job) => {
    if (appliedIds.includes(job.id)) { showFlash("Already applied!", false); return; }
    try {
      const res = await fetch(`${API_URL}/api/jobs/${job.id}/apply`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ userId }) });
      if (res.ok) {
        const updated = [...appliedIds, job.id];
        setApplied(updated); localStorage.setItem("appliedJobIds", JSON.stringify(updated));
        showFlash(`Applied to ${job.title}!`);
      } else showFlash("Failed to apply", false);
    } catch { showFlash("Backend not reachable", false); }
  };

  const registerEvent = async (event) => {
    if (regIds.includes(event.id)) { showFlash("Already registered!", false); return; }
    try {
      const res = await fetch(`${API_URL}/api/events/${event.id}/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ userId }) });
      if (res.ok) {
        const updated = [...regIds, event.id];
        setRegIds(updated); localStorage.setItem("registeredEventIds", JSON.stringify(updated));
        showFlash(`Registered for ${event.name}!`);
      } else showFlash("Failed to register", false);
    } catch { showFlash("Backend not reachable", false); }
  };

  const sendRequest = async (alumniId) => {
    if (sentIds.includes(alumniId)) { showFlash("Request already sent!", false); return; }
    try {
      const res = await fetch(`${API_URL}/api/connections/send`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ fromId: userId, toId: alumniId }) });
      if (res.ok) {
        const updated = [...sentIds, alumniId];
        setSentIds(updated); localStorage.setItem("sentRequestIds", JSON.stringify(updated));
        showFlash("Connection request sent!");
      } else showFlash("Failed to send request", false);
    } catch {
      const updated = [...sentIds, alumniId];
      setSentIds(updated); localStorage.setItem("sentRequestIds", JSON.stringify(updated));
      showFlash("Saved locally (backend offline)", false);
    }
  };

  const logout = () => { localStorage.clear(); navigate("/"); };
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const filteredAlumni = alumni.filter(a =>
    (a.name  || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const myJobs   = jobs.filter(j => appliedIds.includes(j.id));
  const myEvents = events.filter(e => regIds.includes(e.id));

  const NAV = [
    { id:"dashboard",   icon:"◼",  label:"Dashboard"                              },
    { id:"jobs",        icon:"💼", label:"Browse Jobs"                             },
    { id:"events",      icon:"📅", label:"Browse Events"                           },
    { id:"network",     icon:"🤝", label:"Find Alumni"                             },
    { id:"my-jobs",     icon:"📋", label:`My Applications (${myJobs.length})`      },
    { id:"my-events",   icon:"🗓", label:`My Events (${myEvents.length})`           },
    { id:"my-network",  icon:"📨", label:`Sent Requests (${sentIds.length})`       },
    { id:"profile",     icon:"👤", label:"My Profile"                              },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"var(--font-primary)", background:"linear-gradient(135deg, var(--color-dark-bg) 0%, var(--color-dark-card) 100%)", color:C.white, position:"relative", overflowX:"hidden", maxWidth:"100vw" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Dark overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <div onClick={()=>setSidebarOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200 }} />
      )}

      {/* Sidebar */}
      <aside style={{ ...S.sidebar, position:"fixed", top:0, left:0, bottom:0, zIndex:300, transition:"transform 0.3s ease" }} className="sati-sidebar">
        <div style={S.brand}>
          <div style={S.brandLogo}>SATI</div>
          <div style={{ fontSize:13, fontWeight:700, color:C.white }}>SATI Alumni Portal</div>
          <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Vidisha, M.P.</div>
        </div>
        <div style={S.navSec}>Menu</div>
        {NAV.slice(0, 7).map(n => <NavItem key={n.id} {...n} active={tab === n.id} onClick={() => { setTab(n.id); setSidebarOpen(false); }} />)}
        <div style={S.navSec}>Account</div>
        {NAV.slice(7).map(n => <NavItem key={n.id} {...n} active={tab === n.id} onClick={() => { setTab(n.id); setSidebarOpen(false); }} />)}
        <div style={{ marginTop:"auto", padding:18, borderTop:"1px solid var(--color-border-light)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, color:C.navy, boxShadow:"0 4px 12px rgba(212,165,116,0.3)" }}>{initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.white, overflow:"hidden", textOverflow:"ellipsis" }}>{name}</div>
              <div style={{ fontSize:11, color:C.blue, marginTop:2, fontWeight:600 }}>📚 Student</div>
            </div>
            <div onClick={() => { setTab("profile"); setSidebarOpen(false); }} style={{ cursor:"pointer", color:C.muted, fontSize:16, transition:"all 0.3s ease" }} title="Edit Profile">✏️</div>
          </div>
          <button onClick={logout} style={{ ...S.btn, background:"linear-gradient(135deg, var(--color-accent-red), #f87171)", color:"#fff", width:"100%", boxShadow:"0 4px 12px rgba(239,68,68,0.3)" }}>Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ ...S.main, marginLeft: 240, minWidth: 0, flex: 1, overflowX: "hidden" }} className="sati-main">
        <div style={S.topbar} className="sati-topbar">
          {/* Hamburger — shown only on mobile via CSS */}
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="dash-hamburger" style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"4px 8px", marginRight:12, flexDirection:"column", gap:5 }}>
            <span style={{ display:"block", width:22, height:2, background:C.white, borderRadius:2 }} />
            <span style={{ display:"block", width:22, height:2, background:C.white, borderRadius:2 }} />
            <span style={{ display:"block", width:22, height:2, background:C.white, borderRadius:2 }} />
          </button>
          <div style={{ flex:1, fontSize:19, fontWeight:800, color:C.white }}>
            {tab === "dashboard"  && "Dashboard"}
            {tab === "jobs"       && "Browse Jobs"}
            {tab === "events"     && "Browse Events"}
            {tab === "network"    && "Find Alumni"}
            {tab === "my-jobs"    && "My Applications"}
            {tab === "my-events"  && "My Registered Events"}
            {tab === "my-network" && "Sent Requests"}
            {tab === "profile"    && "My Profile"}
          </div>
          <div style={{ fontSize:12, color:C.muted }}>{new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</div>
        </div>

        <div style={S.content} className="sati-content">
          {apiError && (
            <div style={{ background:"rgba(239,68,68,0.1)", color:"#fca5a5", border:"1px solid rgba(239,68,68,0.3)", padding:"14px 18px", borderRadius:10, marginBottom:20, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:10 }}>
              <span>❌</span> {apiError} — Check API_URL or backend status
            </div>
          )}
          {flash && (
            <div style={{
              ...S.flash,
              background: flash.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
              color: flash.ok ? "#6ee7b7" : "#fca5a5",
              borderColor: flash.ok ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
              animation: "slideDown 0.3s ease-out"
            }}>
              <span style={{ fontSize: 16 }}>{flash.ok ? "✅" : "❌"}</span>
              <span>{flash.msg}</span>
            </div>
          )}

            {/* ── DASHBOARD ── */}
            {tab === "dashboard" && (
              <>
                <div style={S.statsRow} className="sati-stats-row">
                  <div style={{ ...S.statCard, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:"-40px", right:"-40px", width:120, height:120, background:"rgba(212,165,116,0.1)", borderRadius:"50%", pointerEvents:"none" }} />
                    <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.5px" }}>Jobs Available</div>
                    <div style={{ fontSize:32, fontWeight:800, color:C.white, marginTop:10, position:"relative", zIndex:1 }}>{jobs.length}</div>
                  </div>
                  <div style={{ ...S.statCard, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:"-40px", right:"-40px", width:120, height:120, background:"rgba(212,165,116,0.15)", borderRadius:"50%", pointerEvents:"none" }} />
                    <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.5px" }}>My Applications</div>
                    <div style={{ fontSize:32, fontWeight:800, color:C.gold, marginTop:10, position:"relative", zIndex:1 }}>{myJobs.length}</div>
                  </div>
                  <div style={{ ...S.statCard, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:"-40px", right:"-40px", width:120, height:120, background:"rgba(16,185,129,0.1)", borderRadius:"50%", pointerEvents:"none" }} />
                    <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:700, letterSpacing:"0.5px" }}>Events Registered</div>
                    <div style={{ fontSize:32, fontWeight:800, color:C.green, marginTop:10, position:"relative", zIndex:1 }}>{myEvents.length}</div>
                  </div>
                </div>
                <div style={S.card}>
                  <div style={S.cardTitle}>Quick Actions</div>
                  <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                    <button onClick={() => setTab("jobs")}    style={{ ...S.btn, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, boxShadow:"0 4px 12px rgba(212,165,116,0.3)" }}>💼 Browse Jobs</button>
                    <button onClick={() => setTab("events")}  style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid var(--color-border)" }}>📅 Browse Events</button>
                    <button onClick={() => setTab("network")} style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid var(--color-border)" }}>🤝 Find Alumni</button>
                    <button onClick={() => setTab("profile")} style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid var(--color-border)" }}>👤 My Profile</button>
                  </div>
                </div>
                {myJobs.length > 0 && (
                  <div style={S.card}>
                    <div style={S.cardTitle}>Recent Applications</div>
                    {myJobs.slice(0, 3).map(j => (
                      <div key={j.id} style={{ padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{j.company} · {j.location}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── JOBS ── */}
            {tab === "jobs" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Available Jobs ({jobs.length})</div>
                {jobs.length === 0 ? <div style={{ color:C.muted }}>No jobs available yet.</div> :
                  jobs.map(j => (
                    <div key={j.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }} className="sati-list-row">
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{j.company} · 📍 {j.location}</div>
                      </div>
                      <button
                        onClick={() => applyJob(j)}
                        disabled={appliedIds.includes(j.id)}
                        style={{
                          ...S.btn,
                          background: appliedIds.includes(j.id)
                            ? "rgba(148,163,184,0.1)"
                            : `linear-gradient(135deg,${C.gold},${C.gold2})`,
                          color: appliedIds.includes(j.id) ? C.muted : C.navy,
                          padding: "8px 16px",
                          cursor: appliedIds.includes(j.id) ? "default" : "pointer",
                          boxShadow: appliedIds.includes(j.id) ? "none" : "0 4px 12px rgba(212,165,116,0.3)",
                          opacity: appliedIds.includes(j.id) ? 0.6 : 1,
                        }}
                      >
                        {appliedIds.includes(j.id) ? "✔ Applied" : "Apply Now"}
                      </button>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── EVENTS ── */}
            {tab === "events" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Upcoming Events ({events.length})</div>
                {events.length === 0 ? <div style={{ color:C.muted }}>No events yet.</div> :
                  events.map(e => (
                    <div key={e.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }} className="sati-list-row">
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{e.name}</div>
                        <div style={{ fontSize:11, color:C.muted }}>📅 {e.date} · 📍 {e.location}</div>
                      </div>
                      <button
                        onClick={() => registerEvent(e)}
                        disabled={regIds.includes(e.id)}
                        style={{
                          ...S.btn,
                          background: regIds.includes(e.id)
                            ? "rgba(148,163,184,0.1)"
                            : "linear-gradient(135deg, rgba(16,185,129,0.8), rgba(34,197,94,0.8))",
                          color: regIds.includes(e.id) ? C.muted : "#fff",
                          padding: "8px 16px",
                          cursor: regIds.includes(e.id) ? "default" : "pointer",
                          boxShadow: regIds.includes(e.id) ? "none" : "0 4px 12px rgba(16,185,129,0.3)",
                          opacity: regIds.includes(e.id) ? 0.6 : 1,
                        }}
                      >
                        {regIds.includes(e.id) ? "✔ Registered" : "Register"}
                      </button>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── FIND ALUMNI ── */}
            {tab === "network" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Find & Connect with Alumni</div>
                <input style={S.input} placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
                {filteredAlumni.length === 0 ? <div style={{ color:C.muted }}>No alumni found.</div> :
                  filteredAlumni.map(a => (
                    <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }} className="sati-list-row">
                      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg, ${C.gold}, ${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.navy, fontSize:14, flexShrink:0, boxShadow:"0 4px 12px rgba(212,165,116,0.2)" }}>{(a.name || a.email || "A")[0].toUpperCase()}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{a.name || a.email}</div>
                          <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>🎓 Alumni · {a.enrollment || "SATI"}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => sendRequest(a.id)}
                        disabled={sentIds.includes(a.id)}
                        style={{
                          ...S.btn,
                          background: sentIds.includes(a.id)
                            ? "rgba(148,163,184,0.1)"
                            : `linear-gradient(135deg,${C.gold},${C.gold2})`,
                          color: sentIds.includes(a.id) ? C.muted : C.navy,
                          padding: "8px 16px",
                          cursor: sentIds.includes(a.id) ? "default" : "pointer",
                          boxShadow: sentIds.includes(a.id) ? "none" : "0 4px 12px rgba(212,165,116,0.3)",
                          opacity: sentIds.includes(a.id) ? 0.6 : 1,
                        }}
                      >
                        {sentIds.includes(a.id) ? "✔ Requested" : "Connect"}
                      </button>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── MY JOBS ── */}
            {tab === "my-jobs" && (
              <div style={S.card}>
                <div style={S.cardTitle}>My Job Applications ({myJobs.length})</div>
                {myJobs.length === 0 ? <div style={{ color:C.muted }}>No applications yet. Browse jobs and apply!</div> :
                  myJobs.map(j => (
                    <div key={j.id} style={{ padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
                      <div style={{ fontSize:11, color:C.muted }}>{j.company} · 📍 {j.location}</div>
                      <span style={{ fontSize:11, color:"#81C784", fontWeight:600, marginTop:4, display:"inline-block" }}>✔ Applied</span>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── MY EVENTS ── */}
            {tab === "my-events" && (
              <div style={S.card}>
                <div style={S.cardTitle}>My Registered Events ({myEvents.length})</div>
                {myEvents.length === 0 ? <div style={{ color:C.muted }}>No events registered yet. Browse events and register!</div> :
                  myEvents.map(e => (
                    <div key={e.id} style={{ padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{e.name}</div>
                      <div style={{ fontSize:11, color:C.muted }}>📅 {e.date} · 📍 {e.location}</div>
                      <span style={{ fontSize:11, color:"#81C784", fontWeight:600, marginTop:4, display:"inline-block" }}>✔ Registered</span>
                    </div>
                  ))
                }
              </div>
            )}

            {/* ── SENT REQUESTS ── */}
            {tab === "my-network" && (
              <div style={S.card}>
                <div style={S.cardTitle}>Sent Connection Requests ({sentIds.length})</div>
                {sentIds.length === 0
                  ? <div style={{ color:C.muted }}>No requests sent yet. Go to Find Alumni to connect!</div>
                  : alumni.filter(a => sentIds.includes(a.id)).map(a => {
                      const isAccepted = acceptedIds.includes(a.id);
                      return (
                        <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold2, fontSize:13 }}>{(a.name || a.email || "A")[0].toUpperCase()}</div>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{a.name || a.email}</div>
                            {isAccepted
                              ? <div style={{ fontSize:11, color:"#81C784", fontWeight:600 }}>✔ Connected</div>
                              : <div style={{ fontSize:11, color:"#E8B55A", fontWeight:600 }}>⏳ Request Pending</div>
                            }
                          </div>
                        </div>
                      );
                    })
                }
              </div>
            )}

            {/* ── PROFILE ── */}
            {tab === "profile" && (
              <ProfileInline userId={userId} flash={showFlash} />
            )}

          </div>
        </main>
      </div>
  );
}