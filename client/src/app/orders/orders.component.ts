import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrderToReturn } from '../shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrderToReturn[] = [];

  constructor(private orderService: OrdersService) { }
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => this.orders = orders
    })
  }
}