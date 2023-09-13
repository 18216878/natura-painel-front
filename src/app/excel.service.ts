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


}
