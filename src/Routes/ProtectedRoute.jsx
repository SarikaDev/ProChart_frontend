import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const auth = JSON.stringify(sessionStorage.getItem("token"));

  if (!!auth) {
    return true;
  } else if (!auth ?? auth === null) {
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
