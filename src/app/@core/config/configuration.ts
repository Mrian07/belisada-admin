import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()

export class Configuration {
  apiURL: string = environment.apiUrl;
  apiDev: string = environment.apiDev;
}
