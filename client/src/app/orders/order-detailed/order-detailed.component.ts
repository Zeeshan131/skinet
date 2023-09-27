import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrderToReturn } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrderToReturn;

  constructor(private orderService: OrdersService, private route: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    this.getDetailedOrder();
  }

  getDetailedOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }
    })
  }
}