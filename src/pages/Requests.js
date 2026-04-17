 import React, { useEffect, useState } from "react";

function Requests() {
  const [requests, setRequests] = useState([]);

  // FIX: read real userId from localStorage instead of hardcoded 2
  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    fetch(`http://localhost:9090/api/connections/pending/${userId}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAccept = async (id) => {
    await fetch(`http://localhost:9090/api/connections/accept/${id}`, { method: "PUT" });
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:9090/api/connections/reject/${id}`, { method: "PUT" });
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Connection Requests</h1>

        {requests.length === 0 ? (
          <p style={styles.empty}>No pending requests</p>
        ) : (
          <div style={styles.grid}>
            {requests.map((r) => (
              <div key={r.id} style={styles.card}>
                <div style={styles.profile}>
                  <div style={styles.avatar}>
                    {(r.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 style={styles.name}>{r.name}</h4>
                    <p style={styles.role}>{r.role || r.email}</p>
                  </div>
                </div>
                <div style={styles.actions}>
                  <button style={styles.acceptBtn} onClick={() => handleAccept(r.id)}>✔ Accept</button>
                  <button style={styles.rejectBtn} onClick={() => handleReject(r.id)}>✖ Reject</button>
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
  content:   { width: "100%", maxWidth: "900px", padding:"0 32px" },
  heading:   { marginBottom: "28px", color: "#1e293b", fontSize:"32px", fontWeight:"800" },
  empty:     { color: "#64748b", fontSize:"16px" },
  grid:      { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    background: "linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding: "20px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border:"1px solid rgba(99,102,241,0.08)",
    display: "flex", justifyContent: "space-between", alignItems: "center", transition:"all 0.3s"
  },
  profile: { display: "flex", alignItems: "center", gap: "16px" },
  avatar: {
    width: "50px", height: "50px", borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 18, color: "#fff",
  },
  name:      { margin: 0, fontSize: "15px", fontWeight: "700", color: "#1e293b" },
  role:      { margin: "4px 0 0", fontSize: "13px", color: "#64748b" },
  actions:   { display: "flex", gap: "12px" },
  acceptBtn: { background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(16,185,129,0.2)" },
  rejectBtn: { background: "linear-gradient(135deg, #ef4444, #f87171)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(239,68,68,0.2)" },
};

export default Requests;