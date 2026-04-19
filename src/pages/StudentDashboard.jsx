// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const C = {
//   navy:  "#0B1D35", navy2: "#112444", navy3: "#1a3258",
//   gold:  "#C8963E", gold2: "#E8B55A", muted: "#8A9AB5", white: "#FFFFFF",
// };

// const S = {
//   portal:    { display:"flex", minHeight:"100vh", fontFamily:"'Open Sans',Arial,sans-serif", background:C.navy, color:C.white },
//   sidebar:   { width:240, background:C.navy2, borderRight:"1px solid rgba(200,150,62,0.15)", display:"flex", flexDirection:"column", flexShrink:0 },
//   brand:     { padding:"24px 20px 16px", borderBottom:"1px solid rgba(200,150,62,0.12)" },
//   brandLogo: { width:44, height:44, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, color:C.navy, marginBottom:8 },
//   navSec:    { padding:"16px 14px 6px", fontSize:10, color:C.gold, letterSpacing:"1.5px", fontWeight:700, textTransform:"uppercase" },
//   main:      { flex:1, overflow:"auto" },
//   topbar:    { padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(200,150,62,0.10)", background:"rgba(11,29,53,0.9)", position:"sticky", top:0, zIndex:10 },
//   content:   { padding:"24px 28px" },
//   card:      { background:C.navy2, border:"1px solid rgba(200,150,62,0.12)", borderRadius:12, padding:20, marginBottom:20 },
//   cardTitle: { fontSize:15, fontWeight:700, color:C.white, marginBottom:14 },
//   input:     { width:"100%", padding:"9px 12px", borderRadius:7, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.05)", color:C.white, fontSize:13, marginBottom:10, boxSizing:"border-box", fontFamily:"inherit" },
//   btn:       { padding:"9px 18px", borderRadius:7, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" },
//   statsRow:  { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 },
//   statCard:  { background:C.navy2, border:"1px solid rgba(200,150,62,0.15)", borderRadius:12, padding:18 },
//   flash:     { padding:"10px 16px", borderRadius:8, marginBottom:16, fontSize:13, fontWeight:600 },
// };

// function NavItem({ icon, label, active, onClick }) {
//   const [hov, setHov] = useState(false);
//   const base = { display:"flex", alignItems:"center", gap:10, padding:"9px 14px", margin:"2px 6px", borderRadius:7, cursor:"pointer", fontSize:13, transition:"all 0.2s" };
//   const style = active ? { ...base, background:"rgba(200,150,62,0.15)", color:C.gold2, fontWeight:600, borderLeft:`3px solid ${C.gold}` }
//     : hov ? { ...base, background:"rgba(200,150,62,0.08)", color:C.white }
//     : { ...base, color:C.muted };
//   return <div style={style} onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}><span>{icon}</span>{label}</div>;
// }

// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   const userId   = Number(localStorage.getItem("userId"));
//   const name     = localStorage.getItem("name") || "Student";

//   const [tab,       setTab]       = useState("dashboard");
//   const [jobs,      setJobs]      = useState([]);
//   const [events,    setEvents]    = useState([]);
//   const [alumni,    setAlumni]    = useState([]);
//   const [appliedIds,setApplied]   = useState(() => JSON.parse(localStorage.getItem("appliedJobIds")||"[]"));
//   const [regIds,    setRegIds]    = useState(() => JSON.parse(localStorage.getItem("registeredEventIds")||"[]"));
//   const [sentIds,   setSentIds]   = useState(() => JSON.parse(localStorage.getItem("sentRequestIds")||"[]"));
//   const [flash,     setFlash]     = useState(null);
//   const [search,    setSearch]    = useState("");

//   const showFlash = (msg, ok=true) => { setFlash({ msg, ok }); setTimeout(()=>setFlash(null), 3000); };

//   const fetchAll = () => {
//     fetch(`${API_URL}/api/jobs").then(r=>r.json()).then(setJobs).catch(()=>{});
//     fetch(`${API_URL}/api/events").then(r=>r.json()).then(setEvents).catch(()=>{});
//     fetch(`${API_URL}/api/users").then(r=>r.json()).then(d=>setAlumni(d.filter(u=>u.role==="alumni"))).catch(()=>{});
//   };

