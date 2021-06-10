import { Injectable } from '@angular/core';
import { Usuario } from './interfaces/usuario';

@Injectable()
export class LocalStorageService {
  user: Usuario;

  constructor() {
    if (localStorage.getItem('taskList')) {
      this.user = JSON.parse(localStorage.getItem('taskList'));
    }
  }

  getUser() {
    return this.user;
  }

  add(obj: Usuario) {
    this.user = obj;
    localStorage.setItem('taskList', JSON.stringify(this.user));
  }
  remove(index: number) {
    this.user = null;
    localStorage.setItem('taskList', JSON.stringify(this.user));
  }
  removeAll() {
    this.user = null;
    localStorage.setItem('taskList', JSON.stringify(this.user));
  }
  update(index: number, obj: Usuario) {
    this.user = obj;
    localStorage.setItem('taskList', JSON.stringify(this.user));
  }

  verify() {
    return this.user != null;
  }
}
