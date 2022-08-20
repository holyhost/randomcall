import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { GushiModule } from '../gushi/gushi.module';
import { FooterModule } from '../../widge/footer/footer.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HomeRoutingModule,
    HeadModule,
    FooterModule,
    GushiModule
  ]
})
export class HomeModule { }