//   useEffect(() => { fetchAll(); }, []);

//   const applyJob = async (job) => {
//     if (appliedIds.includes(job.id)) { showFlash("Already applied!", false); return; }
//     const res = await fetch(`http://localhost:8080/api/jobs/${job.id}/apply`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ userId }) });
//     if (res.ok) {
//       const updated = [...appliedIds, job.id];
//       setApplied(updated); localStorage.setItem("appliedJobIds", JSON.stringify(updated));
//       showFlash(`Applied to ${job.title}!`);
//     } else showFlash("Failed to apply", false);
//   };

//   const registerEvent = async (event) => {
//     if (regIds.includes(event.id)) { showFlash("Already registered!", false); return; }
//     const res = await fetch(`http://localhost:8080/api/events/${event.id}/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ userId }) });
//     if (res.ok) {
//       const updated = [...regIds, event.id];
//       setRegIds(updated); localStorage.setItem("registeredEventIds", JSON.stringify(updated));
//       showFlash(`Registered for ${event.name}!`);
//     } else showFlash("Failed to register", false);
//   };

//   const sendRequest = async (alumniId) => {
//     if (sentIds.includes(alumniId)) { showFlash("Request already sent!", false); return; }
//     const res = await fetch(`${API_URL}/api/connections/send", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ fromId: userId, toId: alumniId }) });
//     if (res.ok) {
//       const updated = [...sentIds, alumniId];
//       setSentIds(updated); localStorage.setItem("sentRequestIds", JSON.stringify(updated));
//       showFlash("Connection request sent!");
//     } else showFlash("Failed to send request", false);
//   };

//   const logout = () => { localStorage.clear(); navigate("/"); };
//   const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

//   const filteredAlumni = alumni.filter(a =>
//     (a.name||"").toLowerCase().includes(search.toLowerCase()) ||
//     (a.email||"").toLowerCase().includes(search.toLowerCase())
//   );

//   const myJobs   = jobs.filter(j => appliedIds.includes(j.id));
//   const myEvents = events.filter(e => regIds.includes(e.id));

//   const NAV = [
//     { id:"dashboard", icon:"◼",  label:"Dashboard"          },
//     { id:"jobs",      icon:"💼", label:"Browse Jobs"         },
//     { id:"events",    icon:"📅", label:"Browse Events"       },
//     { id:"network",   icon:"🤝", label:"Find Alumni"         },
//     { id:"my-jobs",   icon:"📋", label:`My Applications (${myJobs.length})`  },
//     { id:"my-events", icon:"🗓", label:`My Events (${myEvents.length})`       },
//   ];

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
//       <div style={S.portal}>
//         {/* Sidebar */}
//         <aside style={S.sidebar}>
//           <div style={S.brand}>
//             <div style={S.brandLogo}>SATI</div>
//             <div style={{ fontSize:13, fontWeight:700, color:C.white }}>SATI Alumni Portal</div>
//             <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Vidisha, M.P.</div>
//           </div>
//           <div style={S.navSec}>Menu</div>
//           {NAV.map(n => <NavItem key={n.id} {...n} active={tab===n.id} onClick={()=>setTab(n.id)} />)}
//           <div style={{ marginTop:"auto", padding:16, borderTop:"1px solid rgba(200,150,62,0.12)" }}>
//             <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
//               <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:C.navy }}>{initials}</div>
//               <div>
//                 <div style={{ fontSize:12, fontWeight:600, color:C.white }}>{name}</div>
//                 <div style={{ fontSize:11, color:"#5B9EE1" }}>Student</div>
//               </div>
//             </div>
//             <button onClick={logout} style={{ ...S.btn, background:"#ef4444", color:"#fff", width:"100%" }}>Logout</button>
//           </div>
//         </aside>

