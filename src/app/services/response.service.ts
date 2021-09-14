import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class ResponseService {
  private isMobile = new Subject();
  screenWidth: string;

  constructor() {
    this.checkWidth();
  }

  onMobileChange( status: boolean ) {
    this.isMobile.next( status );
  }

  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  checkWidth() {
    var width = window.innerWidth;
    if ( width < 768 ) {
      this.screenWidth = 'sm';
      this.onMobileChange( true );
    } else if ( width <= 992 ) {
      this.screenWidth = 'md';
      this.onMobileChange( false );
    } else {
      this.screenWidth = 'lg';
      this.onMobileChange( false );
    }
  }
}
