import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public storage: LocalStorageService
  ) {
    this.error = '';
    this.display = 'hidden';
  }
  login: string;
  senha: string;
  error: string = '';
  ngOnInit() {}
  display = 'hidden';

  async singIn() {
    this.display = 'visible';
    this.loginService.login(this.login, this.senha);
    await this.delay(6000);
    if (this.storage.getUser() == null) {
      this.error = 'Login ou senha incorretos!';
    } else {
      this.error = '';
    }
    this.display = 'hidden';
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
