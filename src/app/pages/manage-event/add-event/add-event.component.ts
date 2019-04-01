import { Component, OnInit, ElementRef } from '@angular/core';
import { DateFormatEnum } from '../../../@core/enum/date-format.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import { ManageProductService } from 'app/@core/services/manage-product/manage-product.service';
import { detailListingProduct } from 'app/@core/models/manage-product/manage-product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    lisitingProd: detailListingProduct[];
    a: any;
    private rowSelected: number;
    

    constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private mageProd: ManageProductService
    // private dateUtil: DateUtil
    ) { 
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.formData();
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

    openLg(content, e) {
        this.modalService.open(content, { size: 'lg' });
        this.a = this.lisitingProd.find( x => x.productId === e);
        console.log('a', this.a);
    }

    popAdd(content){
        this.modalService.open(content);
    }

    public openCloseRow(idReserva: number): void {

        if (this.rowSelected === -1) {
            this.rowSelected = idReserva;
        } else {
            if (this.rowSelected === idReserva) {
            this.rowSelected = -1;
            } else {
                this.rowSelected = idReserva;
            }
    
        }
    }
}
