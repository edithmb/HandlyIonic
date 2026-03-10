import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom, Injectable } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';


@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideHttpClient(), 

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader, 
          deps: [HttpClient]
        }
      })
    )
  ],
});