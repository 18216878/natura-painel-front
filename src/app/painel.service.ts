import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  // SERVER_URL = 'https://localhost:44366';
  SERVER_URL = 'https://apinatpainel.csu.com.br:44366';

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

  public getPlanosBeTrocasIO(item_original: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPlanosBeTrocas/item-original?item_original=${item_original}`)
  
  }
  public getPlanosBeTrocasIS(item_substituto: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPlanosBeTrocas/item-substituto?item_substituto=${item_substituto}`)
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

  public getValePontos(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatValePontos?codigo=${codigo}`)
  }

  public getDestaquesCodigo(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatDestaques/codigo?codigo=${codigo}`)
  }

  public getDestaquesNome(nome: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatDestaques/nome?nome=${nome}`)
  }

  public getAvonRejeicaoPagamentoRegistro(registro: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonRejeicaoPagamento/registro?registro=${registro}`)
  }

  public getAvonRejeicaoPagamentoStatus(status: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonRejeicaoPagamento/status?status=${status}`)
  }

  public getAvonRejeicaoPagamentoData(data: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonRejeicaoPagamento/data?data=${data}`)
  }

  public getAvonTag2hAno(ano: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonTag2h/ano?ano=${ano}`)
  }

  public getAvonTag2hCpInicial(cpInicial: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonTag2h/cpinicial?cpInicial=${cpInicial}`)
  }

  public getAvonTag2hPremio(premio: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonTag2h/premio?premio=${premio}`)
  }

}
