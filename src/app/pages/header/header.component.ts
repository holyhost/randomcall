import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  @Input("headers") headers: any[] = []
  rooterChange: Subscription;
  curUrl = ''
  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { 
    this.rooterChange = router.events.subscribe(item => {
      if (item instanceof NavigationEnd) {
        // console.log(item.url);
        this.curUrl = item.url
      }
    
      
    })
    
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    if (this.rooterChange) {
      this.rooterChange.unsubscribe();
  }
}
}
