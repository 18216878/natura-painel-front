import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-simulador-cobranca',
  templateUrl: './process-simulador-cobranca.component.html',
  styleUrls: ['./process-simulador-cobranca.component.scss']
})
export class ProcessSimuladorCobrancaComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessSimuladorCobrancaComponent>,
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
