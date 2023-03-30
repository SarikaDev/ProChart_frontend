import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";

const RegisterPage = lazy(() => import("../Forms/Registration"));
const LoginPage = lazy(() => import("../Forms/Login"));
const HomePage = lazy(() => import("../Screens/Home"));

const HandleRoutes = ({ children }) => (
  <>
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      {/* Private Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/home' element={<HomePage />} />
      </Route>
    </Routes>
    {children}
  </>
);

export default HandleRoutes;
