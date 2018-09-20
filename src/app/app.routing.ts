import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Other Components
import { DashboardComponent } from './dashboard/dashboard.compnent';
import { UserlistComponent } from './user-action/user-list/user-list.component';
import { UserActionComponent } from './user-action/user-action/user-action.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { OutsidenewsDetailsComponent } from './outsidenews-details/outsidenews-details.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { TrainingComponent } from './training-list/training-list.component';
import { SearchComponent } from './search/search.component';
import { NewsListComponent } from './news-list/news-list.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { DocumentListComponent } from './document-list/document-list.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-list/:id', component: UserlistComponent },
    { path: 'user-action/:id', component: UserActionComponent },
    { path: 'news-details/:id', component: NewsDetailsComponent },
    { path: 'outsidenews-details/:id', component: OutsidenewsDetailsComponent },
    { path: 'job-offer', component: JobOffersComponent },
    { path: 'training-list', component: TrainingComponent },
    { path: 'search/:id', component: SearchComponent },
    { path: 'newslist', component: NewsListComponent },
    { path: 'special-offer', component: SpecialOfferComponent },
    { path: 'document-list', component: DocumentListComponent },
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
