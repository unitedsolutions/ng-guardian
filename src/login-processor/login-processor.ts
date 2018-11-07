import * as _ from "lodash";
import autoLogoutSetter from "../auto-logout-setter/auto-logout-setter";
import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import roleSetter from "../role-setter/role-setter";
import {configs} from '../_lib/vars';

export default function(credentials) {
  if (configs.gettingSettingsFromServer === true) {
    if (configs.serverSettngs) {
      credentials['serverSettngs'] = configs.serverSettngs;
    } 
  }
  return new Promise((resolve, reject) => {
    this.http.post(configs.loginUrl, credentials).subscribe(
      data => {
        let fields = ["routes", "token", "responseData"];
        let { routes, token, responseData } = _.pick(data, fields);
        
        // authentification status
        this.auth = responseData.auth;
        if (responseData.auth){
          this.sessionStatus.next(responseData.auth.auth===true ? 'LOGGED_IN': 'NO_AUTH');
        } else {
          this.sessionStatus.next('NO_AUTH');
        }

        // server settings
        if (configs.gettingSettingsFromServer === true) {
          if (responseData && responseData.settings) {
            autoLogoutSetter('remove');
            configs.serverSettngs.sessionTimeout = responseData.settings.sessionTimeout;
            configs.logoutTimeout = responseData.settings.sessionTimeout
          }
        }
        
        this.http.setToken(token);
        data = _.omit(data, fields);
        _.extend(this, { data });
        roleSetter.call(this, "auth", true, routes);
        autoLogoutSetter("add");
        autoLockSetter("add");
        resolve({auth: (responseData.auth ? responseData.auth : 'ok'), data: data});
      },
      err => {
        reject(err);
      }
    );
  });
}
