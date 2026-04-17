import React, { useState, useEffect } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "" });

  const role     = localStorage.getItem("role");
  const userId   = Number(localStorage.getItem("userId")) || 1;
  const appliedIds = JSON.parse(localStorage.getItem("appliedJobIds") || "[]");

  useEffect(() => {
    fetch("http://localhost:9090/api/jobs")
      .then(r => r.json())
      .then(data => setJobs(data.map(j => ({ ...j, applied: appliedIds.includes(j.id) }))))
      .catch(() => {
        // Fallback demo data
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
      const res = await fetch("http://localhost:9090/api/jobs", {
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
    await fetch(`http://localhost:9090/api/jobs/${id}`, { method: "DELETE" }).catch(()=>{});
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
  container: { paddingTop:"100px", display:"flex", justifyContent:"center", background:"#f8fafc", minHeight:"100vh" },
  content:   { width:"100%", maxWidth:"1100px" },
  heading:   { marginBottom:"20px" },
  search:    { padding:"10px", width:"300px", marginBottom:"20px", borderRadius:"6px", border:"1px solid #ccc" },
  form:      { display:"flex", gap:"10px", marginBottom:"20px", flexWrap:"wrap" },
  input:     { padding:"10px", borderRadius:"6px", border:"1px solid #ccc" },
  addBtn:    { background:"#16a34a", color:"#fff", border:"none", padding:"10px 15px", borderRadius:"6px", cursor:"pointer" },
  grid:      { display:"flex", gap:"20px", flexWrap:"wrap" },
  card:      { background:"#fff", padding:"20px", borderRadius:"12px", boxShadow:"0 4px 15px rgba(0,0,0,0.08)", width:"220px" },
  title:     { fontSize:"15px", fontWeight:"600", margin:"0 0 6px" },
  text:      { fontSize:"13px", color:"#64748b", margin:"2px 0" },
  applyBtn:  { marginTop:"10px", padding:"8px", width:"100%", background:"#2563eb", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
  disabledBtn:{ marginTop:"10px", padding:"8px", width:"100%", background:"#94a3b8", color:"#fff", border:"none", borderRadius:"6px" },
  deleteBtn: { marginTop:"10px", padding:"8px", width:"100%", background:"#ef4444", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" },
};

export default Jobs;