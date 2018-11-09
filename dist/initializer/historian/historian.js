import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
export default function () {
    var _this = this;
    this.router.events.pipe(filter(function (evt) { return evt instanceof NavigationEnd; })).subscribe(function (evt) {
        _this.history.unshift(evt.url);
        _this.history.splice(10);
    });
}
//# sourceMappingURL=historian.js.map