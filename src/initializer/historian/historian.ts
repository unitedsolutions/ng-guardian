import {NavigationEnd} from '@angular/router';

export default function() {
  this.router.events.filter(evt => evt instanceof NavigationEnd).subscribe(evt => {
    this.history.push(evt.url);
    this.history.splice(10);
  });
}
