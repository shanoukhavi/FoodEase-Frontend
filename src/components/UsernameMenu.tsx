import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2 rounded shadow-md space-y-2">
        <DropdownMenuItem asChild className="block w-full">
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500 block w-full">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="block w-full">
          <Link to="/user-profile" className="font-bold hover:text-orange-500 block w-full">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator className="my-2" />
        <DropdownMenuItem asChild className="block w-full">
          <Button onClick={() => logout()} className="flex w-full font-bold bg-orange-500 hover:bg-orange-600 text-white">
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
