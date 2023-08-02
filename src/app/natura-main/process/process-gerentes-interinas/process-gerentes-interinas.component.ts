import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-gerentes-interinas',
  templateUrl: './process-gerentes-interinas.component.html',
  styleUrls: ['./process-gerentes-interinas.component.scss']
})
export class ProcessGerentesInterinasComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessGerentesInterinasComponent>,
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
