import autoLogoutHandler from './_lib/auto-lock-handler';
import { configs } from '../_lib/vars';
export default function (operation) {
    if (configs.lockDownEnabled == true) {
        var methodName_1 = operation + 'EventListener';
        var eventNames = ['click', 'keyup', 'mousemove'];
        eventNames.forEach(function (eventName) {
            document[methodName_1](eventName, autoLogoutHandler);
        });
        if (operation === 'add') {
            document.dispatchEvent(new Event(eventNames[0]));
        }
    }
};
//# sourceMappingURL=auto-lock-setter.js.map