import React, { useState, useEffect } from "react";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const registeredIds = JSON.parse(localStorage.getItem("registeredEventIds") || "[]");

    if (registeredIds.length === 0) { setEvents([]); return; }

    fetch("http://localhost:9090/api/events")
      .then(r => r.json())
      .then(data => setEvents(data.filter(e => registeredIds.includes(e.id))))
      .catch(() => {});
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>My Events</h1>

        {events.length === 0 ? (
          <p style={styles.empty}>No events registered yet.</p>
        ) : (
          <div style={styles.grid}>
            {events.map(e => (
              <div key={e.id} style={styles.card}>
                <h3 style={styles.name}>{e.name}</h3>
                <p style={styles.text}>📅 {e.date}</p>
                <p style={styles.text}>📍 {e.location}</p>
                <span style={styles.badge}>✔ Registered</span>
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
  name:      { margin:"0 0 6px", fontSize:"15px", fontWeight:"600" },
  text:      { fontSize:"13px", color:"#64748b", margin:"2px 0" },
  badge:     { display:"inline-block", marginTop:"8px", color:"#16a34a", fontWeight:"600", fontSize:"13px" },
};

export default MyEvents;