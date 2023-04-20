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
import { ProcessProjetoWaveAvonComponent } from './process/process-projeto-wave-avon/process-projeto-wave-avon.component';

@Component({
  selector: 'app-avon-main',
  templateUrl: './avon-main.component.html',
  styleUrls: ['./avon-main.component.scss']
})
export class AvonMainComponent implements OnInit {

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

  faTruckFast = faTruckFast;
  faCity = faCity;
  faCartPlus = faCartPlus;
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faBottleDroplet = faBottleDroplet;
  faCircleExclamation = faCircleExclamation;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFaceAngry = faFaceAngry;
  faFaceSmile = faFaceSmile;
  faFaceFrown = faFaceFrown;
  faEnvelope = faEnvelope;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faShopify = faShopify;
  faSackDollar = faSackDollar;
  faMoneyBill1 = faMoneyBill1;
  faCreditCard = faCreditCard;
  faAddressCard = faAddressCard;
  faFingerprint = faFingerprint;
  faUserPen = faUserPen;
  faTag = faTag;
  faBarcode = faBarcode;
  faGift = faGift;
  faCircleInfo = faCircleInfo;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent);

  }

  openProjetoWaveDialog() {
    const dialogRef = this.dialog.open(ProcessProjetoWaveAvonComponent);
  }

}
