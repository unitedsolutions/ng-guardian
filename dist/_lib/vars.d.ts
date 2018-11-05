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
    logoutTimeout: number;
    logoutRedirctEnabled: boolean;
    gettingSettingsFromServer: boolean;
    serverSettngs: {
        sessionTimeout: any;
    };
    loginUrl: string;
    logoutUrl: string;
};
export { configs, roles };
