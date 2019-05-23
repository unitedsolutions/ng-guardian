import { HttpClientPlus } from 'ng-http-client-plus';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var Guardian = /** @class */ (function () {
    function Guardian(http, router) {
        this.http = http;
        this.router = router;
        this.history = [];
        this.linksPublisher = new BehaviorSubject(null);
        this.sessionStatus = new BehaviorSubject('');
        this.navLinks = new BehaviorSubject(null);
        this.data = new BehaviorSubject(null);
    }
    Guardian.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Guardian.ctorParameters = function () { return [
        { type: HttpClientPlus, },
        { type: Router, },
    ]; };
    return Guardian;
}());
export { Guardian };
var NavItem = /** @class */ (function () {
    function NavItem(parent, label, path) {
        this.parent = parent ? parent : 'undefined';
        this.path = path ? path : '';
        this.label = label ? label : path;
    }
    return NavItem;
}());
export { NavItem };
//# sourceMappingURL=constructor.js.map