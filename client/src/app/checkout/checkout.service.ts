import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { map } from 'rxjs';
import { IOrderToCreate, IOrderToReturn } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'Orders/deliveryMethods').pipe(
      map(dm => {
        return dm.sort((a, b) => b.price - a.price);
      })
    )
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post<IOrderToReturn>(this.baseUrl + 'Orders', order);
  }
}