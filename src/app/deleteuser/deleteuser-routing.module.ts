import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteuserComponent } from './deleteuser.component';

const routes: Routes = [{ path: '', component: DeleteuserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteuserRoutingModule { }
