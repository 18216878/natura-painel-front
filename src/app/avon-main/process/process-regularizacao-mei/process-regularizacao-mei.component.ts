import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-regularizacao-mei',
  templateUrl: './process-regularizacao-mei.component.html',
  styleUrls: ['./process-regularizacao-mei.component.scss']
})
export class ProcessRegularizacaoMeiComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessRegularizacaoMeiComponent>,
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
