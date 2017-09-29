import * as _    from 'lodash';
import {configs} from '../../_lib/vars';

export default _.debounce(() => {
  clearTimeout(configs.timeout);
  configs.timeout = setTimeout(() => {
    configs.guardian.logout();
  }, configs.logoutTimeout * 60000);
}, 500);
