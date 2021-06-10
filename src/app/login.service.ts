import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './interfaces/usuario';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  result: any;
  readonly urlApi = 'https://merentecv3-heroku.herokuapp.com';
  //readonly urlApi = 'http://localhost:8082';
  constructor(
    private http: HttpClient,
    public storage: LocalStorageService,
    private router: Router
  ) {}

  login(login: string, senha: string) {
    var json =
      '{"login":"' + login.trim() + '", "senha":"' + senha.trim() + '"}';
    this.http.post<Usuario>(this.urlApi + '/login', json).subscribe(data => {
      this.storage.add(data);
      if (data.userPerfil == '[ADMIN]') {
        this.router.navigate(['/merendeira']);
      } else {
        this.router.navigate(['/usuario']);
      }
    });
  }

  logout() {
    this.storage.remove(0);
    this.router.navigate(['/']);
  }
}
