import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other Components
import { DashboardComponent } from './dashboard/dashboard.compnent';
import { UserlistComponent } from './user-action/user-list/user-list.component';
import { UserActionComponent } from './user-action/user-action/user-action.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-list/:id/:url/:list', component: UserlistComponent },
    { path: 'user-action/:id/:url/:list/:action', component: UserActionComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
