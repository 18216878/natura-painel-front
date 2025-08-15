import { Component, OnInit } from '@angular/core';
import { PainelService } from './painel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'painel';

  constructor(private painelService: PainelService) {}

  ngOnInit() {
    this.painelService.verificaRefreshTokenOuRedireciona();
  }
}
