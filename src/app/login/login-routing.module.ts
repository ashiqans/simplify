import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SuggestionComponent } from '../app-lists/suggestion/suggestion.component';
import { ViewSuggestionComponent } from '../app-lists/suggestion/view-suggestion/view-suggestion.component';
import { DashboardComponent } from '../app-lists/suggestion/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{
  path: 'suggestion', component: SuggestionComponent, children: [
    { path: 'viewSuggestion', component: ViewSuggestionComponent },
    { path: 'dashboard', component: DashboardComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
