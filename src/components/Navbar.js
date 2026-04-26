import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const role      = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkStyle = (path) => ({
    margin: "0 12px",
    textDecoration: "none",
    color: location.pathname === path ? "var(--color-primary)" : "var(--color-text-muted)",
    fontWeight: location.pathname === path ? "700" : "500",
    fontSize: "14px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    paddingBottom: "4px",
    borderBottom: location.pathname === path ? "2px solid var(--color-primary)" : "2px solid transparent",
    position: "relative",
  });

  return (
    <div style={{
      ...styles.navbar,
      boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.24)" : "0 4px 16px rgba(0, 0, 0, 0.12)",
      backdropFilter: "blur(10px)",
      background: isScrolled
        ? "rgba(15, 20, 25, 0.85)"
        : "linear-gradient(135deg, rgba(15, 20, 25, 0.7) 0%, rgba(26, 31, 46, 0.5) 100%)",
      position: "relative",
    }}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>SATI</div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px" }}>Alumni Portal</div>
          <span style={{
            ...styles.roleBadge,
            background: role === "alumni" ? "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))" : "linear-gradient(135deg, var(--color-accent-blue), #6b9fd9)",
            marginTop: "2px",
          }}>
            {role === "alumni" ? "Alumni" : "Student"}
          </span>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className={`nav-links${menuOpen ? " open" : ""}`} style={styles.links}>
        <Link to="/dashboard"  style={linkStyle("/dashboard")}  onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/feed"       style={linkStyle("/feed")}       onClick={() => setMenuOpen(false)}>Feed</Link>
        <Link to="/network"    style={linkStyle("/network")}    onClick={() => setMenuOpen(false)}>Network</Link>
        <Link to="/chat"       style={linkStyle("/chat")}       onClick={() => setMenuOpen(false)}>Messages</Link>
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
        <Link to="/about"   style={linkStyle("/about")}   onClick={() => setMenuOpen(false)}>About</Link>
      </div>

      <div style={styles.right}>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: "70px",
    color: "var(--color-text-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
  },
  logo: {
    fontSize: "15px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "var(--color-primary)",
    flexShrink: 0,
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 12,
    color: "var(--color-dark-bg)",
  },
  roleBadge: {
    fontSize: "10px",
    padding: "3px 10px",
    borderRadius: 12,
    fontWeight: 700,
    color: "#fff",
    display: "inline-block",
  },
  links: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  logout: {
    padding: "9px 16px",
    background: "linear-gradient(135deg, var(--color-accent-red), #f87171)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
  },
};

export default Navbar;