import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const CustomerPrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/customer/login" replace={true} />;
};

export default CustomerPrivateRoute;
