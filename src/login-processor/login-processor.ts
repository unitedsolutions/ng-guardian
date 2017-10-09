import * as _           from 'lodash';
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter       from '../role-setter/role-setter';

export default function(credentials) {
  return new Promise((resolve, reject) => {
    this.http.post(this.configs.loginUrl, credentials).subscribe(data => {
      let fields = ['routes', 'token'];
      let {routes, token} = _.pick(data, fields);
      this.http.setToken(token);
      data = _.omit(data, fields);
      _.extend(this, {data});
      roleSetter.call(this, 'auth', true, routes);
      autoLogoutSetter('add');         
    }, err => reject(err));
  });
}
