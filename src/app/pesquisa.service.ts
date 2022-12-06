import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  SERVER_URL = 'http://10.171.2.240:9810';
  // SERVER_URL = 'http://localhost:61377';

  constructor(private httpClient: HttpClient) { }

  public getRecords(codCn : string): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/NatNordeste?codCn=${codCn}`)
  }
}
