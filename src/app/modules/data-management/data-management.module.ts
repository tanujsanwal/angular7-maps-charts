import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { MasterComponent } from './pages/master/master.component';
import { TownsListComponent } from './components/towns-list/towns-list.component';
import { TownDetailsComponent } from './components/town-details/town-details.component';
import { SharedModule } from '../shared/shared.module';
import { AddTownComponent } from './components/models/add-town/add-town.component';
import { AuthenticateComponent } from './components/models/authenticate/authenticate.component';
import { ShareDetailsComponent } from './components/models/share-details/share-details.component';
import { AssetActivityListComponent } from './components/models/asset-activity-list/asset-activity-list.component';
import { AssetListComponent } from './components/models/asset-list/asset-list.component';
import { TownMapComponent } from './components/town-map/town-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AddAssetComponent } from './components/models/add-asset/add-asset.component';
import { AddGeneralDetailComponent } from './components/models/add-general-detail/add-general-detail.component';
import { HideUnhideTownComponent } from './components/models/hide-unhide-town/hide-unhide-town.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { DeleteTownComponent } from './components/models/delete-town/delete-town.component';

@NgModule({
  declarations: [
    MasterComponent,
    TownsListComponent,
    TownDetailsComponent,
    AddTownComponent,
    AuthenticateComponent,
    ShareDetailsComponent,
    AssetActivityListComponent,
    AssetListComponent,
    TownMapComponent,
    AddAssetComponent,
    AddGeneralDetailComponent,
    HideUnhideTownComponent,
    AssetDetailComponent,
    ActivityLogComponent,
    DeleteTownComponent
  ],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAF16wKOlIRqQOAxtvR7Gk2Oobvpb_BfDk'
    }),
    AgmJsMarkerClustererModule,
  ],
entryComponents : [
  AddTownComponent,
  AuthenticateComponent,
  ShareDetailsComponent,
  AddAssetComponent,
  AddGeneralDetailComponent,
  HideUnhideTownComponent,
  DeleteTownComponent
]
})
export class DataManagementModule { }
