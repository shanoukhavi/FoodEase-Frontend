import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  // Ensure field.value is an array and handle the checkbox state correctly
  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      field.onChange([...field.value, cuisine]);
    } else {
      field.onChange(field.value.filter((value: string) => value !== cuisine));
    }
  };

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} // Check if the cuisine is in the array
          onCheckedChange={handleCheckedChange} // Handle the change event
        />
      </FormControl>
      <label className="ml-2">{cuisine}</label> {/* Add label for cuisine */}
    </FormItem>
  );
};

export default CuisineCheckbox;


