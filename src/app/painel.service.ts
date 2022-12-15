import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  // SERVER_URL = 'https://localhost:44366';
  SERVER_URL = 'https://10.171.2.240:44366';

  constructor(private httpClient: HttpClient) {}

  public getUser(user : string): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWaveUsers?user=${user}`)
  }

  public getNaturaCode(naturaCode: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWave/codigo-natura?codigo_natura=${naturaCode}`)
  }

  public getAvonCode(avonCode: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWave/codigo-avon?codigo_avon=${avonCode}`)
  }

  public getCpf(cpf: string){
    return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWave/cpf?cpf=${cpf}`)
  }

  public getPlanosBeTrocas(item_original: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPlanosBeTrocas?item_original=${item_original}`)
  }

  public getCadastrosIrregulares(codigo: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCadastrosIrregulares?codigo=${codigo}`)
  }

  public getPagamentosRejeitados(codigo: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPagamentosRejeitados?consultora=${codigo}`)
  }

  public getFeriados(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatFeriados`)
  }

  public getDynamicsToken(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatDynamics`)
  }
}
