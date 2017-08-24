(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("ng-http-client-plus"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "ng-http-client-plus", "@angular/core", "rxjs", "@angular/router"], factory);
	else if(typeof exports === 'object')
		exports["ngGuardian"] = factory(require("lodash"), require("ng-http-client-plus"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else
		root["ngGuardian"] = factory(root["_"], root["ngHttpClientPlus"], root["ng"]["core"], root["Rx"], root["ng"]["router"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return configs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return roles; });
var roles = {
    auth: { routes: [], _default: null },
    noAuth: { routes: [], _default: null },
    all: { routes: [], _default: null }
};
var configs = {
    timeout: null,
    guardian: null,
    logoutTimeout: null
};



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_filterer_routes_filterer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__links_generator_links_generator__ = __webpack_require__(18);




/* harmony default export */ __webpack_exports__["a"] = function (roleName, navigate, approvedRoutes) {
    if (navigate === void 0) { navigate = true; }
    var role = __WEBPACK_IMPORTED_MODULE_1__lib_vars__["a" /* roles */][roleName];
    var _a = __WEBPACK_IMPORTED_MODULE_1__lib_vars__["a" /* roles */].all, allRoutes = _a.routes, allDefault = _a._default;
    var _b = this, linksPublisher = _b.linksPublisher, router = _b.router, redirectUrl = _b.redirectUrl;
    var routes = role.routes, _default = role._default;
    if (approvedRoutes) {
        var _defaultHolder = { _default: '' };
        routes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__routes_filterer_routes_filterer__["a" /* default */])(routes, approvedRoutes, _defaultHolder);
        (_default = _defaultHolder._default);
    }
    if (!_default) {
        _default = allDefault;
    }
    if (!_default) {
        throw new Error('each role should have a default route');
    }
    __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](this, { status: roleName, defaultUrl: _default });
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](routes, { path: '' }).length) {
        routes.push.apply(routes, allRoutes);
        routes.push({ path: '', pathMatch: 'full', redirectTo: _default });
        routes.push({ path: '**', redirectTo: _default });
    }
    linksPublisher.next({ role: roleName, links: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__links_generator_links_generator__["a" /* default */])(routes) });
    router.resetConfig(routes);
    if (navigate) {
        delete this.redirectUrl;
        router.navigate([redirectUrl || _default], { replaceUrl: true });
    }
};
;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_auto_logout_handler__ = __webpack_require__(13);

/* harmony default export */ __webpack_exports__["a"] = function (operation) {
    var methodName = operation + 'EventListener';
    var eventNames = ['click', 'keyup', 'mousemove'];
    eventNames.forEach(function (eventName) {
        document[methodName](eventName, __WEBPACK_IMPORTED_MODULE_0__lib_auto_logout_handler__["a" /* default */]);
    });
    if (operation === 'add') {
        document.dispatchEvent(new Event(eventNames[0]));
    }
};;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

/* harmony default export */ __webpack_exports__["a"] = function (route, roleName) {
    route = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](route, ['children']);
    return __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](route, { children: [], role: roleName });
};;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Guardian; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Guardian = (function () {
    function Guardian(http, router) {
        this.http = http;
        this.router = router;
        this.linksPublisher = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["BehaviorSubject"]([]);
    }
    Guardian = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus__["HttpClientPlus"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], Guardian);
    return Guardian;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__roles_assembler_roles_assembler__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__redirect_capturer_redirect_capturer__ = __webpack_require__(14);





/* harmony default export */ __webpack_exports__["a"] = function (configs) {
    __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](this, { configs: configs });
    __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](__WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */], configs, { guardian: this });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__roles_assembler_roles_assembler__["a" /* default */])(this);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__redirect_capturer_redirect_capturer__["a" /* default */])(this);
    if (this.http.getToken()) {
        return this.login();
    }
    __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__["a" /* default */].call(this, 'noAuth', false);
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function () {
    return this.linksPublisher.asObservable();
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auto_logout_setter_auto_logout_setter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = function (credentials) {
    var _this = this;
    this.http.post(this.configs.loginRoute, credentials).subscribe(function (data) {
        var fields = ['routes', 'token'];
        var _a = __WEBPACK_IMPORTED_MODULE_0_lodash__["pick"](data, fields), routes = _a.routes, token = _a.token;
        _this.http.setToken(token);
        data = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](data, fields);
        __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](_this, { data: data });
        __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__["a" /* default */].call(_this, 'auth', true, routes);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__auto_logout_setter_auto_logout_setter__["a" /* default */])('add');
    });
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auto_logout_setter_auto_logout_setter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__role_setter_role_setter__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__auto_logout_setter_auto_logout_setter__["a" /* default */])('remove');
    __WEBPACK_IMPORTED_MODULE_1__role_setter_role_setter__["a" /* default */].call(this, 'noAuth');
    this.http.removeToken();
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_vars__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = function (roleName) {
    return __WEBPACK_IMPORTED_MODULE_0__lib_vars__["a" /* roles */][roleName];
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_0_lodash__["debounce"](function () {
    clearTimeout(__WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].timeout);
    __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].timeout = setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].guardian.logout();
    }, __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].logoutTimeout * 60000);
}, 500);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (guardian) {
    var pathname = location.pathname;
    if (pathname !== '/') {
        guardian.redirectUrl = pathname;
    }
};;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_to_role_linker_route_to_role_linker__ = __webpack_require__(17);


