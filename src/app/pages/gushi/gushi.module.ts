import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GushiComponent } from './gushi.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GushiComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [
    GushiComponent
  ]
})
export class GushiModule { }
