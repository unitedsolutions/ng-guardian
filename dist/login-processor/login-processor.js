import * as _ from 'lodash';
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter from '../role-setter/role-setter';
export default function (credentials) {
    var _this = this;
    var promise = this.http.post(this.configs.loginUrl, credentials).toPromise();
    promise.catch(function (e) { });
    promise.then(function (data) {
        var fields = ['routes', 'token'];
        var _a = _.pick(data, fields), routes = _a.routes, token = _a.token;
        _this.http.setToken(token);
        data = _.omit(data, fields);
        _.extend(_this, { data: data });
        roleSetter.call(_this, 'auth', true, routes);
        autoLogoutSetter('add');
    });
    return promise;
}
//# sourceMappingURL=login-processor.js.map