import * as _ from 'lodash';
import { configs as _configs } from '../_lib/vars';
import roleSetter from '../role-setter/role-setter';
import rolesAssembler from './roles-assembler/roles-assembler';
import redirectCapturer from './redirect-capturer/redirect-capturer';
export default function (configs) {
    _.extend(this, { configs: configs });
    _.extend(_configs, configs, { guardian: this });
    rolesAssembler(this);
    redirectCapturer(this);
    if (this.http.getToken()) {
        return this.login();
    }
    roleSetter.call(this, 'noAuth', false);
}
//# sourceMappingURL=initializer.js.map