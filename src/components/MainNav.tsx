import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav=()=>{
    const {loginWithRedirect,isAuthenticated}=useAuth0();
return(
    <span className="flex space-x-2 items-center">
        {isAuthenticated?<UsernameMenu/>:   <Button variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white" onClick={async()=>await loginWithRedirect()}>
    Log In    
    </Button>}
    {/* is logedin then the username with the other functionality otherwiae the button which is logedin  */}
    </span>
 
// one button is been added after the thing for login  purpose and all
)
}

export default MainNav;