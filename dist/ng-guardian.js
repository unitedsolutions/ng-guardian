import * as _ from 'lodash';
import { NgModule } from '@angular/core';
import { HttpClientPlusModule } from 'ng-http-client-plus';
import { Guardian } from './_constructor/constructor';
import init from './initializer/initializer';
import login from './login-processor/login-processor';
import logout from './logout-processor/logout-processor';
import links from './links-getter/links-getter';
import routes from './routes-getter/routes-getter';
_.extend(Guardian.prototype, {
    init: init,
    login: login,
    logout: logout,
    links: links,
    routes: routes
});
var GuardianModule = (function () {
    function GuardianModule() {
    }
    GuardianModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientPlusModule],
                    providers: [Guardian]
                },] },
    ];
    /** @nocollapse */
    GuardianModule.ctorParameters = function () { return []; };
    return GuardianModule;
}());
export { Guardian, GuardianModule };
//# sourceMappingURL=ng-guardian.js.map