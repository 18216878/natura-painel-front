import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-simulador-lucro-default',
  templateUrl: './process-simulador-lucro-default.component.html',
  styleUrls: ['./process-simulador-lucro-default.component.scss']
})
export class ProcessSimuladorLucroDefaultComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessSimuladorLucroDefaultComponent>,
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
