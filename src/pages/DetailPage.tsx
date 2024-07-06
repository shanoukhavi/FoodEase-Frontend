 // Adjust the import path as needed
import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found</div>;
  }
return(
    <div className="flex flex-col gap-10">
        <AspectRatio  ratio={16/5}><img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant={restaurant}/>
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {restaurant.menuItems.map((menuItem)=>(
                    <MenuItem menuItem={menuItem}/>
                ))}
            </div>
            {/* left col */}
        </div>
    </div>
)
};

export default DetailPage;
// wheneever the user clickes to know more about restaruarnt and he want to ad the menu so he lcikcs that page and hinders here mate 