const roles = {
  auth: {routes: [], _default: null},
  noAuth: {routes: [], _default: null},
  all: {routes: [], _default: null}
};

const configs = {
  timeout: null,
  guardian: null,
  logoutTimeout: 15,
  logoutRedirctEnabled: true,
  gettingSettingsFromServer: false,
  serverSettngs:  // can be filled up with server configuration (if existing)
  {
    sessionTimeout: null,
  },
  loginUrl:'',
  logoutUrl:'',

  lockDownEnabled: false,
  lockDown: null,
  lockDownWait: 5,
  unlockUrl:'',
};

export {
  configs,
  roles
};
