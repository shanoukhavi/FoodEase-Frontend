import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection=()=>{
const {control}
=useFormContext();
// for the name and the price and the new menu u have to add and do it mate 
const {fields,append,remove}=useFieldArray({
    control,
    name:"menuItems",
});

return(
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <FormDescription>
                Create your menu and give each item a name and a price
            </FormDescription>
        </div>
        <FormField control={control} name="menuItems" render={()=>(
            <FormItem className="flex flex-col gap-2">
                {fields.map((_,index)=>(
                    <MenuItemInput index={index} removeMenuItem={()=>remove(index)}/>
                    // here qw add and remove the item at that index 
                ))}
            </FormItem>
        )}/>
        <Button type="button" onClick={()=>append({name:"",price:""})}>Add Menu item</Button>
        {/* adds balnks fields are added user can populatee as they like mate  */}
    </div>
)
}

export default MenuSection;
// this is the basic structure for the menu where u can add items who ur ur a owner mate in his 