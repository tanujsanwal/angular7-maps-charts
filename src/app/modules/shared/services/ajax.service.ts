import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(
    private _http: HttpClient
  ) { }

  ajaxCall({method, data = null, url, headers = new HttpHeaders()}) {
    return this._http.request(method, url, {
      body: data,
      headers: headers
    });
  }

  login(credentials) {
    const url = environment.url_endpoint + environment.api_endpoint + 'auth/login/';
    return this.ajaxCall({method: 'post', url: url, data: credentials});
  }

  logout() {
    const url = environment.url_endpoint + environment.api_endpoint + 'auth/logout/';
    return this.ajaxCall({method: 'post', url: url});
  }

  getAreaPolygons() {
    const url = '/assets/polygons/area-polygon.json';
    return this.ajaxCall({method: 'get', url: url});
  }

  getGeneralData(id) {
    const url = environment.url_endpoint + environment.api_endpoint_old + `GeneralData/cityid/${id}/`;
    return this.ajaxCall({method: 'get', url: url});
  }

  getPumpStationData(id) {
    const url = environment.url_endpoint + environment.api_endpoint_old + `PumpingStation/cityid/${id}/`;
    return this.ajaxCall({method: 'get', url: url});
  }

  getStreamData(id) {
    const url = environment.url_endpoint + environment.api_endpoint_old + `Stream/cityid/${id}/`;
    return this.ajaxCall({method: 'get', url: url});
  }

  getTreatmentPlantData(id) {
    const url = environment.url_endpoint + environment.api_endpoint_old + `WasteWaterTreatmentPlant/cityid/${id}/`;
    return this.ajaxCall({method: 'get', url: url});
  }

  getAssetSummary() {
    const url = environment.url_endpoint + environment.api_endpoint + 'pr/surverysmeta/';
    return this.ajaxCall({method: 'get', url: url});
  }
  getAssetNavigator() {
    const url = environment.url_endpoint + environment.api_endpoint + 'pr/village/';
    return this.ajaxCall({method: 'get', url: url});
  }
  getTotalTownList() {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/';
    return this.ajaxCall({method: 'get', url: url});
  }
  getTownDetail(id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id;
    return this.ajaxCall({method: 'get', url: url});
  }
  getTownAsset(id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/tasks/';
    return this.ajaxCall({method: 'get', url: url});
  }
  getAsset(id,taskId) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/tasks/'+taskId+'/';
    return this.ajaxCall({method: 'get', url: url});
  }
  getTownAssetTree() {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/treeview/';
    return this.ajaxCall({method: 'get', url: url});
  }

  addTown(data) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/';
    return this.ajaxCall({method: 'post', data:data, url: url});
  }
  addTownDetails(data,id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/';
    return this.ajaxCall({method: 'patch', data:data, url: url});
  }
  addAsset(data,id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/tasks/';
    return this.ajaxCall({method: 'post', data:data, url: url});
  }
  getAssetLogs(id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/logs/';
    return this.ajaxCall({method: 'get', url: url});
  }
  deleteTownDetails(id) {
    const url = environment.url_endpoint + environment.api_endpoint + 'ng/towns/'+id+'/';
    return this.ajaxCall({method: 'delete', url: url});
  }
}
