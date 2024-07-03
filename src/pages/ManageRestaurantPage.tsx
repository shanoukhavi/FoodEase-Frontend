// ManageRestaurantPage.tsx
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant, isLoading: isRestaurantLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  // Combine loading states
  const isLoading = isCreateLoading || isUpdateLoading || isRestaurantLoading;

  // Determine if we are editing an existing restaurant or creating a new one
  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createMyRestaurant}
      isLoading={isLoading}
    />
  );
};

export default ManageRestaurantPage;
