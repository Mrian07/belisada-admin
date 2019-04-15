import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';
import { EventService } from 'app/@core/services/manage-event/manage-event.service';
import { EventList, Product, ProductList, GetVariant, VariantMaster, Variant, MasterProduct } from 'app/@core/models/manage-event/manage-event.model';
import { DateFormatEnum } from 'app/@core/enum/date-format.enum';
import { IMyDpOptions } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Common } from './common';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/@core/services/globals/loading.service';

function compareTwoPrices(c: AbstractControl) {
    if (c.get('priceMin').value === '' || c.get('priceMax').value === '') {
        return null;
    }

    return +c.get('priceMin').value >= +c.get('priceMax').value ?
    { 'invalidprice': true } : null;
}
@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent {
    private subscriptions: Array<Subscription> = [];
    listProduct: Product[];
    now: Date = new Date();
    defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;
    submitted: Boolean = false;
    f: any;
    content: any;

    isSearch:Boolean = false;

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

    addProductForm: FormGroup;

    pages: any = [];
    currentPage: any;
    listEvent: EventList = new EventList();
    listVariant: GetVariant = new GetVariant;
    listProductEvent: MasterProduct = new MasterProduct();
    lastPage: number;

    name: string;
    joinDate: string;
    showDate: string;
    eventDate: string;

    private rowSelected: number;
    private rowSelect: number;
    productId: number;
    eventId: any;
    variantFormArray: FormArray;

    langControlVariant: Array<GetVariant> = [];
    masterProductId: number;
    routeUrl: boolean;
    VariantAttr: any[];
    public displayImage: string;
    isFalse: Boolean = false;
    isVarian: Boolean = false;

    public product: Variant = new Variant();

    public price: number;
    public specialPrice: number;
    public stock: number;
    prod: any;

    constructor(
        private modalService: NgbModal,
        private eventService: EventService, 
        public fb: FormBuilder, 
        private router: Router, 
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService) {}
    
    get addP() { return this.addProductForm.controls; }

    ngOnInit(){
        this.loadDataEvent();
        this.addProductForm = this.fb.group({
            masterProductId: [''],
            maxPurhaseQty:  ['',  [Validators.required]],
        
            productVariants: this.fb.array([]),
        });

        
    }

    loadDataProduct(productId, name) {
        this.isSearch = false;
        this.isVarian = true;
        this.productId = productId;
        this.name = name;

        this.eventService.getDetailVariant(productId).subscribe(respon => {
            console.log('data : variant', respon.data);
            this.VariantAttr = respon.data;
            this.VariantAttr.forEach((it, index) => {
                this.addVariants();

                this.addProductForm.patchValue({
                    masterProductId: productId,
                });

                const control = <FormArray>this.addProductForm.get('productVariants');
                control.at(index).patchValue({
                    masterVariantId: it.productId,
                    
                });
            });
        });

    }

    toggleControl(it: FormArray) {
        const isActive = it.controls['isActive'].value;
        if (isActive === false) {
            it.controls['priceMax'].disable();
            it.controls['priceMin'].disable();
            it.controls['qty'].disable();
        } else {
            it.controls['priceMax'].enable();
            it.controls['priceMin'].enable();
            it.controls['qty'].enable();
        }
    }

    private _initVariants(): FormGroup {
        return this.fb.group({
            isActive: [true],
            masterVariantId: [''],
            priceMax: ['', [Validators.required, Validators.min(100)]],
            priceMin: ['', [Validators.required, Validators.min(100)]],
            qty: ['', [Validators.required]]
        }, {validator: compareTwoPrices});
    }

    /**
     * Add variant form group array
     */
    public addVariants(): void {
        // add variants to the list
        const control = <FormArray>this.addProductForm.get('productVariants');
        control.push(this._initVariants());
    }

    /**
     * Get form array varians
     * @param form Form group
     */
    public getVariants(form) {
        return form.controls.productVariants.controls;
    }

    // public applyForAll() {
    //     this.getVariants(this.addProductForm).forEach(control => {
    //         control.patchValue({
    //             priceMax: this.price,
    //             priceMin: this.specialPrice,
    //             qty: this.stock
    //         });
    //     });
    //     this.calculateDiscount();
    // }

    xx() {
        const control = <FormArray>this.addProductForm.get('productVariants');
        control.value.forEach(asd => {
            if (asd.isActive) {
                console.log('123');
            }
        });
        console.log(control.value);
    }

    public submit(eventId) {
        this.submitted = true;
        this.calculateDiscount();

        const control = <FormArray>this.addProductForm.get('productVariants');
        const variantsOnlyChecked = control.value.filter(item => item.isActive !== false);

        // console.log('control: ', control);

        const variantsControls = <FormArray>this.getVariants(this.addProductForm);

        // return;
        const productFormModified = this.addProductForm.value;
        productFormModified.productVariants = variantsOnlyChecked;

        console.log('productFormModified: ', productFormModified);

    }

    public postProduct(eventId) {
        // console.log('invalid controls: ', this.findInvalidControls(this.addProductForm));

        // this.loadingService.show();
        this.submitted = true;
        this.calculateDiscount();

        const control = <FormArray>this.addProductForm.get('productVariants');
        const variantsOnlyChecked = control.value.filter(item => item.isActive !== false);

        // console.log('control: ', control);

        const variantsControls = <FormArray>this.getVariants(this.addProductForm);

        // return;
        const productFormModified = this.addProductForm.value;
        productFormModified.productVariants = variantsOnlyChecked;

        console.log('productFormModified: ', productFormModified);

        const c = variantsOnlyChecked;
        const xx = variantsOnlyChecked.forEach(element => {
            if (element.priceMax < 100 && element.priceMin < 100) {
                swal(
                    'Warning',
                    'Harga tidak boleh dibawah 100',
                    'warning'
                );
                this.loadingService.hide();
                return;
            }
        }); 



        if (this.addProductForm.valid) {
            swal({
                title: 'Info',
                text: 'Apakah semua data sudah benar?',
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Iya',
                cancelButtonText: 'Tidak',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                reverseButtons: true
            }).then ((result) => {
                if (result.value) {
                    console.log('this.addProductForm.value----: ', this.addProductForm.value);
                    this.eventService.createEventProduct(eventId,productFormModified).subscribe(response => {
                        swal (
                            'Success',
                            'Produk berhasil ditambahkan',
                            'success'
                        )
                    });
                    this.addProduct(this.content,eventId);
                } else {
                    swal (
                        'Warning',
                        'Produk gagal ditambahkan',
                        'warning'
                    )
                }
            });

            // console.log('this.addProductForm.value----: ', this.addProductForm.value);
            // this.eventService.createEventProduct(eventId,productFormModified).subscribe(response => {
            //     // console.log(response);
            //         swal(
            //         'belisada.co.id',
            //         response.message,
            //         (response.status === 0) ? 'error' : 'success'
            //     );
            //     if (response.status === 1) {
            //         swal({
            //             title: 'Apakah anda ingin menambahkan produk lain?',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Ya',
            //             cancelButtonText: 'Tidak',
            //             confirmButtonClass: 'btn btn-success',
            //             cancelButtonClass: 'btn btn-danger',
            //             buttonsStyling: false,
            //             reverseButtons: true
            //         }).then((result) => {
            //             if (result.value) {
            //                 this.addProduct(this.content,eventId);
            //             } else {
            //                 swal (
            //                     'Success',
            //                     'Produk berhasil ditambahkan',
            //                     'success'
            //                 )
            //                 this.router.navigate(['/event']);
            //             }
            //             this.loadingService.hide();
            //         })
            //     }
            

            // if ( this.router.url === '/edit-products/' + this.masterId) {
            //     console.log('this.addProductForm.value-asd---: ', this.addProductForm.value);
            //     this.productService.editProductPost(productFormModified).subscribe(response => {
            //     // console.log(response);
            //         swal(
            //         'belisada.co.id',
            //         response.message,
            //         (response.status === 0) ? 'error' : 'success'
            //     );
            //     if (response.status === 1) {
            //         this.router.navigate(['/listing-product']);
            //         this.loadingService.hide();
            //     }
            //     });
            // } else {

            //     console.log('this.addProductForm.value----: ', this.addProductForm.value);
            //     this.productService.addProductV2(productFormModified).subscribe(response => {
            //     // console.log(response);
            //         swal(
            //         'belisada.co.id',
            //         response.message,
            //         (response.status === 0) ? 'error' : 'success'
            //     );
            //     if (response.status === 1) {
            //         this.router.navigate(['/listing-product']);
            //         this.loadingService.hide();
            //     }
            //     });

            // }
        } else {
            console.log('salah nih');
            this.loadingService.hide();
        }
    }

    calculateDiscount() {
        const controls = this.getVariants(this.addProductForm);
        controls.forEach(control => {
            const con: FormGroup = control;
            // console.log('control: ', control);
            control.patchValue({
                discount: Math.round(100 - ((+con.controls['priceMin'].value / +con.controls['priceMax'].value) * 100))
            });
          // console.log('calculateDiscount', control.controls['discount'].value);
        });
    }

    numberCheck(event: any) {
        const pattern = /[0-9]/;
    
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    
    }

    loadDataEvent() {
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
                    this.loadDataEvent();
                });
            }
            });
    }

    deleteProduct(eventId,masterProductEventId) {

        swal({
            title: 'Alert',
            text: 'Anda yakin akan menghapus produk ini?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Iya',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true
            }).then((result) => {
            if (result.value) {
        
                this.eventService.deleteProduct(eventId,masterProductEventId).subscribe(respon => {
                    this.openRowEvent(eventId);
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

    addProduct(content,id){
        this.modalService.open(content, { size: 'lg', container: 'nb-layout'});
        this.eventId = id;
    }

    d(a) {
        console.log(a);
        this.addProductForm.reset();
        this.router.navigate(['/event']);
    }

    searchK(event) {
        this.isSearch= true;
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

    public openRowEvent(id: number): void {
        this.eventId = id;

        if (this.rowSelected === -1) {
            this.rowSelected = id
        } else {
            if (this.rowSelected == id) {
                this.rowSelected = -1
            } else {
                this.rowSelected = id
            }
        }

        this.eventService.getEventProduct(id).subscribe(response => {
            console.log('prooood:', response);
            this.listProductEvent = response;
            this.prod = response.totalElements;
        });
    }

}
