import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdduserRoutingModule } from './adduser-routing.module';
import { AdduserComponent } from './adduser.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdduserComponent
  ],
  imports: [
    CommonModule,
    AdduserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AdduserModule { }
