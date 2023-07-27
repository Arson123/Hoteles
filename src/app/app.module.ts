import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModuleModule } from './components/login/login.module.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HotelModule } from './components/hotel/hotel.module';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HotelModule,
    DashboardModule,
    LoginModuleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
