import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecRoutingModule } from './spec-routing.module';
import { SpecComponent } from './spec.component';
import { SpecListComponent } from './spec-list/spec-list.component';
import { SpecAddComponent } from './spec-add/spec-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { SpecValueComponent } from './spec-value/spec-value.component';

@NgModule({
  imports: [
    CommonModule,
    SpecRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SpecComponent, SpecListComponent, SpecAddComponent, SpecValueComponent]
})
export class SpecModule { }
