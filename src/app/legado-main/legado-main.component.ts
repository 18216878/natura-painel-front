import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faCircleExclamation, faTruckFast, faCity, faCartPlus, faMagnifyingGlass, faLocationDot, faBottleDroplet , faSackDollar, faAddressCard, faFingerprint, faUserPen, faTag, faBarcode, faGift } from '@fortawesome/free-solid-svg-icons';
import { faFaceAngry, faFaceSmile, faFaceFrown, faEnvelope, faThumbsDown, faThumbsUp, faMoneyBill1, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram, faTwitter, faShopify } from '@fortawesome/free-brands-svg-icons';
import { PainelService } from '../painel.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { InfoDialogComponent } from '../home/info-dialog/info-dialog.component';
import { ProcessVtexComponent } from './process/process-vtex/process-vtex.component';

@Component({
  selector: 'app-legado-main',
  templateUrl: './legado-main.component.html',
  styleUrls: ['./legado-main.component.scss']
})
export class LegadoMainComponent implements OnInit {

  constructor(
    private painelService: PainelService,
    private formBuilder: FormBuilder,
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

  openVtexDialog() {
    const dialogRef = this.dialog.open(ProcessVtexComponent);
  }

}
