import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteuserRoutingModule } from './deleteuser-routing.module';
import { DeleteuserComponent } from './deleteuser.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    DeleteuserComponent
  ],
  imports: [
    CommonModule,
    DeleteuserRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class DeleteuserModule { }
