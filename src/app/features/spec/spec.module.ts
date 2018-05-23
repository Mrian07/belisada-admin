import { SpecRoutingModule } from './spec-routing.module';
import { SpecComponent } from './spec.component';
import { SpecListComponent } from './spec-list/spec-list.component';
import { SpecAddComponent } from './spec-add/spec-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SpecRoutingModule
  ],
  declarations: [SpecComponent, SpecListComponent, SpecAddComponent]
})
export class SpecModule { }
