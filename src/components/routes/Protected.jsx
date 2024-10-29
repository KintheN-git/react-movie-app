import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Protected = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{user ? children : <Navigate to="/" />}</>;
};

export default Protected;
