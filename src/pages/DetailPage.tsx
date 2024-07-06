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

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCarItems=sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCarItems ? JSON.parse(storedCarItems):[];
  }); // Initialize as empty array means that if u have the items while logigngit=f it to goes so u usee this storeCardItems which wil store it mate

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // Check if the item is in the cart. If it is, update the quantity. If not, add it to the cart.
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
      sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);
      return updatedCartItems;
    });
  };
  const onCheckOut = (userFormData:UserFormData) => {
    // Navigate to checkout page
    console.log("userFormData",userFormData);
    
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
        {/* left col */}
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
          </Card>
          {/* now see that login for login or the name for the checkout name mate  */}
          <CardFooter>
            <CheckoutButton disabled={cartItems.length===0} onCheckout={onCheckOut}/>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
