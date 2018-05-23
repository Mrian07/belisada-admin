import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ManageProduct, revise, ListBrand, listingCategory, listingProduct, detailListingProduct, deetailProd } from '../../models/manage-product/manage-product';
@Injectable()
export class ManageProductService {

  constructor(private http: HttpClient) { }

  getData():Observable<ManageProduct[]> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/photos')
    .map(resp => resp as ManageProduct[]);
  }

  getDataCategoryC1(): Observable<listingCategory> {
    
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C1&all=true')
    .map(resp => resp as listingCategory);
  }

  getDataCategoryC2(id: any): Observable<listingCategory[]> {
  
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C2&all=true')
    .map(resp => resp as listingCategory[]);
  }

  getDataListing(queryParams): Observable<listingProduct> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>('  http://192.168.0.8:8080/belisada-admin/manage/product/approval')
    .map(resp => resp as listingProduct);
  
  }

  getDetailProduct(key: string): Observable<deetailProd> {
  
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/product/approval/detail/' + key)
    .map(resp => resp as deetailProd);
  
  }

  getDataCategoryC3(queryParams): Observable<listingCategory[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/category?page=1&itemperpage=10&ot=asc&ob=name&type=C3&all=true',  {params: params})
    .map(resp => resp as listingCategory[]);
  }

  getData1(queryParams):Observable<ListBrand[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/brand',  {params: params})
    .map(resp => resp as ListBrand[]);
  }
 
  getDataListRevie():Observable<revise[]> {
    return this.http.get('http://192.168.0.8:8080/belisada-admin/manage/reference?code=API')
    .map(res => res as revise[]);
  }
}
