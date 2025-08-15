import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  categoriaDropDown: any[] = [];
  categoriaOriginal: any[] = [];
  @Input() categoria: string;
  @Input() id_categoria: number;

  filtroCategoria: string = '';

  constructor(
    public dialogRef: MatDialogRef<CategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.categoriaDropDown = data.categoriaDropDown;
      this.categoriaOriginal = [...data.categoriaDropDown];
    }

  ngOnInit(): void {}

  get categoriaFiltrada() {
    if (!this.filtroCategoria) {
      return this.categoriaDropDown;
    }
    return this.categoriaDropDown.filter(cat =>
      cat.categoria && cat.categoria.toLowerCase().includes(this.filtroCategoria.toLowerCase())
    );
  }

  selectedCategoriaIndex: number | null = null;

  onToggleCategoria(index: number) {
    this.selectedCategoriaIndex = index;
    const itemFiltrado = this.categoriaFiltrada[index];
    const itemOriginal = this.categoriaOriginal.find(cat => cat.id === itemFiltrado.id);
    this.dialogRef.close({
      categoria: itemOriginal?.categoria,
      id_categoria: itemOriginal?.id
    });
  }

  selecionar(categoria: string) {
    this.categoria = categoria;
  }

}
