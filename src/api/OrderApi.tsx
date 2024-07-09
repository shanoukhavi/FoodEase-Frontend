import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItem: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutSessionRequest),
    });

    const responseText = await response.text();

    try {
      const jsonResponse = JSON.parse(responseText);
      if (!response.ok) {
        console.error('Error response from server:', jsonResponse);
        throw new Error(`Unable to create checkout session: ${response.status} ${response.statusText}`);
      }
      return jsonResponse;
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
    }
  };

  const { mutateAsync: createCheckoutSession, isLoading, reset } = useMutation(createCheckoutSessionRequest, {
    onError: (error: Error) => {
      toast.error(error.message);
      reset();
    }
  });

  return {
    createCheckoutSession,
    isLoading,
  };
};
