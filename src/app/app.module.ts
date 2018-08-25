import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from './components/dialogs/alert/alert.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { PartyComponent } from './components/party/party.component';
import { PartyEditComponent } from './components/party-edit/party-edit.component';
import { PartyPriceComponent } from './components/party-price/party-price.component';
import { StaffComponent } from './components/staff/staff.component';
import { ContainerComponent } from './components/container/container.component';
import { ContainerEditComponent } from './components/container-edit/container-edit.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';
import { ReportComponent } from './components/report/report.component';
import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HelpComponent } from './components/help/help.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ProductsComponent,
    AlertComponent,
    ProductEditComponent,
    PartyComponent,
    PartyEditComponent,
    PartyPriceComponent,
    StaffComponent,
    ContainerComponent,
    ContainerEditComponent,
    TransactionComponent,
    TransactionEditComponent,
    ReportComponent,
    UserComponent,
    UserEditComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HotkeyModule.forRoot()
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    ProductEditComponent,
    PartyEditComponent,
    PartyPriceComponent,
    StaffComponent,
    ContainerEditComponent,
    TransactionEditComponent,
    UserEditComponent
  ]
})
export class AppModule { }
