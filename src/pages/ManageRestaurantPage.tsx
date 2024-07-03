// ManageRestaurantPage.tsx
import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isRestaurantLoading } = useGetMyRestaurant();

  // Combine loading states
  const isFormLoading = isLoading || isRestaurantLoading;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createMyRestaurant}
      isLoading={isFormLoading}
    />
  );
};

export default ManageRestaurantPage;
