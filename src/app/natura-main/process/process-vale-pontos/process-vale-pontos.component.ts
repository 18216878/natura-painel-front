import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-vale-pontos',
  templateUrl: './process-vale-pontos.component.html',
  styleUrls: ['./process-vale-pontos.component.scss']
})
export class ProcessValePontosComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessValePontosComponent>,
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
