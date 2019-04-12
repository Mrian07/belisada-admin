import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEventComponent } from './manage-event-component';
import { EventListComponent } from './event-list/event-list.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
{
    path: '',
    component: ManageEventComponent,
    children: [
        {
            path: 'add',
            component: AddEventComponent,
        },
        {
            path: 'edit/:id',
            component: AddEventComponent,
        },
        {
            path: '',
            component: EventListComponent,
        },
    ],
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageEventRoutingModule { }

export const routedComponents = {
    ManageEventComponent,
    EventListComponent
};
