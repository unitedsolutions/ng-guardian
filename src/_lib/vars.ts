const roles = {
  auth: {routes: [], _default: null},
  noAuth: {routes: [], _default: null},
  all: {routes: [], _default: null}
};

const configs = {
  timeout: null,
  guardian: null,
  logoutTimeout: null
};

export {
  configs,
  roles
};
