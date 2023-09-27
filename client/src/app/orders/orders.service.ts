import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IOrderToReturn } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get<IOrderToReturn[]>(this.baseUrl + 'Orders');
  }
  
  getOrderDetailed(id: number) {
    return this.http.get<IOrderToReturn>(this.baseUrl + 'Orders/' + id);
  }
}