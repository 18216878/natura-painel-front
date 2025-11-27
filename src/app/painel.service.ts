import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

  // Api anterior - Desenvolvida em C# com o framework .NET 5.0
  // SERVER_URL = 'https://apinatpainel.csu.com.br:44366';

  // Api de testes
  // SERVER_URL = 'https://apinatmeuprimeiroacesso.csu.com.br:7052';

  // Api anterior - Desenvolvida em JavaScript com o framework Node.Js apontado para a porta e URL originais
  SERVER_URL = 'https://apinatpainel.csu.com.br:44366';

  // Servidor local
  // SERVER_URL = 'http://localhost:44366';


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

  public getNaturaCode(naturaCode: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/codigo-natura?codigo_natura=${naturaCode}`, { headers })
  }

  public getAvonCode(avonCode: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/codigo-avon?codigo_avon=${avonCode}`, { headers })
  }

  public getCpf(cpf: string){
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/projeto-wave/cpf?cpf=${cpf}`, { headers })
  }

  public getPlanosBeTrocasIO(item_original: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/planos-be-trocas/item-original?item_original=${item_original}`, { headers })

  }
  public getPlanosBeTrocasIS(item_substituto: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/planos-be-trocas/item-substituto?item_substituto=${item_substituto}`, { headers })
  }

  public getCadastrosIrregulares(codigo: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/cadastros-irregulares?codigo=${codigo}`, { headers })
  }

  public getPagamentosRejeitados(codigo: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/pagamentos-rejeitados/consultora?consultora=${codigo}`, { headers })
  }

  public getFeriados(): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/feriados`, { headers })
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
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/vale-pontos/consultora?cod_consultora=${codigo}`, { headers })
  }

  public getDestaquesCodigo(codigo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/pesquisas/natdestaques/codigo?codigo=${codigo}`, { headers })
  }

  public getDestaquesNome(nome: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/pesquisas/natdestaques/nome?nome=${nome}`, { headers })
  }


  // Verificar em outro mommento *****
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

  // *****



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
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-interinas/setor?setor_interina=${setor}`, { headers })
  }

  public getNatListaGerentesInterinasNome(nome: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-interinas/nome?nome_interina=${nome}`, { headers })
  }

  public getNatListaGerentesNegociosCodigoGv(cod_do_gv: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/gvcodigo?cod_do_gv=${cod_do_gv}`, { headers })
  }

  public getNatListaGerentesNegociosNomeGv(nome_do_gv: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/gvnome?nome_do_gv=${nome_do_gv}`, { headers })
  }

  public getNatListaGerentesNegociosGdn(gdn: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/gncodigo?gdn=${gdn}`, { headers })
  }

  public getNatListaGerentesNegociosNomeGdn(nome_gdn: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/gnnome?nome_gdn=${nome_gdn}`, { headers })
  }

  public getNatListaGerentesNegociosTelefoneGdn(tel_preferencial_gdn: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/gntelefone?tel_preferencial_gdn=${tel_preferencial_gdn}`, { headers })
  }

  public getNatListaGerentesSetor(cd_setor: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/gerentes-negocios/setor?cd_setor=${cd_setor}`, { headers })
  }

  public getNatDestaquesLideresCodigo(codigo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/pesquisas/natdestaqueslideres/codigo?codigo=${codigo}`, { headers })
  }

  public getNatDestaquesLideresNome(nome: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/pesquisas/natdestaqueslideres/nome?nome=${nome}`, { headers })
  }

  public getNatCheckoutCodigo(codigo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/checkout-capta/codigo?codigo=${codigo}`, { headers })
  }

  public getNatCheckoutPedido(pedido: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/checkout-capta/pedido?pedido=${pedido}`, { headers })
  }

  public getNatBaseAlocacaoCodigoPessoa(cod_pessoa: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/codigo-pessoa?cod_pessoa=${cod_pessoa}`, { headers })
  }

  public getNatBaseAlocacaoCodigoRegiaoEstrategica(cod_regiao_estrategica: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/regiao-estrategica?cod_regiao_estrategica=${cod_regiao_estrategica}`, { headers })
  }

  public getNatBaseAlocacaoCodigoGerenciaVenda(cod_gerencia_venda: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/gerencia-venda?cod_gerencia_venda=${cod_gerencia_venda}`, { headers })
  }

  public getNatBaseAlocacaoCodigoSetor(cod_setor: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/setor?cod_setor=${cod_setor}`, { headers })
  }

  public getNatBaseAlocacaoCodigoGrupo(cod_grupo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/grupo?cod_grupo=${cod_grupo}`, { headers })
  }

  public getNatBaseAlocacaoEloCodigoRegiaoEstrategica(cod_regiao_estrategica_elo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/elo-regiao-estrategica?cod_regiao_estrategica_elo=${cod_regiao_estrategica_elo}`, { headers })
  }

  public getNatBaseAlocacaoEloCodigoGerenciaVenda(cod_gerencia_venda_elo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/elo-gerencia-venda?cod_gerencia_venda_elo=${cod_gerencia_venda_elo}`, { headers })
  }

  public getNatBaseAlocacaoEloCodigoSetor(cod_setor_elo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/elo-setor?cod_setor_elo=${cod_setor_elo}`, { headers })
  }

  public getNatBaseAlocacaoEloCodigoGrupo(cod_grupo_elo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/base-alocacao/elo-grupo?cod_grupo_elo=${cod_grupo_elo}`, { headers })
  }

  public getNatMigradasAvonCodigoConsultora(cd_consultora: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/migradas-avon/codigo-consultora?cd_consultora=${cd_consultora}`, { headers })
  }

  public getNatMovimentacaoCodigoConsultora(cd_pessoa: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/movimentacao/codigo-pessoa?cd_pessoa=${cd_pessoa}`, { headers })
  }

  public getNatMovimentacaoEloCodigoConsultora(codigo: number): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/movimentacao-elo/codigo?codigo=${codigo}`, { headers })
  }

  public getNatRecovery(cpfrevendedora: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/recovery/cpfrevendedora?cpfrevendedora=${cpfrevendedora}`, { headers })
  }

  public getVtex(nr_pedido: string): Observable<any>{
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
  return this.httpClient.get(`${this.SERVER_URL}/api/vtex/pedido?nr_pedido=${nr_pedido}`, { headers })
  }

  public getNatMigradasNivelCodigoConsultora(cd_consultora: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/migradas-nivel/codigo-consultora?cd_consultora=${cd_consultora}`, { headers })
  }

  public getAtrasoENtrega(cn: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/atraso-entrega?cn=${cn}`, { headers });
  }

  public getAjusteCredito(cod_cn: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/ajuste-credito?cod_cn=${cod_cn}`, { headers })
  }

  public getCalendarioCiclosCodSetor(cod_setor: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/calendario-ciclos/codigo-setor?cod_setor=${cod_setor}`, { headers })
  }

  public getCalendarioCiclosNomeSetor(nome_setor: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/calendario-ciclos/nome-setor?nome_setor=${nome_setor}`, { headers })
  }

  public getCalendarioRemuneracaoCiclos(): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/calendario-remuneracao/ciclos`, { headers })
  }

  public getCalendarioRemuneracaoPublicoSetor(publico: string, cd_setor: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/calendario-remuneracao/publico-setor?publico=${publico}&cd_setor=${cd_setor}`, { headers })
  }

  public getCalendarioRemuneracaoPublicoSetorCiclo(publico: string, cd_setor: number, ciclo: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/calendario-remuneracao/publico-setor-ciclo?publico=${publico}&cd_setor=${cd_setor}&ciclo=${ciclo}`, { headers })
  }

  public getTitulosFebrabanCodigoCn(codigo: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/febraban/consultora?consultora=${codigo}`, { headers })
  }

  public getTitulosFebrabanTitulo(titulo: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/febraban/titulo?titulo=${titulo}`, { headers })
  }

  public getNatPilotoGvAlecrimCodigoPessoa(cod_pessoa: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/piloto-gv-alecrim/cod-pessoa?cod_pessoa=${cod_pessoa}`, { headers })
  }

  public getNatPilotoGvAlecrimCodigoSetor(cod_setor: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/piloto-gv-alecrim/cod-setor?cod_setor=${cod_setor}`, { headers })
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

  public getNatConsultoraDistribuidoraCodigoConsultora(codigo_consultora: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/consultora-distribuidora/codigo-consultora?codigo_consultora=${codigo_consultora}`, { headers });
  }

  public getNatConsultoraDistribuidoraNumeroPedido(numero_pedido: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/consultora-distribuidora/numero-pedido?numero_pedido=${numero_pedido}`, { headers });
  }

  public getNatReconhecimentoCampanhas(codigo: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get(`${this.SERVER_URL}/api/reconhecimento-campanhas/codigo-consultora-cpf?codigo=${codigo}`, { headers });
  }

  public getNatEmanaPayCodigoCn(cod_cn: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/emanapay/codcn?cod_cn=${cod_cn}`, { headers })
  }

  public getNatEmanaPayCpf(cpf: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/emanapay/cpf?cpf=${cpf}`, { headers })
  }

  public getCodigoVendaMarca(marca: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/codigo-venda/marca?marca=${marca}`, { headers })
  }

  public getCodigoVendaDescricao(descricao: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/codigo-venda/descricao?descricao=${descricao}`, { headers })
  }

  public getCodigoVendaLinhaProduto(linha_produto: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/codigo-venda/linha-produto?linha_produto=${linha_produto}`, { headers })
  }

  public getCodigoVendaCategorizacao(categorizacao: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/codigo-venda/categorizacao?categorizacao=${categorizacao}`, { headers })
  }

  public GetErroBoletosCliente(cliente: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/erros-boletos/cliente?cliente=${cliente}`, { headers })
  }

  public getNatSimuladorManifestacaoCategoria(): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/categorias`, { headers })
  }

  public getNatSimuladorManifestacaoLocalDefeito(id_categoria: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/local-defeito?id_categoria=${id_categoria}`, { headers })
  }

  public getNatSimuladorManifestacaoTipoDefeito(id_categoria: number, id_local_defeito: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/tipo-defeito?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}`, { headers })
  }

  public getNatSimuladorManifestacaoCorreta(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/correta?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`, { headers })
  }

  public getNatSimuladorManifestacaoDescricao(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/descricao?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`, { headers })
  }

  public getNatSimuladorManifestacaoSondagem(id_categoria: number, id_local_defeito: number, id_tipo_defeito: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/simulador-manifestacao/sondagem?id_categoria=${id_categoria}&id_local_defeito=${id_local_defeito}&id_tipo_defeito=${id_tipo_defeito}`, { headers })
  }

  public getDiasCodigoCn(codigo_cn: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/transportadora-dias/codigo-cn?codigo_cn=${codigo_cn}`, { headers })
  }

  public getDiasPedido(pedido: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/transportadora-dias/pedido?pedido=${pedido}`, { headers })
  }

  public postReembolsoCriarRegistro(jsonTab: JSON) {
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    this.httpClient.post(`${this.SERVER_URL}/api/reembolso/criar-registro`, jsonTab, { headers, observe: 'response' }).subscribe(
      data => {
        return data;
      }
    );
  }

  public getReembolsoCpfSolicitante(nr_documento: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reembolso/cpf-solicitante?nr_documento=${nr_documento}`, { headers })
  }

  public getReembolsoCpfFavorecido(cpf_favorecido: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reembolso/cpf-favorecido?cpf_favorecido=${cpf_favorecido}`, { headers })
  }

  public getReembolsoExportaDados(dataInicial: string, dataFinal: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reembolso/exporta-dados?dataInicial=${dataInicial}&dataFinal=${dataFinal}`, { headers })
  }

  public getObterSenha(): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reembolso/obter-senha`, { headers })
  }

  public getReparacaoCodigo(codigo: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reparacao/codigo?codigo=${codigo}`, { headers })
  }

  public getReparacaoNome(nome_completo: string): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reparacao/nome?nome_completo=${nome_completo}`, { headers })
  }

  public getReparacaoPedido(pedido: number): Observable<any>{
    const accessToken = localStorage.getItem('accessToken') || '';
    const headers = accessToken ? new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) : undefined;
    return this.httpClient.get(`${this.SERVER_URL}/api/reparacao/pedido?nr_pedido=${pedido}`, { headers })
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
