import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-plano-b-trocas',
  templateUrl: './process-plano-b-trocas.component.html',
  styleUrls: ['./process-plano-b-trocas.component.scss']
})
export class ProcessPlanoBTrocasComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessPlanoBTrocasComponent>,
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
