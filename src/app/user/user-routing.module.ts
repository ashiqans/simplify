import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatProgressSpinnerModule
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
