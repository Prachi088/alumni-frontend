import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Login            from "./pages/Login";
import Dashboard        from "./pages/Dashboard";
import AlumniDashboard  from "./pages/AlumniDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Network          from "./pages/Network";
import Jobs             from "./pages/Jobs";
import Events           from "./pages/Events";
import Profile          from "./pages/Profile";
import Requests         from "./pages/Requests";
import Connected        from "./pages/Connected";
import MyJobs           from "./pages/MyJobs";
import MyEvents         from "./pages/MyEvents";
import About            from "./pages/About";

// Modern Premium Components
import ModernDashboard  from "./pages/ModernDashboard";
import ModernNetwork    from "./pages/ModernNetwork";
import ModernChat       from "./pages/ModernChat";
import ModernProfile    from "./pages/ModernProfile";
import ModernFeed       from "./pages/ModernFeed";

import Navbar           from "./components/Navbar";

// Redirects "/" to "/about" always
// Protected pages redirect to "/login" if not logged in
function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");
  if (!userId) return <Navigate to="/login" replace />;
  return children;
}

function Layout() {
  const location = useLocation();

  const hideNav =
    location.pathname === "/about" ||
    location.pathname === "/login" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/alumni-dashboard" ||
    location.pathname === "/student-dashboard";

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        {/* Default → About */}
        <Route path="/"                   element={<Navigate to="/about" replace />} />
        <Route path="/about"              element={<About />} />
        <Route path="/login"              element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard"          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/alumni-dashboard"   element={<ProtectedRoute><AlumniDashboard /></ProtectedRoute>} />
        <Route path="/student-dashboard"  element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/network"            element={<ProtectedRoute><Network /></ProtectedRoute>} />
        <Route path="/jobs"               element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/events"             element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/profile"            element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/requests"           element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path="/connected"          element={<ProtectedRoute><Connected /></ProtectedRoute>} />
        <Route path="/my-jobs"            element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        <Route path="/my-events"          element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />

        {/* Catch-all → About */}
        <Route path="*"                   element={<Navigate to="/about" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;