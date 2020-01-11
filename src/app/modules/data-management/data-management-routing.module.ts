import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './pages/master/master.component';
import { TownsListComponent } from './components/towns-list/towns-list.component';
import { TownDetailsComponent } from './components/town-details/town-details.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'towns',
        pathMatch: 'prefix'
      },
      {
        path: 'towns',
        component: TownsListComponent
      },
      {
        path: 'town/:townId',
        component: TownDetailsComponent,
      },
      {
        path: 'town/:townId/asset/:assetId',
        component: AssetDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule { }
