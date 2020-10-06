import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configData;

  constructor(private http: HttpClient) {}

  load() :Promise<any>  {
    const promise = this.http.get('/assets/config/backoffice-config.json')
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
