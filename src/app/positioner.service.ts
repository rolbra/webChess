import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionerService {

  positions: Object;

  constructor( private httpClientSrv: HttpClientService ) {
    this.positions = {};
  }

  getPositionsFromServer() : Observable<any> {
    return this.httpClientSrv.getAllPositions();
  }

  move() : Observable<any>{
    return this.httpClientSrv.move();
  }
}
