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

  
  public getMeiRegistro(registro: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonRegularizacaoMei/registro?registro=${registro}`)
  }

  public getMeiNome(nome: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/AvonRegularizacaoMei/nome?nome=${nome}`)
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

  public postAcessos(jsonTab: JSON) {
    this.httpClient.post(`${this.SERVER_URL}/Acessos`, jsonTab, {observe: 'response'}).subscribe(
      data => {
        return data;
      }
    );
  }

  public getNatListaGerentesInterinasSetor(setor: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesInterinas/setor?setor_interina=${setor}`)
  }

  public getNatListaGerentesInterinasNome(nome: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesInterinas/nome?nome_interina=${nome}`)
  }

  public getNatListaGerentesNegociosCodigoGv(cod_do_gv: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/gvcodigo?cod_do_gv=${cod_do_gv}`)
  }

  public getNatListaGerentesNegociosNomeGv(nome_do_gv: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/gvnome?nome_do_gv=${nome_do_gv}`)
  }

  public getNatListaGerentesNegociosGdn(gdn: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/gncodigo?gdn=${gdn}`)
  }

  public getNatListaGerentesNegociosNomeGdn(nome_gdn: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/gnnome?nome_gdn=${nome_gdn}`)
  }

  public getNatListaGerentesNegociosTelefoneGdn(tel_preferencial_gdn: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/gntelefone?tel_preferencial_gdn=${tel_preferencial_gdn}`)
  }

  public getNatListaGerentesSetor(cd_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatListaGerentesNegocios/setor?cd_setor=${cd_setor}`)
  }

  public getNatDestaquesLideresCodigo(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatDestaquesLideres/codigo?codigo=${codigo}`)
  }

  public getNatDestaquesLideresNome(nome: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatDestaquesLideres/nome?nome=${nome}`)
  }

  public getNatCheckoutCodigo(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCheckoutCapta/codigo?codigo=${codigo}`)
  }

  public getNatCheckoutPedido(pedido: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCheckoutCapta/pedido?pedido=${pedido}`)
  }

  public getNatBaseAlocacaoCodigoPessoa(cod_pessoa: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/codigo-pessoa?cod_pessoa=${cod_pessoa}`)
  }

  public getNatBaseAlocacaoCodigoRegiaoEstrategica(cod_regiao_estrategica: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/regiao-estrategica?cod_regiao_estrategica=${cod_regiao_estrategica}`)
  }

  public getNatBaseAlocacaoCodigoGerenciaVenda(cod_gerencia_venda: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/gerencia-venda?cod_gerencia_venda=${cod_gerencia_venda}`)
  }

  public getNatBaseAlocacaoCodigoSetor(cod_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/setor?cod_setor=${cod_setor}`)
  }

  public getNatBaseAlocacaoCodigoGrupo(cod_grupo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/grupo?cod_grupo=${cod_grupo}`)
  }

  public getNatBaseAlocacaoEloCodigoRegiaoEstrategica(cod_regiao_estrategica_elo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/elo-regiao-estrategica?cod_regiao_estrategica_elo=${cod_regiao_estrategica_elo}`)
  }

  public getNatBaseAlocacaoEloCodigoGerenciaVenda(cod_gerencia_venda_elo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/elo-gerencia-venda?cod_gerencia_venda_elo=${cod_gerencia_venda_elo}`)
  }

  public getNatBaseAlocacaoEloCodigoSetor(cod_setor_elo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/elo-setor?cod_setor_elo=${cod_setor_elo}`)
  }

  public getNatBaseAlocacaoEloCodigoGrupo(cod_grupo_elo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatBaseAlocacao/elo-grupo?cod_grupo_elo=${cod_grupo_elo}`)
  }

  public getNatMigradasAvonCodigoConsultora(cd_consultora: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatMigradasAvon/codigo-consultora?cd_consultora=${cd_consultora}`)
  }

  public getNatMovimentacaoCodigoConsultora(cd_pessoa: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatMovimentacao/movimentacao?cd_pessoa=${cd_pessoa}`)
  }

  public getNatMovimentacaoEloCodigoConsultora(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatMovimentacaoElo/movimentacao-elo?codigo=${codigo}`)
  }

  public getNatRecovery(cpfrevendedora: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatRecovery/recovery?cpfrevendedora=${cpfrevendedora}`)
  }

  public getVtex(nr_pedido: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatVtex/vtex?nr_pedido=${nr_pedido}`)
  }
  
  public getNatMigradasNivelCodigoConsultora(cd_consultora: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatMigradasNivel/codigo-consultora?cd_consultora=${cd_consultora}`)
  }

  public getAtrasoENtrega(cn: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatAtrasoEntrega/codigo-consultora?cn=${cn}`)
  }
  
  public getCalendarioCiclosCodSetor(cod_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioCiclos/codigo-setor?cod_setor=${cod_setor}`)
  }
  
  public getCalendarioCiclosNomeSetor(nome_setor: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioCiclos/nome-setor?nome_setor=${nome_setor}`)
  }
  


}
