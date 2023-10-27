import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-atraso-entrega',
  templateUrl: './process-atraso-entrega.component.html',
  styleUrls: ['./process-atraso-entrega.component.scss']
})
export class ProcessAtrasoEntregaComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessAtrasoEntregaComponent>,
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
