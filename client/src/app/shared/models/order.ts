import { IAddress } from "./address";
import { IOrderItem } from "./orderItem";

export interface IOrderToReturn {
    id: number;
    orderItems: IOrderItem[];
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    subtotal: number;
    total: number;
    status: string;
}

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}