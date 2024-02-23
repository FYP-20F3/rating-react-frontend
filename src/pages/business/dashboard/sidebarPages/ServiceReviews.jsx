import { useSelector } from "react-redux";
import { customerLoginPath } from "../../../../const/path";
import { Navigate } from "react-router-dom";

const ServiceReviews = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }
  return <div>ServiceReviews</div>;
};

export default ServiceReviews;
