import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public storage: LocalStorageService
  ) {}

  ngOnInit() {}

  logout() {
    this.loginService.logout();
  }

  getName() {
    return this.storage.user == null ? 'erro' : this.storage.getUser().userName;
  }
}