/* harmony default export */ __webpack_exports__["a"] = function (guardian) {
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](guardian.router.config, function (route) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__route_to_role_linker_route_to_role_linker__["a" /* default */])(route); });
};;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_sterilizer__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = routeGetter;


function routeGetter(paths, roleRoute, mainRoute, roleName) {
    var path = paths.shift();
    if (!path) {
        return roleRoute;
    }
    var _a = [roleRoute, mainRoute].map(function (route) {
        return __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](route.children, { path: path })[0];
    }), roleChild = _a[0], mainChild = _a[1];
    if (!roleChild) {
        roleChild = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__route_sterilizer__["a" /* default */])(mainChild, roleName);
        roleRoute.children.push(roleChild);
    }
    return routeGetter(paths, roleChild, mainChild, roleName);
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route_getter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_route_sterilizer__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = routeToRoleLinker;




function routeToRoleLinker(route, mainRoute, parentRoute, paths) {
    if (paths === void 0) { paths = []; }
    var routeRoleName = route.role, path = route.path, _default = route.default;
    var parentRoleName = (parentRoute || { role: null }).role;
    var children = route.children;
    var childlessRoute = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](route, ['children']);
    if (_default) {
        __WEBPACK_IMPORTED_MODULE_1__lib_vars__["a" /* roles */][routeRoleName]._default = [''].concat(paths, path).join('/');
    }
    if (!routeRoleName && !parentRoleName) {
        routeRoleName = 'all';
    }
    if (!parentRoleName) {
        __WEBPACK_IMPORTED_MODULE_1__lib_vars__["a" /* roles */][routeRoleName].routes.push(childlessRoute);
    }
    else {
        if (routeRoleName !== parentRoleName) {
            var rootRoleName = paths.shift();
            var routes = __WEBPACK_IMPORTED_MODULE_1__lib_vars__["a" /* roles */][routeRoleName].routes;
            var roleRoute = __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](routes, { path: rootRoleName })[0];
            if (!roleRoute) {
                roleRoute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_route_sterilizer__["a" /* default */])(mainRoute, routeRoleName);
                routes.push(roleRoute);
            }
            roleRoute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_route_getter__["a" /* default */])(paths, roleRoute, mainRoute, routeRoleName);
            roleRoute.children.push(childlessRoute);
        }
        else {
            var _a = parentRoute.children, children_1 = _a === void 0 ? [] : _a;
            if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](children_1)) {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](parentRoute, { children: children_1 });
            }
            children_1.push(childlessRoute);
        }
    }
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](children, function (child) {
        var _a = child.role, role = _a === void 0 ? routeRoleName || parentRoleName : _a;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](child, { role: role });
        routeToRoleLinker(child, mainRoute || route, childlessRoute, paths.concat(path));
    });
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (immutable) */ __webpack_exports__["a"] = linksGenerator;

function linksGenerator(routes, paths, links) {
    if (paths === void 0) { paths = []; }
    if (links === void 0) { links = []; }
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](routes, function (route) {
        var path = route.path, link = route.link, label = route.label, linkLabel = route.linkLabel, children = route.children;
        var childrenLinks = linksGenerator(children, paths.concat(path));
        if (link) {
            if (!linkLabel) {
                linkLabel = label || path;
            }
            path = [''].concat(paths, path).join('/');
            var linkRecordProperties = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](route, ['path', 'component']);
            var linkRecord = __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"]({ label: linkLabel, path: path }, linkRecordProperties);
            if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](childrenLinks)) {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](linkRecord, { children: childrenLinks });
            }
            links.push(linkRecord);
        }
        else {
            links.push.apply(links, childrenLinks);
        }
    });
    return links;
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (immutable) */ __webpack_exports__["a"] = routesFilterer;

