import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit, OnDestroy {
  public isMobile: boolean;
  public sort: string;
  public games: Array<Game>;
  private respSub: Subscription;
  private routeSub: Subscription;
  private gameSub: Subscription;


  constructor( private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private responseService: ResponseService ) { }

  ngOnInit(): void {
    this.onResize();
    this.responseService.checkWidth();

    this.routeSub = this.activatedRoute.params.subscribe( ( params: Params ) => {
      if ( params[ 'game-search' ] ) {
        this.searchGames( 'metacrit', params[ 'game-search' ] );
      } else {
        this.searchGames( 'metacrit' );
      }
    } );
  }

  onResize() {
    this.respSub = this.responseService.getMobileStatus().subscribe( ( isMobile ) => {
      this.isMobile = isMobile;
    } )
  }

  searchGames( sort: string, search?: string ) {
    this.gameSub = this.httpService.getGameList( sort, search ).subscribe( ( gameList: APIResponse<Game> ) => {
      this.games = gameList.results;
      console.log( gameList );
    } );
  }

  openGameDetails( id: string ): void {
    this.router.navigate( [ 'details', id ] );
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
