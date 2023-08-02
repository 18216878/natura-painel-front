import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-lideres-destaques',
  templateUrl: './process-lideres-destaques.component.html',
  styleUrls: ['./process-lideres-destaques.component.scss']
})
export class ProcessLideresDestaquesComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessLideresDestaquesComponent>,
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
