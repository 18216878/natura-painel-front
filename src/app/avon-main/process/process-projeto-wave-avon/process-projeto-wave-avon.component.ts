import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-projeto-wave-avon',
  templateUrl: './process-projeto-wave-avon.component.html',
  styleUrls: ['./process-projeto-wave-avon.component.scss']
})
export class ProcessProjetoWaveAvonComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessProjetoWaveAvonComponent>,
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
