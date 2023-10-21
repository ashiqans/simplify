import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AuthGuard } from './services/auth.guard.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AppListsComponent } from './app-lists/app-lists.component';
import { ViewSuggestionComponent } from './app-lists/suggestion/view-suggestion/view-suggestion.component';
import { NavMenuComponent } from './app-lists/suggestion/nav-menu/nav-menu.component';
import { SuggestionComponent } from './app-lists/suggestion/suggestion.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { DashboardComponent } from './app-lists/suggestion/dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent
    // DashboardComponent,
    // AppListsComponent,
    // SuggestionComponent,
    // ViewSuggestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthGuard,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  bootstrap: [AppComponent]
})
export class AppModule { } 
