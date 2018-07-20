import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ManageProduct, revise, ListBrand, listingCategory, listingProduct, detailListingProduct, deetailProd, putProduct } from '../../models/manage-product/manage-product';
import { Configuration } from '../../config/configuration';

@Injectable()
export class ManageProductService {

  constructor(private configuration: Configuration,private http: HttpClient) { }

  getData():Observable<ManageProduct[]> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/photos')
    .map(resp => resp as ManageProduct[]);
  }

  getDataCategoryC1(): Observable<listingCategory> {
    
    return this.http.get<any>(this.configuration.apiURL + '/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C1&all=true')
    .map(resp => resp as listingCategory);
  }

  getDataCategoryC2(id: any): Observable<listingCategory[]> {
  
    return this.http.get<any>(this.configuration.apiURL + '/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C2&all=true')
    .map(resp => resp as listingCategory[]);
  }

  getDataListing(queryParams): Observable<listingProduct> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>(this.configuration.apiURL + '/manage/product/approval', {params: params})
    .map(resp => resp as listingProduct);
  
  }

  getDetailProduct(key: string): Observable<deetailProd> {
  
    return this.http.get<any>(this.configuration.apiURL + '/manage/product/approval/detail/' + key)
    .map(resp => resp as deetailProd);
  
  }

  getDataCategoryC3(queryParams): Observable<listingCategory[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>(this.configuration.apiURL + '/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C3&all=true',  {params: params})
    .map(resp => resp as listingCategory[]);
  }

  getData1(queryParams):Observable<ListBrand[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>(this.configuration.apiURL + '/manage/brand',  {params: params})
    .map(resp => resp as ListBrand[]);
  }
 
  getDataListRevie():Observable<revise[]> {
    return this.http.get(this.configuration.apiURL + '/manage/reference?code=API&isactive=true')
    .map(res => res as revise[]);
  }

  postToko(data): Observable<putProduct> {
    return this.http.put(this.configuration.apiURL + '/manage/product/approval/update', data)
    .map(response => response as putProduct);
  }

}
