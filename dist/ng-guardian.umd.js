(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("ng-http-plus"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "ng-http-plus", "@angular/core", "rxjs", "@angular/router"], factory);
	else if(typeof exports === 'object')
		exports["ngGuardian"] = factory(require("lodash"), require("ng-http-plus"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else
		root["ngGuardian"] = factory(root["_"], root["ngHttpPlus"], root["ng"]["core"], root["Rx"], root["ng"]["router"]);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_http_plus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_http_plus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng_http_plus__);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ng_http_plus__["HttpClientPlus"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
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
    if (sessionStorage.getItem(configs.tokenName)) {
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
        data = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](data, fields);
        __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](_this, { data: data });
        sessionStorage.setItem(_this.http.configs.tokenName, token);
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
    sessionStorage.removeItem(this.http.configs.tokenName);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_http_plus__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_http_plus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_http_plus__);
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
            imports: [__WEBPACK_IMPORTED_MODULE_2_ng_http_plus__["HttpClientPlusModule"]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* Guardian */]]
        })
    ], GuardianModule);
    return GuardianModule;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMmU0MDRjNzI0NDFlNjRlNTQwYiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9fbGliL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJuZ0h0dHBQbHVzXCIsXCJjb21tb25qc1wiOlwibmctaHR0cC1wbHVzXCIsXCJjb21tb25qczJcIjpcIm5nLWh0dHAtcGx1c1wiLFwiYW1kXCI6XCJuZy1odHRwLXBsdXNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpbXCJuZ1wiLFwiY29yZVwiXSxcImNvbW1vbmpzXCI6XCJAYW5ndWxhci9jb3JlXCIsXCJjb21tb25qczJcIjpcIkBhbmd1bGFyL2NvcmVcIixcImFtZFwiOlwiQGFuZ3VsYXIvY29yZVwifSIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL2F1dG8tbG9nb3V0LXNldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL19saWIvcm91dGUtc3RlcmlsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9pbml0aWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlua3MtZ2V0dGVyL2xpbmtzLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4tcHJvY2Vzc29yL2xvZ2luLXByb2Nlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LXByb2Nlc3Nvci9sb2dvdXQtcHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLWdldHRlci9yb2xlLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL19saWIvYXV0by1sb2dvdXQtaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcmVkaXJlY3QtY2FwdHVyZXIvcmVkaXJlY3QtY2FwdHVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb2xlcy1hc3NlbWJsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb3V0ZS10by1yb2xlLWxpbmtlci9fbGliL3JvdXRlLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLXNldHRlci9saW5rcy1nZW5lcmF0b3IvbGlua3MtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLXNldHRlci9yb3V0ZXMtZmlsdGVyZXIvcm91dGVzLWZpbHRlcmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJSeFwiLFwiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6W1wibmdcIixcInJvdXRlclwiXSxcImNvbW1vbmpzXCI6XCJAYW5ndWxhci9yb3V0ZXJcIixcImNvbW1vbmpzMlwiOlwiQGFuZ3VsYXIvcm91dGVyXCIsXCJhbWRcIjpcIkBhbmd1bGFyL3JvdXRlclwifSIsIndl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SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLElBQUk7Q0FDTCxDQUFDLENBQUM7QUFNSDtJQUFBO0lBQXNCLENBQUM7SUFBakIsY0FBYztRQUpuQiw4RUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsa0VBQW9CLENBQUM7WUFDL0IsU0FBUyxFQUFFLENBQUMsMEVBQVEsQ0FBQztTQUN0QixDQUFDO09BQ0ksY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQTtBQUtyQiIsImZpbGUiOiJuZy1ndWFyZGlhbi51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2hcIiksIHJlcXVpcmUoXCJuZy1odHRwLXBsdXNcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwicnhqc1wiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJsb2Rhc2hcIiwgXCJuZy1odHRwLXBsdXNcIiwgXCJAYW5ndWxhci9jb3JlXCIsIFwicnhqc1wiLCBcIkBhbmd1bGFyL3JvdXRlclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0d1YXJkaWFuXCJdID0gZmFjdG9yeShyZXF1aXJlKFwibG9kYXNoXCIpLCByZXF1aXJlKFwibmctaHR0cC1wbHVzXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKSwgcmVxdWlyZShcInJ4anNcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9yb3V0ZXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nR3VhcmRpYW5cIl0gPSBmYWN0b3J5KHJvb3RbXCJfXCJdLCByb290W1wibmdIdHRwUGx1c1wiXSwgcm9vdFtcIm5nXCJdW1wiY29yZVwiXSwgcm9vdFtcIlJ4XCJdLCByb290W1wibmdcIl1bXCJyb3V0ZXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzIxX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMmU0MDRjNzI0NDFlNjRlNTQwYiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHJvbGVzID0ge1xuICBhdXRoOiB7cm91dGVzOiBbXSwgX2RlZmF1bHQ6IG51bGx9LFxuICBub0F1dGg6IHtyb3V0ZXM6IFtdLCBfZGVmYXVsdDogbnVsbH0sXG4gIGFsbDoge3JvdXRlczogW10sIF9kZWZhdWx0OiBudWxsfVxufTtcblxuY29uc3QgY29uZmlncyA9IHtcbiAgdGltZW91dDogbnVsbCxcbiAgZ3VhcmRpYW46IG51bGwsXG4gIGxvZ291dFRpbWVvdXQ6IG51bGxcbn07XG5cbmV4cG9ydCB7XG4gIGNvbmZpZ3MsXG4gIHJvbGVzXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL19saWIvdmFycy50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtyb2xlc30gICAgICAgIGZyb20gJy4uL19saWIvdmFycyc7XG5pbXBvcnQgcm91dGVzRmlsdGVyZXIgZnJvbSAnLi9yb3V0ZXMtZmlsdGVyZXIvcm91dGVzLWZpbHRlcmVyJztcbmltcG9ydCBsaW5rc0dlbmVyYXRvciBmcm9tICcuL2xpbmtzLWdlbmVyYXRvci9saW5rcy1nZW5lcmF0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyb2xlTmFtZSwgbmF2aWdhdGUgPSB0cnVlLCBhcHByb3ZlZFJvdXRlcz8pIHtcbiAgbGV0IHJvbGUgPSByb2xlc1tyb2xlTmFtZV07XG4gIGxldCB7cm91dGVzOiBhbGxSb3V0ZXMsIF9kZWZhdWx0OiBhbGxEZWZhdWx0fSA9IHJvbGVzLmFsbDtcbiAgbGV0IHtsaW5rc1B1Ymxpc2hlciwgcm91dGVyLCByZWRpcmVjdFVybH0gPSB0aGlzO1xuICBsZXQge3JvdXRlcywgX2RlZmF1bHR9ID0gcm9sZTtcblxuICBpZihhcHByb3ZlZFJvdXRlcykge1xuICAgIGxldCBfZGVmYXVsdEhvbGRlciA9IHtfZGVmYXVsdDogJyd9O1xuICAgIHJvdXRlcyA9IHJvdXRlc0ZpbHRlcmVyKHJvdXRlcywgYXBwcm92ZWRSb3V0ZXMsIF9kZWZhdWx0SG9sZGVyKTtcbiAgICAoe19kZWZhdWx0fSA9IF9kZWZhdWx0SG9sZGVyKTtcbiAgfVxuICBcbiAgaWYoIV9kZWZhdWx0KSB7XG4gICAgX2RlZmF1bHQgPSBhbGxEZWZhdWx0O1xuICB9XG4gIFxuICBpZighX2RlZmF1bHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2ggcm9sZSBzaG91bGQgaGF2ZSBhIGRlZmF1bHQgcm91dGUnKTtcbiAgfVxuICBcbiAgXy5leHRlbmQodGhpcywge3N0YXR1czogcm9sZU5hbWUsIGRlZmF1bHRVcmw6IF9kZWZhdWx0fSk7XG5cbiAgaWYoIV8uZmlsdGVyKHJvdXRlcywge3BhdGg6ICcnfSkubGVuZ3RoKSB7XG4gICAgcm91dGVzLnB1c2goLi4uYWxsUm91dGVzKTtcbiAgICByb3V0ZXMucHVzaCh7cGF0aDogJycsIHBhdGhNYXRjaDogJ2Z1bGwnLCByZWRpcmVjdFRvOiBfZGVmYXVsdH0pO1xuICAgIHJvdXRlcy5wdXNoKHtwYXRoOiAnKionLCByZWRpcmVjdFRvOiBfZGVmYXVsdH0pO1xuICB9XG4gIFxuICBsaW5rc1B1Ymxpc2hlci5uZXh0KHtyb2xlOiByb2xlTmFtZSwgbGlua3M6IGxpbmtzR2VuZXJhdG9yKHJvdXRlcyl9KTtcbiAgcm91dGVyLnJlc2V0Q29uZmlnKHJvdXRlcyk7XG5cbiAgaWYobmF2aWdhdGUpIHtcbiAgICBkZWxldGUgdGhpcy5yZWRpcmVjdFVybDtcbiAgICByb3V0ZXIubmF2aWdhdGUoW3JlZGlyZWN0VXJsIHx8IF9kZWZhdWx0XSwge3JlcGxhY2VVcmw6IHRydWV9KTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLXNldHRlci9yb2xlLXNldHRlci50cyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwibmdIdHRwUGx1c1wiLFwiY29tbW9uanNcIjpcIm5nLWh0dHAtcGx1c1wiLFwiY29tbW9uanMyXCI6XCJuZy1odHRwLXBsdXNcIixcImFtZFwiOlwibmctaHR0cC1wbHVzXCJ9XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOltcIm5nXCIsXCJjb3JlXCJdLFwiY29tbW9uanNcIjpcIkBhbmd1bGFyL2NvcmVcIixcImNvbW1vbmpzMlwiOlwiQGFuZ3VsYXIvY29yZVwiLFwiYW1kXCI6XCJAYW5ndWxhci9jb3JlXCJ9XG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhdXRvTG9nb3V0SGFuZGxlciBmcm9tICcuL19saWIvYXV0by1sb2dvdXQtaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IG9wZXJhdGlvbiA9PiB7XG4gIGxldCBtZXRob2ROYW1lID0gb3BlcmF0aW9uICsgJ0V2ZW50TGlzdGVuZXInO1xuICBsZXQgZXZlbnROYW1lcyA9IFsnY2xpY2snLCAna2V5dXAnLCAnbW91c2Vtb3ZlJ107XG4gIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgIGRvY3VtZW50W21ldGhvZE5hbWVdKGV2ZW50TmFtZSwgYXV0b0xvZ291dEhhbmRsZXIpO1xuICB9KTtcbiAgXG4gIGlmKG9wZXJhdGlvbiA9PT0gJ2FkZCcpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChldmVudE5hbWVzWzBdKSk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL2F1dG8tbG9nb3V0LXNldHRlci50cyIsImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgKHJvdXRlLCByb2xlTmFtZSkgPT4ge1xuICByb3V0ZSA9IF8ub21pdChyb3V0ZSwgWydjaGlsZHJlbiddKTtcbiAgcmV0dXJuIF8uZXh0ZW5kKHJvdXRlLCB7Y2hpbGRyZW46IFtdLCByb2xlOiByb2xlTmFtZX0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm91dGUtdG8tcm9sZS1saW5rZXIvX2xpYi9yb3V0ZS1zdGVyaWxpemVyLnRzIiwiaW1wb3J0IHtIdHRwQ2xpZW50UGx1c30gIGZyb20gJ25nLWh0dHAtcGx1cyc7XG5pbXBvcnQge1JvdXRlcn0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKSBcbmV4cG9ydCBjbGFzcyBHdWFyZGlhbiB7XG4gIGluaXQ7XG4gIGxvZ2luO1xuICBsb2dvdXQ7XG4gIGxpbmtzO1xuICByb2xlO1xuICBjb25maWdzO1xuICBkZWZhdWx0VXJsO1xuICByZWRpcmVjdFVybDtcbiAgbGlua3NQdWJsaXNoZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50UGx1cywgcHVibGljIHJvdXRlcjogUm91dGVyKSB7fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL19jb25zdHJ1Y3Rvci9jb25zdHJ1Y3Rvci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7Y29uZmlncyBhcyBfY29uZmlnc30gZnJvbSAnLi4vX2xpYi92YXJzJzsgICAgICAgICAgXG5pbXBvcnQgcm9sZVNldHRlciAgICAgICAgICAgIGZyb20gJy4uL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyJztcbmltcG9ydCByb2xlc0Fzc2VtYmxlciAgICAgICAgZnJvbSAnLi9yb2xlcy1hc3NlbWJsZXIvcm9sZXMtYXNzZW1ibGVyJztcbmltcG9ydCByZWRpcmVjdENhcHR1cmVyICAgICAgZnJvbSAnLi9yZWRpcmVjdC1jYXB0dXJlci9yZWRpcmVjdC1jYXB0dXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbmZpZ3MpIHtcbiAgXy5leHRlbmQodGhpcywge2NvbmZpZ3N9KTtcbiAgXy5leHRlbmQoX2NvbmZpZ3MsIGNvbmZpZ3MsIHtndWFyZGlhbjogdGhpc30pO1xuICByb2xlc0Fzc2VtYmxlcih0aGlzKTtcbiAgcmVkaXJlY3RDYXB0dXJlcih0aGlzKTtcblxuICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGNvbmZpZ3MudG9rZW5OYW1lKSkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luKCk7XG4gIH1cbiAgXG4gIHJvbGVTZXR0ZXIuY2FsbCh0aGlzLCAnbm9BdXRoJywgZmFsc2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luaXRpYWxpemVyL2luaXRpYWxpemVyLnRzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmxpbmtzUHVibGlzaGVyLmFzT2JzZXJ2YWJsZSgpOyAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGlua3MtZ2V0dGVyL2xpbmtzLWdldHRlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXV0b0xvZ291dFNldHRlciBmcm9tICcuLi9hdXRvLWxvZ291dC1zZXR0ZXIvYXV0by1sb2dvdXQtc2V0dGVyJztcbmltcG9ydCByb2xlU2V0dGVyICAgICAgIGZyb20gJy4uL3JvbGUtc2V0dGVyL3JvbGUtc2V0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY3JlZGVudGlhbHMpIHtcbiAgdGhpcy5odHRwLnBvc3QodGhpcy5jb25maWdzLmxvZ2luUm91dGUsIGNyZWRlbnRpYWxzKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgbGV0IGZpZWxkcyA9IFsncm91dGVzJywgJ3Rva2VuJ107XG4gICAgbGV0IHtyb3V0ZXMsIHRva2VufSA9IF8ucGljayhkYXRhLCBmaWVsZHMpO1xuICAgIGRhdGEgPSBfLm9taXQoZGF0YSwgZmllbGRzKTtcbiAgICBfLmV4dGVuZCh0aGlzLCB7ZGF0YX0pO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0odGhpcy5odHRwLmNvbmZpZ3MudG9rZW5OYW1lLCB0b2tlbik7XG4gICAgcm9sZVNldHRlci5jYWxsKHRoaXMsICdhdXRoJywgdHJ1ZSwgcm91dGVzKTtcbiAgICBhdXRvTG9nb3V0U2V0dGVyKCdhZGQnKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9naW4tcHJvY2Vzc29yL2xvZ2luLXByb2Nlc3Nvci50cyIsImltcG9ydCBhdXRvTG9nb3V0U2V0dGVyIGZyb20gJy4uL2F1dG8tbG9nb3V0LXNldHRlci9hdXRvLWxvZ291dC1zZXR0ZXInO1xuaW1wb3J0IHJvbGVTZXR0ZXIgICAgICAgZnJvbSAnLi4vcm9sZS1zZXR0ZXIvcm9sZS1zZXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgYXV0b0xvZ291dFNldHRlcigncmVtb3ZlJyk7XG4gIHJvbGVTZXR0ZXIuY2FsbCh0aGlzLCAnbm9BdXRoJyk7XG4gIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5odHRwLmNvbmZpZ3MudG9rZW5OYW1lKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2dvdXQtcHJvY2Vzc29yL2xvZ291dC1wcm9jZXNzb3IudHMiLCJpbXBvcnQge3JvbGVzfSBmcm9tICcuLi9fbGliL3ZhcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyb2xlTmFtZSkge1xuICByZXR1cm4gcm9sZXNbcm9sZU5hbWVdO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvbGUtZ2V0dGVyL3JvbGUtZ2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtjb25maWdzfSBmcm9tICcuLi8uLi9fbGliL3ZhcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlYm91bmNlKCgpID0+IHtcbiAgY2xlYXJUaW1lb3V0KGNvbmZpZ3MudGltZW91dCk7XG4gIGNvbmZpZ3MudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbmZpZ3MuZ3VhcmRpYW4ubG9nb3V0KCk7XG4gIH0sIGNvbmZpZ3MubG9nb3V0VGltZW91dCAqIDYwMDAwKTtcbn0sIDUwMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL19saWIvYXV0by1sb2dvdXQtaGFuZGxlci50cyIsImV4cG9ydCBkZWZhdWx0IGd1YXJkaWFuID0+IHtcbiAgbGV0IHtwYXRobmFtZX0gPSBsb2NhdGlvbjtcbiAgaWYocGF0aG5hbWUgIT09ICcvJykge1xuICAgIGd1YXJkaWFuLnJlZGlyZWN0VXJsID0gcGF0aG5hbWU7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcmVkaXJlY3QtY2FwdHVyZXIvcmVkaXJlY3QtY2FwdHVyZXIudHMiLCJpbXBvcnQgKiBhcyBfICAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCByb3V0ZVRvUm9sZUxpbmtlciBmcm9tICcuL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyJztcblxuZXhwb3J0IGRlZmF1bHQgZ3VhcmRpYW4gPT4ge1xuICBfLmVhY2goZ3VhcmRpYW4ucm91dGVyLmNvbmZpZywgcm91dGUgPT4gcm91dGVUb1JvbGVMaW5rZXIocm91dGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvbGVzLWFzc2VtYmxlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCByb3V0ZVN0ZXJpbGl6ZXIgZnJvbSAnLi9yb3V0ZS1zdGVyaWxpemVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVHZXR0ZXIocGF0aHMsIHJvbGVSb3V0ZSwgbWFpblJvdXRlLCByb2xlTmFtZSkge1xuICBsZXQgcGF0aCA9IHBhdGhzLnNoaWZ0KCk7XG4gIFxuICBpZighcGF0aCkge1xuICAgIHJldHVybiByb2xlUm91dGU7XG4gIH1cbiAgXG4gIGxldCBbcm9sZUNoaWxkLCBtYWluQ2hpbGRdID0gW3JvbGVSb3V0ZSwgbWFpblJvdXRlXS5tYXAocm91dGUgPT4ge1xuICAgIHJldHVybiBfLmZpbHRlcihyb3V0ZS5jaGlsZHJlbiwge3BhdGh9KVswXTtcbiAgfSk7XG5cbiAgaWYoIXJvbGVDaGlsZCkge1xuICAgIHJvbGVDaGlsZCA9IHJvdXRlU3RlcmlsaXplcihtYWluQ2hpbGQsIHJvbGVOYW1lKTtcbiAgICByb2xlUm91dGUuY2hpbGRyZW4ucHVzaChyb2xlQ2hpbGQpO1xuICB9XG4gIFxuICByZXR1cm4gcm91dGVHZXR0ZXIocGF0aHMsIHJvbGVDaGlsZCwgbWFpbkNoaWxkLCByb2xlTmFtZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL19saWIvcm91dGUtZ2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtyb2xlc30gICAgICAgICBmcm9tICcuLi8uLi8uLi9fbGliL3ZhcnMnO1xuaW1wb3J0IHJvdXRlR2V0dGVyICAgICBmcm9tICcuL19saWIvcm91dGUtZ2V0dGVyJztcbmltcG9ydCByb3V0ZVN0ZXJpbGl6ZXIgZnJvbSAnLi9fbGliL3JvdXRlLXN0ZXJpbGl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZVRvUm9sZUxpbmtlcihyb3V0ZSwgbWFpblJvdXRlPywgcGFyZW50Um91dGU/LCBwYXRocyA9IFtdKSB7XG4gIGxldCB7cm9sZTogcm91dGVSb2xlTmFtZSwgcGF0aCwgZGVmYXVsdDogX2RlZmF1bHR9ID0gcm91dGU7XG4gIGxldCB7cm9sZTogcGFyZW50Um9sZU5hbWV9ID0gcGFyZW50Um91dGUgfHwge3JvbGU6IG51bGx9O1xuICBsZXQge2NoaWxkcmVufSA9IHJvdXRlO1xuICBsZXQgY2hpbGRsZXNzUm91dGUgPSBfLm9taXQocm91dGUsIFsnY2hpbGRyZW4nXSk7XG5cbiAgaWYoX2RlZmF1bHQpIHtcbiAgICByb2xlc1tyb3V0ZVJvbGVOYW1lXS5fZGVmYXVsdCA9IFsnJ10uY29uY2F0KHBhdGhzLCBwYXRoKS5qb2luKCcvJyk7XG4gIH1cblxuICBpZighcm91dGVSb2xlTmFtZSAmJiAhcGFyZW50Um9sZU5hbWUpIHtcbiAgICByb3V0ZVJvbGVOYW1lID0gJ2FsbCc7XG4gIH1cblxuICBpZighcGFyZW50Um9sZU5hbWUpIHtcbiAgICByb2xlc1tyb3V0ZVJvbGVOYW1lXS5yb3V0ZXMucHVzaChjaGlsZGxlc3NSb3V0ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYocm91dGVSb2xlTmFtZSAhPT0gcGFyZW50Um9sZU5hbWUpIHtcbiAgICAgIGxldCByb290Um9sZU5hbWUgPSBwYXRocy5zaGlmdCgpO1xuICAgICAgbGV0IHtyb3V0ZXN9ID0gcm9sZXNbcm91dGVSb2xlTmFtZV07XG4gICAgICBsZXQgcm9sZVJvdXRlID0gXy5maWx0ZXIocm91dGVzLCB7cGF0aDogcm9vdFJvbGVOYW1lfSlbMF07XG5cbiAgICAgIGlmKCFyb2xlUm91dGUpIHtcbiAgICAgICAgcm9sZVJvdXRlID0gcm91dGVTdGVyaWxpemVyKG1haW5Sb3V0ZSwgcm91dGVSb2xlTmFtZSk7XG4gICAgICAgIHJvdXRlcy5wdXNoKHJvbGVSb3V0ZSk7XG4gICAgICB9XG5cbiAgICAgIHJvbGVSb3V0ZSA9IHJvdXRlR2V0dGVyKHBhdGhzLCByb2xlUm91dGUsIG1haW5Sb3V0ZSwgcm91dGVSb2xlTmFtZSk7XG4gICAgICByb2xlUm91dGUuY2hpbGRyZW4ucHVzaChjaGlsZGxlc3NSb3V0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB7Y2hpbGRyZW4gPSBbXX0gPSBwYXJlbnRSb3V0ZTtcbiAgICAgIFxuICAgICAgaWYoXy5pc0VtcHR5KGNoaWxkcmVuKSkge1xuICAgICAgICBfLmV4dGVuZChwYXJlbnRSb3V0ZSwge2NoaWxkcmVufSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRsZXNzUm91dGUpO1xuICAgIH1cbiAgfVxuICBcbiAgXy5lYWNoKGNoaWxkcmVuLCBjaGlsZCA9PiB7XG4gICAgbGV0IHtyb2xlID0gcm91dGVSb2xlTmFtZSB8fCBwYXJlbnRSb2xlTmFtZX0gPSBjaGlsZDtcbiAgICBfLmV4dGVuZChjaGlsZCwge3JvbGV9KTtcbiAgICByb3V0ZVRvUm9sZUxpbmtlcihjaGlsZCwgbWFpblJvdXRlIHx8IHJvdXRlLCBjaGlsZGxlc3NSb3V0ZSwgcGF0aHMuY29uY2F0KHBhdGgpKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rc0dlbmVyYXRvcihyb3V0ZXMsIHBhdGhzID0gW10sIGxpbmtzID0gW10pIHtcbiAgXy5lYWNoKHJvdXRlcywgcm91dGUgPT4ge1xuICAgIGxldCB7cGF0aCwgbGluaywgbGFiZWwsIGxpbmtMYWJlbCwgY2hpbGRyZW59ID0gcm91dGU7XG4gICAgbGV0IGNoaWxkcmVuTGlua3MgPSBsaW5rc0dlbmVyYXRvcihjaGlsZHJlbiwgcGF0aHMuY29uY2F0KHBhdGgpKTtcbiAgICBcbiAgICBpZihsaW5rKSB7XG4gICAgICBpZighbGlua0xhYmVsKSB7XG4gICAgICAgIGxpbmtMYWJlbCA9IGxhYmVsIHx8IHBhdGg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHBhdGggPSBbJyddLmNvbmNhdChwYXRocywgcGF0aCkuam9pbignLycpO1xuICAgICAgXG4gICAgICBsZXQgbGlua1JlY29yZFByb3BlcnRpZXMgPSBfLm9taXQocm91dGUsIFsncGF0aCcsICdjb21wb25lbnQnXSk7ICAgICBcbiAgICAgIGxldCBsaW5rUmVjb3JkID0gXy5leHRlbmQoe2xhYmVsOiBsaW5rTGFiZWwsIHBhdGh9LCBsaW5rUmVjb3JkUHJvcGVydGllcyk7XG4gICAgICBcbiAgICAgIGlmKCFfLmlzRW1wdHkoY2hpbGRyZW5MaW5rcykpIHtcbiAgICAgICAgXy5leHRlbmQobGlua1JlY29yZCwge2NoaWxkcmVuOiBjaGlsZHJlbkxpbmtzfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxpbmtzLnB1c2gobGlua1JlY29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmtzLnB1c2goLi4uY2hpbGRyZW5MaW5rcyk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBsaW5rcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLXNldHRlci9saW5rcy1nZW5lcmF0b3IvbGlua3MtZ2VuZXJhdG9yLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXNGaWx0ZXJlcihyb3V0ZXMsIGFwcHJvdmVkUm91dGVzLCByb2xlLCBwYXRocyA9IFtdLCBuZXdSb3V0ZXMgPSBbXSkge1xuICBfLmVhY2goYXBwcm92ZWRSb3V0ZXMsIGFwcHJvdmVkUm91dGUgPT4ge1xuICAgIGxldCB7cGF0aCwgY2hpbGRyZW4sIGRlZmF1bHQ6IF9kZWZhdWx0fSA9IGFwcHJvdmVkUm91dGU7XG4gICAgbGV0IHJvdXRlID0gXy5maWx0ZXIocm91dGVzLCB7cGF0aH0pWzBdO1xuICAgIFxuICAgIGlmKHJvdXRlKSB7XG4gICAgICBsZXQgbmV3Um91dGUgPSBfLm9taXQocm91dGUsIFsnY2hpbGRyZW4nXSk7XG4gICAgICBcbiAgICAgIGlmKF9kZWZhdWx0KSB7XG4gICAgICAgIF9kZWZhdWx0ID0gWycnXS5jb25jYXQocGF0aHMsIHBhdGgpLmpvaW4oJy8nKTtcbiAgICAgICAgXy5leHRlbmQocm9sZSwge19kZWZhdWx0fSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmKGNoaWxkcmVuKSB7XG4gICAgICAgIHBhdGhzID0gcGF0aHMuY29uY2F0KHBhdGgpO1xuICAgICAgICBuZXdSb3V0ZS5jaGlsZHJlbiA9IHJvdXRlc0ZpbHRlcmVyKHJvdXRlLmNoaWxkcmVuLCBjaGlsZHJlbiwgcm9sZSwgcGF0aHMpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBuZXdSb3V0ZXMucHVzaChuZXdSb3V0ZSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBuZXdSb3V0ZXM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm9sZS1zZXR0ZXIvcm91dGVzLWZpbHRlcmVyL3JvdXRlcy1maWx0ZXJlci50cyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIlJ4XCIsXCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn1cbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yMV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpbXCJuZ1wiLFwicm91dGVyXCJdLFwiY29tbW9uanNcIjpcIkBhbmd1bGFyL3JvdXRlclwiLFwiY29tbW9uanMyXCI6XCJAYW5ndWxhci9yb3V0ZXJcIixcImFtZFwiOlwiQGFuZ3VsYXIvcm91dGVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBfICAgICAgICAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtOZ01vZHVsZX0gICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRQbHVzTW9kdWxlfSBmcm9tICduZy1odHRwLXBsdXMnO1xuaW1wb3J0IHtHdWFyZGlhbn0gICAgICAgICAgICAgZnJvbSAnLi9fY29uc3RydWN0b3IvY29uc3RydWN0b3InO1xuaW1wb3J0IGluaXQgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9pbml0aWFsaXplci9pbml0aWFsaXplcic7XG5pbXBvcnQgbG9naW4gICAgICAgICAgICAgICAgICBmcm9tICcuL2xvZ2luLXByb2Nlc3Nvci9sb2dpbi1wcm9jZXNzb3InO1xuaW1wb3J0IGxvZ291dCAgICAgICAgICAgICAgICAgZnJvbSAnLi9sb2dvdXQtcHJvY2Vzc29yL2xvZ291dC1wcm9jZXNzb3InO1xuaW1wb3J0IGxpbmtzICAgICAgICAgICAgICAgICAgZnJvbSAnLi9saW5rcy1nZXR0ZXIvbGlua3MtZ2V0dGVyJztcbmltcG9ydCByb2xlICAgICAgICAgICAgICAgICAgIGZyb20gJy4vcm9sZS1nZXR0ZXIvcm9sZS1nZXR0ZXInO1xuXG5fLmV4dGVuZChHdWFyZGlhbi5wcm90b3R5cGUsIHtcbiAgaW5pdCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgbGlua3MsXG4gIHJvbGVcbn0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudFBsdXNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtHdWFyZGlhbl1cbn0pIFxuY2xhc3MgR3VhcmRpYW5Nb2R1bGUge31cblxuZXhwb3J0IHtcbiAgR3VhcmRpYW4sXG4gIEd1YXJkaWFuTW9kdWxlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25nLWd1YXJkaWFuLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==