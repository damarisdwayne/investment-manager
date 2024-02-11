import { useAuthData } from "@/context/use-auth-data";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const { user, isLoading } = useAuthData();
  // const { pathname } = useLocation();
  const hasToken = !!localStorage.getItem("authToken");

  if (!hasToken && !user) {
    return <Navigate to="/login" />;
  }
  if (hasToken && isLoading) {
    return <span>...loading</span>;
  }
  if (!isLoading && hasToken && user) {
    return <Outlet />;
  }

  // If none of the above the no permissions
  return (
    <div>
      <h4>401 - Page Not Found</h4>
      <p>Sorry, the page you are looking for could not be found</p>
    </div>
  );
};
