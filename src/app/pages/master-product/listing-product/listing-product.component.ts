import { ActivatedRoute, Params, Router } from '@angular/router';
import { detailListingProduct } from './../../../@core/models/manage-product/manage-product';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {
  lisitingProd: detailListingProduct[];
  prodImg: any;
  dddd;
  lastPage: number;
  currentPage: number;
  pages: any = [];
  closeResult: string;
  a: any;
  constructor( private mageProd: ManageProductService, private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) {
    this.prodImg = 'https://img.belisada.id/unsafe/fit-in/400x400/center/filters:fill(fff)/';
  }

  ngOnInit() {
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
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.dddd) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/master-product'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
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
  d(a) {
    console.log(a);
  }
  goToEdit(e) {
    // console.log(this.router.navigate(['/edit/' + e]));
    console.log(e);
    this.router.navigate(['master-product/edit/' + e]);
  }

}
