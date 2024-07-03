import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CusinesSection from "./CusinesSection";
import MenuSection from "./MenuSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import ImageSection from "./ImageSection";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurantName is required",
  }).min(1, "restaurantName cannot be empty"),
  city: z.string({
    required_error: "city is required",
  }).min(1, "city cannot be empty"),
  country: z.string({
    required_error: "country is required",
  }).min(1, "country cannot be empty"),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number",
  }).min(0, "delivery price must be at least 0"),
  estimateDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }).min(0, "estimated delivery time must be at least 0"),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
  imageUrl: z.string().optional(), // Add imageUrl to the schema
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimateDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      imageFile: new File([], ""), // Provide a default value for the image file
      imageUrl: "", // Default value for imageUrl
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    // Reset form values with restaurant data if necessary
    form.reset({
      restaurantName: restaurant.restaurantName,
      city: restaurant.city,
      country: restaurant.country,
      deliveryPrice: restaurant.deliveryPrice,
      estimateDeliveryTime: restaurant.estimateDeliveryTime,
      cuisines: restaurant.cuisines,
      menuItems: restaurant.menuItems.map(item => ({
        name: item.name,
        price: item.price,
      })),
      imageFile: new File([], ""), // Provide a default empty file
      imageUrl: restaurant.imageUrl, // Use imageUrl from restaurant data
    });
  }, [restaurant, form]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // Convert formDataJson to a new FormData object
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
    formData.append("estimateDeliveryTime", formDataJson.estimateDeliveryTime.toString());
    // Append cuisines
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    // Append menu items
    formDataJson.menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name);
      formData.append(`menuItems[${index}][price]`, (item.price * 100).toString());
    });
    formData.append("imageFile", formDataJson.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CusinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
