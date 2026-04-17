import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9090";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const appliedIds = JSON.parse(localStorage.getItem("appliedJobIds") || "[]");

    if (appliedIds.length === 0) { setJobs([]); return; }

    fetch(`${API_URL}/api/jobs`)
      .then(r => r.json())
      .then(data => setJobs(data.filter(j => appliedIds.includes(j.id))))
      .catch(() => {});
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>My Applied Jobs</h1>

        {jobs.length === 0 ? (
          <p style={styles.empty}>No applications yet.</p>
        ) : (
          <div style={styles.grid}>
            {jobs.map(j => (
              <div key={j.id} style={styles.card}>
                <h3 style={styles.title}>{j.title}</h3>
                <p style={styles.text}>{j.company}</p>
                <p style={styles.text}>📍 {j.location}</p>
                <span style={styles.badge}>✔ Applied</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { paddingTop:"100px", display:"flex", justifyContent:"center", background:"linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", minHeight:"100vh" },
  content:   { width:"100%", maxWidth:"1000px", padding:"0 32px" },
  heading:   { marginBottom:"28px", color:"#1e293b", fontSize:"32px", fontWeight:"800" },
  empty:     { color:"#64748b", fontSize:"16px" },
  grid:      { display:"flex", gap:"24px", flexWrap:"wrap" },
  card:      { background:"linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding:"24px", borderRadius:"14px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", width:"280px", border:"1px solid rgba(99,102,241,0.08)", transition:"all 0.3s" },
  title:     { margin:"0 0 12px", fontSize:"16px", fontWeight:"700", color:"#6366f1" },
  text:      { fontSize:"14px", color:"#64748b", margin:"8px 0" },
  badge:     { display:"inline-block", marginTop:"12px", color:"#10b981", fontWeight:"700", fontSize:"13px", background:"rgba(16,185,129,0.1)", padding:"4px 10px", borderRadius:"6px" },
};

export default MyJobs;