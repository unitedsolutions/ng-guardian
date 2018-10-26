import * as _           from "lodash";
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter       from '../role-setter/role-setter';

export default function() {
  return new Promise((resolve, reject) => {
    this.http.get(this.configs.logoutUrl).subscribe(
      data => {
        this.auth = data.auth;
        _.extend(this, { data});
        // clean up
        autoLogoutSetter('remove');
        roleSetter.call(this, 'noAuth');
        this.http.removeToken();
        resolve(data);
      },
      err => {
        // clean up
        autoLogoutSetter('remove');
        roleSetter.call(this, 'noAuth');
        this.http.removeToken();
        return reject(err);
      }
    );
  });
}
