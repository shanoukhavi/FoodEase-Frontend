import { useGetMyOrders } from "@/api/OrderApi";

const OrderStatusPage=()=>{
const {orders,isLoading} =useGetMyOrders();
//the peage where u will het the thing shere 
if(isLoading){
    return "Loaoding...";

}
if(!orders || orders.length==0){
    return "No orders mate";
}
}

export default OrderStatusPage;