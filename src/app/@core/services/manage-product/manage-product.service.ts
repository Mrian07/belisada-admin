import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ManageProduct, revise, ListBrand } from '../../models/manage-product/manage-product';
@Injectable()
export class ManageProductService {

  constructor(private http: HttpClient) { }

  getData():Observable<ManageProduct[]> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/photos')
    .map(resp => resp as ManageProduct[]);
  }
  getData1(queryParams):Observable<ListBrand[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get<any>('http://192.168.0.8:8080/belisada-admin/manage/brand',  {params: params})
    .map(resp => resp as ListBrand[]);
  }
 
  getDataListRevie():Observable<revise> {
    return this.http.get('http://192.168.0.8:8080/belisada-admin/manage/reference?code=API')
    .map(res => res as revise);
  }
}
