import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardapioService } from '../cardapio.service';
import { PratoService } from '../prato.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  constructor(
    public cardapioService: CardapioService,
    public pratoService: PratoService,
    public datePipe: DatePipe
  ) {
    this.cardapioService.getCardapioAll();
    this.pratoService.getPratos();
    this.display = 'hidden';
  }

  display = 'hidden';

  ngOnInit() {
    this.cardapioService.getCardapioAll();
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  getDate(date: string) {
    let dateNow = new Date(date);
    dateNow.setDate(dateNow.getDate() + 1);
    return this.datePipe.transform(dateNow, 'dd/MM/yyyy');
  }

  async remover(index: number) {
    this.display = 'visible';
    let data = this.cardapioService.listCardapioAll[index].data;
    this.cardapioService.removerCardapio(data);
    await this.delay(6000);
    this.display = 'hidden';
    this.ngOnInit();
  }

  situation = 'cardapio';

  prato = 0;
  date = '';

  editar() {
    this.situation = 'editar';
  }
  adicionarPrato() {
    this.situation = 'adicionar';
  }

  async adicionar() {
    this.display = 'visible';
    this.cardapioService.adicionar(this.date, this.prato);
    this.cardapioService.getCardapioAll();
    await this.delay(6000);
    this.display = 'hidden';
    this.ngOnInit();
    this.situation = 'cardapio';
  }

  salvar() {
    this.retornar();
  }

  salvarAlteracao() {
    this.retornar();
  }

  retornar() {
    this.situation = 'cardapio';
    this.prato = 0;
    this.date = '';
  }
}
