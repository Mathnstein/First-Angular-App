import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from './services/response.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit, OnDestroy {
  private respSub: Subscription;

  constructor( private responseService: ResponseService ) { }

  ngOnInit() {
    this.respSub = this.responseService.getMobileStatus().subscribe( ( isMobile ) => {
      if ( isMobile ) {
        console.log( 'Mobile device detected' )
      } else {
        console.log( 'Desktop detected' )
      }
    } );
    this.onResize();
  }

  onResize() {
    this.responseService.checkWidth();
  }

  ngOnDestroy() {
    if ( this.respSub ) {
      this.respSub.unsubscribe();
    }
  }
}
