 import React, { useState, useEffect } from "react";

function Network() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");

  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    // Load all users from backend
    fetch("http://localhost:9090/api/users")
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
      await fetch("http://localhost:9090/api/connections", {
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
  container:   { padding: "30px", background: "#f8fafc", minHeight: "100vh", paddingTop: "100px" },
  heading:     { color: "#1e293b", marginBottom: "20px" },
  search:      { padding: "10px", width: "300px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "20px" },
  grid:        { display: "flex", flexWrap: "wrap", gap: "20px" },
  card:        { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", width: "200px", textAlign: "center" },
  avatar: {
    width: 50, height: 50, borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#818cf8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 auto 10px",
  },
  title:       { fontSize: "15px", fontWeight: "600", margin: "0 0 4px" },
  text:        { fontSize: "13px", color: "#64748b", margin: "2px 0" },
  button:      { marginTop: "10px", padding: "8px", width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 },
  disabledBtn: { marginTop: "10px", padding: "8px", width: "100%", background: "#94a3b8", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
};

export default Network;