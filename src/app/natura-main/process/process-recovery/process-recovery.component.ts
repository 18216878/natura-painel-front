import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-recovery',
  templateUrl: './process-recovery.component.html',
  styleUrls: ['./process-recovery.component.scss']
})
export class ProcessRecoveryComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessRecoveryComponent>,
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
