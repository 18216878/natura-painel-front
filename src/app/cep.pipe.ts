import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string|number): string {
    let valorFormatado = value + '';

    if(value > 0) {
      valorFormatado = valorFormatado
        .padStart(8, '0')                  // item 1
        .substr(0, 8)                      // item 2
        .replace(/[^0-9]/, '')              // item 3
        .replace(                           // item 4
            /(\d{5})(\d{3})/,
            '$1-$2'
        );
        return valorFormatado;
    }

    else {
      return null;
    }

    

}

}
