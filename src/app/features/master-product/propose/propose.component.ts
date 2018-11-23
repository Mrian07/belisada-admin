import { Component, OnInit } from '@angular/core';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListPropose } from './../../../@core/models/manage-product/manage-product';

@Component({
  selector: 'propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.scss']
})
export class ProposeComponent implements OnInit {

  list: ListPropose[];
  constructor(
    private mageProd: ManageProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.mageProd.getListPropose().subscribe(Response => {
      this.list = Response.content;
      console.log('apa', Response);
    });
  }

}
