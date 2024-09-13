import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pos-compra',
  templateUrl: './pos-compra.component.html',
  styleUrls: ['./pos-compra.component.scss']
})
export class PosCompraComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService
  ) {
    this.router = router;
      this.storage = window.localStorage;
      window.scroll(0, 0);
   }

   router: Router;
    private storage: Storage;
    public user: string;
    public user_id: string;

    faCircleInfo = faCircleInfo;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
  }

}
