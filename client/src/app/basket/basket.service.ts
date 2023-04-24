import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomerBasket, ICustomerBasket } from '../shared/models/customerBasket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/models/product';
import { IBasketItem } from '../shared/models/basketItem';
import { IBasketTotals } from '../shared/models/basketTotals';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<ICustomerBasket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<ICustomerBasket>(this.baseUrl + 'Basket?id=' + id).subscribe({
      next: customerBasket => {
        this.basketSource.next(customerBasket);
        this.calculateTotals();
      }
    });
  }

  setBasket(customerBasket: ICustomerBasket) {
    return this.http.post<ICustomerBasket>(this.baseUrl + 'Basket', customerBasket).subscribe({
      next: customerBasket => {
        this.basketSource.next(customerBasket);
        this.calculateTotals();
      }
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct | IBasketItem, quantity = 1) {
    if (this.isProduct(item)) {
      item = this.mapProductItemToBasketItem(item);
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  private mapProductItemToBasketItem(item: IProduct): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private createBasket(): ICustomerBasket {
    const basket = new CustomerBasket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((prevVal, currVal) => prevVal + (currVal.price * currVal.quantity), 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private isProduct(item: IProduct | IBasketItem): item is IProduct {
    return (item as IProduct).productBrand !== undefined;
  }

  private deleteBasket(basket: ICustomerBasket) {
    return this.http.delete(this.baseUrl + 'Basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    });
  }
}
