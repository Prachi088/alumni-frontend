import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const role      = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkStyle = (path) => ({
    margin: "0 10px",
    textDecoration: "none",
    color: location.pathname === path ? "#ffd700" : "#e2e8f0",
    fontWeight: location.pathname === path ? "600" : "400",
    fontSize: "14px",
    transition: "0.3s",
  });

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        Alumni Portal
        <span style={{ ...styles.roleBadge, background: role === "alumni" ? "#C8963E" : "#5B9EE1" }}>
          {role === "alumni" ? "Alumni" : "Student"}
        </span>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard"  style={linkStyle("/dashboard")}>Home</Link>
        <Link to="/requests"   style={linkStyle("/requests")}>Requests</Link>
        <Link to="/connected"  style={linkStyle("/connected")}>Connections</Link>

        {role === "student" && (
          <>
            <Link to="/my-jobs"   style={linkStyle("/my-jobs")}>My Jobs</Link>
            <Link to="/my-events" style={linkStyle("/my-events")}>My Events</Link>
          </>
        )}

        <Link to="/jobs"    style={linkStyle("/jobs")}>Jobs</Link>
        <Link to="/events"  style={linkStyle("/events")}>Events</Link>
        <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>
      </div>

      <div style={styles.right}>
        <span style={styles.profile}>👤</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar:    { position:"sticky", top:0, zIndex:1000, height:"70px", background:"#1e293b", color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", boxShadow:"0 2px 10px rgba(0,0,0,0.2)" },
  logo:      { fontSize:"17px", fontWeight:"700", letterSpacing:"0.5px", display:"flex", alignItems:"center", gap:10 },
  roleBadge: { fontSize:"11px", padding:"3px 10px", borderRadius:20, fontWeight:700, color:"#0B1D35" },
  links:     { display:"flex", alignItems:"center" },
  right:     { display:"flex", alignItems:"center", gap:15 },
  profile:   { fontSize:"20px", cursor:"pointer" },
  logout:    { padding:"6px 14px", background:"#ef4444", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:600 },
};

export default Navbar;