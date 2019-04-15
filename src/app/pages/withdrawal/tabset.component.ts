import { Component } from '@angular/core';

@Component({
    selector: 'nb-route-tabset-showcase',
    template: `
        <nb-card>
        <nb-card-body>
            <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
        </nb-card-body>
        </nb-card>
    `,
})
export class RouteTabsetShowcaseComponent {
    tabs: any[] = [
        {
            title: 'List',
            icon: 'nb-list',
            route: '/withdrawal/list'
        },
        {
            title: 'History',
            icon: 'nb-list',
            route: '/withdrawal/history'
        }
    ];
}