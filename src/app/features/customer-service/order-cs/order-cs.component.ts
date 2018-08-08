import { Content, Transaction } from './../../../@core/models/customer-service-m/customer-model';
import { Component, OnInit } from '@angular/core';
import { OrderSeService } from '../../../@core/services/order-service/order-se.service';

@Component({
  selector: 'order-cs',
  templateUrl: './order-cs.component.html',
  styleUrls: ['./order-cs.component.scss']
})
export class OrderCsComponent implements OnInit {
  listOrder: Content[];
  imagenich;

  constructor(
    private orderSe: OrderSeService
  ) {
    this.imagenich = 'http://image.belisada.id:8888/unsafe/100x100/center/filters:fill(fff)/'
  }

  ngOnInit() {
    this.orderSe.getList().subscribe(respon => {
      this.listOrder = respon.content;
      console.log('asdasdasd', respon);
    });

  }

}
