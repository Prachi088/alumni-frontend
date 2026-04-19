 import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const role      = localStorage.getItem("role");

  // ── ADDED: hamburger state ──
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkStyle = (path) => ({
    margin: "0 12px",
    textDecoration: "none",
    color: location.pathname === path ? "#6366f1" : "#64748b",
    fontWeight: location.pathname === path ? "700" : "500",
    fontSize: "14px",
    transition: "all 0.3s ease",
    paddingBottom: location.pathname === path ? "2px" : "0px",
    borderBottom: location.pathname === path ? "2px solid #6366f1" : "2px solid transparent",
  });

  return (
    <div style={{ ...styles.navbar, position: "relative" }}>
      <div style={styles.logo}>
        Alumni Portal
        <span style={{ ...styles.roleBadge, background: role === "alumni" ? "#C8963E" : "#5B9EE1" }}>
          {role === "alumni" ? "Alumni" : "Student"}
        </span>
      </div>

      {/* Original links — className added for CSS targeting */}
      <div className={`nav-links${menuOpen ? " open" : ""}`} style={styles.links}>
        <Link to="/dashboard"  style={linkStyle("/dashboard")}  onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/requests"   style={linkStyle("/requests")}   onClick={() => setMenuOpen(false)}>Requests</Link>
        <Link to="/connected"  style={linkStyle("/connected")}  onClick={() => setMenuOpen(false)}>Connections</Link>
        {role === "student" && (
          <>
            <Link to="/my-jobs"   style={linkStyle("/my-jobs")}   onClick={() => setMenuOpen(false)}>My Jobs</Link>
            <Link to="/my-events" style={linkStyle("/my-events")} onClick={() => setMenuOpen(false)}>My Events</Link>
          </>
        )}
        <Link to="/jobs"    style={linkStyle("/jobs")}    onClick={() => setMenuOpen(false)}>Jobs</Link>
        <Link to="/events"  style={linkStyle("/events")}  onClick={() => setMenuOpen(false)}>Events</Link>
        <Link to="/profile" style={linkStyle("/profile")} onClick={() => setMenuOpen(false)}>Profile</Link>
      </div>

      <div style={styles.right}>
        <span style={styles.profile}>👤</span>
        {/* ADDED: hamburger — CSS hides on desktop, shows on mobile */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar:    { position:"sticky", top:0, zIndex:1000, height:"70px", background:"linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)", color:"#1e293b", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", backdropFilter:"blur(10px)" },
  logo:      { fontSize:"18px", fontWeight:"800", letterSpacing:"0.5px", display:"flex", alignItems:"center", gap:10, color:"#6366f1" },
  roleBadge: { fontSize:"11px", padding:"4px 12px", borderRadius:20, fontWeight:700, color:"#fff", background:"linear-gradient(135deg, #6366f1, #8b5cf6)", border:"1px solid rgba(99,102,241,0.3)" },
  links:     { display:"flex", alignItems:"center" },
  right:     { display:"flex", alignItems:"center", gap:15 },
  profile:   { fontSize:"20px", cursor:"pointer", opacity:0.7, transition:"opacity 0.3s" },
  logout:    { padding:"8px 16px", background:"linear-gradient(135deg, #ef4444, #f87171)", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:600, transition:"all 0.3s", boxShadow:"0 4px 12px rgba(239,68,68,0.2)" },
};

export default Navbar;
