import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { Prato } from '../interfaces/prato';
import { PratoService } from '../prato.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-merendeira',
  templateUrl: './merendeira.component.html',
  styleUrls: ['./merendeira.component.css']
})
export class MerendeiraComponent implements OnInit {
  list: Observable<Prato[]>;
  constructor(
    public pratoService: PratoService,
    public storage: LocalStorageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.display = 'hidden';
  }

  display = 'hidden';

  getList() {
    return this.pratoService.listPrato;
  }

  getConfig(token: string) {
    return {
      headers: {
        Authorization: token
      }
    };
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  editar(index: number) {
    this.pratoService.currentPrato = this.pratoService.listPrato[index];

    if (this.pratoService.currentPrato != null)
      this.router.navigate(['/editar-prato']);
  }

  async remover(index: number) {
    this.display = 'visible';
    let id = this.pratoService.listPrato[index].id;
    this.pratoService.removerPrato(id);
    await this.delay(4000);
    this.display = 'hidden';
    this.ngOnInit();
  }

  ngOnInit() {
    if (this.storage.user == null) {
      this.router.navigate(['/']);
    } else {
      if (this.storage.getUser().userPerfil != '[ADMIN]') {
        this.router.navigate(['/']);
      }
    }
    this.pratoService.getPratos();
  }
}
