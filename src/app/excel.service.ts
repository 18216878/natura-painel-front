import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateExcel(dataSource: any){

    const data = dataSource;

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Base Alocação', {views: [{ state: "frozen", ySplit: 1 }]});

    worksheet.columns = [
      { header: 'origem', key: 'origem', width: 30 },
      { header: 'cod_pessoa', key: 'cod_pessoa', width: 20 },
      { header: 'nome_completo_pessoa', key: 'nome_completo_pessoa', width: 40 },
      { header: 'cod_regiao_estrategica', key: 'cod_regiao_estrategica', width: 20 },
      { header: 'cod_gerencia_venda', key: 'cod_gerencia_venda', width: 20 },
      { header: 'cod_setor', key: 'cod_setor', width: 20 },
      { header: 'cod_grupo', key: 'cod_grupo', width: 20 },
      { header: 'cod_setor_grupo', key: 'cod_setor_grupo', width: 20 },
      { header: 'cod_nivel_atual', key: 'cod_nivel_atual', width: 20 },
      { header: 'uf_municipio', key: 'uf_municipio', width: 30 },
      { header: 'bairro', key: 'bairro', width: 30 },
      { header: 'cod_regiao_estrategica_elo', key: 'cod_regiao_estrategica_elo', width: 20 },
      { header: 'cod_gerencia_venda_elo', key: 'cod_gerencia_venda_elo', width: 20 },
      { header: 'cod_setor_elo', key: 'cod_setor_elo', width: 20 },
      { header: 'cod_grupo_elo', key: 'cod_grupo_elo', width: 20 }
    ]

    data.forEach((element) =>{

      worksheet.addRow({
        'origem': element.origem,
        'cod_pessoa': element.cod_pessoa,
        'nome_completo_pessoa': element.nome_completo_pessoa,
        'cod_regiao_estrategica': element.cod_regiao_estrategica,
        'cod_gerencia_venda': element.cod_gerencia_venda,
        'cod_setor': element.cod_setor,
        'cod_grupo': element.cod_grupo,
        'cod_setor_grupo': element.cod_setor_grupo,
        'cod_nivel_atual': element.cod_nivel_atual,
        'uf_municipio': element.uf_municipio,
        'cod_regiao_estrategica_elo': element.cod_regiao_estrategica_elo,
        'cod_gerencia_venda_elo': element.cod_gerencia_venda_elo,
        'cod_setor_elo': element.cod_setor_elo,
        'cod_grupo_elo': element.cod_grupo_elo
      }).font = { name: 'Gill Sans MT', family: 4, size: 10 };

    })

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber == 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF5722' }
        };
        cell.font = { name: 'Gill Sans MT', family: 4, size: 10, color: { argb: 'FFFFFF' }, bold: true }
        };
      })

      row.commit();

    });

    worksheet.autoFilter = 'A1:O1';

    var agora = moment(new Date()).format('YYYYMMDD_HHmmss');

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `base_alocacao_${agora}.xlsx`);
    });

  }

  generateExcelReembolso(dataSource: any){

    const data = dataSource;

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Base Reembolso', {views: [{ state: "frozen", ySplit: 1 }]});

    worksheet.columns = [
      { header: 'cliente', key: 'cliente', width: 40 },
      { header: 'nr_documento', key: 'nr_documento', width: 20 },
      { header: 'nr_ocorrencia', key: 'nr_ocorrencia', width: 30 },
      { header: 'data_criacao', key: 'data_criacao', width: 20, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' }},
      { header: 'origem', key: 'origem', width: 30 },
      { header: 'data_sla', key: 'data_sla', width: 20, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' }},
      { header: 'status_atividade', key: 'status_atividade', width: 20 },
      { header: 'nome_favorecido', key: 'nome_favorecido', width: 40 },
      { header: 'endereco_favorecido_rua', key: 'endereco_favorecido_rua', width: 40 },
      { header: 'endereco_favorecido_cidade', key: 'endereco_favorecido_cidade', width: 40 },
      { header: 'endereco_favorecido_cep', key: 'endereco_favorecido_cep', width: 30 },
      { header: 'codigo_banco', key: 'codigo_banco', width: 20 },
      { header: 'nome_banco', key: 'nome_banco', width: 35 },
      { header: 'agencia_numero', key: 'agencia_numero', width: 30 },
      { header: 'agencia_digito', key: 'agencia_digito', width: 20 },
      { header: 'conta_numero', key: 'conta_numero', width: 30 },
      { header: 'conta_digito', key: 'conta_digito', width: 20 },
      { header: 'cpf_favorecido', key: 'cpf_favorecido', width: 30 },
      { header: 'valor', key: 'valor', width: 20 },
      { header: 'base_origem', key: 'base_origem', width: 20 },
      { header: 'data_registro', key: 'data_registro', width: 20, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' }},
      { header: 'matricula', key: 'matricula', width: 20 },
      { header: 'nome', key: 'nome', width: 40 }
    ]

    var dtCriacao;
    var prDtcriacao;

    var dtSla;
    var prDtSla;

    var dtRegistro;
    var prDtRegistro;

    data.forEach((element) =>{

      dtCriacao = element.data_criacao === null || element.data_criacao === undefined ? null : moment(element.data_criacao).subtract(3, 'hours');
      dtSla = element.data_sla === null || element.data_sla === undefined ? null : moment(element.data_sla).subtract(3, 'hours');
      dtRegistro = element.data_registro === null || element.data_registro === undefined ? null : moment(element.data_registro).subtract(3, 'hours');


      prDtcriacao = dtCriacao === null ? null : new Date(dtCriacao.year(), dtCriacao.month(), dtCriacao.date(), dtCriacao.hour(), dtCriacao.minute(), dtCriacao.second());
      prDtSla = dtSla === null ? null : new Date(dtSla.year(), dtSla.month(), dtSla.date(), dtSla.hour(), dtSla.minute(), dtSla.second());
      prDtRegistro = dtRegistro === null ? null : new Date(dtRegistro.year(), dtRegistro.month(), dtRegistro.date(), dtRegistro.hour(), dtRegistro.minute(), dtRegistro.second());


      worksheet.addRow({
        'cliente': element.cliente,
        'nr_documento': element.nr_documento,
        'nr_ocorrencia': element.nr_ocorrencia,
        'data_criacao': prDtcriacao,
        'origem': element.origem,
        'data_sla': prDtSla,
        'status_atividade': element.status_atividade,
        'nome_favorecido': element.nome_favorecido,
        'endereco_favorecido_rua': element.endereco_favorecido_rua,
        'endereco_favorecido_cidade': element.endereco_favorecido_cidade,
        'endereco_favorecido_cep': element.endereco_favorecido_cep,
        'codigo_banco': element.codigo_banco,
        'nome_banco': element.nome_banco,
        'agencia_numero': element.agencia_numero,
        'agencia_digito': element.agencia_digito,
        'conta_numero': element.conta_numero,
        'conta_digito': element.conta_digito,
        'cpf_favorecido': element.cpf_favorecido,
        'valor': element.valor,
        'data_registro': prDtRegistro,
        'matricula': element.matricula,
        'nome': element.nome
      }).font = { name: 'Gill Sans MT', family: 4, size: 10 };

    })

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber == 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D1020A' }
        };
        cell.font = { name: 'Gill Sans MT', family: 4, size: 10, color: { argb: 'FFFFFF' }, bold: true }
        };
      })

      row.commit();

    });

    worksheet.autoFilter = 'A1:W1';

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `base_reembolso.xlsx`);
    });

  }


}
