import { Component, OnInit, ElementRef } from '@angular/core';
import { DateFormatEnum } from '../../../@core/enum/date-format.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import { ManageProductService } from 'app/@core/services/manage-product/manage-product.service';
import { detailListingProduct } from 'app/@core/models/manage-product/manage-product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit{
    now: Date = new Date();
    defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;

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
    currentPage: number;
    pages: any = [];
    lastPage: number;
    lisitingProd: detailListingProduct[];
    a: any;
    private rowSelected: number;
    

    constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private mageProd: ManageProductService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute
    // private dateUtil: DateUtil
    ) { 
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.formData();
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.pages = [];
            this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
            const queryParams = {
                page: this.currentPage,
                itemperpage: 10,
            };
            this.mageProd.getListingProductMaster(queryParams).subscribe(response => {
                this.pages = [];
                this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
                this.lisitingProd = response.content;
                console.log(response.content)
                this.lastPage = response.totalPages;
                for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
                    if (r > 0 && r <= this.lastPage) {
                        this.pages.push(r);
                    }
                }
            });
        });
    }

    private formData() {
        this.addEventForm = this.fb.group({
            eventName: ['', [Validators.required]],

            joinStartDate: ['', [Validators.required]],
            joinEndDate: ['', [Validators.required]],
            showStartDate: ['', [Validators.required]],
            showEndDate: ['', [Validators.required]],
            eventStartDate: ['', [Validators.required]],
            eventEndDate: ['', [Validators.required]],

            products: this.fb.array([this._initProducts()]),
        });
    }

    private _initProducts(): FormGroup {
        // initialize our variants
        return this.fb.group({
            productName: ['', [Validators.required]],
            productVariant: ['', [Validators.required]],
            productQuantity: ['', [Validators.required]],
            priceMin: ['', [Validators.required]],
            priceMax: ['', [Validators.required]],
        });
    }


    searchK(event) {
        const key = event.target.value;
        console.log(key);
        const queryParams = {
            page: this.currentPage,
            itemperpage: 10,
            name: key,
            ob : 'custom'
        }
        console.log(event);
        if (key === '' || event.key === 'Enter') {
            this.mageProd.getListingProductMaster(queryParams).subscribe(response => {
                this.lisitingProd = response.content;
            });
        } else {
            this.mageProd.getListingProductMaster(queryParams).subscribe(data => {
                this.lisitingProd = data.content;
            });
        }
    }


    popAdd(content){
        this.modalService.open(content, { size: 'lg' });
    }

    d(a) {
        console.log(a);
    }

    // public openCloseRow(idReserva: number): void {

    //     if (this.rowSelected === -1) {
    //         this.rowSelected = idReserva;
    //     } else {
    //         if (this.rowSelected === idReserva) {
    //         this.rowSelected = -1;
    //         } else {
    //             this.rowSelected = idReserva;
    //         }
    
    //     }
    // }

}
