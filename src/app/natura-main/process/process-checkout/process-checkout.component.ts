import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-checkout',
  templateUrl: './process-checkout.component.html',
  styleUrls: ['./process-checkout.component.scss']
})
export class ProcessCheckoutComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessCheckoutComponent>,
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
