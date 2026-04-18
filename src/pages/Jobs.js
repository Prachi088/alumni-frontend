 import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "" });

  const role     = localStorage.getItem("role");
  const userId   = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    const appliedIds = JSON.parse(localStorage.getItem("appliedJobIds") || "[]");
    fetch(`${API_URL}/api/jobs`)
      .then(r => r.json())
      .then(data => setJobs(data.map(j => ({ ...j, applied: appliedIds.includes(j.id) }))))
      .catch(() => {
        setJobs([
          { id:1, title:"Java Developer",      company:"TCS",     location:"India",  applied:false },
          { id:2, title:"Frontend Developer",  company:"Infosys", location:"Remote", applied:false },
        ]);
      });
  }, []);

  const filteredJobs = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (id) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, applied: true } : j));
    const saved = JSON.parse(localStorage.getItem("appliedJobIds") || "[]");
    if (!saved.includes(id)) {
      localStorage.setItem("appliedJobIds", JSON.stringify([...saved, id]));
    }
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company) return;
    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newJob, postedBy: userId }),
      });
      const saved = await res.json();
      setJobs(prev => [...prev, { ...saved, applied: false }]);
    } catch {
      setJobs(prev => [...prev, { id: Date.now(), ...newJob, applied: false }]);
    }
    setNewJob({ title: "", company: "", location: "" });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/jobs/${id}`, { method: "DELETE" }).catch(()=>{});
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Jobs</h1>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* Alumni can add jobs */}
        {role === "alumni" && (
          <div style={styles.form}>
            <input placeholder="Job Title"  value={newJob.title}    onChange={e=>setNewJob({...newJob,title:e.target.value})}    style={styles.input} />
            <input placeholder="Company"    value={newJob.company}  onChange={e=>setNewJob({...newJob,company:e.target.value})}  style={styles.input} />
            <input placeholder="Location"   value={newJob.location} onChange={e=>setNewJob({...newJob,location:e.target.value})} style={styles.input} />
            <button onClick={handleAddJob} style={styles.addBtn}>Add Job</button>
          </div>
        )}

        <div style={styles.grid}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} style={styles.card}>
                <h4 style={styles.title}>{job.title}</h4>
                <p style={styles.text}>{job.company}</p>
                <p style={styles.text}>📍 {job.location}</p>

                {role !== "alumni" && (
                  <button
                    style={job.applied ? styles.disabledBtn : styles.applyBtn}
                    onClick={() => handleApply(job.id)}
                    disabled={job.applied}
                  >
                    {job.applied ? "Applied ✓" : "Apply"}
                  </button>
                )}
                {role === "alumni" && (
                  <button onClick={() => handleDelete(job.id)} style={styles.deleteBtn}>Delete</button>
                )}
              </div>
            ))
          ) : (
            <p style={{ color:"#64748b" }}>No jobs found</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { paddingTop:"100px", display:"flex", justifyContent:"center", background:"linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)", minHeight:"100vh" },
  content:   { width:"100%", maxWidth:"1200px", padding:"0 32px" },
  heading:   { marginBottom:"28px", fontSize:"32px", fontWeight:"800", color:"#1e293b" },
  search:    { padding:"12px 16px", width:"100%", maxWidth:"400px", marginBottom:"28px", borderRadius:"10px", border:"1px solid rgba(99,102,241,0.2)", background:"#fff", color:"#1e293b", fontSize:"14px", transition:"all 0.3s", outline:"none", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  form:      { display:"flex", gap:"12px", marginBottom:"28px", flexWrap:"wrap", background:"#fff", padding:"20px", borderRadius:"12px", border:"1px solid rgba(99,102,241,0.1)", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" },
  input:     { padding:"12px 16px", borderRadius:"8px", border:"1px solid rgba(99,102,241,0.2)", background:"#f8fafc", color:"#1e293b", fontSize:"14px", outline:"none", flex:1, minWidth:"200px", transition:"all 0.3s" },
  addBtn:    { background:"linear-gradient(135deg, #10b981, #34d399)", color:"#fff", border:"none", padding:"12px 24px", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"14px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(16,185,129,0.2)" },
  grid:      { display:"flex", gap:"24px", flexWrap:"wrap" },
  card:      { background:"linear-gradient(135deg, #fff 0%, #f9fafb 100%)", padding:"24px", borderRadius:"14px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", width:"280px", border:"1px solid rgba(99,102,241,0.08)", transition:"all 0.3s" },
  title:     { fontSize:"16px", fontWeight:"700", margin:"0 0 12px", color:"#6366f1" },
  text:      { fontSize:"14px", color:"#64748b", margin:"8px 0" },
  applyBtn:  { marginTop:"16px", padding:"10px 16px", width:"100%", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(99,102,241,0.25)" },
  disabledBtn:{ marginTop:"16px", padding:"10px 16px", width:"100%", background:"#e2e8f0", color:"#94a3b8", border:"1px solid #cbd5e1", borderRadius:"8px", cursor:"not-allowed", fontWeight:"700", fontSize:"13px" },
  deleteBtn: { marginTop:"16px", padding:"10px 16px", width:"100%", background:"linear-gradient(135deg, #ef4444, #f87171)", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition:"all 0.3s", boxShadow:"0 4px 12px rgba(239,68,68,0.2)" },
};

export default Jobs;
