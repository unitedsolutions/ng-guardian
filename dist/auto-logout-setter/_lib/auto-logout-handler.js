import * as _ from 'lodash';
import { configs } from '../../_lib/vars';
export default _.debounce(function () {
    clearTimeout(configs.timeout);
    configs.timeout = setTimeout(function () {
        configs.guardian.logout();
    }, configs.logoutTimeout * 60000);
}, 500);
//# sourceMappingURL=auto-logout-handler.js.map