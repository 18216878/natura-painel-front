import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-calculadora-tempo-relacao',
  templateUrl: './process-calculadora-tempo-relacao.component.html',
  styleUrls: ['./process-calculadora-tempo-relacao.component.scss']
})
export class ProcessCalculadoraTempoRelacaoComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessCalculadoraTempoRelacaoComponent>,
    router: Router,
    private accountService: AccountService
  ) { 
    this.router = router;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
