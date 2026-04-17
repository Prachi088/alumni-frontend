import React, { useState, useEffect } from "react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const appliedIds = JSON.parse(localStorage.getItem("appliedJobIds") || "[]");

    if (appliedIds.length === 0) { setJobs([]); return; }

    fetch("http://localhost:9090/api/jobs")
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
  container: { paddingTop:"100px", display:"flex", justifyContent:"center", background:"#f8fafc", minHeight:"100vh" },
  content:   { width:"100%", maxWidth:"900px" },
  heading:   { marginBottom:"20px", color:"#1e293b" },
  empty:     { color:"#64748b" },
  grid:      { display:"flex", gap:"20px", flexWrap:"wrap" },
  card:      { background:"#fff", padding:"20px", borderRadius:"10px", boxShadow:"0 4px 10px rgba(0,0,0,0.1)", width:"220px" },
  title:     { margin:"0 0 6px", fontSize:"15px", fontWeight:"600" },
  text:      { fontSize:"13px", color:"#64748b", margin:"2px 0" },
  badge:     { display:"inline-block", marginTop:"8px", color:"#16a34a", fontWeight:"600", fontSize:"13px" },
};

export default MyJobs;