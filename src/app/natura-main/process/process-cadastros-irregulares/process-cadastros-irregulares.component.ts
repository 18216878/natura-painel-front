import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-process-cadastros-irregulares',
  templateUrl: './process-cadastros-irregulares.component.html',
  styleUrls: ['./process-cadastros-irregulares.component.scss']
})
export class ProcessCadastrosIrregularesComponent implements OnInit {

  router: Router;
  constructor(
    public dialogRef: MatDialogRef<ProcessCadastrosIrregularesComponent>,
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
