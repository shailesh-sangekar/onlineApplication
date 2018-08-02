import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTransportComponent } from './transport/transportNew.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'new-request/:id', component: NewTransportComponent },
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
