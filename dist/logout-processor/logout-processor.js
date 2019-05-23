import * as _ from "lodash";
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import roleSetter from '../role-setter/role-setter';
import { configs } from '../_lib/vars';
export default function (logoutCode) {
    var _this = this;
    if (this.sessionStatus.value !== 'LOGGED_IN'
        && this.sessionStatus.value !== 'LOCKED_DOWN') {
        return; // doing nothing
    }
    return new Promise(function (resolve, reject) {
        if ((!logoutCode) || (logoutCode.length === 0)) {
            logoutCode = 'USER_LOGOUT';
        }
        _this.http.post(_this.configs.logoutUrl, { logoutCode: logoutCode }).subscribe(function (data) {
            if (data) {
                _this.auth = data.auth;
                var returnLogoutCode = ((data.auth) && (data.auth.code)) ? data.auth.code : 'LOGOUT';
                if (returnLogoutCode !== logoutCode) {
                    _this.sessionStatus.next(returnLogoutCode);
                }
                _.extend(_this, { data: data });
                _this.data.next(null);
                resolve(data);
            }
        }, function (err) {
            _this.sessionStatus.next('LOGOUT_WITH_ERROR');
            return reject(err);
        });
        _this.sessionStatus.next(logoutCode);
        _this.data.next(null);
        autoLogoutSetter('remove');
        autoLockSetter('remove');
        roleSetter.call(_this, 'noAuth', configs.logoutRedirctEnabled);
        _this.http.removeToken();
    });
}
//# sourceMappingURL=logout-processor.js.map