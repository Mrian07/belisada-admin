import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event,EventList, MasterProduct, PostMasterProduct, ProductList, DetailEventList, Product, GetVariant, Variant, SpecVariant, GetMasterProduct, EditEvent } from 'app/@core/models/manage-event/manage-event.model';
@Injectable({
    providedIn: 'root'
})
export class EventService {

constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }


    getEvent(queryParams): Observable<EventList>  {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
        params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.eventURL + '/events', {params: params})
        .pipe(
            map(resp => resp as EventList)
        );
    }

    getEventById(id: any): Observable<DetailEventList> {
        return this.http.get(this.configuration.eventURL + '/events/' + id)
            .pipe(
                map(response => response as DetailEventList)
            );
    }


    createEvent(data): Observable<Event>{
        return this.http.post(this.configuration.eventURL + '/events', data)
        .pipe(
            map(resp => resp as Event)
        );
    }

    deleteEvent(id): Observable<Event[]> {
        return this.http.delete(this.configuration.eventURL + '/events/' + id)
        .pipe(
            map(response => response as Event[])
        );
    }

    editEvent(id,data) {
        return this.http.put(this.configuration.eventURL + '/events/' + id, data)
            .pipe(
                map(resp => resp as EditEvent)
            );
    }

    getEventProduct(id: any): Observable<MasterProduct> {
        return this.http.get(this.configuration.eventURL + '/events/' + id + '/mpe')
            .pipe(
                map(response => response as MasterProduct)
            );
    }

    createEventProduct(eventId,data): Observable<PostMasterProduct>{
        return this.http.post(this.configuration.eventURL + '/events/' + eventId + '/mpe', data)
        .pipe(
            map(resp => resp as PostMasterProduct)
        );
    }

    deleteProduct(eventId,masterProductEventId): Observable<GetMasterProduct[]> {
        return this.http.delete(this.configuration.eventURL + '/events/' + eventId + '/mpe/' + masterProductEventId)
        .pipe(
            map(response => response as GetMasterProduct[])
        );
    }

    getProductList(keyWord): Observable<ProductList> {
        return this.http.get(this.configuration.productURL + '/product/master/' + keyWord)
            .pipe(
                map(response => response as ProductList )
            );
    }

    getDetailVariant(id): Observable<GetVariant> {
        return this.http.get(this.configuration.productURL + '/product/varian/' + id)
        .pipe(
            map(resp => resp as GetVariant)
        );
    }

    getVariant(id): Observable<Variant[]> {
        return this.http.get(this.configuration.productURL + '/product/varian/' + id)
        .pipe(
            map(resp => resp as Variant[])
        );
    }

    variant(id: any): Observable<SpecVariant[]>  {
        return this.http.get(this.configuration.productURL + '/product/varian/' + id)
        .pipe(
            map(rsl => rsl as SpecVariant[])
        );
    }
}
