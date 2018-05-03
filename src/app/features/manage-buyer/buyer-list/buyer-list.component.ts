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
  
  values = '';
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: 'Name',
        type: 'string',
      },
      lastName: {
        title: 'Email Address',
        type: 'string',
      },
      username: {
        title: 'Date Joined',
        type: 'string',
      },
      email: {
        title: 'Gender',
        type: 'string',
      },
      age: {
        title: 'Spent',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableService,
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
      this.source.load(response);
    })
  }

  onClick(event) {
    console.log(event);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
