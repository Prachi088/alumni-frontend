import React, { useEffect, useState } from "react";

function Connected() {
  const [connections, setConnections] = useState([]);

  // FIX: read real userId from localStorage instead of hardcoded 2
  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    fetch(`http://localhost:9090/api/connections/accepted/${userId}`)
      .then((res) => res.json())
      .then((data) => setConnections(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>My Network</h1>

        {connections.length === 0 ? (
          <p style={styles.empty}>No connections yet</p>
        ) : (
          <div style={styles.grid}>
            {connections.map((c) => (
              <div key={c.id} style={styles.card}>
                <div style={styles.avatar}>
                  {(c.name || "?")[0].toUpperCase()}
                </div>
                <div>
                  <h4 style={styles.name}>{c.name}</h4>
                  <p style={styles.role}>{c.role}</p>
                  <span style={styles.badge}>✔ Connected</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { paddingTop: "100px", display: "flex", justifyContent: "center", background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", minHeight: "100vh" },
  content:   { width: "100%", maxWidth: "1000px", padding:"0 32px" },
  heading:   { marginBottom: "28px", color: "#1e293b", fontSize:"32px", fontWeight:"800" },
  empty:     { color: "#64748b", fontSize:"16px" },
  grid:      { display: "flex", flexWrap: "wrap", gap: "24px" },
  card: {
    background: "linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding: "20px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)", width: "280px", border:"1px solid rgba(99,102,241,0.08)",
    display: "flex", gap: "16px", alignItems: "flex-start", transition:"all 0.3s"
  },
  avatar: {
    width: "56px", height: "56px", borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 20, color: "#fff", flexShrink: 0,
  },
  name:  { margin: 0, fontSize: "15px", fontWeight: "700", color:"#6366f1" },
  role:  { margin: "4px 0 0", fontSize: "13px", color: "#64748b" },
  badge: { display: "inline-block", marginTop: "6px", fontSize: "12px", color: "#10b981", fontWeight: "700", background:"rgba(16,185,129,0.1)", padding:"3px 8px", borderRadius:"5px" },
};

export default Connected;