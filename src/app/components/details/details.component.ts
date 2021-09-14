import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component( {
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: [ './details.component.scss' ]
} )
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string;
  game: Game;
  isMobile: boolean;

  private respSub: Subscription;
  private routeSub: Subscription;
  private gameSub: Subscription;


  constructor( private ActivatedRoute: ActivatedRoute, private httpService: HttpService, private responseService: ResponseService ) { }

  ngOnInit(): void {
    this.onResize();
    this.responseService.checkWidth();

    this.routeSub = this.ActivatedRoute.params.subscribe( ( params: Params ) => {
      this.gameId = params[ 'id' ];
      this.getGameDetails( this.gameId );
    } )
  }

  onResize() {
    this.respSub = this.responseService.getMobileStatus().subscribe( ( isMobile ) => {
      this.isMobile = isMobile
    } )
  }

  getGameDetails( id: string ): void {
    this.gameSub = this.httpService.getGameDetails( id ).subscribe( ( gameResp: Game ) => {
      this.game = gameResp;

      setTimeout( () => {
        this.gameRating = this.game.metacritic;
      } )
    } )
  }

  getColor( value: number ): string {
    if ( value > 75 ) {
      return '#5ee432';
    } else if ( value > 50 ) {
      return '#fffa50';
    } else if ( value > 30 ) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if ( this.respSub ) {
      this.respSub.unsubscribe();
    }

    if ( this.gameSub ) {
      this.gameSub.unsubscribe();
    }

    if ( this.routeSub ) {
      this.routeSub.unsubscribe();
    }
  }

}