//         {/* Main */}
//         <main style={S.main}>
//           <div style={S.topbar}>
//             <div style={{ fontSize:19, fontWeight:800, color:C.white }}>
//               {tab==="dashboard" && "Dashboard"}
//               {tab==="jobs"      && "Browse Jobs"}
//               {tab==="events"    && "Browse Events"}
//               {tab==="network"   && "Find Alumni"}
//               {tab==="my-jobs"   && "My Applications"}
//               {tab==="my-events" && "My Registered Events"}
//             </div>
//             <div style={{ fontSize:12, color:C.muted }}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
//           </div>

//           <div style={S.content}>
//             {flash && <div style={{ ...S.flash, background: flash.ok ? "rgba(76,175,80,0.15)" : "rgba(239,68,68,0.15)", color: flash.ok ? "#81C784" : "#ef9a9a", border:`1px solid ${flash.ok?"#81C784":"#ef9a9a"}` }}>{flash.ok?"✅":"❌"} {flash.msg}</div>}

//             {/* ── DASHBOARD ── */}
//             {tab==="dashboard" && (
//               <>
//                 <div style={S.statsRow}>
//                   <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>Jobs Available</div><div style={{ fontSize:28, fontWeight:800, color:C.white, marginTop:6 }}>{jobs.length}</div></div>
//                   <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>My Applications</div><div style={{ fontSize:28, fontWeight:800, color:C.gold, marginTop:6 }}>{myJobs.length}</div></div>
//                   <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>Events Registered</div><div style={{ fontSize:28, fontWeight:800, color:"#81C784", marginTop:6 }}>{myEvents.length}</div></div>
//                 </div>
//                 <div style={S.card}>
//                   <div style={S.cardTitle}>Quick Actions</div>
//                   <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//                     <button onClick={()=>setTab("jobs")}    style={{ ...S.btn, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy }}>Browse Jobs</button>
//                     <button onClick={()=>setTab("events")}  style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid rgba(200,150,62,0.3)" }}>Browse Events</button>
//                     <button onClick={()=>setTab("network")} style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid rgba(200,150,62,0.3)" }}>Find Alumni</button>
//                   </div>
//                 </div>
//                 {myJobs.length > 0 && (
//                   <div style={S.card}>
//                     <div style={S.cardTitle}>Recent Applications</div>
//                     {myJobs.slice(0,3).map(j=>(
//                       <div key={j.id} style={{ padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                         <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
//                         <div style={{ fontSize:11, color:C.muted }}>{j.company} · {j.location}</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}

//             {/* ── JOBS ── */}
//             {tab==="jobs" && (
//               <div style={S.card}>
//                 <div style={S.cardTitle}>Available Jobs ({jobs.length})</div>
//                 {jobs.length===0 ? <div style={{ color:C.muted }}>No jobs available yet.</div> :
//                   jobs.map(j=>(
//                     <div key={j.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                       <div>
//                         <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
//                         <div style={{ fontSize:11, color:C.muted }}>{j.company} · 📍 {j.location}</div>
//                       </div>
//                       <button
//                         onClick={()=>applyJob(j)}
//                         disabled={appliedIds.includes(j.id)}
//                         style={{ ...S.btn, background: appliedIds.includes(j.id) ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg,${C.gold},${C.gold2})`, color: appliedIds.includes(j.id) ? C.muted : C.navy, padding:"6px 14px", cursor: appliedIds.includes(j.id) ? "default" : "pointer" }}
//                       >
//                         {appliedIds.includes(j.id) ? "✔ Applied" : "Apply Now"}
//                       </button>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}

//             {/* ── EVENTS ── */}
//             {tab==="events" && (
//               <div style={S.card}>
//                 <div style={S.cardTitle}>Upcoming Events ({events.length})</div>
//                 {events.length===0 ? <div style={{ color:C.muted }}>No events yet.</div> :
//                   events.map(e=>(
//                     <div key={e.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                       <div>
//                         <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{e.name}</div>
//                         <div style={{ fontSize:11, color:C.muted }}>📅 {e.date} · 📍 {e.location}</div>
//                       </div>
//                       <button
//                         onClick={()=>registerEvent(e)}
//                         disabled={regIds.includes(e.id)}
//                         style={{ ...S.btn, background: regIds.includes(e.id) ? "rgba(255,255,255,0.07)" : "rgba(76,175,80,0.2)", color: regIds.includes(e.id) ? C.muted : "#81C784", padding:"6px 14px", cursor: regIds.includes(e.id) ? "default" : "pointer" }}
//                       >
//                         {regIds.includes(e.id) ? "✔ Registered" : "Register"}
//                       </button>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}

