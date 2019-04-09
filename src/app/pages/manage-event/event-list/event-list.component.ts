import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';
import { EventService } from 'app/@core/services/manage-event/manage-event.service';
import { EventList, Product } from 'app/@core/models/manage-event/manage-event.model';
import { DateFormatEnum } from 'app/@core/enum/date-format.enum';
import { IMyDpOptions } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent {
    listProduct: Product[];
    now: Date = new Date();
    defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;
    submitted: Boolean = false;
    f: any;
    content: any;

    myDatePickerOptions: IMyDpOptions = {
        // other options... https://github.com/kekeh/mydatepicker#options-attribute
        dateFormat: this.defaultDateFormat,
        todayBtnTxt: 'Today',
        editableDateField: false,
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        maxYear: this.now.getFullYear() - 12,
        minYear: this.now.getFullYear() - 90,
        disableSince: {
            year: this.now.getFullYear() - 12,
            month: this.now.getMonth() + 1,
            day: this.now.getDate()
        }
    };
      // ----- End date picker declaration required

    addEventForm: FormGroup;

    pages: any = [];
    currentPage: any;
    listEvent: EventList = new EventList();
    lastPage: number;

    name: string;
    joinDate: string;
    showDate: string;
    eventDate: string;

    private rowSelected: number;

    constructor(
        private modalService: NgbModal,
        private eventService: EventService, 
        public fb: FormBuilder, 
        private router: Router, 
        private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.pages = [];
            this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
            const queryParams = {
                // page: this.currentPage,
                // itemperpage: 10
            }
            this.eventService.getEvent(queryParams).subscribe(response => {
                console.log('isi', response);
                this.listEvent = response;
                this.lastPage = this.listEvent.totalPages;
                for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
                if (r > 0 && r <= this.listEvent.totalPages) {
                    this.pages.push(r);
                }
                }
            });
        });
    }

    deleteEvent(id) {

        swal({
            title: 'Alert',
            text: 'Anda yakin akan menghapus event ini?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Iya',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true
            }).then((result) => {
            if (result.value) {
        
                this.eventService.deleteEvent(id).subscribe(respon => {
                    this.router.navigate(['event/']);
                });
            }
            });
    }

    goToEdit(e) {
        // console.log(this.router.navigate(['/edit/' + e]));
        console.log(e);
        this.router.navigate(['event/edit/' + e]);
    }


    setPage(page: number, increment?: number) {
        if (increment) { page = +page + increment; }
        if (page < 1 || page > this.listEvent.totalPages) { return false; }
        this.router.navigate(['/buyer'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
        window.scrollTo(0, 0);
    }

    public openCloseRow(id: number): void {
    
        if (this.rowSelected === -1) {
            this.rowSelected = id
        } else {
            if (this.rowSelected == id) {
                this.rowSelected = -1
            } else {
                this.rowSelected = id
            }
        }
    }

    addProduct(content,id){
        this.modalService.open(content, id);
    }

    d(a) {
        console.log(a);
        this.addEventForm.reset();
    }

    searchK(event) {
        const key = event.target.value;
        console.log(key);
        console.log(event);
        if (key === '' || event.key === 'Enter') {
            this.eventService.getProductList(key).subscribe(response => {
            this.listProduct = response.data;
            });
        } else {
            this.eventService.getProductList(key).subscribe(data => {
            this.listProduct = data.data;
            });
        }
    }
}
