declare const roles: {
    auth: {
        routes: any[];
        _default: any;
    };
    noAuth: {
        routes: any[];
        _default: any;
    };
    all: {
        routes: any[];
        _default: any;
    };
};
declare const configs: {
    timeout: any;
    guardian: any;
    logoutTimeout: any;
};
export { configs, roles };