//             {/* ── FIND ALUMNI ── */}
//             {tab==="network" && (
//               <div style={S.card}>
//                 <div style={S.cardTitle}>Find & Connect with Alumni</div>
//                 <input style={S.input} placeholder="Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)} />
//                 {filteredAlumni.length===0 ? <div style={{ color:C.muted }}>No alumni found.</div> :
//                   filteredAlumni.map(a=>(
//                     <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                       <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                         <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold2, fontSize:13 }}>{(a.name||a.email||"A")[0].toUpperCase()}</div>
//                         <div>
//                           <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{a.name || a.email}</div>
//                           <div style={{ fontSize:11, color:C.muted }}>Alumni · {a.enrollment || ""}</div>
//                         </div>
//                       </div>
//                       <button
//                         onClick={()=>sendRequest(a.id)}
//                         disabled={sentIds.includes(a.id)}
//                         style={{ ...S.btn, background: sentIds.includes(a.id) ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg,${C.gold},${C.gold2})`, color: sentIds.includes(a.id) ? C.muted : C.navy, padding:"6px 14px", cursor: sentIds.includes(a.id) ? "default" : "pointer" }}
//                       >
//                         {sentIds.includes(a.id) ? "✔ Requested" : "Connect"}
//                       </button>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}

//             {/* ── MY JOBS ── */}
//             {tab==="my-jobs" && (
//               <div style={S.card}>
//                 <div style={S.cardTitle}>My Job Applications ({myJobs.length})</div>
//                 {myJobs.length===0 ? <div style={{ color:C.muted }}>No applications yet. Browse jobs and apply!</div> :
//                   myJobs.map(j=>(
//                     <div key={j.id} style={{ padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                       <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{j.title}</div>
//                       <div style={{ fontSize:11, color:C.muted }}>{j.company} · 📍 {j.location}</div>
//                       <span style={{ fontSize:11, color:"#81C784", fontWeight:600, marginTop:4, display:"inline-block" }}>✔ Applied</span>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}

//             {/* ── MY EVENTS ── */}
//             {tab==="my-events" && (
//               <div style={S.card}>
//                 <div style={S.cardTitle}>My Registered Events ({myEvents.length})</div>
//                 {myEvents.length===0 ? <div style={{ color:C.muted }}>No events registered yet. Browse events and register!</div> :
//                   myEvents.map(e=>(
//                     <div key={e.id} style={{ padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//                       <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{e.name}</div>
//                       <div style={{ fontSize:11, color:C.muted }}>📅 {e.date} · 📍 {e.location}</div>
//                       <span style={{ fontSize:11, color:"#81C784", fontWeight:600, marginTop:4, display:"inline-block" }}>✔ Registered</span>
//                     </div>
//                   ))
//                 }
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const C = {
  navy:  "#0B1D35", navy2: "#112444", navy3: "#1a3258",
  gold:  "#C8963E", gold2: "#E8B55A", muted: "#8A9AB5", white: "#FFFFFF",
};

