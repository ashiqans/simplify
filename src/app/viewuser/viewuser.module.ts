import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewuserRoutingModule } from './viewuser-routing.module';
import { ViewuserComponent } from './viewuser.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ViewuserComponent
  ],
  imports: [
    CommonModule,
    ViewuserRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class ViewuserModule { }
