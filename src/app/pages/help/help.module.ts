import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    NzPopoverModule,
    NzListModule
  ]
})
export class HelpModule { }
