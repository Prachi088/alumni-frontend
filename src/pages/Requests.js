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
  container: { paddingTop: "100px", display: "flex", justifyContent: "center", background: "#f8fafc", minHeight: "100vh" },
  content:   { width: "100%", maxWidth: "900px" },
  heading:   { marginBottom: "20px", color: "#1e293b" },
  empty:     { color: "#64748b" },
  grid:      { display: "flex", flexDirection: "column", gap: "15px" },
  card: {
    background: "#fff", padding: "15px", borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  profile: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: {
    width: "45px", height: "45px", borderRadius: "50%",
    background: "linear-gradient(135deg,#6366f1,#818cf8)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 16, color: "#fff",
  },
  name:      { margin: 0, fontSize: "15px", fontWeight: "600", color: "#0f172a" },
  role:      { margin: "2px 0 0", fontSize: "13px", color: "#64748b" },
  actions:   { display: "flex", gap: "10px" },
  acceptBtn: { background: "#16a34a", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 },
  rejectBtn: { background: "#dc2626", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 },
};

export default Requests;