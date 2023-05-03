import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-tag2h',
  templateUrl: './process-tag2h.component.html',
  styleUrls: ['./process-tag2h.component.scss']
})
export class ProcessTag2hComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessTag2hComponent>,
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
