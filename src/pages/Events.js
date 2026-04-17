import React, { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name:"", date:"", location:"" });

  const role     = localStorage.getItem("role");
  const userId   = Number(localStorage.getItem("userId")) || 1;
  const registeredIds = JSON.parse(localStorage.getItem("registeredEventIds") || "[]");

  useEffect(() => {
    fetch("http://localhost:9090/api/events")
      .then(r => r.json())
      .then(data => setEvents(data.map(e => ({ ...e, registered: registeredIds.includes(e.id) }))))
      .catch(() => {
        setEvents([
          { id:1, name:"Alumni Meet 2026", date:"May 10", location:"College Hall",  registered:false },
          { id:2, name:"Tech Webinar",      date:"June 5", location:"Online",        registered:false },
        ]);
      });
  }, []);

  const handleRegister = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, registered:true } : e));
    const saved = JSON.parse(localStorage.getItem("registeredEventIds") || "[]");
    if (!saved.includes(id)) {
      localStorage.setItem("registeredEventIds", JSON.stringify([...saved, id]));
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date) return;
    try {
      const res = await fetch("http://localhost:9090/api/events", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ ...newEvent, postedBy: userId }),
      });
      const saved = await res.json();
      setEvents(prev => [...prev, { ...saved, registered:false }]);
    } catch {
      setEvents(prev => [...prev, { id: Date.now(), ...newEvent, registered:false }]);
    }
    setNewEvent({ name:"", date:"", location:"" });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:9090/api/events/${id}`, { method:"DELETE" }).catch(()=>{});
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Events</h1>

        {role === "alumni" && (
          <div style={styles.form}>
            <input placeholder="Event Name" value={newEvent.name}     onChange={e=>setNewEvent({...newEvent,name:e.target.value})}     style={styles.input} />
            <input placeholder="Date"       value={newEvent.date}     onChange={e=>setNewEvent({...newEvent,date:e.target.value})}     style={styles.input} />
            <input placeholder="Location"   value={newEvent.location} onChange={e=>setNewEvent({...newEvent,location:e.target.value})} style={styles.input} />
            <button onClick={handleAddEvent} style={styles.addBtn}>Add Event</button>
          </div>
        )}

        <div style={styles.grid}>
          {events.map(event => (
            <div key={event.id} style={styles.card}>
              <h4 style={styles.title}>{event.name}</h4>
              <p style={styles.text}>📅 {event.date}</p>
              <p style={styles.text}>📍 {event.location}</p>

              {role !== "alumni" && (
                <button
                  style={event.registered ? styles.disabledBtn : styles.button}
                  onClick={() => handleRegister(event.id)}
                  disabled={event.registered}
                >
                  {event.registered ? "Registered ✓" : "Register"}
                </button>
              )}
              {role === "alumni" && (
                <button onClick={() => handleDelete(event.id)} style={styles.deleteBtn}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:  { paddingTop:"100px", display:"flex", justifyContent:"center", background:"linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", minHeight:"100vh" },
  content:    { width:"100%", maxWidth:"1200px", padding:"0 32px" },
  heading:    { marginBottom:"28px", fontSize:"32px", fontWeight:"800", color:"#1e293b" },
  form:       { display:"flex", gap:"12px", marginBottom:"28px", flexWrap:"wrap", background:"#fff", padding:"20px", borderRadius:"12px", border:"1px solid rgba(99,102,241,0.1)", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" },
  input:      { padding:"12px 16px", borderRadius:"8px", border:"1px solid rgba(99,102,241,0.2)", background:"#f8fafc", color:"#1e293b", fontSize:"14px", outline:"none", flex:1, minWidth:"200px", transition:"all 0.3s" },
  addBtn:     { background:"linear-gradient(135deg, #10b981, #34d399)", color:"#fff", border:"none", padding:"12px 24px", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"14px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(16,185,129,0.2)" },
  grid:       { display:"flex", gap:"24px", flexWrap:"wrap" },
  card:       { background:"linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding:"24px", borderRadius:"14px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", width:"280px", border:"1px solid rgba(99,102,241,0.08)", transition:"all 0.3s" },
  title:      { fontSize:"16px", fontWeight:"700", margin:"0 0 12px", color:"#6366f1" },
  text:       { fontSize:"14px", color:"#64748b", margin:"8px 0" },
  button:     { marginTop:"16px", padding:"10px 16px", width:"100%", background:"linear-gradient(135deg, #3b82f6, #60a5fa)", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(59,130,246,0.25)" },
  disabledBtn:{ marginTop:"16px", padding:"10px 16px", width:"100%", background:"#e2e8f0", color:"#94a3b8", border:"1px solid #cbd5e1", borderRadius:"8px", cursor:"not-allowed", fontWeight:"700", fontSize:"13px" },
  deleteBtn:  { marginTop:"16px", padding:"10px 16px", width:"100%", background:"linear-gradient(135deg, #ef4444, #f87171)", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(239,68,68,0.2)" },
};

export default Events;