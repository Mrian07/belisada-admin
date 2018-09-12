/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './features/auth/auth.component';
import { AuthModule } from './features/auth/auth.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { HttpTokenInterceptor } from './@core/services/interceptors/http.token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    // Test Push
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule {
}