function routesFilterer(routes, approvedRoutes, role, paths, newRoutes) {
    if (paths === void 0) { paths = []; }
    if (newRoutes === void 0) { newRoutes = []; }
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](approvedRoutes, function (approvedRoute) {
        var path = approvedRoute.path, children = approvedRoute.children, _default = approvedRoute.default;
        var route = __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](routes, { path: path })[0];
        if (route) {
            var newRoute = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](route, ['children']);
            if (_default) {
                _default = [''].concat(paths, path).join('/');
                __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](role, { _default: _default });
            }
            if (children) {
                paths = paths.concat(path);
                newRoute.children = routesFilterer(route.children, children, role, paths);
            }
            newRoutes.push(newRoute);
        }
    });
    return newRoutes;
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constructor_constructor__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initializer_initializer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_processor_login_processor__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logout_processor_logout_processor__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__links_getter_links_getter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__role_getter_role_getter__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Guardian", function() { return __WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuardianModule", function() { return GuardianModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









__WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* Guardian */].prototype, {
    init: __WEBPACK_IMPORTED_MODULE_4__initializer_initializer__["a" /* default */],
    login: __WEBPACK_IMPORTED_MODULE_5__login_processor_login_processor__["a" /* default */],
    logout: __WEBPACK_IMPORTED_MODULE_6__logout_processor_logout_processor__["a" /* default */],
    links: __WEBPACK_IMPORTED_MODULE_7__links_getter_links_getter__["a" /* default */],
    role: __WEBPACK_IMPORTED_MODULE_8__role_getter_role_getter__["a" /* default */]
});
var GuardianModule = (function () {
    function GuardianModule() {
    }
    GuardianModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus__["HttpClientPlusModule"]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* Guardian */]]
        })
    ], GuardianModule);
    return GuardianModule;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNjc2YTViZmVlNzJjNmRkMTdkNCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9fbGliL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJuZ0h0dHBDbGllbnRQbHVzXCIsXCJjb21tb25qc1wiOlwibmctaHR0cC1jbGllbnQtcGx1c1wiLFwiY29tbW9uanMyXCI6XCJuZy1odHRwLWNsaWVudC1wbHVzXCIsXCJhbWRcIjpcIm5nLWh0dHAtY2xpZW50LXBsdXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpbXCJuZ1wiLFwiY29yZVwiXSxcImNvbW1vbmpzXCI6XCJAYW5ndWxhci9jb3JlXCIsXCJjb21tb25qczJcIjpcIkBhbmd1bGFyL2NvcmVcIixcImFtZFwiOlwiQGFuZ3VsYXIvY29yZVwifSIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL2F1dG8tbG9nb3V0LXNldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL19saWIvcm91dGUtc3RlcmlsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9pbml0aWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlua3MtZ2V0dGVyL2xpbmtzLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4tcHJvY2Vzc29yL2xvZ2luLXByb2Nlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LXByb2Nlc3Nvci9sb2dvdXQtcHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLWdldHRlci9yb2xlLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL19saWIvYXV0by1sb2dvdXQtaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcmVkaXJlY3QtY2FwdHVyZXIvcmVkaXJlY3QtY2FwdHVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb2xlcy1hc3NlbWJsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb3V0ZS10by1yb2xlLWxpbmtlci9fbGliL3JvdXRlLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLXNldHRlci9saW5rcy1nZW5lcmF0b3IvbGlua3MtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLXNldHRlci9yb3V0ZXMtZmlsdGVyZXIvcm91dGVzLWZpbHRlcmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSeFwiLFwiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6W1wibmdcIixcInJvdXRlclwiXSxcImNvbW1vbmpzXCI6XCJAYW5ndWxhci9yb3V0ZXJcIixcImNvbW1vbmpzMlwiOlwiQGFuZ3VsYXIvcm91dGVyXCIsXCJhbWRcIjpcIkBhbmd1bGFyL3JvdXRlclwifSIsIndlYnBhY2s6Ly8vLi9zcmMvbmctZ3VhcmRpYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLCtDOzs7Ozs7OztBQ0FBO0FBQUEsSUFBTSxLQUFLLEdBQUc7SUFDWixJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7SUFDbEMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO0lBQ3BDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztDQUNsQyxDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQUc7SUFDZCxPQUFPLEVBQUUsSUFBSTtJQUNiLFFBQVEsRUFBRSxJQUFJO0lBQ2QsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQztBQUtBOzs7Ozs7Ozs7Ozs7O0FDZmtDO0FBQ007QUFDcUI7QUFDQTtBQUUvRCx3REFBYyxVQUFVLFFBQVEsRUFBRSxRQUFlLEVBQUUsY0FBZTtJQUFoQywwQ0FBZTtJ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QztBQU1IO0lBQUE7SUFBc0IsQ0FBQztJQUFqQixjQUFjO1FBSm5CLDhFQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyx5RUFBb0IsQ0FBQztZQUMvQixTQUFTLEVBQUUsQ0FBQywwRUFBUSxDQUFDO1NBQ3RCLENBQUM7T0FDSSxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBO0FBS3JCIiwiZmlsZSI6Im5nLWd1YXJkaWFuLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIm5nLWh0dHAtY2xpZW50LXBsdXNcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwicnhqc1wiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJsb2Rhc2hcIiwgXCJuZy1odHRwLWNsaWVudC1wbHVzXCIsIFwiQGFuZ3VsYXIvY29yZVwiLCBcInJ4anNcIiwgXCJAYW5ndWxhci9yb3V0ZXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmdHdWFyZGlhblwiXSA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIm5nLWh0dHAtY2xpZW50LXBsdXNcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwicnhqc1wiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdHdWFyZGlhblwiXSA9IGZhY3Rvcnkocm9vdFtcIl9cIl0sIHJvb3RbXCJuZ0h0dHBDbGllbnRQbHVzXCJdLCByb290W1wibmdcIl1bXCJjb3JlXCJdLCByb290W1wiUnhcIl0sIHJvb3RbXCJuZ1wiXVtcInJvdXRlclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzIwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMjFfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ2NzZhNWJmZWU3MmM2ZGQxN2Q0IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwiLFwiYW1kXCI6XCJsb2Rhc2hcIn1cbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3Qgcm9sZXMgPSB7XG4gIGF1dGg6IHtyb3V0ZXM6IFtdLCBfZGVmYXVsdDogbnVsbH0sXG4gIG5vQXV0aDoge3JvdXRlczogW10sIF9kZWZhdWx0OiBudWxsfSxcbiAgYWxsOiB7cm91dGVzOiBbXSwgX2RlZmF1bHQ6IG51bGx9XG59O1xuXG5jb25zdCBjb25maWdzID0ge1xuICB0aW1lb3V0OiBudWxsLFxuICBndWFyZGlhbjogbnVsbCxcbiAgbG9nb3V0VGltZW91dDogbnVsbFxufTtcblxuZXhwb3J0IHtcbiAgY29uZmlncyxcbiAgcm9sZXNcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvX2xpYi92YXJzLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge3JvbGVzfSAgICAgICAgZnJvbSAnLi4vX2xpYi92YXJzJztcbmltcG9ydCByb3V0ZXNGaWx0ZXJlciBmcm9tICcuL3JvdXRlcy1maWx0ZXJlci9yb3V0ZXMtZmlsdGVyZXInO1xuaW1wb3J0IGxpbmtzR2VuZXJhdG9yIGZyb20gJy4vbGlua3MtZ2VuZXJhdG9yL2xpbmtzLWdlbmVyYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJvbGVOYW1lLCBuYXZpZ2F0ZSA9IHRydWUsIGFwcHJvdmVkUm91dGVzPykge1xuICBsZXQgcm9sZSA9IHJvbGVzW3JvbGVOYW1lXTtcbiAgbGV0IHtyb3V0ZXM6IGFsbFJvdXRlcywgX2RlZmF1bHQ6IGFsbERlZmF1bHR9ID0gcm9sZXMuYWxsO1xuICBsZXQge2xpbmtzUHVibGlzaGVyLCByb3V0ZXIsIHJlZGlyZWN0VXJsfSA9IHRoaXM7XG4gIGxldCB7cm91dGVzLCBfZGVmYXVsdH0gPSByb2xlO1xuXG4gIGlmKGFwcHJvdmVkUm91dGVzKSB7XG4gICAgbGV0IF9kZWZhdWx0SG9sZGVyID0ge19kZWZhdWx0OiAnJ307XG4gICAgcm91dGVzID0gcm91dGVzRmlsdGVyZXIocm91dGVzLCBhcHByb3ZlZFJvdXRlcywgX2RlZmF1bHRIb2xkZXIpO1xuICAgICh7X2RlZmF1bHR9ID0gX2RlZmF1bHRIb2xkZXIpO1xuICB9XG4gIFxuICBpZighX2RlZmF1bHQpIHtcbiAgICBfZGVmYXVsdCA9IGFsbERlZmF1bHQ7XG4gIH1cbiAgXG4gIGlmKCFfZGVmYXVsdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZWFjaCByb2xlIHNob3VsZCBoYXZlIGEgZGVmYXVsdCByb3V0ZScpO1xuICB9XG4gIFxuICBfLmV4dGVuZCh0aGlzLCB7c3RhdHVzOiByb2xlTmFtZSwgZGVmYXVsdFVybDogX2RlZmF1bHR9KTtcblxuICBpZighXy5maWx0ZXIocm91dGVzLCB7cGF0aDogJyd9KS5sZW5ndGgpIHtcbiAgICByb3V0ZXMucHVzaCguLi5hbGxSb3V0ZXMpO1xuICAgIHJvdXRlcy5wdXNoKHtwYXRoOiAnJywgcGF0aE1hdGNoOiAnZnVsbCcsIHJlZGlyZWN0VG86IF9kZWZhdWx0fSk7XG4gICAgcm91dGVzLnB1c2goe3BhdGg6ICcqKicsIHJlZGlyZWN0VG86IF9kZWZhdWx0fSk7XG4gIH1cbiAgXG4gIGxpbmtzUHVibGlzaGVyLm5leHQoe3JvbGU6IHJvbGVOYW1lLCBsaW5rczogbGlua3NHZW5lcmF0b3Iocm91dGVzKX0pO1xuICByb3V0ZXIucmVzZXRDb25maWcocm91dGVzKTtcblxuICBpZihuYXZpZ2F0ZSkge1xuICAgIGRlbGV0ZSB0aGlzLnJlZGlyZWN0VXJsO1xuICAgIHJvdXRlci5uYXZpZ2F0ZShbcmVkaXJlY3RVcmwgfHwgX2RlZmF1bHRdLCB7cmVwbGFjZVVybDogdHJ1ZX0pO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyLnRzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJuZ0h0dHBDbGllbnRQbHVzXCIsXCJjb21tb25qc1wiOlwibmctaHR0cC1jbGllbnQtcGx1c1wiLFwiY29tbW9uanMyXCI6XCJuZy1odHRwLWNsaWVudC1wbHVzXCIsXCJhbWRcIjpcIm5nLWh0dHAtY2xpZW50LXBsdXNcIn1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6W1wibmdcIixcImNvcmVcIl0sXCJjb21tb25qc1wiOlwiQGFuZ3VsYXIvY29yZVwiLFwiY29tbW9uanMyXCI6XCJAYW5ndWxhci9jb3JlXCIsXCJhbWRcIjpcIkBhbmd1bGFyL2NvcmVcIn1cbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF1dG9Mb2dvdXRIYW5kbGVyIGZyb20gJy4vX2xpYi9hdXRvLWxvZ291dC1oYW5kbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgb3BlcmF0aW9uID0+IHtcbiAgbGV0IG1ldGhvZE5hbWUgPSBvcGVyYXRpb24gKyAnRXZlbnRMaXN0ZW5lcic7XG4gIGxldCBldmVudE5hbWVzID0gWydjbGljaycsICdrZXl1cCcsICdtb3VzZW1vdmUnXTtcbiAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgZG9jdW1lbnRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBhdXRvTG9nb3V0SGFuZGxlcik7XG4gIH0pO1xuICBcbiAgaWYob3BlcmF0aW9uID09PSAnYWRkJykge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50TmFtZXNbMF0pKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hdXRvLWxvZ291dC1zZXR0ZXIvYXV0by1sb2dvdXQtc2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCAocm91dGUsIHJvbGVOYW1lKSA9PiB7XG4gIHJvdXRlID0gXy5vbWl0KHJvdXRlLCBbJ2NoaWxkcmVuJ10pO1xuICByZXR1cm4gXy5leHRlbmQocm91dGUsIHtjaGlsZHJlbjogW10sIHJvbGU6IHJvbGVOYW1lfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb3V0ZS10by1yb2xlLWxpbmtlci9fbGliL3JvdXRlLXN0ZXJpbGl6ZXIudHMiLCJpbXBvcnQge0h0dHBDbGllbnRQbHVzfSAgZnJvbSAnbmctaHR0cC1jbGllbnQtcGx1cyc7XG5pbXBvcnQge1JvdXRlcn0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKSBcbmV4cG9ydCBjbGFzcyBHdWFyZGlhbiB7XG4gIGluaXQ7XG4gIGxvZ2luO1xuICBsb2dvdXQ7XG4gIGxpbmtzO1xuICByb2xlO1xuICBjb25maWdzO1xuICBkZWZhdWx0VXJsO1xuICByZWRpcmVjdFVybDtcbiAgbGlua3NQdWJsaXNoZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50UGx1cywgcHVibGljIHJvdXRlcjogUm91dGVyKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL19jb25zdHJ1Y3Rvci9jb25zdHJ1Y3Rvci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7Y29uZmlncyBhcyBfY29uZmlnc30gZnJvbSAnLi4vX2xpYi92YXJzJzsgICAgICAgICAgXG5pbXBvcnQgcm9sZVNldHRlciAgICAgICAgICAgIGZyb20gJy4uL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyJztcbmltcG9ydCByb2xlc0Fzc2VtYmxlciAgICAgICAgZnJvbSAnLi9yb2xlcy1hc3NlbWJsZXIvcm9sZXMtYXNzZW1ibGVyJztcbmltcG9ydCByZWRpcmVjdENhcHR1cmVyICAgICAgZnJvbSAnLi9yZWRpcmVjdC1jYXB0dXJlci9yZWRpcmVjdC1jYXB0dXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbmZpZ3MpIHtcbiAgXy5leHRlbmQodGhpcywge2NvbmZpZ3N9KTtcbiAgXy5leHRlbmQoX2NvbmZpZ3MsIGNvbmZpZ3MsIHtndWFyZGlhbjogdGhpc30pO1xuICByb2xlc0Fzc2VtYmxlcih0aGlzKTtcbiAgcmVkaXJlY3RDYXB0dXJlcih0aGlzKTtcblxuICBpZih0aGlzLmh0dHAuZ2V0VG9rZW4oKSkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luKCk7XG4gIH1cbiAgXG4gIHJvbGVTZXR0ZXIuY2FsbCh0aGlzLCAnbm9BdXRoJywgZmFsc2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luaXRpYWxpemVyL2luaXRpYWxpemVyLnRzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmxpbmtzUHVibGlzaGVyLmFzT2JzZXJ2YWJsZSgpOyAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGlua3MtZ2V0dGVyL2xpbmtzLWdldHRlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXV0b0xvZ291dFNldHRlciBmcm9tICcuLi9hdXRvLWxvZ291dC1zZXR0ZXIvYXV0by1sb2dvdXQtc2V0dGVyJztcbmltcG9ydCByb2xlU2V0dGVyICAgICAgIGZyb20gJy4uL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY3JlZGVudGlhbHMpIHtcbiAgdGhpcy5odHRwLnBvc3QodGhpcy5jb25maWdzLmxvZ2luUm91dGUsIGNyZWRlbnRpYWxzKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgbGV0IGZpZWxkcyA9IFsncm91dGVzJywgJ3Rva2VuJ107XG4gICAgbGV0IHtyb3V0ZXMsIHRva2VufSA9IF8ucGljayhkYXRhLCBmaWVsZHMpO1xuICAgIHRoaXMuaHR0cC5zZXRUb2tlbih0b2tlbik7XG4gICAgZGF0YSA9IF8ub21pdChkYXRhLCBmaWVsZHMpO1xuICAgIF8uZXh0ZW5kKHRoaXMsIHtkYXRhfSk7XG4gICAgcm9sZVNldHRlci5jYWxsKHRoaXMsICdhdXRoJywgdHJ1ZSwgcm91dGVzKTtcbiAgICBhdXRvTG9nb3V0U2V0dGVyKCdhZGQnKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9naW4tcHJvY2Vzc29yL2xvZ2luLXByb2Nlc3Nvci50cyIsImltcG9ydCBhdXRvTG9nb3V0U2V0dGVyIGZyb20gJy4uL2F1dG8tbG9nb3V0LXNldHRlci9hdXRvLWxvZ291dC1zZXR0ZXInO1xuaW1wb3J0IHJvbGVTZXR0ZXIgICAgICAgZnJvbSAnLi4vcm9sZS1zZXR0ZXIvcm9sZS1zZXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgYXV0b0xvZ291dFNldHRlcigncmVtb3ZlJyk7XG4gIHJvbGVTZXR0ZXIuY2FsbCh0aGlzLCAnbm9BdXRoJyk7XG4gIHRoaXMuaHR0cC5yZW1vdmVUb2tlbigpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xvZ291dC1wcm9jZXNzb3IvbG9nb3V0LXByb2Nlc3Nvci50cyIsImltcG9ydCB7cm9sZXN9IGZyb20gJy4uL19saWIvdmFycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJvbGVOYW1lKSB7XG4gIHJldHVybiByb2xlc1tyb2xlTmFtZV07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm9sZS1nZXR0ZXIvcm9sZS1nZXR0ZXIudHMiLCJpbXBvcnQgKiBhcyBfICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge2NvbmZpZ3N9IGZyb20gJy4uLy4uL19saWIvdmFycyc7XG5cbmV4cG9ydCBkZWZhdWx0IF8uZGVib3VuY2UoKCkgPT4ge1xuICBjbGVhclRpbWVvdXQoY29uZmlncy50aW1lb3V0KTtcbiAgY29uZmlncy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uZmlncy5ndWFyZGlhbi5sb2dvdXQoKTtcbiAgfSwgY29uZmlncy5sb2dvdXRUaW1lb3V0ICogNjAwMDApO1xufSwgNTAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hdXRvLWxvZ291dC1zZXR0ZXIvX2xpYi9hdXRvLWxvZ291dC1oYW5kbGVyLnRzIiwiZXhwb3J0IGRlZmF1bHQgZ3VhcmRpYW4gPT4ge1xuICBsZXQge3BhdGhuYW1lfSA9IGxvY2F0aW9uO1xuICBpZihwYXRobmFtZSAhPT0gJy8nKSB7XG4gICAgZ3VhcmRpYW4ucmVkaXJlY3RVcmwgPSBwYXRobmFtZTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbml0aWFsaXplci9yZWRpcmVjdC1jYXB0dXJlci9yZWRpcmVjdC1jYXB0dXJlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJvdXRlVG9Sb2xlTGlua2VyIGZyb20gJy4vcm91dGUtdG8tcm9sZS1saW5rZXIvcm91dGUtdG8tcm9sZS1saW5rZXInO1xuXG5leHBvcnQgZGVmYXVsdCBndWFyZGlhbiA9PiB7XG4gIF8uZWFjaChndWFyZGlhbi5yb3V0ZXIuY29uZmlnLCByb3V0ZSA9PiByb3V0ZVRvUm9sZUxpbmtlcihyb3V0ZSkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm9sZXMtYXNzZW1ibGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJvdXRlU3RlcmlsaXplciBmcm9tICcuL3JvdXRlLXN0ZXJpbGl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZUdldHRlcihwYXRocywgcm9sZVJvdXRlLCBtYWluUm91dGUsIHJvbGVOYW1lKSB7XG4gIGxldCBwYXRoID0gcGF0aHMuc2hpZnQoKTtcbiAgXG4gIGlmKCFwYXRoKSB7XG4gICAgcmV0dXJuIHJvbGVSb3V0ZTtcbiAgfVxuICBcbiAgbGV0IFtyb2xlQ2hpbGQsIG1haW5DaGlsZF0gPSBbcm9sZVJvdXRlLCBtYWluUm91dGVdLm1hcChyb3V0ZSA9PiB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKHJvdXRlLmNoaWxkcmVuLCB7cGF0aH0pWzBdO1xuICB9KTtcblxuICBpZighcm9sZUNoaWxkKSB7XG4gICAgcm9sZUNoaWxkID0gcm91dGVTdGVyaWxpemVyKG1haW5DaGlsZCwgcm9sZU5hbWUpO1xuICAgIHJvbGVSb3V0ZS5jaGlsZHJlbi5wdXNoKHJvbGVDaGlsZCk7XG4gIH1cbiAgXG4gIHJldHVybiByb3V0ZUdldHRlcihwYXRocywgcm9sZUNoaWxkLCBtYWluQ2hpbGQsIHJvbGVOYW1lKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm91dGUtdG8tcm9sZS1saW5rZXIvX2xpYi9yb3V0ZS1nZXR0ZXIudHMiLCJpbXBvcnQgKiBhcyBfICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge3JvbGVzfSAgICAgICAgIGZyb20gJy4uLy4uLy4uL19saWIvdmFycyc7XG5pbXBvcnQgcm91dGVHZXR0ZXIgICAgIGZyb20gJy4vX2xpYi9yb3V0ZS1nZXR0ZXInO1xuaW1wb3J0IHJvdXRlU3RlcmlsaXplciBmcm9tICcuL19saWIvcm91dGUtc3RlcmlsaXplcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlVG9Sb2xlTGlua2VyKHJvdXRlLCBtYWluUm91dGU/LCBwYXJlbnRSb3V0ZT8sIHBhdGhzID0gW10pIHtcbiAgbGV0IHtyb2xlOiByb3V0ZVJvbGVOYW1lLCBwYXRoLCBkZWZhdWx0OiBfZGVmYXVsdH0gPSByb3V0ZTtcbiAgbGV0IHtyb2xlOiBwYXJlbnRSb2xlTmFtZX0gPSBwYXJlbnRSb3V0ZSB8fCB7cm9sZTogbnVsbH07XG4gIGxldCB7Y2hpbGRyZW59ID0gcm91dGU7XG4gIGxldCBjaGlsZGxlc3NSb3V0ZSA9IF8ub21pdChyb3V0ZSwgWydjaGlsZHJlbiddKTtcblxuICBpZihfZGVmYXVsdCkge1xuICAgIHJvbGVzW3JvdXRlUm9sZU5hbWVdLl9kZWZhdWx0ID0gWycnXS5jb25jYXQocGF0aHMsIHBhdGgpLmpvaW4oJy8nKTtcbiAgfVxuXG4gIGlmKCFyb3V0ZVJvbGVOYW1lICYmICFwYXJlbnRSb2xlTmFtZSkge1xuICAgIHJvdXRlUm9sZU5hbWUgPSAnYWxsJztcbiAgfVxuXG4gIGlmKCFwYXJlbnRSb2xlTmFtZSkge1xuICAgIHJvbGVzW3JvdXRlUm9sZU5hbWVdLnJvdXRlcy5wdXNoKGNoaWxkbGVzc1JvdXRlKTtcbiAgfSBlbHNlIHtcbiAgICBpZihyb3V0ZVJvbGVOYW1lICE9PSBwYXJlbnRSb2xlTmFtZSkge1xuICAgICAgbGV0IHJvb3RSb2xlTmFtZSA9IHBhdGhzLnNoaWZ0KCk7XG4gICAgICBsZXQge3JvdXRlc30gPSByb2xlc1tyb3V0ZVJvbGVOYW1lXTtcbiAgICAgIGxldCByb2xlUm91dGUgPSBfLmZpbHRlcihyb3V0ZXMsIHtwYXRoOiByb290Um9sZU5hbWV9KVswXTtcblxuICAgICAgaWYoIXJvbGVSb3V0ZSkge1xuICAgICAgICByb2xlUm91dGUgPSByb3V0ZVN0ZXJpbGl6ZXIobWFpblJvdXRlLCByb3V0ZVJvbGVOYW1lKTtcbiAgICAgICAgcm91dGVzLnB1c2gocm9sZVJvdXRlKTtcbiAgICAgIH1cblxuICAgICAgcm9sZVJvdXRlID0gcm91dGVHZXR0ZXIocGF0aHMsIHJvbGVSb3V0ZSwgbWFpblJvdXRlLCByb3V0ZVJvbGVOYW1lKTtcbiAgICAgIHJvbGVSb3V0ZS5jaGlsZHJlbi5wdXNoKGNoaWxkbGVzc1JvdXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHtjaGlsZHJlbiA9IFtdfSA9IHBhcmVudFJvdXRlO1xuICAgICAgXG4gICAgICBpZihfLmlzRW1wdHkoY2hpbGRyZW4pKSB7XG4gICAgICAgIF8uZXh0ZW5kKHBhcmVudFJvdXRlLCB7Y2hpbGRyZW59KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZGxlc3NSb3V0ZSk7XG4gICAgfVxuICB9XG4gIFxuICBfLmVhY2goY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICBsZXQge3JvbGUgPSByb3V0ZVJvbGVOYW1lIHx8IHBhcmVudFJvbGVOYW1lfSA9IGNoaWxkO1xuICAgIF8uZXh0ZW5kKGNoaWxkLCB7cm9sZX0pO1xuICAgIHJvdXRlVG9Sb2xlTGlua2VyKGNoaWxkLCBtYWluUm91dGUgfHwgcm91dGUsIGNoaWxkbGVzc1JvdXRlLCBwYXRocy5jb25jYXQocGF0aCkpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm91dGUtdG8tcm9sZS1saW5rZXIvcm91dGUtdG8tcm9sZS1saW5rZXIudHMiLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmtzR2VuZXJhdG9yKHJvdXRlcywgcGF0aHMgPSBbXSwgbGlua3MgPSBbXSkge1xuICBfLmVhY2gocm91dGVzLCByb3V0ZSA9PiB7XG4gICAgbGV0IHtwYXRoLCBsaW5rLCBsYWJlbCwgbGlua0xhYmVsLCBjaGlsZHJlbn0gPSByb3V0ZTtcbiAgICBsZXQgY2hpbGRyZW5MaW5rcyA9IGxpbmtzR2VuZXJhdG9yKGNoaWxkcmVuLCBwYXRocy5jb25jYXQocGF0aCkpO1xuICAgIFxuICAgIGlmKGxpbmspIHtcbiAgICAgIGlmKCFsaW5rTGFiZWwpIHtcbiAgICAgICAgbGlua0xhYmVsID0gbGFiZWwgfHwgcGF0aDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcGF0aCA9IFsnJ10uY29uY2F0KHBhdGhzLCBwYXRoKS5qb2luKCcvJyk7XG4gICAgICBcbiAgICAgIGxldCBsaW5rUmVjb3JkUHJvcGVydGllcyA9IF8ub21pdChyb3V0ZSwgWydwYXRoJywgJ2NvbXBvbmVudCddKTsgICAgIFxuICAgICAgbGV0IGxpbmtSZWNvcmQgPSBfLmV4dGVuZCh7bGFiZWw6IGxpbmtMYWJlbCwgcGF0aH0sIGxpbmtSZWNvcmRQcm9wZXJ0aWVzKTtcbiAgICAgIFxuICAgICAgaWYoIV8uaXNFbXB0eShjaGlsZHJlbkxpbmtzKSkge1xuICAgICAgICBfLmV4dGVuZChsaW5rUmVjb3JkLCB7Y2hpbGRyZW46IGNoaWxkcmVuTGlua3N9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGlua3MucHVzaChsaW5rUmVjb3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlua3MucHVzaCguLi5jaGlsZHJlbkxpbmtzKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGxpbmtzO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvbGUtc2V0dGVyL2xpbmtzLWdlbmVyYXRvci9saW5rcy1nZW5lcmF0b3IudHMiLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlc0ZpbHRlcmVyKHJvdXRlcywgYXBwcm92ZWRSb3V0ZXMsIHJvbGUsIHBhdGhzID0gW10sIG5ld1JvdXRlcyA9IFtdKSB7XG4gIF8uZWFjaChhcHByb3ZlZFJvdXRlcywgYXBwcm92ZWRSb3V0ZSA9PiB7XG4gICAgbGV0IHtwYXRoLCBjaGlsZHJlbiwgZGVmYXVsdDogX2RlZmF1bHR9ID0gYXBwcm92ZWRSb3V0ZTtcbiAgICBsZXQgcm91dGUgPSBfLmZpbHRlcihyb3V0ZXMsIHtwYXRofSlbMF07XG4gICAgXG4gICAgaWYocm91dGUpIHtcbiAgICAgIGxldCBuZXdSb3V0ZSA9IF8ub21pdChyb3V0ZSwgWydjaGlsZHJlbiddKTtcbiAgICAgIFxuICAgICAgaWYoX2RlZmF1bHQpIHtcbiAgICAgICAgX2RlZmF1bHQgPSBbJyddLmNvbmNhdChwYXRocywgcGF0aCkuam9pbignLycpO1xuICAgICAgICBfLmV4dGVuZChyb2xlLCB7X2RlZmF1bHR9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYoY2hpbGRyZW4pIHtcbiAgICAgICAgcGF0aHMgPSBwYXRocy5jb25jYXQocGF0aCk7XG4gICAgICAgIG5ld1JvdXRlLmNoaWxkcmVuID0gcm91dGVzRmlsdGVyZXIocm91dGUuY2hpbGRyZW4sIGNoaWxkcmVuLCByb2xlLCBwYXRocyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIG5ld1JvdXRlcy5wdXNoKG5ld1JvdXRlKTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIG5ld1JvdXRlcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLXNldHRlci9yb3V0ZXMtZmlsdGVyZXIvcm91dGVzLWZpbHRlcmVyLnRzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzIwX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiUnhcIixcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzIxX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOltcIm5nXCIsXCJyb3V0ZXJcIl0sXCJjb21tb25qc1wiOlwiQGFuZ3VsYXIvcm91dGVyXCIsXCJjb21tb25qczJcIjpcIkBhbmd1bGFyL3JvdXRlclwiLFwiYW1kXCI6XCJAYW5ndWxhci9yb3V0ZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge05nTW9kdWxlfSAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFBsdXNNb2R1bGV9IGZyb20gJ25nLWh0dHAtY2xpZW50LXBsdXMnO1xuaW1wb3J0IHtHdWFyZGlhbn0gICAgICAgICAgICAgZnJvbSAnLi9fY29uc3RydWN0b3IvY29uc3RydWN0b3InO1xuaW1wb3J0IGluaXQgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9pbml0aWFsaXplci9pbml0aWFsaXplcic7XG5pbXBvcnQgbG9naW4gICAgICAgICAgICAgICAgICBmcm9tICcuL2xvZ2luLXByb2Nlc3Nvci9sb2dpbi1wcm9jZXNzb3InO1xuaW1wb3J0IGxvZ291dCAgICAgICAgICAgICAgICAgZnJvbSAnLi9sb2dvdXQtcHJvY2Vzc29yL2xvZ291dC1wcm9jZXNzb3InO1xuaW1wb3J0IGxpbmtzICAgICAgICAgICAgICAgICAgZnJvbSAnLi9saW5rcy1nZXR0ZXIvbGlua3MtZ2V0dGVyJztcbmltcG9ydCByb2xlICAgICAgICAgICAgICAgICAgIGZyb20gJy4vcm9sZS1nZXR0ZXIvcm9sZS1nZXR0ZXInO1xuXG5fLmV4dGVuZChHdWFyZGlhbi5wcm90b3R5cGUsIHtcbiAgaW5pdCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgbGlua3MsXG4gIHJvbGVcbn0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudFBsdXNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtHdWFyZGlhbl1cbn0pIFxuY2xhc3MgR3VhcmRpYW5Nb2R1bGUge31cblxuZXhwb3J0IHtcbiAgR3VhcmRpYW4sXG4gIEd1YXJkaWFuTW9kdWxlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25nLWd1YXJkaWFuLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==