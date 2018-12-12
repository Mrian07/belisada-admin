import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from './../../../@core/services/brand/brand.service';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { CategoryService } from './../../../@core/services/category/category.service';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import {
  BrandList, CategoryList, CategoryAttribute,
  ProductSpecification, detailListingProduct,
  Varian, Variant
} from './../../../@core/models/manage-product/manage-product';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SpecificationList } from '../../../@core/models/category/category.model';

@Component({
  selector: 'master-p',
  templateUrl: './master-p.component.html',
  styleUrls: ['./master-p.component.scss']
})
export class MasterPComponent implements OnInit {
  addProductForm: FormGroup;

  brandList: BrandList = new BrandList();
  currentPgBrand: number;
  limitBrand: Number = 100;
  onBrandFocus: Boolean = false;
  onProductNameFocus: Boolean = false;
  measurementType: any;
  measurementTypeL: any;
  submitted: Boolean = false;
  xxzx: number;
  ngMdimensionsWidth: number;
  ngMdimensionsheight: number;
  categoryList = {
    C1: new CategoryList(),
    C2: new CategoryList(),
    C3: new CategoryList()
  };
  categoryName = {
    C1: '',
    C2: '',
    C3: '',
  };
  categoryId = {
    C1: '',
    C2: '',
    C3: '',
  };
  onCategoryFocus = {
    C1: false,
    C2: false,
    C3: false,
  };
  categoryAttributes: CategoryAttribute[];
  spec: any[] = [];


  /* get dari query params*/
  productId: number;

  listRows: any[];
  listRowSub: any[];

  listVarian: Varian[];

  listVariantChild = {
    V0: [],
    V1: []
  };

  variant: any[] = [];
  variantChild: any[] = [];
  varSimpen: any;
  varSimpenX: any;

  isTambahRow: Boolean = false;

  productUsed: any[] = [];

  public masterProductForm: FormGroup;
  public varians: FormArray;
  public variants: Variant[];
  public variantsOrdered = [];

  public attributeVariants = [];

  public isAttributeOk: Boolean = false;

  /* tutup nya */

  constructor(
    private brandService: BrandService,
    private el: ElementRef,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ProdService: ManageProductService,
    private title: Title,
    private manageServ: ManageProductService,

  ) {
    this.currentPgBrand = 1;
    this.categoryList.C1.data = [];
    this.categoryList.C2.data = [];
    this.categoryList.C3.data = [];
    this.categoryAttributes = [];
    this.measurementType = 0;
    this.measurementTypeL = 0;
    this.productId = this.route.snapshot.params.id;

  }

  get f() { return this.addProductForm.controls; }

  ngOnInit() {
    this.listVarian = [];
    this.formData();
    this.getBrandInit();
    this.getCategoryInit('C1');

    if (this.productId) {
      this.title.setTitle('Admin - Edit Product');
      this.fillFormData(this.productId);
      // this.fillFormDataSpec(this.productId);
    } else {
      this.title.setTitle('Admin - Add Product');
    }
  }

  fillFormData(productId) {
    this.manageServ.getListById(productId).subscribe(response => {
      const data = response.data;
      this.fillFormPatchValue(data);
    });
  }

