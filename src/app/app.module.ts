import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import {TranslateModule,TranslateLoader,TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';


export function TranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  // return new TranslateHttpLoader(http, "./assets/i18n/", "/loan.json?time=" + new Date().getTime());
}


export function LocaleIdFactory() {
  return "en-US";
}
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule,
    NzButtonModule,
    TranslateModule.forRoot({//配置i18n
      loader: {
          provide: TranslateLoader,
          useFactory: TranslateLoaderFactory,
          deps: [HttpClient]
      }
    })

  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: LocaleIdFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private i18n: TranslateService, @Inject(LOCALE_ID) locale: string) {
    console.log(locale)
    if (environment.supportedLocale.indexOf(locale) === -1) {
      locale = "en-US";
    }
 
    this.i18n.use(locale);  

 }
}
