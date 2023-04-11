import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.scss']
})
export class MecanicaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MecanicaComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