  fillFormPatchValue(data: detailListingProduct) {
    this.addProductForm.patchValue({
      name: data.name,
      brandId: data.brandId,
      brandName: data.brandName,
      categoryThreeId: (data.categoryThreeId !== 0) ? data.categoryThreeId : data.categoryTwoId,
      classification: data.classification,
      description: data.description,
      imageUrl: data.imageUrl,
      weight: data.weight,
      specification: data.specification,
    });
    this.categoryName = {
      C1: data.categoryOneName,
      C2: data.categoryTwoName,
      C3: data.categoryThreeName
    };
    this.getCategoryInit('C2', data.categoryOneId);
    this.getCategoryInit('C3', data.categoryTwoId);

    const queryParams = {
      categoryid: (data.categoryThreeId === 0) ? data.categoryTwoId : data.categoryThreeId
    };

    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      this.fillFormSpecification(data.specification);
    });

    this.ProdService.getListVarian(queryParams.categoryid).subscribe(responVar => {
      responVar.forEach((item, index) => {

        this.variantsOrdered[index] = '';
      });
      this.variants = responVar;
    });
    this.ProdService.getListVarianDetail(data.productId).subscribe(responVarChild => {
      console.log('anak2', responVarChild);
      if (responVarChild.length !== 0) {
        responVarChild.forEach((item, index) => {



          if (index !== 0) this.addVariants();
          const varians = <FormArray>this.addProductForm.get('varians');

          // const masterVarianId = item.masterVarianId;

          varians.at(index).patchValue({
            masterVarianId: item.masterVarianId
          });

          // console.log('aapa', masterVarianId);

          const attributeVariants = <FormArray>varians.controls[index].get('attributeVarians');
          this.productUsed[index] = item.productUsed;
          varians.at(index).patchValue({
            imageUrl: item.imageUrl
          });



          item.attributeVarians.forEach((variant, j) => {
            attributeVariants.at(j).patchValue({
              attributeId: variant.attributeId,
              attributeValueId: variant.attributeValueId,
              value: variant.value
            });
          });
        });

        responVarChild[0].attributeVarians.forEach((item, index) => {
        const a = this.variants.find(x => x.attributeId === item.attributeId);
          this.variantsOrdered[index] = a;
        });
        this.isAttributeOk = true;
      }
    });


  }

  fillFormSpecification(specifications: SpecificationList[]) {
    specifications.forEach((specification) => {
      this.spec[specification.attributeId] = specification.attributeValueId;
    });
  }

  getCategoryInit(categoryType, parentid?) {
    const queryParams = {
      type: categoryType,
      all: true,
      isactive: true,
    };

    if (parentid) {
      queryParams['parentid'] = parentid;
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      this.categoryList[categoryType] = response;
    });
  }

  // getCategoryInitSpec(categoryType, parentid?) {
  //   const queryParams = {
  //     type: categoryType,
  //     all: true,
  //     isactive: true,
  //   };

  //   if (parentid) {
  //     queryParams['parentid'] = parentid;
  //   }
  //   this.categoryService.getCategory(queryParams).subscribe(response => {
  //     this.categoryListSpec[categoryType] = response;
  //   });
  // }

  varian1(id) {
    this.manageServ.getListVarianChild(id).subscribe(response => {
      this.listVariantChild.V0 = response;
    });
  }

  varian2(id) {
    this.manageServ.getListVarianChild(id).subscribe(response => {
      this.listVariantChild.V1 = response;
    });
  }

  getRows() {
    const data = [
      '1'
    ];

    this.listRows = data;

    const id = 1;
    const datas = [
      '1'
    ];

    this.listRowSub = datas;
  }

  // tambahRow(){

  //   const rowMax = Math.max.apply(null, this.listRows);
  //   const addRow = rowMax+1;
  //   this.listRows.push([addRow])
  //   const apa = Math.max.apply(null, this.listRows);
  // }

  // removeRow(no){
  //   this.listRows.splice(no, 1);
  // }

  // tambahRowSub(id){
  //   if (!this.listRowSub[id]) this.listRowSub[id] = [];
  //   const rowMax = Math.max.apply(id, this.listRowSub);
  //   const addRow = rowMax+1;
  //   console.log('jml sub', this.listRowSub.length)
  //   this.listRowSub[id].push([addRow])
  //   const apa = Math.max.apply(id, this.listRowSub);
  //   console.log('max sub', apa);
  //   console.log('array sub', this.listRowSub);
  // }

  private formData() {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      brandId: [''],
      brandName: ['', [Validators.required]],
      categoryThreeId: ['', [Validators.required]],
      classification: [''],
      couriers: [[]],
      description: ['', [Validators.required]],
      guaranteeTime: [''],
      imageUrl: [[], [Validators.required]],
      pricelist: [''],
      specialPrice: [''],
      discount: [''],
      qty: [''],
      specification: [[]],
      weight: ['',  [Validators.required]],
      productId:  this.productId ,
    //  varians: this.fb.array([this.variantsFormGroup()])

      varians: this.fb.array([this._initVariants()]),

    });
  }



  private _initVariants(): FormGroup {
    // initialize our variants
    return this.fb.group({
      masterVarianId: [''],
      attributeVarians: this.fb.array([this._initAttributeVariants(), this._initAttributeVariants()]),
      imageUrl: [[]]
    });
  }

  private _initAttributeVariants(): FormGroup {
    // initialize our attributeVariants
    return this.fb.group({
      attributeId: [''],
      attributeValueId: ['', [Validators.required]],
      value: ['']
    });
  }

  addVariants() {
    // add variants to the list
    const control = <FormArray>this.addProductForm.get('varians');
    control.push(this._initVariants());
  }

  public addAttributeVariants(j): void {
    const varians = <FormArray>this.addProductForm.get('varians');
    const control = <FormArray>varians.controls[j].get('attributeVarians');
    control.push(this._initAttributeVariants());
  }

  public getVariants(form) {
    return form.controls.varians.controls;
  }

  public getAttributeVariants(form) {
    return form.controls.attributeVarians.controls;
  }

  public removeAttributeVariant(j): void {
    const varians = <FormArray>this.addProductForm.get('varians');
    const control = <FormArray>varians.controls[j].get('attributeVarians');
    control.removeAt(j);
  }

  removeVariant(i) {
    const control = <FormArray>this.addProductForm.get('varians');
    control.removeAt(i);
  }

  public patchOtherValues(event, i, j) {
    const attributeValueId: number = +event.target.value;
    const varians = <FormArray>this.addProductForm.get('varians');
    const control = <FormArray>varians.controls[i].get('attributeVarians');
    control.at(j).patchValue({
      attributeId: this.variantsOrdered[j].attributeId,
      value: this.variantsOrdered[j].data.find(x => x.attributeValueId === attributeValueId).value
    });
  }

  public variantSelect(model, no) {
    if (model[0].name === model[1].name) {
      if (no === '1') {
        this.variantsOrdered[0] = '';
      } else {
        this.variantsOrdered[1] = '';
      }
    }
    const BreakExeption = {};
    try {
      model.forEach((x: any) => {
        if (x !== '') {
          const it = model.filter(m => m.attributeId === x.attributeId);

          if (it.length > 1) {
            this.isAttributeOk = false;
          } else {
            this.isAttributeOk = true;
          }
        } else {
          throw BreakExeption;
        }
      });
    } catch (error) {
      this.isAttributeOk = false;
    }
  }





  // variantsFormGroup(): FormGroup {
  //   return this.fb.group({
  //     attributeVarians: this.fb.array([this.variantsAttFormGroup()])
  //   })
  // }

  // variantsAttFormGroup(): FormGroup {
  //   return this.fb.group({
  //     attributeId: [''],
  //     attributeValueId: ['', [Validators.required]],
  //     value: [''],
  //   })
  // }

  onChanges(): void {
    this.addProductForm.valueChanges.subscribe(val => {
      console.log('val: ', val);
    });
  }

  isFieldValid(field: string) {
    return !this.addProductForm.get(field).valid && this.addProductForm.get(field).touched;
  }
validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
        control.markAsTouched({
            onlySelf: true
        });
    } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
    }
});
  }


  /**
   * Image product start
   */
  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }

  readThis(files: any[]): void {
    const imageUrl: any[] = this.addProductForm.get('imageUrl').value;
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (imageUrl.length < 5) {
          imageUrl.push(myReader.result);
          this.addProductForm.patchValue({
            imageUrl: imageUrl,
          });
        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
      };
      myReader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    const imageUrl: string[] = this.addProductForm.get('imageUrl').value;
    if (index > -1) {
      imageUrl.splice(index, 1);
    }
  }
  // --- Image product end

  /**
   * Product Brand Search
   */
  getBrandInit() {
    const brandName = this.addProductForm.get('brandName').value;
    const queryParams = {
      page: this.currentPgBrand,
      itemperpage: this.limitBrand,
      name: brandName === undefined ? '' : brandName,
      isactive: true,
      all: true,
    };
    this.brandService.getList(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  searchBrand(): void {
    this.addProductForm.patchValue({
      brandId: '',
    });
    const qsBrand = this.addProductForm.get('brandName').value;
    const queryParams = {
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      name: qsBrand === undefined ? '' : qsBrand,
      isactive: true,
      all: true,
    };
    this.brandService.getList(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  selectBrand(brand) {
    this.addProductForm.patchValue({
      brandId: brand.brandId,
      brandName: brand.name,
    });
  }

  onProductNameBlur(): void {
    setTimeout(() => { this.onProductNameFocus = false; }, 200);
  }
  onBrandBlur(): void {
    setTimeout(() => { this.onBrandFocus = false; }, 200);
  }

  onBrandScrollDown () {
    const brandName = this.addProductForm.get('brandName').value;
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--brand');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgBrand += 1,
        itemperpage: this.limitBrand,
        name: brandName === undefined ? '' : brandName,
        all: true,
      };
      this.brandService.getList(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
  }


  onCategoryBlur(categoryType) {
    setTimeout(() => { this.onCategoryFocus[categoryType] = false; }, 200);
  }

  searchCategory(categoryType, parentid?) {
    const queryParams = {
      name: this.categoryName[categoryType] === undefined ? '' : this.categoryName[categoryType],
      type: categoryType,
      all: true,
      isactive: true,
    };
    if (parentid) {
      queryParams['parentid'] = parentid;
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      this.categoryList[categoryType] = response;
    });
  }

  selectCategory(category) {

    console.log('hasil cat', category);
    this.addProductForm.patchValue({
      categoryThreeId: category.categoryId,
    });

    this.categoryName[category.type] = category.name;
    this.categoryId[category.type] = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId,
      isactive: true,
    };

    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {

      this.categoryAttributes = response;
      this.categoryAttributes.forEach((categoryAttribute) => {
        this.spec[categoryAttribute.attributeId] = '';
      });

      let categoryType;
      if (category.type === 'C1') {
        categoryType = 'C2';
        this.categoryName.C2 = '';
        this.categoryName.C3 = '';
      } else if (category.type === 'C2') {
        categoryType = 'C3';
        this.categoryName.C3 = '';
      } else {
        categoryType = false;
      }
      if (categoryType) {
        this.getCategoryInit(categoryType, category.categoryId);
      }

      this.ProdService.getListVarian(category.categoryId).subscribe(responVar => {
        responVar.forEach((item, index) => {

          this.variantsOrdered[index] = '';
        });
        this.variants = responVar;
      });

    });
  }

  specMapping(specValues) {
    this.categoryAttributes.forEach(x => {
      const productSpecification: ProductSpecification = new ProductSpecification();

      productSpecification.attributeId = x.attributeId;

      if (specValues[x.attributeId]) {
        productSpecification.attributeValueId =
        (x.isInstanceAttribute) ?
          null :
          x.data.find(i => i.attributeValueId === +specValues[x.attributeId]).attributeValueId;

        productSpecification.value =
          (x.isInstanceAttribute) ?
            specValues[x.attributeId] :
            x.data.find(i => i.attributeValueId === +specValues[x.attributeId]).value;
      }
      const specification: ProductSpecification[] = this.addProductForm.get('specification').value;
      specification.push(productSpecification);
    });
  }

  numberCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }
  calculateWeight() {
    if (this.measurementType === '1') {
      this.addProductForm.patchValue({
        weight: +this.addProductForm.get('weight').value * 1000
      });
    }
  }

  calculatedimensionslength() {
    const b = +this.xxzx *  0.1;
    const c = +this.ngMdimensionsWidth * 0.1;
    const d = +this.ngMdimensionsheight * 0.1;
    // console.log(b);
    this.addProductForm.patchValue({
      dimensionslength: b,
      dimensionsWidth:  c,
      dimensionsheight: d,
    });
      if (this.measurementTypeL === '1') {
        const ngModelLength = +this.xxzx * 0.0393701;
        const ngModelWidth = +this.ngMdimensionsWidth * 0.0393701;
        const ngModelHeight = +this.ngMdimensionsheight * 0.0393701;
        this.addProductForm.patchValue({
          dimensionslength: ngModelLength,
          dimensionsWidth:  ngModelWidth,
          dimensionsheight: ngModelHeight,
        });
      }
  }


  oke() {

    this.submitted = true;
    const imageUrl = this.addProductForm.get('imageUrl').value;
    if (imageUrl.length < 2 || imageUrl.length > 5) {
      swal(
        'Warning',
        'Maaf gambar produk tidak boleh kurang dari dua atau lebih dari lima',
        'warning'
      );
      return;
    }

    if (this.addProductForm.valid) {
      this.specMapping(this.spec);
      this.calculateWeight();
      if (this.productId) {

        this.ProdService.putEditData( this.addProductForm.value).subscribe(response => {
          if (response.status === 0) {
            swal(response.message);
            return;
          }
          swal(response.message);
          this.router.navigate(['/master-product/listing']);
        });
      } else {
        this.ProdService.postData( this.addProductForm.value).subscribe(response => {
          if (response.status === 0) {
            swal(response.message);
            return;
          }
          swal(response.message);
          this.router.navigate(['/master-product/listing']);
        });
      }
    } else {

      this.validateAllFormFields(this.addProductForm);

    }
  }

    /**
   * Image product start
   */
  getSelectedImg(event: any, i) {
    const files = [].slice.call(event.target.files);
    this.readThisImg(files, i);
  }

  readThisImg(files: any[], i): void {
    const varians = <FormArray>this.addProductForm.get('varians');
    const control = varians.controls[i];

    const imageUrlVar: any[] = control.get('imageUrl').value;
    // .addProductForm.get('imageUrlVar').value;
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (imageUrlVar.length < 5) {
          imageUrlVar.push(myReader.result);
          control.patchValue({
            imageUrl: imageUrlVar
          });

        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
      };
      myReader.readAsDataURL(file);
    });
  }

  removeImageVar(index: number, i) {
    const varians = <FormArray>this.addProductForm.get('varians');
    const control = varians.controls[i];

    const imageUrlVar: string[] = control.get('imageUrl').value;
    if (index > -1) {
      imageUrlVar.splice(index, 1);
    }
  }
  // --- Image product end
}
