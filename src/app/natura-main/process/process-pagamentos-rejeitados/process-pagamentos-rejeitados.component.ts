import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-pagamentos-rejeitados',
  templateUrl: './process-pagamentos-rejeitados.component.html',
  styleUrls: ['./process-pagamentos-rejeitados.component.scss']
})
export class ProcessPagamentosRejeitadosComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessPagamentosRejeitadosComponent>,
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
