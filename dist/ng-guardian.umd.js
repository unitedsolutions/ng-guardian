(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('@angular/core'), require('ng-http-client-plus'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', '@angular/core', 'ng-http-client-plus', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
	(factory((global.ngGuardian = {}),global._,global.ng.core,global.ngHttpClientPlus,global.ng.router,global.Rx,global.operators));
}(this, (function (exports,_,core,ngHttpClientPlus,router,rxjs,operators) { 'use strict';

var Guardian = /** @class */ (function () {
    function Guardian(http, router$$1) {
        this.http = http;
        this.router = router$$1;
        this.history = [];
        this.linksPublisher = new rxjs.BehaviorSubject(null);
        this.sessionStatus = new rxjs.BehaviorSubject('');
        this.navLinks = new rxjs.BehaviorSubject(null);
    }
    Guardian.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Guardian.ctorParameters = function () { return [
        { type: ngHttpClientPlus.HttpClientPlus, },
        { type: router.Router, },
    ]; };
    return Guardian;
}());
var NavItem = /** @class */ (function () {
    function NavItem(parent, label, path) {
        this.parent = parent ? parent : 'undefined';
        this.path = path ? path : '';
        this.label = label ? label : path;
    }
    return NavItem;
}());

var roles = {
    auth: { routes: [], _default: null },
    noAuth: { routes: [], _default: null },
    all: { routes: [], _default: null }
};
var configs = {
    timeout: null,
    guardian: null,
    logoutTimeout: 15,
    logoutRedirctEnabled: true,
    gettingSettingsFromServer: false,
    serverSettngs: // can be filled up with server configuration (if existing)
    {
        sessionTimeout: null,
    },
    loginUrl: '',
    logoutUrl: '',
    lockDownEnabled: false,
    lockDown: null,
    lockDownWait: 5,
    unlockUrl: '',
};

function routesFilterer(routes, approvedRoutes, role, paths, newRoutes) {
    if (paths === void 0) { paths = []; }
    if (newRoutes === void 0) { newRoutes = []; }
    _.each(approvedRoutes, function (approvedRoute) {
        var path = approvedRoute.path, children = approvedRoute.children, _default = approvedRoute.default;
        var route = _.filter(routes, { path: path })[0];
        if (route) {
            var newRoute = _.omit(route, ['children']);
            if (_default) {
                _default = [''].concat(paths, path).join('/');
                _.extend(role, { _default: _default });
            }
            if (children) {
                paths = paths.concat(path);
                newRoute.children = routesFilterer(route.children, children, role, paths);
                paths = [];
            }
            newRoutes.push(newRoute);
        }
    });
    return newRoutes;
}

function linksGenerator(routes, paths, links) {
    if (paths === void 0) { paths = []; }
    if (links === void 0) { links = []; }
    _.each(routes, function (route) {
        var path = route.path, link = route.link, label = route.label, linkLabel = route.linkLabel, children = route.children;
        var childrenLinks = linksGenerator(children, paths.concat(path));
        if (link) {
            if (!linkLabel) {
                linkLabel = label || path;
            }
            path = [''].concat(paths, path).join('/');
            var linkRecordProperties = _.omit(route, ['path', 'component']);
            var linkRecord = _.extend({ label: linkLabel, path: path }, linkRecordProperties);
            if (!_.isEmpty(childrenLinks)) {
                _.extend(linkRecord, { children: childrenLinks });
            }
            links.push(linkRecord);
        }
        else {
            links.push.apply(links, childrenLinks);
        }
    });
    return links;
}

var roleSetter = function (roleName, navigate, approvedRoutes) {
    if (navigate === void 0) { navigate = true; }
    var role = roles[roleName];
    var _a = roles.all, allRoutes = _a.routes, allDefault = _a._default;
    var _b = this, linksPublisher = _b.linksPublisher, navLinks = _b.navLinks, router$$1 = _b.router, redirectUrl = _b.redirectUrl;
    var routes = role.routes, _default = role._default;
    if (approvedRoutes) {
        var _defaultHolder = { _default: '' };
        routes = routesFilterer(routes, approvedRoutes, _defaultHolder);
        (_default = _defaultHolder._default);
    }
    if (!_default) {
        _default = allDefault;
    }
    if (!_default) {
        throw new Error('each role should have a default route');
    }
    _.extend(this, { status: roleName, defaultUrl: _default });
    if (!_.filter(routes, { path: '' }).length) {
        routes.push.apply(routes, allRoutes);
        routes.push({ path: '', pathMatch: 'full', redirectTo: _default });
        routes.push({ path: '**', redirectTo: _default });
    }
    var links = linksGenerator(routes);
    linksPublisher.next({ role: roleName, links: links });
    // Generate navLinks
    var authValidRoutes = [];
    links.forEach(function (element) {
        if (element.children) {
            element.children.forEach(function (route) {
                if (route.link) {
                    var path = route.path.length > 0 ? route.path : element.path;
                    authValidRoutes.push(new NavItem(route.group, route.label, path));
                }
            });
        }
        else {
            if (element.link) {
                authValidRoutes.push(new NavItem(element.group, element.label, element.path));
            }
        }
    });
    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    var navLinksData = groupBy(authValidRoutes, 'parent');
    navLinks.next(navLinksData);
    router$$1.resetConfig(routes);
    if (navigate) {
        delete this.redirectUrl;
        router$$1.navigate([redirectUrl || _default], { replaceUrl: true });
    }
};

function childrenGetter(paths, children) {
    var path = paths.shift();
    if (!path) {
        return children;
    }
    var route = _.filter(children, { path: path })[0];
    childrenGetter(paths, route.children);
}

var routeSterilizer = (function (route, roleName) {
    route = _.omit(route, ['children']);
    return _.extend(route, { children: [], role: roleName });
});

function routeGetter(paths, roleRoute, mainRoute, roleName) {
    var path = paths.shift();
    if (!path) {
        return roleRoute;
    }
    var _a = [roleRoute, mainRoute].map(function (route) {
        return _.filter(route.children, { path: path })[0];
    }), roleChild = _a[0], mainChild = _a[1];
    if (!roleChild) {
        roleChild = routeSterilizer(mainChild, roleName);
        roleRoute.children.push(roleChild);
    }
    return routeGetter(paths, roleChild, mainChild, roleName);
}

function routeToRoleLinker(route, mainRoute, parentRoute, paths) {
    if (paths === void 0) { paths = []; }
    var routeRoleName = route.role, path = route.path, _default = route.default;
    var parentRoleName = (parentRoute || { role: null }).role;
    var children = route.children;
    var childlessRoute = _.omit(route, ['children']);
    if (!routeRoleName) {
        routeRoleName = parentRoleName || 'all';
    }
    if (_default) {
        roles[routeRoleName]._default = [''].concat(paths, path).join('/');
    }
    if (!parentRoleName) {
        roles[routeRoleName].routes.push(childlessRoute);
    }
    else {
        if (routeRoleName !== parentRoleName) {
            var rootRoleName = paths.shift();
            var routes = roles[routeRoleName].routes;
            var roleRoute = _.filter(routes, { path: rootRoleName })[0];
            if (!roleRoute) {
                roleRoute = routeSterilizer(mainRoute, routeRoleName);
                routes.push(roleRoute);
            }
            roleRoute = routeGetter(paths.slice(), roleRoute, mainRoute, routeRoleName);
            roleRoute.children.push(childlessRoute);
            var children_1 = childrenGetter(paths, mainRoute.children);
            var emptyMainRoute = _.filter(children_1, { path: '' })[0];
            var emptyRoleRoute = _.filter(roleRoute.children, { path: '' })[0];
            if (emptyMainRoute && !emptyRoleRoute) {
                roleRoute.children.unshift({ path: '', redirectTo: path, pathMatch: 'full' });
            }
        }
        else {
            var _a = parentRoute.children, children_2 = _a === void 0 ? [] : _a;
            if (_.isEmpty(children_2)) {
                _.extend(parentRoute, { children: children_2 });
            }
            children_2.push(childlessRoute);
        }
    }
    _.each(children, function (child) {
        var _a = child.role, role = _a === void 0 ? routeRoleName || parentRoleName : _a;
        _.extend(child, { role: role });
        routeToRoleLinker(child, mainRoute || route, childlessRoute, paths.concat(path));
    });
}

var rolesAssembler = (function (guardian) {
    _.each(guardian.router.config, function (route) { return routeToRoleLinker(route); });
});

var redirectCapturer = (function (guardian) {
    var pathname = location.pathname;
    if (pathname !== '/') {
        guardian.redirectUrl = pathname;
    }
});

var historian = function () {
    var _this = this;
    this.router.events.pipe(operators.filter(function (evt) { return evt instanceof router.NavigationEnd; })).subscribe(function (evt) {
        _this.history.unshift(evt.url);
        _this.history.splice(10);
    });
};

var init = function (configs$$1) {
    _.extend(this, { configs: configs$$1 });
    _.extend(configs, configs$$1, { guardian: this });
    rolesAssembler(this);
    redirectCapturer(this);
    historian.call(this);
    if (this.http.getToken()) {
        return this.login();
    }
    roleSetter.call(this, 'noAuth', false);
};

var autoLogoutHandler = _.debounce(function () {
    clearTimeout(configs.timeout);
    configs.timeout = setTimeout(function () {
        configs.guardian.logout('TIMEOUT');
    }, configs.logoutTimeout * 60000);
}, 500);

var autoLogoutSetter = (function (operation) {
    var methodName = operation + 'EventListener';
    var eventNames = ['click', 'keyup', 'mousemove'];
    eventNames.forEach(function (eventName) {
        document[methodName](eventName, autoLogoutHandler);
    });
    if (operation === 'add') {
        document.dispatchEvent(new Event(eventNames[0]));
    }
});

var autoLogoutHandler$1 = _.debounce(function () {
    clearTimeout(configs.lockDown);
    configs.lockDown = setTimeout(function () {
        if (configs.guardian.sessionStatus.value !== 'LOGGED_IN' ||
            configs.guardian.sessionStatus.value !== 'LOCKED_DOWN') {
            configs.guardian.sessionStatus.next('LOCKED_DOWN');
        }
    }, configs.lockDownWait * 60000);
}, 500);

var autoLockSetter = (function (operation) {
    if (configs.lockDownEnabled == true) {
        var methodName_1 = operation + 'EventListener';
        var eventNames = ['click', 'keyup', 'mousemove'];
        eventNames.forEach(function (eventName) {
            document[methodName_1](eventName, autoLogoutHandler$1);
        });
        if (operation === 'add') {
            document.dispatchEvent(new Event(eventNames[0]));
        }
    }
});

var login = function (credentials) {
    var _this = this;
    if (configs.gettingSettingsFromServer === true) {
        if (configs.serverSettngs && credentials) {
            credentials['serverSettngs'] = configs.serverSettngs;
        }
    }
    return new Promise(function (resolve, reject) {
        _this.http.post(configs.loginUrl, credentials).subscribe(function (data) {
            var fields = ["routes", "token", "responseData"];
            var _a = _.pick(data, fields), routes = _a.routes, token = _a.token, responseData = _a.responseData;
            // authentification status
            _this.auth = responseData.auth;
            if (responseData.auth) {
                _this.sessionStatus.next(responseData.auth.auth === true ? 'LOGGED_IN' : 'NO_AUTH');
            }
            else {
                _this.sessionStatus.next('NO_AUTH');
            }
            // server settings
            if (configs.gettingSettingsFromServer === true) {
                if (responseData && responseData.settings) {
                    autoLogoutSetter('remove');
                    configs.serverSettngs.sessionTimeout = responseData.settings.sessionTimeout;
                    configs.logoutTimeout = responseData.settings.sessionTimeout;
                }
            }
            _this.http.setToken(token);
            data = _.omit(data, fields);
            _this.data = data;
            roleSetter.call(_this, "auth", true, routes);
            autoLogoutSetter("add");
            autoLockSetter("add");
            resolve({ auth: (responseData.auth ? responseData.auth : 'ok'), data: data });
        }, function (err) {
            reject(err);
        });
    });
};

var logout = function (logoutCode) {
    var _this = this;
    if (this.sessionStatus.value !== 'LOGGED_IN'
        && this.sessionStatus.value !== 'LOCKED_DOWN') {
        return; // doing nothing
    }
    return new Promise(function (resolve, reject) {
        if ((!logoutCode) || (logoutCode.length === 0)) {
            logoutCode = 'USER_LOGOUT';
        }
        _this.http.post(_this.configs.logoutUrl, { logoutCode: logoutCode }).subscribe(function (data) {
            if (data) {
                _this.auth = data.auth;
                var returnLogoutCode = ((data.auth) && (data.auth.code)) ? data.auth.code : 'LOGOUT';
                if (returnLogoutCode !== logoutCode) {
                    _this.sessionStatus.next(returnLogoutCode);
                }
                _.extend(_this, { data: data });
                resolve(data);
            }
        }, function (err) {
            _this.sessionStatus.next('LOGOUT_WITH_ERROR');
            return reject(err);
        });
        _this.sessionStatus.next(logoutCode);
        autoLogoutSetter('remove');
        autoLockSetter('remove');
        roleSetter.call(_this, 'noAuth', configs.logoutRedirctEnabled);
        _this.http.removeToken();
    });
};

var unlock = function (credentials) {
    var _this = this;
    if (configs.gettingSettingsFromServer === true) {
        if (configs.serverSettngs) {
            credentials['serverSettngs'] = configs.serverSettngs;
        }
    }
    return new Promise(function (resolve, reject) {
        if (configs.lockDownEnabled === false) {
            return resolve({ message: 'lockDown functionality is dissabled (configs.lockDownEnabled = false)' });
        }
        if (configs.unlockUrl === null || configs.unlockUrl.length < 1) {
            return resolve({ message: 'configs.unlockUrl is not defined,' });
        }
        _this.http.post(configs.unlockUrl, credentials).subscribe(function (data) {
            _this.sessionStatus.next('LOGGED_IN');
            // reset lockDown
            autoLockSetter("remove");
            configs.lockDown = null;
            autoLockSetter("add");
            if (data) {
                return resolve(data);
            }
            else {
                return resolve({ ok: 1 });
            }
        }, function (err) {
            reject(err);
        });
    });
};

var links = function () {
    return this.linksPublisher.asObservable();
};

var routes = function (roleName) {
    return roles[roleName].routes;
};

_.extend(Guardian.prototype, {
    init: init,
    login: login,
    logout: logout,
    unlock: unlock,
    links: links,
    routes: routes
});
var GuardianModule = /** @class */ (function () {
    function GuardianModule() {
    }
    GuardianModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ngHttpClientPlus.HttpClientPlusModule],
                    providers: [Guardian]
                },] },
    ];
    /** @nocollapse */
    GuardianModule.ctorParameters = function () { return []; };
    return GuardianModule;
}());

exports.Guardian = Guardian;
exports.GuardianModule = GuardianModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
