import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-vtex',
  templateUrl: './process-vtex.component.html',
  styleUrls: ['./process-vtex.component.scss']
})
export class ProcessVtexComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessVtexComponent>,
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
