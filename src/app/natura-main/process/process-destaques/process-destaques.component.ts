import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-destaques',
  templateUrl: './process-destaques.component.html',
  styleUrls: ['./process-destaques.component.scss']
})
export class ProcessDestaquesComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessDestaquesComponent>,
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
