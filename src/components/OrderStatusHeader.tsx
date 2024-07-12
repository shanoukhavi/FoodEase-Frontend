import { Order } from "@/types";

import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    // when  we create we weill get that it is consider as the object mate 

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimateDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();
    // so it taken as horus and minute smate //like whernever we get as 12:2 so 12 hrs minute sis 2 

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // if see minutes u het as below 10 so uwill eht as 09 08 

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>
      {/* here it show s what is ur status anfd what is expexcted y which time u wil get here  */}
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;