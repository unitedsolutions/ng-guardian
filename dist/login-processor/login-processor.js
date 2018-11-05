import * as _ from "lodash";
import autoLogoutSetter from "../auto-logout-setter/auto-logout-setter";
import roleSetter from "../role-setter/role-setter";
import { configs } from '../_lib/vars';
export default function (credentials) {
    var _this = this;
    if (configs.gettingSettingsFromServer === true) {
        if (configs.serverSettngs) {
            credentials['serverSettngs'] = configs.serverSettngs;
        }
    }
    return new Promise(function (resolve, reject) {
        _this.http.post(configs.loginUrl, credentials).subscribe(function (data) {
            var fields = ["routes", "token", "responseData"];
            var _a = _.pick(data, fields), routes = _a.routes, token = _a.token, responseData = _a.responseData;
            // authentification status
            _this.auth = responseData.auth;
            if (responseData.auth) {
                _this.sessionStatus.next(responseData.auth.auth === true ? 'LOGGED_IN' : 'NO_AUTH');
            }
            else {
                _this.sessionStatus.next('NO_AUTH');
            }
            // server settings
            if (configs.gettingSettingsFromServer === true) {
                if (responseData && responseData.settings) {
                    autoLogoutSetter('remove');
                    configs.serverSettngs.sessionTimeout = responseData.settings.sessionTimeout;
                    configs.logoutTimeout = responseData.settings.sessionTimeout;
                }
            }
            _this.http.setToken(token);
            data = _.omit(data, fields);
            _.extend(_this, { data: data });
            roleSetter.call(_this, "auth", true, routes);
            autoLogoutSetter("add");
            resolve({ auth: (responseData.auth ? responseData.auth : 'ok'), data: data });
        }, function (err) {
            reject(err);
        });
    });
}
//# sourceMappingURL=login-processor.js.map