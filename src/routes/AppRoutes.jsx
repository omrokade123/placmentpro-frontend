import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Landing from "../pages/Landing";
import Practice from "@/pages/Practice";
import TestAttempt from "@/pages/TestAttempt";
import TestResult from "@/pages/TestResult";
import AttemptHistory from "@/pages/AttemptHistory";
import Interview from "@/pages/Interview";
import AdminRoute from "./AdminRoute";
import AdminLayout from "@/layout/AdminLayout";
import AdminExperiences from "@/pages/admin/AdminExperiences";
import AdminCompanies from "@/pages/admin/AdminCompanies";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import MyExperiences from "@/pages/MyExperiences";
import { Toaster } from "react-hot-toast";
import AdminQuestions from "@/pages/admin/AdminQuestions";
import EditQuestionPage from "@/pages/admin/EditQuestionPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Practice />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice/test/:id"
          element={
            <ProtectedRoute>
              <TestAttempt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/practice/result/:id" element={<TestResult />} />
        <Route
          path="/attempts"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttemptHistory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiences"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Interview />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-experiences"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MyExperiences />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="questions" element={<AdminQuestions />} />
            <Route path="questions/:id" element={<EditQuestionPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
