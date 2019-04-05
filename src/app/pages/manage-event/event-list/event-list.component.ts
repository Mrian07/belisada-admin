import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { exapmling, List, updateToko, detailToko, ListingItem, IsiData } from '../../../@core/models/manage-store/manage-store.model';
// import { ManageStoreService } from '../../../@core/services/manage-store/manage-store.service';

import swal from 'sweetalert2';

@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {

    search: any;
    emailAddress: any;
    dateJoin: any;
    gender: any;
    currentPage: any;
    pages: any;
    lastPage: any;

    setPage(currentPage, page?) {}
}
