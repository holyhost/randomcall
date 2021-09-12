import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { GoldenComponent } from './golden.component';
import { GoldenRoutingModule } from './golden-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GoldenComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    GoldenRoutingModule
  ]
})
export class GoldenModule { }
