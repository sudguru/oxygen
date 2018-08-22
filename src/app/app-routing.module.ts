import { HelpComponent } from './components/help/help.component';
import { UserComponent } from './components/user/user.component';
import { ReportComponent } from './components/report/report.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ContainerComponent } from './components/container/container.component';
import { PartyComponent } from './components/party/party.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'party-rates',
        component: PartyComponent
    },
    {
        path: 'containers',
        component: ContainerComponent
    },
    {
        path: 'transactions',
        component: TransactionComponent
    },
    {
        path: 'reports',
        component: ReportComponent
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'help',
        component: HelpComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
