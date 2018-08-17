import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTransportComponent } from './transport/newregistration/transportNew.component';
import { SearchMarkComponent } from './transport/search/searchmark.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'new-request', component: NewTransportComponent },
    { path: 'new-request/:mark', component: NewTransportComponent },
    { path: 'search', component: SearchMarkComponent },
    // { path: 'user-action/:id', component: NewTransportComponent },
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
