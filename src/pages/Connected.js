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
  container: { paddingTop: "100px", display: "flex", justifyContent: "center", background: "#f8fafc", minHeight: "100vh" },
  content:   { width: "100%", maxWidth: "900px" },
  heading:   { marginBottom: "20px", color: "#1e293b" },
  empty:     { color: "#64748b" },
  grid:      { display: "flex", flexWrap: "wrap", gap: "20px" },
  card: {
    background: "#fff", padding: "20px", borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", width: "220px",
    display: "flex", gap: "12px", alignItems: "center",
  },
  avatar: {
    width: "50px", height: "50px", borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#818cf8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 18, color: "#fff", flexShrink: 0,
  },
  name:  { margin: 0, fontSize: "15px", fontWeight: "600" },
  role:  { margin: "2px 0 0", fontSize: "13px", color: "#64748b" },
  badge: { display: "inline-block", marginTop: "5px", fontSize: "12px", color: "#16a34a", fontWeight: "600" },
};

export default Connected;