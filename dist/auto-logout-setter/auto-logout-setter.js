import autoLogoutHandler from './_lib/auto-logout-handler';
export default function (operation) {
    var methodName = operation + 'EventListener';
    var eventNames = ['click', 'keyup', 'mousemove'];
    eventNames.forEach(function (eventName) {
        document[methodName](eventName, autoLogoutHandler);
    });
    if (operation === 'add') {
        document.dispatchEvent(new Event(eventNames[0]));
    }
};
//# sourceMappingURL=auto-logout-setter.js.map