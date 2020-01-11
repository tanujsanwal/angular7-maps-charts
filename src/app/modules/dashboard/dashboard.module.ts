import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MatTreeModule } from '@angular/material/tree';
import { NgImageSliderModule } from 'ng-image-slider';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MasterComponent } from './pages/master/master.component';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { AssetSummaryComponent } from './components/asset-summary/asset-summary.component';
import { LeftFilterComponent } from './components/left-filter/left-filter.component';
import { FilterLegendComponent } from './components/filter-legend/filter-legend.component';
import { MarkerDetailsSidebarComponent } from './components/marker-details-sidebar/marker-details-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    MasterComponent,
    MapComponent,
    AssetSummaryComponent,
    LeftFilterComponent,
    FilterLegendComponent,
    MarkerDetailsSidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTreeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAF16wKOlIRqQOAxtvR7Gk2Oobvpb_BfDk'
    }),
    AgmJsMarkerClustererModule,
    NgImageSliderModule
  ]
})
export class DashboardModule { }
