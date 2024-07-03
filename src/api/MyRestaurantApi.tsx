import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQuery } from "react-query";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//new hook to get the restaurant mate 
export const useGetMyRestaurant=()=>{
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest=async():Promise<Restaurant>=>{
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method:"GET",
      headers: {

        Authorization: `Bearer ${accessToken}`,
      },
    });
    if(!response.ok){
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  }
  const {data:restaurant,isLoading}=useQuery("fetchMyRestaurant",getMyRestaurantRequest);
  return {restaurant,isLoading};
}

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function to create a restaurant
  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  // UseMutation hook to manage the mutation
  const { mutate, isLoading, isSuccess, isError } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant created!");
    },
    onError: () => {
      toast.error("Unable to create restaurant");
    },
  });

  // Return the mutate function and the loading state
  return { createMyRestaurant: mutate, isLoading };
};
