import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm"; // Import the type

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled,isLoading }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    // if the user is not authenticated
    return <Button onClick={onLogin} className="bg-orange-500 flex-1">Login to check out</Button>;
  }

  if (isAuthLoading || !currentUser || isLoading) {
    // if the user is loading
    return <LoadingButton />;
  }

  // when you click confirm payment or check in, a dialog comes about your information. Later with stripe integration you can make payment
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <DialogTitle>Checkout</DialogTitle>
        <DialogDescription>
          Confirm your details and proceed to payment.
        </DialogDescription>
        <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to payment" />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
// 1250 stripe implementation from  froms u collect info send into backend accept all the data open a secure connectio using stripe create or open the account otr the oage in thee stripe all the dat is taken by it order detail are svaed in out db again u will get i the localhost order has been payed or nto wee will see it here ate 