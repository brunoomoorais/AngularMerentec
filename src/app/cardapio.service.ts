import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cardapio, CardapioDto, Usuario } from './interfaces/cardapio';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CardapioService {
  listCardapio: Array<Cardapio> = [];
  listCardapioAll: Array<Cardapio> = [];
  readonly urlApi = 'https://merentecv3-heroku.herokuapp.com/api';
  //readonly urlApi = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private storage: LocalStorageService) {}
  getCardapio() {
    this.http
      .get<Array<Cardapio>>(this.urlApi + '/cardapios/order')
      .subscribe(data => {
        this.listCardapio = data;
      });
  }

  getCardapioAll() {
    this.http
      .get<Array<Cardapio>>(this.urlApi + '/cardapios')
      .subscribe(data => {
        this.listCardapioAll = data;
      });
  }

  getCardapioByDate(date: string) {
    this.http
      .get<CardapioDto>(this.urlApi + '/cardapios/' + date)
      .subscribe(data => {
        this.item = data;
      });
  }

  getConfig(token: string) {
    return {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };
  }

  getPerfis(perfil: string) {
    if (perfil == '[ADMIN]') return [1];
    return [2];
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  item: CardapioDto;
  async removerCardapio(date: string) {
    console.log(this.getConfig(this.storage.getUser().Auth));
    this.getCardapioByDate(date);
    await this.delay(2000);
    this.item.usuario = new Array<Usuario>();
    console.log(this.item);
    let json = JSON.stringify(this.item);

    console.log(json);
    let result = this.http
      .put(
        this.urlApi + '/cardapios',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });

    await this.delay(2000);

    this.http
      .delete(
        this.urlApi + '/cardapios/' + date,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  adicionar(date: string, pratoId: number) {
    let json =
      '{"data": "' + date + '","usuario": [],"prato":{"id": ' + pratoId + '}}';

    console.log(json);

    this.http
      .post(
        this.urlApi + '/cardapios',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => console.log(data));
  }

  reservarPrato(date: string) {
    let userId = parseFloat(this.storage.getUser().userId);
    let login = this.storage.getUser().userLogin;
    let name = this.storage.getUser().userName;
    let perfil: Array<string> = [this.storage.getUser().userPerfil];
    this.listCardapio
      .find(x => x.data == date)
      .usuario.push({
        id: userId,
        login: login,
        nome: name,
        perfis: perfil
      });
    let current = this.listCardapio.find(x => x.data == date);

    let cardapio: CardapioDto = {
      data: null,
      prato: null,
      usuario: Array<Usuario>()
    };
    cardapio.data = current.data;
    cardapio.prato = current.prato;
    current.usuario.forEach(x =>
      cardapio.usuario.push({
        id: x.id,
        nome: x.nome,
        login: x.login,
        perfis: this.getPerfis(x.perfis[0])
      })
    );

    let json = JSON.stringify(cardapio);

    console.log(json);
    let result = this.http
      .put(
        this.urlApi + '/cardapios',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  cancelarPrato(date: string) {
    let userId = parseFloat(this.storage.getUser().userId);
    for (
      let index = 0;
      index <= this.listCardapio.find(x => x.data == date).usuario.length;
      index++
    ) {
      let currentUser = this.listCardapio.find(x => x.data == date).usuario[
        index
      ];
      if (currentUser.id == userId) {
        this.listCardapio.find(x => x.data == date).usuario.splice(index, 1);
        break;
      }
    }

    let json = JSON.stringify(this.listCardapio.find(x => x.data == date));
    json = json
      .toString()
      .replace('"CLIENTE"', '2')
      .replace('"ADMIN"', '1');
    console.log(json);

    let result = this.http
      .put(
        this.urlApi + '/cardapios',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });
  }
}
