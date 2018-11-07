import * as _    from 'lodash';
import {configs} from '../../_lib/vars';

export default _.debounce(() => {
  clearTimeout(configs.lockDown);
  configs.lockDown = setTimeout(() => {
    if (configs.guardian.sessionStatus.value  !== 'LOGGED_IN' || 
        configs.guardian.sessionStatus.value  !== 'LOCKED_DOWN' ) {
      configs.guardian.sessionStatus.next('LOCKED_DOWN');
    }
  }, configs.lockDownWait * 60000);
}, 500);
