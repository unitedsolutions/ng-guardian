import * as _ from "lodash";
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter from '../role-setter/role-setter';
export default function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.http.get(_this.configs.logoutUrl).subscribe(function (data) {
            _this.auth = data.auth;
            _.extend(_this, { data: data });
            // clean up
            autoLogoutSetter('remove');
            roleSetter.call(_this, 'noAuth');
            _this.http.removeToken();
            resolve(data);
        }, function (err) {
            // clean up
            autoLogoutSetter('remove');
            roleSetter.call(_this, 'noAuth');
            _this.http.removeToken();
            return reject(err);
        });
    });
}
//# sourceMappingURL=logout-processor.js.map