import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [role, setRole]             = useState("student");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) { setError("Email and password are required"); return; }
    if (!email.includes("@")) { setError("Enter a valid email"); return; }
    if (isRegister && !enrollment) { setError("Name/Enrollment is required"); return; }
    setError(""); setLoading(true);

    try {
      if (isRegister) {
        const createRes = await fetch("http://localhost:9090/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: enrollment, email, role, password }),
        });
        if (!createRes.ok) { setError("Email already exists or server error"); setLoading(false); return; }
        const created = await createRes.json();
        localStorage.setItem("userId", created.id);
        localStorage.setItem("name",   created.name);
        localStorage.setItem("role",   created.role);
      } else {
        const res = await fetch(`http://localhost:9090/api/users/by-email?email=${encodeURIComponent(email)}`);
        if (!res.ok) { setError("No account found. Please register."); setLoading(false); return; }
        const found = await res.json();
        if (!found) { setError("No account found. Please register."); setLoading(false); return; }
        if (found.password !== password) { setError("Incorrect password"); setLoading(false); return; }
        localStorage.setItem("userId", found.id);
        localStorage.setItem("name",   found.name);
        localStorage.setItem("role",   found.role);
      }
    } catch {
      setError("Cannot reach server. Please try again.");
      setLoading(false); return;
    }

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>SATI</div>
        <h2 style={styles.title}>Alumni Portal</h2>
        <p style={styles.sub}>Samrat Ashok Technological Institute</p>

        <div style={{ display:"flex", marginBottom:20, borderRadius:8, overflow:"hidden", border:"1px solid rgba(200,150,62,0.3)" }}>
          {["Login","Register"].map((t,i) => (
            <button key={t} onClick={()=>setIsRegister(i===1)} style={{ flex:1, padding:"9px", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background: isRegister===(i===1) ? "linear-gradient(135deg,#C8963E,#E8B55A)" : "transparent", color: isRegister===(i===1) ? "#0B1D35" : "#8A9AB5" }}>{t}</button>
          ))}
        </div>

        {isRegister && (
          <input type="text" placeholder="Full Name / Enrollment No." value={enrollment} onChange={e=>setEnrollment(e.target.value)} style={styles.input} />
        )}
        <input type="email"    placeholder="Email ID"  value={email}    onChange={e=>setEmail(e.target.value)}    style={styles.input} />
        <input type="password" placeholder="Password"  value={password} onChange={e=>setPassword(e.target.value)} style={styles.input} />
        {isRegister && (
          <select value={role} onChange={e=>setRole(e.target.value)} style={styles.input}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#0B1D35" },
  card:      { background:"#112444", padding:"40px 36px", borderRadius:16, width:320, textAlign:"center", border:"1px solid rgba(200,150,62,0.2)", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" },
  logo:      { width:56, height:56, background:"linear-gradient(135deg,#C8963E,#E8B55A)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:16, color:"#0B1D35", margin:"0 auto 16px" },
  title:     { color:"#fff", margin:"0 0 4px", fontSize:20, fontWeight:700 },
  sub:       { color:"#8A9AB5", fontSize:12, margin:"0 0 24px" },
  input:     { width:"100%", padding:"11px 14px", margin:"5px 0", borderRadius:8, border:"1px solid rgba(200,150,62,0.25)", background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" },
  button:    { width:"100%", padding:12, background:"linear-gradient(135deg,#C8963E,#E8B55A)", color:"#0B1D35", border:"none", borderRadius:8, fontWeight:700, fontSize:14, cursor:"pointer", marginTop:12 },
  error:     { color:"#ef5350", fontSize:13, margin:"6px 0 0" },
};

export default Login;