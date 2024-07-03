import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
const {isAuthenticated,isLoading}=useAuth0();
if(isLoading){
    return null;
    //si null uwil lget 
}
if(isAuthenticated){
return <Outlet/>;
}
return <Navigate to="/" replace  />;
// return isAuthenticated?(<Outlet/>):(<Navigate to="/" replace/>)
}

export default ProtectedRoute;
// see there are many routes been defined only the loggedin can go forward otherwise it wont be redirected  here when referesh he should get it 