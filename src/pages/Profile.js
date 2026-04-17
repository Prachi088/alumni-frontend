import React, { useState, useEffect } from "react";

const C = { navy:"#0B1D35", navy2:"#112444", gold:"#C8963E", gold2:"#E8B55A", muted:"#8A9AB5", white:"#FFFFFF" };

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
    fetch(`http://localhost:9090/api/users/${userId}`)
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
      const res = await fetch(`http://localhost:9090/api/users/${userId}`, {
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
    <div style={{ minHeight:"100vh", background:C.navy, padding:"32px", fontFamily:"'Open Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{ maxWidth:580, margin:"0 auto" }}>
        <div style={{ fontSize:20, fontWeight:800, color:C.white, marginBottom:24 }}>👤 My Profile</div>

        {msg && <div style={{ background:"rgba(200,150,62,0.15)", border:"1px solid rgba(200,150,62,0.3)", color:C.gold2, padding:"10px 16px", borderRadius:8, marginBottom:20, fontSize:13, fontWeight:600 }}>{msg}</div>}

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
              <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>New Password (leave blank to keep current)</div>
              <input type="password" placeholder="Enter new password..." value={newPassword} onChange={e=>setNewPassword(e.target.value)} style={inputStyle} />
            </div>
          )}

          <div style={{ display:"flex", gap:10, marginTop:20 }}>
            {isEditing ? (
              <>
                <button onClick={handleSave} disabled={saving} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={()=>setIsEditing(false)} style={{ padding:"10px 18px", background:"rgba(255,255,255,0.07)", color:C.muted, border:"1px solid rgba(200,150,62,0.2)", borderRadius:8, fontSize:13, cursor:"pointer" }}>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={()=>setIsEditing(true)} style={{ padding:"10px 22px", background:`linear-gradient(135deg,${C.gold},${C.gold2})`, color:C.navy, border:"none", borderRadius:8, fontWeight:700, fontSize:13, cursor:"pointer" }}>
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