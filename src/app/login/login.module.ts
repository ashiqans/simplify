import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from '@angular/material/chips';
import { NavMenuComponent } from '../app-lists/suggestion/nav-menu/nav-menu.component';
import { AppListsComponent } from '../app-lists/app-lists.component';
import { ViewSuggestionComponent } from '../app-lists/suggestion/view-suggestion/view-suggestion.component';
import { SuggestionComponent } from '../app-lists/suggestion/suggestion.component';
import { DashboardComponent } from '../app-lists/suggestion/dashboard/dashboard.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderComponent } from '../loader/loader.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LoginComponent,
    NavMenuComponent,
    AppListsComponent,
    SuggestionComponent,
    ViewSuggestionComponent,
    DashboardComponent,
    LoaderComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  exports: [
    LoginComponent,
    MatSidenavModule
  ]
})
export class LoginModule { }
