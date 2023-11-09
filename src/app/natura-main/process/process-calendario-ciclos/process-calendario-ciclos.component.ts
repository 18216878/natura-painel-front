import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-calendario-ciclos',
  templateUrl: './process-calendario-ciclos.component.html',
  styleUrls: ['./process-calendario-ciclos.component.scss']
})
export class ProcessCalendarioCiclosComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessCalendarioCiclosComponent>,
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
