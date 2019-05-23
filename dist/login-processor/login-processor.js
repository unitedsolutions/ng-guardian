import * as _ from "lodash";
import autoLogoutSetter from "../auto-logout-setter/auto-logout-setter";
import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import roleSetter from "../role-setter/role-setter";
import { configs } from '../_lib/vars';
export default function (credentials) {
    var _this = this;
    if (configs.gettingSettingsFromServer === true) {
        if (configs.serverSettngs && credentials) {
            credentials['serverSettngs'] = configs.serverSettngs;
        }
    }
    return new Promise(function (resolve, reject) {
        _this.http.post(configs.loginUrl, credentials).subscribe(function (reqData) {
            var fields = ["routes", "token", "responseData"];
            var _a = _.pick(reqData, fields), routes = _a.routes, token = _a.token, responseData = _a.responseData;
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
            var clone = _.omit(reqData, fields);
            _this.data.next(clone);
            roleSetter.call(_this, "auth", true, routes);
            autoLogoutSetter("add");
            autoLockSetter("add");
            resolve({ auth: (responseData.auth ? responseData.auth : 'ok'), data: clone });
        }, function (err) {
            reject(err);
        });
    });
}
//# sourceMappingURL=login-processor.js.map