import autoLogoutHandler from './_lib/auto-logout-handler';

export default operation => {
  let methodName = operation + 'EventListener';
  let eventNames = ['click', 'keyup', 'mousemove'];
  eventNames.forEach(eventName => {
    document[methodName](eventName, autoLogoutHandler);
  });
  
  if(operation === 'add') {
    document.dispatchEvent(new Event(eventNames[0]));
  }
};
