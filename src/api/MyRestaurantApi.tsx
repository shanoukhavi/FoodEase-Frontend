import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook to get the restaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  return { restaurant, isLoading };
};

// Hook to create a restaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

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

  const { mutate, isLoading, isSuccess, isError } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant created!");
    },
    onError: () => {
      toast.error("Unable to create restaurant");
    },
  });

  return { createMyRestaurant: mutate, isLoading };
};

// Hook to update a restaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isLoading, isSuccess, isError } = useMutation(updateRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant updated successfully");
    },
    onError: () => {
      toast.error("Failed to update restaurant");
    },
  });

  return { updateRestaurant, isLoading };
};
