import {
  Navigate,
  useLocation,
} from "react-router-dom";

export default function PartnerProtectedRoute({
  children,
}) {
  const location = useLocation();

  const token = localStorage.getItem(
    "dbs_partner_token"
  );

  if (!token) {
    return (
      <Navigate
        to="/partner/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}