import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

@Component({
  selector: 'app-left-filter',
  templateUrl: './left-filter.component.html',
  styleUrls: ['./left-filter.component.scss']
})
export class LeftFilterComponent implements OnInit {

  searchInput = new FormControl('');

  @Input('selectedMarker') selectedMarker;
  @Output('updatePosition') updatePosition = new EventEmitter();

  private _count = (node, level) => {
    if(level === 0) {
      let len = 0;
      node.children.forEach((child) => {
        len += child.children.length;
      });
      return len
    }
    if(level === 1) {
      return node.children.length;
    }
    return null;
  }

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      data: node,
      count: this._count(node, level)
    };
  }

  treeControl = new FlatTreeControl<any>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener, []);

  data: any = [];

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    private _ajax: AjaxService
  ) { 
    this.dataSource.data = [];
  }

  hasChild = (_: number, node: any) => node.expandable;

  ngOnInit() {
    this.initIcons();
    this._ajax.getAssetNavigator().subscribe((res:any) => {
      this.dataSource.data = res;
      this.data = res;
    });

    this.searchInput.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      if(!res) {
        this.dataSource.data = this.data;
        this.treeControl.collapseAll();
      }
      let intermediateData = [];
      let finalData = [];
      let filterRunnerData = JSON.parse(JSON.stringify(this.data));
      let shouldExpand = false;
      intermediateData = filterRunnerData.filter((value, idx) => {
        if(res && value.name && value.name.toLowerCase().match(res.toLowerCase())) {
          return true;
        }
        if(!res) {
          return true;
        }
        return false;
      });

      if(intermediateData.length === 0) {
        finalData = filterRunnerData.filter((value, idx) => {
          if(res && value.children) {
            let valueFound = false;
            value.children.forEach((subvalue, subidx) => {
              if(subvalue.children) {
                subvalue.children = subvalue.children.filter((project, projectIdx) => {
                  if(project.name && project.name.toLowerCase().match(res.toLowerCase())) {
                    valueFound = true;
                    shouldExpand = true;
                    return true;
                  }
                });
              }
            });
            if(valueFound) {
              return true;
            }
            return false;
          }
          if(!res) {
            return true;
          }
          return false;
        });
      } else {
        finalData = intermediateData;
      }
      this.dataSource.data = finalData;
      if(shouldExpand) {
        this.treeControl.expandAll();
      }
    });
  }

  initIcons() {
    this._iconRegistry.addSvgIcon('down-arrow-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/baseline-minimize.svg'));
    this._iconRegistry.addSvgIcon('map-hover-icon', this._sanitizer.bypassSecurityTrustResourceUrl('./assets/svgs/map.svg'));
  }

  _updatePosition(node) {
    this.updatePosition.emit(node.data);
  }

  toggleTreeNode(node) {
    if(this.treeControl.isExpanded(node) && node.level === 0) {
      this.treeControl.toggle(node);
    } else if(!this.treeControl.isExpanded(node) && node.level === 0) {
      this.treeControl.collapseAll();
      this.treeControl.expand(node);
    } else {
      this.treeControl.toggle(node);
    }
  }
}
