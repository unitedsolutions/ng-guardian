import * as _ from "lodash";
import autoLogoutSetter from "../auto-logout-setter/auto-logout-setter";
import roleSetter from "../role-setter/role-setter";
export default function (credentials) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.http.post(_this.configs.loginUrl, credentials).subscribe(function (data) {
            var fields = ["routes", "token", "result"];
            var _a = _.pick(data, fields), routes = _a.routes, token = _a.token, result = _a.result;
            _this.auth = result;
            _this.http.setToken(token);
            data = _.omit(data, fields);
            _.extend(_this, { data: data });
            roleSetter.call(_this, "auth", true, routes);
            autoLogoutSetter("add");
            resolve({ auth: (result ? result : 'ok'), data: data });
        }, function (err) {
            reject(err);
        });
    });
}
//# sourceMappingURL=login-processor.js.map