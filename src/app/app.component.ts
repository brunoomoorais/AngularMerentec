import { Component, enableProdMode, VERSION } from '@angular/core';
import moment = require('moment-timezone');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timezone = moment.tz.guess();
  offset = new Date().getTimezoneOffset();
  timezoneAbbrv = moment.tz.zone(this.timezone).abbr(this.offset);

  ngOnInit() {}
}
