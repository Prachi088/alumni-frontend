 import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Network() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");

  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    // Load all users from backend
    fetch(`${API_URL}/api/users`)
      .then(r => r.json())
      .then(data => {
        // Exclude self
        const others = data.filter(u => u.id !== userId);
        setAlumni(others.map(u => ({ ...u, connected: false })));
      })
      .catch(() => {
        // Fallback demo data if backend is offline
        setAlumni([
          { id:1, name:"Rahul Sharma",  role:"Java Developer",      email:"rahul@sati.ac.in",   connected:false },
          { id:2, name:"Priya Verma",   role:"Frontend Developer",  email:"priya@sati.ac.in",   connected:false },
          { id:3, name:"Amit Singh",    role:"Backend Developer",   email:"amit@sati.ac.in",    connected:false },
          { id:4, name:"Neha Gupta",    role:"Full Stack Developer", email:"neha@sati.ac.in",    connected:false },
        ]);
      });
  }, [userId]);

  const filteredAlumni = alumni.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.role?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleConnect = async (index) => {
    const user = filteredAlumni[index];
    try {
      await fetch(`${API_URL}/api/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: userId, receiverId: user.id }),
      });
    } catch {
      // still update UI even if backend is offline
    }
    // Update connected state in the full alumni array
    setAlumni(prev => prev.map(a => a.id === user.id ? { ...a, connected: true } : a));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Network</h1>

      <input
        type="text"
        placeholder="Search by name, role, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((a, i) => (
            <div key={a.id || i} style={styles.card}>
              <div style={styles.avatar}>{(a.name || "?")[0].toUpperCase()}</div>
              <h4 style={styles.title}>{a.name}</h4>
              <p style={styles.text}>{a.role || "Member"}</p>
              <p style={{ ...styles.text, fontSize: "12px" }}>{a.email}</p>
              <button
                style={a.connected ? styles.disabledBtn : styles.button}
                onClick={() => handleConnect(i)}
                disabled={a.connected}
              >
                {a.connected ? "Requested ✓" : "Connect"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#64748b" }}>No results found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container:   { padding: "32px", background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", minHeight: "100vh", paddingTop: "100px" },
  heading:     { color: "#1e293b", marginBottom: "28px", fontSize:"32px", fontWeight:"800" },
  search:      { padding: "12px 16px", width: "100%", maxWidth:"400px", borderRadius: "10px", border: "1px solid rgba(99,102,241,0.2)", marginBottom: "28px", background:"#fff", color:"#1e293b", fontSize:"14px", outline:"none", transition:"all 0.3s", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  grid:        { display: "flex", flexWrap: "wrap", gap: "24px" },
  card:        { background: "linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding: "24px", borderRadius: "14px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", width: "240px", textAlign: "center", border:"1px solid rgba(99,102,241,0.08)", transition:"all 0.3s" },
  avatar: {
    width: 60, height: 60, borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 20, color: "#fff", margin: "0 auto 16px",
  },
  title:       { fontSize: "16px", fontWeight: "700", margin: "0 0 8px", color:"#6366f1" },
  text:        { fontSize: "13px", color: "#64748b", margin: "4px 0" },
  button:      { marginTop: "16px", padding: "10px 16px", width: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(99,102,241,0.25)" },
  disabledBtn: { marginTop: "16px", padding: "10px 16px", width: "100%", background: "#e2e8f0", color: "#94a3b8", border: "1px solid #cbd5e1", borderRadius: "8px", cursor: "not-allowed", fontWeight:700, fontSize:"13px" },
};

export default Network;