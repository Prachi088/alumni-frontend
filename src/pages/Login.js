import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function Login() {
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [role, setRole]             = useState("student");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Smooth scroll animation on mount
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) { setError("Email and password are required"); return; }
    if (!email.includes("@")) { setError("Enter a valid email"); return; }
    if (isRegister && !enrollment) { setError("Name/Enrollment is required"); return; }
    setError(""); setLoading(true);

    try {
      if (isRegister) {
        const createRes = await fetch(`${API_URL}/api/users`, {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ name:enrollment, email, role, password }),
        });
        if (!createRes.ok) { setError("Email already exists or server error"); setLoading(false); return; }
        const created = await createRes.json();
        localStorage.setItem("userId", created.id);
        localStorage.setItem("name",   created.name);
        localStorage.setItem("role",   created.role);
      } else {
        const res = await fetch(`${API_URL}/api/users/by-email?email=${encodeURIComponent(email)}`);
        if (!res.ok) { setError("No account found. Please register."); setLoading(false); return; }
        const found = await res.json();
        if (!found) { setError("No account found. Please register."); setLoading(false); return; }
        if (found.password !== password) { setError("Incorrect password"); setLoading(false); return; }
        localStorage.setItem("userId", found.id);
        localStorage.setItem("name",   found.name);
        localStorage.setItem("role",   found.role);
      }
    } catch {
      setError("Cannot reach server. Please try again.");
      setLoading(false); return;
    }

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGlow} />

      <div style={styles.card}>
        {/* Back to About */}
        <button onClick={() => navigate("/about")} style={styles.backBtn}>
          ← Back to About
        </button>

        <div style={styles.logo}>SATI</div>
        <h2 style={styles.title}>Alumni Portal</h2>
        <p style={styles.sub}>Samrat Ashok Technological Institute</p>

        <div style={styles.tabContainer}>
          {["Login", "Register"].map((t, i) => (
            <button key={t} onClick={() => setIsRegister(i === 1)}
              style={styles.tab(isRegister === (i === 1))}>{t}
            </button>
          ))}
        </div>

        {isRegister && (
          <input type="text" placeholder="Full Name / Enrollment No."
            value={enrollment} onChange={e => setEnrollment(e.target.value)} style={styles.input} />
        )}
        <input type="email" placeholder="Email ID"
          value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"} placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{ ...styles.input, margin: 0, marginBottom: 10, paddingRight: 42 }}
          />
          <button type="button" onClick={() => setShowPassword(p => !p)}
            style={styles.eyeButton}>
            <EyeIcon open={showPassword} />
          </button>
        </div>

        {isRegister && (
          <select value={role} onChange={e => setRole(e.target.value)} style={styles.input}>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, var(--color-dark-bg) 0%, var(--color-dark-card) 100%)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  backgroundGlow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "-100px",
    right: "-100px",
    pointerEvents: "none",
  },
  card: {
    background: "linear-gradient(135deg, var(--color-dark-card) 0%, rgba(26, 31, 46, 0.8) 100%)",
    padding: "40px 32px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "360px",
    textAlign: "center",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 32px rgba(99, 102, 241, 0.1)",
    backdropFilter: "blur(10px)",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
  },
  backBtn: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    color: "var(--color-text-muted)",
    fontSize: "13px",
    cursor: "pointer",
    marginBottom: "20px",
    padding: 0,
    transition: "all 0.3s ease",
    fontWeight: "500",
  },
  logo: {
    width: 54,
    height: 54,
    background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 16,
    color: "var(--color-dark-bg)",
    margin: "0 auto 16px",
    boxShadow: "0 8px 16px rgba(212, 165, 116, 0.3)",
  },
  title: {
    color: "var(--color-text-primary)",
    margin: "0 0 4px",
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "var(--font-accent)",
  },
  sub: {
    color: "var(--color-text-muted)",
    fontSize: 12,
    margin: "0 0 24px",
    fontWeight: "500",
  },
  tabContainer: {
    display: "flex",
    marginBottom: 22,
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    background: "rgba(255, 255, 255, 0.03)",
  },
  tab: (active) => ({
    flex: 1,
    padding: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    background: active ? "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-light))" : "transparent",
    color: active ? "var(--color-dark-bg)" : "var(--color-text-muted)",
    transition: "all 0.3s ease",
  }),
  input: {
    width: "100%",
    padding: "11px 14px",
    marginBottom: "10px",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "var(--color-text-primary)",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
  },
  passwordContainer: {
    position: "relative",
    margin: "5px 0",
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--color-text-muted)",
    padding: 0,
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  error: {
    color: "var(--color-accent-red)",
    fontSize: 12,
    margin: "8px 0 0",
    fontWeight: "500",
    background: "rgba(239, 68, 68, 0.1)",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 18,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
    fontFamily: "inherit",
  },
};

export default Login;