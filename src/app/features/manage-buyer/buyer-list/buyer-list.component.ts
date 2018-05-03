import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ManageBuyerService } from '../../../@core/services/manage-buyer/manage-buyer.service';

@Component({
  selector: 'buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent implements OnInit {

  constructor(
    private manageBuyerService: ManageBuyerService
  ) {
    
  }

  ngOnInit(): void {
    const queryParams = {
      page: 1,
      itemperpage: 10
    }
    this.manageBuyerService.getBuyerList(queryParams).subscribe(response => {
      console.log('response: ', response);
    })
  }
}
