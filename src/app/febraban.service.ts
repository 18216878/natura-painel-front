import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FebrabanService {

  FEBRABAN_URL = 'https://brasilapi.com.br/api/banks/v1'

  constructor(private httpClient: HttpClient) {}

  public getBanks(): Observable<any> {
      return this.httpClient.get(`${this.FEBRABAN_URL}`)
    }

}
