import * as cuid from "cuid";
import { IBasketItem } from "./basketItem";

export interface ICustomerBasket {
    id: string;
    items: IBasketItem[];
}

export class CustomerBasket implements ICustomerBasket {
    id = cuid();
    items: IBasketItem[] = [];

}