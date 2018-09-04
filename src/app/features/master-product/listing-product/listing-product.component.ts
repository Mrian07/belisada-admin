import { ActivatedRoute, Params, Router } from '@angular/router';
import { detailListingProduct } from './../../../@core/models/manage-product/manage-product';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { Component, OnInit } from '@angular/core';

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
  constructor( private mageProd: ManageProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.prodImg = 'http://image.belisada.id:8888/unsafe/80x80/';
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
      //     const queryParams = {
      //       page: 1,
      //       itemperpage: 10,
      //     }
      // console.log('123');
      // this.mageProd.getListingProductMaster(queryParams).subscribe(x => {
      //   this.lisitingProd = x.content;
      //   this.dddd = x.totalPages;
      //   console.log('tsad', x);

      // });
  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.dddd) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/master-product/listing'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
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

}
