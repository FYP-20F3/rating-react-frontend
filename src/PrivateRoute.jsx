import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ path }) => {
  const { currentUser, role } = useSelector((state) => state.user);
  // console.log(path.url, "user");

  // console.log(currentUser, "currentUser");
  // console.log(role, "role");
  
  // Validate role and redirect if necessary
  if (!currentUser || role !== path.role || role == undefined) {
    console.log("redirect");
    return <Navigate to={path.url} replace={true} />;
  }

  // Render the Outlet for authorized users
  return <Outlet />;
};

export default PrivateRoute;
