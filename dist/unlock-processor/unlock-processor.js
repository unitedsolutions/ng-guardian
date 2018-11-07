import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import { configs } from '../_lib/vars';
export default function (credentials) {
    var _this = this;
    if (configs.gettingSettingsFromServer === true) {
        if (configs.serverSettngs) {
            credentials['serverSettngs'] = configs.serverSettngs;
        }
    }
    return new Promise(function (resolve, reject) {
        if (configs.lockDownEnabled === false) {
            return resolve({ message: 'lockDown functionality is dissabled (configs.lockDownEnabled = false)' });
        }
        if (configs.unlockUrl === null || configs.unlockUrl.length < 1) {
            return resolve({ message: 'configs.unlockUrl is not defined,' });
        }
        _this.http.post(configs.unlockUrl, credentials).subscribe(function (data) {
            _this.sessionStatus.next('LOGGED_IN');
            // reset lockDown
            autoLockSetter("remove");
            configs.lockDown = null;
            autoLockSetter("add");
            if (data) {
                return resolve(data);
            }
            else {
                return resolve({ ok: 1 });
            }
        }, function (err) {
            reject(err);
        });
    });
}
//# sourceMappingURL=unlock-processor.js.map