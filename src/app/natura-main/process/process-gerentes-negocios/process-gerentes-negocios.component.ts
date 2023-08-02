import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-gerentes-negocios',
  templateUrl: './process-gerentes-negocios.component.html',
  styleUrls: ['./process-gerentes-negocios.component.scss']
})
export class ProcessGerentesNegociosComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessGerentesNegociosComponent>,
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
