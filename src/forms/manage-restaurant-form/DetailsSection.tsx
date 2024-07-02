import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection=()=>{
    const {control}=useFormContext();
    //it is the hook mate 
return(
    <div className="space-y-2">
        <div>
            <h2 className="text-zxl font-bold">Details</h2>
            <FormDescription>
                Enter the detailds about your restaurant 
            </FormDescription>
            {/* it is the description about the restaurant mate  */}

        </div>
        <FormField control={control} name="restaurantName" render={({field})=>(<FormItem>
            <FormLabel>
                Name
            </FormLabel>
            <FormControl>
                <Input {...field} className="bg-white"/>
            </FormControl>
            <FormMessage/>
        </FormItem>)}/>

            <div className="flex gap-4"> 
            <FormField control={control} name="city" render={({field})=>(<FormItem className="flex-1">
            <FormLabel>
                City
            </FormLabel>
            <FormControl>
                <Input {...field} className="bg-white"/>
            </FormControl>
            <FormMessage/>
        </FormItem>)}/>

        <FormField control={control} name="country" render={({field})=>(<FormItem className="flex-1">
            <FormLabel>
                Country
            </FormLabel>
            <FormControl>
                <Input {...field} className="bg-white"/>
            </FormControl>
            <FormMessage/>
        </FormItem>)}/>
        {/* this wraps up in one line mate  */}
            </div> 

            <FormField control={control} name="deliveryPrice" render={({field})=>(<FormItem className="max-w-[25%]">
            <FormLabel>
                Delivery Price ($)
            </FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" placeholder="1.50"/>
            </FormControl>
            <FormMessage/>
        </FormItem>)}/>

        <FormField control={control} name="estimateDeliveryTime" render={({field})=>(<FormItem className="max-w-[25%]">
            <FormLabel>
                Estimated Delivery Time (minutes)
            </FormLabel>
            <FormControl>
                <Input {...field} className="bg-white" placeholder="30"/>
            </FormControl>
            <FormMessage/>
        </FormItem>)}/>
    </div>
)
}

export default DetailsSection;