import { Injectable } from '@angular/core';
import { Globals } from '../../services/globals/globals';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {

    constructor(private globals: Globals) {

    }

    show() {
        this.globals.isLoading = true;
    }

    hide() {
        this.globals.isLoading = false;
    }
}
