import * as _                from 'lodash';
import {configs as _configs} from '../_lib/vars';          
import roleSetter            from '../role-setter/role-setter';
import rolesAssembler        from './roles-assembler/roles-assembler';
import redirectCapturer      from './redirect-capturer/redirect-capturer';
import historian             from './historian/historian';

export default function(configs) {
  _.extend(this, {configs});
  _.extend(_configs, configs, {guardian: this});
  rolesAssembler(this);
  redirectCapturer(this);
  historian.call(this);

  if (!this.http.configs) {
    let httpConfigs = configs.httpConfigs;
    if (!httpConfigs) {
      httpConfigs = { baseUrl: '', tokenName: 'auth-token' }; // set default;
    }
    if (!httpConfigs.tokenName) {
      httpConfigs.tokenName = 'auth-token'; // set default;
    }
    this.http.init(httpConfigs);
  }

  if(this.http.getToken()) {
    return this.login();
  }
  
  roleSetter.call(this, 'noAuth', false);
}
