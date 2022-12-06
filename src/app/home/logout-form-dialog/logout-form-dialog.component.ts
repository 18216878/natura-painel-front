import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-logout-form-dialog',
  templateUrl: './logout-form-dialog.component.html',
  styleUrls: ['./logout-form-dialog.component.scss']
})
export class LogoutFormDialogComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<LogoutFormDialogComponent>,
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

  deslogar() {
    this.accountService.clear();
    this.router.navigate(['../login']);
    this.dialogRef.close();
  }

}
