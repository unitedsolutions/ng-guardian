import * as _           from "lodash";
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter       from '../role-setter/role-setter';
import {configs} from '../_lib/vars';

export default function(logoutCode) {
  if (this.sessionStatus.value !== 'LOGGED_IN'){
    return; // doing nothing
  }
  return new Promise((resolve, reject) => {
    if ((!logoutCode) || (logoutCode.length === 0)) {
       logoutCode = 'USER_LOGOUT';
    }
    this.http.post(this.configs.logoutUrl, {logoutCode}).subscribe(
      data => {
        if (data) {
          this.auth = data.auth;
          const returnLogoutCode =((data.auth) && (data.auth.code)) ? data.auth.code : 'LOGOUT';
          if (returnLogoutCode !== logoutCode) {
            this.sessionStatus.next(returnLogoutCode);
          }
          _.extend(this, { data});
          resolve(data);
        }
      },
      err => {
        this.sessionStatus.next('LOGOUT_WITH_ERROR');
        return reject(err);
      }
    );
    this.sessionStatus.next(logoutCode);
    autoLogoutSetter('remove');
    roleSetter.call(this, 'noAuth', configs.logoutRedirctEnabled);
    this.http.removeToken();
  });
}
