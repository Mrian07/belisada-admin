import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ThemeModule } from './../../@theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    CommonModule,
    ThemeModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class ChatModule { }
