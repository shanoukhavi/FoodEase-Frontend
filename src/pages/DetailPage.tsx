import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckLoading } = useCreateCheckoutSession();
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          { _id: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 },
        ];
      }
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItem: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity,
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    try {
      const data = await createCheckoutSession(checkoutData);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout session creation failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
          </Card>
          <CardFooter>
            <CheckoutButton disabled={cartItems.length === 0 || isCheckLoading} onCheckout={onCheckOut} isLoading={isCheckLoading} />
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
// 13:38 