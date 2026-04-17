import React from "react";
import AlumniDashboard  from "./AlumniDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard() {
  const role = localStorage.getItem("role");
  return role === "alumni" ? <AlumniDashboard /> : <StudentDashboard />;
}

export default Dashboard;