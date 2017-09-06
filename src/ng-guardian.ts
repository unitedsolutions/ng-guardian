import * as _                 from 'lodash';
import {NgModule}             from '@angular/core';
import {HttpClientPlusModule} from 'ng-http-client-plus';
import {Guardian}             from './_constructor/constructor';
import init                   from './initializer/initializer';
import login                  from './login-processor/login-processor';
import logout                 from './logout-processor/logout-processor';
import links                  from './links-getter/links-getter';
import routes                 from './routes-getter/routes-getter';

_.extend(Guardian.prototype, {
  init,
  login,
  logout,
  links,
  routes
});

@NgModule({
  imports: [HttpClientPlusModule],
  providers: [Guardian]
}) 
class GuardianModule {}

export {
  Guardian,
  GuardianModule
};