const S = {
  portal:    { display:"flex", minHeight:"100vh", fontFamily:"'Open Sans',Arial,sans-serif", background:C.navy, color:C.white },
  sidebar:   { width:240, background:C.navy2, borderRight:"1px solid rgba(200,150,62,0.15)", display:"flex", flexDirection:"column", flexShrink:0 },
  brand:     { padding:"24px 20px 16px", borderBottom:"1px solid rgba(200,150,62,0.12)" },
  brandLogo: { width:44, height:44, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, color:C.navy, marginBottom:8 },
  navSec:    { padding:"16px 14px 6px", fontSize:10, color:C.gold, letterSpacing:"1.5px", fontWeight:700, textTransform:"uppercase" },
  main:      { flex:1, overflow:"auto" },
  topbar:    { padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(200,150,62,0.10)", background:"rgba(11,29,53,0.9)", position:"sticky", top:0, zIndex:10 },
  content:   { padding:"24px 28px" },
  card:      { background:C.navy2, border:"1px solid rgba(200,150,62,0.12)", borderRadius:12, padding:20, marginBottom:20 },
  cardTitle: { fontSize:15, fontWeight:700, color:C.white, marginBottom:14 },
  input:     { width:"100%", padding:"9px 12px", borderRadius:7, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.05)", color:C.white, fontSize:13, marginBottom:10, boxSizing:"border-box", fontFamily:"inherit" },
  btn:       { padding:"9px 18px", borderRadius:7, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"inherit" },
  statsRow:  { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 },
  statCard:  { background:C.navy2, border:"1px solid rgba(200,150,62,0.15)", borderRadius:12, padding:18 },
  flash:     { padding:"10px 16px", borderRadius:8, marginBottom:16, fontSize:13, fontWeight:600 },
};

function NavItem({ icon, label, active, onClick }) {
  const [hov, setHov] = useState(false);
  const base = { display:"flex", alignItems:"center", gap:10, padding:"9px 14px", margin:"2px 6px", borderRadius:7, cursor:"pointer", fontSize:13, transition:"all 0.2s" };
  const style = active ? { ...base, background:"rgba(200,150,62,0.15)", color:C.gold2, fontWeight:600, borderLeft:`3px solid ${C.gold}` }
    : hov ? { ...base, background:"rgba(200,150,62,0.08)", color:C.white }
    : { ...base, color:C.muted };
  return <div style={style} onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}><span>{icon}</span>{label}</div>;
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
    width:"100%", padding:"9px 12px", borderRadius:8,
    border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.06)",
    color:C.white, fontSize:13, outline:"none", boxSizing:"border-box", marginBottom:2,
    fontFamily:"inherit",
  };

  const Field = ({ label, fieldKey, type="text" }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      {isEditing
        ? <input type={type} value={profile[fieldKey]} onChange={e => setProfile({ ...profile, [fieldKey]: e.target.value })} style={inputStyle} />
        : <div style={{ fontSize:14, color:C.white, padding:"8px 0", borderBottom:"1px solid rgba(200,150,62,0.08)" }}>{profile[fieldKey] || <span style={{ color:C.muted }}>—</span>}</div>
      }
    </div>
  );

  return (
    <div style={{ maxWidth:580 }}>
      <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:20 }}>👤 My Profile</div>
      <div style={{ background:C.navy2, border:"1px solid rgba(200,150,62,0.12)", borderRadius:14, padding:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
          <div style={{ width:60, height:60, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:22, color:C.navy }}>
            {(profile.name || "?")[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:C.white }}>{profile.name || "—"}</div>
            <div style={{ fontSize:12, color:"#5B9EE1", marginTop:3, textTransform:"capitalize" }}>Student</div>
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
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={saving} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setIsEditing(false)} style={{ padding:"10px 18px", background:"rgba(255,255,255,0.07)", color:C.muted, border:"1px solid rgba(200,150,62,0.2)", borderRadius:8, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
              ✏ Edit Profile
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
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Open Sans',Arial,sans-serif", background:C.navy, color:C.white, position:"relative", overflow:"hidden", width:"100vw", boxSizing:"border-box" }}>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

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
        <div style={{ marginTop:"auto", padding:16, borderTop:"1px solid rgba(200,150,62,0.12)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:C.navy }}>{initials}</div>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:C.white }}>{name}</div>
              <div style={{ fontSize:11, color:"#5B9EE1" }}>Student</div>
            </div>
            <div onClick={() => { setTab("profile"); setSidebarOpen(false); }} style={{ marginLeft:"auto", cursor:"pointer", color:C.muted, fontSize:15 }} title="Edit Profile">✏</div>
          </div>
          <button onClick={logout} style={{ ...S.btn, background:"#ef4444", color:"#fff", width:"100%" }}>Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ ...S.main, marginLeft: 240, minWidth: 0, width: "calc(100vw - 240px)", boxSizing:"border-box" }} className="sati-main">
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
            <div style={{ background:"rgba(239,68,68,0.15)", color:"#ef9a9a", border:"1px solid rgba(239,68,68,0.3)", padding:"12px 18px", borderRadius:8, marginBottom:20, fontSize:13, fontWeight:600 }}>
              ❌ {apiError} — Check API_URL or backend status
            </div>
          )}
          {flash && (
            <div style={{ ...S.flash, background: flash.ok ? "rgba(76,175,80,0.15)" : "rgba(239,68,68,0.15)", color: flash.ok ? "#81C784" : "#ef9a9a", border:`1px solid ${flash.ok ? "#81C784" : "#ef9a9a"}` }}>
              {flash.ok ? "✅" : "❌"} {flash.msg}
            </div>
            )}

            {/* ── DASHBOARD ── */}
            {tab === "dashboard" && (
              <>
                <div style={S.statsRow} className="sati-stats-row">
                  <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>Jobs Available</div><div style={{ fontSize:28, fontWeight:800, color:C.white, marginTop:6 }}>{jobs.length}</div></div>
                  <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>My Applications</div><div style={{ fontSize:28, fontWeight:800, color:C.gold, marginTop:6 }}>{myJobs.length}</div></div>
                  <div style={S.statCard}><div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", fontWeight:600 }}>Events Registered</div><div style={{ fontSize:28, fontWeight:800, color:"#81C784", marginTop:6 }}>{myEvents.length}</div></div>
                </div>
                <div style={S.card}>
                  <div style={S.cardTitle}>Quick Actions</div>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    <button onClick={() => setTab("jobs")}    style={{ ...S.btn, background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy }}>Browse Jobs</button>
                    <button onClick={() => setTab("events")}  style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid rgba(200,150,62,0.3)" }}>Browse Events</button>
                    <button onClick={() => setTab("network")} style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid rgba(200,150,62,0.3)" }}>Find Alumni</button>
                    <button onClick={() => setTab("profile")} style={{ ...S.btn, background:C.navy3, color:C.white, border:"1px solid rgba(200,150,62,0.3)" }}>My Profile</button>
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
                        style={{ ...S.btn, background: appliedIds.includes(j.id) ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg,${C.gold},${C.gold2})`, color: appliedIds.includes(j.id) ? C.muted : C.navy, padding:"6px 14px", cursor: appliedIds.includes(j.id) ? "default" : "pointer" }}
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
                        style={{ ...S.btn, background: regIds.includes(e.id) ? "rgba(255,255,255,0.07)" : "rgba(76,175,80,0.2)", color: regIds.includes(e.id) ? C.muted : "#81C784", padding:"6px 14px", cursor: regIds.includes(e.id) ? "default" : "pointer" }}
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
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold2, fontSize:13 }}>{(a.name || a.email || "A")[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{a.name || a.email}</div>
                          <div style={{ fontSize:11, color:C.muted }}>Alumni · {a.enrollment || ""}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => sendRequest(a.id)}
                        disabled={sentIds.includes(a.id)}
                        style={{ ...S.btn, background: sentIds.includes(a.id) ? "rgba(255,255,255,0.07)" : `linear-gradient(135deg,${C.gold},${C.gold2})`, color: sentIds.includes(a.id) ? C.muted : C.navy, padding:"6px 14px", cursor: sentIds.includes(a.id) ? "default" : "pointer" }}
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
                  : alumni.filter(a => sentIds.includes(a.id)).map(a => (
                      <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(200,150,62,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.gold2, fontSize:13 }}>{(a.name || a.email || "A")[0].toUpperCase()}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:C.white }}>{a.name || a.email}</div>
                          <div style={{ fontSize:11, color:"#E8B55A", fontWeight:600 }}>⏳ Request Pending</div>
                        </div>
                      </div>
                    ))
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