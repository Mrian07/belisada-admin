import { Component, OnInit, ElementRef } from '@angular/core';
import { DateFormatEnum } from '../../../@core/enum/date-format.enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import { ManageProductService } from 'app/@core/services/manage-product/manage-product.service';
import { detailListingProduct } from 'app/@core/models/manage-product/manage-product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Params, Router } from '@angular/router';
import swal from 'sweetalert2';
import { EventService } from 'app/@core/services/manage-event/manage-event.service';
import { Event, Product, DetailEventList } from 'app/@core/models/manage-event/manage-event.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit{
    
    submitted: Boolean = false;
    f: any;
    content: any;


    addEventForm: FormGroup;
    currentPage: number;
    pages: any = [];
    lastPage: number;
    lisitingProd: detailListingProduct[];
    a: any;
    private rowSelected: number;
    id: any;

    
    /* get dari query params*/
    eventId: number;
    

    constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    // private dateUtil: DateUtil
    ) { 
        this.rowSelected = -1;
        this.eventId = this.activatedRoute.snapshot.params.id;
    }

    ngOnInit() {
        this.formData();
        if (this.eventId) {
            this.title.setTitle('Edit Event');
            this.fillFormData(this.eventId);
        } else {
            this.title.setTitle('Create Event');
        }
    }

    private formData() {
        this.addEventForm = this.fb.group({
            eventName: ['', [Validators.required]],

            joinEventStartDate: ['', [Validators.required]],
            joinEventEndDate: ['', [Validators.required]],
            showEventStartDate: ['', [Validators.required]],
            showEventEndDate: ['', [Validators.required]],
            eventStartDate: ['', [Validators.required]],
            eventEndDate: ['', [Validators.required]],

            // products: this.fb.array([this._initProducts()]),
        });
    }

    fillFormData(id) {
        this.eventService.getEventById(id).subscribe(response => {
            const data = response;
            this.fillFormPatchValue(data);
        });
    }
    
    fillFormPatchValue(data: Event) {
        this.addEventForm.patchValue({
            eventName: data.eventName,
            joinEventStartDate: data.joinEventStartDate,
            joinEventEndDate: data.joinEventEndDate,
            showEventStartDate: data.showEventStartDate,
            showEventEndDate: data.showEventEndDate,
            eventStartDate: data.eventStartDate,
            eventEndDate: data.eventEndDate,
        });
    }

    // private _initProducts(): FormGroup {
    //     // initialize our variants
    //     return this.fb.group({
    //         productName: ['', [Validators.required]],
    //         productVariant: ['', [Validators.required]],
    //         productQuantity: ['', [Validators.required]],
    //         priceMin: ['', [Validators.required]],
    //         priceMax: ['', [Validators.required]],
    //     });
    // }

    d(a) {
        console.log(a);
    }

    setPage() {}
    
    onSubmit(data: Event){
        if (this.addEventForm.valid) {

            if (this.eventId) {
                this.addEventForm.patchValue({
                    eventName: data.eventName,
                    joinEventStartDate: data.joinEventStartDate,
                    joinEventEndDate: data.joinEventEndDate,
                    showEventStartDate: data.showEventStartDate,
                    showEventEndDate: data.showEventEndDate,
                    eventStartDate: data.eventStartDate,
                    eventEndDate: data.eventEndDate,
                });
                swal({
                    title: 'Alert',
                    text: 'Apakah semua data sudah benar?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Iya',
                    cancelButtonText: 'Tidak',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        this.eventService.editEvent( this.eventId,this.addEventForm.value).subscribe(response => {
                            this.router.navigate(['event/']);
                        });
                    }
                });
            } else {
                swal({
                    title: 'Alert',
                    text: 'Apakah semua data sudah benar?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Iya',
                    cancelButtonText: 'Tidak',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    reverseButtons: true
                    }).then((result) => {
                        if (result.value === true) {
                            console.log('event:', this.addEventForm.value);
                            console.log('value:', result.value);
                            const data: Event = new Event();
            
                            data.eventName = this.addEventForm.value.eventName;
                            data.joinEventStartDate = this.addEventForm.value.joinEventStartDate;
                            data.joinEventEndDate = this.addEventForm.value.joinEventEndDate;
                            data.showEventStartDate = this.addEventForm.value.showEventStartDate;
                            data.showEventEndDate = this.addEventForm.value.showEventEndDate;
                            data.eventStartDate = this.addEventForm.value.eventStartDate;
                            data.eventEndDate = this.addEventForm.value.eventEndDate;
                            this.eventService.createEvent(data).subscribe(respon => {
                                console.log('data event:',respon)
                    
                            });
                            swal(
                                'Success!',
                                'Terimakasih. Event telah dibuat dan masuk ke Event List.',
                                'success'
                            ).then(() => {
                                this.addEventForm.reset();
                                this.router.navigate(['event/']);
                            });
                        }
                    });
            }
        } else {
            swal(
                'Semua kolom harus diisi'
            )
        }
    }

    addProduct(content, id) {
        this.modalService.open(content, id);
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
