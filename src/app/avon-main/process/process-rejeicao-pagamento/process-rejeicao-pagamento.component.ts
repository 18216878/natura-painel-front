import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-rejeicao-pagamento',
  templateUrl: './process-rejeicao-pagamento.component.html',
  styleUrls: ['./process-rejeicao-pagamento.component.scss']
})
export class ProcessRejeicaoPagamentoComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessRejeicaoPagamentoComponent>,
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
