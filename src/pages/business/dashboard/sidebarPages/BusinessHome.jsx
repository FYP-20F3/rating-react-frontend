import { useSelector } from "react-redux";
import { customerLoginPath } from "../../../../const/path";
import { Navigate } from "react-router-dom";

const BusinessHome = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  return (
    <div className="d-block justify-content-center">
      <div>home</div>
      <div>home</div>
      <div>home</div>
    </div>
  );
};

export default BusinessHome;
