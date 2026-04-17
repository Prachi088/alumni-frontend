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
  container:  { paddingTop:"100px", display:"flex", justifyContent:"center", background:"#f8fafc", minHeight:"100vh" },
  content:    { width:"100%", maxWidth:"1100px" },
  heading:    { marginBottom:"20px" },
  form:       { display:"flex", gap:"10px", marginBottom:"20px", flexWrap:"wrap" },
  input:      { padding:"10px", borderRadius:"6px", border:"1px solid #ccc" },
  addBtn:     { background:"#16a34a", color:"#fff", border:"none", padding:"10px 15px", borderRadius:"6px", cursor:"pointer" },
  grid:       { display:"flex", gap:"20px", flexWrap:"wrap" },
  card:       { background:"#fff", padding:"20px", borderRadius:"12px", boxShadow:"0 4px 15px rgba(0,0,0,0.08)", width:"220px" },
  title:      { fontSize:"16px", fontWeight:"600", margin:"0 0 6px" },
  text:       { fontSize:"14px", color:"#64748b", margin:"2px 0" },
  button:     { marginTop:"10px", padding:"8px", width:"100%", background:"#2563eb", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
  disabledBtn:{ marginTop:"10px", padding:"8px", width:"100%", background:"#94a3b8", color:"#fff", border:"none", borderRadius:"6px" },
  deleteBtn:  { marginTop:"10px", padding:"8px", width:"100%", background:"#ef4444", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
};

export default Events;