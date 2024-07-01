import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
const {isAuthenticated}=useAuth0();
return isAuthenticated?(<Outlet/>):(<Navigate to="/" replace/>)
}

export default ProtectedRoute;
// see there are many routes been defined only the loggedin can go forward otherwise it wont be redirected  