import autoLogoutHandler from './_lib/auto-lock-handler';
import { configs } from '../_lib/vars';

export default operation => {
  if (configs.lockDownEnabled == true) {
    let methodName = operation + 'EventListener';
    let eventNames = ['click', 'keyup', 'mousemove'];
    eventNames.forEach(eventName => {
      document[methodName](eventName, autoLogoutHandler);
    });
    
    if(operation === 'add') {
      document.dispatchEvent(new Event(eventNames[0]));
    }
  }
};
