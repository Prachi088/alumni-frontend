import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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
import Navbar           from "./components/Navbar";

function Layout() {
  const location = useLocation();

  // Hide Navbar on login AND dashboard pages (they have their own sidebar/topbar)
  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/alumni-dashboard" ||
    location.pathname === "/student-dashboard";

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/"                   element={<Login />} />
        <Route path="/dashboard"          element={<Dashboard />} />
        <Route path="/alumni-dashboard"   element={<AlumniDashboard />} />
        <Route path="/student-dashboard"  element={<StudentDashboard />} />
        <Route path="/network"            element={<Network />} />
        <Route path="/jobs"               element={<Jobs />} />
        <Route path="/events"             element={<Events />} />
        <Route path="/profile"            element={<Profile />} />
        <Route path="/requests"           element={<Requests />} />
        <Route path="/connected"          element={<Connected />} />
        <Route path="/my-jobs"            element={<MyJobs />} />
        <Route path="/my-events"          element={<MyEvents />} />
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