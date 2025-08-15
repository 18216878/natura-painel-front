import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  SERVER_URL = 'http://localhost:51412';
  // SERVER_URL = 'https://apinatpainel.csu.com.br:44366';

  /**
   * Busca atraso de entrega, apenas envia o token no header. Validação de token deve ser feita no componente.
   */
  public getAtrasoEntregaComToken(cn: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/atraso-entrega?cn=${cn}`, { headers });
  }
  /**
   * Realiza login no endpoint /api/login
   * @param user usuário
   * @param passwordMd5 senha já em md5
   */
  public login(user: string, passwordMd5: string): Observable<any> {
    return this.httpClient.post(`${this.SERVER_URL}/api/login`, {
      user: user,
      password: passwordMd5
    });
  }



  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * Verifica se o refreshToken existe e está válido ao carregar a página.
   * Se não existir ou estiver expirado, redireciona para /login.
   * Para ser chamada no início do app (ex: AppComponent).
   */
  public verificaRefreshTokenOuRedireciona(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.isTokenValid(refreshToken)) {
      this.router.navigate(['/login']);
      return;
    }
    // Se chegou aqui, o refreshToken existe e está válido.
    // O fluxo segue normalmente, o AccountGuard fará a verificação do accessToken.
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post(
      `${this.SERVER_URL}/api/refresh-token`,
      { refreshToken: refreshToken }
    );
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      // Converter base64url para base64
      let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      // Adicionar padding se necessário
      while (base64.length % 4) {
        base64 += '=';
      }
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  private isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }
    const decoded = this.decodeJwt(token);
    if (!decoded || !decoded.exp) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    const valido = decoded.exp > now;
    return valido;
  }

  public getUser(user : string): Observable<any> {
    // return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWaveUsers?user=${user}`)
    return this.httpClient.get(`${this.SERVER_URL}/NatProjetoWaveUsers?user=${user}`)
  }

  public getNaturaCode(naturaCode: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/codigo-natura?codigo_natura=${naturaCode}`)
  }

  public getAvonCode(avonCode: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/codigo-avon?codigo_avon=${avonCode}`)
  }

  public getCpf(cpf: string){
    return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/cpf?cpf=${cpf}`)
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


    public getDynamicsToken(): Observable<any> {
      // return this.httpClient.get(`${this.SERVER_URL}/NatDynamics`)
      const accessToken = localStorage.getItem('accessToken') || '';
      const refreshToken = localStorage.getItem('refreshToken') || '';


      if (this.isTokenValid(accessToken)) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.httpClient.get(`${this.SERVER_URL}/api/dynamics/token`, { headers });
      } else if (this.isTokenValid(refreshToken)) {
        return this.refreshToken(refreshToken).pipe(
          switchMap(res => {
            localStorage.setItem('accessToken', res.accessToken);
            const headers = new HttpHeaders().set('Authorization', `Bearer ${res.accessToken}`);
            return this.httpClient.get(`${this.SERVER_URL}/api/dynamics/token`, { headers });
          }),
          catchError((err) => {
            this.router.navigate(['/login']);
            return of(null);
          })
        );
      } else {
        this.router.navigate(['/login']);
        return of(null);
      }
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

  /**
   * Registra acesso do usuário no backend (tabela nat_tb_projeto_wave_acessos)
   * Espera objeto: { user: string, access_date: string }
   * Envia accessToken no header Authorization
   */
  public postAcessos(acesso: { user: number }, accessToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    this.httpClient.post(`${this.SERVER_URL}/api/acessos`, acesso, { headers, observe: 'response' }).subscribe();
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
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/atraso-entrega?cn=${cn}`, { headers });
  }

  public getAjusteCredito(cod_cn: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatAjusteCredito?cod_cn=${cod_cn}`)
  }

  public getCalendarioCiclosCodSetor(cod_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioCiclos/codigo-setor?cod_setor=${cod_setor}`)
  }

  public getCalendarioCiclosNomeSetor(nome_setor: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioCiclos/nome-setor?nome_setor=${nome_setor}`)
  }

  public getCalendarioRemuneracaoCiclos(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioRemuneracaoCiclos/ciclos`)
  }

  public getCalendarioRemuneracaoPublicoSetor(publico: string, cd_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioRemuneracao/publico-setor?publico=${publico}&cd_setor=${cd_setor}`)
  }

  public getCalendarioRemuneracaoPublicoSetorCiclo(publico: string, cd_setor: number, ciclo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCalendarioRemuneracao/publico-setor-ciclo?publico=${publico}&cd_setor=${cd_setor}&ciclo=${ciclo}`)
  }

  public getTitulosFebrabanCodigoCn(codigo: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatFebraban/consultora?consultora=${codigo}`)
  }

  public getTitulosFebrabanTitulo(titulo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatFebraban/titulo?titulo=${titulo}`)
  }

  public getNatPilotoGvAlecrimCodigoPessoa(cod_pessoa: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPilotoGvAlecrim/cod-pessoa?cod_pessoa=${cod_pessoa}`)
  }

  public getNatPilotoGvAlecrimCodigoSetor(cod_setor: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatPilotoGvAlecrim/cod-setor?cod_setor=${cod_setor}`)
  }


  public getNatRioGrandeDoSulCodigoConsultora(cod_cn: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/riograndedosul/codigo-consultora?cod_cn=${cod_cn}`, { headers });
  }

  public getNatRioGrandeDoSulNumeroPedido(pedido: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/riograndedosul/numero-pedido?pedido=${pedido}`, { headers });
  }

  public getNatEmanaPayCodigoCn(cod_cn: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatEmanaPay/codcn?cod_cn=${cod_cn}`)
  }

  public getNatEmanaPayCpf(cpf: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatEmanaPay/cpf?cpf=${cpf}`)
  }

  public getCodigoVendaMarca(marca: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCodigoVenda/marca?marca=${marca}`)
  }

  public getCodigoVendaDescricao(descricao: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCodigoVenda/descricao?descricao=${descricao}`)
  }

  public getCodigoVendaLinhaProduto(linha_produto: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCodigoVenda/linha-produto?linha_produto=${linha_produto}`)
  }

  public getCodigoVendaCategorizacao(categorizacao: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatCodigoVenda/categorizacao?categorizacao=${categorizacao}`)
  }

  public GetErroBoletosCliente(cliente: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatErrosBoletos?cliente=${cliente}`)
  }

  public getNatSimuladorManifestacaoCategoria(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoCategoria`)
  }

  public getNatSimuladorManifestacaoLocalDefeito(id_categoria: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoLocalDefeito?id_categoria=${id_categoria}`)
  }

  public getNatSimuladorManifestacaoTipoDefeito(id_categoria: number, id_local_defeito: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoTipoDefeito?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}`)
  }

  public getNatSimuladorManifestacaoCorreta(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoCorreta?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`)
  }

  public getNatSimuladorManifestacaoDescricao(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoDescricao?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`)
  }

  public getNatSimuladorManifestacaoSondagem(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatSimuladorManifestacaoSondagem?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`)
  }

  public getDiasCodigoCn(codigo_cn: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatTansportadoraDias/codigo-cn?codigo_cn=${codigo_cn}`)
  }

  public getDiasPedido(pedido: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatTansportadoraDias/pedido?pedido=${pedido}`)
  }

  public postReembolsoCriarRegistro(jsonTab: JSON) {
    this.httpClient.post(`${this.SERVER_URL}/NatReembolso/criar-registro`, jsonTab, {observe: 'response'}).subscribe(
      data => {
        return data;
      }
    );
  }

  public getReembolsoCpfSolicitante(nr_documento: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReembolso/cpf-solicitante?nr_documento=${nr_documento}`)
  }

  public getReembolsoCpfFavorecido(cpf_favorecido: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReembolso/cpf-favorecido?cpf_favorecido=${cpf_favorecido}`)
  }

  public getReembolsoExportaDados(dataInicial: string, dataFinal: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReembolso/exporta-dados?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
  }

  public getObterSenha(): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReembolso/obter-senha`)
  }

  public getReparacaoCodigo(codigo: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReparacao/codigo?codigo=${codigo}`)
  }

  public getReparacaoNome(nome_completo: string): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReparacao/nome?nome_completo=${nome_completo}`)
  }

  public getReparacaoPedido(pedido: number): Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/NatReparacao/pedido?pedido=${pedido}`)
  }

    /**
   * Registra acesso ou pesquisa em página para o projeto Wave (tracking).
   */
  public registrarWaveTracking(dados: {
    pagina: string;
    url: string;
    campoPesquisa?: string;
    valorPesquisa?: string;
    usuario: string;
    acao: string;
  }) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.post(`${this.SERVER_URL}/api/wave-tracking/criar-registro`, dados, { headers }).subscribe();
  }


}
