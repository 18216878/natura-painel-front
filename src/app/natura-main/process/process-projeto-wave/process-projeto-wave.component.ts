import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-projeto-wave',
  templateUrl: './process-projeto-wave.component.html',
  styleUrls: ['./process-projeto-wave.component.scss']
})
export class ProcessProjetoWaveComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessProjetoWaveComponent>,
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
