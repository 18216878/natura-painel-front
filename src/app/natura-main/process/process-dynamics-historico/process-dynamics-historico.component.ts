import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-dynamics-historico',
  templateUrl: './process-dynamics-historico.component.html',
  styleUrls: ['./process-dynamics-historico.component.scss']
})
export class ProcessDynamicsHistoricoComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessDynamicsHistoricoComponent>,
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
