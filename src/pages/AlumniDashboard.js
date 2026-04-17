import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  navy:"#0B1D35", navy2:"#112444", navy3:"#1a3258",
  gold:"#C8963E", gold2:"#E8B55A", gold3:"#F5D078",
  muted:"#8A9AB5", white:"#FFFFFF",
};

const S = {
  portal:     { display:"flex", minHeight:"100vh", fontFamily:"'Open Sans','Roboto',Arial,sans-serif", background:C.navy, color:C.white },
  sidebar:    { width:260, background:C.navy2, borderRight:"1px solid rgba(200,150,62,0.15)", display:"flex", flexDirection:"column", flexShrink:0 },
  brand:      { padding:"28px 24px 20px", borderBottom:"1px solid rgba(200,150,62,0.12)" },
  brandLogo:  { width:48, height:48, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, color:C.navy, marginBottom:10 },
  brandName:  { fontSize:14, fontWeight:700, color:C.white, lineHeight:1.3 },
  navSection: { padding:"20px 16px 8px", fontSize:10, color:C.gold, letterSpacing:"1.5px", fontWeight:700, textTransform:"uppercase" },
  navBadge:   { marginLeft:"auto", background:C.gold, color:C.navy, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20 },
  sidebarFoot:{ marginTop:"auto", padding:20, borderTop:"1px solid rgba(200,150,62,0.12)" },
  avatar:     { width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, color:C.navy, flexShrink:0 },
  main:       { flex:1, overflow:"auto", background:C.navy },
  topbar:     { padding:"20px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(200,150,62,0.10)", background:"rgba(11,29,53,0.85)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:10 },
  content:    { padding:"28px 32px" },
  statsRow:   { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 },
  statCard:   { background:C.navy2, border:"1px solid rgba(200,150,62,0.15)", borderRadius:14, padding:20, cursor:"pointer", transition:"border 0.2s" },
  card:       { background:C.navy2, border:"1px solid rgba(200,150,62,0.12)", borderRadius:14, padding:22, marginBottom:20 },
  cardHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 },
  cardTitle:  { fontSize:15, fontWeight:700, color:C.white },
  form:       { display:"flex", gap:10, flexWrap:"wrap", marginBottom:20 },
  input:      { padding:"10px 14px", borderRadius:8, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.07)", color:C.white, outline:"none", fontSize:13, fontFamily:"'Open Sans',sans-serif" },
  postBtn:    { background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", padding:"10px 20px", borderRadius:8, cursor:"pointer", fontWeight:700, fontSize:13 },
  deleteBtn:  { marginTop:10, background:"rgba(239,68,68,0.15)", color:"#ef9090", border:"1px solid rgba(239,68,68,0.3)", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 },
  grid:       { display:"flex", gap:16, flexWrap:"wrap" },
  itemCard:   { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(200,150,62,0.12)", padding:18, borderRadius:12, width:200 },
  badge:      { color:"#4ade80", fontSize:12, fontWeight:600 },
  banner:     { background:`linear-gradient(135deg,${C.navy3} 0%,rgba(200,150,62,0.15) 100%)`, border:"1px solid rgba(200,150,62,0.25)", borderRadius:16, padding:"24px 28px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between" },
};

function NavItem({ icon, label, badge, active, onClick }) {
  const [hov, setHov] = useState(false);
  const base = { display:"flex", alignItems:"center", gap:12, padding:"10px 16px", margin:"2px 8px", borderRadius:8, cursor:"pointer", fontSize:13, transition:"all 0.2s" };
  const style = active
    ? { ...base, background:"rgba(200,150,62,0.15)", color:C.gold2, fontWeight:600, borderLeft:`3px solid ${C.gold}` }
    : hov ? { ...base, background:"rgba(200,150,62,0.08)", color:C.white } : { ...base, color:C.muted };
  return (
    <div style={style} onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <span style={{ fontSize:16, width:20, textAlign:"center" }}>{icon}</span>
      {label}
      {badge && <span style={S.navBadge}>{badge}</span>}
    </div>
  );
}

function AlumniDashboard() {
  const navigate = useNavigate();
  const [jobs,        setJobs]        = useState([]);
  const [events,      setEvents]      = useState([]);
  const [connections, setConnections] = useState([]);
  const [requests,    setRequests]    = useState([]);
  const [activeNav,   setActiveNav]   = useState("dashboard");
  const [newJob,      setNewJob]      = useState({ title:"", company:"", location:"" });
  const [newEvent,    setNewEvent]    = useState({ name:"", date:"", location:"" });
  const [loading,     setLoading]     = useState(false);
  const [msg,         setMsg]         = useState("");

  const alumniId   = Number(localStorage.getItem("userId")) || 1;
  const alumniName = localStorage.getItem("name") || localStorage.getItem("userName") || "Alumni";
  const initials   = alumniName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const flash = (text) => { setMsg(text); setTimeout(()=>setMsg(""), 3000); };

  const fetchData = () => {
    fetch("http://localhost:9090/api/jobs")
      .then(r=>r.json())
      .then(data=>setJobs(data.filter(j=>j.postedBy===alumniId)))
      .catch(()=>{});

    fetch("http://localhost:9090/api/events")
      .then(r=>r.json())
      .then(data=>setEvents(data.filter(e=>e.postedBy===alumniId)))
      .catch(()=>{});

    fetch(`http://localhost:9090/api/connections/accepted/${alumniId}`)
      .then(r=>r.json()).then(setConnections).catch(()=>{});

    fetch(`http://localhost:9090/api/connections/pending/${alumniId}`)
      .then(r=>r.json()).then(setRequests).catch(()=>{});
  };

  useEffect(() => { fetchData(); }, [alumniId]);

  const handlePostJob = async () => {
    if (!newJob.title || !newJob.company) { flash("⚠ Title and Company are required"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9090/api/jobs", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...newJob, postedBy: alumniId }),
      });
      const saved = await res.json();
      setJobs(prev=>[...prev, saved]);
      setNewJob({ title:"", company:"", location:"" });
      flash("✅ Job posted!");
    } catch { flash("❌ Backend not reachable"); }
    setLoading(false);
  };

  const handlePostEvent = async () => {
    if (!newEvent.name || !newEvent.date) { flash("⚠ Name and Date are required"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9090/api/events", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...newEvent, postedBy: alumniId }),
      });
      const saved = await res.json();
      setEvents(prev=>[...prev, saved]);
      setNewEvent({ name:"", date:"", location:"" });
      flash("✅ Event posted!");
    } catch { flash("❌ Backend not reachable"); }
    setLoading(false);
  };

  const handleDeleteJob = async (id) => {
    await fetch(`http://localhost:9090/api/jobs/${id}`, { method:"DELETE" });
    setJobs(prev=>prev.filter(j=>j.id!==id));
    flash("🗑 Job deleted");
  };

  const handleDeleteEvent = async (id) => {
    await fetch(`http://localhost:9090/api/events/${id}`, { method:"DELETE" });
    setEvents(prev=>prev.filter(e=>e.id!==id));
    flash("🗑 Event deleted");
  };

  const handleAccept = async (id) => {
    await fetch(`http://localhost:9090/api/connections/accept/${id}`, { method:"PUT" });
    setRequests(prev=>prev.filter(r=>r.id!==id));
    flash("✅ Connection accepted");
    fetch(`http://localhost:9090/api/connections/accepted/${alumniId}`)
      .then(r=>r.json()).then(setConnections).catch(()=>{});
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:9090/api/connections/reject/${id}`, { method:"PUT" });
    setRequests(prev=>prev.filter(r=>r.id!==id));
    flash("Request declined");
  };

  const logout = () => { localStorage.clear(); navigate("/"); };

  const NAV = [
    { id:"dashboard", icon:"◼",  label:"Dashboard"                                          },
    { id:"jobs",      icon:"💼", label:"My Job Posts",  badge: jobs.length       || null    },
    { id:"events",    icon:"📅", label:"My Events",     badge: events.length     || null    },
    { id:"requests",  icon:"🔔", label:"Requests",      badge: requests.length   || null    },
    { id:"network",   icon:"🤝", label:"Connections",   badge: connections.length|| null    },
    { id:"profile",   icon:"👤", label:"Profile"                                             },
    { id:"settings",  icon:"⚙",  label:"Settings"                                            },
  ];

  const renderContent = () => {
    switch (activeNav) {

      case "jobs": return (
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>📢 Post a Job</div>
          <div style={S.form}>
            <input placeholder="Job Title *"  value={newJob.title}    onChange={e=>setNewJob({...newJob,title:e.target.value})}    style={S.input} />
            <input placeholder="Company *"    value={newJob.company}  onChange={e=>setNewJob({...newJob,company:e.target.value})}  style={S.input} />
            <input placeholder="Location"     value={newJob.location} onChange={e=>setNewJob({...newJob,location:e.target.value})} style={S.input} />
            <button onClick={handlePostJob} style={S.postBtn} disabled={loading}>Post Job</button>
          </div>
          <div style={S.grid}>
            {jobs.length===0 && <p style={{ color:C.muted }}>No jobs posted yet.</p>}
            {jobs.map(j=>(
              <div key={j.id} style={S.itemCard}>
                <div style={{ fontSize:14, fontWeight:700, color:C.white, marginBottom:6 }}>{j.title}</div>
                <div style={{ fontSize:12, color:C.gold }}>{j.company}</div>
                <div style={{ fontSize:12, color:C.muted }}>📍 {j.location}</div>
                <button onClick={()=>handleDeleteJob(j.id)} style={S.deleteBtn}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      );

      case "events": return (
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>🗓️ Post an Event</div>
          <div style={S.form}>
            <input placeholder="Event Name *"      value={newEvent.name}     onChange={e=>setNewEvent({...newEvent,name:e.target.value})}     style={S.input} />
            <input placeholder="Date (e.g May 10)" value={newEvent.date}     onChange={e=>setNewEvent({...newEvent,date:e.target.value})}     style={S.input} />
            <input placeholder="Location"          value={newEvent.location} onChange={e=>setNewEvent({...newEvent,location:e.target.value})} style={S.input} />
            <button onClick={handlePostEvent} style={S.postBtn} disabled={loading}>Post Event</button>
          </div>
          <div style={S.grid}>
            {events.length===0 && <p style={{ color:C.muted }}>No events posted yet.</p>}
            {events.map(e=>(
              <div key={e.id} style={S.itemCard}>
                <div style={{ fontSize:14, fontWeight:700, color:C.white, marginBottom:6 }}>{e.name}</div>
                <div style={{ fontSize:12, color:C.gold }}>📅 {e.date}</div>
                <div style={{ fontSize:12, color:C.muted }}>📍 {e.location}</div>
                <button onClick={()=>handleDeleteEvent(e.id)} style={S.deleteBtn}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      );

      case "requests": return (
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>🔔 Connection Requests</div>
          {requests.length===0
            ? <p style={{ color:C.muted }}>No pending requests.</p>
            : requests.map(r=>(
              <div key={r.id} style={{ ...S.card, display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold }}>
                    {(r.name||"?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:C.white }}>{r.name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{r.role||r.email}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={()=>handleAccept(r.id)} style={{ background:"#16a34a", color:"#fff", border:"none", padding:"7px 16px", borderRadius:7, cursor:"pointer", fontWeight:600 }}>✔ Accept</button>
                  <button onClick={()=>handleReject(r.id)} style={{ background:"rgba(239,68,68,0.15)", color:"#ef9090", border:"1px solid rgba(239,68,68,0.3)", padding:"7px 16px", borderRadius:7, cursor:"pointer" }}>✖ Decline</button>
                </div>
              </div>
            ))
          }
        </div>
      );

      case "network": return (
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>🤝 Your Connections</div>
          {connections.length===0
            ? <p style={{ color:C.muted }}>No connections yet.</p>
            : <div style={S.grid}>
                {connections.map(c=>(
                  <div key={c.id} style={S.itemCard}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold, marginBottom:10 }}>
                      {(c.name||"?")[0].toUpperCase()}
                    </div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{c.name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{c.role}</div>
                    <span style={S.badge}>✔ Connected</span>
                  </div>
                ))}
              </div>
          }
        </div>
      );

      case "profile": return (
        <ProfileInline userId={alumniId} alumniName={alumniName} flash={flash} />
      );

      case "settings": return (
        <div style={S.card}>
          <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:16 }}>⚙ Settings</div>
          <p style={{ color:C.muted, fontSize:13 }}>Settings coming soon.</p>
          <button onClick={logout} style={{ marginTop:16, padding:"10px 22px", background:"rgba(239,68,68,0.15)", color:"#ef9090", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 }}>
            Logout
          </button>
        </div>
      );

      default: return (
        <>
          <div style={S.banner}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:6 }}>Welcome back, {alumniName} 👋</h2>
              <p style={{ fontSize:13, color:C.muted, lineHeight:1.65, maxWidth:500 }}>
                You've posted {jobs.length} jobs and {events.length} events. You have {requests.length} pending connection request{requests.length!==1?"s":""}.
              </p>
            </div>
            <button onClick={()=>setActiveNav("jobs")} style={S.postBtn}>Post a Job →</button>
          </div>

          <div style={S.statsRow}>
            {[
              { icon:"💼", label:"Jobs Posted",   value:jobs.length,        color:"#E8B55A", nav:"jobs"      },
              { icon:"📅", label:"Events Posted", value:events.length,      color:"#90B8E8", nav:"events"    },
              { icon:"🤝", label:"Connections",   value:connections.length, color:"#81C784", nav:"network"   },
              { icon:"🔔", label:"Pending Req.",  value:requests.length,    color:"#CE93D8", nav:"requests"  },
            ].map((s,i)=>(
              <div key={i} style={S.statCard} onClick={()=>setActiveNav(s.nav)}>
                <div style={{ fontSize:22, marginBottom:10 }}>{s.icon}</div>
                <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:6, fontWeight:600 }}>{s.label}</div>
                <div style={{ fontSize:30, fontWeight:800, color:s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={S.card}>
            <div style={S.cardHeader}>
              <div style={S.cardTitle}>Your Job Posts</div>
              <div onClick={()=>setActiveNav("jobs")} style={{ fontSize:12, color:C.gold, cursor:"pointer", fontWeight:600 }}>+ Post New →</div>
            </div>
            {jobs.length===0
              ? <p style={{ color:C.muted, fontSize:13 }}>No jobs posted yet. <span style={{ color:C.gold, cursor:"pointer" }} onClick={()=>setActiveNav("jobs")}>Post one →</span></p>
              : <div style={S.grid}>{jobs.slice(0,4).map(j=>(
                  <div key={j.id} style={S.itemCard}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white }}>{j.title}</div>
                    <div style={{ fontSize:12, color:C.gold, marginTop:4 }}>{j.company}</div>
                    <div style={{ fontSize:12, color:C.muted }}>📍 {j.location}</div>
                  </div>
                ))}</div>
            }
          </div>

          {requests.length>0 && (
            <div style={S.card}>
              <div style={S.cardHeader}>
                <div style={S.cardTitle}>🔔 Pending Requests ({requests.length})</div>
                <div onClick={()=>setActiveNav("requests")} style={{ fontSize:12, color:C.gold, cursor:"pointer", fontWeight:600 }}>View All →</div>
              </div>
              {requests.slice(0,3).map(r=>(
                <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize:13, color:C.white, fontWeight:600 }}>{r.name} <span style={{ color:C.muted, fontWeight:400 }}>wants to connect</span></div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>handleAccept(r.id)} style={{ background:"#16a34a", color:"#fff", border:"none", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 }}>Accept</button>
                    <button onClick={()=>handleReject(r.id)} style={{ background:"rgba(239,68,68,0.15)", color:"#ef9090", border:"1px solid rgba(239,68,68,0.3)", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 }}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.portal}>
        <aside style={S.sidebar}>
          <div style={S.brand}>
            <div style={S.brandLogo}>SATI</div>
            <div style={S.brandName}>SATI Alumni Portal</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Samrat Ashok Technological Institute</div>
            <div style={{ marginTop:6, fontSize:10, padding:"3px 10px", borderRadius:20, background:"rgba(200,150,62,0.15)", color:C.gold2, display:"inline-block", fontWeight:700 }}>ALUMNI</div>
          </div>

          <div style={S.navSection}>Main</div>
          {NAV.slice(0,5).map(n=><NavItem key={n.id} {...n} active={activeNav===n.id} onClick={()=>setActiveNav(n.id)} />)}

          <div style={S.navSection}>Account</div>
          {NAV.slice(5).map(n=><NavItem key={n.id} {...n} active={activeNav===n.id} onClick={()=>setActiveNav(n.id)} />)}

          <div style={S.sidebarFoot}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={S.avatar}>{initials}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{alumniName}</div>
                <div style={{ fontSize:11, color:C.gold }}>Alumni</div>
              </div>
              <div onClick={()=>setActiveNav("profile")} style={{ marginLeft:"auto", cursor:"pointer", color:C.muted, fontSize:15 }} title="Edit Profile">✏</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.topbar}>
            <div>
              <div style={{ fontSize:19, fontWeight:800, color:C.white }}>{NAV.find(n=>n.id===activeNav)?.label||"Dashboard"}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · SATI Alumni Network</div>
            </div>
            <button onClick={logout} style={{ background:"rgba(239,68,68,0.12)", color:"#ef9090", border:"1px solid rgba(239,68,68,0.25)", padding:"8px 18px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>
              Logout
            </button>
          </div>

          <div style={S.content}>
            {msg && <div style={{ background:"rgba(200,150,62,0.15)", border:"1px solid rgba(200,150,62,0.3)", color:C.gold2, padding:"10px 18px", borderRadius:8, marginBottom:20, fontSize:13, fontWeight:600 }}>{msg}</div>}
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}

// Inline profile editor used inside AlumniDashboard
function ProfileInline({ userId, alumniName, flash }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [profile, setProfile] = useState({ name:"", email:"", role:"", batch:"", branch:"", company:"", skills:"" });

  useEffect(() => {
    fetch(`http://localhost:9090/api/users/${userId}`)
      .then(r=>r.json())
      .then(data=>setProfile({ name:data.name||"", email:data.email||"", role:data.role||"", batch:data.batch||"", branch:data.branch||"", company:data.company||"", skills:data.skills||"" }))
      .catch(()=>{});
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...profile };
    if (newPassword) payload.password = newPassword;
    try {
      const res = await fetch(`http://localhost:9090/api/users/${userId}`, {
        method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("name", updated.name);
        setProfile(p=>({...p,...updated}));
        setNewPassword("");
        flash("✅ Profile saved!");
        setIsEditing(false);
      } else { flash("❌ Save failed"); }
    } catch { flash("❌ Cannot reach server"); }
    setSaving(false);
  };

  const inputStyle = { width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.06)", color:C.white, fontSize:13, outline:"none", boxSizing:"border-box", marginBottom:2 };

  const Field = ({ label, fieldKey, type="text" }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      {isEditing
        ? <input type={type} value={profile[fieldKey]} onChange={e=>setProfile({...profile,[fieldKey]:e.target.value})} style={inputStyle} />
        : <div style={{ fontSize:14, color:C.white, padding:"8px 0", borderBottom:"1px solid rgba(200,150,62,0.08)" }}>{profile[fieldKey]||<span style={{color:C.muted}}>—</span>}</div>
      }
    </div>
  );

  return (
    <div style={{ maxWidth:580 }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>👤 My Profile</div>
      <div style={{ background:C.navy2, border:"1px solid rgba(200,150,62,0.12)", borderRadius:14, padding:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
          <div style={{ width:60, height:60, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:22, color:C.navy }}>
            {(profile.name||"?")[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.white }}>{profile.name||"—"}</div>
            <div style={{ fontSize:12, color:C.gold, marginTop:3, textTransform:"capitalize" }}>{profile.role}</div>
          </div>
        </div>
        <Field label="Full Name"    fieldKey="name" />
        <Field label="Email"        fieldKey="email" type="email" />
        <Field label="Batch / Year" fieldKey="batch" />
        <Field label="Branch"       fieldKey="branch" />
        <Field label="Company"      fieldKey="company" />
        <Field label="Skills"       fieldKey="skills" />
        {isEditing && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>New Password (leave blank to keep)</div>
            <input type="password" placeholder="Enter new password..." value={newPassword} onChange={e=>setNewPassword(e.target.value)} style={inputStyle} />
          </div>
        )}
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={saving} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer" }}>
                {saving?"Saving...":"Save Changes"}
              </button>
              <button onClick={()=>setIsEditing(false)} style={{ padding:"10px 18px", background:"rgba(255,255,255,0.07)", color:C.muted, border:"1px solid rgba(200,150,62,0.2)", borderRadius:8, fontSize:13, cursor:"pointer" }}>Cancel</button>
            </>
          ) : (
            <button onClick={()=>setIsEditing(true)} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer" }}>✏ Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlumniDashboard;