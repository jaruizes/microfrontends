import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configData;

  constructor(private http: HttpClient) {}

  load() :Promise<any>  {
    const promise = this.http.get('https://ppqzm7uohd.execute-api.eu-west-2.amazonaws.com/mock/config/customers-app-config')
      .toPromise()
      .then(data => {
        this.configData = data;
        return data;
      });

    return promise;
  }

  get(property: string) {
    return this.configData[property];
  }

  getMicrofrontendURL(mf: string) {
    return this.configData['microfrontends'][mf];
  }
}
