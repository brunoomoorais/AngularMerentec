import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prato, PratoDto } from './interfaces/prato';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class PratoService {
  listPrato: Array<Prato> = [];
  currentPrato: Prato;

  readonly urlApi = 'https://merentecv3-heroku.herokuapp.com/api';
  //readonly urlApi = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getPratos() {
    this.http.get<Array<Prato>>(this.urlApi + '/pratos').subscribe(data => {
      this.listPrato = data;
    });
  }

  getPrato(id: number) {
    return this.listPrato.find(x => (x.id = id));
  }

  removerPrato(id: number) {
    console.log('remover da API');
    this.http
      .delete(
        this.urlApi + '/pratos/' + id,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });

    console.log(this.getConfig(this.storage.getUser().Auth));
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

  insert(obj: PratoDto) {
    let json = JSON.stringify(obj);

    console.log(json);

    this.http
      .post(
        this.urlApi + '/pratos',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  update(obj: Prato) {
    let json = JSON.stringify(obj);

    console.log(json);

    this.http
      .put(
        this.urlApi + '/pratos',
        json,
        this.getConfig(this.storage.getUser().Auth)
      )
      .subscribe(data => {
        console.log(data);
      });
  }
}
