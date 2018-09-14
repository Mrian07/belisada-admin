import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourirService } from '../../../@core/services/courir/courir.service';
import { ListCourir } from './../../../@core/models/courir/courir.model';

@Component({
  selector: 'shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {
  listCourir: ListCourir;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courirServices: CourirService
  ) { }

  ngOnInit() {
   this.loadData();
  }

  loadData(){
    this.courirServices.getCourir().subscribe(response => {
      this.listCourir = response;
      console.log('datanya', response);
    });
  }

}
