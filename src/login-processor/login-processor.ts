import * as _           from 'lodash';
import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter       from '../role-setter/role-setter';

export default function(credentials) {
  this.http.post(this.configs.loginRoute, credentials).subscribe(data => {
    let fields = ['routes', 'token'];
    let {routes, token} = _.pick(data, fields);
    data = _.omit(data, fields);
    _.extend(this, {data});
    this.http.setToken(token);
    roleSetter.call(this, 'auth', true, routes);
    autoLogoutSetter('add');
  });
}
