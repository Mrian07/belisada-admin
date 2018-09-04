import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    BrandRoutingModule
  ],
  declarations: [BrandComponent, BrandListComponent, BrandAddComponent, ManageBrandComponent]
})
export class BrandModule { }
