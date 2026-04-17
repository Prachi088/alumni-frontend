import React, { useState, useEffect } from "react";

const C = { navy:"#0B1D35", navy2:"#112444", gold:"#C8963E", gold2:"#E8B55A", muted:"#8A9AB5", white:"#FFFFFF" };
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9090";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [msg,       setMsg]       = useState("");
  const [newPassword, setNewPassword] = useState("");
  const userId = Number(localStorage.getItem("userId")) || 1;

  const [profile, setProfile] = useState({
    name:"", email:"", role:"", batch:"", branch:"", company:"", skills:"", password:""
  });

  useEffect(() => {
    fetch(`${API_URL}/api/users/${userId}`)
      .then(r => r.json())
      .then(data => setProfile({
        name:     data.name     || "",
        email:    data.email    || "",
        role:     data.role     || "",
        batch:    data.batch    || "",
        branch:   data.branch   || "",
        company:  data.company  || "",
        skills:   data.skills   || "",
        password: data.password || "",
      }))
      .catch(() => setProfile(p => ({ ...p, name: localStorage.getItem("name")||"", role: localStorage.getItem("role")||"" })));
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
        setMsg("✅ Profile saved!");
        setIsEditing(false);
      } else { setMsg("❌ Save failed"); }
    } catch { setMsg("❌ Cannot reach server"); }
    setSaving(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const inputStyle = { width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.06)", color:C.white, fontSize:13, outline:"none", boxSizing:"border-box" };

  const Field = ({ label, fieldKey, type="text" }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      {isEditing
        ? <input type={type} value={profile[fieldKey]} onChange={e=>setProfile({...profile,[fieldKey]:e.target.value})} style={inputStyle} />
        : <div style={{ fontSize:14, color:C.white, padding:"8px 0", borderBottom:"1px solid rgba(200,150,62,0.08)" }}>{profile[fieldKey] || <span style={{color:C.muted}}>—</span>}</div>
      }
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", padding:"40px 32px", fontFamily:"'Open Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ maxWidth:580, margin:"0 auto" }}>
        <div style={{ fontSize:28, fontWeight:800, color:"#1e293b", marginBottom:28 }}>👤 My Profile</div>

        {msg && <div style={{ background:"linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)", border:"1px solid rgba(99,102,241,0.3)", color:"#6366f1", padding:"12px 18px", borderRadius:"10px", marginBottom:24, fontSize:13, fontWeight:600, boxShadow:"0 2px 8px rgba(99,102,241,0.1)" }}>{msg}</div>}

        <div style={{ background:"linear-gradient(135deg, #fff 0%, #f9fafb 100%)", border:"1px solid rgba(99,102,241,0.1)", borderRadius:16, padding:32, boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:32 }}>
            <div style={{ width:70, height:70, borderRadius:"50%", background:`linear-gradient(135deg, #6366f1, #8b5cf6)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:24, color:"#fff", boxShadow:"0 4px 16px rgba(99,102,241,0.2)" }}>
              {(profile.name||"?")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize:19, fontWeight:800, color:"#6366f1" }}>{profile.name||"—"}</div>
              <div style={{ fontSize:13, color:"#64748b", marginTop:4, textTransform:"capitalize" }}>{profile.role}</div>
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
              <div style={{ fontSize:11, color:"#64748b", fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>New Password (leave blank to keep current)</div>
              <input type="password" placeholder="Enter new password..." value={newPassword} onChange={e=>setNewPassword(e.target.value)} style={inputStyle} />
            </div>
          )}

          <div style={{ display:"flex", gap:12, marginTop:28 }}>
            {isEditing ? (
              <>
                <button onClick={handleSave} disabled={saving} style={{ padding:"12px 28px", background:`linear-gradient(135deg, #6366f1, #8b5cf6)`, color:"#fff", border:"none", borderRadius:10, fontWeight:800, fontSize:14, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(99,102,241,0.25)", flex:1 }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={()=>setIsEditing(false)} style={{ padding:"12px 28px", background:"#e2e8f0", color:"#64748b", border:"1px solid #cbd5e1", borderRadius:10, fontSize:14, cursor:"pointer", transition:"all 0.3s", fontWeight:700 }}>Cancel</button>
              </>
            ) : (
              <button onClick={()=>setIsEditing(true)} style={{ padding:"12px 28px", background:`linear-gradient(135deg, #6366f1, #8b5cf6)`, color:"#fff", border:"none", borderRadius:10, fontWeight:800, fontSize:14, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(99,102,241,0.25)", width:"100%" }}>
                ✏ Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;