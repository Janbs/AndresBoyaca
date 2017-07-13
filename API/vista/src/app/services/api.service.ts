import { Injectable } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  private sUrlApi = "http://localhost/AndresBoyaca/API/api.php/customer/";
  constructor(private _Http: Http, private _RequestOptions: RequestOptions) {

  }
  ngOnInit() {

  }
  private get(url): Promise<any> {
    return this._Http.get(url).map(response => {
      return response.json() || { success: false, message: "Servidor no respondio" };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  private post(url, data): Promise<any> {
    let _Headers = new Headers();
    _Headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({
      headers: _Headers,
    });
    return this._Http.post(url, data, options).map(response => {
      return response.json() || { success: false, message: "Servidor no respondio" };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
  private put(url, data): Promise<any> {
    return this._Http.put(url, data).map(response => {
      return response.json() || { success: false, message: "Servidor no respondio" };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
  private delete(url): Promise<any> {
    return this._Http.delete(url).map(response => {
      return response.json() || { success: false, message: "Servidor no respondio" };
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
  


  public getCustomer(nId): Promise<any> {
    return this.get(this.sUrlApi + nId);
  }
  public getCustomers(): Promise<any> {
    return this.get(this.sUrlApi);
  }
  public createCustomer(arrDatos) {
    return this.post(this.sUrlApi, arrDatos);
  }
  public deleteCustomer(nId: number) {
    return this.delete(this.sUrlApi + nId);
  }
  public updateCustomer(nId: number,arrDatos) {
    return this.put(this.sUrlApi + nId,arrDatos);
  }
}
