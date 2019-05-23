import * as _           from "lodash";
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import roleSetter       from '../role-setter/role-setter';
import {configs} from '../_lib/vars';

export default function(logoutCode) {
  if (this.sessionStatus.value !== 'LOGGED_IN'
      && this.sessionStatus.value !== 'LOCKED_DOWN'){
    return; // doing nothing
  }
  return new Promise((resolve, reject) => {
    if ((!logoutCode) || (logoutCode.length === 0)) {
       logoutCode = 'USER_LOGOUT';
    }
    this.http.post(this.configs.logoutUrl, {logoutCode}).subscribe(
      resdata => {
        if (resdata) {
          this.auth = resdata.auth;
          const returnLogoutCode =((resdata.auth) && (resdata.auth.code)) ? resdata.auth.code : 'LOGOUT';
          if (returnLogoutCode !== logoutCode) {
            this.sessionStatus.next(returnLogoutCode);
          }
          this.data.next(null);
          resolve(resdata);
        }
      },
      err => {
        this.sessionStatus.next('LOGOUT_WITH_ERROR');
        return reject(err);
      }
    );
    this.sessionStatus.next(logoutCode);
    this.data.next(null);
    autoLogoutSetter('remove');
    autoLockSetter('remove');
    roleSetter.call(this, 'noAuth', configs.logoutRedirctEnabled);
    this.http.removeToken();
  });
}
