import autoLogoutSetter from '../auto-logout-setter/auto-logout-setter';
import roleSetter       from '../role-setter/role-setter';

export default function() {
  autoLogoutSetter('remove');
  roleSetter.call(this, 'noAuth');
  this.http.removeToken();
}
