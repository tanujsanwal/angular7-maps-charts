import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.scss']
})
export class AssetSummaryComponent implements OnInit {

  surveysMeta: any;
  cardTypes = [];

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    private _ajax: AjaxService
  ) { }

  ngOnInit() {
    this.initIcons();
    this._ajax.getAssetSummary().subscribe((res) => {
      this.surveysMeta = res;
      this.cardTypes = Object.keys(this.surveysMeta);
    });
  }

  initIcons() {
    this._iconRegistry.addSvgIcon('village-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/village.svg'));
    this._iconRegistry.addSvgIcon('wave-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/wave.svg'));
    this._iconRegistry.addSvgIcon('water-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/water.svg'));
    this._iconRegistry.addSvgIcon('pump-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/pump.svg'));
  }

}
