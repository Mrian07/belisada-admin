import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventList } from 'app/@core/models/manage-event/manage-event.model';
@Injectable({
    providedIn: 'root'
})
export class WithdrawalService {

constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }


    getEvent(queryParams): Observable<EventList>  {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
        params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.apiURL + 'http://192.168.3.20:8100/bs-event/events', {params: params})
        .pipe(
            map(resp => resp as EventList)
        );
    }


    createEvent(data): Observable<Event> {
        return this.http.post(this.configuration.apiURL + 'http://192.168.3.20:8100/bs-event/events', data)
        .pipe(
            map(resp => resp as Event)
        );
    }
}
