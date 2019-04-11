import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';
import { EventService } from 'app/@core/services/manage-event/manage-event.service';
import { EventList, Product, ProductList, GetVariant, VariantMaster, Variant } from 'app/@core/models/manage-event/manage-event.model';
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
    listVariant: Variant[];
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

    public product: Variant = new Variant();

    public price: number;
    public specialPrice: number;
    public stock: number;

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
        this.loadDataProduct(this.productId);
        this.addProductForm = this.fb.group({
            masterProductId: [''],
            maxPurhaseQty:  ['',  [Validators.required]],
        
            productVariants: this.fb.array([]),
        });

            this.masterProductId = this.productId;
            this.addProductForm.patchValue({
                masterProductId: this.masterProductId
            });

            console.log(this.productId);
            this.routeUrl = this.router.url === '/products/varian/' + this.productId;
            if (this.router.url === '/products/varian/' + this.productId) {
                this.loadDataProduct(this.productId);

                this.eventService.variant(this.productId).subscribe(data => {
                    console.log('data : variant', data);
                    this.VariantAttr = data;
                    this.VariantAttr.forEach((variant, index) => {
                        this.addVariants();
                        const control = <FormArray>this.addProductForm.get('productVariants');
                        control.at(index).patchValue({
                            masterVarianId: variant.masterVarianId,
                        });
                    });
                });
            } else {
                this.eventService.getDetailVariant(this.productId).subscribe(data => {

                    this.product = data.data;
                    this.displayImage = this.product.imageUrl[0];
                    console.log('data:edited', data.data);
                    this.addProductForm.patchValue({
                        masterProductId: this.product.productId,
                        maxPurhaseQty: this.addProductForm.value.maxPurhaseQty,

                    });
                });

                this.eventService.getVariant(this.productId).subscribe(data => {
                    this.VariantAttr = data;
                    data.forEach((dataV2, index) => {
                        this.addVariants();
                        const control = <FormArray>this.addProductForm.get('productVariants');
                        control.at(index).patchValue({
                            isActive: dataV2.useVarian,
                            masterVarianId: dataV2.productId,
                            priceMax: dataV2.pricelist,
                            priceMin: dataV2.specialPrice,
                            qty: dataV2.qty
                        });
                        
                        if (dataV2.useVarian === false) {
                            control.at(index).patchValue({
                                pricelist: '',
                                specialPrice: '',
                                qty: '',
                            });
                            control.at(index).get('priceMax').disable();
                            control.at(index).get('priceMin').disable();
                            control.at(index).get('qty').disable();
                        }
                    });
                    if (this.VariantAttr.length >= 1) {
                        console.log('asd');
                        this.isFalse = true;
                    }
                });
            }

    }

    toggleControl(variant: FormArray) {
        const isActive = variant.controls['isActive'].value;
        if (isActive === false) {
            variant.controls['priceMax'].disable();
            variant.controls['priceMin'].disable();
            variant.controls['qty'].disable();
        } else {
            variant.controls['priceMax'].enable();
            variant.controls['priceMin'].enable();
            variant.controls['qty'].enable();
        }
    }

    private _initVariants(): FormGroup {
        return this.fb.group({
            isActive: [true],
            masterVarianId: [''],
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

    public applyForAll() {
        this.getVariants(this.addProductForm).forEach(control => {
            control.patchValue({
                priceMax: this.price,
                priceMin: this.specialPrice,
                qty: this.stock
            });
        });
        this.calculateDiscount();
    }

    xx() {
        const control = <FormArray>this.addProductForm.get('productVariants');
        control.value.forEach(asd => {
            if (asd.isActive) {
                console.log('123');
            }
        });
        console.log(control.value);
    }

    public postProductV2(id) {
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

            console.log('this.addProductForm.value----: ', this.addProductForm.value);
            this.eventService.createEventProduct(id,productFormModified).subscribe(response => {
            // console.log(response);
                swal(
                'belisada.co.id',
                response.message,
                (response.status === 0) ? 'error' : 'success'
            );
            if (response.status === 1) {
                this.router.navigate(['/event']);
                this.loadingService.hide();
            }
            });

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

    loadDataProduct(productId) {
        this.productId = productId;
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.pages = [];
            this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
            this.eventService.getVariant(productId).subscribe(response => {
                console.log('isi', response);
                this.listVariant = response;
                // this.lastPage = this.listEvent.totalPages;
                // for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
                // if (r > 0 && r <= this.listEvent.totalPages) {
                //     this.pages.push(r);
                // }
                // }
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
        this.modalService.open(content, id);
        this.eventId = id;
    }

    d(a) {
        console.log(a);
        this.addProductForm.reset();
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

    public openRowEvent(id: number): void {
    
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

    public openRowProduct(productId: number): void {

        this.eventService.getVariant(productId).subscribe(data => {
            console.log('varian:',data);
            // console.log('testvarian:',data[0]);
            });

        this.productId = productId;
        if (this.rowSelect === -1) {
            this.rowSelect = productId
        } else {
            if (this.rowSelect == productId) {
                this.rowSelect = -1
            } else {
                this.rowSelect = productId
            }
        }
    }
}
