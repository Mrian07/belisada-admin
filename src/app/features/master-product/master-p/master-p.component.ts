import { Router } from '@angular/router';
import { BrandService } from './../../../@core/services/brand/brand.service';
import swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from './../../../@core/services/category/category.service';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { AddProductRequest, BrandList, CategoryList, CategoryAttribute, ProductSpecification } from './../../../@core/models/manage-product/manage-product';
import { Component, OnInit, ElementRef } from '@angular/core';

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

  constructor(
    private brandService: BrandService,
    private el: ElementRef,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private ProdService: ManageProductService,
  ) {
    this.currentPgBrand = 1;
    this.categoryList.C1.data = [];
    this.categoryList.C2.data = [];
    this.categoryList.C3.data = [];
    this.categoryAttributes = [];
    this.measurementType = 0;
    this.measurementTypeL = 0;
  }

  get f() { return this.addProductForm.controls; }

  ngOnInit() {
    this.formData();
    this.getBrandInit();
    this.getCategoryInit('C1');
  }
  private formData() {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      brandId: [''],
      brandName: ['', [Validators.required]],
      categoryThreeId: [''],
      classification: [''],
      couriers: [[]],
      description: [''],
      dimensionsWidth: [''],
      dimensionsheight: [''],
      dimensionslength: [''],
      guaranteeTime: [''],
      imageUrl: [[], [Validators.required]],
      pricelist: [''],
      specialPrice: [''],
      discount: [''],
      qty: [''],
      specification: [[]],
      weight: ['']
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
    const imageUrl: string[] = this.addProductForm.get('imageUrl').value;
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
    this.addProductForm.patchValue({
      categoryThreeId: category.categoryId,
    });
    console.log('12312321',this.addProductForm.get('categoryThreeId').value)
    this.categoryName[category.type] = category.name;
    this.categoryId[category.type] = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId,
      isactive: true,
    };
    console.log('123 ini di select', category.categoryId);
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      console.log(response)

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
    });
  }

  getCategoryInit(categoryType, parentid?) {
    const queryParams = {
      type: categoryType,
      all: true,
      isactive: true,
    };
    console.log('123');
    if (parentid) {
      queryParams['parentid'] = parentid;
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      this.categoryList[categoryType] = response;
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
    this.specMapping(this.spec);
    this.calculateWeight();
    this.calculatedimensionslength();
    this.xxzx === this.addProductForm.get('dimensionslength').value;
    // this.addroductForm.get('dimensionslength').value === this.xxzx;
    console.log('123213213',this.addProductForm.value);


    const imageUrl = this.addProductForm.get('imageUrl').value;
    if (imageUrl.length < 2 || imageUrl.length > 5) {
      swal(
        'Warning',
        'Maaf gambar produk tidak boleh kurang dari dua atau lebih dari lima',
        'warning'
      );
      return;
    }
    this.ProdService.postData( this.addProductForm.value).subscribe(response => {
      swal(
        response.message,
      )
      this.router.navigate(['/master-product/listing']);
    });
  }


}
