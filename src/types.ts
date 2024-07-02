export type User={
    _id:string,
    emnail:string,
    name:string,
    addressLine1:string,
    city:string,
    country:string,
}
export type MenuItem={
    _id:string;
    name:string;
    price:number;
}
export type Restaurant={
    _id:string;
    user:string;
    restaurantName:string;
    city:string;
    country:string;
    estimateDeliveryTime:number;
    cuisines:string[];
    menuItems:MenuItem[];
    imageUrl:string;
    lastUpdated:string;

}