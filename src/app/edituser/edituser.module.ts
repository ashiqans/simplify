import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdituserRoutingModule } from './edituser-routing.module';
import { EdituserComponent } from './edituser.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    EdituserComponent
  ],
  imports: [
    CommonModule,
    EdituserRoutingModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class EdituserModule { }
