import * as cuid from "cuid";
import { IBasketItem } from "./basketItem";

export interface ICustomerBasket {
    id: string;
    items: IBasketItem[];
    deliveryMethodId?: number;
    clientSecret?: string;
    paymentIntentId?: string;
    shippingPrice: number;
}

export class CustomerBasket implements ICustomerBasket {
    id = cuid();
    items: IBasketItem[] = [];
    shippingPrice = 0;
}