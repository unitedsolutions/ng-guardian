import {NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';

export default function() {
  this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(evt => {
    this.history.unshift(evt.url);
    this.history.splice(10);
  });
}
