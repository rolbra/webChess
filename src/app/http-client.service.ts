import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService{
  private readonly httpClient = inject(HttpClient);

  constructor(){}
  
  getAllPositions():Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const body = {gameId:"A489-78D1"};
    
    return this.httpClient.post('http://localhost:8080/api/positions', JSON.stringify(body), {headers});
  }

  move(moveFrom: string, moveTo: string):Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const body = {from:moveFrom, to:moveTo};
    
    return this.httpClient.post('http://localhost:8080/api/move', JSON.stringify(body), {headers});
  }
}
