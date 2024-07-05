import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuContent } from "./ui/dropdown-menu";

type Props={
 onChange:(value:string)=>void;
 sortOption:string;
};
const SORT_OPTIONS=[
    {
        label:"Best match",
        value:"bestMatch"
    },
    {
        label:"Delivery price",
        value:"deliveryPrice"
    },
    {
        label:"Estimated delivery time",
        value:"estimateDeliveryTime"
    },
]
// thsee are the sort options been defined which have the delivery price estiamtedDelived model and studff 
const SortOptionDropdown=({onChange,sortOption}:Props)=>{
 return (
    <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
            <Button variant="outline" className="w-full">Sort by{sortOption}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
{SORT_OPTIONS.map((option)=>(
    <DropdownMenuItem className="cursor-pointer" onClick={()=>onChange(option.value)}>
{option.label}
    </DropdownMenuItem>
))}
        </DropdownMenuContent>
    </DropdownMenu>
 )
}

export default SortOptionDropdown;