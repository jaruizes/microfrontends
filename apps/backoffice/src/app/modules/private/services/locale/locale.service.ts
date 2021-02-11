import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  /**
   * This is the general channel used by manage events in broadcast
   */
  private generalChannel;

  private locale: string = 'en';

  constructor() {
    this.generalChannel = new BroadcastChannel('microfrontends');
  }

  changeLocale(locale) {
    this.generalChannel.postMessage({
      cmd: 'changeLocale',
      payload: {
        locale: locale
      }
    });

    this.locale = locale;
  }

  getLocale() {
    return this.locale;
  }
}
