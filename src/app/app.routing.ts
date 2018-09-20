import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other Components
import { DashboardComponent } from './dashboard/dashboard.compnent';
import { UserlistComponent } from './user-action/user-list/user-list.component';
import { UserActionComponent } from './user-action/user-action/user-action.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { OutsidenewsDetailsComponent } from './outsidenews-details/outsidenews-details.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-list/:id', component: UserlistComponent },
    { path: 'user-action/:id', component: UserActionComponent },
    { path: 'news-details/:id', component: NewsDetailsComponent },
    { path: 'outsidenews-details/:id', component: OutsidenewsDetailsComponent },
    { path: 'search/:id', component: SearchComponent },
    // {
    //     path: 'contact-list', component: ContactListComponent,
    //     children: [
    //         {
    //             path: 'add-contact', component: AddContactComponent
    //         },
    //         {
    //             path: 'update-contact/:id', component: UpdateContactComponent,
    //         }
    //     ]
    // },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
