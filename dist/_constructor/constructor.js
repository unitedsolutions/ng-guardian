import { HttpClientPlus } from 'ng-http-client-plus';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var Guardian = /** @class */ (function () {
    function Guardian(http, router) {
        this.http = http;
        this.router = router;
        this.history = [];
        this.linksPublisher = new BehaviorSubject([]);
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
//# sourceMappingURL=constructor.js.map