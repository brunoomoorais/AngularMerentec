import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardapioService } from '../cardapio.service';
import { Cardapio } from '../interfaces/cardapio';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  list: Observable<Cardapio[]>;
  listDisplay: Array<{ det: string; basic: string }> = [];
  constructor(
    public cardapioService: CardapioService,
    public storage: LocalStorageService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  display = 'hidden';

  getList() {
    var qt = this.cardapioService.listCardapio;
    qt.forEach(x => this.listDisplay.push({ det: 'block', basic: 'none' }));
    return this.cardapioService.listCardapio;
  }

  getDate(date: string) {
    let dateNow = new Date(date);
    dateNow.setDate(dateNow.getDate() + 1);
    return this.datePipe.transform(dateNow, 'dd/MM/yyyy');
  }

  async reservar(date: string) {
    this.display = 'visible';
    this.cardapioService.reservarPrato(date);
    await this.delay(4000);
    this.display = 'hidden';
  }

  async cancelar(date: string) {
    this.display = 'visible';
    this.cardapioService.cancelarPrato(date);
    await this.delay(4000);
    this.display = 'hidden';
  }

  verifyTime(index: number, date: string) {
    if (index == 0) {
      let current = new Date();
      let currentDate = this.datePipe.transform(
        current.toString(),
        'dd/MM/yyyy'
      );
      let dateC = this.datePipe.transform(date, 'dd/MM/yyyy');
      if (current.getHours() < 11) {
        return false;
      } else {
        if (dateC != currentDate) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  alerta() {
    window.alert('O tempo de cancelar/reservar acabou!');
  }

  appear(index: number) {
    let value = this.listDisplay[index];
    if (value.det == 'none')
      this.listDisplay[index] = { det: 'block', basic: 'none' };
    else this.listDisplay[index] = { det: 'none', basic: 'block' };
  }

  reservado(index: number): boolean {
    let prato = this.cardapioService.listCardapio[index];

    for (let user of prato.usuario) {
      if (user.login == this.storage.getUser().userLogin) return true;
    }
    return false;
  }
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  async ngOnInit() {
    if (this.storage.user == null) {
      this.router.navigate(['/']);
    } else {
      if (this.storage.getUser().userPerfil != '[CLIENTE]') {
        this.router.navigate(['/']);
      }
    }
    this.cardapioService.getCardapio();
  }
}
