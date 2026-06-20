import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";

import StudentDashboard from "./pages/student/StudentDashboard";
import CreateComplaint from "./pages/student/CreateComplaint";
import MyComplaints from "./pages/student/MyComplaints";
import StudentProfile from "./pages/student/StudentProfile";

import WardenDashboard from "./pages/wardern/WardenDashboard";
import ManageComplaints from "./pages/wardern/ManageComplaints";
import WardenProfile from "./pages/wardern/WardenProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/create-complaint"
          element={<CreateComplaint />}
        />

        <Route
          path="/student/my-complaints"
          element={<MyComplaints />}
        />

        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/warden/dashboard"
          element={<WardenDashboard />}
        />

        <Route
          path="/warden/complaints"
          element={<ManageComplaints />}
        />

        <Route
          path="/warden/profile"
          element={<WardenProfile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;