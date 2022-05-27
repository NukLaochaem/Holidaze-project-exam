import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContex";

const ProtectedRoute = ({ children }) => {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;
