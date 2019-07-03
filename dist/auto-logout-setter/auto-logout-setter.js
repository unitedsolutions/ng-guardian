import autoLogoutHandler from './_lib/auto-logout-handler';
export default (function (operation) {
    var methodName = operation + 'EventListener';
    var eventNames = ['click', 'keyup', 'mousemove'];
    eventNames.forEach(function (eventName) {
        document[methodName](eventName, autoLogoutHandler);
    });
    if (operation === 'add') {
        var event;
        if (typeof (Event) === 'function') {
            event = new Event(eventNames[0]);
        }
        else {
            event = document.createEvent('Event');
            event.initEvent(eventNames[0], true, true);
        }
        document.dispatchEvent(event);
    }
});
//# sourceMappingURL=auto-logout-setter.js.map