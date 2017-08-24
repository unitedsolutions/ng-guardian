(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "@angular/core", "rxjs", "@angular/router"], factory);
	else if(typeof exports === 'object')
		exports["ngGuardian"] = factory(require("lodash"), require("@angular/core"), require("rxjs"), require("@angular/router"));
	else
		root["ngGuardian"] = factory(root["_"], root["ng"]["core"], root["Rx"], root["ng"]["router"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_60__, __WEBPACK_EXTERNAL_MODULE_61__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var toSubscriber_1 = __webpack_require__(57);
var observable_1 = __webpack_require__(12);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(15);
var Subscription_1 = __webpack_require__(41);
var Observer_1 = __webpack_require__(11);
var rxSubscriber_1 = __webpack_require__(13);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* unused harmony export HttpBackend */
/* unused harmony export HttpHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HttpClient; });
/* unused harmony export HttpHeaders */
/* unused harmony export HTTP_INTERCEPTORS */
/* unused harmony export JsonpClientBackend */
/* unused harmony export JsonpInterceptor */
/* unused harmony export HttpClientJsonpModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClientModule; });
/* unused harmony export HttpClientXsrfModule */
/* unused harmony export ɵinterceptingHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HttpParams; });
/* unused harmony export HttpUrlEncodingCodec */
/* unused harmony export HttpRequest */
/* unused harmony export HttpErrorResponse */
/* unused harmony export HttpEventType */
/* unused harmony export HttpHeaderResponse */
/* unused harmony export HttpResponse */
/* unused harmony export HttpResponseBase */
/* unused harmony export HttpXhrBackend */
/* unused harmony export XhrFactory */
/* unused harmony export HttpXsrfTokenExtractor */
/* unused harmony export ɵa */
/* unused harmony export ɵb */
/* unused harmony export ɵc */
/* unused harmony export ɵd */
/* unused harmony export ɵg */
/* unused harmony export ɵh */
/* unused harmony export ɵe */
/* unused harmony export ɵf */

/**
 * @license Angular v4.3.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */







/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * \@experimental
 * @abstract
 */
var HttpHandler = (function () {
    function HttpHandler() {
    }
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    HttpHandler.prototype.handle = function (req) { };
    return HttpHandler;
}());
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * \@experimental
 * @abstract
 */
var HttpBackend = (function () {
    function HttpBackend() {
    }
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    HttpBackend.prototype.handle = function (req) { };
    return HttpBackend;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
 * serialize and parse URL parameter keys and values.
 *
 * \@experimental
 */
var HttpUrlEncodingCodec = (function () {
    function HttpUrlEncodingCodec() {
    }
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeKey = function (k) { return standardEncoding(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeValue = function (v) { return standardEncoding(v); };
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeKey = function (k) { return decodeURIComponent(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeValue = function (v) { return decodeURIComponent(v); };
    return HttpUrlEncodingCodec;
}());
/**
 * @param {?} rawParams
 * @param {?} codec
 * @return {?}
 */
function paramParser(rawParams, codec) {
    var /** @type {?} */ map$$1 = new Map();
    if (rawParams.length > 0) {
        var /** @type {?} */ params = rawParams.split('&');
        params.forEach(function (param) {
            var /** @type {?} */ eqIdx = param.indexOf('=');
            var _a = eqIdx == -1 ?
                [codec.decodeKey(param), ''] :
                [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))], key = _a[0], val = _a[1];
            var /** @type {?} */ list = map$$1.get(key) || [];
            list.push(val);
            map$$1.set(key, list);
        });
    }
    return map$$1;
}
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * An HTTP request/response body that represents serialized parameters,
 * per the MIME type `application/x-www-form-urlencoded`.
 *
 * This class is immuatable - all mutation operations return a new instance.
 *
 * \@experimental
 */
var HttpParams = (function () {
    /**
     * @param {?=} options
     */
    function HttpParams(options) {
        if (options === void 0) { options = {}; }
        this.updates = null;
        this.cloneFrom = null;
        this.encoder = options.encoder || new HttpUrlEncodingCodec();
        this.map = !!options.fromString ? paramParser(options.fromString, this.encoder) : null;
    }
    /**
     * Check whether the body has one or more values for the given parameter name.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.has = function (param) {
        this.init();
        return ((this.map)).has(param);
    };
    /**
     * Get the first value for the given parameter name, or `null` if it's not present.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.get = function (param) {
        this.init();
        var /** @type {?} */ res = ((this.map)).get(param);
        return !!res ? res[0] : null;
    };
    /**
     * Get all values for the given parameter name, or `null` if it's not present.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.getAll = function (param) {
        this.init();
        return ((this.map)).get(param) || null;
    };
    /**
     * Get all the parameter names for this body.
     * @return {?}
     */
    HttpParams.prototype.keys = function () {
        this.init();
        return Array.from(/** @type {?} */ ((this.map)).keys());
    };
    /**
     * Construct a new body with an appended value for the given parameter name.
     * @param {?} param
     * @param {?} value
     * @return {?}
     */
    HttpParams.prototype.append = function (param, value) { return this.clone({ param: param, value: value, op: 'a' }); };
    /**
     * Construct a new body with a new value for the given parameter name.
     * @param {?} param
     * @param {?} value
     * @return {?}
     */
    HttpParams.prototype.set = function (param, value) { return this.clone({ param: param, value: value, op: 's' }); };
    /**
     * Construct a new body with either the given value for the given parameter
     * removed, if a value is given, or all values for the given parameter removed
     * if not.
     * @param {?} param
     * @param {?=} value
     * @return {?}
     */
    HttpParams.prototype.delete = function (param, value) { return this.clone({ param: param, value: value, op: 'd' }); };
    /**
     * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
     * separated by `&`s.
     * @return {?}
     */
    HttpParams.prototype.toString = function () {
        var _this = this;
        this.init();
        return this.keys()
            .map(function (key) {
            var /** @type {?} */ eKey = _this.encoder.encodeKey(key);
            return ((((_this.map)).get(key))).map(function (value) { return eKey + '=' + _this.encoder.encodeValue(value); })
                .join('&');
        })
            .join('&');
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpParams.prototype.clone = function (update) {
        var /** @type {?} */ clone = new HttpParams({ encoder: this.encoder });
        clone.cloneFrom = this.cloneFrom || this;
        clone.updates = (this.updates || []).concat([update]);
        return clone;
    };
    /**
     * @return {?}
     */
    HttpParams.prototype.init = function () {
        var _this = this;
        if (this.map === null) {
            this.map = new Map();
        }
        if (this.cloneFrom !== null) {
            this.cloneFrom.init();
            this.cloneFrom.keys().forEach(function (key) { return ((_this.map)).set(key, /** @type {?} */ ((((((_this.cloneFrom)).map)).get(key)))); }); /** @type {?} */
            ((this.updates)).forEach(function (update) {
                switch (update.op) {
                    case 'a':
                    case 's':
                        var /** @type {?} */ base = (update.op === 'a' ? ((_this.map)).get(update.param) : undefined) || [];
                        base.push(/** @type {?} */ ((update.value))); /** @type {?} */
                        ((_this.map)).set(update.param, base);
                        break;
                    case 'd':
                        if (update.value !== undefined) {
                            var /** @type {?} */ base_1 = ((_this.map)).get(update.param) || [];
                            var /** @type {?} */ idx = base_1.indexOf(update.value);
                            if (idx !== -1) {
                                base_1.splice(idx, 1);
                            }
                            if (base_1.length > 0) {
                                ((_this.map)).set(update.param, base_1);
                            }
                            else {
                                ((_this.map)).delete(update.param);
                            }
                        }
                        else {
                            ((_this.map)).delete(update.param);
                            break;
                        }
                }
            });
            this.cloneFrom = null;
        }
    };
    return HttpParams;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Immutable set of Http headers, with lazy parsing.
 * \@experimental
 */
var HttpHeaders = (function () {
    /**
     * @param {?=} headers
     */
    function HttpHeaders(headers) {
        var _this = this;
        /**
         * Internal map of lowercased header names to the normalized
         * form of the name (the form seen first).
         */
        this.normalizedNames = new Map();
        /**
         * Queued updates to be materialized the next initialization.
         */
        this.lazyUpdate = null;
        if (!headers) {
            this.headers = new Map();
        }
        else if (typeof headers === 'string') {
            this.lazyInit = function () {
                _this.headers = new Map();
                headers.split('\n').forEach(function (line) {
                    var index = line.indexOf(':');
                    if (index > 0) {
                        var name = line.slice(0, index);
                        var key = name.toLowerCase();
                        var value = line.slice(index + 1).trim();
                        _this.maybeSetNormalizedName(name, key);
                        if (_this.headers.has(key)) {
                            _this.headers.get(key).push(value);
                        }
                        else {
                            _this.headers.set(key, [value]);
                        }
                    }
                });
            };
        }
        else {
            this.lazyInit = function () {
                _this.headers = new Map();
                Object.keys(headers).forEach(function (name) {
                    var values = headers[name];
                    var key = name.toLowerCase();
                    if (typeof values === 'string') {
                        values = [values];
                    }
                    if (values.length > 0) {
                        _this.headers.set(key, values);
                        _this.maybeSetNormalizedName(name, key);
                    }
                });
            };
        }
    }
    /**
     * Checks for existence of header by given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.has = function (name) {
        this.init();
        return this.headers.has(name.toLowerCase());
    };
    /**
     * Returns first header that matches given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.get = function (name) {
        this.init();
        var /** @type {?} */ values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
    };
    /**
     * Returns the names of the headers
     * @return {?}
     */
    HttpHeaders.prototype.keys = function () {
        this.init();
        return Array.from(this.normalizedNames.values());
    };
    /**
     * Returns list of header values for a given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.getAll = function (name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HttpHeaders.prototype.append = function (name, value) {
        return this.clone({ name: name, value: value, op: 'a' });
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HttpHeaders.prototype.set = function (name, value) {
        return this.clone({ name: name, value: value, op: 's' });
    };
    /**
     * @param {?} name
     * @param {?=} value
     * @return {?}
     */
    HttpHeaders.prototype.delete = function (name, value) {
        return this.clone({ name: name, value: value, op: 'd' });
    };
    /**
     * @param {?} name
     * @param {?} lcName
     * @return {?}
     */
    HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
            this.normalizedNames.set(lcName, name);
        }
    };
    /**
     * @return {?}
     */
    HttpHeaders.prototype.init = function () {
        var _this = this;
        if (!!this.lazyInit) {
            if (this.lazyInit instanceof HttpHeaders) {
                this.copyFrom(this.lazyInit);
            }
            else {
                this.lazyInit();
            }
            this.lazyInit = null;
            if (!!this.lazyUpdate) {
                this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                this.lazyUpdate = null;
            }
        }
    };
    /**
     * @param {?} other
     * @return {?}
     */
    HttpHeaders.prototype.copyFrom = function (other) {
        var _this = this;
        other.init();
        Array.from(other.headers.keys()).forEach(function (key) {
            _this.headers.set(key, /** @type {?} */ ((other.headers.get(key))));
            _this.normalizedNames.set(key, /** @type {?} */ ((other.normalizedNames.get(key))));
        });
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpHeaders.prototype.clone = function (update) {
        var /** @type {?} */ clone = new HttpHeaders();
        clone.lazyInit =
            (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpHeaders.prototype.applyUpdate = function (update) {
        var /** @type {?} */ key = update.name.toLowerCase();
        switch (update.op) {
            case 'a':
            case 's':
                var /** @type {?} */ value = ((update.value));
                if (typeof value === 'string') {
                    value = [value];
                }
                if (value.length === 0) {
                    return;
                }
                this.maybeSetNormalizedName(update.name, key);
                var /** @type {?} */ base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                base.push.apply(base, value);
                this.headers.set(key, base);
                break;
            case 'd':
                var /** @type {?} */ toDelete_1 = (update.value);
                if (!toDelete_1) {
                    this.headers.delete(key);
                    this.normalizedNames.delete(key);
                }
                else {
                    var /** @type {?} */ existing = this.headers.get(key);
                    if (!existing) {
                        return;
                    }
                    existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                    if (existing.length === 0) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        this.headers.set(key, existing);
                    }
                }
                break;
        }
    };
    /**
     * \@internal
     * @param {?} fn
     * @return {?}
     */
    HttpHeaders.prototype.forEach = function (fn) {
        var _this = this;
        this.init();
        Array.from(this.normalizedNames.keys())
            .forEach(function (key) { return fn(/** @type {?} */ ((_this.normalizedNames.get(key))), /** @type {?} */ ((_this.headers.get(key)))); });
    };
    return HttpHeaders;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Determine whether the given HTTP method may include a body.
 * @param {?} method
 * @return {?}
 */
function mightHaveBody(method) {
    switch (method) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return false;
        default:
            return true;
    }
}
/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * In some execution environments ArrayBuffer is not defined.
 * @param {?} value
 * @return {?}
 */
function isArrayBuffer(value) {
    return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}
/**
 * Safely assert whether the given value is a Blob.
 *
 * In some execution environments Blob is not defined.
 * @param {?} value
 * @return {?}
 */
function isBlob(value) {
    return typeof Blob !== 'undefined' && value instanceof Blob;
}
/**
 * Safely assert whether the given value is a FormData instance.
 *
 * In some execution environments FormData is not defined.
 * @param {?} value
 * @return {?}
 */
function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}
/**
 * An outgoing HTTP request with an optional typed body.
 *
 * `HttpRequest` represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a `HttpRequest`, the `clone`
 * method should be used.
 *
 * \@experimental
 */
var HttpRequest = (function () {
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} third
     * @param {?=} fourth
     */
    function HttpRequest(method, url, third, fourth) {
        this.url = url;
        /**
         * The request body, or `null` if one isn't set.
         *
         * Bodies are not enforced to be immutable, as they can include a reference to any
         * user-defined data type. However, interceptors should take care to preserve
         * idempotence by treating them as such.
         */
        this.body = null;
        /**
         * Whether this request should be made in a way that exposes progress events.
         *
         * Progress events are expensive (change detection runs on each event) and so
         * they should only be requested if the consumer intends to monitor them.
         */
        this.reportProgress = false;
        /**
         * Whether this request should be sent with outgoing credentials (cookies).
         */
        this.withCredentials = false;
        /**
         * The expected response type of the server.
         *
         * This is used to parse the response appropriately before returning it to
         * the requestee.
         */
        this.responseType = 'json';
        this.method = method.toUpperCase();
        // Next, need to figure out which argument holds the HttpRequestInit
        // options, if any.
        var options;
        // Check whether a body argument is expected. The only valid way to omit
        // the body argument is to use a known no-body method like GET.
        if (mightHaveBody(this.method) || !!fourth) {
            // Body is the third argument, options are the fourth.
            this.body = third || null;
            options = fourth;
        }
        else {
            // No body required, options are the third argument. The body stays null.
            options = third;
        }
        // If options have been passed, interpret them.
        if (options) {
            // Normalize reportProgress and withCredentials.
            this.reportProgress = !!options.reportProgress;
            this.withCredentials = !!options.withCredentials;
            // Override default response type of 'json' if one is provided.
            if (!!options.responseType) {
                this.responseType = options.responseType;
            }
            // Override headers if they're provided.
            if (!!options.headers) {
                this.headers = options.headers;
            }
            if (!!options.params) {
                this.params = options.params;
            }
        }
        // If no headers have been passed in, construct a new HttpHeaders instance.
        if (!this.headers) {
            this.headers = new HttpHeaders();
        }
        // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
        if (!this.params) {
            this.params = new HttpParams();
            this.urlWithParams = url;
        }
        else {
            // Encode the parameters to a string in preparation for inclusion in the URL.
            var params = this.params.toString();
            if (params.length === 0) {
                // No parameters, the visible URL is just the URL given at creation time.
                this.urlWithParams = url;
            }
            else {
                // Does the URL already have query parameters? Look for '?'.
                var qIdx = url.indexOf('?');
                // There are 3 cases to handle:
                // 1) No existing parameters -> append '?' followed by params.
                // 2) '?' exists and is followed by existing query string ->
                //    append '&' followed by params.
                // 3) '?' exists at the end of the url -> append params directly.
                // This basically amounts to determining the character, if any, with
                // which to join the URL and parameters.
                var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                this.urlWithParams = url + sep + params;
            }
        }
    }
    /**
     * Transform the free-form body into a serialized format suitable for
     * transmission to the server.
     * @return {?}
     */
    HttpRequest.prototype.serializeBody = function () {
        // If no body is present, no need to serialize it.
        if (this.body === null) {
            return null;
        }
        // Check whether the body is already in a serialized form. If so,
        // it can just be returned directly.
        if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
            typeof this.body === 'string') {
            return this.body;
        }
        // Check whether the body is an instance of HttpUrlEncodedParams.
        if (this.body instanceof HttpParams) {
            return this.body.toString();
        }
        // Check whether the body is an object or array, and serialize with JSON if so.
        if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        // Fall back on toString() for everything else.
        return ((this.body)).toString();
    };
    /**
     * Examine the body and attempt to infer an appropriate MIME type
     * for it.
     *
     * If no such type can be inferred, this method will return `null`.
     * @return {?}
     */
    HttpRequest.prototype.detectContentTypeHeader = function () {
        // An empty body has no content type.
        if (this.body === null) {
            return null;
        }
        // FormData bodies rely on the browser's content type assignment.
        if (isFormData(this.body)) {
            return null;
        }
        // Blobs usually have their own content type. If it doesn't, then
        // no type can be inferred.
        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        // Array buffers have unknown contents and thus no type can be inferred.
        if (isArrayBuffer(this.body)) {
            return null;
        }
        // Technically, strings could be a form of JSON data, but it's safe enough
        // to assume they're plain strings.
        if (typeof this.body === 'string') {
            return 'text/plain';
        }
        // `HttpUrlEncodedParams` has its own content-type.
        if (this.body instanceof HttpParams) {
            return 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        // Arrays, objects, and numbers will be encoded as JSON.
        if (typeof this.body === 'object' || typeof this.body === 'number' ||
            Array.isArray(this.body)) {
            return 'application/json';
        }
        // No type could be inferred.
        return null;
    };
    /**
     * @param {?=} update
     * @return {?}
     */
    HttpRequest.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // For method, url, and responseType, take the current value unless
        // it is overridden in the update hash.
        var /** @type {?} */ method = update.method || this.method;
        var /** @type {?} */ url = update.url || this.url;
        var /** @type {?} */ responseType = update.responseType || this.responseType;
        // The body is somewhat special - a `null` value in update.body means
        // whatever current body is present is being overridden with an empty
        // body, whereas an `undefined` value in update.body implies no
        // override.
        var /** @type {?} */ body = (update.body !== undefined) ? update.body : this.body;
        // Carefully handle the boolean options to differentiate between
        // `false` and `undefined` in the update args.
        var /** @type {?} */ withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
        var /** @type {?} */ reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
        // Headers and params may be appended to if `setHeaders` or
        // `setParams` are used.
        var /** @type {?} */ headers = update.headers || this.headers;
        var /** @type {?} */ params = update.params || this.params;
        // Check whether the caller has asked to add headers.
        if (update.setHeaders !== undefined) {
            // Set every requested header.
            headers =
                Object.keys(update.setHeaders)
                    .reduce(function (headers, name) { return headers.set(name, /** @type {?} */ ((update.setHeaders))[name]); }, headers);
        }
        // Check whether the caller has asked to set params.
        if (update.setParams) {
            // Set every requested param.
            params = Object.keys(update.setParams)
                .reduce(function (params, param) { return params.set(param, /** @type {?} */ ((update.setParams))[param]); }, params);
        }
        // Finally, construct the new HttpRequest using the pieces from above.
        return new HttpRequest(method, url, body, {
            params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
        });
    };
    return HttpRequest;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var HttpEventType = {};
HttpEventType.Sent = 0;
HttpEventType.UploadProgress = 1;
HttpEventType.ResponseHeader = 2;
HttpEventType.DownloadProgress = 3;
HttpEventType.Response = 4;
HttpEventType.User = 5;
HttpEventType[HttpEventType.Sent] = "Sent";
HttpEventType[HttpEventType.UploadProgress] = "UploadProgress";
HttpEventType[HttpEventType.ResponseHeader] = "ResponseHeader";
HttpEventType[HttpEventType.DownloadProgress] = "DownloadProgress";
HttpEventType[HttpEventType.Response] = "Response";
HttpEventType[HttpEventType.User] = "User";
/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * \@experimental
 * @abstract
 */
var HttpResponseBase = (function () {
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     * @param {?} init
     * @param {?=} defaultStatus
     * @param {?=} defaultStatusText
     */
    function HttpResponseBase(init, defaultStatus, defaultStatusText) {
        if (defaultStatus === void 0) { defaultStatus = 200; }
        if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
        // If the hash has values passed, use them to initialize the response.
        // Otherwise use the default values.
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        // Cache the ok value to avoid defining a getter.
        this.ok = this.status >= 200 && this.status < 300;
    }
    return HttpResponseBase;
}());
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * \@experimental
 */
var HttpHeaderResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpHeaderResponse, _super);
    /**
     * Create a new `HttpHeaderResponse` with the given parameters.
     * @param {?=} init
     */
    function HttpHeaderResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.ResponseHeader;
        return _this;
    }
    /**
     * Copy this `HttpHeaderResponse`, overriding its contents with the
     * given parameter hash.
     * @param {?=} update
     * @return {?}
     */
    HttpHeaderResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // Perform a straightforward initialization of the new HttpHeaderResponse,
        // overriding the current parameters with new ones if given.
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpHeaderResponse;
}(HttpResponseBase));
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * \@experimental
 */
var HttpResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpResponse, _super);
    /**
     * Construct a new `HttpResponse`.
     * @param {?=} init
     */
    function HttpResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.Response;
        _this.body = init.body || null;
        return _this;
    }
    /**
     * @param {?=} update
     * @return {?}
     */
    HttpResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        return new HttpResponse({
            body: (update.body !== undefined) ? update.body : this.body,
            headers: update.headers || this.headers,
            status: (update.status !== undefined) ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpResponse;
}(HttpResponseBase));
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * \@experimental
 */
var HttpErrorResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpErrorResponse, _super);
    /**
     * @param {?} init
     */
    function HttpErrorResponse(init) {
        var _this = 
        // Initialize with a default status of 0 / Unknown Error.
        _super.call(this, init, 0, 'Unknown Error') || this;
        _this.name = 'HttpErrorResponse';
        /**
         * Errors are never okay, even when the status code is in the 2xx success range.
         */
        _this.ok = false;
        // If the response was successful, then this was a parse error. Otherwise, it was
        // a protocol-level failure of some sort. Either the request failed in transit
        // or the server returned an unsuccessful status code.
        if (_this.status >= 200 && _this.status < 300) {
            _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
        }
        else {
            _this.message =
                "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
        }
        _this.error = init.error || null;
        return _this;
    }
    return HttpErrorResponse;
}(HttpResponseBase));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Construct an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. Basically, this clones the object and adds the body.
 * @template T
 * @param {?} options
 * @param {?} body
 * @return {?}
 */
function addBody(options, body) {
    return {
        body: body,
        headers: options.headers,
        observe: options.observe,
        params: options.params,
        reportProgress: options.reportProgress,
        responseType: options.responseType,
        withCredentials: options.withCredentials,
    };
}
/**
 * Perform HTTP requests.
 *
 * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies according to which
 * signature is called (mainly the values of `observe` and `responseType`).
 *
 * \@experimental
 */
var HttpClient = (function () {
    /**
     * @param {?} handler
     */
    function HttpClient(handler) {
        this.handler = handler;
    }
    /**
     * Constructs an `Observable` for a particular HTTP request that, when subscribed,
     * fires the request through the chain of registered interceptors and on to the
     * server.
     *
     * This method can be called in one of two ways. Either an `HttpRequest`
     * instance can be passed directly as the only parameter, or a method can be
     * passed as the first parameter, a string URL as the second, and an
     * options hash as the third.
     *
     * If a `HttpRequest` object is passed directly, an `Observable` of the
     * raw `HttpEvent` stream will be returned.
     *
     * If a request is instead built by providing a URL, the options object
     * determines the return type of `request()`. In addition to configuring
     * request parameters such as the outgoing headers and/or the body, the options
     * hash specifies two key pieces of information about the request: the
     * `responseType` and what to `observe`.
     *
     * The `responseType` value determines how a successful response body will be
     * parsed. If `responseType` is the default `json`, a type interface for the
     * resulting object may be passed as a type parameter to `request()`.
     *
     * The `observe` value determines the return type of `request()`, based on what
     * the consumer is interested in observing. A value of `events` will return an
     * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
     * including progress events by default. A value of `response` will return an
     * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
     * depends on the `responseType` and any optionally provided type parameter.
     * A value of `body` will return an `Observable<T>` with the same `T` body type.
     * @param {?} first
     * @param {?=} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.request = function (first, url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var /** @type {?} */ req;
        // Firstly, check whether the primary argument is an instance of `HttpRequest`.
        if (first instanceof HttpRequest) {
            // It is. The other arguments must be undefined (per the signatures) and can be
            // ignored.
            req = (first);
        }
        else {
            // It's a string, so it represents a URL. Construct a request based on it,
            // and incorporate the remaining arguments (assuming GET unless a method is
            // provided.
            req = new HttpRequest(first, /** @type {?} */ ((url)), options.body || null, {
                headers: options.headers,
                params: options.params,
                reportProgress: options.reportProgress,
                // By default, JSON is assumed to be returned for all calls.
                responseType: options.responseType || 'json',
                withCredentials: options.withCredentials,
            });
        }
        // Start with an Observable.of() the initial request, and run the handler (which
        // includes all interceptors) inside a concatMap(). This way, the handler runs
        // inside an Observable chain, which causes interceptors to be re-run on every
        // subscription (this also makes retries re-run the handler, including interceptors).
        var /** @type {?} */ events$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__["concatMap"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(req), function (req) { return _this.handler.handle(req); });
        // If coming via the API signature which accepts a previously constructed HttpRequest,
        // the only option is to get the event stream. Otherwise, return the event stream if
        // that is what was requested.
        if (first instanceof HttpRequest || options.observe === 'events') {
            return events$;
        }
        // The requested stream contains either the full response or the body. In either
        // case, the first step is to filter the event stream to extract a stream of
        // responses(s).
        var /** @type {?} */ res$ = __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__["filter"].call(events$, function (event) { return event instanceof HttpResponse; });
        // Decide which stream to return.
        switch (options.observe || 'body') {
            case 'body':
                // The requested stream is the body. Map the response stream to the response
                // body. This could be done more simply, but a misbehaving interceptor might
                // transform the response body into a different format and ignore the requested
                // responseType. Guard against this by validating that the response is of the
                // requested type.
                switch (req.responseType) {
                    case 'arraybuffer':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is an ArrayBuffer.
                            if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                throw new Error('Response is not an ArrayBuffer.');
                            }
                            return res.body;
                        });
                    case 'blob':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is a Blob.
                            if (res.body !== null && !(res.body instanceof Blob)) {
                                throw new Error('Response is not a Blob.');
                            }
                            return res.body;
                        });
                    case 'text':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is a string.
                            if (res.body !== null && typeof res.body !== 'string') {
                                throw new Error('Response is not a string.');
                            }
                            return res.body;
                        });
                    case 'json':
                    default:
                        // No validation needed for JSON responses, as they can be of any type.
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) { return res.body; });
                }
            case 'response':
                // The response stream was requested directly, so return it.
                return res$;
            default:
                // Guard against new future observe types being added.
                throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
        }
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * DELETE request to be executed on the server. See the individual overloads for
     * details of `delete()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('DELETE', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * GET request to be executed on the server. See the individual overloads for
     * details of `get()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('GET', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * HEAD request to be executed on the server. See the individual overloads for
     * details of `head()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.head = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('HEAD', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause a request
     * with the special method `JSONP` to be dispatched via the interceptor pipeline.
     *
     * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
     * If no such interceptor is reached, then the `JSONP` request will likely be
     * rejected by the configured backend.
     * @template T
     * @param {?} url
     * @param {?} callbackParam
     * @return {?}
     */
    HttpClient.prototype.jsonp = function (url, callbackParam) {
        return this.request('JSONP', url, {
            params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
            observe: 'body',
            responseType: 'json',
        });
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * OPTIONS request to be executed on the server. See the individual overloads for
     * details of `options()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.options = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('OPTIONS', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * PATCH request to be executed on the server. See the individual overloads for
     * details of `patch()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.patch = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('PATCH', url, addBody(options, body));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * POST request to be executed on the server. See the individual overloads for
     * details of `post()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.post = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('POST', url, addBody(options, body));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * POST request to be executed on the server. See the individual overloads for
     * details of `post()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.put = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('PUT', url, addBody(options, body));
    };
    return HttpClient;
}());
HttpClient.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
HttpClient.ctorParameters = function () { return [
    { type: HttpHandler, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 * \@experimental
 */
var HttpInterceptorHandler = (function () {
    /**
     * @param {?} next
     * @param {?} interceptor
     */
    function HttpInterceptorHandler(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    HttpInterceptorHandler.prototype.handle = function (req) {
        return this.interceptor.intercept(req, this.next);
    };
    return HttpInterceptorHandler;
}());
/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 * \@experimental
 */
var HTTP_INTERCEPTORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('HTTP_INTERCEPTORS');
var NoopInterceptor = (function () {
    function NoopInterceptor() {
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    NoopInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req);
    };
    return NoopInterceptor;
}());
NoopInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NoopInterceptor.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Every request made through JSONP needs a callback name that's unique across the
// whole page. Each request is assigned an id and the callback name is constructed
// from that. The next id to be assigned is tracked in a global variable here that
// is shared among all applications on the page.
var nextRequestId = 0;
// Error text given when a JSONP script is injected, but doesn't invoke the callback
// passed in its URL.
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
// Error text given when a request is passed to the JsonpClientBackend that doesn't
// have a request method JSONP.
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use JSONP request method.';
var JSONP_ERR_WRONG_RESPONSE_TYPE = 'JSONP requests must use Json response type.';
/**
 * DI token/abstract type representing a map of JSONP callbacks.
 *
 * In the browser, this should always be the `window` object.
 *
 * \@experimental
 * @abstract
 */
var JsonpCallbackContext = (function () {
    function JsonpCallbackContext() {
    }
    return JsonpCallbackContext;
}());
/**
 * `HttpBackend` that only processes `HttpRequest` with the JSONP method,
 * by performing JSONP style requests.
 *
 * \@experimental
 */
var JsonpClientBackend = (function () {
    /**
     * @param {?} callbackMap
     * @param {?} document
     */
    function JsonpClientBackend(callbackMap, document) {
        this.callbackMap = callbackMap;
        this.document = document;
    }
    /**
     * Get the name of the next callback method, by incrementing the global `nextRequestId`.
     * @return {?}
     */
    JsonpClientBackend.prototype.nextCallback = function () { return "ng_jsonp_callback_" + nextRequestId++; };
    /**
     * Process a JSONP request and return an event stream of the results.
     * @param {?} req
     * @return {?}
     */
    JsonpClientBackend.prototype.handle = function (req) {
        var _this = this;
        // Firstly, check both the method and response type. If either doesn't match
        // then the request was improperly routed here and cannot be handled.
        if (req.method !== 'JSONP') {
            throw new Error(JSONP_ERR_WRONG_METHOD);
        }
        else if (req.responseType !== 'json') {
            throw new Error(JSONP_ERR_WRONG_RESPONSE_TYPE);
        }
        // Everything else happens inside the Observable boundary.
        return new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (observer) {
            // The first step to make a request is to generate the callback name, and replace the
            // callback placeholder in the URL with the name. Care has to be taken here to ensure
            // a trailing &, if matched, gets inserted back into the URL in the correct place.
            var /** @type {?} */ callback = _this.nextCallback();
            var /** @type {?} */ url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, "=" + callback + "$1");
            // Construct the <script> tag and point it at the URL.
            var /** @type {?} */ node = _this.document.createElement('script');
            node.src = url;
            // A JSONP request requires waiting for multiple callbacks. These variables
            // are closed over and track state across those callbacks.
            // The response object, if one has been received, or null otherwise.
            var /** @type {?} */ body = null;
            // Whether the response callback has been called.
            var /** @type {?} */ finished = false;
            // Whether the request has been cancelled (and thus any other callbacks)
            // should be ignored.
            var /** @type {?} */ cancelled = false;
            // Set the response callback in this.callbackMap (which will be the window
            // object in the browser. The script being loaded via the <script> tag will
            // eventually call this callback.
            _this.callbackMap[callback] = function (data) {
                // Data has been received from the JSONP script. Firstly, delete this callback.
                delete _this.callbackMap[callback];
                // Next, make sure the request wasn't cancelled in the meantime.
                if (cancelled) {
                    return;
                }
                // Set state to indicate data was received.
                body = data;
                finished = true;
            };
            // cleanup() is a utility closure that removes the <script> from the page and
            // the response callback from the window. This logic is used in both the
            // success, error, and cancellation paths, so it's extracted out for convenience.
            var /** @type {?} */ cleanup = function () {
                // Remove the <script> tag if it's still on the page.
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                // Remove the response callback from the callbackMap (window object in the
                // browser).
                delete _this.callbackMap[callback];
            };
            // onLoad() is the success callback which runs after the response callback
            // if the JSONP script loads successfully. The event itself is unimportant.
            // If something went wrong, onLoad() may run without the response callback
            // having been invoked.
            var /** @type {?} */ onLoad = function (event) {
                // Do nothing if the request has been cancelled.
                if (cancelled) {
                    return;
                }
                // Cleanup the page.
                cleanup();
                // Check whether the response callback has run.
                if (!finished) {
                    // It hasn't, something went wrong with the request. Return an error via
                    // the Observable error path. All JSONP errors have status 0.
                    observer.error(new HttpErrorResponse({
                        url: url,
                        status: 0,
                        statusText: 'JSONP Error',
                        error: new Error(JSONP_ERR_NO_CALLBACK),
                    }));
                    return;
                }
                // Success. body either contains the response body or null if none was
                // returned.
                observer.next(new HttpResponse({
                    body: body,
                    status: 200,
                    statusText: 'OK', url: url,
                }));
                // Complete the stream, the resposne is over.
                observer.complete();
            };
            // onError() is the error callback, which runs if the script returned generates
            // a Javascript error. It emits the error via the Observable error channel as
            // a HttpErrorResponse.
            var /** @type {?} */ onError = function (error) {
                // If the request was already cancelled, no need to emit anything.
                if (cancelled) {
                    return;
                }
                cleanup();
                // Wrap the error in a HttpErrorResponse.
                observer.error(new HttpErrorResponse({
                    error: error,
                    status: 0,
                    statusText: 'JSONP Error', url: url,
                }));
            };
            // Subscribe to both the success (load) and error events on the <script> tag,
            // and add it to the page.
            node.addEventListener('load', onLoad);
            node.addEventListener('error', onError);
            _this.document.body.appendChild(node);
            // The request has now been successfully sent.
            observer.next({ type: HttpEventType.Sent });
            // Cancellation handler.
            return function () {
                // Track the cancellation so event listeners won't do anything even if already scheduled.
                cancelled = true;
                // Remove the event listeners so they won't run if the events later fire.
                node.removeEventListener('load', onLoad);
                node.removeEventListener('error', onError);
                // And finally, clean up the page.
                cleanup();
            };
        });
    };
    return JsonpClientBackend;
}());
JsonpClientBackend.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
JsonpClientBackend.ctorParameters = function () { return [
    { type: JsonpCallbackContext, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["a" /* DOCUMENT */],] },] },
]; };
/**
 * An `HttpInterceptor` which identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * \@experimental
 */
var JsonpInterceptor = (function () {
    /**
     * @param {?} jsonp
     */
    function JsonpInterceptor(jsonp) {
        this.jsonp = jsonp;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    JsonpInterceptor.prototype.intercept = function (req, next) {
        if (req.method === 'JSONP') {
            return this.jsonp.handle(/** @type {?} */ (req));
        }
        // Fall through for normal HTTP requests.
        return next.handle(req);
    };
    return JsonpInterceptor;
}());
JsonpInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
JsonpInterceptor.ctorParameters = function () { return [
    { type: JsonpClientBackend, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Determine an appropriate URL for the response, by checking either
 * XMLHttpRequest.responseURL or the X-Request-URL header.
 * @param {?} xhr
 * @return {?}
 */
function getResponseUrl(xhr) {
    if ('responseURL' in xhr && xhr.responseURL) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * A wrapper around the `XMLHttpRequest` constructor.
 *
 * \@experimental
 * @abstract
 */
var XhrFactory = (function () {
    function XhrFactory() {
    }
    /**
     * @abstract
     * @return {?}
     */
    XhrFactory.prototype.build = function () { };
    return XhrFactory;
}());
/**
 * A factory for \@{link HttpXhrBackend} that uses the `XMLHttpRequest` browser API.
 *
 * \@experimental
 */
var BrowserXhr = (function () {
    function BrowserXhr() {
    }
    /**
     * @return {?}
     */
    BrowserXhr.prototype.build = function () { return ((new XMLHttpRequest())); };
    return BrowserXhr;
}());
BrowserXhr.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BrowserXhr.ctorParameters = function () { return []; };
/**
 * An `HttpBackend` which uses the XMLHttpRequest API to send
 * requests to a backend server.
 *
 * \@experimental
 */
var HttpXhrBackend = (function () {
    /**
     * @param {?} xhrFactory
     */
    function HttpXhrBackend(xhrFactory) {
        this.xhrFactory = xhrFactory;
    }
    /**
     * Process a request and return a stream of response events.
     * @param {?} req
     * @return {?}
     */
    HttpXhrBackend.prototype.handle = function (req) {
        var _this = this;
        // Quick check to give a better error message when a user attempts to use
        // HttpClient.jsonp() without installing the JsonpClientModule
        if (req.method === 'JSONP') {
            throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
        }
        // Everything happens on Observable subscription.
        return new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (observer) {
            // Start by setting up the XHR object with request method, URL, and withCredentials flag.
            var /** @type {?} */ xhr = _this.xhrFactory.build();
            xhr.open(req.method, req.urlWithParams);
            if (!!req.withCredentials) {
                xhr.withCredentials = true;
            }
            // Add all the requested headers.
            req.headers.forEach(function (name, values) { return xhr.setRequestHeader(name, values.join(',')); });
            // Add an Accept header if one isn't present already.
            if (!req.headers.has('Accept')) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }
            // Auto-detect the Content-Type header if one isn't present already.
            if (!req.headers.has('Content-Type')) {
                var /** @type {?} */ detectedType = req.detectContentTypeHeader();
                // Sometimes Content-Type detection fails.
                if (detectedType !== null) {
                    xhr.setRequestHeader('Content-Type', detectedType);
                }
            }
            // Set the responseType if one was requested.
            if (req.responseType) {
                xhr.responseType = (req.responseType.toLowerCase());
            }
            // Serialize the request body if one is present. If not, this will be set to null.
            var /** @type {?} */ reqBody = req.serializeBody();
            // If progress events are enabled, response headers will be delivered
            // in two events - the HttpHeaderResponse event and the full HttpResponse
            // event. However, since response headers don't change in between these
            // two events, it doesn't make sense to parse them twice. So headerResponse
            // caches the data extracted from the response whenever it's first parsed,
            // to ensure parsing isn't duplicated.
            var /** @type {?} */ headerResponse = null;
            // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
            // state, and memoizes it into headerResponse.
            var /** @type {?} */ partialFromXhr = function () {
                if (headerResponse !== null) {
                    return headerResponse;
                }
                // Read status and normalize an IE9 bug (http://bugs.jquery.com/ticket/1450).
                var /** @type {?} */ status = xhr.status === 1223 ? 204 : xhr.status;
                var /** @type {?} */ statusText = xhr.statusText || 'OK';
                // Parse headers from XMLHttpRequest - this step is lazy.
                var /** @type {?} */ headers = new HttpHeaders(xhr.getAllResponseHeaders());
                // Read the response URL from the XMLHttpResponse instance and fall back on the
                // request URL.
                var /** @type {?} */ url = getResponseUrl(xhr) || req.url;
                // Construct the HttpHeaderResponse and memoize it.
                headerResponse = new HttpHeaderResponse({ headers: headers, status: status, statusText: statusText, url: url });
                return headerResponse;
            };
            // Next, a few closures are defined for the various events which XMLHttpRequest can
            // emit. This allows them to be unregistered as event listeners later.
            // First up is the load event, which represents a response being fully available.
            var /** @type {?} */ onLoad = function () {
                // Read response state from the memoized partial data.
                var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url;
                // The body will be read out if present.
                var /** @type {?} */ body = null;
                if (status !== 204) {
                    // Use XMLHttpRequest.response if set, responseText otherwise.
                    body = (typeof xhr.response === 'undefined') ? xhr.responseText : xhr.response;
                    // Strip a common XSSI prefix from string responses.
                    // TODO: determine if this behavior should be optional and moved to an interceptor.
                    if (typeof body === 'string') {
                        body = body.replace(XSSI_PREFIX, '');
                    }
                }
                // Normalize another potential bug (this one comes from CORS).
                if (status === 0) {
                    status = !!body ? 200 : 0;
                }
                // ok determines whether the response will be transmitted on the event or
                // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                // but a successful status code can still result in an error if the user
                // asked for JSON data and the body cannot be parsed as such.
                var /** @type {?} */ ok = status >= 200 && status < 300;
                // Check whether the body needs to be parsed as JSON (in many cases the browser
                // will have done that already).
                if (ok && typeof body === 'string' && req.responseType === 'json') {
                    // Attempt the parse. If it fails, a parse error should be delivered to the user.
                    try {
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        // Even though the response status was 2xx, this is still an error.
                        ok = false;
                        // The parse error contains the text of the body that failed to parse.
                        body = ({ error: error, text: body });
                    }
                }
                if (ok) {
                    // A successful response is delivered on the event stream.
                    observer.next(new HttpResponse({
                        body: body,
                        headers: headers,
                        status: status,
                        statusText: statusText,
                        url: url || undefined,
                    }));
                    // The full body has been received and delivered, no further events
                    // are possible. This request is complete.
                    observer.complete();
                }
                else {
                    // An unsuccessful request is delivered on the error channel.
                    observer.error(new HttpErrorResponse({
                        // The error in this case is the response body (error from the server).
                        error: body,
                        headers: headers,
                        status: status,
                        statusText: statusText,
                        url: url || undefined,
                    }));
                }
            };
            // The onError callback is called when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc. These are actual errors, and are
            // transmitted on the error channel.
            var /** @type {?} */ onError = function (error) {
                var /** @type {?} */ res = new HttpErrorResponse({
                    error: error,
                    status: xhr.status || 0,
                    statusText: xhr.statusText || 'Unknown Error',
                });
                observer.error(res);
            };
            // The sentHeaders flag tracks whether the HttpResponseHeaders event
            // has been sent on the stream. This is necessary to track if progress
            // is enabled since the event will be sent on only the first download
            // progerss event.
            var /** @type {?} */ sentHeaders = false;
            // The download progress event handler, which is only registered if
            // progress events are enabled.
            var /** @type {?} */ onDownProgress = function (event) {
                // Send the HttpResponseHeaders event if it hasn't been sent already.
                if (!sentHeaders) {
                    observer.next(partialFromXhr());
                    sentHeaders = true;
                }
                // Start building the download progress event to deliver on the response
                // event stream.
                var /** @type {?} */ progressEvent = {
                    type: HttpEventType.DownloadProgress,
                    loaded: event.loaded,
                };
                // Set the total number of bytes in the event if it's available.
                if (event.lengthComputable) {
                    progressEvent.total = event.total;
                }
                // If the request was for text content and a partial response is
                // available on XMLHttpRequest, include it in the progress event
                // to allow for streaming reads.
                if (req.responseType === 'text' && !!xhr.responseText) {
                    progressEvent.partialText = xhr.responseText;
                }
                // Finally, fire the event.
                observer.next(progressEvent);
            };
            // The upload progress event handler, which is only registered if
            // progress events are enabled.
            var /** @type {?} */ onUpProgress = function (event) {
                // Upload progress events are simpler. Begin building the progress
                // event.
                var /** @type {?} */ progress = {
                    type: HttpEventType.UploadProgress,
                    loaded: event.loaded,
                };
                // If the total number of bytes being uploaded is available, include
                // it.
                if (event.lengthComputable) {
                    progress.total = event.total;
                }
                // Send the event.
                observer.next(progress);
            };
            // By default, register for load and error events.
            xhr.addEventListener('load', onLoad);
            xhr.addEventListener('error', onError);
            // Progress events are only enabled if requested.
            if (req.reportProgress) {
                // Download progress is always enabled if requested.
                xhr.addEventListener('progress', onDownProgress);
                // Upload progress depends on whether there is a body to upload.
                if (reqBody !== null && xhr.upload) {
                    xhr.upload.addEventListener('progress', onUpProgress);
                }
            }
            // Fire the request, and notify the event stream that it was fired.
            xhr.send(reqBody);
            observer.next({ type: HttpEventType.Sent });
            // This is the return from the Observable function, which is the
            // request cancellation handler.
            return function () {
                // On a cancellation, remove all registered event listeners.
                xhr.removeEventListener('error', onError);
                xhr.removeEventListener('load', onLoad);
                if (req.reportProgress) {
                    xhr.removeEventListener('progress', onDownProgress);
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.removeEventListener('progress', onUpProgress);
                    }
                }
                // Finally, abort the in-flight request.
                xhr.abort();
            };
        });
    };
    return HttpXhrBackend;
}());
HttpXhrBackend.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
HttpXhrBackend.ctorParameters = function () { return [
    { type: XhrFactory, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSRF_COOKIE_NAME = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('XSRF_COOKIE_NAME');
var XSRF_HEADER_NAME = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('XSRF_HEADER_NAME');
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * \@experimental
 * @abstract
 */
var HttpXsrfTokenExtractor = (function () {
    function HttpXsrfTokenExtractor() {
    }
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     * @abstract
     * @return {?}
     */
    HttpXsrfTokenExtractor.prototype.getToken = function () { };
    return HttpXsrfTokenExtractor;
}());
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
var HttpXsrfCookieExtractor = (function () {
    /**
     * @param {?} doc
     * @param {?} platform
     * @param {?} cookieName
     */
    function HttpXsrfCookieExtractor(doc, platform, cookieName) {
        this.doc = doc;
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        /**
         * \@internal for testing
         */
        this.parseCount = 0;
    }
    /**
     * @return {?}
     */
    HttpXsrfCookieExtractor.prototype.getToken = function () {
        if (this.platform === 'server') {
            return null;
        }
        var /** @type {?} */ cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angular_common__["b" /* ɵparseCookieValue */])(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    };
    return HttpXsrfCookieExtractor;
}());
HttpXsrfCookieExtractor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
HttpXsrfCookieExtractor.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["a" /* DOCUMENT */],] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["PLATFORM_ID"],] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [XSRF_COOKIE_NAME,] },] },
]; };
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
var HttpXsrfInterceptor = (function () {
    /**
     * @param {?} tokenService
     * @param {?} headerName
     */
    function HttpXsrfInterceptor(tokenService, headerName) {
        this.tokenService = tokenService;
        this.headerName = headerName;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpXsrfInterceptor.prototype.intercept = function (req, next) {
        var /** @type {?} */ lcUrl = req.url.toLowerCase();
        // Skip both non-mutating requests and absolute URLs.
        // Non-mutating requests don't require a token, and absolute URLs require special handling
        // anyway as the cookie set
        // on our origin is not the same as the token expected by another origin.
        if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
            lcUrl.startsWith('https://')) {
            return next.handle(req);
        }
        var /** @type {?} */ token = this.tokenService.getToken();
        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }
        return next.handle(req);
    };
    return HttpXsrfInterceptor;
}());
HttpXsrfInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
HttpXsrfInterceptor.ctorParameters = function () { return [
    { type: HttpXsrfTokenExtractor, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [XSRF_HEADER_NAME,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Constructs an `HttpHandler` that applies a bunch of `HttpInterceptor`s
 * to a request before passing it to the given `HttpBackend`.
 *
 * Meant to be used as a factory function within `HttpClientModule`.
 *
 * \@experimental
 * @param {?} backend
 * @param {?=} interceptors
 * @return {?}
 */
function interceptingHandler(backend, interceptors) {
    if (interceptors === void 0) { interceptors = []; }
    if (!interceptors) {
        return backend;
    }
    return interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, backend);
}
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 * \@experimental
 * @return {?}
 */
function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
/**
 * `NgModule` which adds XSRF protection support to outgoing requests.
 *
 * Provided the server supports a cookie-based XSRF protection system, this
 * module can be used directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no such names are provided, the default is to use `X-XSRF-TOKEN` for
 * the header name and `XSRF-TOKEN` for the cookie name.
 *
 * \@experimental
 */
var HttpClientXsrfModule = (function () {
    function HttpClientXsrfModule() {
    }
    /**
     * Disable the default XSRF protection.
     * @return {?}
     */
    HttpClientXsrfModule.disable = function () {
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
            ],
        };
    };
    /**
     * Configure XSRF protection to use the given cookie name or header name,
     * or the default names (as described above) if not provided.
     * @param {?=} options
     * @return {?}
     */
    HttpClientXsrfModule.withOptions = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
            ],
        };
    };
    return HttpClientXsrfModule;
}());
HttpClientXsrfModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                providers: [
                    HttpXsrfInterceptor,
                    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientXsrfModule.ctorParameters = function () { return []; };
/**
 * `NgModule` which provides the `HttpClient` and associated services.
 *
 * Interceptors can be added to the chain behind `HttpClient` by binding them
 * to the multiprovider for `HTTP_INTERCEPTORS`.
 *
 * \@experimental
 */
var HttpClientModule = (function () {
    function HttpClientModule() {
    }
    return HttpClientModule;
}());
HttpClientModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                imports: [
                    HttpClientXsrfModule.withOptions({
                        cookieName: 'XSRF-TOKEN',
                        headerName: 'X-XSRF-TOKEN',
                    }),
                ],
                providers: [
                    HttpClient,
                    // HttpHandler is the backend + interceptors and is constructed
                    // using the interceptingHandler factory function.
                    {
                        provide: HttpHandler,
                        useFactory: interceptingHandler,
                        deps: [HttpBackend, [new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"](HTTP_INTERCEPTORS)]],
                    },
                    HttpXhrBackend,
                    { provide: HttpBackend, useExisting: HttpXhrBackend },
                    BrowserXhr,
                    { provide: XhrFactory, useExisting: BrowserXhr },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientModule.ctorParameters = function () { return []; };
/**
 * `NgModule` which enables JSONP support in `HttpClient`.
 *
 * Without this module, Jsonp requests will reach the backend
 * with method JSONP, where they'll be rejected.
 *
 * \@experimental
 */
var HttpClientJsonpModule = (function () {
    function HttpClientJsonpModule() {
    }
    return HttpClientJsonpModule;
}());
HttpClientJsonpModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                providers: [
                    JsonpClientBackend,
                    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
                    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientJsonpModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=http.es5.js.map


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_filterer_routes_filterer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__links_generator_links_generator__ = __webpack_require__(37);




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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constructor_constructor__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initializer_initializer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__token_setter_token_setter__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__token_remover_token_remover__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__token_getter_token_getter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__http_wrappers_http_wrappers__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClientPlusModule; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









__WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* HttpClientPlus */].prototype, __assign({ init: __WEBPACK_IMPORTED_MODULE_4__initializer_initializer__["a" /* default */],
    getToken: __WEBPACK_IMPORTED_MODULE_7__token_getter_token_getter__["a" /* default */],
    setToken: __WEBPACK_IMPORTED_MODULE_5__token_setter_token_setter__["a" /* default */],
    removeToken: __WEBPACK_IMPORTED_MODULE_6__token_remover_token_remover__["a" /* default */] }, __WEBPACK_IMPORTED_MODULE_8__http_wrappers_http_wrappers__["a" /* default */]));
var HttpClientPlusModule = (function () {
    function HttpClientPlusModule() {
    }
    HttpClientPlusModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClientModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* HttpClientPlus */]]
        })
    ], HttpClientPlusModule);
    return HttpClientPlusModule;
}());



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_auto_logout_handler__ = __webpack_require__(32);

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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

/* harmony default export */ __webpack_exports__["a"] = function (route, roleName) {
    route = __WEBPACK_IMPORTED_MODULE_0_lodash__["omit"](route, ['children']);
    return __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](route, { children: [], role: roleName });
};;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = __extends;
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(60);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ng_http_client_plus__["b" /* HttpClientPlus */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], Guardian);
    return Guardian;
}());



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__roles_assembler_roles_assembler__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__redirect_capturer_redirect_capturer__ = __webpack_require__(33);





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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function () {
    return this.linksPublisher.asObservable();
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auto_logout_setter_auto_logout_setter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__role_setter_role_setter__ = __webpack_require__(7);



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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auto_logout_setter_auto_logout_setter__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__role_setter_role_setter__ = __webpack_require__(7);


/* harmony default export */ __webpack_exports__["a"] = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__auto_logout_setter_auto_logout_setter__["a" /* default */])('remove');
    __WEBPACK_IMPORTED_MODULE_1__role_setter_role_setter__["a" /* default */].call(this, 'noAuth');
    this.http.removeToken();
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_vars__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["a"] = function (roleName) {
    return __WEBPACK_IMPORTED_MODULE_0__lib_vars__["a" /* roles */][roleName];
};


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* unused harmony export NgLocaleLocalization */
/* unused harmony export NgLocalization */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseCookieValue; });
/* unused harmony export CommonModule */
/* unused harmony export NgClass */
/* unused harmony export NgFor */
/* unused harmony export NgForOf */
/* unused harmony export NgForOfContext */
/* unused harmony export NgIf */
/* unused harmony export NgIfContext */
/* unused harmony export NgPlural */
/* unused harmony export NgPluralCase */
/* unused harmony export NgStyle */
/* unused harmony export NgSwitch */
/* unused harmony export NgSwitchCase */
/* unused harmony export NgSwitchDefault */
/* unused harmony export NgTemplateOutlet */
/* unused harmony export NgComponentOutlet */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOCUMENT; });
/* unused harmony export AsyncPipe */
/* unused harmony export DatePipe */
/* unused harmony export I18nPluralPipe */
/* unused harmony export I18nSelectPipe */
/* unused harmony export JsonPipe */
/* unused harmony export LowerCasePipe */
/* unused harmony export CurrencyPipe */
/* unused harmony export DecimalPipe */
/* unused harmony export PercentPipe */
/* unused harmony export SlicePipe */
/* unused harmony export UpperCasePipe */
/* unused harmony export TitleCasePipe */
/* unused harmony export ɵPLATFORM_BROWSER_ID */
/* unused harmony export ɵPLATFORM_SERVER_ID */
/* unused harmony export ɵPLATFORM_WORKER_APP_ID */
/* unused harmony export ɵPLATFORM_WORKER_UI_ID */
/* unused harmony export isPlatformBrowser */
/* unused harmony export isPlatformServer */
/* unused harmony export isPlatformWorkerApp */
/* unused harmony export isPlatformWorkerUi */
/* unused harmony export VERSION */
/* unused harmony export PlatformLocation */
/* unused harmony export LOCATION_INITIALIZED */
/* unused harmony export LocationStrategy */
/* unused harmony export APP_BASE_HREF */
/* unused harmony export HashLocationStrategy */
/* unused harmony export PathLocationStrategy */
/* unused harmony export Location */
/* unused harmony export ɵa */
/* unused harmony export ɵb */

/**
 * @license Angular v4.3.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This class should not be used directly by an application developer. Instead, use
 * {\@link Location}.
 *
 * `PlatformLocation` encapsulates all calls to DOM apis, which allows the Router to be platform
 * agnostic.
 * This means that we can have different implementation of `PlatformLocation` for the different
 * platforms that angular supports. For example, `\@angular/platform-browser` provides an
 * implementation specific to the browser environment, while `\@angular/platform-webworker` provides
 * one suitable for use with web workers.
 *
 * The `PlatformLocation` class is used directly by all implementations of {\@link LocationStrategy}
 * when they need to interact with the DOM apis like pushState, popState, etc...
 *
 * {\@link LocationStrategy} in turn is used by the {\@link Location} service which is used directly
 * by the {\@link Router} in order to navigate between routes. Since all interactions between {\@link
 * Router} /
 * {\@link Location} / {\@link LocationStrategy} and DOM apis flow through the `PlatformLocation`
 * class they are all platform independent.
 *
 * \@stable
 * @abstract
 */
var PlatformLocation = (function () {
    function PlatformLocation() {
    }
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.getBaseHrefFromDOM = function () { };
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    PlatformLocation.prototype.onPopState = function (fn) { };
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    PlatformLocation.prototype.onHashChange = function (fn) { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.pathname = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.search = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.hash = function () { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    PlatformLocation.prototype.replaceState = function (state, title, url) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    PlatformLocation.prototype.pushState = function (state, title, url) { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.forward = function () { };
    /**
     * @abstract
     * @return {?}
     */
    PlatformLocation.prototype.back = function () { };
    return PlatformLocation;
}());
/**
 * \@whatItDoes indicates when a location is initialized
 * \@experimental
 */
var LOCATION_INITIALIZED = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('Location Initialized');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `LocationStrategy` is responsible for representing and reading route state
 * from the browser's URL. Angular provides two strategies:
 * {\@link HashLocationStrategy} and {\@link PathLocationStrategy}.
 *
 * This is used under the hood of the {\@link Location} service.
 *
 * Applications should use the {\@link Router} or {\@link Location} services to
 * interact with application route state.
 *
 * For instance, {\@link HashLocationStrategy} produces URLs like
 * `http://example.com#/foo`, and {\@link PathLocationStrategy} produces
 * `http://example.com/foo` as an equivalent URL.
 *
 * See these two classes for more.
 *
 * \@stable
 * @abstract
 */
var LocationStrategy = (function () {
    function LocationStrategy() {
    }
    /**
     * @abstract
     * @param {?=} includeHash
     * @return {?}
     */
    LocationStrategy.prototype.path = function (includeHash) { };
    /**
     * @abstract
     * @param {?} internal
     * @return {?}
     */
    LocationStrategy.prototype.prepareExternalUrl = function (internal) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    LocationStrategy.prototype.pushState = function (state, title, url, queryParams) { };
    /**
     * @abstract
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    LocationStrategy.prototype.replaceState = function (state, title, url, queryParams) { };
    /**
     * @abstract
     * @return {?}
     */
    LocationStrategy.prototype.forward = function () { };
    /**
     * @abstract
     * @return {?}
     */
    LocationStrategy.prototype.back = function () { };
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    LocationStrategy.prototype.onPopState = function (fn) { };
    /**
     * @abstract
     * @return {?}
     */
    LocationStrategy.prototype.getBaseHref = function () { };
    return LocationStrategy;
}());
/**
 * The `APP_BASE_HREF` token represents the base href to be used with the
 * {\@link PathLocationStrategy}.
 *
 * If you're using {\@link PathLocationStrategy}, you must provide a provider to a string
 * representing the URL prefix that should be preserved when generating and recognizing
 * URLs.
 *
 * ### Example
 *
 * ```typescript
 * import {Component, NgModule} from '\@angular/core';
 * import {APP_BASE_HREF} from '\@angular/common';
 *
 * \@NgModule({
 *   providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
 * })
 * class AppModule {}
 * ```
 *
 * \@stable
 */
var APP_BASE_HREF = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('appBaseHref');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes `Location` is a service that applications can use to interact with a browser's URL.
 * \@description
 * Depending on which {\@link LocationStrategy} is used, `Location` will either persist
 * to the URL's path or the URL's hash segment.
 *
 * Note: it's better to use {\@link Router#navigate} service to trigger route changes. Use
 * `Location` only if you need to interact with or create normalized URLs outside of
 * routing.
 *
 * `Location` is responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
 *
 * ### Example
 * {\@example common/location/ts/path_location_component.ts region='LocationComponent'}
 * \@stable
 */
var Location = (function () {
    /**
     * @param {?} platformStrategy
     */
    function Location(platformStrategy) {
        var _this = this;
        /**
         * \@internal
         */
        this._subject = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this._platformStrategy = platformStrategy;
        var browserBaseHref = this._platformStrategy.getBaseHref();
        this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
        this._platformStrategy.onPopState(function (ev) {
            _this._subject.emit({
                'url': _this.path(true),
                'pop': true,
                'type': ev.type,
            });
        });
    }
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    Location.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.normalize(this._platformStrategy.path(includeHash));
    };
    /**
     * Normalizes the given path and compares to the current normalized path.
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    Location.prototype.isCurrentPathEqualTo = function (path, query) {
        if (query === void 0) { query = ''; }
        return this.path() == this.normalize(path + Location.normalizeQueryParams(query));
    };
    /**
     * Given a string representing a URL, returns the normalized URL path without leading or
     * trailing slashes.
     * @param {?} url
     * @return {?}
     */
    Location.prototype.normalize = function (url) {
        return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
    };
    /**
     * Given a string representing a URL, returns the platform-specific external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing. This method will also add a hash if `HashLocationStrategy` is
     * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     * @param {?} url
     * @return {?}
     */
    Location.prototype.prepareExternalUrl = function (url) {
        if (url && url[0] !== '/') {
            url = '/' + url;
        }
        return this._platformStrategy.prepareExternalUrl(url);
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    Location.prototype.go = function (path, query) {
        if (query === void 0) { query = ''; }
        this._platformStrategy.pushState(null, '', path, query);
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    Location.prototype.replaceState = function (path, query) {
        if (query === void 0) { query = ''; }
        this._platformStrategy.replaceState(null, '', path, query);
    };
    /**
     * Navigates forward in the platform's history.
     * @return {?}
     */
    Location.prototype.forward = function () { this._platformStrategy.forward(); };
    /**
     * Navigates back in the platform's history.
     * @return {?}
     */
    Location.prototype.back = function () { this._platformStrategy.back(); };
    /**
     * Subscribe to the platform's `popState` events.
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
        return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
    };
    /**
     * Given a string of url parameters, prepend with '?' if needed, otherwise return parameters as
     * is.
     * @param {?} params
     * @return {?}
     */
    Location.normalizeQueryParams = function (params) {
        return params && params[0] !== '?' ? '?' + params : params;
    };
    /**
     * Given 2 parts of a url, join them with a slash if needed.
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    Location.joinWithSlash = function (start, end) {
        if (start.length == 0) {
            return end;
        }
        if (end.length == 0) {
            return start;
        }
        var /** @type {?} */ slashes = 0;
        if (start.endsWith('/')) {
            slashes++;
        }
        if (end.startsWith('/')) {
            slashes++;
        }
        if (slashes == 2) {
            return start + end.substring(1);
        }
        if (slashes == 1) {
            return start + end;
        }
        return start + '/' + end;
    };
    /**
     * If url has a trailing slash, remove it, otherwise return url as is. This
     * method looks for the first occurence of either #, ?, or the end of the
     * line as `/` characters after any of these should not be replaced.
     * @param {?} url
     * @return {?}
     */
    Location.stripTrailingSlash = function (url) {
        var /** @type {?} */ match = url.match(/#|\?|$/);
        var /** @type {?} */ pathEndIdx = match && match.index || url.length;
        var /** @type {?} */ droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === '/' ? 1 : 0);
        return url.slice(0, droppedSlashIdx) + url.slice(pathEndIdx);
    };
    return Location;
}());
Location.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
Location.ctorParameters = function () { return [
    { type: LocationStrategy, },
]; };
/**
 * @param {?} baseHref
 * @param {?} url
 * @return {?}
 */
function _stripBaseHref(baseHref, url) {
    return baseHref && url.startsWith(baseHref) ? url.substring(baseHref.length) : url;
}
/**
 * @param {?} url
 * @return {?}
 */
function _stripIndexHtml(url) {
    return url.replace(/\/index.html$/, '');
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Use URL hash for storing application location data.
 * \@description
 * `HashLocationStrategy` is a {\@link LocationStrategy} used to configure the
 * {\@link Location} service to represent its state in the
 * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
 * of the browser's URL.
 *
 * For instance, if you call `location.go('/foo')`, the browser's URL will become
 * `example.com#/foo`.
 *
 * ### Example
 *
 * {\@example common/location/ts/hash_location_component.ts region='LocationComponent'}
 *
 * \@stable
 */
var HashLocationStrategy = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HashLocationStrategy, _super);
    /**
     * @param {?} _platformLocation
     * @param {?=} _baseHref
     */
    function HashLocationStrategy(_platformLocation, _baseHref) {
        var _this = _super.call(this) || this;
        _this._platformLocation = _platformLocation;
        _this._baseHref = '';
        if (_baseHref != null) {
            _this._baseHref = _baseHref;
        }
        return _this;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    HashLocationStrategy.prototype.onPopState = function (fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
    };
    /**
     * @return {?}
     */
    HashLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    HashLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        // the hash value is always prefixed with a `#`
        // and if it is empty then it will stay empty
        var /** @type {?} */ path = this._platformLocation.hash;
        if (path == null)
            path = '#';
        return path.length > 0 ? path.substring(1) : path;
    };
    /**
     * @param {?} internal
     * @return {?}
     */
    HashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        var /** @type {?} */ url = Location.joinWithSlash(this._baseHref, internal);
        return url.length > 0 ? ('#' + url) : url;
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    HashLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
        var /** @type {?} */ url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.pushState(state, title, url);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    HashLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
        var /** @type {?} */ url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.replaceState(state, title, url);
    };
    /**
     * @return {?}
     */
    HashLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
    /**
     * @return {?}
     */
    HashLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
    return HashLocationStrategy;
}(LocationStrategy));
HashLocationStrategy.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
HashLocationStrategy.ctorParameters = function () { return [
    { type: PlatformLocation, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [APP_BASE_HREF,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Use URL for storing application location data.
 * \@description
 * `PathLocationStrategy` is a {\@link LocationStrategy} used to configure the
 * {\@link Location} service to represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * If you're using `PathLocationStrategy`, you must provide a {\@link APP_BASE_HREF}
 * or add a base element to the document. This URL prefix that will be preserved
 * when generating and recognizing URLs.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * Similarly, if you add `<base href='/my/app'/>` to the document and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * ### Example
 *
 * {\@example common/location/ts/path_location_component.ts region='LocationComponent'}
 *
 * \@stable
 */
var PathLocationStrategy = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](PathLocationStrategy, _super);
    /**
     * @param {?} _platformLocation
     * @param {?=} href
     */
    function PathLocationStrategy(_platformLocation, href) {
        var _this = _super.call(this) || this;
        _this._platformLocation = _platformLocation;
        if (href == null) {
            href = _this._platformLocation.getBaseHrefFromDOM();
        }
        if (href == null) {
            throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
        }
        _this._baseHref = href;
        return _this;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    PathLocationStrategy.prototype.onPopState = function (fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
    };
    /**
     * @return {?}
     */
    PathLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
    /**
     * @param {?} internal
     * @return {?}
     */
    PathLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        return Location.joinWithSlash(this._baseHref, internal);
    };
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    PathLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        var /** @type {?} */ pathname = this._platformLocation.pathname +
            Location.normalizeQueryParams(this._platformLocation.search);
        var /** @type {?} */ hash = this._platformLocation.hash;
        return hash && includeHash ? "" + pathname + hash : pathname;
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    PathLocationStrategy.prototype.pushState = function (state, title, url, queryParams) {
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.pushState(state, title, externalUrl);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    PathLocationStrategy.prototype.replaceState = function (state, title, url, queryParams) {
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.replaceState(state, title, externalUrl);
    };
    /**
     * @return {?}
     */
    PathLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
    /**
     * @return {?}
     */
    PathLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
    return PathLocationStrategy;
}(LocationStrategy));
PathLocationStrategy.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
PathLocationStrategy.ctorParameters = function () { return [
    { type: PlatformLocation, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [APP_BASE_HREF,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental
 * @abstract
 */
var NgLocalization = (function () {
    function NgLocalization() {
    }
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgLocalization.prototype.getPluralCategory = function (value) { };
    return NgLocalization;
}());
/**
 * Returns the plural category for a given value.
 * - "=value" when the case exists,
 * - the plural category otherwise
 *
 * \@internal
 * @param {?} value
 * @param {?} cases
 * @param {?} ngLocalization
 * @return {?}
 */
function getPluralCategory(value, cases, ngLocalization) {
    var /** @type {?} */ key = "=" + value;
    if (cases.indexOf(key) > -1) {
        return key;
    }
    key = ngLocalization.getPluralCategory(value);
    if (cases.indexOf(key) > -1) {
        return key;
    }
    if (cases.indexOf('other') > -1) {
        return 'other';
    }
    throw new Error("No plural message found for value \"" + value + "\"");
}
/**
 * Returns the plural case based on the locale
 *
 * \@experimental
 */
var NgLocaleLocalization = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](NgLocaleLocalization, _super);
    /**
     * @param {?} locale
     */
    function NgLocaleLocalization(locale) {
        var _this = _super.call(this) || this;
        _this.locale = locale;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NgLocaleLocalization.prototype.getPluralCategory = function (value) {
        var /** @type {?} */ plural = getPluralCase(this.locale, value);
        switch (plural) {
            case Plural.Zero:
                return 'zero';
            case Plural.One:
                return 'one';
            case Plural.Two:
                return 'two';
            case Plural.Few:
                return 'few';
            case Plural.Many:
                return 'many';
            default:
                return 'other';
        }
    };
    return NgLocaleLocalization;
}(NgLocalization));
NgLocaleLocalization.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
NgLocaleLocalization.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"],] },] },
]; };
var Plural = {};
Plural.Zero = 0;
Plural.One = 1;
Plural.Two = 2;
Plural.Few = 3;
Plural.Many = 4;
Plural.Other = 5;
Plural[Plural.Zero] = "Zero";
Plural[Plural.One] = "One";
Plural[Plural.Two] = "Two";
Plural[Plural.Few] = "Few";
Plural[Plural.Many] = "Many";
Plural[Plural.Other] = "Other";
/**
 * Returns the plural case based on the locale
 *
 * \@experimental
 * @param {?} locale
 * @param {?} nLike
 * @return {?}
 */
function getPluralCase(locale, nLike) {
    // TODO(vicb): lazy compute
    if (typeof nLike === 'string') {
        nLike = parseInt(/** @type {?} */ (nLike), 10);
    }
    var /** @type {?} */ n = (nLike);
    var /** @type {?} */ nDecimal = n.toString().replace(/^[^.]*\.?/, '');
    var /** @type {?} */ i = Math.floor(Math.abs(n));
    var /** @type {?} */ v = nDecimal.length;
    var /** @type {?} */ f = parseInt(nDecimal, 10);
    var /** @type {?} */ t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ''), 10) || 0;
    var /** @type {?} */ lang = locale.split('-')[0].toLowerCase();
    switch (lang) {
        case 'af':
        case 'asa':
        case 'az':
        case 'bem':
        case 'bez':
        case 'bg':
        case 'brx':
        case 'ce':
        case 'cgg':
        case 'chr':
        case 'ckb':
        case 'ee':
        case 'el':
        case 'eo':
        case 'es':
        case 'eu':
        case 'fo':
        case 'fur':
        case 'gsw':
        case 'ha':
        case 'haw':
        case 'hu':
        case 'jgo':
        case 'jmc':
        case 'ka':
        case 'kk':
        case 'kkj':
        case 'kl':
        case 'ks':
        case 'ksb':
        case 'ky':
        case 'lb':
        case 'lg':
        case 'mas':
        case 'mgo':
        case 'ml':
        case 'mn':
        case 'nb':
        case 'nd':
        case 'ne':
        case 'nn':
        case 'nnh':
        case 'nyn':
        case 'om':
        case 'or':
        case 'os':
        case 'ps':
        case 'rm':
        case 'rof':
        case 'rwk':
        case 'saq':
        case 'seh':
        case 'sn':
        case 'so':
        case 'sq':
        case 'ta':
        case 'te':
        case 'teo':
        case 'tk':
        case 'tr':
        case 'ug':
        case 'uz':
        case 'vo':
        case 'vun':
        case 'wae':
        case 'xog':
            if (n === 1)
                return Plural.One;
            return Plural.Other;
        case 'ak':
        case 'ln':
        case 'mg':
        case 'pa':
        case 'ti':
            if (n === Math.floor(n) && n >= 0 && n <= 1)
                return Plural.One;
            return Plural.Other;
        case 'am':
        case 'as':
        case 'bn':
        case 'fa':
        case 'gu':
        case 'hi':
        case 'kn':
        case 'mr':
        case 'zu':
            if (i === 0 || n === 1)
                return Plural.One;
            return Plural.Other;
        case 'ar':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10)
                return Plural.Few;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99)
                return Plural.Many;
            return Plural.Other;
        case 'ast':
        case 'ca':
        case 'de':
        case 'en':
        case 'et':
        case 'fi':
        case 'fy':
        case 'gl':
        case 'it':
        case 'nl':
        case 'sv':
        case 'sw':
        case 'ur':
        case 'yi':
            if (i === 1 && v === 0)
                return Plural.One;
            return Plural.Other;
        case 'be':
            if (n % 10 === 1 && !(n % 100 === 11))
                return Plural.One;
            if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 4 &&
                !(n % 100 >= 12 && n % 100 <= 14))
                return Plural.Few;
            if (n % 10 === 0 || n % 10 === Math.floor(n % 10) && n % 10 >= 5 && n % 10 <= 9 ||
                n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'br':
            if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 || n % 100 === 91))
                return Plural.One;
            if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 || n % 100 === 92))
                return Plural.Two;
            if (n % 10 === Math.floor(n % 10) && (n % 10 >= 3 && n % 10 <= 4 || n % 10 === 9) &&
                !(n % 100 >= 10 && n % 100 <= 19 || n % 100 >= 70 && n % 100 <= 79 ||
                    n % 100 >= 90 && n % 100 <= 99))
                return Plural.Few;
            if (!(n === 0) && n % 1e6 === 0)
                return Plural.Many;
            return Plural.Other;
        case 'bs':
        case 'hr':
        case 'sr':
            if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11))
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14) ||
                f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
                    !(f % 100 >= 12 && f % 100 <= 14))
                return Plural.Few;
            return Plural.Other;
        case 'cs':
        case 'sk':
            if (i === 1 && v === 0)
                return Plural.One;
            if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0)
                return Plural.Few;
            if (!(v === 0))
                return Plural.Many;
            return Plural.Other;
        case 'cy':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n === 3)
                return Plural.Few;
            if (n === 6)
                return Plural.Many;
            return Plural.Other;
        case 'da':
            if (n === 1 || !(t === 0) && (i === 0 || i === 1))
                return Plural.One;
            return Plural.Other;
        case 'dsb':
        case 'hsb':
            if (v === 0 && i % 100 === 1 || f % 100 === 1)
                return Plural.One;
            if (v === 0 && i % 100 === 2 || f % 100 === 2)
                return Plural.Two;
            if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 ||
                f % 100 === Math.floor(f % 100) && f % 100 >= 3 && f % 100 <= 4)
                return Plural.Few;
            return Plural.Other;
        case 'ff':
        case 'fr':
        case 'hy':
        case 'kab':
            if (i === 0 || i === 1)
                return Plural.One;
            return Plural.Other;
        case 'fil':
            if (v === 0 && (i === 1 || i === 2 || i === 3) ||
                v === 0 && !(i % 10 === 4 || i % 10 === 6 || i % 10 === 9) ||
                !(v === 0) && !(f % 10 === 4 || f % 10 === 6 || f % 10 === 9))
                return Plural.One;
            return Plural.Other;
        case 'ga':
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n === Math.floor(n) && n >= 3 && n <= 6)
                return Plural.Few;
            if (n === Math.floor(n) && n >= 7 && n <= 10)
                return Plural.Many;
            return Plural.Other;
        case 'gd':
            if (n === 1 || n === 11)
                return Plural.One;
            if (n === 2 || n === 12)
                return Plural.Two;
            if (n === Math.floor(n) && (n >= 3 && n <= 10 || n >= 13 && n <= 19))
                return Plural.Few;
            return Plural.Other;
        case 'gv':
            if (v === 0 && i % 10 === 1)
                return Plural.One;
            if (v === 0 && i % 10 === 2)
                return Plural.Two;
            if (v === 0 &&
                (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80))
                return Plural.Few;
            if (!(v === 0))
                return Plural.Many;
            return Plural.Other;
        case 'he':
            if (i === 1 && v === 0)
                return Plural.One;
            if (i === 2 && v === 0)
                return Plural.Two;
            if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0)
                return Plural.Many;
            return Plural.Other;
        case 'is':
            if (t === 0 && i % 10 === 1 && !(i % 100 === 11) || !(t === 0))
                return Plural.One;
            return Plural.Other;
        case 'ksh':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            return Plural.Other;
        case 'kw':
        case 'naq':
        case 'se':
        case 'smn':
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            return Plural.Other;
        case 'lag':
            if (n === 0)
                return Plural.Zero;
            if ((i === 0 || i === 1) && !(n === 0))
                return Plural.One;
            return Plural.Other;
        case 'lt':
            if (n % 10 === 1 && !(n % 100 >= 11 && n % 100 <= 19))
                return Plural.One;
            if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 9 &&
                !(n % 100 >= 11 && n % 100 <= 19))
                return Plural.Few;
            if (!(f === 0))
                return Plural.Many;
            return Plural.Other;
        case 'lv':
        case 'prg':
            if (n % 10 === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19 ||
                v === 2 && f % 100 === Math.floor(f % 100) && f % 100 >= 11 && f % 100 <= 19)
                return Plural.Zero;
            if (n % 10 === 1 && !(n % 100 === 11) || v === 2 && f % 10 === 1 && !(f % 100 === 11) ||
                !(v === 2) && f % 10 === 1)
                return Plural.One;
            return Plural.Other;
        case 'mk':
            if (v === 0 && i % 10 === 1 || f % 10 === 1)
                return Plural.One;
            return Plural.Other;
        case 'mt':
            if (n === 1)
                return Plural.One;
            if (n === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 2 && n % 100 <= 10)
                return Plural.Few;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19)
                return Plural.Many;
            return Plural.Other;
        case 'pl':
            if (i === 1 && v === 0)
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14))
                return Plural.Few;
            if (v === 0 && !(i === 1) && i % 10 === Math.floor(i % 10) && i % 10 >= 0 && i % 10 <= 1 ||
                v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 12 && i % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'pt':
            if (n === Math.floor(n) && n >= 0 && n <= 2 && !(n === 2))
                return Plural.One;
            return Plural.Other;
        case 'ro':
            if (i === 1 && v === 0)
                return Plural.One;
            if (!(v === 0) || n === 0 ||
                !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
                return Plural.Few;
            return Plural.Other;
        case 'ru':
        case 'uk':
            if (v === 0 && i % 10 === 1 && !(i % 100 === 11))
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14))
                return Plural.Few;
            if (v === 0 && i % 10 === 0 ||
                v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'shi':
            if (i === 0 || n === 1)
                return Plural.One;
            if (n === Math.floor(n) && n >= 2 && n <= 10)
                return Plural.Few;
            return Plural.Other;
        case 'si':
            if (n === 0 || n === 1 || i === 0 && f === 1)
                return Plural.One;
            return Plural.Other;
        case 'sl':
            if (v === 0 && i % 100 === 1)
                return Plural.One;
            if (v === 0 && i % 100 === 2)
                return Plural.Two;
            if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0))
                return Plural.Few;
            return Plural.Other;
        case 'tzm':
            if (n === Math.floor(n) && n >= 0 && n <= 1 || n === Math.floor(n) && n >= 11 && n <= 99)
                return Plural.One;
            return Plural.Other;
        // When there is no specification, the default is always "other"
        // Spec: http://cldr.unicode.org/index/cldr-spec/plural-rules
        // > other (required—general plural form — also used if the language only has a single form)
        default:
            return Plural.Other;
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @param {?} cookieStr
 * @param {?} name
 * @return {?}
 */
function parseCookieValue(cookieStr, name) {
    name = encodeURIComponent(name);
    for (var _i = 0, _a = cookieStr.split(';'); _i < _a.length; _i++) {
        var cookie = _a[_i];
        var /** @type {?} */ eqIndex = cookie.indexOf('=');
        var _b = eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)], cookieName = _b[0], cookieValue = _b[1];
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Adds and removes CSS classes on an HTML element.
 *
 * \@howToUse
 * ```
 *     <some-element [ngClass]="'first second'">...</some-element>
 *
 *     <some-element [ngClass]="['first', 'second']">...</some-element>
 *
 *     <some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
 *
 *     <some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>
 *
 *     <some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
 * ```
 *
 * \@description
 *
 * The CSS classes are updated as follows, depending on the type of the expression evaluation:
 * - `string` - the CSS classes listed in the string (space delimited) are added,
 * - `Array` - the CSS classes declared as Array elements are added,
 * - `Object` - keys are CSS classes that get added when the expression given in the value
 *              evaluates to a truthy value, otherwise they are removed.
 *
 * \@stable
 */
var NgClass = (function () {
    /**
     * @param {?} _iterableDiffers
     * @param {?} _keyValueDiffers
     * @param {?} _ngEl
     * @param {?} _renderer
     */
    function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._initialClasses = [];
    }
    Object.defineProperty(NgClass.prototype, "klass", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._applyInitialClasses(true);
            this._initialClasses = typeof v === 'string' ? v.split(/\s+/) : [];
            this._applyInitialClasses(false);
            this._applyClasses(this._rawClass, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgClass.prototype, "ngClass", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._cleanupClasses(this._rawClass);
            this._iterableDiffer = null;
            this._keyValueDiffer = null;
            this._rawClass = typeof v === 'string' ? v.split(/\s+/) : v;
            if (this._rawClass) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵisListLikeIterable"])(this._rawClass)) {
                    this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create();
                }
                else {
                    this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgClass.prototype.ngDoCheck = function () {
        if (this._iterableDiffer) {
            var /** @type {?} */ iterableChanges = this._iterableDiffer.diff(/** @type {?} */ (this._rawClass));
            if (iterableChanges) {
                this._applyIterableChanges(iterableChanges);
            }
        }
        else if (this._keyValueDiffer) {
            var /** @type {?} */ keyValueChanges = this._keyValueDiffer.diff(/** @type {?} */ (this._rawClass));
            if (keyValueChanges) {
                this._applyKeyValueChanges(keyValueChanges);
            }
        }
    };
    /**
     * @param {?} rawClassVal
     * @return {?}
     */
    NgClass.prototype._cleanupClasses = function (rawClassVal) {
        this._applyClasses(rawClassVal, true);
        this._applyInitialClasses(false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgClass.prototype._applyKeyValueChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { return _this._toggleClass(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { return _this._toggleClass(record.key, record.currentValue); });
        changes.forEachRemovedItem(function (record) {
            if (record.previousValue) {
                _this._toggleClass(record.key, false);
            }
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgClass.prototype._applyIterableChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) {
            if (typeof record.item === 'string') {
                _this._toggleClass(record.item, true);
            }
            else {
                throw new Error("NgClass can only toggle CSS classes expressed as strings, got " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵstringify"])(record.item));
            }
        });
        changes.forEachRemovedItem(function (record) { return _this._toggleClass(record.item, false); });
    };
    /**
     * @param {?} isCleanup
     * @return {?}
     */
    NgClass.prototype._applyInitialClasses = function (isCleanup) {
        var _this = this;
        this._initialClasses.forEach(function (klass) { return _this._toggleClass(klass, !isCleanup); });
    };
    /**
     * @param {?} rawClassVal
     * @param {?} isCleanup
     * @return {?}
     */
    NgClass.prototype._applyClasses = function (rawClassVal, isCleanup) {
        var _this = this;
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                ((rawClassVal)).forEach(function (klass) { return _this._toggleClass(klass, !isCleanup); });
            }
            else {
                Object.keys(rawClassVal).forEach(function (klass) {
                    if (rawClassVal[klass] != null)
                        _this._toggleClass(klass, !isCleanup);
                });
            }
        }
    };
    /**
     * @param {?} klass
     * @param {?} enabled
     * @return {?}
     */
    NgClass.prototype._toggleClass = function (klass, enabled) {
        var _this = this;
        klass = klass.trim();
        if (klass) {
            klass.split(/\s+/g).forEach(function (klass) { _this._renderer.setElementClass(_this._ngEl.nativeElement, klass, !!enabled); });
        }
    };
    return NgClass;
}());
NgClass.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngClass]' },] },
];
/**
 * @nocollapse
 */
NgClass.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"], },
]; };
NgClass.propDecorators = {
    'klass': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['class',] },],
    'ngClass': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Instantiates a single {\@link Component} type and inserts its Host View into current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will get destroyed.
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInjector`: Optional custom {\@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if exists.
 *
 * * `ngComponentOutletNgModuleFactory`: Optional module factory to allow dynamically loading other
 * module, then load a component from that module.
 *
 * ### Syntax
 *
 * Simple
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * Customized injector/content
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized ngModuleFactory
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModuleFactory: moduleFactory;">
 * </ng-container>
 * ```
 * ## Example
 *
 * {\@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {\@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}
 * A more complete example with ngModuleFactory:
 *
 * {\@example common/ngComponentOutlet/ts/module.ts region='NgModuleFactoryExample'}
 *
 * \@experimental
 */
var NgComponentOutlet = (function () {
    /**
     * @param {?} _viewContainerRef
     */
    function NgComponentOutlet(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        this._componentRef = null;
        this._moduleRef = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgComponentOutlet.prototype.ngOnChanges = function (changes) {
        this._viewContainerRef.clear();
        this._componentRef = null;
        if (this.ngComponentOutlet) {
            var /** @type {?} */ elInjector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
            if (changes['ngComponentOutletNgModuleFactory']) {
                if (this._moduleRef)
                    this._moduleRef.destroy();
                if (this.ngComponentOutletNgModuleFactory) {
                    var /** @type {?} */ parentModule = elInjector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModuleRef"]);
                    this._moduleRef = this.ngComponentOutletNgModuleFactory.create(parentModule.injector);
                }
                else {
                    this._moduleRef = null;
                }
            }
            var /** @type {?} */ componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver :
                elInjector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"]);
            var /** @type {?} */ componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponentOutlet);
            this._componentRef = this._viewContainerRef.createComponent(componentFactory, this._viewContainerRef.length, elInjector, this.ngComponentOutletContent);
        }
    };
    /**
     * @return {?}
     */
    NgComponentOutlet.prototype.ngOnDestroy = function () {
        if (this._moduleRef)
            this._moduleRef.destroy();
    };
    return NgComponentOutlet;
}());
NgComponentOutlet.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngComponentOutlet]' },] },
];
/**
 * @nocollapse
 */
NgComponentOutlet.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
]; };
NgComponentOutlet.propDecorators = {
    'ngComponentOutlet': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngComponentOutletInjector': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngComponentOutletContent': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngComponentOutletNgModuleFactory': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@stable
 */
var NgForOfContext = (function () {
    /**
     * @param {?} $implicit
     * @param {?} ngForOf
     * @param {?} index
     * @param {?} count
     */
    function NgForOfContext($implicit, ngForOf, index, count) {
        this.$implicit = $implicit;
        this.ngForOf = ngForOf;
        this.index = index;
        this.count = count;
    }
    Object.defineProperty(NgForOfContext.prototype, "first", {
        /**
         * @return {?}
         */
        get: function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForOfContext.prototype, "last", {
        /**
         * @return {?}
         */
        get: function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForOfContext.prototype, "even", {
        /**
         * @return {?}
         */
        get: function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForOfContext.prototype, "odd", {
        /**
         * @return {?}
         */
        get: function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return NgForOfContext;
}());
/**
 * The `NgForOf` directive instantiates a template once per item from an iterable. The context
 * for each instantiated template inherits from the outer context with the given loop variable
 * set to the current item from the iterable.
 *
 * ### Local Variables
 *
 * `NgForOf` provides several exported values that can be aliased to local variables:
 *
 * - `$implicit: T`: The value of the individual items in the iterable (`ngForOf`).
 * - `ngForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression is
 * more complex then a property access, for example when using the async pipe (`userStreams |
 * async`).
 * - `index: number`: The index of the current item in the iterable.
 * - `first: boolean`: True when the item is the first item in the iterable.
 * - `last: boolean`: True when the item is the last item in the iterable.
 * - `even: boolean`: True when the item has an even index in the iterable.
 * - `odd: boolean`: True when the item has an odd index in the iterable.
 *
 * ```
 * <li *ngFor="let user of userObservable | async as users; index as i; first as isFirst">
 *    {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
 * </li>
 * ```
 *
 * ### Change Propagation
 *
 * When the contents of the iterator changes, `NgForOf` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 * * Otherwise, the DOM element for that item will remain the same.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls (such as `<input>` elements which accept user input) that are present. Inserted rows can
 * be animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state
 * such as user input.
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * To customize the default tracking algorithm, `NgForOf` supports `trackBy` option.
 * `trackBy` takes a function which has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * ### Syntax
 *
 * - `<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>`
 * - `<li template="ngFor let item of items; index as i; trackBy: trackByFn">...</li>`
 *
 * With `<ng-template>` element:
 *
 * ```
 * <ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </ng-template>
 * ```
 *
 * ### Example
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 *
 * \@stable
 */
var NgForOf = (function () {
    /**
     * @param {?} _viewContainer
     * @param {?} _template
     * @param {?} _differs
     */
    function NgForOf(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    Object.defineProperty(NgForOf.prototype, "ngForTrackBy", {
        /**
         * @return {?}
         */
        get: function () { return this._trackByFn; },
        /**
         * @param {?} fn
         * @return {?}
         */
        set: function (fn) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["isDevMode"])() && fn != null && typeof fn !== 'function') {
                // TODO(vicb): use a log service once there is a public one available
                if ((console) && (console.warn)) {
                    console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ". " +
                        "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.");
                }
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForOf.prototype, "ngForTemplate", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            // TODO(TS2.1): make TemplateRef<Partial<NgForRowOf<T>>> once we move to TS v2.1
            // The current type is too restrictive; a template that just uses index, for example,
            // should be acceptable.
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgForOf.prototype.ngOnChanges = function (changes) {
        if ('ngForOf' in changes) {
            // React on ngForOf changes only once all inputs have been initialized
            var /** @type {?} */ value = changes['ngForOf'].currentValue;
            if (!this._differ && value) {
                try {
                    this._differ = this._differs.find(value).create(this.ngForTrackBy);
                }
                catch (e) {
                    throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
                }
            }
        }
    };
    /**
     * @return {?}
     */
    NgForOf.prototype.ngDoCheck = function () {
        if (this._differ) {
            var /** @type {?} */ changes = this._differ.diff(this.ngForOf);
            if (changes)
                this._applyChanges(changes);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgForOf.prototype._applyChanges = function (changes) {
        var _this = this;
        var /** @type {?} */ insertTuples = [];
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            if (item.previousIndex == null) {
                var /** @type {?} */ view = _this._viewContainer.createEmbeddedView(_this._template, new NgForOfContext(/** @type {?} */ ((null)), _this.ngForOf, -1, -1), currentIndex);
                var /** @type {?} */ tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
            else if (currentIndex == null) {
                _this._viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var /** @type {?} */ view = ((_this._viewContainer.get(adjustedPreviousIndex)));
                _this._viewContainer.move(view, currentIndex);
                var /** @type {?} */ tuple = new RecordViewTuple(item, /** @type {?} */ (view));
                insertTuples.push(tuple);
            }
        });
        for (var /** @type {?} */ i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (var /** @type {?} */ i = 0, /** @type {?} */ ilen = this._viewContainer.length; i < ilen; i++) {
            var /** @type {?} */ viewRef = (this._viewContainer.get(i));
            viewRef.context.index = i;
            viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange(function (record) {
            var /** @type {?} */ viewRef = (_this._viewContainer.get(record.currentIndex));
            viewRef.context.$implicit = record.item;
        });
    };
    /**
     * @param {?} view
     * @param {?} record
     * @return {?}
     */
    NgForOf.prototype._perViewChange = function (view, record) {
        view.context.$implicit = record.item;
    };
    return NgForOf;
}());
NgForOf.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngFor][ngForOf]' },] },
];
/**
 * @nocollapse
 */
NgForOf.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], },
]; };
NgForOf.propDecorators = {
    'ngForOf': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngForTrackBy': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngForTemplate': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
var RecordViewTuple = (function () {
    /**
     * @param {?} record
     * @param {?} view
     */
    function RecordViewTuple(record, view) {
        this.record = record;
        this.view = view;
    }
    return RecordViewTuple;
}());
/**
 * @deprecated from v4.0.0 - Use NgForOf instead.
 */
var NgFor = NgForOf;
/**
 * @param {?} type
 * @return {?}
 */
function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Conditionally includes a template based on the value of an `expression`.
 *
 * `ngIf` evaluates the `expression` and then renders the `then` or `else` template in its place
 * when expression is truthy or falsy respectively. Typically the:
 *  - `then` template is the inline template of `ngIf` unless bound to a different value.
 *  - `else` template is blank unless it is bound.
 *
 * ## Most common usage
 *
 * The most common usage of the `ngIf` directive is to conditionally show the inline template as
 * seen in this example:
 * {\@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ## Showing an alternative template using `else`
 *
 * If it is necessary to display a template when the `expression` is falsy use the `else` template
 * binding as shown. Note that the `else` binding points to a `<ng-template>` labeled `#elseBlock`.
 * The template can be defined anywhere in the component view but is typically placed right after
 * `ngIf` for readability.
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ## Using non-inlined `then` template
 *
 * Usually the `then` template is the inlined template of the `ngIf`, but it can be changed using
 * a binding (just like `else`). Because `then` and `else` are bindings, the template references can
 * change at runtime as shown in this example.
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ## Storing conditional result in a variable
 *
 * A common pattern is that we need to show a set of properties from the same object. If the
 * object is undefined, then we have to use the safe-traversal-operator `?.` to guard against
 * dereferencing a `null` value. This is especially the case when waiting on async data such as
 * when using the `async` pipe as shown in following example:
 *
 * ```
 * Hello {{ (userStream|async)?.last }}, {{ (userStream|async)?.first }}!
 * ```
 *
 * There are several inefficiencies in the above example:
 *  - We create multiple subscriptions on `userStream`. One for each `async` pipe, or two in the
 *    example above.
 *  - We cannot display an alternative screen while waiting for the data to arrive asynchronously.
 *  - We have to use the safe-traversal-operator `?.` to access properties, which is cumbersome.
 *  - We have to place the `async` pipe in parenthesis.
 *
 * A better way to do this is to use `ngIf` and store the result of the condition in a local
 * variable as shown in the the example below:
 *
 * {\@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * Notice that:
 *  - We use only one `async` pipe and hence only one subscription gets created.
 *  - `ngIf` stores the result of the `userStream|async` in the local variable `user`.
 *  - The local `user` can then be bound repeatedly in a more efficient way.
 *  - No need to use the safe-traversal-operator `?.` to access properties as `ngIf` will only
 *    display the data if `userStream` returns a value.
 *  - We can display an alternative template while waiting for the data.
 *
 * ### Syntax
 *
 * Simple form:
 * - `<div *ngIf="condition">...</div>`
 * - `<div template="ngIf condition">...</div>`
 * - `<ng-template [ngIf]="condition"><div>...</div></ng-template>`
 *
 * Form with an else block:
 * ```
 * <div *ngIf="condition; else elseBlock">...</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with a `then` and `else` block:
 * ```
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>...</ng-template>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * Form with storing the value locally:
 * ```
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>...</ng-template>
 * ```
 *
 * \@stable
 */
var NgIf = (function () {
    /**
     * @param {?} _viewContainer
     * @param {?} templateRef
     */
    function NgIf(_viewContainer, templateRef) {
        this._viewContainer = _viewContainer;
        this._context = new NgIfContext();
        this._thenTemplateRef = null;
        this._elseTemplateRef = null;
        this._thenViewRef = null;
        this._elseViewRef = null;
        this._thenTemplateRef = templateRef;
    }
    Object.defineProperty(NgIf.prototype, "ngIf", {
        /**
         * @param {?} condition
         * @return {?}
         */
        set: function (condition) {
            this._context.$implicit = this._context.ngIf = condition;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgIf.prototype, "ngIfThen", {
        /**
         * @param {?} templateRef
         * @return {?}
         */
        set: function (templateRef) {
            this._thenTemplateRef = templateRef;
            this._thenViewRef = null; // clear previous view if any.
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgIf.prototype, "ngIfElse", {
        /**
         * @param {?} templateRef
         * @return {?}
         */
        set: function (templateRef) {
            this._elseTemplateRef = templateRef;
            this._elseViewRef = null; // clear previous view if any.
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgIf.prototype._updateView = function () {
        if (this._context.$implicit) {
            if (!this._thenViewRef) {
                this._viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef =
                        this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        }
        else {
            if (!this._elseViewRef) {
                this._viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef =
                        this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                }
            }
        }
    };
    return NgIf;
}());
NgIf.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngIf]' },] },
];
/**
 * @nocollapse
 */
NgIf.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], },
]; };
NgIf.propDecorators = {
    'ngIf': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngIfThen': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngIfElse': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * \@stable
 */
var NgIfContext = (function () {
    function NgIfContext() {
        this.$implicit = null;
        this.ngIf = null;
    }
    return NgIfContext;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SwitchView = (function () {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _templateRef
     */
    function SwitchView(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
        this._created = false;
    }
    /**
     * @return {?}
     */
    SwitchView.prototype.create = function () {
        this._created = true;
        this._viewContainerRef.createEmbeddedView(this._templateRef);
    };
    /**
     * @return {?}
     */
    SwitchView.prototype.destroy = function () {
        this._created = false;
        this._viewContainerRef.clear();
    };
    /**
     * @param {?} created
     * @return {?}
     */
    SwitchView.prototype.enforceState = function (created) {
        if (created && !this._created) {
            this.create();
        }
        else if (!created && this._created) {
            this.destroy();
        }
    };
    return SwitchView;
}());
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Adds / removes DOM sub-trees when the nest match expressions matches the switch
 *             expression.
 *
 * \@howToUse
 * ```
 *     <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *       <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *       <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *       <ng-container *ngSwitchCase="match_expression_3">
 *         <!-- use a ng-container to group multiple root nodes -->
 *         <inner-element></inner-element>
 *         <inner-other-element></inner-other-element>
 *       </ng-container>
 *       <some-element *ngSwitchDefault>...</some-element>
 *     </container-element>
 * ```
 * \@description
 *
 * `NgSwitch` stamps out nested views when their match expression value matches the value of the
 * switch expression.
 *
 * In other words:
 * - you define a container element (where you place the directive with a switch expression on the
 * `[ngSwitch]="..."` attribute)
 * - you define inner views inside the `NgSwitch` and place a `*ngSwitchCase` attribute on the view
 * root elements.
 *
 * Elements within `NgSwitch` but outside of a `NgSwitchCase` or `NgSwitchDefault` directives will
 * be preserved at the location.
 *
 * The `ngSwitchCase` directive informs the parent `NgSwitch` of which view to display when the
 * expression is evaluated.
 * When no matching expression is found on a `ngSwitchCase` view, the `ngSwitchDefault` view is
 * stamped out.
 *
 * \@stable
 */
var NgSwitch = (function () {
    function NgSwitch() {
        this._defaultUsed = false;
        this._caseCount = 0;
        this._lastCaseCheckIndex = 0;
        this._lastCasesMatched = false;
    }
    Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
        /**
         * @param {?} newValue
         * @return {?}
         */
        set: function (newValue) {
            this._ngSwitch = newValue;
            if (this._caseCount === 0) {
                this._updateDefaultCases(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * \@internal
     * @return {?}
     */
    NgSwitch.prototype._addCase = function () { return this._caseCount++; };
    /**
     * \@internal
     * @param {?} view
     * @return {?}
     */
    NgSwitch.prototype._addDefault = function (view) {
        if (!this._defaultViews) {
            this._defaultViews = [];
        }
        this._defaultViews.push(view);
    };
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    NgSwitch.prototype._matchCase = function (value) {
        var /** @type {?} */ matched = value == this._ngSwitch;
        this._lastCasesMatched = this._lastCasesMatched || matched;
        this._lastCaseCheckIndex++;
        if (this._lastCaseCheckIndex === this._caseCount) {
            this._updateDefaultCases(!this._lastCasesMatched);
            this._lastCaseCheckIndex = 0;
            this._lastCasesMatched = false;
        }
        return matched;
    };
    /**
     * @param {?} useDefault
     * @return {?}
     */
    NgSwitch.prototype._updateDefaultCases = function (useDefault) {
        if (this._defaultViews && useDefault !== this._defaultUsed) {
            this._defaultUsed = useDefault;
            for (var /** @type {?} */ i = 0; i < this._defaultViews.length; i++) {
                var /** @type {?} */ defaultView = this._defaultViews[i];
                defaultView.enforceState(useDefault);
            }
        }
    };
    return NgSwitch;
}());
NgSwitch.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngSwitch]' },] },
];
/**
 * @nocollapse
 */
NgSwitch.ctorParameters = function () { return []; };
NgSwitch.propDecorators = {
    'ngSwitch': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Creates a view that will be added/removed from the parent {\@link NgSwitch} when the
 *             given expression evaluate to respectively the same/different value as the switch
 *             expression.
 *
 * \@howToUse
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 * </container-element>
 * ```
 * \@description
 *
 * Insert the sub-tree when the expression evaluates to the same value as the enclosing switch
 * expression.
 *
 * If multiple match expressions match the switch expression value, all of them are displayed.
 *
 * See {\@link NgSwitch} for more details and example.
 *
 * \@stable
 */
var NgSwitchCase = (function () {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     * @param {?} ngSwitch
     */
    function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
        this.ngSwitch = ngSwitch;
        ngSwitch._addCase();
        this._view = new SwitchView(viewContainer, templateRef);
    }
    /**
     * @return {?}
     */
    NgSwitchCase.prototype.ngDoCheck = function () { this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase)); };
    return NgSwitchCase;
}());
NgSwitchCase.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngSwitchCase]' },] },
];
/**
 * @nocollapse
 */
NgSwitchCase.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], },
    { type: NgSwitch, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
]; };
NgSwitchCase.propDecorators = {
    'ngSwitchCase': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * \@ngModule CommonModule
 * \@whatItDoes Creates a view that is added to the parent {\@link NgSwitch} when no case expressions
 * match the
 *             switch expression.
 *
 * \@howToUse
 * ```
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   <some-other-element *ngSwitchDefault>...</some-other-element>
 * </container-element>
 * ```
 *
 * \@description
 *
 * Insert the sub-tree when no case expressions evaluate to the same value as the enclosing switch
 * expression.
 *
 * See {\@link NgSwitch} for more details and example.
 *
 * \@stable
 */
var NgSwitchDefault = (function () {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     * @param {?} ngSwitch
     */
    function NgSwitchDefault(viewContainer, templateRef, ngSwitch) {
        ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
    }
    return NgSwitchDefault;
}());
NgSwitchDefault.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngSwitchDefault]' },] },
];
/**
 * @nocollapse
 */
NgSwitchDefault.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], },
    { type: NgSwitch, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Adds / removes DOM sub-trees based on a numeric value. Tailored for pluralization.
 *
 * \@howToUse
 * ```
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">there is nothing</ng-template>
 *   <ng-template ngPluralCase="=1">there is one</ng-template>
 *   <ng-template ngPluralCase="few">there are a few</ng-template>
 * </some-element>
 * ```
 *
 * \@description
 *
 * Displays DOM sub-trees that match the switch expression value, or failing that, DOM sub-trees
 * that match the switch expression's pluralization category.
 *
 * To use this directive you must provide a container element that sets the `[ngPlural]` attribute
 * to a switch expression. Inner elements with a `[ngPluralCase]` will display based on their
 * expression:
 * - if `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
 *   matches the switch expression exactly,
 * - otherwise, the view will be treated as a "category match", and will only display if exact
 *   value matches aren't found and the value maps to its category for the defined locale.
 *
 * See http://cldr.unicode.org/index/cldr-spec/plural-rules
 *
 * \@experimental
 */
var NgPlural = (function () {
    /**
     * @param {?} _localization
     */
    function NgPlural(_localization) {
        this._localization = _localization;
        this._caseViews = {};
    }
    Object.defineProperty(NgPlural.prototype, "ngPlural", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._switchValue = value;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} switchView
     * @return {?}
     */
    NgPlural.prototype.addCase = function (value, switchView) { this._caseViews[value] = switchView; };
    /**
     * @return {?}
     */
    NgPlural.prototype._updateView = function () {
        this._clearViews();
        var /** @type {?} */ cases = Object.keys(this._caseViews);
        var /** @type {?} */ key = getPluralCategory(this._switchValue, cases, this._localization);
        this._activateView(this._caseViews[key]);
    };
    /**
     * @return {?}
     */
    NgPlural.prototype._clearViews = function () {
        if (this._activeView)
            this._activeView.destroy();
    };
    /**
     * @param {?} view
     * @return {?}
     */
    NgPlural.prototype._activateView = function (view) {
        if (view) {
            this._activeView = view;
            this._activeView.create();
        }
    };
    return NgPlural;
}());
NgPlural.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngPlural]' },] },
];
/**
 * @nocollapse
 */
NgPlural.ctorParameters = function () { return [
    { type: NgLocalization, },
]; };
NgPlural.propDecorators = {
    'ngPlural': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Creates a view that will be added/removed from the parent {\@link NgPlural} when the
 *             given expression matches the plural expression according to CLDR rules.
 *
 * \@howToUse
 * ```
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">...</ng-template>
 *   <ng-template ngPluralCase="other">...</ng-template>
 * </some-element>
 * ```
 *
 * See {\@link NgPlural} for more details and example.
 *
 * \@experimental
 */
var NgPluralCase = (function () {
    /**
     * @param {?} value
     * @param {?} template
     * @param {?} viewContainer
     * @param {?} ngPlural
     */
    function NgPluralCase(value, template, viewContainer, ngPlural) {
        this.value = value;
        var isANumber = !isNaN(Number(value));
        ngPlural.addCase(isANumber ? "=" + value : value, new SwitchView(viewContainer, template));
    }
    return NgPluralCase;
}());
NgPluralCase.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngPluralCase]' },] },
];
/**
 * @nocollapse
 */
NgPluralCase.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Attribute"], args: ['ngPluralCase',] },] },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
    { type: NgPlural, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Update an HTML element styles.
 *
 * \@howToUse
 * ```
 * <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
 *
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 *
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * \@description
 *
 * The styles are updated according to the value of the expression evaluation:
 * - keys are style names with an optional `.<unit>` suffix (ie 'top.px', 'font-style.em'),
 * - values are the values assigned to those properties (expressed in the given unit).
 *
 * \@stable
 */
var NgStyle = (function () {
    /**
     * @param {?} _differs
     * @param {?} _ngEl
     * @param {?} _renderer
     */
    function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "ngStyle", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            this._ngStyle = v;
            if (!this._differ && v) {
                this._differ = this._differs.find(v).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgStyle.prototype.ngDoCheck = function () {
        if (this._differ) {
            var /** @type {?} */ changes = this._differ.diff(this._ngStyle);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgStyle.prototype._applyChanges = function (changes) {
        var _this = this;
        changes.forEachRemovedItem(function (record) { return _this._setStyle(record.key, null); });
        changes.forEachAddedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
    };
    /**
     * @param {?} nameAndUnit
     * @param {?} value
     * @return {?}
     */
    NgStyle.prototype._setStyle = function (nameAndUnit, value) {
        var _a = nameAndUnit.split('.'), name = _a[0], unit = _a[1];
        value = value != null && unit ? "" + value + unit : value;
        this._renderer.setElementStyle(this._ngEl.nativeElement, name, /** @type {?} */ (value));
    };
    return NgStyle;
}());
NgStyle.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngStyle]' },] },
];
/**
 * @nocollapse
 */
NgStyle.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"], },
]; };
NgStyle.propDecorators = {
    'ngStyle': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 *
 * \@whatItDoes Inserts an embedded view from a prepared `TemplateRef`
 *
 * \@howToUse
 * ```
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 *
 * \@description
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
 * `[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
 * by the local template `let` declarations.
 *
 * Note: using the key `$implicit` in the context object will set it's value as default.
 *
 * ## Example
 *
 * {\@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}
 *
 * \@experimental
 */
var NgTemplateOutlet = (function () {
    /**
     * @param {?} _viewContainerRef
     */
    function NgTemplateOutlet(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(NgTemplateOutlet.prototype, "ngOutletContext", {
        /**
         * @deprecated v4.0.0 - Renamed to ngTemplateOutletContext.
         * @param {?} context
         * @return {?}
         */
        set: function (context) { this.ngTemplateOutletContext = context; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgTemplateOutlet.prototype.ngOnChanges = function (changes) {
        if (this._viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
        }
        if (this.ngTemplateOutlet) {
            this._viewRef = this._viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, this.ngTemplateOutletContext);
        }
    };
    return NgTemplateOutlet;
}());
NgTemplateOutlet.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngTemplateOutlet]' },] },
];
/**
 * @nocollapse
 */
NgTemplateOutlet.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], },
]; };
NgTemplateOutlet.propDecorators = {
    'ngTemplateOutletContext': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngTemplateOutlet': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    'ngOutletContext': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A collection of Angular directives that are likely to be used in each and every Angular
 * application.
 */
var COMMON_DIRECTIVES = [
    NgClass,
    NgComponentOutlet,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgPlural,
    NgPluralCase,
];
/**
 * A collection of deprecated directives that are no longer part of the core module.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} type
 * @param {?} value
 * @return {?}
 */
function invalidPipeArgumentError(type, value) {
    return Error("InvalidPipeArgument: '" + value + "' for pipe '" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵstringify"])(type) + "'");
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ObservableStrategy = (function () {
    function ObservableStrategy() {
    }
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.subscribe({ next: updateLatestValue, error: function (e) { throw e; } });
    };
    /**
     * @param {?} subscription
     * @return {?}
     */
    ObservableStrategy.prototype.dispose = function (subscription) { subscription.unsubscribe(); };
    /**
     * @param {?} subscription
     * @return {?}
     */
    ObservableStrategy.prototype.onDestroy = function (subscription) { subscription.unsubscribe(); };
    return ObservableStrategy;
}());
var PromiseStrategy = (function () {
    function PromiseStrategy() {
    }
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.then(updateLatestValue, function (e) { throw e; });
    };
    /**
     * @param {?} subscription
     * @return {?}
     */
    PromiseStrategy.prototype.dispose = function (subscription) { };
    /**
     * @param {?} subscription
     * @return {?}
     */
    PromiseStrategy.prototype.onDestroy = function (subscription) { };
    return PromiseStrategy;
}());
var _promiseStrategy = new PromiseStrategy();
var _observableStrategy = new ObservableStrategy();
/**
 * \@ngModule CommonModule
 * \@whatItDoes Unwraps a value from an asynchronous primitive.
 * \@howToUse `observable_or_promise_expression | async`
 * \@description
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 *
 * ## Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {\@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {\@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * \@stable
 */
var AsyncPipe = (function () {
    /**
     * @param {?} _ref
     */
    function AsyncPipe(_ref) {
        this._ref = _ref;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = ((null));
    }
    /**
     * @return {?}
     */
    AsyncPipe.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._dispose();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AsyncPipe.prototype.transform = function (obj) {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(/** @type {?} */ (obj));
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return __WEBPACK_IMPORTED_MODULE_1__angular_core__["WrappedValue"].wrap(this._latestValue);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AsyncPipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AsyncPipe.prototype._selectStrategy = function (obj) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵisPromise"])(obj)) {
            return _promiseStrategy;
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵisObservable"])(obj)) {
            return _observableStrategy;
        }
        throw invalidPipeArgumentError(AsyncPipe, obj);
    };
    /**
     * @return {?}
     */
    AsyncPipe.prototype._dispose = function () {
        this._strategy.dispose(/** @type {?} */ ((this._subscription)));
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    /**
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    AsyncPipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    return AsyncPipe;
}());
AsyncPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'async', pure: false },] },
];
/**
 * @nocollapse
 */
AsyncPipe.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms text to lowercase.
 *
 * {\@example  common/pipes/ts/lowerupper_pipe.ts region='LowerUpperPipe' }
 *
 * \@stable
 */
var LowerCasePipe = (function () {
    function LowerCasePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    LowerCasePipe.prototype.transform = function (value) {
        if (!value)
            return value;
        if (typeof value !== 'string') {
            throw invalidPipeArgumentError(LowerCasePipe, value);
        }
        return value.toLowerCase();
    };
    return LowerCasePipe;
}());
LowerCasePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'lowercase' },] },
];
/**
 * @nocollapse
 */
LowerCasePipe.ctorParameters = function () { return []; };
/**
 * Helper method to transform a single word to titlecase.
 *
 * \@stable
 * @param {?} word
 * @return {?}
 */
function titleCaseWord(word) {
    if (!word)
        return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
/**
 * Transforms text to titlecase.
 *
 * \@stable
 */
var TitleCasePipe = (function () {
    function TitleCasePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    TitleCasePipe.prototype.transform = function (value) {
        if (!value)
            return value;
        if (typeof value !== 'string') {
            throw invalidPipeArgumentError(TitleCasePipe, value);
        }
        return value.split(/\b/g).map(function (word) { return titleCaseWord(word); }).join('');
    };
    return TitleCasePipe;
}());
TitleCasePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'titlecase' },] },
];
/**
 * @nocollapse
 */
TitleCasePipe.ctorParameters = function () { return []; };
/**
 * Transforms text to uppercase.
 *
 * \@stable
 */
var UpperCasePipe = (function () {
    function UpperCasePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    UpperCasePipe.prototype.transform = function (value) {
        if (!value)
            return value;
        if (typeof value !== 'string') {
            throw invalidPipeArgumentError(UpperCasePipe, value);
        }
        return value.toUpperCase();
    };
    return UpperCasePipe;
}());
UpperCasePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'uppercase' },] },
];
/**
 * @nocollapse
 */
UpperCasePipe.ctorParameters = function () { return []; };
var NumberFormatStyle = {};
NumberFormatStyle.Decimal = 0;
NumberFormatStyle.Percent = 1;
NumberFormatStyle.Currency = 2;
NumberFormatStyle[NumberFormatStyle.Decimal] = "Decimal";
NumberFormatStyle[NumberFormatStyle.Percent] = "Percent";
NumberFormatStyle[NumberFormatStyle.Currency] = "Currency";
var NumberFormatter = (function () {
    function NumberFormatter() {
    }
    /**
     * @param {?} num
     * @param {?} locale
     * @param {?} style
     * @param {?=} opts
     * @return {?}
     */
    NumberFormatter.format = function (num, locale, style, opts) {
        if (opts === void 0) { opts = {}; }
        var minimumIntegerDigits = opts.minimumIntegerDigits, minimumFractionDigits = opts.minimumFractionDigits, maximumFractionDigits = opts.maximumFractionDigits, currency = opts.currency, _a = opts.currencyAsSymbol, currencyAsSymbol = _a === void 0 ? false : _a;
        var /** @type {?} */ options = {
            minimumIntegerDigits: minimumIntegerDigits,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits,
            style: NumberFormatStyle[style].toLowerCase()
        };
        if (style == NumberFormatStyle.Currency) {
            options.currency = typeof currency == 'string' ? currency : undefined;
            options.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, options).format(num);
    };
    return NumberFormatter;
}());
var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
var PATTERN_ALIASES = {
    // Keys are quoted so they do not get renamed during closure compilation.
    'yMMMdjms': datePartGetterFactory(combine([
        digitCondition('year', 1),
        nameCondition('month', 3),
        digitCondition('day', 1),
        digitCondition('hour', 1),
        digitCondition('minute', 1),
        digitCondition('second', 1),
    ])),
    'yMdjm': datePartGetterFactory(combine([
        digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1),
        digitCondition('hour', 1), digitCondition('minute', 1)
    ])),
    'yMMMMEEEEd': datePartGetterFactory(combine([
        digitCondition('year', 1), nameCondition('month', 4), nameCondition('weekday', 4),
        digitCondition('day', 1)
    ])),
    'yMMMMd': datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 4), digitCondition('day', 1)])),
    'yMMMd': datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 3), digitCondition('day', 1)])),
    'yMd': datePartGetterFactory(combine([digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1)])),
    'jms': datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('second', 1), digitCondition('minute', 1)])),
    'jm': datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('minute', 1)]))
};
var DATE_FORMATS = {
    // Keys are quoted so they do not get renamed.
    'yyyy': datePartGetterFactory(digitCondition('year', 4)),
    'yy': datePartGetterFactory(digitCondition('year', 2)),
    'y': datePartGetterFactory(digitCondition('year', 1)),
    'MMMM': datePartGetterFactory(nameCondition('month', 4)),
    'MMM': datePartGetterFactory(nameCondition('month', 3)),
    'MM': datePartGetterFactory(digitCondition('month', 2)),
    'M': datePartGetterFactory(digitCondition('month', 1)),
    'LLLL': datePartGetterFactory(nameCondition('month', 4)),
    'L': datePartGetterFactory(nameCondition('month', 1)),
    'dd': datePartGetterFactory(digitCondition('day', 2)),
    'd': datePartGetterFactory(digitCondition('day', 1)),
    'HH': digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), false)))),
    'H': hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), false))),
    'hh': digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), true)))),
    'h': hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    'jj': datePartGetterFactory(digitCondition('hour', 2)),
    'j': datePartGetterFactory(digitCondition('hour', 1)),
    'mm': digitModifier(datePartGetterFactory(digitCondition('minute', 2))),
    'm': datePartGetterFactory(digitCondition('minute', 1)),
    'ss': digitModifier(datePartGetterFactory(digitCondition('second', 2))),
    's': datePartGetterFactory(digitCondition('second', 1)),
    // while ISO 8601 requires fractions to be prefixed with `.` or `,`
    // we can be just safely rely on using `sss` since we currently don't support single or two digit
    // fractions
    'sss': datePartGetterFactory(digitCondition('second', 3)),
    'EEEE': datePartGetterFactory(nameCondition('weekday', 4)),
    'EEE': datePartGetterFactory(nameCondition('weekday', 3)),
    'EE': datePartGetterFactory(nameCondition('weekday', 2)),
    'E': datePartGetterFactory(nameCondition('weekday', 1)),
    'a': hourClockExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    'Z': timeZoneGetter('short'),
    'z': timeZoneGetter('long'),
    'ww': datePartGetterFactory({}),
    // first Thursday of the year. not support ?
    'w': datePartGetterFactory({}),
    // of the year not support ?
    'G': datePartGetterFactory(nameCondition('era', 1)),
    'GG': datePartGetterFactory(nameCondition('era', 2)),
    'GGG': datePartGetterFactory(nameCondition('era', 3)),
    'GGGG': datePartGetterFactory(nameCondition('era', 4))
};
/**
 * @param {?} inner
 * @return {?}
 */
function digitModifier(inner) {
    return function (date, locale) {
        var /** @type {?} */ result = inner(date, locale);
        return result.length == 1 ? '0' + result : result;
    };
}
/**
 * @param {?} inner
 * @return {?}
 */
function hourClockExtractor(inner) {
    return function (date, locale) { return inner(date, locale).split(' ')[1]; };
}
/**
 * @param {?} inner
 * @return {?}
 */
function hourExtractor(inner) {
    return function (date, locale) { return inner(date, locale).split(' ')[0]; };
}
/**
 * @param {?} date
 * @param {?} locale
 * @param {?} options
 * @return {?}
 */
function intlDateFormat(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, '');
}
/**
 * @param {?} timezone
 * @return {?}
 */
function timeZoneGetter(timezone) {
    // To workaround `Intl` API restriction for single timezone let format with 24 hours
    var /** @type {?} */ options = { hour: '2-digit', hour12: false, timeZoneName: timezone };
    return function (date, locale) {
        var /** @type {?} */ result = intlDateFormat(date, locale, options);
        // Then extract first 3 letters that related to hours
        return result ? result.substring(3) : '';
    };
}
/**
 * @param {?} options
 * @param {?} value
 * @return {?}
 */
function hour12Modify(options, value) {
    options.hour12 = value;
    return options;
}
/**
 * @param {?} prop
 * @param {?} len
 * @return {?}
 */
function digitCondition(prop, len) {
    var /** @type {?} */ result = {};
    result[prop] = len === 2 ? '2-digit' : 'numeric';
    return result;
}
/**
 * @param {?} prop
 * @param {?} len
 * @return {?}
 */
function nameCondition(prop, len) {
    var /** @type {?} */ result = {};
    if (len < 4) {
        result[prop] = len > 1 ? 'short' : 'narrow';
    }
    else {
        result[prop] = 'long';
    }
    return result;
}
/**
 * @param {?} options
 * @return {?}
 */
function combine(options) {
    return options.reduce(function (merged, opt) { return (Object.assign({}, merged, opt)); }, {});
}
/**
 * @param {?} ret
 * @return {?}
 */
function datePartGetterFactory(ret) {
    return function (date, locale) { return intlDateFormat(date, locale, ret); };
}
var DATE_FORMATTER_CACHE = new Map();
/**
 * @param {?} format
 * @param {?} date
 * @param {?} locale
 * @return {?}
 */
function dateFormatter(format, date, locale) {
    var /** @type {?} */ fn = PATTERN_ALIASES[format];
    if (fn)
        return fn(date, locale);
    var /** @type {?} */ cacheKey = format;
    var /** @type {?} */ parts = DATE_FORMATTER_CACHE.get(cacheKey);
    if (!parts) {
        parts = [];
        var /** @type {?} */ match = void 0;
        DATE_FORMATS_SPLIT.exec(format);
        var /** @type {?} */ _format = format;
        while (_format) {
            match = DATE_FORMATS_SPLIT.exec(_format);
            if (match) {
                parts = parts.concat(match.slice(1));
                _format = ((parts.pop()));
            }
            else {
                parts.push(_format);
                _format = null;
            }
        }
        DATE_FORMATTER_CACHE.set(cacheKey, parts);
    }
    return parts.reduce(function (text, part) {
        var /** @type {?} */ fn = DATE_FORMATS[part];
        return text + (fn ? fn(date, locale) : partToTime(part));
    }, '');
}
/**
 * @param {?} part
 * @return {?}
 */
function partToTime(part) {
    return part === '\'\'' ? '\'' : part.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
}
var DateFormatter = (function () {
    function DateFormatter() {
    }
    /**
     * @param {?} date
     * @param {?} locale
     * @param {?} pattern
     * @return {?}
     */
    DateFormatter.format = function (date, locale, pattern) {
        return dateFormatter(pattern, date, locale);
    };
    return DateFormatter;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
/**
 * @param {?} pipe
 * @param {?} locale
 * @param {?} value
 * @param {?} style
 * @param {?=} digits
 * @param {?=} currency
 * @param {?=} currencyAsSymbol
 * @return {?}
 */
function formatNumber(pipe, locale, value, style, digits, currency, currencyAsSymbol) {
    if (currency === void 0) { currency = null; }
    if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
    if (value == null)
        return null;
    // Convert strings to numbers
    value = typeof value === 'string' && isNumeric(value) ? +value : value;
    if (typeof value !== 'number') {
        throw invalidPipeArgumentError(pipe, value);
    }
    var /** @type {?} */ minInt = undefined;
    var /** @type {?} */ minFraction = undefined;
    var /** @type {?} */ maxFraction = undefined;
    if (style !== NumberFormatStyle.Currency) {
        // rely on Intl default for currency
        minInt = 1;
        minFraction = 0;
        maxFraction = 3;
    }
    if (digits) {
        var /** @type {?} */ parts = digits.match(_NUMBER_FORMAT_REGEXP);
        if (parts === null) {
            throw new Error(digits + " is not a valid digit info for number pipes");
        }
        if (parts[1] != null) {
            minInt = parseIntAutoRadix(parts[1]);
        }
        if (parts[3] != null) {
            minFraction = parseIntAutoRadix(parts[3]);
        }
        if (parts[5] != null) {
            maxFraction = parseIntAutoRadix(parts[5]);
        }
    }
    return NumberFormatter.format(/** @type {?} */ (value), locale, style, {
        minimumIntegerDigits: minInt,
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction,
        currency: currency,
        currencyAsSymbol: currencyAsSymbol,
    });
}
/**
 * \@ngModule CommonModule
 * \@whatItDoes Formats a number according to locale rules.
 * \@howToUse `number_expression | number[:digitInfo]`
 *
 * Formats a number as text. Group sizing and separator and other locale-specific
 * configurations are based on the active locale.
 *
 * where `expression` is a number:
 *  - `digitInfo` is a `string` which has a following format: <br>
 *     <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>
 *   - `minIntegerDigits` is the minimum number of integer digits to use. Defaults to `1`.
 *   - `minFractionDigits` is the minimum number of digits after fraction. Defaults to `0`.
 *   - `maxFractionDigits` is the maximum number of digits after fraction. Defaults to `3`.
 *
 * For more information on the acceptable range for each of these numbers and other
 * details see your native internationalization library.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * ### Example
 *
 * {\@example common/pipes/ts/number_pipe.ts region='NumberPipe'}
 *
 * \@stable
 */
var DecimalPipe = (function () {
    /**
     * @param {?} _locale
     */
    function DecimalPipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param {?} value
     * @param {?=} digits
     * @return {?}
     */
    DecimalPipe.prototype.transform = function (value, digits) {
        return formatNumber(DecimalPipe, this._locale, value, NumberFormatStyle.Decimal, digits);
    };
    return DecimalPipe;
}());
DecimalPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'number' },] },
];
/**
 * @nocollapse
 */
DecimalPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"],] },] },
]; };
/**
 * \@ngModule CommonModule
 * \@whatItDoes Formats a number as a percentage according to locale rules.
 * \@howToUse `number_expression | percent[:digitInfo]`
 *
 * \@description
 *
 * Formats a number as percentage.
 *
 * - `digitInfo` See {\@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * ### Example
 *
 * {\@example common/pipes/ts/number_pipe.ts region='PercentPipe'}
 *
 * \@stable
 */
var PercentPipe = (function () {
    /**
     * @param {?} _locale
     */
    function PercentPipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param {?} value
     * @param {?=} digits
     * @return {?}
     */
    PercentPipe.prototype.transform = function (value, digits) {
        return formatNumber(PercentPipe, this._locale, value, NumberFormatStyle.Percent, digits);
    };
    return PercentPipe;
}());
PercentPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'percent' },] },
];
/**
 * @nocollapse
 */
PercentPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"],] },] },
]; };
/**
 * \@ngModule CommonModule
 * \@whatItDoes Formats a number as currency using locale rules.
 * \@howToUse `number_expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]`
 * \@description
 *
 * Use `currency` to format a number as currency.
 *
 * - `currencyCode` is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such
 *    as `USD` for the US dollar and `EUR` for the euro.
 * - `symbolDisplay` is a boolean indicating whether to use the currency symbol or code.
 *   - `true`: use symbol (e.g. `$`).
 *   - `false`(default): use code (e.g. `USD`).
 * - `digitInfo` See {\@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * ### Example
 *
 * {\@example common/pipes/ts/number_pipe.ts region='CurrencyPipe'}
 *
 * \@stable
 */
var CurrencyPipe = (function () {
    /**
     * @param {?} _locale
     */
    function CurrencyPipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param {?} value
     * @param {?=} currencyCode
     * @param {?=} symbolDisplay
     * @param {?=} digits
     * @return {?}
     */
    CurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (symbolDisplay === void 0) { symbolDisplay = false; }
        return formatNumber(CurrencyPipe, this._locale, value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    };
    return CurrencyPipe;
}());
CurrencyPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'currency' },] },
];
/**
 * @nocollapse
 */
CurrencyPipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"],] },] },
]; };
/**
 * @param {?} text
 * @return {?}
 */
function parseIntAutoRadix(text) {
    var /** @type {?} */ result = parseInt(text);
    if (isNaN(result)) {
        throw new Error('Invalid integer literal when parsing ' + text);
    }
    return result;
}
/**
 * @param {?} value
 * @return {?}
 */
function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ISO8601_DATE_REGEX = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
/**
 * \@ngModule CommonModule
 * \@whatItDoes Formats a date according to locale rules.
 * \@howToUse `date_expression | date[:format]`
 * \@description
 *
 * Where:
 * - `expression` is a date object or a number (milliseconds since UTC epoch) or an ISO string
 * (https://www.w3.org/TR/NOTE-datetime).
 * - `format` indicates which date/time components to include. The format can be predefined as
 *   shown below or custom as shown in the table.
 *   - `'medium'`: equivalent to `'yMMMdjms'` (e.g. `Sep 3, 2010, 12:05:08 PM` for `en-US`)
 *   - `'short'`: equivalent to `'yMdjm'` (e.g. `9/3/2010, 12:05 PM` for `en-US`)
 *   - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. `Friday, September 3, 2010` for `en-US`)
 *   - `'longDate'`: equivalent to `'yMMMMd'` (e.g. `September 3, 2010` for `en-US`)
 *   - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. `Sep 3, 2010` for `en-US`)
 *   - `'shortDate'`: equivalent to `'yMd'` (e.g. `9/3/2010` for `en-US`)
 *   - `'mediumTime'`: equivalent to `'jms'` (e.g. `12:05:08 PM` for `en-US`)
 *   - `'shortTime'`: equivalent to `'jm'` (e.g. `12:05 PM` for `en-US`)
 *
 *
 *  | Component | Symbol | Narrow | Short Form   | Long Form         | Numeric   | 2-digit   |
 *  |-----------|:------:|--------|--------------|-------------------|-----------|-----------|
 *  | era       |   G    | G (A)  | GGG (AD)     | GGGG (Anno Domini)| -         | -         |
 *  | year      |   y    | -      | -            | -                 | y (2015)  | yy (15)   |
 *  | month     |   M    | L (S)  | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
 *  | day       |   d    | -      | -            | -                 | d (3)     | dd (03)   |
 *  | weekday   |   E    | E (S)  | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
 *  | hour      |   j    | -      | -            | -                 | j (1 PM)  | jj (1 PM) |
 *  | hour12    |   h    | -      | -            | -                 | h (1)     | hh (01)   |
 *  | hour24    |   H    | -      | -            | -                 | H (13)    | HH (13)   |
 *  | minute    |   m    | -      | -            | -                 | m (5)     | mm (05)   |
 *  | second    |   s    | -      | -            | -                 | s (9)     | ss (09)   |
 *  | timezone  |   z    | -      | -            | z (Pacific Standard Time)| -  | -         |
 *  | timezone  |   Z    | -      | Z (GMT-8:00) | -                 | -         | -         |
 *  | timezone  |   a    | -      | a (PM)       | -                 | -         | -         |
 *
 * In javascript, only the components specified will be respected (not the ordering,
 * punctuations, ...) and details of the formatting will be dependent on the locale.
 *
 * Timezone of the formatted text will be the local system timezone of the end-user's machine.
 *
 * When the expression is a ISO string without time (e.g. 2016-09-19) the time zone offset is not
 * applied and the formatted text will have the same day, month and year of the expression.
 *
 * WARNINGS:
 * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
 *   Instead users should treat the date as an immutable object and change the reference when the
 *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
 *   which would be an expensive operation).
 * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
 *   browsers.
 *
 * ### Examples
 *
 * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
 * in the _local_ time and locale is 'en-US':
 *
 * ```
 *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
 *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
 *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
 *     {{ dateObj | date:'mmss' }}        // output is '43:11'
 * ```
 *
 * {\@example common/pipes/ts/date_pipe.ts region='DatePipe'}
 *
 * \@stable
 */
var DatePipe = (function () {
    /**
     * @param {?} _locale
     */
    function DatePipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    DatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        var /** @type {?} */ date;
        if (isBlank(value) || value !== value)
            return null;
        if (typeof value === 'string') {
            value = value.trim();
        }
        if (isDate(value)) {
            date = value;
        }
        else if (isNumeric(value)) {
            date = new Date(parseFloat(value));
        }
        else if (typeof value === 'string' && /^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
            /**
             * For ISO Strings without time the day, month and year must be extracted from the ISO String
             * before Date creation to avoid time offset and errors in the new Date.
             * If we only replace '-' with ',' in the ISO String ("2015,01,01"), and try to create a new
             * date, some browsers (e.g. IE 9) will throw an invalid Date error
             * If we leave the '-' ("2015-01-01") and try to create a new Date("2015-01-01") the timeoffset
             * is applied
             * Note: ISO months are 0 for January, 1 for February, ...
             */
            var _a = value.split('-').map(function (val) { return parseInt(val, 10); }), y = _a[0], m = _a[1], d = _a[2];
            date = new Date(y, m - 1, d);
        }
        else {
            date = new Date(value);
        }
        if (!isDate(date)) {
            var /** @type {?} */ match = void 0;
            if ((typeof value === 'string') && (match = value.match(ISO8601_DATE_REGEX))) {
                date = isoStringToDate(match);
            }
            else {
                throw invalidPipeArgumentError(DatePipe, value);
            }
        }
        return DateFormatter.format(date, this._locale, DatePipe._ALIASES[pattern] || pattern);
    };
    return DatePipe;
}());
/**
 * \@internal
 */
DatePipe._ALIASES = {
    'medium': 'yMMMdjms',
    'short': 'yMdjm',
    'fullDate': 'yMMMMEEEEd',
    'longDate': 'yMMMMd',
    'mediumDate': 'yMMMd',
    'shortDate': 'yMd',
    'mediumTime': 'jms',
    'shortTime': 'jm'
};
DatePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'date', pure: true },] },
];
/**
 * @nocollapse
 */
DatePipe.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"],] },] },
]; };
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj == null || obj === '';
}
/**
 * @param {?} obj
 * @return {?}
 */
function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
}
/**
 * @param {?} match
 * @return {?}
 */
function isoStringToDate(match) {
    var /** @type {?} */ date = new Date(0);
    var /** @type {?} */ tzHour = 0;
    var /** @type {?} */ tzMin = 0;
    var /** @type {?} */ dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
    var /** @type {?} */ timeSetter = match[8] ? date.setUTCHours : date.setHours;
    if (match[9]) {
        tzHour = toInt(match[9] + match[10]);
        tzMin = toInt(match[9] + match[11]);
    }
    dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
    var /** @type {?} */ h = toInt(match[4] || '0') - tzHour;
    var /** @type {?} */ m = toInt(match[5] || '0') - tzMin;
    var /** @type {?} */ s = toInt(match[6] || '0');
    var /** @type {?} */ ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
    timeSetter.call(date, h, m, s, ms);
    return date;
}
/**
 * @param {?} str
 * @return {?}
 */
function toInt(str) {
    return parseInt(str, 10);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _INTERPOLATION_REGEXP = /#/g;
/**
 * \@ngModule CommonModule
 * \@whatItDoes Maps a value to a string that pluralizes the value according to locale rules.
 * \@howToUse `expression | i18nPlural:mapping`
 * \@description
 *
 *  Where:
 *  - `expression` is a number.
 *  - `mapping` is an object that mimics the ICU format, see
 *    http://userguide.icu-project.org/formatparse/messages
 *
 *  ## Example
 *
 * {\@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * \@experimental
 */
var I18nPluralPipe = (function () {
    /**
     * @param {?} _localization
     */
    function I18nPluralPipe(_localization) {
        this._localization = _localization;
    }
    /**
     * @param {?} value
     * @param {?} pluralMap
     * @return {?}
     */
    I18nPluralPipe.prototype.transform = function (value, pluralMap) {
        if (value == null)
            return '';
        if (typeof pluralMap !== 'object' || pluralMap === null) {
            throw invalidPipeArgumentError(I18nPluralPipe, pluralMap);
        }
        var /** @type {?} */ key = getPluralCategory(value, Object.keys(pluralMap), this._localization);
        return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
    };
    return I18nPluralPipe;
}());
I18nPluralPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'i18nPlural', pure: true },] },
];
/**
 * @nocollapse
 */
I18nPluralPipe.ctorParameters = function () { return [
    { type: NgLocalization, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 * \@whatItDoes Generic selector that displays the string that matches the current value.
 * \@howToUse `expression | i18nSelect:mapping`
 * \@description
 *
 *  Where `mapping` is an object that indicates the text that should be displayed
 *  for different values of the provided `expression`.
 *  If none of the keys of the mapping match the value of the `expression`, then the content
 *  of the `other` key is returned when present, otherwise an empty string is returned.
 *
 *  ## Example
 *
 * {\@example common/pipes/ts/i18n_pipe.ts region='I18nSelectPipeComponent'}
 *
 *  \@experimental
 */
var I18nSelectPipe = (function () {
    function I18nSelectPipe() {
    }
    /**
     * @param {?} value
     * @param {?} mapping
     * @return {?}
     */
    I18nSelectPipe.prototype.transform = function (value, mapping) {
        if (value == null)
            return '';
        if (typeof mapping !== 'object' || typeof value !== 'string') {
            throw invalidPipeArgumentError(I18nSelectPipe, mapping);
        }
        if (mapping.hasOwnProperty(value)) {
            return mapping[value];
        }
        if (mapping.hasOwnProperty('other')) {
            return mapping['other'];
        }
        return '';
    };
    return I18nSelectPipe;
}());
I18nSelectPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'i18nSelect', pure: true },] },
];
/**
 * @nocollapse
 */
I18nSelectPipe.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 * \@whatItDoes Converts value into JSON string.
 * \@howToUse `expression | json`
 * \@description
 *
 * Converts value into string using `JSON.stringify`. Useful for debugging.
 *
 * ### Example
 * {\@example common/pipes/ts/json_pipe.ts region='JsonPipe'}
 *
 * \@stable
 */
var JsonPipe = (function () {
    function JsonPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    JsonPipe.prototype.transform = function (value) { return JSON.stringify(value, null, 2); };
    return JsonPipe;
}());
JsonPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'json', pure: false },] },
];
/**
 * @nocollapse
 */
JsonPipe.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@ngModule CommonModule
 * \@whatItDoes Creates a new List or String containing a subset (slice) of the elements.
 * \@howToUse `array_or_string_expression | slice:start[:end]`
 * \@description
 *
 * Where the input expression is a `List` or `String`, and:
 * - `start`: The starting index of the subset to return.
 *   - **a positive integer**: return the item at `start` index and all items after
 *     in the list or string expression.
 *   - **a negative integer**: return the item at `start` index from the end and all items after
 *     in the list or string expression.
 *   - **if positive and greater than the size of the expression**: return an empty list or string.
 *   - **if negative and greater than the size of the expression**: return entire list or string.
 * - `end`: The ending index of the subset to return.
 *   - **omitted**: return all items until the end.
 *   - **if positive**: return all items before `end` index of the list or string.
 *   - **if negative**: return all items before `end` index from the end of the list or string.
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * When operating on a [List], the returned list is always a copy even when all
 * the elements are being returned.
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * ## List Example
 *
 * This `ngFor` example:
 *
 * {\@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 *     <li>b</li>
 *     <li>c</li>
 *
 * ## String Examples
 *
 * {\@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 * \@stable
 */
var SlicePipe = (function () {
    function SlicePipe() {
    }
    /**
     * @param {?} value
     * @param {?} start
     * @param {?=} end
     * @return {?}
     */
    SlicePipe.prototype.transform = function (value, start, end) {
        if (value == null)
            return value;
        if (!this.supports(value)) {
            throw invalidPipeArgumentError(SlicePipe, value);
        }
        return value.slice(start, end);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SlicePipe.prototype.supports = function (obj) { return typeof obj === 'string' || Array.isArray(obj); };
    return SlicePipe;
}());
SlicePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"], args: [{ name: 'slice', pure: false },] },
];
/**
 * @nocollapse
 */
SlicePipe.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
/**
 * A collection of Angular pipes that are likely to be used in each and every application.
 */
var COMMON_PIPES = [
    AsyncPipe,
    UpperCasePipe,
    LowerCasePipe,
    JsonPipe,
    SlicePipe,
    DecimalPipe,
    PercentPipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    I18nPluralPipe,
    I18nSelectPipe,
];
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The module that includes all the basic Angular directives like {\@link NgIf}, {\@link NgForOf}, ...
 *
 * \@stable
 */
var CommonModule = (function () {
    function CommonModule() {
    }
    return CommonModule;
}());
CommonModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
                exports: [COMMON_DIRECTIVES, COMMON_PIPES],
                providers: [
                    { provide: NgLocalization, useClass: NgLocaleLocalization },
                ],
            },] },
];
/**
 * @nocollapse
 */
CommonModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application into a Web Worker).
 *
 * \@stable
 */
var DOCUMENT = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('DocumentToken');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var PLATFORM_BROWSER_ID = 'browser';
var PLATFORM_SERVER_ID = 'server';
var PLATFORM_WORKER_APP_ID = 'browserWorkerApp';
var PLATFORM_WORKER_UI_ID = 'browserWorkerUi';
/**
 * Returns whether a platform id represents a browser platform.
 * \@experimental
 * @param {?} platformId
 * @return {?}
 */
function isPlatformBrowser(platformId) {
    return platformId === PLATFORM_BROWSER_ID;
}
/**
 * Returns whether a platform id represents a server platform.
 * \@experimental
 * @param {?} platformId
 * @return {?}
 */
function isPlatformServer(platformId) {
    return platformId === PLATFORM_SERVER_ID;
}
/**
 * Returns whether a platform id represents a web worker app platform.
 * \@experimental
 * @param {?} platformId
 * @return {?}
 */
function isPlatformWorkerApp(platformId) {
    return platformId === PLATFORM_WORKER_APP_ID;
}
/**
 * Returns whether a platform id represents a web worker UI platform.
 * \@experimental
 * @param {?} platformId
 * @return {?}
 */
function isPlatformWorkerUi(platformId) {
    return platformId === PLATFORM_WORKER_UI_ID;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Version"]('4.3.5');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
// This file only reexports content of the `src` folder. Keep it that way.
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=common.es5.js.map


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClientPlus; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HttpClientPlus = (function () {
    function HttpClientPlus(http) {
        this.http = http;
    }
    HttpClientPlus = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpClient */]])
    ], HttpClientPlus);
    return HttpClientPlus;
}());



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ['get', 'delete', 'post', 'put', 'patch'];


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_http_client_methods__ = __webpack_require__(26);



/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_2__lib_http_client_methods__["a" /* default */].reduce(function (prototypeExtension, method) {
    prototypeExtension[method] = function (url, body, options) {
        var _a = this.configs, configs = _a === void 0 ? { tokenName: null, baseUrl: null } : _a;
        var tokenName = configs.tokenName, baseUrl = configs.baseUrl;
        var token = sessionStorage.getItem(tokenName);
        if (url.indexOf('http') === -1) {
            url = (baseUrl || '') + url;
        }
        if (['get', 'delete'].indexOf(method) !== -1) {
            if (body) {
                var params = body.params;
                if (params && !(params instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpParams */])) {
                    params = __WEBPACK_IMPORTED_MODULE_0_lodash__["reduce"](params, function (params, value, name) {
                        return params.append(name, value);
                    }, new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpParams */]());
                    __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](body, { params: params });
                }
            }
            if (token) {
                if (!body) {
                    body = {};
                }
                if (!body.params) {
                    body.params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpParams */]();
                }
                body.params = body.params.append('token', token);
            }
        }
        else {
            if (token) {
                if (!body) {
                    body = {};
                }
                __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](body, { token: token });
            }
        }
        return this.http[method](url, body, options);
    };
    return prototypeExtension;
}, {});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

/* harmony default export */ __webpack_exports__["a"] = function (configs) {
    __WEBPACK_IMPORTED_MODULE_0_lodash__["extend"](this, { configs: configs });
};


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function () {
    return sessionStorage.getItem(this.configs.tokenName);
};


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function () {
    sessionStorage.removeItem(this.configs.tokenName);
};


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (token) {
    sessionStorage.setItem(this.configs.tokenName, token);
};


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_0_lodash__["debounce"](function () {
    clearTimeout(__WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].timeout);
    __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].timeout = setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].guardian.logout();
    }, __WEBPACK_IMPORTED_MODULE_1__lib_vars__["b" /* configs */].logoutTimeout * 60000);
}, 500);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (guardian) {
    var pathname = location.pathname;
    if (pathname !== '/') {
        guardian.redirectUrl = pathname;
    }
};;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_to_role_linker_route_to_role_linker__ = __webpack_require__(36);


/* harmony default export */ __webpack_exports__["a"] = function (guardian) {
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](guardian.router.config, function (route) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__route_to_role_linker_route_to_role_linker__["a" /* default */])(route); });
};;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_sterilizer__ = __webpack_require__(10);
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_vars__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route_getter__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_route_sterilizer__ = __webpack_require__(10);
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(4);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(4);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(52);
var isObject_1 = __webpack_require__(16);
var isFunction_1 = __webpack_require__(15);
var tryCatch_1 = __webpack_require__(58);
var errorObject_1 = __webpack_require__(14);
var UnsubscriptionError_1 = __webpack_require__(51);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var ScalarObservable_1 = __webpack_require__(44);
var EmptyObservable_1 = __webpack_require__(43);
var isScheduler_1 = __webpack_require__(55);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(42);
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__(49);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(4);
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(4);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(56);
var OuterSubscriber_1 = __webpack_require__(40);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(5);
var isArrayLike_1 = __webpack_require__(53);
var isPromise_1 = __webpack_require__(54);
var isObject_1 = __webpack_require__(16);
var Observable_1 = __webpack_require__(3);
var iterator_1 = __webpack_require__(50);
var InnerSubscriber_1 = __webpack_require__(39);
var observable_1 = __webpack_require__(12);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(4);
var rxSubscriber_1 = __webpack_require__(13);
var Observer_1 = __webpack_require__(11);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(14);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_60__;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_61__;

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constructor_constructor__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initializer_initializer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_processor_login_processor__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logout_processor_logout_processor__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__links_getter_links_getter__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__role_getter_role_getter__ = __webpack_require__(23);
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
            imports: [__WEBPACK_IMPORTED_MODULE_2_ng_http_client_plus__["a" /* HttpClientPlusModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__constructor_constructor__["a" /* Guardian */]]
        })
    ], GuardianModule);
    return GuardianModule;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZDE3NTYxMzFhZjMzOTVlMmY0ZSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6W1wibmdcIixcImNvcmVcIl0sXCJjb21tb25qc1wiOlwiQGFuZ3VsYXIvY29yZVwiLFwiY29tbW9uanMyXCI6XCJAYW5ndWxhci9jb3JlXCIsXCJhbWRcIjpcIkBhbmd1bGFyL2NvcmVcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL19saWIvdmFycy50cyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvdXRpbC9yb290LmpzIiwid2VicGFjazovLy8uL34vQGFuZ3VsYXIvY29tbW9uL0Bhbmd1bGFyL2NvbW1vbi9odHRwLmVzNS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm9sZS1zZXR0ZXIvcm9sZS1zZXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy9uZy1odHRwLWNsaWVudC1wbHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9hdXRvLWxvZ291dC1zZXR0ZXIvYXV0by1sb2dvdXQtc2V0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm91dGUtdG8tcm9sZS1saW5rZXIvX2xpYi9yb3V0ZS1zdGVyaWxpemVyLnRzIiwid2VicGFjazovLy8uL34vcnhqcy9PYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvc3ltYm9sL29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3N5bWJvbC9yeFN1YnNjcmliZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvdXRpbC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9pbml0aWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlua3MtZ2V0dGVyL2xpbmtzLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4tcHJvY2Vzc29yL2xvZ2luLXByb2Nlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nb3V0LXByb2Nlc3Nvci9sb2dvdXQtcHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9yb2xlLWdldHRlci9yb2xlLWdldHRlci50cyIsIndlYnBhY2s6Ly8vLi9+L0Bhbmd1bGFyL2NvbW1vbi9AYW5ndWxhci9jb21tb24uZXM1LmpzIiwid2VicGFjazovLy8uL34vbmctaHR0cC1jbGllbnQtcGx1cy9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwid2VicGFjazovLy8uL34vbmctaHR0cC1jbGllbnQtcGx1cy9zcmMvaHR0cC13cmFwcGVycy9fbGliL2h0dHAtY2xpZW50LW1ldGhvZHMudHMiLCJ3ZWJwYWNrOi8vLy4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy9odHRwLXdyYXBwZXJzL2h0dHAtd3JhcHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy9pbml0aWFsaXplci9pbml0aWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9+L25nLWh0dHAtY2xpZW50LXBsdXMvc3JjL3Rva2VuLWdldHRlci90b2tlbi1nZXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy90b2tlbi1yZW1vdmVyL3Rva2VuLXJlbW92ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy90b2tlbi1zZXR0ZXIvdG9rZW4tc2V0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hdXRvLWxvZ291dC1zZXR0ZXIvX2xpYi9hdXRvLWxvZ291dC1oYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9yZWRpcmVjdC1jYXB0dXJlci9yZWRpcmVjdC1jYXB0dXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvbGVzLWFzc2VtYmxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL19saWIvcm91dGUtZ2V0dGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbml0aWFsaXplci9yb2xlcy1hc3NlbWJsZXIvcm91dGUtdG8tcm9sZS1saW5rZXIvcm91dGUtdG8tcm9sZS1saW5rZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGUtc2V0dGVyL2xpbmtzLWdlbmVyYXRvci9saW5rcy1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGUtc2V0dGVyL3JvdXRlcy1maWx0ZXJlci9yb3V0ZXMtZmlsdGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL0lubmVyU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvT3V0ZXJTdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vYnNlcnZhYmxlL0VtcHR5T2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvb2JzZXJ2YWJsZS9TY2FsYXJPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vYnNlcnZhYmxlL29mLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vcGVyYXRvci9jb25jYXRNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL29wZXJhdG9yL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvb3BlcmF0b3IvbWFwLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9vcGVyYXRvci9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vcnhqcy91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvdXRpbC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvdXRpbC9pc1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvaXNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy91dGlsL3RyeUNhdGNoLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlJ4XCIsXCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpbXCJuZ1wiLFwicm91dGVyXCJdLFwiY29tbW9uanNcIjpcIkBhbmd1bGFyL3JvdXRlclwiLFwiY29tbW9uanMyXCI6XCJAYW5ndWxhci9yb3V0ZXJcIixcImFtZFwiOlwiQGFuZ3VsYXIvcm91dGVyXCJ9Iiwid2VicGFjazovLy8uL3NyYy9uZy1ndWFyZGlhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7OztBQ0FBO0FBQUEsSUFBTSxLQUFLLEdBQUc7SUFDWixJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7SUFDbEMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO0lBQ3BDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztDQUNsQyxDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQUc7SUFDZCxPQUFPLEVBQUUsSUFBSTtJQUNiLFFBQVEsRUFBRSxJQUFJO0lBQ2QsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQztBQUtBOzs7Ozs7OztBQ2ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxFQUFFO0FBQ3RDO0FBQ0EsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckIsbUJBQW1CLEVBQUU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDJDOzs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0EsV0FBVyxvREFBb0Q7QUFDL0Q7QUFDQTtBQUNBLFdBQVcsb0ZBQW9GO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVDQUF1QztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUNBQXVDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUNBQXVDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0Esb0M7Ozs7Ozs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBHQUEwRywwQ0FBMEMsRUFBRTtBQUN0SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsK0M7Ozs7Ozs7QUN4QkE7QUFDQSxrREFBa0QsMENBQTBDLEVBQUU7QUFDOUYsbUM7Ozs7Ozs7QUNGQTtBQUNBLHFDQUFxQywwQ0FBMEMsRUFBRTtBQUNqRix1Qzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdDQUFnQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQiwrQkFBK0IsRUFBRTtBQUM1RDtBQUNBO0FBQ0EsZ0RBQWdELFdBQVcsRUFBRTtBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDOzs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E0QztBQUNPO0FBQ007QUFDTztBQUNEO0FBQ1E7QUFDRTtBQUNSO0FBQ0Y7QUFFL0QsOENBQVEsQ0FBQywwRUFBUSxDQUFDLFNBQVMsRUFBRTtJQUMzQixJQUFJO0lBQ0osS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0lBQ0wsSUFBSTtDQUNMLENBQUMsQ0FBQztBQU1IO0lBQUE7SUFBc0IsQ0FBQztJQUFqQixjQUFjO1FBSm5CLDhFQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxpRkFBb0IsQ0FBQztZQUMvQixTQUFTLEVBQUUsQ0FBQywwRUFBUSxDQUFDO1NBQ3RCLENBQUM7T0FDSSxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBO0FBS3JCIiwiZmlsZSI6Im5nLWd1YXJkaWFuLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIiksIHJlcXVpcmUoXCJyeGpzXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvcm91dGVyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImxvZGFzaFwiLCBcIkBhbmd1bGFyL2NvcmVcIiwgXCJyeGpzXCIsIFwiQGFuZ3VsYXIvcm91dGVyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nR3VhcmRpYW5cIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2hcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwicnhqc1wiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdHdWFyZGlhblwiXSA9IGZhY3Rvcnkocm9vdFtcIl9cIl0sIHJvb3RbXCJuZ1wiXVtcImNvcmVcIl0sIHJvb3RbXCJSeFwiXSwgcm9vdFtcIm5nXCJdW1wicm91dGVyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82MF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzYxX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZDE3NTYxMzFhZjMzOTVlMmY0ZSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIixcImFtZFwiOlwibG9kYXNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOltcIm5nXCIsXCJjb3JlXCJdLFwiY29tbW9uanNcIjpcIkBhbmd1bGFyL2NvcmVcIixcImNvbW1vbmpzMlwiOlwiQGFuZ3VsYXIvY29yZVwiLFwiYW1kXCI6XCJAYW5ndWxhci9jb3JlXCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHJvbGVzID0ge1xuICBhdXRoOiB7cm91dGVzOiBbXSwgX2RlZmF1bHQ6IG51bGx9LFxuICBub0F1dGg6IHtyb3V0ZXM6IFtdLCBfZGVmYXVsdDogbnVsbH0sXG4gIGFsbDoge3JvdXRlczogW10sIF9kZWZhdWx0OiBudWxsfVxufTtcblxuY29uc3QgY29uZmlncyA9IHtcbiAgdGltZW91dDogbnVsbCxcbiAgZ3VhcmRpYW46IG51bGwsXG4gIGxvZ291dFRpbWVvdXQ6IG51bGxcbn07XG5cbmV4cG9ydCB7XG4gIGNvbmZpZ3MsXG4gIHJvbGVzXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL19saWIvdmFycy50cyIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9yb290Jyk7XG52YXIgdG9TdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3V0aWwvdG9TdWJzY3JpYmVyJyk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9zeW1ib2wvb2JzZXJ2YWJsZScpO1xuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIGFueSBzZXQgb2YgdmFsdWVzIG92ZXIgYW55IGFtb3VudCBvZiB0aW1lLiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIGJ1aWxkaW5nIGJsb2NrXG4gKiBvZiBSeEpTLlxuICpcbiAqIEBjbGFzcyBPYnNlcnZhYmxlPFQ+XG4gKi9cbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmUgdGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIE9ic2VydmFibGUgaXNcbiAgICAgKiBpbml0aWFsbHkgc3Vic2NyaWJlZCB0by4gVGhpcyBmdW5jdGlvbiBpcyBnaXZlbiBhIFN1YnNjcmliZXIsIHRvIHdoaWNoIG5ldyB2YWx1ZXNcbiAgICAgKiBjYW4gYmUgYG5leHRgZWQsIG9yIGFuIGBlcnJvcmAgbWV0aG9kIGNhbiBiZSBjYWxsZWQgdG8gcmFpc2UgYW4gZXJyb3IsIG9yXG4gICAgICogYGNvbXBsZXRlYCBjYW4gYmUgY2FsbGVkIHRvIG5vdGlmeSBvZiBhIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IGZhbHNlO1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBPYnNlcnZhYmxlLCB3aXRoIHRoaXMgT2JzZXJ2YWJsZSBhcyB0aGUgc291cmNlLCBhbmQgdGhlIHBhc3NlZFxuICAgICAqIG9wZXJhdG9yIGRlZmluZWQgYXMgdGhlIG5ldyBvYnNlcnZhYmxlJ3Mgb3BlcmF0b3IuXG4gICAgICogQG1ldGhvZCBsaWZ0XG4gICAgICogQHBhcmFtIHtPcGVyYXRvcn0gb3BlcmF0b3IgdGhlIG9wZXJhdG9yIGRlZmluaW5nIHRoZSBvcGVyYXRpb24gdG8gdGFrZSBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IG9ic2VydmFibGUgd2l0aCB0aGUgT3BlcmF0b3IgYXBwbGllZFxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIG9ic2VydmFibGUub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnZva2VzIGFuIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlIGFuZCByZWdpc3RlcnMgT2JzZXJ2ZXIgaGFuZGxlcnMgZm9yIG5vdGlmaWNhdGlvbnMgaXQgd2lsbCBlbWl0LlxuICAgICAqXG4gICAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlVzZSBpdCB3aGVuIHlvdSBoYXZlIGFsbCB0aGVzZSBPYnNlcnZhYmxlcywgYnV0IHN0aWxsIG5vdGhpbmcgaXMgaGFwcGVuaW5nLjwvc3Bhbj5cbiAgICAgKlxuICAgICAqIGBzdWJzY3JpYmVgIGlzIG5vdCBhIHJlZ3VsYXIgb3BlcmF0b3IsIGJ1dCBhIG1ldGhvZCB0aGF0IGNhbGxzIE9ic2VydmFibGUncyBpbnRlcm5hbCBgc3Vic2NyaWJlYCBmdW5jdGlvbi4gSXRcbiAgICAgKiBtaWdodCBiZSBmb3IgZXhhbXBsZSBhIGZ1bmN0aW9uIHRoYXQgeW91IHBhc3NlZCB0byBhIHtAbGluayBjcmVhdGV9IHN0YXRpYyBmYWN0b3J5LCBidXQgbW9zdCBvZiB0aGUgdGltZSBpdCBpc1xuICAgICAqIGEgbGlicmFyeSBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggZGVmaW5lcyB3aGF0IGFuZCB3aGVuIHdpbGwgYmUgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlLiBUaGlzIG1lYW5zIHRoYXQgY2FsbGluZ1xuICAgICAqIGBzdWJzY3JpYmVgIGlzIGFjdHVhbGx5IHRoZSBtb21lbnQgd2hlbiBPYnNlcnZhYmxlIHN0YXJ0cyBpdHMgd29yaywgbm90IHdoZW4gaXQgaXMgY3JlYXRlZCwgYXMgaXQgaXMgb2Z0ZW5cbiAgICAgKiB0aG91Z2h0LlxuICAgICAqXG4gICAgICogQXBhcnQgZnJvbSBzdGFydGluZyB0aGUgZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUsIHRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gbGlzdGVuIGZvciB2YWx1ZXNcbiAgICAgKiB0aGF0IGFuIE9ic2VydmFibGUgZW1pdHMsIGFzIHdlbGwgYXMgZm9yIHdoZW4gaXQgY29tcGxldGVzIG9yIGVycm9ycy4gWW91IGNhbiBhY2hpZXZlIHRoaXMgaW4gdHdvXG4gICAgICogZm9sbG93aW5nIHdheXMuXG4gICAgICpcbiAgICAgKiBUaGUgZmlyc3Qgd2F5IGlzIGNyZWF0aW5nIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UuIEl0IHNob3VsZCBoYXZlIG1ldGhvZHNcbiAgICAgKiBkZWZpbmVkIGJ5IHRoYXQgaW50ZXJmYWNlLCBidXQgbm90ZSB0aGF0IGl0IHNob3VsZCBiZSBqdXN0IGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCwgd2hpY2ggeW91IGNhbiBjcmVhdGVcbiAgICAgKiB5b3Vyc2VsZiBpbiBhbnkgd2F5IHlvdSB3YW50IChFUzYgY2xhc3MsIGNsYXNzaWMgZnVuY3Rpb24gY29uc3RydWN0b3IsIG9iamVjdCBsaXRlcmFsIGV0Yy4pLiBJbiBwYXJ0aWN1bGFyIGRvXG4gICAgICogbm90IGF0dGVtcHQgdG8gdXNlIGFueSBSeEpTIGltcGxlbWVudGF0aW9uIGRldGFpbHMgdG8gY3JlYXRlIE9ic2VydmVycyAtIHlvdSBkb24ndCBuZWVkIHRoZW0uIFJlbWVtYmVyIGFsc29cbiAgICAgKiB0aGF0IHlvdXIgb2JqZWN0IGRvZXMgbm90IGhhdmUgdG8gaW1wbGVtZW50IGFsbCBtZXRob2RzLiBJZiB5b3UgZmluZCB5b3Vyc2VsZiBjcmVhdGluZyBhIG1ldGhvZCB0aGF0IGRvZXNuJ3RcbiAgICAgKiBkbyBhbnl0aGluZywgeW91IGNhbiBzaW1wbHkgb21pdCBpdC4gTm90ZSBob3dldmVyLCB0aGF0IGlmIGBlcnJvcmAgbWV0aG9kIGlzIG5vdCBwcm92aWRlZCwgYWxsIGVycm9ycyB3aWxsXG4gICAgICogYmUgbGVmdCB1bmNhdWdodC5cbiAgICAgKlxuICAgICAqIFRoZSBzZWNvbmQgd2F5IGlzIHRvIGdpdmUgdXAgb24gT2JzZXJ2ZXIgb2JqZWN0IGFsdG9nZXRoZXIgYW5kIHNpbXBseSBwcm92aWRlIGNhbGxiYWNrIGZ1bmN0aW9ucyBpbiBwbGFjZSBvZiBpdHMgbWV0aG9kcy5cbiAgICAgKiBUaGlzIG1lYW5zIHlvdSBjYW4gcHJvdmlkZSB0aHJlZSBmdW5jdGlvbnMgYXMgYXJndW1lbnRzIHRvIGBzdWJzY3JpYmVgLCB3aGVyZSBmaXJzdCBmdW5jdGlvbiBpcyBlcXVpdmFsZW50XG4gICAgICogb2YgYSBgbmV4dGAgbWV0aG9kLCBzZWNvbmQgb2YgYW4gYGVycm9yYCBtZXRob2QgYW5kIHRoaXJkIG9mIGEgYGNvbXBsZXRlYCBtZXRob2QuIEp1c3QgYXMgaW4gY2FzZSBvZiBPYnNlcnZlcixcbiAgICAgKiBpZiB5b3UgZG8gbm90IG5lZWQgdG8gbGlzdGVuIGZvciBzb21ldGhpbmcsIHlvdSBjYW4gb21pdCBhIGZ1bmN0aW9uLCBwcmVmZXJhYmx5IGJ5IHBhc3NpbmcgYHVuZGVmaW5lZGAgb3IgYG51bGxgLFxuICAgICAqIHNpbmNlIGBzdWJzY3JpYmVgIHJlY29nbml6ZXMgdGhlc2UgZnVuY3Rpb25zIGJ5IHdoZXJlIHRoZXkgd2VyZSBwbGFjZWQgaW4gZnVuY3Rpb24gY2FsbC4gV2hlbiBpdCBjb21lc1xuICAgICAqIHRvIGBlcnJvcmAgZnVuY3Rpb24sIGp1c3QgYXMgYmVmb3JlLCBpZiBub3QgcHJvdmlkZWQsIGVycm9ycyBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUgd2lsbCBiZSB0aHJvd24uXG4gICAgICpcbiAgICAgKiBXaGF0ZXZlciBzdHlsZSBvZiBjYWxsaW5nIGBzdWJzY3JpYmVgIHlvdSB1c2UsIGluIGJvdGggY2FzZXMgaXQgcmV0dXJucyBhIFN1YnNjcmlwdGlvbiBvYmplY3QuXG4gICAgICogVGhpcyBvYmplY3QgYWxsb3dzIHlvdSB0byBjYWxsIGB1bnN1YnNjcmliZWAgb24gaXQsIHdoaWNoIGluIHR1cm4gd2lsbCBzdG9wIHdvcmsgdGhhdCBhbiBPYnNlcnZhYmxlIGRvZXMgYW5kIHdpbGwgY2xlYW5cbiAgICAgKiB1cCBhbGwgcmVzb3VyY2VzIHRoYXQgYW4gT2JzZXJ2YWJsZSB1c2VkLiBOb3RlIHRoYXQgY2FuY2VsbGluZyBhIHN1YnNjcmlwdGlvbiB3aWxsIG5vdCBjYWxsIGBjb21wbGV0ZWAgY2FsbGJhY2tcbiAgICAgKiBwcm92aWRlZCB0byBgc3Vic2NyaWJlYCBmdW5jdGlvbiwgd2hpY2ggaXMgcmVzZXJ2ZWQgZm9yIGEgcmVndWxhciBjb21wbGV0aW9uIHNpZ25hbCB0aGF0IGNvbWVzIGZyb20gYW4gT2JzZXJ2YWJsZS5cbiAgICAgKlxuICAgICAqIFJlbWVtYmVyIHRoYXQgY2FsbGJhY2tzIHByb3ZpZGVkIHRvIGBzdWJzY3JpYmVgIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSBjYWxsZWQgYXN5bmNocm9ub3VzbHkuXG4gICAgICogSXQgaXMgYW4gT2JzZXJ2YWJsZSBpdHNlbGYgdGhhdCBkZWNpZGVzIHdoZW4gdGhlc2UgZnVuY3Rpb25zIHdpbGwgYmUgY2FsbGVkLiBGb3IgZXhhbXBsZSB7QGxpbmsgb2Z9XG4gICAgICogYnkgZGVmYXVsdCBlbWl0cyBhbGwgaXRzIHZhbHVlcyBzeW5jaHJvbm91c2x5LiBBbHdheXMgY2hlY2sgZG9jdW1lbnRhdGlvbiBmb3IgaG93IGdpdmVuIE9ic2VydmFibGVcbiAgICAgKiB3aWxsIGJlaGF2ZSB3aGVuIHN1YnNjcmliZWQgYW5kIGlmIGl0cyBkZWZhdWx0IGJlaGF2aW9yIGNhbiBiZSBtb2RpZmllZCB3aXRoIGEge0BsaW5rIFNjaGVkdWxlcn0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgd2l0aCBhbiBPYnNlcnZlcjwvY2FwdGlvbj5cbiAgICAgKiBjb25zdCBzdW1PYnNlcnZlciA9IHtcbiAgICAgKiAgIHN1bTogMCxcbiAgICAgKiAgIG5leHQodmFsdWUpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FkZGluZzogJyArIHZhbHVlKTtcbiAgICAgKiAgICAgdGhpcy5zdW0gPSB0aGlzLnN1bSArIHZhbHVlO1xuICAgICAqICAgfSxcbiAgICAgKiAgIGVycm9yKCkgeyAvLyBXZSBhY3R1YWxseSBjb3VsZCBqdXN0IHJlbW92ZSB0aGlzIG1ldGhvZCxcbiAgICAgKiAgIH0sICAgICAgICAvLyBzaW5jZSB3ZSBkbyBub3QgcmVhbGx5IGNhcmUgYWJvdXQgZXJyb3JzIHJpZ2h0IG5vdy5cbiAgICAgKiAgIGNvbXBsZXRlKCkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnU3VtIGVxdWFsczogJyArIHRoaXMuc3VtKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5vZigxLCAyLCAzKSAvLyBTeW5jaHJvbm91c2x5IGVtaXRzIDEsIDIsIDMgYW5kIHRoZW4gY29tcGxldGVzLlxuICAgICAqIC5zdWJzY3JpYmUoc3VtT2JzZXJ2ZXIpO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyBcIkFkZGluZzogMVwiXG4gICAgICogLy8gXCJBZGRpbmc6IDJcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAzXCJcbiAgICAgKiAvLyBcIlN1bSBlcXVhbHM6IDZcIlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TdWJzY3JpYmUgd2l0aCBmdW5jdGlvbnM8L2NhcHRpb24+XG4gICAgICogbGV0IHN1bSA9IDA7XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLm9mKDEsIDIsIDMpXG4gICAgICogLnN1YnNjcmliZShcbiAgICAgKiAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBZGRpbmc6ICcgKyB2YWx1ZSk7XG4gICAgICogICAgIHN1bSA9IHN1bSArIHZhbHVlO1xuICAgICAqICAgfSxcbiAgICAgKiAgIHVuZGVmaW5lZCxcbiAgICAgKiAgIGZ1bmN0aW9uKCkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnU3VtIGVxdWFsczogJyArIHN1bSk7XG4gICAgICogICB9XG4gICAgICogKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gXCJBZGRpbmc6IDFcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAyXCJcbiAgICAgKiAvLyBcIkFkZGluZzogM1wiXG4gICAgICogLy8gXCJTdW0gZXF1YWxzOiA2XCJcbiAgICAgKlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+Q2FuY2VsIGEgc3Vic2NyaXB0aW9uPC9jYXB0aW9uPlxuICAgICAqIGNvbnN0IHN1YnNjcmlwdGlvbiA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkuc3Vic2NyaWJlKFxuICAgICAqICAgbnVtID0+IGNvbnNvbGUubG9nKG51bSksXG4gICAgICogICB1bmRlZmluZWQsXG4gICAgICogICAoKSA9PiBjb25zb2xlLmxvZygnY29tcGxldGVkIScpIC8vIFdpbGwgbm90IGJlIGNhbGxlZCwgZXZlblxuICAgICAqICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGNhbmNlbGxpbmcgc3Vic2NyaXB0aW9uXG4gICAgICpcbiAgICAgKlxuICAgICAqIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAqICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICogICBjb25zb2xlLmxvZygndW5zdWJzY3JpYmVkIScpO1xuICAgICAqIH0sIDI1MDApO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyAwIGFmdGVyIDFzXG4gICAgICogLy8gMSBhZnRlciAyc1xuICAgICAqIC8vIFwidW5zdWJzY3JpYmVkIVwiIGFmdGVyIDIuNXNcbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcnxGdW5jdGlvbn0gb2JzZXJ2ZXJPck5leHQgKG9wdGlvbmFsKSBFaXRoZXIgYW4gb2JzZXJ2ZXIgd2l0aCBtZXRob2RzIHRvIGJlIGNhbGxlZCxcbiAgICAgKiAgb3IgdGhlIGZpcnN0IG9mIHRocmVlIHBvc3NpYmxlIGhhbmRsZXJzLCB3aGljaCBpcyB0aGUgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGZyb20gdGhlIHN1YnNjcmliZWRcbiAgICAgKiAgT2JzZXJ2YWJsZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvciAob3B0aW9uYWwpIEEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBhbiBlcnJvci4gSWYgbm8gZXJyb3IgaGFuZGxlciBpcyBwcm92aWRlZCxcbiAgICAgKiAgdGhlIGVycm9yIHdpbGwgYmUgdGhyb3duIGFzIHVuaGFuZGxlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZSAob3B0aW9uYWwpIEEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICogQHJldHVybiB7SVN1YnNjcmlwdGlvbn0gYSBzdWJzY3JpcHRpb24gcmVmZXJlbmNlIHRvIHRoZSByZWdpc3RlcmVkIGhhbmRsZXJzXG4gICAgICogQG1ldGhvZCBzdWJzY3JpYmVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xuICAgICAgICB2YXIgc2luayA9IHRvU3Vic2NyaWJlcl8xLnRvU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBvcGVyYXRvci5jYWxsKHNpbmssIHRoaXMuc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsuYWRkKHRoaXMuc291cmNlID8gdGhpcy5fc3Vic2NyaWJlKHNpbmspIDogdGhpcy5fdHJ5U3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZm9yRWFjaFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgYSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcGFyYW0ge1Byb21pc2VDb25zdHJ1Y3Rvcn0gW1Byb21pc2VDdG9yXSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlIFByb21pc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb24gb2JzZXJ2YWJsZSBjb21wbGV0aW9uIG9yXG4gICAgICogIHJlamVjdHMgd2l0aCB0aGUgaGFuZGxlZCBlcnJvclxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgaWYgKHJvb3RfMS5yb290LlJ4ICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZyAmJiByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb290XzEucm9vdC5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBNdXN0IGJlIGRlY2xhcmVkIGluIGEgc2VwYXJhdGUgc3RhdGVtZW50IHRvIGF2b2lkIGEgUmVmZXJuY2VFcnJvciB3aGVuXG4gICAgICAgICAgICAvLyBhY2Nlc3Npbmcgc3Vic2NyaXB0aW9uIGJlbG93IGluIHRoZSBjbG9zdXJlIGR1ZSB0byBUZW1wb3JhbCBEZWFkIFpvbmUuXG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24sIHRoZW4gd2UgY2FuIHN1cm1pc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIHJlamVjdGVkIGV4cGxpY2l0bHkgYW5kIHVuc3Vic2NyaWJlIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIG1hbnVhbGx5XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBOTyBzdWJzY3JpcHRpb24sIHRoZW4gd2UncmUgZ2V0dGluZyBhIG5leHRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZSBzeW5jaHJvbm91c2x5IGR1cmluZyBzdWJzY3JpcHRpb24uIFdlIGNhbiBqdXN0IGNhbGwgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bnN1YnNjcmlwdGlvbiBsb2dpYyBpcyBjYWxsZWQsIHRoZW4gc3luY2hyb25vdXNseSByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhhdCwgUHJvbWlzZSB3aWxsIHRyYXAgdGhlIGVycm9yIGFuZCBzZW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhpcyBpbnN0YW5jZSBvZiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvLyBIQUNLOiBTaW5jZSBUeXBlU2NyaXB0IGluaGVyaXRzIHN0YXRpYyBwcm9wZXJ0aWVzIHRvbywgd2UgaGF2ZSB0b1xuICAgIC8vIGZpZ2h0IGFnYWluc3QgVHlwZVNjcmlwdCBoZXJlIHNvIFN1YmplY3QgY2FuIGhhdmUgYSBkaWZmZXJlbnQgc3RhdGljIGNyZWF0ZSBzaWduYXR1cmVcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGNvbGQgT2JzZXJ2YWJsZSBieSBjYWxsaW5nIHRoZSBPYnNlcnZhYmxlIGNvbnN0cnVjdG9yXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZT8gdGhlIHN1YnNjcmliZXIgZnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIHRoZSBPYnNlcnZhYmxlIGNvbnN0cnVjdG9yXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYSBuZXcgY29sZCBvYnNlcnZhYmxlXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmUpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuZXhwb3J0cy5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvT2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuL09ic2VydmVyJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UgYW5kIGV4dGVuZHMgdGhlXG4gKiB7QGxpbmsgU3Vic2NyaXB0aW9ufSBjbGFzcy4gV2hpbGUgdGhlIHtAbGluayBPYnNlcnZlcn0gaXMgdGhlIHB1YmxpYyBBUEkgZm9yXG4gKiBjb25zdW1pbmcgdGhlIHZhbHVlcyBvZiBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0sIGFsbCBPYnNlcnZlcnMgZ2V0IGNvbnZlcnRlZCB0b1xuICogYSBTdWJzY3JpYmVyLCBpbiBvcmRlciB0byBwcm92aWRlIFN1YnNjcmlwdGlvbi1saWtlIGNhcGFiaWxpdGllcyBzdWNoIGFzXG4gKiBgdW5zdWJzY3JpYmVgLiBTdWJzY3JpYmVyIGlzIGEgY29tbW9uIHR5cGUgaW4gUnhKUywgYW5kIGNydWNpYWwgZm9yXG4gKiBpbXBsZW1lbnRpbmcgb3BlcmF0b3JzLCBidXQgaXQgaXMgcmFyZWx5IHVzZWQgYXMgYSBwdWJsaWMgQVBJLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gW2Rlc3RpbmF0aW9uT3JOZXh0XSBBIHBhcnRpYWxseVxuICAgICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE9ic2VydmVyXzEuZW1wdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25Pck5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmFkZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgLyoqXG4gICAgICogQSBzdGF0aWMgZmFjdG9yeSBmb3IgYSBTdWJzY3JpYmVyLCBnaXZlbiBhIChwb3RlbnRpYWxseSBwYXJ0aWFsKSBkZWZpbml0aW9uXG4gICAgICogb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbih4OiA/VCk6IHZvaWR9IFtuZXh0XSBUaGUgYG5leHRgIGNhbGxiYWNrIG9mIGFuIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpYmVyPFQ+fSBBIFN1YnNjcmliZXIgd3JhcHBpbmcgdGhlIChwYXJ0aWFsbHkgZGVmaW5lZClcbiAgICAgKiBPYnNlcnZlciByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICAgICAqL1xuICAgIFN1YnNjcmliZXIuY3JlYXRlID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYG5leHRgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhIHZhbHVlLiBUaGUgT2JzZXJ2YWJsZSBtYXkgY2FsbCB0aGlzIG1ldGhvZCAwIG9yIG1vcmVcbiAgICAgKiB0aW1lcy5cbiAgICAgKiBAcGFyYW0ge1R9IFt2YWx1ZV0gVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBlcnJvcmAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGFuIGF0dGFjaGVkIHtAbGluayBFcnJvcn0uIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0XG4gICAgICogdGhlIE9ic2VydmFibGUgaGFzIGV4cGVyaWVuY2VkIGFuIGVycm9yIGNvbmRpdGlvbi5cbiAgICAgKiBAcGFyYW0ge2FueX0gW2Vycl0gVGhlIGBlcnJvcmAgZXhjZXB0aW9uLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgYSB2YWx1ZWxlc3Mgbm90aWZpY2F0aW9uIG9mIHR5cGVcbiAgICAgKiBgY29tcGxldGVgIGZyb20gdGhlIE9ic2VydmFibGUuIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlXG4gICAgICogaGFzIGZpbmlzaGVkIHNlbmRpbmcgcHVzaC1iYXNlZCBub3RpZmljYXRpb25zLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZUFuZFJlY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gX3BhcmVudHM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJzY3JpYmVyID0gU3Vic2NyaWJlcjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihfcGFyZW50U3Vic2NyaWJlciwgb2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaWJlciA9IF9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpKSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dC5uZXh0O1xuICAgICAgICAgICAgZXJyb3IgPSBvYnNlcnZlck9yTmV4dC5lcnJvcjtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gb2JzZXJ2ZXJPck5leHQuY29tcGxldGU7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJPck5leHQgIT09IE9ic2VydmVyXzEuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShvYnNlcnZlck9yTmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGNvbnRleHQudW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGNvbnRleHQudW5zdWJzY3JpYmUuYmluZChjb250ZXh0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQudW5zdWJzY3JpYmUgPSB0aGlzLnVuc3Vic2NyaWJlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuX25leHQgPSBuZXh0O1xuICAgICAgICB0aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLl9jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICAgIH1cbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkICYmIHRoaXMuX25leHQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX25leHQsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9uZXh0LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZENvbXBsZXRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2NvbXBsZXRlLmNhbGwoX3RoaXMuX2NvbnRleHQpOyB9O1xuICAgICAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB3cmFwcGVkQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX190cnlPclVuc3ViID0gZnVuY3Rpb24gKGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX190cnlPclNldEVycm9yID0gZnVuY3Rpb24gKHBhcmVudCwgZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgX3BhcmVudFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9TdWJzY3JpYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29tbW9uSlMgLyBOb2RlIGhhdmUgZ2xvYmFsIGNvbnRleHQgZXhwb3NlZCBhcyBcImdsb2JhbFwiIHZhcmlhYmxlLlxuLy8gV2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoZSB3aG9sZSBub2RlLmQudHMgdGhpcyB0aGlzIGNvbXBpbGF0aW9uIHVuaXQgc28gd2UnbGwganVzdCBmYWtlXG4vLyB0aGUgZ2xvYmFsIFwiZ2xvYmFsXCIgdmFyIGZvciBub3cuXG52YXIgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG52YXIgX19zZWxmID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiYgc2VsZjtcbnZhciBfX2dsb2JhbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbDtcbnZhciBfcm9vdCA9IF9fd2luZG93IHx8IF9fZ2xvYmFsIHx8IF9fc2VsZjtcbmV4cG9ydHMucm9vdCA9IF9yb290O1xuLy8gV29ya2Fyb3VuZCBDbG9zdXJlIENvbXBpbGVyIHJlc3RyaWN0aW9uOiBUaGUgYm9keSBvZiBhIGdvb2cubW9kdWxlIGNhbm5vdCB1c2UgdGhyb3cuXG4vLyBUaGlzIGlzIG5lZWRlZCB3aGVuIHVzZWQgd2l0aCBhbmd1bGFyL3RzaWNrbGUgd2hpY2ggaW5zZXJ0cyBhIGdvb2cubW9kdWxlIHN0YXRlbWVudC5cbi8vIFdyYXAgaW4gSUlGRVxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIV9yb290KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnhKUyBjb3VsZCBub3QgZmluZCBhbnkgZ2xvYmFsIGNvbnRleHQgKHdpbmRvdywgc2VsZiwgZ2xvYmFsKScpO1xuICAgIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb290LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFyIHY0LjMuNVxuICogKGMpIDIwMTAtMjAxNyBHb29nbGUsIEluYy4gaHR0cHM6Ly9hbmd1bGFyLmlvL1xuICogTGljZW5zZTogTUlUXG4gKi9cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nTW9kdWxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3IvY29uY2F0TWFwJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3IvZmlsdGVyJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IERPQ1VNRU5ULCDJtXBhcnNlQ29va2llVmFsdWUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gYEh0dHBSZXF1ZXN0YCBpbnRvIGEgc3RyZWFtIG9mIGBIdHRwRXZlbnRgcywgb25lIG9mIHdoaWNoIHdpbGwgbGlrZWx5IGJlIGFcbiAqIGBIdHRwUmVzcG9uc2VgLlxuICpcbiAqIGBIdHRwSGFuZGxlcmAgaXMgaW5qZWN0YWJsZS4gV2hlbiBpbmplY3RlZCwgdGhlIGhhbmRsZXIgaW5zdGFuY2UgZGlzcGF0Y2hlcyByZXF1ZXN0cyB0byB0aGVcbiAqIGZpcnN0IGludGVyY2VwdG9yIGluIHRoZSBjaGFpbiwgd2hpY2ggZGlzcGF0Y2hlcyB0byB0aGUgc2Vjb25kLCBldGMsIGV2ZW50dWFsbHkgcmVhY2hpbmcgdGhlXG4gKiBgSHR0cEJhY2tlbmRgLlxuICpcbiAqIEluIGFuIGBIdHRwSW50ZXJjZXB0b3JgLCB0aGUgYEh0dHBIYW5kbGVyYCBwYXJhbWV0ZXIgaXMgdGhlIG5leHQgaW50ZXJjZXB0b3IgaW4gdGhlIGNoYWluLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICogQGFic3RyYWN0XG4gKi9cbnZhciBIdHRwSGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSHR0cEhhbmRsZXIoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gcmVxXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwSGFuZGxlci5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKHJlcSkgeyB9O1xuICAgIHJldHVybiBIdHRwSGFuZGxlcjtcbn0oKSk7XG4vKipcbiAqIEEgZmluYWwgYEh0dHBIYW5kbGVyYCB3aGljaCB3aWxsIGRpc3BhdGNoIHRoZSByZXF1ZXN0IHZpYSBicm93c2VyIEhUVFAgQVBJcyB0byBhIGJhY2tlbmQuXG4gKlxuICogSW50ZXJjZXB0b3JzIHNpdCBiZXR3ZWVuIHRoZSBgSHR0cENsaWVudGAgaW50ZXJmYWNlIGFuZCB0aGUgYEh0dHBCYWNrZW5kYC5cbiAqXG4gKiBXaGVuIGluamVjdGVkLCBgSHR0cEJhY2tlbmRgIGRpc3BhdGNoZXMgcmVxdWVzdHMgZGlyZWN0bHkgdG8gdGhlIGJhY2tlbmQsIHdpdGhvdXQgZ29pbmdcbiAqIHRocm91Z2ggdGhlIGludGVyY2VwdG9yIGNoYWluLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICogQGFic3RyYWN0XG4gKi9cbnZhciBIdHRwQmFja2VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSHR0cEJhY2tlbmQoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gcmVxXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwQmFja2VuZC5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKHJlcSkgeyB9O1xuICAgIHJldHVybiBIdHRwQmFja2VuZDtcbn0oKSk7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEEgYEh0dHBQYXJhbWV0ZXJDb2RlY2AgdGhhdCB1c2VzIGBlbmNvZGVVUklDb21wb25lbnRgIGFuZCBgZGVjb2RlVVJJQ29tcG9uZW50YCB0b1xuICogc2VyaWFsaXplIGFuZCBwYXJzZSBVUkwgcGFyYW1ldGVyIGtleXMgYW5kIHZhbHVlcy5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBVcmxFbmNvZGluZ0NvZGVjID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwVXJsRW5jb2RpbmdDb2RlYygpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBrXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwVXJsRW5jb2RpbmdDb2RlYy5wcm90b3R5cGUuZW5jb2RlS2V5ID0gZnVuY3Rpb24gKGspIHsgcmV0dXJuIHN0YW5kYXJkRW5jb2Rpbmcoayk7IH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwVXJsRW5jb2RpbmdDb2RlYy5wcm90b3R5cGUuZW5jb2RlVmFsdWUgPSBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RhbmRhcmRFbmNvZGluZyh2KTsgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGtcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBVcmxFbmNvZGluZ0NvZGVjLnByb3RvdHlwZS5kZWNvZGVLZXkgPSBmdW5jdGlvbiAoaykgeyByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGspOyB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFVybEVuY29kaW5nQ29kZWMucHJvdG90eXBlLmRlY29kZVZhbHVlID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2KTsgfTtcbiAgICByZXR1cm4gSHR0cFVybEVuY29kaW5nQ29kZWM7XG59KCkpO1xuLyoqXG4gKiBAcGFyYW0gez99IHJhd1BhcmFtc1xuICogQHBhcmFtIHs/fSBjb2RlY1xuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gcGFyYW1QYXJzZXIocmF3UGFyYW1zLCBjb2RlYykge1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIG1hcCQkMSA9IG5ldyBNYXAoKTtcbiAgICBpZiAocmF3UGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcGFyYW1zID0gcmF3UGFyYW1zLnNwbGl0KCcmJyk7XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gZXFJZHggPSBwYXJhbS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgICB2YXIgX2EgPSBlcUlkeCA9PSAtMSA/XG4gICAgICAgICAgICAgICAgW2NvZGVjLmRlY29kZUtleShwYXJhbSksICcnXSA6XG4gICAgICAgICAgICAgICAgW2NvZGVjLmRlY29kZUtleShwYXJhbS5zbGljZSgwLCBlcUlkeCkpLCBjb2RlYy5kZWNvZGVWYWx1ZShwYXJhbS5zbGljZShlcUlkeCArIDEpKV0sIGtleSA9IF9hWzBdLCB2YWwgPSBfYVsxXTtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGxpc3QgPSBtYXAkJDEuZ2V0KGtleSkgfHwgW107XG4gICAgICAgICAgICBsaXN0LnB1c2godmFsKTtcbiAgICAgICAgICAgIG1hcCQkMS5zZXQoa2V5LCBsaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtYXAkJDE7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gdlxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gc3RhbmRhcmRFbmNvZGluZyh2KSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KVxuICAgICAgICAucmVwbGFjZSgvJTQwL2dpLCAnQCcpXG4gICAgICAgIC5yZXBsYWNlKC8lM0EvZ2ksICc6JylcbiAgICAgICAgLnJlcGxhY2UoLyUyNC9naSwgJyQnKVxuICAgICAgICAucmVwbGFjZSgvJTJDL2dpLCAnLCcpXG4gICAgICAgIC5yZXBsYWNlKC8lM0IvZ2ksICc7JylcbiAgICAgICAgLnJlcGxhY2UoLyUyQi9naSwgJysnKVxuICAgICAgICAucmVwbGFjZSgvJTNEL2dpLCAnPScpXG4gICAgICAgIC5yZXBsYWNlKC8lM0YvZ2ksICc/JylcbiAgICAgICAgLnJlcGxhY2UoLyUyRi9naSwgJy8nKTtcbn1cbi8qKlxuICogQW4gSFRUUCByZXF1ZXN0L3Jlc3BvbnNlIGJvZHkgdGhhdCByZXByZXNlbnRzIHNlcmlhbGl6ZWQgcGFyYW1ldGVycyxcbiAqIHBlciB0aGUgTUlNRSB0eXBlIGBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRgLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgaW1tdWF0YWJsZSAtIGFsbCBtdXRhdGlvbiBvcGVyYXRpb25zIHJldHVybiBhIG5ldyBpbnN0YW5jZS5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBQYXJhbXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Pz19IG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwUGFyYW1zKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy51cGRhdGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5jbG9uZUZyb20gPSBudWxsO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBvcHRpb25zLmVuY29kZXIgfHwgbmV3IEh0dHBVcmxFbmNvZGluZ0NvZGVjKCk7XG4gICAgICAgIHRoaXMubWFwID0gISFvcHRpb25zLmZyb21TdHJpbmcgPyBwYXJhbVBhcnNlcihvcHRpb25zLmZyb21TdHJpbmcsIHRoaXMuZW5jb2RlcikgOiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBib2R5IGhhcyBvbmUgb3IgbW9yZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXIgbmFtZS5cbiAgICAgKiBAcGFyYW0gez99IHBhcmFtXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwUGFyYW1zLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHJldHVybiAoKHRoaXMubWFwKSkuaGFzKHBhcmFtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgdmFsdWUgZm9yIHRoZSBnaXZlbiBwYXJhbWV0ZXIgbmFtZSwgb3IgYG51bGxgIGlmIGl0J3Mgbm90IHByZXNlbnQuXG4gICAgICogQHBhcmFtIHs/fSBwYXJhbVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFBhcmFtcy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyByZXMgPSAoKHRoaXMubWFwKSkuZ2V0KHBhcmFtKTtcbiAgICAgICAgcmV0dXJuICEhcmVzID8gcmVzWzBdIDogbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIG5hbWUsIG9yIGBudWxsYCBpZiBpdCdzIG5vdCBwcmVzZW50LlxuICAgICAqIEBwYXJhbSB7P30gcGFyYW1cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBQYXJhbXMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuICgodGhpcy5tYXApKS5nZXQocGFyYW0pIHx8IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHRoZSBwYXJhbWV0ZXIgbmFtZXMgZm9yIHRoaXMgYm9keS5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBQYXJhbXMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSgvKiogQHR5cGUgez99ICovICgodGhpcy5tYXApKS5rZXlzKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGJvZHkgd2l0aCBhbiBhcHBlbmRlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciBuYW1lLlxuICAgICAqIEBwYXJhbSB7P30gcGFyYW1cbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwUGFyYW1zLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAocGFyYW0sIHZhbHVlKSB7IHJldHVybiB0aGlzLmNsb25lKHsgcGFyYW06IHBhcmFtLCB2YWx1ZTogdmFsdWUsIG9wOiAnYScgfSk7IH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGJvZHkgd2l0aCBhIG5ldyB2YWx1ZSBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciBuYW1lLlxuICAgICAqIEBwYXJhbSB7P30gcGFyYW1cbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwUGFyYW1zLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAocGFyYW0sIHZhbHVlKSB7IHJldHVybiB0aGlzLmNsb25lKHsgcGFyYW06IHBhcmFtLCB2YWx1ZTogdmFsdWUsIG9wOiAncycgfSk7IH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGJvZHkgd2l0aCBlaXRoZXIgdGhlIGdpdmVuIHZhbHVlIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyXG4gICAgICogcmVtb3ZlZCwgaWYgYSB2YWx1ZSBpcyBnaXZlbiwgb3IgYWxsIHZhbHVlcyBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciByZW1vdmVkXG4gICAgICogaWYgbm90LlxuICAgICAqIEBwYXJhbSB7P30gcGFyYW1cbiAgICAgKiBAcGFyYW0gez89fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFBhcmFtcy5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHBhcmFtLCB2YWx1ZSkgeyByZXR1cm4gdGhpcy5jbG9uZSh7IHBhcmFtOiBwYXJhbSwgdmFsdWU6IHZhbHVlLCBvcDogJ2QnIH0pOyB9O1xuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZSB0aGUgYm9keSB0byBhbiBlbmNvZGVkIHN0cmluZywgd2hlcmUga2V5LXZhbHVlIHBhaXJzIChzZXBhcmF0ZWQgYnkgYD1gKSBhcmVcbiAgICAgKiBzZXBhcmF0ZWQgYnkgYCZgcy5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBQYXJhbXMucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5cygpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGVLZXkgPSBfdGhpcy5lbmNvZGVyLmVuY29kZUtleShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuICgoKChfdGhpcy5tYXApKS5nZXQoa2V5KSkpLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGVLZXkgKyAnPScgKyBfdGhpcy5lbmNvZGVyLmVuY29kZVZhbHVlKHZhbHVlKTsgfSlcbiAgICAgICAgICAgICAgICAuam9pbignJicpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJyYnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdXBkYXRlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwUGFyYW1zLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICh1cGRhdGUpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gY2xvbmUgPSBuZXcgSHR0cFBhcmFtcyh7IGVuY29kZXI6IHRoaXMuZW5jb2RlciB9KTtcbiAgICAgICAgY2xvbmUuY2xvbmVGcm9tID0gdGhpcy5jbG9uZUZyb20gfHwgdGhpcztcbiAgICAgICAgY2xvbmUudXBkYXRlcyA9ICh0aGlzLnVwZGF0ZXMgfHwgW10pLmNvbmNhdChbdXBkYXRlXSk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFBhcmFtcy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMubWFwID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jbG9uZUZyb20gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVGcm9tLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVGcm9tLmtleXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICgoX3RoaXMubWFwKSkuc2V0KGtleSwgLyoqIEB0eXBlIHs/fSAqLyAoKCgoKChfdGhpcy5jbG9uZUZyb20pKS5tYXApKS5nZXQoa2V5KSkpKTsgfSk7IC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgICgodGhpcy51cGRhdGVzKSkuZm9yRWFjaChmdW5jdGlvbiAodXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh1cGRhdGUub3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gYmFzZSA9ICh1cGRhdGUub3AgPT09ICdhJyA/ICgoX3RoaXMubWFwKSkuZ2V0KHVwZGF0ZS5wYXJhbSkgOiB1bmRlZmluZWQpIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZS5wdXNoKC8qKiBAdHlwZSB7P30gKi8gKCh1cGRhdGUudmFsdWUpKSk7IC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICgoX3RoaXMubWFwKSkuc2V0KHVwZGF0ZS5wYXJhbSwgYmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBiYXNlXzEgPSAoKF90aGlzLm1hcCkpLmdldCh1cGRhdGUucGFyYW0pIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGlkeCA9IGJhc2VfMS5pbmRleE9mKHVwZGF0ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZV8xLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZV8xLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChfdGhpcy5tYXApKS5zZXQodXBkYXRlLnBhcmFtLCBiYXNlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChfdGhpcy5tYXApKS5kZWxldGUodXBkYXRlLnBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKF90aGlzLm1hcCkpLmRlbGV0ZSh1cGRhdGUucGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jbG9uZUZyb20gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cFBhcmFtcztcbn0oKSk7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEltbXV0YWJsZSBzZXQgb2YgSHR0cCBoZWFkZXJzLCB3aXRoIGxhenkgcGFyc2luZy5cbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSHR0cEhlYWRlcnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Pz19IGhlYWRlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBtYXAgb2YgbG93ZXJjYXNlZCBoZWFkZXIgbmFtZXMgdG8gdGhlIG5vcm1hbGl6ZWRcbiAgICAgICAgICogZm9ybSBvZiB0aGUgbmFtZSAodGhlIGZvcm0gc2VlbiBmaXJzdCkuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZWROYW1lcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFF1ZXVlZCB1cGRhdGVzIHRvIGJlIG1hdGVyaWFsaXplZCB0aGUgbmV4dCBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGF6eVVwZGF0ZSA9IG51bGw7XG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBoZWFkZXJzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5sYXp5SW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oZWFkZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gbGluZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbGluZS5zbGljZShpbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heWJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5oZWFkZXJzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGVhZGVycy5nZXQoa2V5KS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhlYWRlcnMuc2V0KGtleSwgW3ZhbHVlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhenlJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhlYWRlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gaGVhZGVyc1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhlYWRlcnMuc2V0KGtleSwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1heWJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIGV4aXN0ZW5jZSBvZiBoZWFkZXIgYnkgZ2l2ZW4gbmFtZS5cbiAgICAgKiBAcGFyYW0gez99IG5hbWVcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgZmlyc3QgaGVhZGVyIHRoYXQgbWF0Y2hlcyBnaXZlbiBuYW1lLlxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB2YWx1ZXMgPSB0aGlzLmhlYWRlcnMuZ2V0KG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDAgPyB2YWx1ZXNbMF0gOiBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIGhlYWRlcnNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ub3JtYWxpemVkTmFtZXMudmFsdWVzKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gbmFtZS5cbiAgICAgKiBAcGFyYW0gez99IG5hbWVcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVycy5nZXQobmFtZS50b0xvd2VyQ2FzZSgpKSB8fCBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSwgb3A6ICdhJyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUsIG9wOiAncycgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcbiAgICAgKiBAcGFyYW0gez89fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSwgb3A6ICdkJyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxuICAgICAqIEBwYXJhbSB7P30gbGNOYW1lXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwSGVhZGVycy5wcm90b3R5cGUubWF5YmVTZXROb3JtYWxpemVkTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBsY05hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vcm1hbGl6ZWROYW1lcy5oYXMobGNOYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuc2V0KGxjTmFtZSwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghIXRoaXMubGF6eUluaXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxhenlJbml0IGluc3RhbmNlb2YgSHR0cEhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlGcm9tKHRoaXMubGF6eUluaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXp5SW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sYXp5SW5pdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoISF0aGlzLmxhenlVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlVcGRhdGUuZm9yRWFjaChmdW5jdGlvbiAodXBkYXRlKSB7IHJldHVybiBfdGhpcy5hcHBseVVwZGF0ZSh1cGRhdGUpOyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlVcGRhdGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IG90aGVyXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwSGVhZGVycy5wcm90b3R5cGUuY29weUZyb20gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgb3RoZXIuaW5pdCgpO1xuICAgICAgICBBcnJheS5mcm9tKG90aGVyLmhlYWRlcnMua2V5cygpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIF90aGlzLmhlYWRlcnMuc2V0KGtleSwgLyoqIEB0eXBlIHs/fSAqLyAoKG90aGVyLmhlYWRlcnMuZ2V0KGtleSkpKSk7XG4gICAgICAgICAgICBfdGhpcy5ub3JtYWxpemVkTmFtZXMuc2V0KGtleSwgLyoqIEB0eXBlIHs/fSAqLyAoKG90aGVyLm5vcm1hbGl6ZWROYW1lcy5nZXQoa2V5KSkpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHVwZGF0ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKHVwZGF0ZSkge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBjbG9uZSA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICBjbG9uZS5sYXp5SW5pdCA9XG4gICAgICAgICAgICAoISF0aGlzLmxhenlJbml0ICYmIHRoaXMubGF6eUluaXQgaW5zdGFuY2VvZiBIdHRwSGVhZGVycykgPyB0aGlzLmxhenlJbml0IDogdGhpcztcbiAgICAgICAgY2xvbmUubGF6eVVwZGF0ZSA9ICh0aGlzLmxhenlVcGRhdGUgfHwgW10pLmNvbmNhdChbdXBkYXRlXSk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdXBkYXRlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwSGVhZGVycy5wcm90b3R5cGUuYXBwbHlVcGRhdGUgPSBmdW5jdGlvbiAodXBkYXRlKSB7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGtleSA9IHVwZGF0ZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHN3aXRjaCAodXBkYXRlLm9wKSB7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHZhbHVlID0gKCh1cGRhdGUudmFsdWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1heWJlU2V0Tm9ybWFsaXplZE5hbWUodXBkYXRlLm5hbWUsIGtleSk7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gYmFzZSA9ICh1cGRhdGUub3AgPT09ICdhJyA/IHRoaXMuaGVhZGVycy5nZXQoa2V5KSA6IHVuZGVmaW5lZCkgfHwgW107XG4gICAgICAgICAgICAgICAgYmFzZS5wdXNoLmFwcGx5KGJhc2UsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KGtleSwgYmFzZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB0b0RlbGV0ZV8xID0gKHVwZGF0ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b0RlbGV0ZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxpemVkTmFtZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBleGlzdGluZyA9IHRoaXMuaGVhZGVycy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nID0gZXhpc3RpbmcuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdG9EZWxldGVfMS5pbmRleE9mKHZhbHVlKSA9PT0gLTE7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbGl6ZWROYW1lcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoa2V5LCBleGlzdGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFxcQGludGVybmFsXG4gICAgICogQHBhcmFtIHs/fSBmblxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5ub3JtYWxpemVkTmFtZXMua2V5cygpKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZm4oLyoqIEB0eXBlIHs/fSAqLyAoKF90aGlzLm5vcm1hbGl6ZWROYW1lcy5nZXQoa2V5KSkpLCAvKiogQHR5cGUgez99ICovICgoX3RoaXMuaGVhZGVycy5nZXQoa2V5KSkpKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cEhlYWRlcnM7XG59KCkpO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgZ2l2ZW4gSFRUUCBtZXRob2QgbWF5IGluY2x1ZGUgYSBib2R5LlxuICogQHBhcmFtIHs/fSBtZXRob2RcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIG1pZ2h0SGF2ZUJvZHkobWV0aG9kKSB7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAnREVMRVRFJzpcbiAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgY2FzZSAnSEVBRCc6XG4gICAgICAgIGNhc2UgJ09QVElPTlMnOlxuICAgICAgICBjYXNlICdKU09OUCc6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vKipcbiAqIFNhZmVseSBhc3NlcnQgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIuXG4gKlxuICogSW4gc29tZSBleGVjdXRpb24gZW52aXJvbm1lbnRzIEFycmF5QnVmZmVyIGlzIG5vdCBkZWZpbmVkLlxuICogQHBhcmFtIHs/fSB2YWx1ZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG4vKipcbiAqIFNhZmVseSBhc3NlcnQgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBCbG9iLlxuICpcbiAqIEluIHNvbWUgZXhlY3V0aW9uIGVudmlyb25tZW50cyBCbG9iIGlzIG5vdCBkZWZpbmVkLlxuICogQHBhcmFtIHs/fSB2YWx1ZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2I7XG59XG4vKipcbiAqIFNhZmVseSBhc3NlcnQgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBGb3JtRGF0YSBpbnN0YW5jZS5cbiAqXG4gKiBJbiBzb21lIGV4ZWN1dGlvbiBlbnZpcm9ubWVudHMgRm9ybURhdGEgaXMgbm90IGRlZmluZWQuXG4gKiBAcGFyYW0gez99IHZhbHVlXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBGb3JtRGF0YTtcbn1cbi8qKlxuICogQW4gb3V0Z29pbmcgSFRUUCByZXF1ZXN0IHdpdGggYW4gb3B0aW9uYWwgdHlwZWQgYm9keS5cbiAqXG4gKiBgSHR0cFJlcXVlc3RgIHJlcHJlc2VudHMgYW4gb3V0Z29pbmcgcmVxdWVzdCwgaW5jbHVkaW5nIFVSTCwgbWV0aG9kLFxuICogaGVhZGVycywgYm9keSwgYW5kIG90aGVyIHJlcXVlc3QgY29uZmlndXJhdGlvbiBvcHRpb25zLiBJbnN0YW5jZXMgc2hvdWxkIGJlXG4gKiBhc3N1bWVkIHRvIGJlIGltbXV0YWJsZS4gVG8gbW9kaWZ5IGEgYEh0dHBSZXF1ZXN0YCwgdGhlIGBjbG9uZWBcbiAqIG1ldGhvZCBzaG91bGQgYmUgdXNlZC5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBSZXF1ZXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IG1ldGhvZFxuICAgICAqIEBwYXJhbSB7P30gdXJsXG4gICAgICogQHBhcmFtIHs/PX0gdGhpcmRcbiAgICAgKiBAcGFyYW0gez89fSBmb3VydGhcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwUmVxdWVzdChtZXRob2QsIHVybCwgdGhpcmQsIGZvdXJ0aCkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByZXF1ZXN0IGJvZHksIG9yIGBudWxsYCBpZiBvbmUgaXNuJ3Qgc2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBCb2RpZXMgYXJlIG5vdCBlbmZvcmNlZCB0byBiZSBpbW11dGFibGUsIGFzIHRoZXkgY2FuIGluY2x1ZGUgYSByZWZlcmVuY2UgdG8gYW55XG4gICAgICAgICAqIHVzZXItZGVmaW5lZCBkYXRhIHR5cGUuIEhvd2V2ZXIsIGludGVyY2VwdG9ycyBzaG91bGQgdGFrZSBjYXJlIHRvIHByZXNlcnZlXG4gICAgICAgICAqIGlkZW1wb3RlbmNlIGJ5IHRyZWF0aW5nIHRoZW0gYXMgc3VjaC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYm9keSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoaXMgcmVxdWVzdCBzaG91bGQgYmUgbWFkZSBpbiBhIHdheSB0aGF0IGV4cG9zZXMgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBQcm9ncmVzcyBldmVudHMgYXJlIGV4cGVuc2l2ZSAoY2hhbmdlIGRldGVjdGlvbiBydW5zIG9uIGVhY2ggZXZlbnQpIGFuZCBzb1xuICAgICAgICAgKiB0aGV5IHNob3VsZCBvbmx5IGJlIHJlcXVlc3RlZCBpZiB0aGUgY29uc3VtZXIgaW50ZW5kcyB0byBtb25pdG9yIHRoZW0uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlcG9ydFByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoaXMgcmVxdWVzdCBzaG91bGQgYmUgc2VudCB3aXRoIG91dGdvaW5nIGNyZWRlbnRpYWxzIChjb29raWVzKS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXhwZWN0ZWQgcmVzcG9uc2UgdHlwZSBvZiB0aGUgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIGlzIHVzZWQgdG8gcGFyc2UgdGhlIHJlc3BvbnNlIGFwcHJvcHJpYXRlbHkgYmVmb3JlIHJldHVybmluZyBpdCB0b1xuICAgICAgICAgKiB0aGUgcmVxdWVzdGVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIC8vIE5leHQsIG5lZWQgdG8gZmlndXJlIG91dCB3aGljaCBhcmd1bWVudCBob2xkcyB0aGUgSHR0cFJlcXVlc3RJbml0XG4gICAgICAgIC8vIG9wdGlvbnMsIGlmIGFueS5cbiAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgYSBib2R5IGFyZ3VtZW50IGlzIGV4cGVjdGVkLiBUaGUgb25seSB2YWxpZCB3YXkgdG8gb21pdFxuICAgICAgICAvLyB0aGUgYm9keSBhcmd1bWVudCBpcyB0byB1c2UgYSBrbm93biBuby1ib2R5IG1ldGhvZCBsaWtlIEdFVC5cbiAgICAgICAgaWYgKG1pZ2h0SGF2ZUJvZHkodGhpcy5tZXRob2QpIHx8ICEhZm91cnRoKSB7XG4gICAgICAgICAgICAvLyBCb2R5IGlzIHRoZSB0aGlyZCBhcmd1bWVudCwgb3B0aW9ucyBhcmUgdGhlIGZvdXJ0aC5cbiAgICAgICAgICAgIHRoaXMuYm9keSA9IHRoaXJkIHx8IG51bGw7XG4gICAgICAgICAgICBvcHRpb25zID0gZm91cnRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gYm9keSByZXF1aXJlZCwgb3B0aW9ucyBhcmUgdGhlIHRoaXJkIGFyZ3VtZW50LiBUaGUgYm9keSBzdGF5cyBudWxsLlxuICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXJkO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG9wdGlvbnMgaGF2ZSBiZWVuIHBhc3NlZCwgaW50ZXJwcmV0IHRoZW0uXG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgcmVwb3J0UHJvZ3Jlc3MgYW5kIHdpdGhDcmVkZW50aWFscy5cbiAgICAgICAgICAgIHRoaXMucmVwb3J0UHJvZ3Jlc3MgPSAhIW9wdGlvbnMucmVwb3J0UHJvZ3Jlc3M7XG4gICAgICAgICAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIHR5cGUgb2YgJ2pzb24nIGlmIG9uZSBpcyBwcm92aWRlZC5cbiAgICAgICAgICAgIGlmICghIW9wdGlvbnMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE92ZXJyaWRlIGhlYWRlcnMgaWYgdGhleSdyZSBwcm92aWRlZC5cbiAgICAgICAgICAgIGlmICghIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIW9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBubyBoZWFkZXJzIGhhdmUgYmVlbiBwYXNzZWQgaW4sIGNvbnN0cnVjdCBhIG5ldyBIdHRwSGVhZGVycyBpbnN0YW5jZS5cbiAgICAgICAgaWYgKCF0aGlzLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5vIHBhcmFtZXRlcnMgaGF2ZSBiZWVuIHBhc3NlZCBpbiwgY29uc3RydWN0IGEgbmV3IEh0dHBVcmxFbmNvZGVkUGFyYW1zIGluc3RhbmNlLlxuICAgICAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBFbmNvZGUgdGhlIHBhcmFtZXRlcnMgdG8gYSBzdHJpbmcgaW4gcHJlcGFyYXRpb24gZm9yIGluY2x1c2lvbiBpbiB0aGUgVVJMLlxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHRoaXMucGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIE5vIHBhcmFtZXRlcnMsIHRoZSB2aXNpYmxlIFVSTCBpcyBqdXN0IHRoZSBVUkwgZ2l2ZW4gYXQgY3JlYXRpb24gdGltZS5cbiAgICAgICAgICAgICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBEb2VzIHRoZSBVUkwgYWxyZWFkeSBoYXZlIHF1ZXJ5IHBhcmFtZXRlcnM/IExvb2sgZm9yICc/Jy5cbiAgICAgICAgICAgICAgICB2YXIgcUlkeCA9IHVybC5pbmRleE9mKCc/Jyk7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIDMgY2FzZXMgdG8gaGFuZGxlOlxuICAgICAgICAgICAgICAgIC8vIDEpIE5vIGV4aXN0aW5nIHBhcmFtZXRlcnMgLT4gYXBwZW5kICc/JyBmb2xsb3dlZCBieSBwYXJhbXMuXG4gICAgICAgICAgICAgICAgLy8gMikgJz8nIGV4aXN0cyBhbmQgaXMgZm9sbG93ZWQgYnkgZXhpc3RpbmcgcXVlcnkgc3RyaW5nIC0+XG4gICAgICAgICAgICAgICAgLy8gICAgYXBwZW5kICcmJyBmb2xsb3dlZCBieSBwYXJhbXMuXG4gICAgICAgICAgICAgICAgLy8gMykgJz8nIGV4aXN0cyBhdCB0aGUgZW5kIG9mIHRoZSB1cmwgLT4gYXBwZW5kIHBhcmFtcyBkaXJlY3RseS5cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGJhc2ljYWxseSBhbW91bnRzIHRvIGRldGVybWluaW5nIHRoZSBjaGFyYWN0ZXIsIGlmIGFueSwgd2l0aFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIHRvIGpvaW4gdGhlIFVSTCBhbmQgcGFyYW1ldGVycy5cbiAgICAgICAgICAgICAgICB2YXIgc2VwID0gcUlkeCA9PT0gLTEgPyAnPycgOiAocUlkeCA8IHVybC5sZW5ndGggLSAxID8gJyYnIDogJycpO1xuICAgICAgICAgICAgICAgIHRoaXMudXJsV2l0aFBhcmFtcyA9IHVybCArIHNlcCArIHBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhlIGZyZWUtZm9ybSBib2R5IGludG8gYSBzZXJpYWxpemVkIGZvcm1hdCBzdWl0YWJsZSBmb3JcbiAgICAgKiB0cmFuc21pc3Npb24gdG8gdGhlIHNlcnZlci5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXJpYWxpemVCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJZiBubyBib2R5IGlzIHByZXNlbnQsIG5vIG5lZWQgdG8gc2VyaWFsaXplIGl0LlxuICAgICAgICBpZiAodGhpcy5ib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBib2R5IGlzIGFscmVhZHkgaW4gYSBzZXJpYWxpemVkIGZvcm0uIElmIHNvLFxuICAgICAgICAvLyBpdCBjYW4ganVzdCBiZSByZXR1cm5lZCBkaXJlY3RseS5cbiAgICAgICAgaWYgKGlzQXJyYXlCdWZmZXIodGhpcy5ib2R5KSB8fCBpc0Jsb2IodGhpcy5ib2R5KSB8fCBpc0Zvcm1EYXRhKHRoaXMuYm9keSkgfHxcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib2R5O1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGJvZHkgaXMgYW4gaW5zdGFuY2Ugb2YgSHR0cFVybEVuY29kZWRQYXJhbXMuXG4gICAgICAgIGlmICh0aGlzLmJvZHkgaW5zdGFuY2VvZiBIdHRwUGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib2R5LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYm9keSBpcyBhbiBvYmplY3Qgb3IgYXJyYXksIGFuZCBzZXJpYWxpemUgd2l0aCBKU09OIGlmIHNvLlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYm9keSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZhbGwgYmFjayBvbiB0b1N0cmluZygpIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgIHJldHVybiAoKHRoaXMuYm9keSkpLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGFtaW5lIHRoZSBib2R5IGFuZCBhdHRlbXB0IHRvIGluZmVyIGFuIGFwcHJvcHJpYXRlIE1JTUUgdHlwZVxuICAgICAqIGZvciBpdC5cbiAgICAgKlxuICAgICAqIElmIG5vIHN1Y2ggdHlwZSBjYW4gYmUgaW5mZXJyZWQsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGBudWxsYC5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5kZXRlY3RDb250ZW50VHlwZUhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQW4gZW1wdHkgYm9keSBoYXMgbm8gY29udGVudCB0eXBlLlxuICAgICAgICBpZiAodGhpcy5ib2R5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb3JtRGF0YSBib2RpZXMgcmVseSBvbiB0aGUgYnJvd3NlcidzIGNvbnRlbnQgdHlwZSBhc3NpZ25tZW50LlxuICAgICAgICBpZiAoaXNGb3JtRGF0YSh0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBCbG9icyB1c3VhbGx5IGhhdmUgdGhlaXIgb3duIGNvbnRlbnQgdHlwZS4gSWYgaXQgZG9lc24ndCwgdGhlblxuICAgICAgICAvLyBubyB0eXBlIGNhbiBiZSBpbmZlcnJlZC5cbiAgICAgICAgaWYgKGlzQmxvYih0aGlzLmJvZHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib2R5LnR5cGUgfHwgbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBcnJheSBidWZmZXJzIGhhdmUgdW5rbm93biBjb250ZW50cyBhbmQgdGh1cyBubyB0eXBlIGNhbiBiZSBpbmZlcnJlZC5cbiAgICAgICAgaWYgKGlzQXJyYXlCdWZmZXIodGhpcy5ib2R5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGVjaG5pY2FsbHksIHN0cmluZ3MgY291bGQgYmUgYSBmb3JtIG9mIEpTT04gZGF0YSwgYnV0IGl0J3Mgc2FmZSBlbm91Z2hcbiAgICAgICAgLy8gdG8gYXNzdW1lIHRoZXkncmUgcGxhaW4gc3RyaW5ncy5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQvcGxhaW4nO1xuICAgICAgICB9XG4gICAgICAgIC8vIGBIdHRwVXJsRW5jb2RlZFBhcmFtc2AgaGFzIGl0cyBvd24gY29udGVudC10eXBlLlxuICAgICAgICBpZiAodGhpcy5ib2R5IGluc3RhbmNlb2YgSHR0cFBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQXJyYXlzLCBvYmplY3RzLCBhbmQgbnVtYmVycyB3aWxsIGJlIGVuY29kZWQgYXMgSlNPTi5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvZHkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB0aGlzLmJvZHkgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuYm9keSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gdHlwZSBjb3VsZCBiZSBpbmZlcnJlZC5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez89fSB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICh1cGRhdGUpIHtcbiAgICAgICAgaWYgKHVwZGF0ZSA9PT0gdm9pZCAwKSB7IHVwZGF0ZSA9IHt9OyB9XG4gICAgICAgIC8vIEZvciBtZXRob2QsIHVybCwgYW5kIHJlc3BvbnNlVHlwZSwgdGFrZSB0aGUgY3VycmVudCB2YWx1ZSB1bmxlc3NcbiAgICAgICAgLy8gaXQgaXMgb3ZlcnJpZGRlbiBpbiB0aGUgdXBkYXRlIGhhc2guXG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIG1ldGhvZCA9IHVwZGF0ZS5tZXRob2QgfHwgdGhpcy5tZXRob2Q7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHVybCA9IHVwZGF0ZS51cmwgfHwgdGhpcy51cmw7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHJlc3BvbnNlVHlwZSA9IHVwZGF0ZS5yZXNwb25zZVR5cGUgfHwgdGhpcy5yZXNwb25zZVR5cGU7XG4gICAgICAgIC8vIFRoZSBib2R5IGlzIHNvbWV3aGF0IHNwZWNpYWwgLSBhIGBudWxsYCB2YWx1ZSBpbiB1cGRhdGUuYm9keSBtZWFuc1xuICAgICAgICAvLyB3aGF0ZXZlciBjdXJyZW50IGJvZHkgaXMgcHJlc2VudCBpcyBiZWluZyBvdmVycmlkZGVuIHdpdGggYW4gZW1wdHlcbiAgICAgICAgLy8gYm9keSwgd2hlcmVhcyBhbiBgdW5kZWZpbmVkYCB2YWx1ZSBpbiB1cGRhdGUuYm9keSBpbXBsaWVzIG5vXG4gICAgICAgIC8vIG92ZXJyaWRlLlxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBib2R5ID0gKHVwZGF0ZS5ib2R5ICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLmJvZHkgOiB0aGlzLmJvZHk7XG4gICAgICAgIC8vIENhcmVmdWxseSBoYW5kbGUgdGhlIGJvb2xlYW4gb3B0aW9ucyB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW5cbiAgICAgICAgLy8gYGZhbHNlYCBhbmQgYHVuZGVmaW5lZGAgaW4gdGhlIHVwZGF0ZSBhcmdzLlxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB3aXRoQ3JlZGVudGlhbHMgPSAodXBkYXRlLndpdGhDcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkKSA/IHVwZGF0ZS53aXRoQ3JlZGVudGlhbHMgOiB0aGlzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcmVwb3J0UHJvZ3Jlc3MgPSAodXBkYXRlLnJlcG9ydFByb2dyZXNzICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLnJlcG9ydFByb2dyZXNzIDogdGhpcy5yZXBvcnRQcm9ncmVzcztcbiAgICAgICAgLy8gSGVhZGVycyBhbmQgcGFyYW1zIG1heSBiZSBhcHBlbmRlZCB0byBpZiBgc2V0SGVhZGVyc2Agb3JcbiAgICAgICAgLy8gYHNldFBhcmFtc2AgYXJlIHVzZWQuXG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGhlYWRlcnMgPSB1cGRhdGUuaGVhZGVycyB8fCB0aGlzLmhlYWRlcnM7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHBhcmFtcyA9IHVwZGF0ZS5wYXJhbXMgfHwgdGhpcy5wYXJhbXM7XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGNhbGxlciBoYXMgYXNrZWQgdG8gYWRkIGhlYWRlcnMuXG4gICAgICAgIGlmICh1cGRhdGUuc2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBTZXQgZXZlcnkgcmVxdWVzdGVkIGhlYWRlci5cbiAgICAgICAgICAgIGhlYWRlcnMgPVxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZS5zZXRIZWFkZXJzKVxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChoZWFkZXJzLCBuYW1lKSB7IHJldHVybiBoZWFkZXJzLnNldChuYW1lLCAvKiogQHR5cGUgez99ICovICgodXBkYXRlLnNldEhlYWRlcnMpKVtuYW1lXSk7IH0sIGhlYWRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGNhbGxlciBoYXMgYXNrZWQgdG8gc2V0IHBhcmFtcy5cbiAgICAgICAgaWYgKHVwZGF0ZS5zZXRQYXJhbXMpIHtcbiAgICAgICAgICAgIC8vIFNldCBldmVyeSByZXF1ZXN0ZWQgcGFyYW0uXG4gICAgICAgICAgICBwYXJhbXMgPSBPYmplY3Qua2V5cyh1cGRhdGUuc2V0UGFyYW1zKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHBhcmFtcywgcGFyYW0pIHsgcmV0dXJuIHBhcmFtcy5zZXQocGFyYW0sIC8qKiBAdHlwZSB7P30gKi8gKCh1cGRhdGUuc2V0UGFyYW1zKSlbcGFyYW1dKTsgfSwgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5hbGx5LCBjb25zdHJ1Y3QgdGhlIG5ldyBIdHRwUmVxdWVzdCB1c2luZyB0aGUgcGllY2VzIGZyb20gYWJvdmUuXG4gICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCB1cmwsIGJvZHksIHtcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLCBoZWFkZXJzOiBoZWFkZXJzLCByZXBvcnRQcm9ncmVzczogcmVwb3J0UHJvZ3Jlc3MsIHJlc3BvbnNlVHlwZTogcmVzcG9uc2VUeXBlLCB3aXRoQ3JlZGVudGlhbHM6IHdpdGhDcmVkZW50aWFscyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cFJlcXVlc3Q7XG59KCkpO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xudmFyIEh0dHBFdmVudFR5cGUgPSB7fTtcbkh0dHBFdmVudFR5cGUuU2VudCA9IDA7XG5IdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzID0gMTtcbkh0dHBFdmVudFR5cGUuUmVzcG9uc2VIZWFkZXIgPSAyO1xuSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzID0gMztcbkh0dHBFdmVudFR5cGUuUmVzcG9uc2UgPSA0O1xuSHR0cEV2ZW50VHlwZS5Vc2VyID0gNTtcbkh0dHBFdmVudFR5cGVbSHR0cEV2ZW50VHlwZS5TZW50XSA9IFwiU2VudFwiO1xuSHR0cEV2ZW50VHlwZVtIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzXSA9IFwiVXBsb2FkUHJvZ3Jlc3NcIjtcbkh0dHBFdmVudFR5cGVbSHR0cEV2ZW50VHlwZS5SZXNwb25zZUhlYWRlcl0gPSBcIlJlc3BvbnNlSGVhZGVyXCI7XG5IdHRwRXZlbnRUeXBlW0h0dHBFdmVudFR5cGUuRG93bmxvYWRQcm9ncmVzc10gPSBcIkRvd25sb2FkUHJvZ3Jlc3NcIjtcbkh0dHBFdmVudFR5cGVbSHR0cEV2ZW50VHlwZS5SZXNwb25zZV0gPSBcIlJlc3BvbnNlXCI7XG5IdHRwRXZlbnRUeXBlW0h0dHBFdmVudFR5cGUuVXNlcl0gPSBcIlVzZXJcIjtcbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYm90aCBgSHR0cFJlc3BvbnNlYCBhbmQgYEh0dHBIZWFkZXJSZXNwb25zZWAuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAYWJzdHJhY3RcbiAqL1xudmFyIEh0dHBSZXNwb25zZUJhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIFN1cGVyLWNvbnN0cnVjdG9yIGZvciBhbGwgcmVzcG9uc2VzLlxuICAgICAqXG4gICAgICogVGhlIHNpbmdsZSBwYXJhbWV0ZXIgYWNjZXB0ZWQgaXMgYW4gaW5pdGlhbGl6YXRpb24gaGFzaC4gQW55IHByb3BlcnRpZXNcbiAgICAgKiBvZiB0aGUgcmVzcG9uc2UgcGFzc2VkIHRoZXJlIHdpbGwgb3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7P30gaW5pdFxuICAgICAqIEBwYXJhbSB7Pz19IGRlZmF1bHRTdGF0dXNcbiAgICAgKiBAcGFyYW0gez89fSBkZWZhdWx0U3RhdHVzVGV4dFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEh0dHBSZXNwb25zZUJhc2UoaW5pdCwgZGVmYXVsdFN0YXR1cywgZGVmYXVsdFN0YXR1c1RleHQpIHtcbiAgICAgICAgaWYgKGRlZmF1bHRTdGF0dXMgPT09IHZvaWQgMCkgeyBkZWZhdWx0U3RhdHVzID0gMjAwOyB9XG4gICAgICAgIGlmIChkZWZhdWx0U3RhdHVzVGV4dCA9PT0gdm9pZCAwKSB7IGRlZmF1bHRTdGF0dXNUZXh0ID0gJ09LJzsgfVxuICAgICAgICAvLyBJZiB0aGUgaGFzaCBoYXMgdmFsdWVzIHBhc3NlZCwgdXNlIHRoZW0gdG8gaW5pdGlhbGl6ZSB0aGUgcmVzcG9uc2UuXG4gICAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgdmFsdWVzLlxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBpbml0LmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gaW5pdC5zdGF0dXMgIT09IHVuZGVmaW5lZCA/IGluaXQuc3RhdHVzIDogZGVmYXVsdFN0YXR1cztcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gaW5pdC5zdGF0dXNUZXh0IHx8IGRlZmF1bHRTdGF0dXNUZXh0O1xuICAgICAgICB0aGlzLnVybCA9IGluaXQudXJsIHx8IG51bGw7XG4gICAgICAgIC8vIENhY2hlIHRoZSBvayB2YWx1ZSB0byBhdm9pZCBkZWZpbmluZyBhIGdldHRlci5cbiAgICAgICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB9XG4gICAgcmV0dXJuIEh0dHBSZXNwb25zZUJhc2U7XG59KCkpO1xuLyoqXG4gKiBBIHBhcnRpYWwgSFRUUCByZXNwb25zZSB3aGljaCBvbmx5IGluY2x1ZGVzIHRoZSBzdGF0dXMgYW5kIGhlYWRlciBkYXRhLFxuICogYnV0IG5vIHJlc3BvbnNlIGJvZHkuXG4gKlxuICogYEh0dHBIZWFkZXJSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlXG4gKiBldmVudCBzdHJlYW0sIG9ubHkgd2hlbiBwcm9ncmVzcyBldmVudHMgYXJlIHJlcXVlc3RlZC5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBIZWFkZXJSZXNwb25zZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoSHR0cEhlYWRlclJlc3BvbnNlLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBgSHR0cEhlYWRlclJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSB7Pz19IGluaXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwSGVhZGVyUmVzcG9uc2UoaW5pdCkge1xuICAgICAgICBpZiAoaW5pdCA9PT0gdm9pZCAwKSB7IGluaXQgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBpbml0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gSHR0cEV2ZW50VHlwZS5SZXNwb25zZUhlYWRlcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3B5IHRoaXMgYEh0dHBIZWFkZXJSZXNwb25zZWAsIG92ZXJyaWRpbmcgaXRzIGNvbnRlbnRzIHdpdGggdGhlXG4gICAgICogZ2l2ZW4gcGFyYW1ldGVyIGhhc2guXG4gICAgICogQHBhcmFtIHs/PX0gdXBkYXRlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwSGVhZGVyUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKHVwZGF0ZSkge1xuICAgICAgICBpZiAodXBkYXRlID09PSB2b2lkIDApIHsgdXBkYXRlID0ge307IH1cbiAgICAgICAgLy8gUGVyZm9ybSBhIHN0cmFpZ2h0Zm9yd2FyZCBpbml0aWFsaXphdGlvbiBvZiB0aGUgbmV3IEh0dHBIZWFkZXJSZXNwb25zZSxcbiAgICAgICAgLy8gb3ZlcnJpZGluZyB0aGUgY3VycmVudCBwYXJhbWV0ZXJzIHdpdGggbmV3IG9uZXMgaWYgZ2l2ZW4uXG4gICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlclJlc3BvbnNlKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHVwZGF0ZS5oZWFkZXJzIHx8IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHN0YXR1czogdXBkYXRlLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cEhlYWRlclJlc3BvbnNlO1xufShIdHRwUmVzcG9uc2VCYXNlKSk7XG4vKipcbiAqIEEgZnVsbCBIVFRQIHJlc3BvbnNlLCBpbmNsdWRpbmcgYSB0eXBlZCByZXNwb25zZSBib2R5ICh3aGljaCBtYXkgYmUgYG51bGxgXG4gKiBpZiBvbmUgd2FzIG5vdCByZXR1cm5lZCkuXG4gKlxuICogYEh0dHBSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlIGV2ZW50XG4gKiBzdHJlYW0uXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBIdHRwUmVzcG9uc2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEh0dHBSZXNwb25zZSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgYEh0dHBSZXNwb25zZWAuXG4gICAgICogQHBhcmFtIHs/PX0gaW5pdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEh0dHBSZXNwb25zZShpbml0KSB7XG4gICAgICAgIGlmIChpbml0ID09PSB2b2lkIDApIHsgaW5pdCA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGluaXQpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnR5cGUgPSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlO1xuICAgICAgICBfdGhpcy5ib2R5ID0gaW5pdC5ib2R5IHx8IG51bGw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/PX0gdXBkYXRlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKHVwZGF0ZSkge1xuICAgICAgICBpZiAodXBkYXRlID09PSB2b2lkIDApIHsgdXBkYXRlID0ge307IH1cbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgYm9keTogKHVwZGF0ZS5ib2R5ICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICAgICAgICBoZWFkZXJzOiB1cGRhdGUuaGVhZGVycyB8fCB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzdGF0dXM6ICh1cGRhdGUuc3RhdHVzICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cFJlc3BvbnNlO1xufShIdHRwUmVzcG9uc2VCYXNlKSk7XG4vKipcbiAqIEEgcmVzcG9uc2UgdGhhdCByZXByZXNlbnRzIGFuIGVycm9yIG9yIGZhaWx1cmUsIGVpdGhlciBmcm9tIGFcbiAqIG5vbi1zdWNjZXNzZnVsIEhUVFAgc3RhdHVzLCBhbiBlcnJvciB3aGlsZSBleGVjdXRpbmcgdGhlIHJlcXVlc3QsXG4gKiBvciBzb21lIG90aGVyIGZhaWx1cmUgd2hpY2ggb2NjdXJyZWQgZHVyaW5nIHRoZSBwYXJzaW5nIG9mIHRoZSByZXNwb25zZS5cbiAqXG4gKiBBbnkgZXJyb3IgcmV0dXJuZWQgb24gdGhlIGBPYnNlcnZhYmxlYCByZXNwb25zZSBzdHJlYW0gd2lsbCBiZVxuICogd3JhcHBlZCBpbiBhbiBgSHR0cEVycm9yUmVzcG9uc2VgIHRvIHByb3ZpZGUgYWRkaXRpb25hbCBjb250ZXh0IGFib3V0XG4gKiB0aGUgc3RhdGUgb2YgdGhlIEhUVFAgbGF5ZXIgd2hlbiB0aGUgZXJyb3Igb2NjdXJyZWQuIFRoZSBlcnJvciBwcm9wZXJ0eVxuICogd2lsbCBjb250YWluIGVpdGhlciBhIHdyYXBwZWQgRXJyb3Igb2JqZWN0IG9yIHRoZSBlcnJvciByZXNwb25zZSByZXR1cm5lZFxuICogZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSHR0cEVycm9yUmVzcG9uc2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEh0dHBFcnJvclJlc3BvbnNlLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gaW5pdFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEh0dHBFcnJvclJlc3BvbnNlKGluaXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gXG4gICAgICAgIC8vIEluaXRpYWxpemUgd2l0aCBhIGRlZmF1bHQgc3RhdHVzIG9mIDAgLyBVbmtub3duIEVycm9yLlxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBpbml0LCAwLCAnVW5rbm93biBFcnJvcicpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSAnSHR0cEVycm9yUmVzcG9uc2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogRXJyb3JzIGFyZSBuZXZlciBva2F5LCBldmVuIHdoZW4gdGhlIHN0YXR1cyBjb2RlIGlzIGluIHRoZSAyeHggc3VjY2VzcyByYW5nZS5cbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLm9rID0gZmFsc2U7XG4gICAgICAgIC8vIElmIHRoZSByZXNwb25zZSB3YXMgc3VjY2Vzc2Z1bCwgdGhlbiB0aGlzIHdhcyBhIHBhcnNlIGVycm9yLiBPdGhlcndpc2UsIGl0IHdhc1xuICAgICAgICAvLyBhIHByb3RvY29sLWxldmVsIGZhaWx1cmUgb2Ygc29tZSBzb3J0LiBFaXRoZXIgdGhlIHJlcXVlc3QgZmFpbGVkIGluIHRyYW5zaXRcbiAgICAgICAgLy8gb3IgdGhlIHNlcnZlciByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgc3RhdHVzIGNvZGUuXG4gICAgICAgIGlmIChfdGhpcy5zdGF0dXMgPj0gMjAwICYmIF90aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9IFwiSHR0cCBmYWlsdXJlIGR1cmluZyBwYXJzaW5nIGZvciBcIiArIChpbml0LnVybCB8fCAnKHVua25vd24gdXJsKScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgXCJIdHRwIGZhaWx1cmUgcmVzcG9uc2UgZm9yIFwiICsgKGluaXQudXJsIHx8ICcodW5rbm93biB1cmwpJykgKyBcIjogXCIgKyBpbml0LnN0YXR1cyArIFwiIFwiICsgaW5pdC5zdGF0dXNUZXh0O1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmVycm9yID0gaW5pdC5lcnJvciB8fCBudWxsO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIdHRwRXJyb3JSZXNwb25zZTtcbn0oSHR0cFJlc3BvbnNlQmFzZSkpO1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgYEh0dHBSZXF1ZXN0T3B0aW9uczxUPmAgZnJvbSBhIHNvdXJjZSBgSHR0cE1ldGhvZE9wdGlvbnNgIGFuZFxuICogdGhlIGdpdmVuIGBib2R5YC4gQmFzaWNhbGx5LCB0aGlzIGNsb25lcyB0aGUgb2JqZWN0IGFuZCBhZGRzIHRoZSBib2R5LlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7P30gb3B0aW9uc1xuICogQHBhcmFtIHs/fSBib2R5XG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBhZGRCb2R5KG9wdGlvbnMsIGJvZHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgICAgIG9ic2VydmU6IG9wdGlvbnMub2JzZXJ2ZSxcbiAgICAgICAgcGFyYW1zOiBvcHRpb25zLnBhcmFtcyxcbiAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogb3B0aW9ucy5yZXNwb25zZVR5cGUsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsXG4gICAgfTtcbn1cbi8qKlxuICogUGVyZm9ybSBIVFRQIHJlcXVlc3RzLlxuICpcbiAqIGBIdHRwQ2xpZW50YCBpcyBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSBjbGFzcywgd2l0aCBtZXRob2RzIHRvIHBlcmZvcm0gSFRUUCByZXF1ZXN0cy5cbiAqIEVhY2ggcmVxdWVzdCBtZXRob2QgaGFzIG11bHRpcGxlIHNpZ25hdHVyZXMsIGFuZCB0aGUgcmV0dXJuIHR5cGUgdmFyaWVzIGFjY29yZGluZyB0byB3aGljaFxuICogc2lnbmF0dXJlIGlzIGNhbGxlZCAobWFpbmx5IHRoZSB2YWx1ZXMgb2YgYG9ic2VydmVgIGFuZCBgcmVzcG9uc2VUeXBlYCkuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBIdHRwQ2xpZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGhhbmRsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50KGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBgT2JzZXJ2YWJsZWAgZm9yIGEgcGFydGljdWxhciBIVFRQIHJlcXVlc3QgdGhhdCwgd2hlbiBzdWJzY3JpYmVkLFxuICAgICAqIGZpcmVzIHRoZSByZXF1ZXN0IHRocm91Z2ggdGhlIGNoYWluIG9mIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzIGFuZCBvbiB0byB0aGVcbiAgICAgKiBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIGluIG9uZSBvZiB0d28gd2F5cy4gRWl0aGVyIGFuIGBIdHRwUmVxdWVzdGBcbiAgICAgKiBpbnN0YW5jZSBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5IGFzIHRoZSBvbmx5IHBhcmFtZXRlciwgb3IgYSBtZXRob2QgY2FuIGJlXG4gICAgICogcGFzc2VkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIGEgc3RyaW5nIFVSTCBhcyB0aGUgc2Vjb25kLCBhbmQgYW5cbiAgICAgKiBvcHRpb25zIGhhc2ggYXMgdGhlIHRoaXJkLlxuICAgICAqXG4gICAgICogSWYgYSBgSHR0cFJlcXVlc3RgIG9iamVjdCBpcyBwYXNzZWQgZGlyZWN0bHksIGFuIGBPYnNlcnZhYmxlYCBvZiB0aGVcbiAgICAgKiByYXcgYEh0dHBFdmVudGAgc3RyZWFtIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBJZiBhIHJlcXVlc3QgaXMgaW5zdGVhZCBidWlsdCBieSBwcm92aWRpbmcgYSBVUkwsIHRoZSBvcHRpb25zIG9iamVjdFxuICAgICAqIGRldGVybWluZXMgdGhlIHJldHVybiB0eXBlIG9mIGByZXF1ZXN0KClgLiBJbiBhZGRpdGlvbiB0byBjb25maWd1cmluZ1xuICAgICAqIHJlcXVlc3QgcGFyYW1ldGVycyBzdWNoIGFzIHRoZSBvdXRnb2luZyBoZWFkZXJzIGFuZC9vciB0aGUgYm9keSwgdGhlIG9wdGlvbnNcbiAgICAgKiBoYXNoIHNwZWNpZmllcyB0d28ga2V5IHBpZWNlcyBvZiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVxdWVzdDogdGhlXG4gICAgICogYHJlc3BvbnNlVHlwZWAgYW5kIHdoYXQgdG8gYG9ic2VydmVgLlxuICAgICAqXG4gICAgICogVGhlIGByZXNwb25zZVR5cGVgIHZhbHVlIGRldGVybWluZXMgaG93IGEgc3VjY2Vzc2Z1bCByZXNwb25zZSBib2R5IHdpbGwgYmVcbiAgICAgKiBwYXJzZWQuIElmIGByZXNwb25zZVR5cGVgIGlzIHRoZSBkZWZhdWx0IGBqc29uYCwgYSB0eXBlIGludGVyZmFjZSBmb3IgdGhlXG4gICAgICogcmVzdWx0aW5nIG9iamVjdCBtYXkgYmUgcGFzc2VkIGFzIGEgdHlwZSBwYXJhbWV0ZXIgdG8gYHJlcXVlc3QoKWAuXG4gICAgICpcbiAgICAgKiBUaGUgYG9ic2VydmVgIHZhbHVlIGRldGVybWluZXMgdGhlIHJldHVybiB0eXBlIG9mIGByZXF1ZXN0KClgLCBiYXNlZCBvbiB3aGF0XG4gICAgICogdGhlIGNvbnN1bWVyIGlzIGludGVyZXN0ZWQgaW4gb2JzZXJ2aW5nLiBBIHZhbHVlIG9mIGBldmVudHNgIHdpbGwgcmV0dXJuIGFuXG4gICAgICogYE9ic2VydmFibGU8SHR0cEV2ZW50PmAgcmVwcmVzZW50aW5nIHRoZSByYXcgYEh0dHBFdmVudGAgc3RyZWFtLFxuICAgICAqIGluY2x1ZGluZyBwcm9ncmVzcyBldmVudHMgYnkgZGVmYXVsdC4gQSB2YWx1ZSBvZiBgcmVzcG9uc2VgIHdpbGwgcmV0dXJuIGFuXG4gICAgICogYE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPFQ+PmAgd2hlcmUgdGhlIGBUYCBwYXJhbWV0ZXIgb2YgYEh0dHBSZXNwb25zZWBcbiAgICAgKiBkZXBlbmRzIG9uIHRoZSBgcmVzcG9uc2VUeXBlYCBhbmQgYW55IG9wdGlvbmFsbHkgcHJvdmlkZWQgdHlwZSBwYXJhbWV0ZXIuXG4gICAgICogQSB2YWx1ZSBvZiBgYm9keWAgd2lsbCByZXR1cm4gYW4gYE9ic2VydmFibGU8VD5gIHdpdGggdGhlIHNhbWUgYFRgIGJvZHkgdHlwZS5cbiAgICAgKiBAcGFyYW0gez99IGZpcnN0XG4gICAgICogQHBhcmFtIHs/PX0gdXJsXG4gICAgICogQHBhcmFtIHs/PX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChmaXJzdCwgdXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHJlcTtcbiAgICAgICAgLy8gRmlyc3RseSwgY2hlY2sgd2hldGhlciB0aGUgcHJpbWFyeSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBgSHR0cFJlcXVlc3RgLlxuICAgICAgICBpZiAoZmlyc3QgaW5zdGFuY2VvZiBIdHRwUmVxdWVzdCkge1xuICAgICAgICAgICAgLy8gSXQgaXMuIFRoZSBvdGhlciBhcmd1bWVudHMgbXVzdCBiZSB1bmRlZmluZWQgKHBlciB0aGUgc2lnbmF0dXJlcykgYW5kIGNhbiBiZVxuICAgICAgICAgICAgLy8gaWdub3JlZC5cbiAgICAgICAgICAgIHJlcSA9IChmaXJzdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJdCdzIGEgc3RyaW5nLCBzbyBpdCByZXByZXNlbnRzIGEgVVJMLiBDb25zdHJ1Y3QgYSByZXF1ZXN0IGJhc2VkIG9uIGl0LFxuICAgICAgICAgICAgLy8gYW5kIGluY29ycG9yYXRlIHRoZSByZW1haW5pbmcgYXJndW1lbnRzIChhc3N1bWluZyBHRVQgdW5sZXNzIGEgbWV0aG9kIGlzXG4gICAgICAgICAgICAvLyBwcm92aWRlZC5cbiAgICAgICAgICAgIHJlcSA9IG5ldyBIdHRwUmVxdWVzdChmaXJzdCwgLyoqIEB0eXBlIHs/fSAqLyAoKHVybCkpLCBvcHRpb25zLmJvZHkgfHwgbnVsbCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiBvcHRpb25zLnJlcG9ydFByb2dyZXNzLFxuICAgICAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIEpTT04gaXMgYXNzdW1lZCB0byBiZSByZXR1cm5lZCBmb3IgYWxsIGNhbGxzLlxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogb3B0aW9ucy5yZXNwb25zZVR5cGUgfHwgJ2pzb24nLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdGFydCB3aXRoIGFuIE9ic2VydmFibGUub2YoKSB0aGUgaW5pdGlhbCByZXF1ZXN0LCBhbmQgcnVuIHRoZSBoYW5kbGVyICh3aGljaFxuICAgICAgICAvLyBpbmNsdWRlcyBhbGwgaW50ZXJjZXB0b3JzKSBpbnNpZGUgYSBjb25jYXRNYXAoKS4gVGhpcyB3YXksIHRoZSBoYW5kbGVyIHJ1bnNcbiAgICAgICAgLy8gaW5zaWRlIGFuIE9ic2VydmFibGUgY2hhaW4sIHdoaWNoIGNhdXNlcyBpbnRlcmNlcHRvcnMgdG8gYmUgcmUtcnVuIG9uIGV2ZXJ5XG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbiAodGhpcyBhbHNvIG1ha2VzIHJldHJpZXMgcmUtcnVuIHRoZSBoYW5kbGVyLCBpbmNsdWRpbmcgaW50ZXJjZXB0b3JzKS5cbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gZXZlbnRzJCA9IGNvbmNhdE1hcC5jYWxsKG9mKHJlcSksIGZ1bmN0aW9uIChyZXEpIHsgcmV0dXJuIF90aGlzLmhhbmRsZXIuaGFuZGxlKHJlcSk7IH0pO1xuICAgICAgICAvLyBJZiBjb21pbmcgdmlhIHRoZSBBUEkgc2lnbmF0dXJlIHdoaWNoIGFjY2VwdHMgYSBwcmV2aW91c2x5IGNvbnN0cnVjdGVkIEh0dHBSZXF1ZXN0LFxuICAgICAgICAvLyB0aGUgb25seSBvcHRpb24gaXMgdG8gZ2V0IHRoZSBldmVudCBzdHJlYW0uIE90aGVyd2lzZSwgcmV0dXJuIHRoZSBldmVudCBzdHJlYW0gaWZcbiAgICAgICAgLy8gdGhhdCBpcyB3aGF0IHdhcyByZXF1ZXN0ZWQuXG4gICAgICAgIGlmIChmaXJzdCBpbnN0YW5jZW9mIEh0dHBSZXF1ZXN0IHx8IG9wdGlvbnMub2JzZXJ2ZSA9PT0gJ2V2ZW50cycpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudHMkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSByZXF1ZXN0ZWQgc3RyZWFtIGNvbnRhaW5zIGVpdGhlciB0aGUgZnVsbCByZXNwb25zZSBvciB0aGUgYm9keS4gSW4gZWl0aGVyXG4gICAgICAgIC8vIGNhc2UsIHRoZSBmaXJzdCBzdGVwIGlzIHRvIGZpbHRlciB0aGUgZXZlbnQgc3RyZWFtIHRvIGV4dHJhY3QgYSBzdHJlYW0gb2ZcbiAgICAgICAgLy8gcmVzcG9uc2VzKHMpLlxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyByZXMkID0gZmlsdGVyLmNhbGwoZXZlbnRzJCwgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZTsgfSk7XG4gICAgICAgIC8vIERlY2lkZSB3aGljaCBzdHJlYW0gdG8gcmV0dXJuLlxuICAgICAgICBzd2l0Y2ggKG9wdGlvbnMub2JzZXJ2ZSB8fCAnYm9keScpIHtcbiAgICAgICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgICAgIC8vIFRoZSByZXF1ZXN0ZWQgc3RyZWFtIGlzIHRoZSBib2R5LiBNYXAgdGhlIHJlc3BvbnNlIHN0cmVhbSB0byB0aGUgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAvLyBib2R5LiBUaGlzIGNvdWxkIGJlIGRvbmUgbW9yZSBzaW1wbHksIGJ1dCBhIG1pc2JlaGF2aW5nIGludGVyY2VwdG9yIG1pZ2h0XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIHRoZSByZXNwb25zZSBib2R5IGludG8gYSBkaWZmZXJlbnQgZm9ybWF0IGFuZCBpZ25vcmUgdGhlIHJlcXVlc3RlZFxuICAgICAgICAgICAgICAgIC8vIHJlc3BvbnNlVHlwZS4gR3VhcmQgYWdhaW5zdCB0aGlzIGJ5IHZhbGlkYXRpbmcgdGhhdCB0aGUgcmVzcG9uc2UgaXMgb2YgdGhlXG4gICAgICAgICAgICAgICAgLy8gcmVxdWVzdGVkIHR5cGUuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXEucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5YnVmZmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXAuY2FsbChyZXMkLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdGUgdGhhdCB0aGUgYm9keSBpcyBhbiBBcnJheUJ1ZmZlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmJvZHkgIT09IG51bGwgJiYgIShyZXMuYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3BvbnNlIGlzIG5vdCBhbiBBcnJheUJ1ZmZlci4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcC5jYWxsKHJlcyQsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGF0ZSB0aGF0IHRoZSBib2R5IGlzIGEgQmxvYi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmJvZHkgIT09IG51bGwgJiYgIShyZXMuYm9keSBpbnN0YW5jZW9mIEJsb2IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzcG9uc2UgaXMgbm90IGEgQmxvYi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcC5jYWxsKHJlcyQsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGF0ZSB0aGF0IHRoZSBib2R5IGlzIGEgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuYm9keSAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzLmJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzcG9uc2UgaXMgbm90IGEgc3RyaW5nLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyB2YWxpZGF0aW9uIG5lZWRlZCBmb3IgSlNPTiByZXNwb25zZXMsIGFzIHRoZXkgY2FuIGJlIG9mIGFueSB0eXBlLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcC5jYWxsKHJlcyQsIGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgICAgICAgICAgLy8gVGhlIHJlc3BvbnNlIHN0cmVhbSB3YXMgcmVxdWVzdGVkIGRpcmVjdGx5LCBzbyByZXR1cm4gaXQuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIEd1YXJkIGFnYWluc3QgbmV3IGZ1dHVyZSBvYnNlcnZlIHR5cGVzIGJlaW5nIGFkZGVkLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVhY2hhYmxlOiB1bmhhbmRsZWQgb2JzZXJ2ZSB0eXBlIFwiICsgb3B0aW9ucy5vYnNlcnZlICsgXCJ9XCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIGBPYnNlcnZhYmxlYCB3aGljaCwgd2hlbiBzdWJzY3JpYmVkLCB3aWxsIGNhdXNlIHRoZSBjb25maWd1cmVkXG4gICAgICogREVMRVRFIHJlcXVlc3QgdG8gYmUgZXhlY3V0ZWQgb24gdGhlIHNlcnZlci4gU2VlIHRoZSBpbmRpdmlkdWFsIG92ZXJsb2FkcyBmb3JcbiAgICAgKiBkZXRhaWxzIG9mIGBkZWxldGUoKWAncyByZXR1cm4gdHlwZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7Pz19IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgdXJsLCAvKiogQHR5cGUgez99ICovIChvcHRpb25zKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIGBPYnNlcnZhYmxlYCB3aGljaCwgd2hlbiBzdWJzY3JpYmVkLCB3aWxsIGNhdXNlIHRoZSBjb25maWd1cmVkXG4gICAgICogR0VUIHJlcXVlc3QgdG8gYmUgZXhlY3V0ZWQgb24gdGhlIHNlcnZlci4gU2VlIHRoZSBpbmRpdmlkdWFsIG92ZXJsb2FkcyBmb3JcbiAgICAgKiBkZXRhaWxzIG9mIGBnZXQoKWAncyByZXR1cm4gdHlwZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7Pz19IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgdXJsLCAvKiogQHR5cGUgez99ICovIChvcHRpb25zKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIGBPYnNlcnZhYmxlYCB3aGljaCwgd2hlbiBzdWJzY3JpYmVkLCB3aWxsIGNhdXNlIHRoZSBjb25maWd1cmVkXG4gICAgICogSEVBRCByZXF1ZXN0IHRvIGJlIGV4ZWN1dGVkIG9uIHRoZSBzZXJ2ZXIuIFNlZSB0aGUgaW5kaXZpZHVhbCBvdmVybG9hZHMgZm9yXG4gICAgICogZGV0YWlscyBvZiBgaGVhZCgpYCdzIHJldHVybiB0eXBlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7P30gdXJsXG4gICAgICogQHBhcmFtIHs/PX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnSEVBRCcsIHVybCwgLyoqIEB0eXBlIHs/fSAqLyAob3B0aW9ucykpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBgT2JzZXJ2YWJsZWAgd2hpY2gsIHdoZW4gc3Vic2NyaWJlZCwgd2lsbCBjYXVzZSBhIHJlcXVlc3RcbiAgICAgKiB3aXRoIHRoZSBzcGVjaWFsIG1ldGhvZCBgSlNPTlBgIHRvIGJlIGRpc3BhdGNoZWQgdmlhIHRoZSBpbnRlcmNlcHRvciBwaXBlbGluZS5cbiAgICAgKlxuICAgICAqIEEgc3VpdGFibGUgaW50ZXJjZXB0b3IgbXVzdCBiZSBpbnN0YWxsZWQgKGUuZy4gdmlhIHRoZSBgSHR0cENsaWVudEpzb25wTW9kdWxlYCkuXG4gICAgICogSWYgbm8gc3VjaCBpbnRlcmNlcHRvciBpcyByZWFjaGVkLCB0aGVuIHRoZSBgSlNPTlBgIHJlcXVlc3Qgd2lsbCBsaWtlbHkgYmVcbiAgICAgKiByZWplY3RlZCBieSB0aGUgY29uZmlndXJlZCBiYWNrZW5kLlxuICAgICAqIEB0ZW1wbGF0ZSBUXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcGFyYW0gez99IGNhbGxiYWNrUGFyYW1cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmpzb25wID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2tQYXJhbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdKU09OUCcsIHVybCwge1xuICAgICAgICAgICAgcGFyYW1zOiBuZXcgSHR0cFBhcmFtcygpLmFwcGVuZChjYWxsYmFja1BhcmFtLCAnSlNPTlBfQ0FMTEJBQ0snKSxcbiAgICAgICAgICAgIG9ic2VydmU6ICdib2R5JyxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYW4gYE9ic2VydmFibGVgIHdoaWNoLCB3aGVuIHN1YnNjcmliZWQsIHdpbGwgY2F1c2UgdGhlIGNvbmZpZ3VyZWRcbiAgICAgKiBPUFRJT05TIHJlcXVlc3QgdG8gYmUgZXhlY3V0ZWQgb24gdGhlIHNlcnZlci4gU2VlIHRoZSBpbmRpdmlkdWFsIG92ZXJsb2FkcyBmb3JcbiAgICAgKiBkZXRhaWxzIG9mIGBvcHRpb25zKClgJ3MgcmV0dXJuIHR5cGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcGFyYW0gez89fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdPUFRJT05TJywgdXJsLCAvKiogQHR5cGUgez99ICovIChvcHRpb25zKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIGBPYnNlcnZhYmxlYCB3aGljaCwgd2hlbiBzdWJzY3JpYmVkLCB3aWxsIGNhdXNlIHRoZSBjb25maWd1cmVkXG4gICAgICogUEFUQ0ggcmVxdWVzdCB0byBiZSBleGVjdXRlZCBvbiB0aGUgc2VydmVyLiBTZWUgdGhlIGluZGl2aWR1YWwgb3ZlcmxvYWRzIGZvclxuICAgICAqIGRldGFpbHMgb2YgYHBhdGNoKClgJ3MgcmV0dXJuIHR5cGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcGFyYW0gez99IGJvZHlcbiAgICAgKiBAcGFyYW0gez89fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5wYXRjaCA9IGZ1bmN0aW9uICh1cmwsIGJvZHksIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUEFUQ0gnLCB1cmwsIGFkZEJvZHkob3B0aW9ucywgYm9keSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBgT2JzZXJ2YWJsZWAgd2hpY2gsIHdoZW4gc3Vic2NyaWJlZCwgd2lsbCBjYXVzZSB0aGUgY29uZmlndXJlZFxuICAgICAqIFBPU1QgcmVxdWVzdCB0byBiZSBleGVjdXRlZCBvbiB0aGUgc2VydmVyLiBTZWUgdGhlIGluZGl2aWR1YWwgb3ZlcmxvYWRzIGZvclxuICAgICAqIGRldGFpbHMgb2YgYHBvc3QoKWAncyByZXR1cm4gdHlwZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7P30gYm9keVxuICAgICAqIEBwYXJhbSB7Pz19IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBib2R5LCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCB1cmwsIGFkZEJvZHkob3B0aW9ucywgYm9keSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBgT2JzZXJ2YWJsZWAgd2hpY2gsIHdoZW4gc3Vic2NyaWJlZCwgd2lsbCBjYXVzZSB0aGUgY29uZmlndXJlZFxuICAgICAqIFBPU1QgcmVxdWVzdCB0byBiZSBleGVjdXRlZCBvbiB0aGUgc2VydmVyLiBTZWUgdGhlIGluZGl2aWR1YWwgb3ZlcmxvYWRzIGZvclxuICAgICAqIGRldGFpbHMgb2YgYHBvc3QoKWAncyByZXR1cm4gdHlwZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7P30gYm9keVxuICAgICAqIEBwYXJhbSB7Pz19IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uICh1cmwsIGJvZHksIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgdXJsLCBhZGRCb2R5KG9wdGlvbnMsIGJvZHkpKTtcbiAgICB9O1xuICAgIHJldHVybiBIdHRwQ2xpZW50O1xufSgpKTtcbkh0dHBDbGllbnQuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkh0dHBDbGllbnQuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBIdHRwSGFuZGxlciwgfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIGBIdHRwSGFuZGxlcmAgd2hpY2ggYXBwbGllcyBhbiBgSHR0cEludGVyY2VwdG9yYCB0byBhbiBgSHR0cFJlcXVlc3RgLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSHR0cEludGVyY2VwdG9ySGFuZGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBuZXh0XG4gICAgICogQHBhcmFtIHs/fSBpbnRlcmNlcHRvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEh0dHBJbnRlcmNlcHRvckhhbmRsZXIobmV4dCwgaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgICAgICAgdGhpcy5pbnRlcmNlcHRvciA9IGludGVyY2VwdG9yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHJlcVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cEludGVyY2VwdG9ySGFuZGxlci5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCB0aGlzLm5leHQpO1xuICAgIH07XG4gICAgcmV0dXJuIEh0dHBJbnRlcmNlcHRvckhhbmRsZXI7XG59KCkpO1xuLyoqXG4gKiBBIG11bHRpLXByb3ZpZGVyIHRva2VuIHdoaWNoIHJlcHJlc2VudHMgdGhlIGFycmF5IG9mIGBIdHRwSW50ZXJjZXB0b3JgcyB0aGF0XG4gKiBhcmUgcmVnaXN0ZXJlZC5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEhUVFBfSU5URVJDRVBUT1JTID0gbmV3IEluamVjdGlvblRva2VuKCdIVFRQX0lOVEVSQ0VQVE9SUycpO1xudmFyIE5vb3BJbnRlcmNlcHRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm9vcEludGVyY2VwdG9yKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHJlcVxuICAgICAqIEBwYXJhbSB7P30gbmV4dFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTm9vcEludGVyY2VwdG9yLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAocmVxLCBuZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH07XG4gICAgcmV0dXJuIE5vb3BJbnRlcmNlcHRvcjtcbn0oKSk7XG5Ob29wSW50ZXJjZXB0b3IuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbk5vb3BJbnRlcmNlcHRvci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLy8gRXZlcnkgcmVxdWVzdCBtYWRlIHRocm91Z2ggSlNPTlAgbmVlZHMgYSBjYWxsYmFjayBuYW1lIHRoYXQncyB1bmlxdWUgYWNyb3NzIHRoZVxuLy8gd2hvbGUgcGFnZS4gRWFjaCByZXF1ZXN0IGlzIGFzc2lnbmVkIGFuIGlkIGFuZCB0aGUgY2FsbGJhY2sgbmFtZSBpcyBjb25zdHJ1Y3RlZFxuLy8gZnJvbSB0aGF0LiBUaGUgbmV4dCBpZCB0byBiZSBhc3NpZ25lZCBpcyB0cmFja2VkIGluIGEgZ2xvYmFsIHZhcmlhYmxlIGhlcmUgdGhhdFxuLy8gaXMgc2hhcmVkIGFtb25nIGFsbCBhcHBsaWNhdGlvbnMgb24gdGhlIHBhZ2UuXG52YXIgbmV4dFJlcXVlc3RJZCA9IDA7XG4vLyBFcnJvciB0ZXh0IGdpdmVuIHdoZW4gYSBKU09OUCBzY3JpcHQgaXMgaW5qZWN0ZWQsIGJ1dCBkb2Vzbid0IGludm9rZSB0aGUgY2FsbGJhY2tcbi8vIHBhc3NlZCBpbiBpdHMgVVJMLlxudmFyIEpTT05QX0VSUl9OT19DQUxMQkFDSyA9ICdKU09OUCBpbmplY3RlZCBzY3JpcHQgZGlkIG5vdCBpbnZva2UgY2FsbGJhY2suJztcbi8vIEVycm9yIHRleHQgZ2l2ZW4gd2hlbiBhIHJlcXVlc3QgaXMgcGFzc2VkIHRvIHRoZSBKc29ucENsaWVudEJhY2tlbmQgdGhhdCBkb2Vzbid0XG4vLyBoYXZlIGEgcmVxdWVzdCBtZXRob2QgSlNPTlAuXG52YXIgSlNPTlBfRVJSX1dST05HX01FVEhPRCA9ICdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBKU09OUCByZXF1ZXN0IG1ldGhvZC4nO1xudmFyIEpTT05QX0VSUl9XUk9OR19SRVNQT05TRV9UWVBFID0gJ0pTT05QIHJlcXVlc3RzIG11c3QgdXNlIEpzb24gcmVzcG9uc2UgdHlwZS4nO1xuLyoqXG4gKiBESSB0b2tlbi9hYnN0cmFjdCB0eXBlIHJlcHJlc2VudGluZyBhIG1hcCBvZiBKU09OUCBjYWxsYmFja3MuXG4gKlxuICogSW4gdGhlIGJyb3dzZXIsIHRoaXMgc2hvdWxkIGFsd2F5cyBiZSB0aGUgYHdpbmRvd2Agb2JqZWN0LlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICogQGFic3RyYWN0XG4gKi9cbnZhciBKc29ucENhbGxiYWNrQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSnNvbnBDYWxsYmFja0NvbnRleHQoKSB7XG4gICAgfVxuICAgIHJldHVybiBKc29ucENhbGxiYWNrQ29udGV4dDtcbn0oKSk7XG4vKipcbiAqIGBIdHRwQmFja2VuZGAgdGhhdCBvbmx5IHByb2Nlc3NlcyBgSHR0cFJlcXVlc3RgIHdpdGggdGhlIEpTT05QIG1ldGhvZCxcbiAqIGJ5IHBlcmZvcm1pbmcgSlNPTlAgc3R5bGUgcmVxdWVzdHMuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBKc29ucENsaWVudEJhY2tlbmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gY2FsbGJhY2tNYXBcbiAgICAgKiBAcGFyYW0gez99IGRvY3VtZW50XG4gICAgICovXG4gICAgZnVuY3Rpb24gSnNvbnBDbGllbnRCYWNrZW5kKGNhbGxiYWNrTWFwLCBkb2N1bWVudCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrTWFwID0gY2FsbGJhY2tNYXA7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuYW1lIG9mIHRoZSBuZXh0IGNhbGxiYWNrIG1ldGhvZCwgYnkgaW5jcmVtZW50aW5nIHRoZSBnbG9iYWwgYG5leHRSZXF1ZXN0SWRgLlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSnNvbnBDbGllbnRCYWNrZW5kLnByb3RvdHlwZS5uZXh0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBcIm5nX2pzb25wX2NhbGxiYWNrX1wiICsgbmV4dFJlcXVlc3RJZCsrOyB9O1xuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgYSBKU09OUCByZXF1ZXN0IGFuZCByZXR1cm4gYW4gZXZlbnQgc3RyZWFtIG9mIHRoZSByZXN1bHRzLlxuICAgICAqIEBwYXJhbSB7P30gcmVxXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBKc29ucENsaWVudEJhY2tlbmQucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gRmlyc3RseSwgY2hlY2sgYm90aCB0aGUgbWV0aG9kIGFuZCByZXNwb25zZSB0eXBlLiBJZiBlaXRoZXIgZG9lc24ndCBtYXRjaFxuICAgICAgICAvLyB0aGVuIHRoZSByZXF1ZXN0IHdhcyBpbXByb3Blcmx5IHJvdXRlZCBoZXJlIGFuZCBjYW5ub3QgYmUgaGFuZGxlZC5cbiAgICAgICAgaWYgKHJlcS5tZXRob2QgIT09ICdKU09OUCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OUF9FUlJfV1JPTkdfTUVUSE9EKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXEucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OUF9FUlJfV1JPTkdfUkVTUE9OU0VfVFlQRSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXZlcnl0aGluZyBlbHNlIGhhcHBlbnMgaW5zaWRlIHRoZSBPYnNlcnZhYmxlIGJvdW5kYXJ5LlxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAvLyBUaGUgZmlyc3Qgc3RlcCB0byBtYWtlIGEgcmVxdWVzdCBpcyB0byBnZW5lcmF0ZSB0aGUgY2FsbGJhY2sgbmFtZSwgYW5kIHJlcGxhY2UgdGhlXG4gICAgICAgICAgICAvLyBjYWxsYmFjayBwbGFjZWhvbGRlciBpbiB0aGUgVVJMIHdpdGggdGhlIG5hbWUuIENhcmUgaGFzIHRvIGJlIHRha2VuIGhlcmUgdG8gZW5zdXJlXG4gICAgICAgICAgICAvLyBhIHRyYWlsaW5nICYsIGlmIG1hdGNoZWQsIGdldHMgaW5zZXJ0ZWQgYmFjayBpbnRvIHRoZSBVUkwgaW4gdGhlIGNvcnJlY3QgcGxhY2UuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBjYWxsYmFjayA9IF90aGlzLm5leHRDYWxsYmFjaygpO1xuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdXJsID0gcmVxLnVybFdpdGhQYXJhbXMucmVwbGFjZSgvPUpTT05QX0NBTExCQUNLKCZ8JCkvLCBcIj1cIiArIGNhbGxiYWNrICsgXCIkMVwiKTtcbiAgICAgICAgICAgIC8vIENvbnN0cnVjdCB0aGUgPHNjcmlwdD4gdGFnIGFuZCBwb2ludCBpdCBhdCB0aGUgVVJMLlxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbm9kZSA9IF90aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgbm9kZS5zcmMgPSB1cmw7XG4gICAgICAgICAgICAvLyBBIEpTT05QIHJlcXVlc3QgcmVxdWlyZXMgd2FpdGluZyBmb3IgbXVsdGlwbGUgY2FsbGJhY2tzLiBUaGVzZSB2YXJpYWJsZXNcbiAgICAgICAgICAgIC8vIGFyZSBjbG9zZWQgb3ZlciBhbmQgdHJhY2sgc3RhdGUgYWNyb3NzIHRob3NlIGNhbGxiYWNrcy5cbiAgICAgICAgICAgIC8vIFRoZSByZXNwb25zZSBvYmplY3QsIGlmIG9uZSBoYXMgYmVlbiByZWNlaXZlZCwgb3IgbnVsbCBvdGhlcndpc2UuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBib2R5ID0gbnVsbDtcbiAgICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIHJlc3BvbnNlIGNhbGxiYWNrIGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBXaGV0aGVyIHRoZSByZXF1ZXN0IGhhcyBiZWVuIGNhbmNlbGxlZCAoYW5kIHRodXMgYW55IG90aGVyIGNhbGxiYWNrcylcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSBpZ25vcmVkLlxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHJlc3BvbnNlIGNhbGxiYWNrIGluIHRoaXMuY2FsbGJhY2tNYXAgKHdoaWNoIHdpbGwgYmUgdGhlIHdpbmRvd1xuICAgICAgICAgICAgLy8gb2JqZWN0IGluIHRoZSBicm93c2VyLiBUaGUgc2NyaXB0IGJlaW5nIGxvYWRlZCB2aWEgdGhlIDxzY3JpcHQ+IHRhZyB3aWxsXG4gICAgICAgICAgICAvLyBldmVudHVhbGx5IGNhbGwgdGhpcyBjYWxsYmFjay5cbiAgICAgICAgICAgIF90aGlzLmNhbGxiYWNrTWFwW2NhbGxiYWNrXSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gRGF0YSBoYXMgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSBKU09OUCBzY3JpcHQuIEZpcnN0bHksIGRlbGV0ZSB0aGlzIGNhbGxiYWNrLlxuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5jYWxsYmFja01hcFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgLy8gTmV4dCwgbWFrZSBzdXJlIHRoZSByZXF1ZXN0IHdhc24ndCBjYW5jZWxsZWQgaW4gdGhlIG1lYW50aW1lLlxuICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXQgc3RhdGUgdG8gaW5kaWNhdGUgZGF0YSB3YXMgcmVjZWl2ZWQuXG4gICAgICAgICAgICAgICAgYm9keSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGNsZWFudXAoKSBpcyBhIHV0aWxpdHkgY2xvc3VyZSB0aGF0IHJlbW92ZXMgdGhlIDxzY3JpcHQ+IGZyb20gdGhlIHBhZ2UgYW5kXG4gICAgICAgICAgICAvLyB0aGUgcmVzcG9uc2UgY2FsbGJhY2sgZnJvbSB0aGUgd2luZG93LiBUaGlzIGxvZ2ljIGlzIHVzZWQgaW4gYm90aCB0aGVcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MsIGVycm9yLCBhbmQgY2FuY2VsbGF0aW9uIHBhdGhzLCBzbyBpdCdzIGV4dHJhY3RlZCBvdXQgZm9yIGNvbnZlbmllbmNlLlxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIDxzY3JpcHQ+IHRhZyBpZiBpdCdzIHN0aWxsIG9uIHRoZSBwYWdlLlxuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHJlc3BvbnNlIGNhbGxiYWNrIGZyb20gdGhlIGNhbGxiYWNrTWFwICh3aW5kb3cgb2JqZWN0IGluIHRoZVxuICAgICAgICAgICAgICAgIC8vIGJyb3dzZXIpLlxuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5jYWxsYmFja01hcFtjYWxsYmFja107XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gb25Mb2FkKCkgaXMgdGhlIHN1Y2Nlc3MgY2FsbGJhY2sgd2hpY2ggcnVucyBhZnRlciB0aGUgcmVzcG9uc2UgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGlmIHRoZSBKU09OUCBzY3JpcHQgbG9hZHMgc3VjY2Vzc2Z1bGx5LiBUaGUgZXZlbnQgaXRzZWxmIGlzIHVuaW1wb3J0YW50LlxuICAgICAgICAgICAgLy8gSWYgc29tZXRoaW5nIHdlbnQgd3JvbmcsIG9uTG9hZCgpIG1heSBydW4gd2l0aG91dCB0aGUgcmVzcG9uc2UgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGhhdmluZyBiZWVuIGludm9rZWQuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBvbkxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHRoZSByZXF1ZXN0IGhhcyBiZWVuIGNhbmNlbGxlZC5cbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ2xlYW51cCB0aGUgcGFnZS5cbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgcmVzcG9uc2UgY2FsbGJhY2sgaGFzIHJ1bi5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0IGhhc24ndCwgc29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCB0aGUgcmVxdWVzdC4gUmV0dXJuIGFuIGVycm9yIHZpYVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgT2JzZXJ2YWJsZSBlcnJvciBwYXRoLiBBbGwgSlNPTlAgZXJyb3JzIGhhdmUgc3RhdHVzIDAuXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICdKU09OUCBFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKEpTT05QX0VSUl9OT19DQUxMQkFDSyksXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzLiBib2R5IGVpdGhlciBjb250YWlucyB0aGUgcmVzcG9uc2UgYm9keSBvciBudWxsIGlmIG5vbmUgd2FzXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuZWQuXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChuZXcgSHR0cFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICdPSycsIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAvLyBDb21wbGV0ZSB0aGUgc3RyZWFtLCB0aGUgcmVzcG9zbmUgaXMgb3Zlci5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIG9uRXJyb3IoKSBpcyB0aGUgZXJyb3IgY2FsbGJhY2ssIHdoaWNoIHJ1bnMgaWYgdGhlIHNjcmlwdCByZXR1cm5lZCBnZW5lcmF0ZXNcbiAgICAgICAgICAgIC8vIGEgSmF2YXNjcmlwdCBlcnJvci4gSXQgZW1pdHMgdGhlIGVycm9yIHZpYSB0aGUgT2JzZXJ2YWJsZSBlcnJvciBjaGFubmVsIGFzXG4gICAgICAgICAgICAvLyBhIEh0dHBFcnJvclJlc3BvbnNlLlxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gb25FcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IHdhcyBhbHJlYWR5IGNhbmNlbGxlZCwgbm8gbmVlZCB0byBlbWl0IGFueXRoaW5nLlxuICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgZXJyb3IgaW4gYSBIdHRwRXJyb3JSZXNwb25zZS5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJ0pTT05QIEVycm9yJywgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFN1YnNjcmliZSB0byBib3RoIHRoZSBzdWNjZXNzIChsb2FkKSBhbmQgZXJyb3IgZXZlbnRzIG9uIHRoZSA8c2NyaXB0PiB0YWcsXG4gICAgICAgICAgICAvLyBhbmQgYWRkIGl0IHRvIHRoZSBwYWdlLlxuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgIF90aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCBoYXMgbm93IGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQuXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgdHlwZTogSHR0cEV2ZW50VHlwZS5TZW50IH0pO1xuICAgICAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhbmRsZXIuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIFRyYWNrIHRoZSBjYW5jZWxsYXRpb24gc28gZXZlbnQgbGlzdGVuZXJzIHdvbid0IGRvIGFueXRoaW5nIGV2ZW4gaWYgYWxyZWFkeSBzY2hlZHVsZWQuXG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVycyBzbyB0aGV5IHdvbid0IHJ1biBpZiB0aGUgZXZlbnRzIGxhdGVyIGZpcmUuXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgLy8gQW5kIGZpbmFsbHksIGNsZWFuIHVwIHRoZSBwYWdlLlxuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEpzb25wQ2xpZW50QmFja2VuZDtcbn0oKSk7XG5Kc29ucENsaWVudEJhY2tlbmQuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkpzb25wQ2xpZW50QmFja2VuZC5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEpzb25wQ2FsbGJhY2tDb250ZXh0LCB9LFxuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtET0NVTUVOVCxdIH0sXSB9LFxuXTsgfTtcbi8qKlxuICogQW4gYEh0dHBJbnRlcmNlcHRvcmAgd2hpY2ggaWRlbnRpZmllcyByZXF1ZXN0cyB3aXRoIHRoZSBtZXRob2QgSlNPTlAgYW5kXG4gKiBzaGlmdHMgdGhlbSB0byB0aGUgYEpzb25wQ2xpZW50QmFja2VuZGAuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBKc29ucEludGVyY2VwdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGpzb25wXG4gICAgICovXG4gICAgZnVuY3Rpb24gSnNvbnBJbnRlcmNlcHRvcihqc29ucCkge1xuICAgICAgICB0aGlzLmpzb25wID0ganNvbnA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gcmVxXG4gICAgICogQHBhcmFtIHs/fSBuZXh0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBKc29ucEludGVyY2VwdG9yLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAocmVxLCBuZXh0KSB7XG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnSlNPTlAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5qc29ucC5oYW5kbGUoLyoqIEB0eXBlIHs/fSAqLyAocmVxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoIGZvciBub3JtYWwgSFRUUCByZXF1ZXN0cy5cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfTtcbiAgICByZXR1cm4gSnNvbnBJbnRlcmNlcHRvcjtcbn0oKSk7XG5Kc29ucEludGVyY2VwdG9yLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5Kc29ucEludGVyY2VwdG9yLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogSnNvbnBDbGllbnRCYWNrZW5kLCB9LFxuXTsgfTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbnZhciBYU1NJX1BSRUZJWCA9IC9eXFwpXFxdXFx9Jyw/XFxuLztcbi8qKlxuICogRGV0ZXJtaW5lIGFuIGFwcHJvcHJpYXRlIFVSTCBmb3IgdGhlIHJlc3BvbnNlLCBieSBjaGVja2luZyBlaXRoZXJcbiAqIFhNTEh0dHBSZXF1ZXN0LnJlc3BvbnNlVVJMIG9yIHRoZSBYLVJlcXVlc3QtVVJMIGhlYWRlci5cbiAqIEBwYXJhbSB7P30geGhyXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBnZXRSZXNwb25zZVVybCh4aHIpIHtcbiAgICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgJiYgeGhyLnJlc3BvbnNlVVJMKSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkw7XG4gICAgfVxuICAgIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdGhlIGBYTUxIdHRwUmVxdWVzdGAgY29uc3RydWN0b3IuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAYWJzdHJhY3RcbiAqL1xudmFyIFhockZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFhockZhY3RvcnkoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgWGhyRmFjdG9yeS5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIFhockZhY3Rvcnk7XG59KCkpO1xuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIFxcQHtsaW5rIEh0dHBYaHJCYWNrZW5kfSB0aGF0IHVzZXMgdGhlIGBYTUxIdHRwUmVxdWVzdGAgYnJvd3NlciBBUEkuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBCcm93c2VyWGhyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcm93c2VyWGhyKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEJyb3dzZXJYaHIucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKChuZXcgWE1MSHR0cFJlcXVlc3QoKSkpOyB9O1xuICAgIHJldHVybiBCcm93c2VyWGhyO1xufSgpKTtcbkJyb3dzZXJYaHIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkJyb3dzZXJYaHIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogQW4gYEh0dHBCYWNrZW5kYCB3aGljaCB1c2VzIHRoZSBYTUxIdHRwUmVxdWVzdCBBUEkgdG8gc2VuZFxuICogcmVxdWVzdHMgdG8gYSBiYWNrZW5kIHNlcnZlci5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBYaHJCYWNrZW5kID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHhockZhY3RvcnlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwWGhyQmFja2VuZCh4aHJGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMueGhyRmFjdG9yeSA9IHhockZhY3Rvcnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgYSByZXF1ZXN0IGFuZCByZXR1cm4gYSBzdHJlYW0gb2YgcmVzcG9uc2UgZXZlbnRzLlxuICAgICAqIEBwYXJhbSB7P30gcmVxXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwWGhyQmFja2VuZC5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBRdWljayBjaGVjayB0byBnaXZlIGEgYmV0dGVyIGVycm9yIG1lc3NhZ2Ugd2hlbiBhIHVzZXIgYXR0ZW1wdHMgdG8gdXNlXG4gICAgICAgIC8vIEh0dHBDbGllbnQuanNvbnAoKSB3aXRob3V0IGluc3RhbGxpbmcgdGhlIEpzb25wQ2xpZW50TW9kdWxlXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnSlNPTlAnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBdHRlbXB0ZWQgdG8gY29uc3RydWN0IEpzb25wIHJlcXVlc3Qgd2l0aG91dCBKc29ucENsaWVudE1vZHVsZSBpbnN0YWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZXJ5dGhpbmcgaGFwcGVucyBvbiBPYnNlcnZhYmxlIHN1YnNjcmlwdGlvbi5cbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgLy8gU3RhcnQgYnkgc2V0dGluZyB1cCB0aGUgWEhSIG9iamVjdCB3aXRoIHJlcXVlc3QgbWV0aG9kLCBVUkwsIGFuZCB3aXRoQ3JlZGVudGlhbHMgZmxhZy5cbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHhociA9IF90aGlzLnhockZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zKTtcbiAgICAgICAgICAgIGlmICghIXJlcS53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCBhbGwgdGhlIHJlcXVlc3RlZCBoZWFkZXJzLlxuICAgICAgICAgICAgcmVxLmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgdmFsdWVzKSB7IHJldHVybiB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZXMuam9pbignLCcpKTsgfSk7XG4gICAgICAgICAgICAvLyBBZGQgYW4gQWNjZXB0IGhlYWRlciBpZiBvbmUgaXNuJ3QgcHJlc2VudCBhbHJlYWR5LlxuICAgICAgICAgICAgaWYgKCFyZXEuaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEF1dG8tZGV0ZWN0IHRoZSBDb250ZW50LVR5cGUgaGVhZGVyIGlmIG9uZSBpc24ndCBwcmVzZW50IGFscmVhZHkuXG4gICAgICAgICAgICBpZiAoIXJlcS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBkZXRlY3RlZFR5cGUgPSByZXEuZGV0ZWN0Q29udGVudFR5cGVIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgQ29udGVudC1UeXBlIGRldGVjdGlvbiBmYWlscy5cbiAgICAgICAgICAgICAgICBpZiAoZGV0ZWN0ZWRUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBkZXRlY3RlZFR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNldCB0aGUgcmVzcG9uc2VUeXBlIGlmIG9uZSB3YXMgcmVxdWVzdGVkLlxuICAgICAgICAgICAgaWYgKHJlcS5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gKHJlcS5yZXNwb25zZVR5cGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgdGhlIHJlcXVlc3QgYm9keSBpZiBvbmUgaXMgcHJlc2VudC4gSWYgbm90LCB0aGlzIHdpbGwgYmUgc2V0IHRvIG51bGwuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyByZXFCb2R5ID0gcmVxLnNlcmlhbGl6ZUJvZHkoKTtcbiAgICAgICAgICAgIC8vIElmIHByb2dyZXNzIGV2ZW50cyBhcmUgZW5hYmxlZCwgcmVzcG9uc2UgaGVhZGVycyB3aWxsIGJlIGRlbGl2ZXJlZFxuICAgICAgICAgICAgLy8gaW4gdHdvIGV2ZW50cyAtIHRoZSBIdHRwSGVhZGVyUmVzcG9uc2UgZXZlbnQgYW5kIHRoZSBmdWxsIEh0dHBSZXNwb25zZVxuICAgICAgICAgICAgLy8gZXZlbnQuIEhvd2V2ZXIsIHNpbmNlIHJlc3BvbnNlIGhlYWRlcnMgZG9uJ3QgY2hhbmdlIGluIGJldHdlZW4gdGhlc2VcbiAgICAgICAgICAgIC8vIHR3byBldmVudHMsIGl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0byBwYXJzZSB0aGVtIHR3aWNlLiBTbyBoZWFkZXJSZXNwb25zZVxuICAgICAgICAgICAgLy8gY2FjaGVzIHRoZSBkYXRhIGV4dHJhY3RlZCBmcm9tIHRoZSByZXNwb25zZSB3aGVuZXZlciBpdCdzIGZpcnN0IHBhcnNlZCxcbiAgICAgICAgICAgIC8vIHRvIGVuc3VyZSBwYXJzaW5nIGlzbid0IGR1cGxpY2F0ZWQuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBoZWFkZXJSZXNwb25zZSA9IG51bGw7XG4gICAgICAgICAgICAvLyBwYXJ0aWFsRnJvbVhociBleHRyYWN0cyB0aGUgSHR0cEhlYWRlclJlc3BvbnNlIGZyb20gdGhlIGN1cnJlbnQgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgIC8vIHN0YXRlLCBhbmQgbWVtb2l6ZXMgaXQgaW50byBoZWFkZXJSZXNwb25zZS5cbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHBhcnRpYWxGcm9tWGhyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChoZWFkZXJSZXNwb25zZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVhZGVyUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJlYWQgc3RhdHVzIGFuZCBub3JtYWxpemUgYW4gSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MCkuXG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gc3RhdHVzID0geGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gc3RhdHVzVGV4dCA9IHhoci5zdGF0dXNUZXh0IHx8ICdPSyc7XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgaGVhZGVycyBmcm9tIFhNTEh0dHBSZXF1ZXN0IC0gdGhpcyBzdGVwIGlzIGxhenkuXG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgICAgICAgICAgIC8vIFJlYWQgdGhlIHJlc3BvbnNlIFVSTCBmcm9tIHRoZSBYTUxIdHRwUmVzcG9uc2UgaW5zdGFuY2UgYW5kIGZhbGwgYmFjayBvbiB0aGVcbiAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IFVSTC5cbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB1cmwgPSBnZXRSZXNwb25zZVVybCh4aHIpIHx8IHJlcS51cmw7XG4gICAgICAgICAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBIdHRwSGVhZGVyUmVzcG9uc2UgYW5kIG1lbW9pemUgaXQuXG4gICAgICAgICAgICAgICAgaGVhZGVyUmVzcG9uc2UgPSBuZXcgSHR0cEhlYWRlclJlc3BvbnNlKHsgaGVhZGVyczogaGVhZGVycywgc3RhdHVzOiBzdGF0dXMsIHN0YXR1c1RleHQ6IHN0YXR1c1RleHQsIHVybDogdXJsIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBoZWFkZXJSZXNwb25zZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBOZXh0LCBhIGZldyBjbG9zdXJlcyBhcmUgZGVmaW5lZCBmb3IgdGhlIHZhcmlvdXMgZXZlbnRzIHdoaWNoIFhNTEh0dHBSZXF1ZXN0IGNhblxuICAgICAgICAgICAgLy8gZW1pdC4gVGhpcyBhbGxvd3MgdGhlbSB0byBiZSB1bnJlZ2lzdGVyZWQgYXMgZXZlbnQgbGlzdGVuZXJzIGxhdGVyLlxuICAgICAgICAgICAgLy8gRmlyc3QgdXAgaXMgdGhlIGxvYWQgZXZlbnQsIHdoaWNoIHJlcHJlc2VudHMgYSByZXNwb25zZSBiZWluZyBmdWxseSBhdmFpbGFibGUuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBvbkxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVhZCByZXNwb25zZSBzdGF0ZSBmcm9tIHRoZSBtZW1vaXplZCBwYXJ0aWFsIGRhdGEuXG4gICAgICAgICAgICAgICAgdmFyIF9hID0gcGFydGlhbEZyb21YaHIoKSwgaGVhZGVycyA9IF9hLmhlYWRlcnMsIHN0YXR1cyA9IF9hLnN0YXR1cywgc3RhdHVzVGV4dCA9IF9hLnN0YXR1c1RleHQsIHVybCA9IF9hLnVybDtcbiAgICAgICAgICAgICAgICAvLyBUaGUgYm9keSB3aWxsIGJlIHJlYWQgb3V0IGlmIHByZXNlbnQuXG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gYm9keSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBYTUxIdHRwUmVxdWVzdC5yZXNwb25zZSBpZiBzZXQsIHJlc3BvbnNlVGV4dCBvdGhlcndpc2UuXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSAodHlwZW9mIHhoci5yZXNwb25zZSA9PT0gJ3VuZGVmaW5lZCcpID8geGhyLnJlc3BvbnNlVGV4dCA6IHhoci5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaXAgYSBjb21tb24gWFNTSSBwcmVmaXggZnJvbSBzdHJpbmcgcmVzcG9uc2VzLlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZXRlcm1pbmUgaWYgdGhpcyBiZWhhdmlvciBzaG91bGQgYmUgb3B0aW9uYWwgYW5kIG1vdmVkIHRvIGFuIGludGVyY2VwdG9yLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKFhTU0lfUFJFRklYLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTm9ybWFsaXplIGFub3RoZXIgcG90ZW50aWFsIGJ1ZyAodGhpcyBvbmUgY29tZXMgZnJvbSBDT1JTKS5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICEhYm9keSA/IDIwMCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIG9rIGRldGVybWluZXMgd2hldGhlciB0aGUgcmVzcG9uc2Ugd2lsbCBiZSB0cmFuc21pdHRlZCBvbiB0aGUgZXZlbnQgb3JcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBjaGFubmVsLiBVbnN1Y2Nlc3NmdWwgc3RhdHVzIGNvZGVzIChub3QgMnh4KSB3aWxsIGFsd2F5cyBiZSBlcnJvcnMsXG4gICAgICAgICAgICAgICAgLy8gYnV0IGEgc3VjY2Vzc2Z1bCBzdGF0dXMgY29kZSBjYW4gc3RpbGwgcmVzdWx0IGluIGFuIGVycm9yIGlmIHRoZSB1c2VyXG4gICAgICAgICAgICAgICAgLy8gYXNrZWQgZm9yIEpTT04gZGF0YSBhbmQgdGhlIGJvZHkgY2Fubm90IGJlIHBhcnNlZCBhcyBzdWNoLlxuICAgICAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIG9rID0gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYm9keSBuZWVkcyB0byBiZSBwYXJzZWQgYXMgSlNPTiAoaW4gbWFueSBjYXNlcyB0aGUgYnJvd3NlclxuICAgICAgICAgICAgICAgIC8vIHdpbGwgaGF2ZSBkb25lIHRoYXQgYWxyZWFkeSkuXG4gICAgICAgICAgICAgICAgaWYgKG9rICYmIHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJyAmJiByZXEucmVzcG9uc2VUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXR0ZW1wdCB0aGUgcGFyc2UuIElmIGl0IGZhaWxzLCBhIHBhcnNlIGVycm9yIHNob3VsZCBiZSBkZWxpdmVyZWQgdG8gdGhlIHVzZXIuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSByZXNwb25zZSBzdGF0dXMgd2FzIDJ4eCwgdGhpcyBpcyBzdGlsbCBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcGFyc2UgZXJyb3IgY29udGFpbnMgdGhlIHRleHQgb2YgdGhlIGJvZHkgdGhhdCBmYWlsZWQgdG8gcGFyc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gKHsgZXJyb3I6IGVycm9yLCB0ZXh0OiBib2R5IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgaXMgZGVsaXZlcmVkIG9uIHRoZSBldmVudCBzdHJlYW0uXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQobmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZnVsbCBib2R5IGhhcyBiZWVuIHJlY2VpdmVkIGFuZCBkZWxpdmVyZWQsIG5vIGZ1cnRoZXIgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIGFyZSBwb3NzaWJsZS4gVGhpcyByZXF1ZXN0IGlzIGNvbXBsZXRlLlxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gdW5zdWNjZXNzZnVsIHJlcXVlc3QgaXMgZGVsaXZlcmVkIG9uIHRoZSBlcnJvciBjaGFubmVsLlxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGVycm9yIGluIHRoaXMgY2FzZSBpcyB0aGUgcmVzcG9uc2UgYm9keSAoZXJyb3IgZnJvbSB0aGUgc2VydmVyKS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBUaGUgb25FcnJvciBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZyBhdCB0aGUgbmV0d29yayBsZXZlbC5cbiAgICAgICAgICAgIC8vIENvbm5lY3Rpb24gdGltZW91dCwgRE5TIGVycm9yLCBvZmZsaW5lLCBldGMuIFRoZXNlIGFyZSBhY3R1YWwgZXJyb3JzLCBhbmQgYXJlXG4gICAgICAgICAgICAvLyB0cmFuc21pdHRlZCBvbiB0aGUgZXJyb3IgY2hhbm5lbC5cbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIG9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyByZXMgPSBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyB8fCAwLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCB8fCAnVW5rbm93biBFcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IocmVzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBUaGUgc2VudEhlYWRlcnMgZmxhZyB0cmFja3Mgd2hldGhlciB0aGUgSHR0cFJlc3BvbnNlSGVhZGVycyBldmVudFxuICAgICAgICAgICAgLy8gaGFzIGJlZW4gc2VudCBvbiB0aGUgc3RyZWFtLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byB0cmFjayBpZiBwcm9ncmVzc1xuICAgICAgICAgICAgLy8gaXMgZW5hYmxlZCBzaW5jZSB0aGUgZXZlbnQgd2lsbCBiZSBzZW50IG9uIG9ubHkgdGhlIGZpcnN0IGRvd25sb2FkXG4gICAgICAgICAgICAvLyBwcm9nZXJzcyBldmVudC5cbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHNlbnRIZWFkZXJzID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBUaGUgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnQgaGFuZGxlciwgd2hpY2ggaXMgb25seSByZWdpc3RlcmVkIGlmXG4gICAgICAgICAgICAvLyBwcm9ncmVzcyBldmVudHMgYXJlIGVuYWJsZWQuXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBvbkRvd25Qcm9ncmVzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIC8vIFNlbmQgdGhlIEh0dHBSZXNwb25zZUhlYWRlcnMgZXZlbnQgaWYgaXQgaGFzbid0IGJlZW4gc2VudCBhbHJlYWR5LlxuICAgICAgICAgICAgICAgIGlmICghc2VudEhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChwYXJ0aWFsRnJvbVhocigpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VudEhlYWRlcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTdGFydCBidWlsZGluZyB0aGUgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnQgdG8gZGVsaXZlciBvbiB0aGUgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAvLyBldmVudCBzdHJlYW0uXG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcHJvZ3Jlc3NFdmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZWQ6IGV2ZW50LmxvYWRlZCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIGluIHRoZSBldmVudCBpZiBpdCdzIGF2YWlsYWJsZS5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50LnRvdGFsID0gZXZlbnQudG90YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IHdhcyBmb3IgdGV4dCBjb250ZW50IGFuZCBhIHBhcnRpYWwgcmVzcG9uc2UgaXNcbiAgICAgICAgICAgICAgICAvLyBhdmFpbGFibGUgb24gWE1MSHR0cFJlcXVlc3QsIGluY2x1ZGUgaXQgaW4gdGhlIHByb2dyZXNzIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gdG8gYWxsb3cgZm9yIHN0cmVhbWluZyByZWFkcy5cbiAgICAgICAgICAgICAgICBpZiAocmVxLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnICYmICEheGhyLnJlc3BvbnNlVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50LnBhcnRpYWxUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRmluYWxseSwgZmlyZSB0aGUgZXZlbnQuXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChwcm9ncmVzc0V2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBUaGUgdXBsb2FkIHByb2dyZXNzIGV2ZW50IGhhbmRsZXIsIHdoaWNoIGlzIG9ubHkgcmVnaXN0ZXJlZCBpZlxuICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgZXZlbnRzIGFyZSBlbmFibGVkLlxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gb25VcFByb2dyZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gVXBsb2FkIHByb2dyZXNzIGV2ZW50cyBhcmUgc2ltcGxlci4gQmVnaW4gYnVpbGRpbmcgdGhlIHByb2dyZXNzXG4gICAgICAgICAgICAgICAgLy8gZXZlbnQuXG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZDogZXZlbnQubG9hZGVkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBiZWluZyB1cGxvYWRlZCBpcyBhdmFpbGFibGUsIGluY2x1ZGVcbiAgICAgICAgICAgICAgICAvLyBpdC5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy50b3RhbCA9IGV2ZW50LnRvdGFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZW5kIHRoZSBldmVudC5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHByb2dyZXNzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCByZWdpc3RlciBmb3IgbG9hZCBhbmQgZXJyb3IgZXZlbnRzLlxuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAvLyBQcm9ncmVzcyBldmVudHMgYXJlIG9ubHkgZW5hYmxlZCBpZiByZXF1ZXN0ZWQuXG4gICAgICAgICAgICBpZiAocmVxLnJlcG9ydFByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gRG93bmxvYWQgcHJvZ3Jlc3MgaXMgYWx3YXlzIGVuYWJsZWQgaWYgcmVxdWVzdGVkLlxuICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uRG93blByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICAvLyBVcGxvYWQgcHJvZ3Jlc3MgZGVwZW5kcyBvbiB3aGV0aGVyIHRoZXJlIGlzIGEgYm9keSB0byB1cGxvYWQuXG4gICAgICAgICAgICAgICAgaWYgKHJlcUJvZHkgIT09IG51bGwgJiYgeGhyLnVwbG9hZCkge1xuICAgICAgICAgICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25VcFByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaXJlIHRoZSByZXF1ZXN0LCBhbmQgbm90aWZ5IHRoZSBldmVudCBzdHJlYW0gdGhhdCBpdCB3YXMgZmlyZWQuXG4gICAgICAgICAgICB4aHIuc2VuZChyZXFCb2R5KTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyB0eXBlOiBIdHRwRXZlbnRUeXBlLlNlbnQgfSk7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSByZXR1cm4gZnJvbSB0aGUgT2JzZXJ2YWJsZSBmdW5jdGlvbiwgd2hpY2ggaXMgdGhlXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGNhbmNlbGxhdGlvbiBoYW5kbGVyLlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBPbiBhIGNhbmNlbGxhdGlvbiwgcmVtb3ZlIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgICAgICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5yZXBvcnRQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB4aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvbkRvd25Qcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXFCb2R5ICE9PSBudWxsICYmIHhoci51cGxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci51cGxvYWQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBvblVwUHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHksIGFib3J0IHRoZSBpbi1mbGlnaHQgcmVxdWVzdC5cbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEh0dHBYaHJCYWNrZW5kO1xufSgpKTtcbkh0dHBYaHJCYWNrZW5kLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5IdHRwWGhyQmFja2VuZC5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFhockZhY3RvcnksIH0sXG5dOyB9O1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xudmFyIFhTUkZfQ09PS0lFX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1hTUkZfQ09PS0lFX05BTUUnKTtcbnZhciBYU1JGX0hFQURFUl9OQU1FID0gbmV3IEluamVjdGlvblRva2VuKCdYU1JGX0hFQURFUl9OQU1FJyk7XG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBYU1JGIHRva2VuIHRvIHVzZSB3aXRoIHRoZSBuZXh0IG91dGdvaW5nIHJlcXVlc3QuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAYWJzdHJhY3RcbiAqL1xudmFyIEh0dHBYc3JmVG9rZW5FeHRyYWN0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEh0dHBYc3JmVG9rZW5FeHRyYWN0b3IoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgWFNSRiB0b2tlbiB0byB1c2Ugd2l0aCBhbiBvdXRnb2luZyByZXF1ZXN0LlxuICAgICAqXG4gICAgICogV2lsbCBiZSBjYWxsZWQgZm9yIGV2ZXJ5IHJlcXVlc3QsIHNvIHRoZSB0b2tlbiBtYXkgY2hhbmdlIGJldHdlZW4gcmVxdWVzdHMuXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwWHNyZlRva2VuRXh0cmFjdG9yLnByb3RvdHlwZS5nZXRUb2tlbiA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gSHR0cFhzcmZUb2tlbkV4dHJhY3Rvcjtcbn0oKSk7XG4vKipcbiAqIGBIdHRwWHNyZlRva2VuRXh0cmFjdG9yYCB3aGljaCByZXRyaWV2ZXMgdGhlIHRva2VuIGZyb20gYSBjb29raWUuXG4gKi9cbnZhciBIdHRwWHNyZkNvb2tpZUV4dHJhY3RvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBkb2NcbiAgICAgKiBAcGFyYW0gez99IHBsYXRmb3JtXG4gICAgICogQHBhcmFtIHs/fSBjb29raWVOYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gSHR0cFhzcmZDb29raWVFeHRyYWN0b3IoZG9jLCBwbGF0Zm9ybSwgY29va2llTmFtZSkge1xuICAgICAgICB0aGlzLmRvYyA9IGRvYztcbiAgICAgICAgdGhpcy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgICAgICB0aGlzLmNvb2tpZU5hbWUgPSBjb29raWVOYW1lO1xuICAgICAgICB0aGlzLmxhc3RDb29raWVTdHJpbmcgPSAnJztcbiAgICAgICAgdGhpcy5sYXN0VG9rZW4gPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogXFxAaW50ZXJuYWwgZm9yIHRlc3RpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGFyc2VDb3VudCA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFhzcmZDb29raWVFeHRyYWN0b3IucHJvdG90eXBlLmdldFRva2VuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybSA9PT0gJ3NlcnZlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGNvb2tpZVN0cmluZyA9IHRoaXMuZG9jLmNvb2tpZSB8fCAnJztcbiAgICAgICAgaWYgKGNvb2tpZVN0cmluZyAhPT0gdGhpcy5sYXN0Q29va2llU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlQ291bnQrKztcbiAgICAgICAgICAgIHRoaXMubGFzdFRva2VuID0gybVwYXJzZUNvb2tpZVZhbHVlKGNvb2tpZVN0cmluZywgdGhpcy5jb29raWVOYW1lKTtcbiAgICAgICAgICAgIHRoaXMubGFzdENvb2tpZVN0cmluZyA9IGNvb2tpZVN0cmluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sYXN0VG9rZW47XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cFhzcmZDb29raWVFeHRyYWN0b3I7XG59KCkpO1xuSHR0cFhzcmZDb29raWVFeHRyYWN0b3IuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkh0dHBYc3JmQ29va2llRXh0cmFjdG9yLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtET0NVTUVOVCxdIH0sXSB9LFxuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtQTEFURk9STV9JRCxdIH0sXSB9LFxuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtYU1JGX0NPT0tJRV9OQU1FLF0gfSxdIH0sXG5dOyB9O1xuLyoqXG4gKiBgSHR0cEludGVyY2VwdG9yYCB3aGljaCBhZGRzIGFuIFhTUkYgdG9rZW4gdG8gZWxpZ2libGUgb3V0Z29pbmcgcmVxdWVzdHMuXG4gKi9cbnZhciBIdHRwWHNyZkludGVyY2VwdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHRva2VuU2VydmljZVxuICAgICAqIEBwYXJhbSB7P30gaGVhZGVyTmFtZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEh0dHBYc3JmSW50ZXJjZXB0b3IodG9rZW5TZXJ2aWNlLCBoZWFkZXJOYW1lKSB7XG4gICAgICAgIHRoaXMudG9rZW5TZXJ2aWNlID0gdG9rZW5TZXJ2aWNlO1xuICAgICAgICB0aGlzLmhlYWRlck5hbWUgPSBoZWFkZXJOYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHJlcVxuICAgICAqIEBwYXJhbSB7P30gbmV4dFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSHR0cFhzcmZJbnRlcmNlcHRvci5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKHJlcSwgbmV4dCkge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBsY1VybCA9IHJlcS51cmwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gU2tpcCBib3RoIG5vbi1tdXRhdGluZyByZXF1ZXN0cyBhbmQgYWJzb2x1dGUgVVJMcy5cbiAgICAgICAgLy8gTm9uLW11dGF0aW5nIHJlcXVlc3RzIGRvbid0IHJlcXVpcmUgYSB0b2tlbiwgYW5kIGFic29sdXRlIFVSTHMgcmVxdWlyZSBzcGVjaWFsIGhhbmRsaW5nXG4gICAgICAgIC8vIGFueXdheSBhcyB0aGUgY29va2llIHNldFxuICAgICAgICAvLyBvbiBvdXIgb3JpZ2luIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgdG9rZW4gZXhwZWN0ZWQgYnkgYW5vdGhlciBvcmlnaW4uXG4gICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJyB8fCByZXEubWV0aG9kID09PSAnSEVBRCcgfHwgbGNVcmwuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8XG4gICAgICAgICAgICBsY1VybC5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XG4gICAgICAgIC8vIEJlIGNhcmVmdWwgbm90IHRvIG92ZXJ3cml0ZSBhbiBleGlzdGluZyBoZWFkZXIgb2YgdGhlIHNhbWUgbmFtZS5cbiAgICAgICAgaWYgKHRva2VuICE9PSBudWxsICYmICFyZXEuaGVhZGVycy5oYXModGhpcy5oZWFkZXJOYW1lKSkge1xuICAgICAgICAgICAgcmVxID0gcmVxLmNsb25lKHsgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KHRoaXMuaGVhZGVyTmFtZSwgdG9rZW4pIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH07XG4gICAgcmV0dXJuIEh0dHBYc3JmSW50ZXJjZXB0b3I7XG59KCkpO1xuSHR0cFhzcmZJbnRlcmNlcHRvci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuSHR0cFhzcmZJbnRlcmNlcHRvci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEh0dHBYc3JmVG9rZW5FeHRyYWN0b3IsIH0sXG4gICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEluamVjdCwgYXJnczogW1hTUkZfSEVBREVSX05BTUUsXSB9LF0gfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gYEh0dHBIYW5kbGVyYCB0aGF0IGFwcGxpZXMgYSBidW5jaCBvZiBgSHR0cEludGVyY2VwdG9yYHNcbiAqIHRvIGEgcmVxdWVzdCBiZWZvcmUgcGFzc2luZyBpdCB0byB0aGUgZ2l2ZW4gYEh0dHBCYWNrZW5kYC5cbiAqXG4gKiBNZWFudCB0byBiZSB1c2VkIGFzIGEgZmFjdG9yeSBmdW5jdGlvbiB3aXRoaW4gYEh0dHBDbGllbnRNb2R1bGVgLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICogQHBhcmFtIHs/fSBiYWNrZW5kXG4gKiBAcGFyYW0gez89fSBpbnRlcmNlcHRvcnNcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGludGVyY2VwdGluZ0hhbmRsZXIoYmFja2VuZCwgaW50ZXJjZXB0b3JzKSB7XG4gICAgaWYgKGludGVyY2VwdG9ycyA9PT0gdm9pZCAwKSB7IGludGVyY2VwdG9ycyA9IFtdOyB9XG4gICAgaWYgKCFpbnRlcmNlcHRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGJhY2tlbmQ7XG4gICAgfVxuICAgIHJldHVybiBpbnRlcmNlcHRvcnMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKG5leHQsIGludGVyY2VwdG9yKSB7IHJldHVybiBuZXcgSHR0cEludGVyY2VwdG9ySGFuZGxlcihuZXh0LCBpbnRlcmNlcHRvcik7IH0sIGJhY2tlbmQpO1xufVxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGVyZSB0byBzdG9yZSBKU09OUCBjYWxsYmFja3MuXG4gKlxuICogT3JkaW5hcmlseSBKU09OUCBjYWxsYmFja3MgYXJlIHN0b3JlZCBvbiB0aGUgYHdpbmRvd2Agb2JqZWN0LCBidXQgdGhpcyBtYXkgbm90IGV4aXN0XG4gKiBpbiB0ZXN0IGVudmlyb25tZW50cy4gSW4gdGhhdCBjYXNlLCBjYWxsYmFja3MgYXJlIHN0b3JlZCBvbiBhbiBhbm9ueW1vdXMgb2JqZWN0IGluc3RlYWQuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBqc29ucENhbGxiYWNrQ29udGV4dCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufVxuLyoqXG4gKiBgTmdNb2R1bGVgIHdoaWNoIGFkZHMgWFNSRiBwcm90ZWN0aW9uIHN1cHBvcnQgdG8gb3V0Z29pbmcgcmVxdWVzdHMuXG4gKlxuICogUHJvdmlkZWQgdGhlIHNlcnZlciBzdXBwb3J0cyBhIGNvb2tpZS1iYXNlZCBYU1JGIHByb3RlY3Rpb24gc3lzdGVtLCB0aGlzXG4gKiBtb2R1bGUgY2FuIGJlIHVzZWQgZGlyZWN0bHkgdG8gY29uZmlndXJlIFhTUkYgcHJvdGVjdGlvbiB3aXRoIHRoZSBjb3JyZWN0XG4gKiBjb29raWUgYW5kIGhlYWRlciBuYW1lcy5cbiAqXG4gKiBJZiBubyBzdWNoIG5hbWVzIGFyZSBwcm92aWRlZCwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIGBYLVhTUkYtVE9LRU5gIGZvclxuICogdGhlIGhlYWRlciBuYW1lIGFuZCBgWFNSRi1UT0tFTmAgZm9yIHRoZSBjb29raWUgbmFtZS5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIEh0dHBDbGllbnRYc3JmTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50WHNyZk1vZHVsZSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB0aGUgZGVmYXVsdCBYU1JGIHByb3RlY3Rpb24uXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwQ2xpZW50WHNyZk1vZHVsZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEh0dHBDbGllbnRYc3JmTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBIdHRwWHNyZkludGVyY2VwdG9yLCB1c2VDbGFzczogTm9vcEludGVyY2VwdG9yIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlIFhTUkYgcHJvdGVjdGlvbiB0byB1c2UgdGhlIGdpdmVuIGNvb2tpZSBuYW1lIG9yIGhlYWRlciBuYW1lLFxuICAgICAqIG9yIHRoZSBkZWZhdWx0IG5hbWVzIChhcyBkZXNjcmliZWQgYWJvdmUpIGlmIG5vdCBwcm92aWRlZC5cbiAgICAgKiBAcGFyYW0gez89fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIdHRwQ2xpZW50WHNyZk1vZHVsZS53aXRoT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogSHR0cENsaWVudFhzcmZNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvb2tpZU5hbWUgPyB7IHByb3ZpZGU6IFhTUkZfQ09PS0lFX05BTUUsIHVzZVZhbHVlOiBvcHRpb25zLmNvb2tpZU5hbWUgfSA6IFtdLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyTmFtZSA/IHsgcHJvdmlkZTogWFNSRl9IRUFERVJfTkFNRSwgdXNlVmFsdWU6IG9wdGlvbnMuaGVhZGVyTmFtZSB9IDogW10sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIEh0dHBDbGllbnRYc3JmTW9kdWxlO1xufSgpKTtcbkh0dHBDbGllbnRYc3JmTW9kdWxlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgSHR0cFhzcmZJbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlRXhpc3Rpbmc6IEh0dHBYc3JmSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogSHR0cFhzcmZUb2tlbkV4dHJhY3RvciwgdXNlQ2xhc3M6IEh0dHBYc3JmQ29va2llRXh0cmFjdG9yIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogWFNSRl9DT09LSUVfTkFNRSwgdXNlVmFsdWU6ICdYU1JGLVRPS0VOJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFhTUkZfSEVBREVSX05BTUUsIHVzZVZhbHVlOiAnWC1YU1JGLVRPS0VOJyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkh0dHBDbGllbnRYc3JmTW9kdWxlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4vKipcbiAqIGBOZ01vZHVsZWAgd2hpY2ggcHJvdmlkZXMgdGhlIGBIdHRwQ2xpZW50YCBhbmQgYXNzb2NpYXRlZCBzZXJ2aWNlcy5cbiAqXG4gKiBJbnRlcmNlcHRvcnMgY2FuIGJlIGFkZGVkIHRvIHRoZSBjaGFpbiBiZWhpbmQgYEh0dHBDbGllbnRgIGJ5IGJpbmRpbmcgdGhlbVxuICogdG8gdGhlIG11bHRpcHJvdmlkZXIgZm9yIGBIVFRQX0lOVEVSQ0VQVE9SU2AuXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBIdHRwQ2xpZW50TW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50TW9kdWxlKCkge1xuICAgIH1cbiAgICByZXR1cm4gSHR0cENsaWVudE1vZHVsZTtcbn0oKSk7XG5IdHRwQ2xpZW50TW9kdWxlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIEh0dHBDbGllbnRYc3JmTW9kdWxlLndpdGhPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgICAgICBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAvLyBIdHRwSGFuZGxlciBpcyB0aGUgYmFja2VuZCArIGludGVyY2VwdG9ycyBhbmQgaXMgY29uc3RydWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlIGludGVyY2VwdGluZ0hhbmRsZXIgZmFjdG9yeSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBpbnRlcmNlcHRpbmdIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwczogW0h0dHBCYWNrZW5kLCBbbmV3IE9wdGlvbmFsKCksIG5ldyBJbmplY3QoSFRUUF9JTlRFUkNFUFRPUlMpXV0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEh0dHBYaHJCYWNrZW5kLFxuICAgICAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEh0dHBCYWNrZW5kLCB1c2VFeGlzdGluZzogSHR0cFhockJhY2tlbmQgfSxcbiAgICAgICAgICAgICAgICAgICAgQnJvd3NlclhocixcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VFeGlzdGluZzogQnJvd3NlclhociB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkh0dHBDbGllbnRNb2R1bGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogYE5nTW9kdWxlYCB3aGljaCBlbmFibGVzIEpTT05QIHN1cHBvcnQgaW4gYEh0dHBDbGllbnRgLlxuICpcbiAqIFdpdGhvdXQgdGhpcyBtb2R1bGUsIEpzb25wIHJlcXVlc3RzIHdpbGwgcmVhY2ggdGhlIGJhY2tlbmRcbiAqIHdpdGggbWV0aG9kIEpTT05QLCB3aGVyZSB0aGV5J2xsIGJlIHJlamVjdGVkLlxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSHR0cENsaWVudEpzb25wTW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50SnNvbnBNb2R1bGUoKSB7XG4gICAgfVxuICAgIHJldHVybiBIdHRwQ2xpZW50SnNvbnBNb2R1bGU7XG59KCkpO1xuSHR0cENsaWVudEpzb25wTW9kdWxlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgSnNvbnBDbGllbnRCYWNrZW5kLFxuICAgICAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEpzb25wQ2FsbGJhY2tDb250ZXh0LCB1c2VGYWN0b3J5OiBqc29ucENhbGxiYWNrQ29udGV4dCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSnNvbnBJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5IdHRwQ2xpZW50SnNvbnBNb2R1bGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cbmV4cG9ydCB7IEh0dHBCYWNrZW5kLCBIdHRwSGFuZGxlciwgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEhUVFBfSU5URVJDRVBUT1JTLCBKc29ucENsaWVudEJhY2tlbmQsIEpzb25wSW50ZXJjZXB0b3IsIEh0dHBDbGllbnRKc29ucE1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudFhzcmZNb2R1bGUsIGludGVyY2VwdGluZ0hhbmRsZXIgYXMgybVpbnRlcmNlcHRpbmdIYW5kbGVyLCBIdHRwUGFyYW1zLCBIdHRwVXJsRW5jb2RpbmdDb2RlYywgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwRXZlbnRUeXBlLCBIdHRwSGVhZGVyUmVzcG9uc2UsIEh0dHBSZXNwb25zZSwgSHR0cFJlc3BvbnNlQmFzZSwgSHR0cFhockJhY2tlbmQsIFhockZhY3RvcnksIEh0dHBYc3JmVG9rZW5FeHRyYWN0b3IsIE5vb3BJbnRlcmNlcHRvciBhcyDJtWEsIEpzb25wQ2FsbGJhY2tDb250ZXh0IGFzIMm1YiwganNvbnBDYWxsYmFja0NvbnRleHQgYXMgybVjLCBCcm93c2VyWGhyIGFzIMm1ZCwgSHR0cFhzcmZDb29raWVFeHRyYWN0b3IgYXMgybVnLCBIdHRwWHNyZkludGVyY2VwdG9yIGFzIMm1aCwgWFNSRl9DT09LSUVfTkFNRSBhcyDJtWUsIFhTUkZfSEVBREVSX05BTUUgYXMgybVmIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odHRwLmVzNS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9AYW5ndWxhci9jb21tb24vQGFuZ3VsYXIvY29tbW9uL2h0dHAuZXM1LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIF8gICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtyb2xlc30gICAgICAgIGZyb20gJy4uL19saWIvdmFycyc7XG5pbXBvcnQgcm91dGVzRmlsdGVyZXIgZnJvbSAnLi9yb3V0ZXMtZmlsdGVyZXIvcm91dGVzLWZpbHRlcmVyJztcbmltcG9ydCBsaW5rc0dlbmVyYXRvciBmcm9tICcuL2xpbmtzLWdlbmVyYXRvci9saW5rcy1nZW5lcmF0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyb2xlTmFtZSwgbmF2aWdhdGUgPSB0cnVlLCBhcHByb3ZlZFJvdXRlcz8pIHtcbiAgbGV0IHJvbGUgPSByb2xlc1tyb2xlTmFtZV07XG4gIGxldCB7cm91dGVzOiBhbGxSb3V0ZXMsIF9kZWZhdWx0OiBhbGxEZWZhdWx0fSA9IHJvbGVzLmFsbDtcbiAgbGV0IHtsaW5rc1B1Ymxpc2hlciwgcm91dGVyLCByZWRpcmVjdFVybH0gPSB0aGlzO1xuICBsZXQge3JvdXRlcywgX2RlZmF1bHR9ID0gcm9sZTtcblxuICBpZihhcHByb3ZlZFJvdXRlcykge1xuICAgIGxldCBfZGVmYXVsdEhvbGRlciA9IHtfZGVmYXVsdDogJyd9O1xuICAgIHJvdXRlcyA9IHJvdXRlc0ZpbHRlcmVyKHJvdXRlcywgYXBwcm92ZWRSb3V0ZXMsIF9kZWZhdWx0SG9sZGVyKTtcbiAgICAoe19kZWZhdWx0fSA9IF9kZWZhdWx0SG9sZGVyKTtcbiAgfVxuICBcbiAgaWYoIV9kZWZhdWx0KSB7XG4gICAgX2RlZmF1bHQgPSBhbGxEZWZhdWx0O1xuICB9XG4gIFxuICBpZighX2RlZmF1bHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2ggcm9sZSBzaG91bGQgaGF2ZSBhIGRlZmF1bHQgcm91dGUnKTtcbiAgfVxuICBcbiAgXy5leHRlbmQodGhpcywge3N0YXR1czogcm9sZU5hbWUsIGRlZmF1bHRVcmw6IF9kZWZhdWx0fSk7XG5cbiAgaWYoIV8uZmlsdGVyKHJvdXRlcywge3BhdGg6ICcnfSkubGVuZ3RoKSB7XG4gICAgcm91dGVzLnB1c2goLi4uYWxsUm91dGVzKTtcbiAgICByb3V0ZXMucHVzaCh7cGF0aDogJycsIHBhdGhNYXRjaDogJ2Z1bGwnLCByZWRpcmVjdFRvOiBfZGVmYXVsdH0pO1xuICAgIHJvdXRlcy5wdXNoKHtwYXRoOiAnKionLCByZWRpcmVjdFRvOiBfZGVmYXVsdH0pO1xuICB9XG4gIFxuICBsaW5rc1B1Ymxpc2hlci5uZXh0KHtyb2xlOiByb2xlTmFtZSwgbGlua3M6IGxpbmtzR2VuZXJhdG9yKHJvdXRlcyl9KTtcbiAgcm91dGVyLnJlc2V0Q29uZmlnKHJvdXRlcyk7XG5cbiAgaWYobmF2aWdhdGUpIHtcbiAgICBkZWxldGUgdGhpcy5yZWRpcmVjdFVybDtcbiAgICByb3V0ZXIubmF2aWdhdGUoW3JlZGlyZWN0VXJsIHx8IF9kZWZhdWx0XSwge3JlcGxhY2VVcmw6IHRydWV9KTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLXNldHRlci9yb2xlLXNldHRlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7TmdNb2R1bGV9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SHR0cENsaWVudFBsdXN9ICAgZnJvbSAnLi9fY29uc3RydWN0b3IvY29uc3RydWN0b3InO1xuaW1wb3J0IGluaXQgICAgICAgICAgICAgICBmcm9tICcuL2luaXRpYWxpemVyL2luaXRpYWxpemVyJztcbmltcG9ydCBzZXRUb2tlbiAgICAgICAgICAgZnJvbSAnLi90b2tlbi1zZXR0ZXIvdG9rZW4tc2V0dGVyJztcbmltcG9ydCByZW1vdmVUb2tlbiAgICAgICAgZnJvbSAnLi90b2tlbi1yZW1vdmVyL3Rva2VuLXJlbW92ZXInO1xuaW1wb3J0IGdldFRva2VuICAgICAgICAgICBmcm9tICcuL3Rva2VuLWdldHRlci90b2tlbi1nZXR0ZXInO1xuaW1wb3J0IGh0dHBXcmFwcGVycyAgICAgICBmcm9tICcuL2h0dHAtd3JhcHBlcnMvaHR0cC13cmFwcGVycyc7XG5cbl8uZXh0ZW5kKEh0dHBDbGllbnRQbHVzLnByb3RvdHlwZSwge1xuICBpbml0LFxuICBnZXRUb2tlbixcbiAgc2V0VG9rZW4sXG4gIHJlbW92ZVRva2VuLFxuICAuLi5odHRwV3JhcHBlcnNcbn0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0h0dHBDbGllbnRQbHVzXVxufSkgY2xhc3MgSHR0cENsaWVudFBsdXNNb2R1bGUge31cblxuZXhwb3J0IHtcbiAgSHR0cENsaWVudFBsdXMsXG4gIEh0dHBDbGllbnRQbHVzTW9kdWxlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy9uZy1odHRwLWNsaWVudC1wbHVzLnRzIiwiaW1wb3J0IGF1dG9Mb2dvdXRIYW5kbGVyIGZyb20gJy4vX2xpYi9hdXRvLWxvZ291dC1oYW5kbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgb3BlcmF0aW9uID0+IHtcbiAgbGV0IG1ldGhvZE5hbWUgPSBvcGVyYXRpb24gKyAnRXZlbnRMaXN0ZW5lcic7XG4gIGxldCBldmVudE5hbWVzID0gWydjbGljaycsICdrZXl1cCcsICdtb3VzZW1vdmUnXTtcbiAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgZG9jdW1lbnRbbWV0aG9kTmFtZV0oZXZlbnROYW1lLCBhdXRvTG9nb3V0SGFuZGxlcik7XG4gIH0pO1xuICBcbiAgaWYob3BlcmF0aW9uID09PSAnYWRkJykge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50TmFtZXNbMF0pKTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hdXRvLWxvZ291dC1zZXR0ZXIvYXV0by1sb2dvdXQtc2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCAocm91dGUsIHJvbGVOYW1lKSA9PiB7XG4gIHJvdXRlID0gXy5vbWl0KHJvdXRlLCBbJ2NoaWxkcmVuJ10pO1xuICByZXR1cm4gXy5leHRlbmQocm91dGUsIHtjaGlsZHJlbjogW10sIHJvbGU6IHJvbGVOYW1lfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luaXRpYWxpemVyL3JvbGVzLWFzc2VtYmxlci9yb3V0ZS10by1yb2xlLWxpbmtlci9fbGliL3JvdXRlLXN0ZXJpbGl6ZXIudHMiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7IHRocm93IGVycjsgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkgeyB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvT2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xuZnVuY3Rpb24gZ2V0U3ltYm9sT2JzZXJ2YWJsZShjb250ZXh0KSB7XG4gICAgdmFyICQkb2JzZXJ2YWJsZTtcbiAgICB2YXIgU3ltYm9sID0gY29udGV4dC5TeW1ib2w7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2wub2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuICAgICAgICAgICAgU3ltYm9sLm9ic2VydmFibGUgPSAkJG9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQkb2JzZXJ2YWJsZSA9ICdAQG9ic2VydmFibGUnO1xuICAgIH1cbiAgICByZXR1cm4gJCRvYnNlcnZhYmxlO1xufVxuZXhwb3J0cy5nZXRTeW1ib2xPYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGUocm9vdF8xLnJvb3QpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugb2JzZXJ2YWJsZSBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRvYnNlcnZhYmxlID0gZXhwb3J0cy5vYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9zeW1ib2wvb2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgU3ltYm9sID0gcm9vdF8xLnJvb3QuU3ltYm9sO1xuZXhwb3J0cy5yeFN1YnNjcmliZXIgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLmZvciA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIFN5bWJvbC5mb3IoJ3J4U3Vic2NyaWJlcicpIDogJ0BAcnhTdWJzY3JpYmVyJztcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHJ4U3Vic2NyaWJlciBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRyeFN1YnNjcmliZXIgPSBleHBvcnRzLnJ4U3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ4U3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIHR5cGVvZiBhbnkgc28gdGhhdCBpdCB3ZSBkb24ndCBoYXZlIHRvIGNhc3Qgd2hlbiBjb21wYXJpbmcgYSByZXN1bHQgdG8gdGhlIGVycm9yIG9iamVjdFxuZXhwb3J0cy5lcnJvck9iamVjdCA9IHsgZToge30gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yT2JqZWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPSBudWxsICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jztcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzT2JqZWN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvaXNPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90c2xpYi90c2xpYi5lczYuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7SHR0cENsaWVudFBsdXN9ICBmcm9tICduZy1odHRwLWNsaWVudC1wbHVzJztcbmltcG9ydCB7Um91dGVyfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpIFxuZXhwb3J0IGNsYXNzIEd1YXJkaWFuIHtcbiAgaW5pdDtcbiAgbG9naW47XG4gIGxvZ291dDtcbiAgbGlua3M7XG4gIHJvbGU7XG4gIGNvbmZpZ3M7XG4gIGRlZmF1bHRVcmw7XG4gIHJlZGlyZWN0VXJsO1xuICBsaW5rc1B1Ymxpc2hlciA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICBcbiAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnRQbHVzLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHt9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtjb25maWdzIGFzIF9jb25maWdzfSBmcm9tICcuLi9fbGliL3ZhcnMnOyAgICAgICAgICBcbmltcG9ydCByb2xlU2V0dGVyICAgICAgICAgICAgZnJvbSAnLi4vcm9sZS1zZXR0ZXIvcm9sZS1zZXR0ZXInO1xuaW1wb3J0IHJvbGVzQXNzZW1ibGVyICAgICAgICBmcm9tICcuL3JvbGVzLWFzc2VtYmxlci9yb2xlcy1hc3NlbWJsZXInO1xuaW1wb3J0IHJlZGlyZWN0Q2FwdHVyZXIgICAgICBmcm9tICcuL3JlZGlyZWN0LWNhcHR1cmVyL3JlZGlyZWN0LWNhcHR1cmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uZmlncykge1xuICBfLmV4dGVuZCh0aGlzLCB7Y29uZmlnc30pO1xuICBfLmV4dGVuZChfY29uZmlncywgY29uZmlncywge2d1YXJkaWFuOiB0aGlzfSk7XG4gIHJvbGVzQXNzZW1ibGVyKHRoaXMpO1xuICByZWRpcmVjdENhcHR1cmVyKHRoaXMpO1xuXG4gIGlmKHRoaXMuaHR0cC5nZXRUb2tlbigpKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW4oKTtcbiAgfVxuICBcbiAgcm9sZVNldHRlci5jYWxsKHRoaXMsICdub0F1dGgnLCBmYWxzZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvaW5pdGlhbGl6ZXIudHMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubGlua3NQdWJsaXNoZXIuYXNPYnNlcnZhYmxlKCk7ICBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saW5rcy1nZXR0ZXIvbGlua3MtZ2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCBhdXRvTG9nb3V0U2V0dGVyIGZyb20gJy4uL2F1dG8tbG9nb3V0LXNldHRlci9hdXRvLWxvZ291dC1zZXR0ZXInO1xuaW1wb3J0IHJvbGVTZXR0ZXIgICAgICAgZnJvbSAnLi4vcm9sZS1zZXR0ZXIvcm9sZS1zZXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjcmVkZW50aWFscykge1xuICB0aGlzLmh0dHAucG9zdCh0aGlzLmNvbmZpZ3MubG9naW5Sb3V0ZSwgY3JlZGVudGlhbHMpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICBsZXQgZmllbGRzID0gWydyb3V0ZXMnLCAndG9rZW4nXTtcbiAgICBsZXQge3JvdXRlcywgdG9rZW59ID0gXy5waWNrKGRhdGEsIGZpZWxkcyk7XG4gICAgdGhpcy5odHRwLnNldFRva2VuKHRva2VuKTtcbiAgICBkYXRhID0gXy5vbWl0KGRhdGEsIGZpZWxkcyk7XG4gICAgXy5leHRlbmQodGhpcywge2RhdGF9KTtcbiAgICByb2xlU2V0dGVyLmNhbGwodGhpcywgJ2F1dGgnLCB0cnVlLCByb3V0ZXMpO1xuICAgIGF1dG9Mb2dvdXRTZXR0ZXIoJ2FkZCcpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sb2dpbi1wcm9jZXNzb3IvbG9naW4tcHJvY2Vzc29yLnRzIiwiaW1wb3J0IGF1dG9Mb2dvdXRTZXR0ZXIgZnJvbSAnLi4vYXV0by1sb2dvdXQtc2V0dGVyL2F1dG8tbG9nb3V0LXNldHRlcic7XG5pbXBvcnQgcm9sZVNldHRlciAgICAgICBmcm9tICcuLi9yb2xlLXNldHRlci9yb2xlLXNldHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBhdXRvTG9nb3V0U2V0dGVyKCdyZW1vdmUnKTtcbiAgcm9sZVNldHRlci5jYWxsKHRoaXMsICdub0F1dGgnKTtcbiAgdGhpcy5odHRwLnJlbW92ZVRva2VuKCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9nb3V0LXByb2Nlc3Nvci9sb2dvdXQtcHJvY2Vzc29yLnRzIiwiaW1wb3J0IHtyb2xlc30gZnJvbSAnLi4vX2xpYi92YXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocm9sZU5hbWUpIHtcbiAgcmV0dXJuIHJvbGVzW3JvbGVOYW1lXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLWdldHRlci9yb2xlLWdldHRlci50cyIsImltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG4vKipcbiAqIEBsaWNlbnNlIEFuZ3VsYXIgdjQuMy41XG4gKiAoYykgMjAxMC0yMDE3IEdvb2dsZSwgSW5jLiBodHRwczovL2FuZ3VsYXIuaW8vXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuaW1wb3J0IHsgQXR0cmlidXRlLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdCwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIEl0ZXJhYmxlRGlmZmVycywgS2V5VmFsdWVEaWZmZXJzLCBMT0NBTEVfSUQsIE5nTW9kdWxlLCBOZ01vZHVsZVJlZiwgT3B0aW9uYWwsIFBpcGUsIFJlbmRlcmVyLCBUZW1wbGF0ZVJlZiwgVmVyc2lvbiwgVmlld0NvbnRhaW5lclJlZiwgV3JhcHBlZFZhbHVlLCBpc0Rldk1vZGUsIMm1aXNMaXN0TGlrZUl0ZXJhYmxlLCDJtWlzT2JzZXJ2YWJsZSwgybVpc1Byb21pc2UsIMm1c3RyaW5naWZ5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IGJ5IGFuIGFwcGxpY2F0aW9uIGRldmVsb3Blci4gSW5zdGVhZCwgdXNlXG4gKiB7XFxAbGluayBMb2NhdGlvbn0uXG4gKlxuICogYFBsYXRmb3JtTG9jYXRpb25gIGVuY2Fwc3VsYXRlcyBhbGwgY2FsbHMgdG8gRE9NIGFwaXMsIHdoaWNoIGFsbG93cyB0aGUgUm91dGVyIHRvIGJlIHBsYXRmb3JtXG4gKiBhZ25vc3RpYy5cbiAqIFRoaXMgbWVhbnMgdGhhdCB3ZSBjYW4gaGF2ZSBkaWZmZXJlbnQgaW1wbGVtZW50YXRpb24gb2YgYFBsYXRmb3JtTG9jYXRpb25gIGZvciB0aGUgZGlmZmVyZW50XG4gKiBwbGF0Zm9ybXMgdGhhdCBhbmd1bGFyIHN1cHBvcnRzLiBGb3IgZXhhbXBsZSwgYFxcQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcmAgcHJvdmlkZXMgYW5cbiAqIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHRvIHRoZSBicm93c2VyIGVudmlyb25tZW50LCB3aGlsZSBgXFxAYW5ndWxhci9wbGF0Zm9ybS13ZWJ3b3JrZXJgIHByb3ZpZGVzXG4gKiBvbmUgc3VpdGFibGUgZm9yIHVzZSB3aXRoIHdlYiB3b3JrZXJzLlxuICpcbiAqIFRoZSBgUGxhdGZvcm1Mb2NhdGlvbmAgY2xhc3MgaXMgdXNlZCBkaXJlY3RseSBieSBhbGwgaW1wbGVtZW50YXRpb25zIG9mIHtcXEBsaW5rIExvY2F0aW9uU3RyYXRlZ3l9XG4gKiB3aGVuIHRoZXkgbmVlZCB0byBpbnRlcmFjdCB3aXRoIHRoZSBET00gYXBpcyBsaWtlIHB1c2hTdGF0ZSwgcG9wU3RhdGUsIGV0Yy4uLlxuICpcbiAqIHtcXEBsaW5rIExvY2F0aW9uU3RyYXRlZ3l9IGluIHR1cm4gaXMgdXNlZCBieSB0aGUge1xcQGxpbmsgTG9jYXRpb259IHNlcnZpY2Ugd2hpY2ggaXMgdXNlZCBkaXJlY3RseVxuICogYnkgdGhlIHtcXEBsaW5rIFJvdXRlcn0gaW4gb3JkZXIgdG8gbmF2aWdhdGUgYmV0d2VlbiByb3V0ZXMuIFNpbmNlIGFsbCBpbnRlcmFjdGlvbnMgYmV0d2VlbiB7XFxAbGlua1xuICogUm91dGVyfSAvXG4gKiB7XFxAbGluayBMb2NhdGlvbn0gLyB7XFxAbGluayBMb2NhdGlvblN0cmF0ZWd5fSBhbmQgRE9NIGFwaXMgZmxvdyB0aHJvdWdoIHRoZSBgUGxhdGZvcm1Mb2NhdGlvbmBcbiAqIGNsYXNzIHRoZXkgYXJlIGFsbCBwbGF0Zm9ybSBpbmRlcGVuZGVudC5cbiAqXG4gKiBcXEBzdGFibGVcbiAqIEBhYnN0cmFjdFxuICovXG52YXIgUGxhdGZvcm1Mb2NhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGxhdGZvcm1Mb2NhdGlvbigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQbGF0Zm9ybUxvY2F0aW9uLnByb3RvdHlwZS5nZXRCYXNlSHJlZkZyb21ET00gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHs/fSBmblxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGxhdGZvcm1Mb2NhdGlvbi5wcm90b3R5cGUub25Qb3BTdGF0ZSA9IGZ1bmN0aW9uIChmbikgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gZm5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBsYXRmb3JtTG9jYXRpb24ucHJvdG90eXBlLm9uSGFzaENoYW5nZSA9IGZ1bmN0aW9uIChmbikgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGxhdGZvcm1Mb2NhdGlvbi5wcm90b3R5cGUucGF0aG5hbWUgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQbGF0Zm9ybUxvY2F0aW9uLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQbGF0Zm9ybUxvY2F0aW9uLnByb3RvdHlwZS5oYXNoID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcbiAgICAgKiBAcGFyYW0gez99IHRpdGxlXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBsYXRmb3JtTG9jYXRpb24ucHJvdG90eXBlLnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgdGl0bGUsIHVybCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcbiAgICAgKiBAcGFyYW0gez99IHRpdGxlXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBsYXRmb3JtTG9jYXRpb24ucHJvdG90eXBlLnB1c2hTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgdGl0bGUsIHVybCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGxhdGZvcm1Mb2NhdGlvbi5wcm90b3R5cGUuZm9yd2FyZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBsYXRmb3JtTG9jYXRpb24ucHJvdG90eXBlLmJhY2sgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIFBsYXRmb3JtTG9jYXRpb247XG59KCkpO1xuLyoqXG4gKiBcXEB3aGF0SXREb2VzIGluZGljYXRlcyB3aGVuIGEgbG9jYXRpb24gaXMgaW5pdGlhbGl6ZWRcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgTE9DQVRJT05fSU5JVElBTElaRUQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0xvY2F0aW9uIEluaXRpYWxpemVkJyk7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIGBMb2NhdGlvblN0cmF0ZWd5YCBpcyByZXNwb25zaWJsZSBmb3IgcmVwcmVzZW50aW5nIGFuZCByZWFkaW5nIHJvdXRlIHN0YXRlXG4gKiBmcm9tIHRoZSBicm93c2VyJ3MgVVJMLiBBbmd1bGFyIHByb3ZpZGVzIHR3byBzdHJhdGVnaWVzOlxuICoge1xcQGxpbmsgSGFzaExvY2F0aW9uU3RyYXRlZ3l9IGFuZCB7XFxAbGluayBQYXRoTG9jYXRpb25TdHJhdGVneX0uXG4gKlxuICogVGhpcyBpcyB1c2VkIHVuZGVyIHRoZSBob29kIG9mIHRoZSB7XFxAbGluayBMb2NhdGlvbn0gc2VydmljZS5cbiAqXG4gKiBBcHBsaWNhdGlvbnMgc2hvdWxkIHVzZSB0aGUge1xcQGxpbmsgUm91dGVyfSBvciB7XFxAbGluayBMb2NhdGlvbn0gc2VydmljZXMgdG9cbiAqIGludGVyYWN0IHdpdGggYXBwbGljYXRpb24gcm91dGUgc3RhdGUuXG4gKlxuICogRm9yIGluc3RhbmNlLCB7XFxAbGluayBIYXNoTG9jYXRpb25TdHJhdGVneX0gcHJvZHVjZXMgVVJMcyBsaWtlXG4gKiBgaHR0cDovL2V4YW1wbGUuY29tIy9mb29gLCBhbmQge1xcQGxpbmsgUGF0aExvY2F0aW9uU3RyYXRlZ3l9IHByb2R1Y2VzXG4gKiBgaHR0cDovL2V4YW1wbGUuY29tL2Zvb2AgYXMgYW4gZXF1aXZhbGVudCBVUkwuXG4gKlxuICogU2VlIHRoZXNlIHR3byBjbGFzc2VzIGZvciBtb3JlLlxuICpcbiAqIFxcQHN0YWJsZVxuICogQGFic3RyYWN0XG4gKi9cbnZhciBMb2NhdGlvblN0cmF0ZWd5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2NhdGlvblN0cmF0ZWd5KCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gez89fSBpbmNsdWRlSGFzaFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUucGF0aCA9IGZ1bmN0aW9uIChpbmNsdWRlSGFzaCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gaW50ZXJuYWxcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLnByZXBhcmVFeHRlcm5hbFVybCA9IGZ1bmN0aW9uIChpbnRlcm5hbCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcbiAgICAgKiBAcGFyYW0gez99IHRpdGxlXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcGFyYW0gez99IHF1ZXJ5UGFyYW1zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5wdXNoU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHRpdGxlLCB1cmwsIHF1ZXJ5UGFyYW1zKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxuICAgICAqIEBwYXJhbSB7P30gdGl0bGVcbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7P30gcXVlcnlQYXJhbXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgdGl0bGUsIHVybCwgcXVlcnlQYXJhbXMpIHsgfTtcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmZvcndhcmQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB7P30gZm5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLm9uUG9wU3RhdGUgPSBmdW5jdGlvbiAoZm4pIHsgfTtcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmdldEJhc2VIcmVmID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIHJldHVybiBMb2NhdGlvblN0cmF0ZWd5O1xufSgpKTtcbi8qKlxuICogVGhlIGBBUFBfQkFTRV9IUkVGYCB0b2tlbiByZXByZXNlbnRzIHRoZSBiYXNlIGhyZWYgdG8gYmUgdXNlZCB3aXRoIHRoZVxuICoge1xcQGxpbmsgUGF0aExvY2F0aW9uU3RyYXRlZ3l9LlxuICpcbiAqIElmIHlvdSdyZSB1c2luZyB7XFxAbGluayBQYXRoTG9jYXRpb25TdHJhdGVneX0sIHlvdSBtdXN0IHByb3ZpZGUgYSBwcm92aWRlciB0byBhIHN0cmluZ1xuICogcmVwcmVzZW50aW5nIHRoZSBVUkwgcHJlZml4IHRoYXQgc2hvdWxkIGJlIHByZXNlcnZlZCB3aGVuIGdlbmVyYXRpbmcgYW5kIHJlY29nbml6aW5nXG4gKiBVUkxzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnQsIE5nTW9kdWxlfSBmcm9tICdcXEBhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdcXEBhbmd1bGFyL2NvbW1vbic7XG4gKlxuICogXFxATmdNb2R1bGUoe1xuICogICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQVBQX0JBU0VfSFJFRiwgdXNlVmFsdWU6ICcvbXkvYXBwJ31dXG4gKiB9KVxuICogY2xhc3MgQXBwTW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIEFQUF9CQVNFX0hSRUYgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2FwcEJhc2VIcmVmJyk7XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFxcQHdoYXRJdERvZXMgYExvY2F0aW9uYCBpcyBhIHNlcnZpY2UgdGhhdCBhcHBsaWNhdGlvbnMgY2FuIHVzZSB0byBpbnRlcmFjdCB3aXRoIGEgYnJvd3NlcidzIFVSTC5cbiAqIFxcQGRlc2NyaXB0aW9uXG4gKiBEZXBlbmRpbmcgb24gd2hpY2gge1xcQGxpbmsgTG9jYXRpb25TdHJhdGVneX0gaXMgdXNlZCwgYExvY2F0aW9uYCB3aWxsIGVpdGhlciBwZXJzaXN0XG4gKiB0byB0aGUgVVJMJ3MgcGF0aCBvciB0aGUgVVJMJ3MgaGFzaCBzZWdtZW50LlxuICpcbiAqIE5vdGU6IGl0J3MgYmV0dGVyIHRvIHVzZSB7XFxAbGluayBSb3V0ZXIjbmF2aWdhdGV9IHNlcnZpY2UgdG8gdHJpZ2dlciByb3V0ZSBjaGFuZ2VzLiBVc2VcbiAqIGBMb2NhdGlvbmAgb25seSBpZiB5b3UgbmVlZCB0byBpbnRlcmFjdCB3aXRoIG9yIGNyZWF0ZSBub3JtYWxpemVkIFVSTHMgb3V0c2lkZSBvZlxuICogcm91dGluZy5cbiAqXG4gKiBgTG9jYXRpb25gIGlzIHJlc3BvbnNpYmxlIGZvciBub3JtYWxpemluZyB0aGUgVVJMIGFnYWluc3QgdGhlIGFwcGxpY2F0aW9uJ3MgYmFzZSBocmVmLlxuICogQSBub3JtYWxpemVkIFVSTCBpcyBhYnNvbHV0ZSBmcm9tIHRoZSBVUkwgaG9zdCwgaW5jbHVkZXMgdGhlIGFwcGxpY2F0aW9uJ3MgYmFzZSBocmVmLCBhbmQgaGFzIG5vXG4gKiB0cmFpbGluZyBzbGFzaDpcbiAqIC0gYC9teS9hcHAvdXNlci8xMjNgIGlzIG5vcm1hbGl6ZWRcbiAqIC0gYG15L2FwcC91c2VyLzEyM2AgKippcyBub3QqKiBub3JtYWxpemVkXG4gKiAtIGAvbXkvYXBwL3VzZXIvMTIzL2AgKippcyBub3QqKiBub3JtYWxpemVkXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIHtcXEBleGFtcGxlIGNvbW1vbi9sb2NhdGlvbi90cy9wYXRoX2xvY2F0aW9uX2NvbXBvbmVudC50cyByZWdpb249J0xvY2F0aW9uQ29tcG9uZW50J31cbiAqIFxcQHN0YWJsZVxuICovXG52YXIgTG9jYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gcGxhdGZvcm1TdHJhdGVneVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExvY2F0aW9uKHBsYXRmb3JtU3RyYXRlZ3kpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFxcQGludGVybmFsXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLl9wbGF0Zm9ybVN0cmF0ZWd5ID0gcGxhdGZvcm1TdHJhdGVneTtcbiAgICAgICAgdmFyIGJyb3dzZXJCYXNlSHJlZiA9IHRoaXMuX3BsYXRmb3JtU3RyYXRlZ3kuZ2V0QmFzZUhyZWYoKTtcbiAgICAgICAgdGhpcy5fYmFzZUhyZWYgPSBMb2NhdGlvbi5zdHJpcFRyYWlsaW5nU2xhc2goX3N0cmlwSW5kZXhIdG1sKGJyb3dzZXJCYXNlSHJlZikpO1xuICAgICAgICB0aGlzLl9wbGF0Zm9ybVN0cmF0ZWd5Lm9uUG9wU3RhdGUoZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBfdGhpcy5fc3ViamVjdC5lbWl0KHtcbiAgICAgICAgICAgICAgICAndXJsJzogX3RoaXMucGF0aCh0cnVlKSxcbiAgICAgICAgICAgICAgICAncG9wJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAndHlwZSc6IGV2LnR5cGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Pz19IGluY2x1ZGVIYXNoXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvbi5wcm90b3R5cGUucGF0aCA9IGZ1bmN0aW9uIChpbmNsdWRlSGFzaCkge1xuICAgICAgICBpZiAoaW5jbHVkZUhhc2ggPT09IHZvaWQgMCkgeyBpbmNsdWRlSGFzaCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZSh0aGlzLl9wbGF0Zm9ybVN0cmF0ZWd5LnBhdGgoaW5jbHVkZUhhc2gpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIHBhdGggYW5kIGNvbXBhcmVzIHRvIHRoZSBjdXJyZW50IG5vcm1hbGl6ZWQgcGF0aC5cbiAgICAgKiBAcGFyYW0gez99IHBhdGhcbiAgICAgKiBAcGFyYW0gez89fSBxdWVyeVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG9jYXRpb24ucHJvdG90eXBlLmlzQ3VycmVudFBhdGhFcXVhbFRvID0gZnVuY3Rpb24gKHBhdGgsIHF1ZXJ5KSB7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gdm9pZCAwKSB7IHF1ZXJ5ID0gJyc7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aCgpID09IHRoaXMubm9ybWFsaXplKHBhdGggKyBMb2NhdGlvbi5ub3JtYWxpemVRdWVyeVBhcmFtcyhxdWVyeSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgVVJMLCByZXR1cm5zIHRoZSBub3JtYWxpemVkIFVSTCBwYXRoIHdpdGhvdXQgbGVhZGluZyBvclxuICAgICAqIHRyYWlsaW5nIHNsYXNoZXMuXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiBMb2NhdGlvbi5zdHJpcFRyYWlsaW5nU2xhc2goX3N0cmlwQmFzZUhyZWYodGhpcy5fYmFzZUhyZWYsIF9zdHJpcEluZGV4SHRtbCh1cmwpKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBVUkwsIHJldHVybnMgdGhlIHBsYXRmb3JtLXNwZWNpZmljIGV4dGVybmFsIFVSTCBwYXRoLlxuICAgICAqIElmIHRoZSBnaXZlbiBVUkwgZG9lc24ndCBiZWdpbiB3aXRoIGEgbGVhZGluZyBzbGFzaCAoYCcvJ2ApLCB0aGlzIG1ldGhvZCBhZGRzIG9uZVxuICAgICAqIGJlZm9yZSBub3JtYWxpemluZy4gVGhpcyBtZXRob2Qgd2lsbCBhbHNvIGFkZCBhIGhhc2ggaWYgYEhhc2hMb2NhdGlvblN0cmF0ZWd5YCBpc1xuICAgICAqIHVzZWQsIG9yIHRoZSBgQVBQX0JBU0VfSFJFRmAgaWYgdGhlIGBQYXRoTG9jYXRpb25TdHJhdGVneWAgaXMgaW4gdXNlLlxuICAgICAqIEBwYXJhbSB7P30gdXJsXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvbi5wcm90b3R5cGUucHJlcGFyZUV4dGVybmFsVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBpZiAodXJsICYmIHVybFswXSAhPT0gJy8nKSB7XG4gICAgICAgICAgICB1cmwgPSAnLycgKyB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXRmb3JtU3RyYXRlZ3kucHJlcGFyZUV4dGVybmFsVXJsKHVybCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBicm93c2VycyBVUkwgdG8gdGhlIG5vcm1hbGl6ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gVVJMLCBhbmQgcHVzaGVzIGFcbiAgICAgKiBuZXcgaXRlbSBvbnRvIHRoZSBwbGF0Zm9ybSdzIGhpc3RvcnkuXG4gICAgICogQHBhcmFtIHs/fSBwYXRoXG4gICAgICogQHBhcmFtIHs/PX0gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uLnByb3RvdHlwZS5nbyA9IGZ1bmN0aW9uIChwYXRoLCBxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkgPT09IHZvaWQgMCkgeyBxdWVyeSA9ICcnOyB9XG4gICAgICAgIHRoaXMuX3BsYXRmb3JtU3RyYXRlZ3kucHVzaFN0YXRlKG51bGwsICcnLCBwYXRoLCBxdWVyeSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBicm93c2VycyBVUkwgdG8gdGhlIG5vcm1hbGl6ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gVVJMLCBhbmQgcmVwbGFjZXNcbiAgICAgKiB0aGUgdG9wIGl0ZW0gb24gdGhlIHBsYXRmb3JtJ3MgaGlzdG9yeSBzdGFjay5cbiAgICAgKiBAcGFyYW0gez99IHBhdGhcbiAgICAgKiBAcGFyYW0gez89fSBxdWVyeVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG9jYXRpb24ucHJvdG90eXBlLnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uIChwYXRoLCBxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkgPT09IHZvaWQgMCkgeyBxdWVyeSA9ICcnOyB9XG4gICAgICAgIHRoaXMuX3BsYXRmb3JtU3RyYXRlZ3kucmVwbGFjZVN0YXRlKG51bGwsICcnLCBwYXRoLCBxdWVyeSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZXMgZm9yd2FyZCBpbiB0aGUgcGxhdGZvcm0ncyBoaXN0b3J5LlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG9jYXRpb24ucHJvdG90eXBlLmZvcndhcmQgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX3BsYXRmb3JtU3RyYXRlZ3kuZm9yd2FyZCgpOyB9O1xuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlcyBiYWNrIGluIHRoZSBwbGF0Zm9ybSdzIGhpc3RvcnkuXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvbi5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fcGxhdGZvcm1TdHJhdGVneS5iYWNrKCk7IH07XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIHRoZSBwbGF0Zm9ybSdzIGBwb3BTdGF0ZWAgZXZlbnRzLlxuICAgICAqIEBwYXJhbSB7P30gb25OZXh0XG4gICAgICogQHBhcmFtIHs/PX0gb25UaHJvd1xuICAgICAqIEBwYXJhbSB7Pz19IG9uUmV0dXJuXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBMb2NhdGlvbi5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9uTmV4dCwgb25UaHJvdywgb25SZXR1cm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Quc3Vic2NyaWJlKHsgbmV4dDogb25OZXh0LCBlcnJvcjogb25UaHJvdywgY29tcGxldGU6IG9uUmV0dXJuIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBzdHJpbmcgb2YgdXJsIHBhcmFtZXRlcnMsIHByZXBlbmQgd2l0aCAnPycgaWYgbmVlZGVkLCBvdGhlcndpc2UgcmV0dXJuIHBhcmFtZXRlcnMgYXNcbiAgICAgKiBpcy5cbiAgICAgKiBAcGFyYW0gez99IHBhcmFtc1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG9jYXRpb24ubm9ybWFsaXplUXVlcnlQYXJhbXMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMgJiYgcGFyYW1zWzBdICE9PSAnPycgPyAnPycgKyBwYXJhbXMgOiBwYXJhbXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHaXZlbiAyIHBhcnRzIG9mIGEgdXJsLCBqb2luIHRoZW0gd2l0aCBhIHNsYXNoIGlmIG5lZWRlZC5cbiAgICAgKiBAcGFyYW0gez99IHN0YXJ0XG4gICAgICogQHBhcmFtIHs/fSBlbmRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uLmpvaW5XaXRoU2xhc2ggPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoc3RhcnQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHNsYXNoZXMgPSAwO1xuICAgICAgICBpZiAoc3RhcnQuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgc2xhc2hlcysrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmQuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBzbGFzaGVzKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsYXNoZXMgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgZW5kLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xhc2hlcyA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnQgKyBlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgJy8nICsgZW5kO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSWYgdXJsIGhhcyBhIHRyYWlsaW5nIHNsYXNoLCByZW1vdmUgaXQsIG90aGVyd2lzZSByZXR1cm4gdXJsIGFzIGlzLiBUaGlzXG4gICAgICogbWV0aG9kIGxvb2tzIGZvciB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGVpdGhlciAjLCA/LCBvciB0aGUgZW5kIG9mIHRoZVxuICAgICAqIGxpbmUgYXMgYC9gIGNoYXJhY3RlcnMgYWZ0ZXIgYW55IG9mIHRoZXNlIHNob3VsZCBub3QgYmUgcmVwbGFjZWQuXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExvY2F0aW9uLnN0cmlwVHJhaWxpbmdTbGFzaCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbWF0Y2ggPSB1cmwubWF0Y2goLyN8XFw/fCQvKTtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcGF0aEVuZElkeCA9IG1hdGNoICYmIG1hdGNoLmluZGV4IHx8IHVybC5sZW5ndGg7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGRyb3BwZWRTbGFzaElkeCA9IHBhdGhFbmRJZHggLSAodXJsW3BhdGhFbmRJZHggLSAxXSA9PT0gJy8nID8gMSA6IDApO1xuICAgICAgICByZXR1cm4gdXJsLnNsaWNlKDAsIGRyb3BwZWRTbGFzaElkeCkgKyB1cmwuc2xpY2UocGF0aEVuZElkeCk7XG4gICAgfTtcbiAgICByZXR1cm4gTG9jYXRpb247XG59KCkpO1xuTG9jYXRpb24uZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkxvY2F0aW9uLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogTG9jYXRpb25TdHJhdGVneSwgfSxcbl07IH07XG4vKipcbiAqIEBwYXJhbSB7P30gYmFzZUhyZWZcbiAqIEBwYXJhbSB7P30gdXJsXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBfc3RyaXBCYXNlSHJlZihiYXNlSHJlZiwgdXJsKSB7XG4gICAgcmV0dXJuIGJhc2VIcmVmICYmIHVybC5zdGFydHNXaXRoKGJhc2VIcmVmKSA/IHVybC5zdWJzdHJpbmcoYmFzZUhyZWYubGVuZ3RoKSA6IHVybDtcbn1cbi8qKlxuICogQHBhcmFtIHs/fSB1cmxcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIF9zdHJpcEluZGV4SHRtbCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcL2luZGV4Lmh0bWwkLywgJycpO1xufVxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBcXEB3aGF0SXREb2VzIFVzZSBVUkwgaGFzaCBmb3Igc3RvcmluZyBhcHBsaWNhdGlvbiBsb2NhdGlvbiBkYXRhLlxuICogXFxAZGVzY3JpcHRpb25cbiAqIGBIYXNoTG9jYXRpb25TdHJhdGVneWAgaXMgYSB7XFxAbGluayBMb2NhdGlvblN0cmF0ZWd5fSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGVcbiAqIHtcXEBsaW5rIExvY2F0aW9ufSBzZXJ2aWNlIHRvIHJlcHJlc2VudCBpdHMgc3RhdGUgaW4gdGhlXG4gKiBbaGFzaCBmcmFnbWVudF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW5pZm9ybV9SZXNvdXJjZV9Mb2NhdG9yI1N5bnRheClcbiAqIG9mIHRoZSBicm93c2VyJ3MgVVJMLlxuICpcbiAqIEZvciBpbnN0YW5jZSwgaWYgeW91IGNhbGwgYGxvY2F0aW9uLmdvKCcvZm9vJylgLCB0aGUgYnJvd3NlcidzIFVSTCB3aWxsIGJlY29tZVxuICogYGV4YW1wbGUuY29tIy9mb29gLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL2xvY2F0aW9uL3RzL2hhc2hfbG9jYXRpb25fY29tcG9uZW50LnRzIHJlZ2lvbj0nTG9jYXRpb25Db21wb25lbnQnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgSGFzaExvY2F0aW9uU3RyYXRlZ3kgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEhhc2hMb2NhdGlvblN0cmF0ZWd5LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX3BsYXRmb3JtTG9jYXRpb25cbiAgICAgKiBAcGFyYW0gez89fSBfYmFzZUhyZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIYXNoTG9jYXRpb25TdHJhdGVneShfcGxhdGZvcm1Mb2NhdGlvbiwgX2Jhc2VIcmVmKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9wbGF0Zm9ybUxvY2F0aW9uID0gX3BsYXRmb3JtTG9jYXRpb247XG4gICAgICAgIF90aGlzLl9iYXNlSHJlZiA9ICcnO1xuICAgICAgICBpZiAoX2Jhc2VIcmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgIF90aGlzLl9iYXNlSHJlZiA9IF9iYXNlSHJlZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZm5cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEhhc2hMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5vblBvcFN0YXRlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25Qb3BTdGF0ZShmbik7XG4gICAgICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25IYXNoQ2hhbmdlKGZuKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSGFzaExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLmdldEJhc2VIcmVmID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fYmFzZUhyZWY7IH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/PX0gaW5jbHVkZUhhc2hcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEhhc2hMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5wYXRoID0gZnVuY3Rpb24gKGluY2x1ZGVIYXNoKSB7XG4gICAgICAgIGlmIChpbmNsdWRlSGFzaCA9PT0gdm9pZCAwKSB7IGluY2x1ZGVIYXNoID0gZmFsc2U7IH1cbiAgICAgICAgLy8gdGhlIGhhc2ggdmFsdWUgaXMgYWx3YXlzIHByZWZpeGVkIHdpdGggYSBgI2BcbiAgICAgICAgLy8gYW5kIGlmIGl0IGlzIGVtcHR5IHRoZW4gaXQgd2lsbCBzdGF5IGVtcHR5XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHBhdGggPSB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmhhc2g7XG4gICAgICAgIGlmIChwYXRoID09IG51bGwpXG4gICAgICAgICAgICBwYXRoID0gJyMnO1xuICAgICAgICByZXR1cm4gcGF0aC5sZW5ndGggPiAwID8gcGF0aC5zdWJzdHJpbmcoMSkgOiBwYXRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBpbnRlcm5hbFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgSGFzaExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLnByZXBhcmVFeHRlcm5hbFVybCA9IGZ1bmN0aW9uIChpbnRlcm5hbCkge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB1cmwgPSBMb2NhdGlvbi5qb2luV2l0aFNsYXNoKHRoaXMuX2Jhc2VIcmVmLCBpbnRlcm5hbCk7XG4gICAgICAgIHJldHVybiB1cmwubGVuZ3RoID4gMCA/ICgnIycgKyB1cmwpIDogdXJsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxuICAgICAqIEBwYXJhbSB7P30gdGl0bGVcbiAgICAgKiBAcGFyYW0gez99IHBhdGhcbiAgICAgKiBAcGFyYW0gez99IHF1ZXJ5UGFyYW1zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIYXNoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUucHVzaFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCB0aXRsZSwgcGF0aCwgcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwocGF0aCArIExvY2F0aW9uLm5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSk7XG4gICAgICAgIGlmICh1cmwubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHVybCA9IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5wdXNoU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxuICAgICAqIEBwYXJhbSB7P30gdGl0bGVcbiAgICAgKiBAcGFyYW0gez99IHBhdGhcbiAgICAgKiBAcGFyYW0gez99IHF1ZXJ5UGFyYW1zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIYXNoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUucmVwbGFjZVN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCB0aXRsZSwgcGF0aCwgcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwocGF0aCArIExvY2F0aW9uLm5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSk7XG4gICAgICAgIGlmICh1cmwubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHVybCA9IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIYXNoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUuZm9yd2FyZCA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkKCk7IH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBIYXNoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5iYWNrKCk7IH07XG4gICAgcmV0dXJuIEhhc2hMb2NhdGlvblN0cmF0ZWd5O1xufShMb2NhdGlvblN0cmF0ZWd5KSk7XG5IYXNoTG9jYXRpb25TdHJhdGVneS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuSGFzaExvY2F0aW9uU3RyYXRlZ3kuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBQbGF0Zm9ybUxvY2F0aW9uLCB9LFxuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBPcHRpb25hbCB9LCB7IHR5cGU6IEluamVjdCwgYXJnczogW0FQUF9CQVNFX0hSRUYsXSB9LF0gfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFxcQHdoYXRJdERvZXMgVXNlIFVSTCBmb3Igc3RvcmluZyBhcHBsaWNhdGlvbiBsb2NhdGlvbiBkYXRhLlxuICogXFxAZGVzY3JpcHRpb25cbiAqIGBQYXRoTG9jYXRpb25TdHJhdGVneWAgaXMgYSB7XFxAbGluayBMb2NhdGlvblN0cmF0ZWd5fSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGVcbiAqIHtcXEBsaW5rIExvY2F0aW9ufSBzZXJ2aWNlIHRvIHJlcHJlc2VudCBpdHMgc3RhdGUgaW4gdGhlXG4gKiBbcGF0aF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW5pZm9ybV9SZXNvdXJjZV9Mb2NhdG9yI1N5bnRheCkgb2YgdGhlXG4gKiBicm93c2VyJ3MgVVJMLlxuICpcbiAqIElmIHlvdSdyZSB1c2luZyBgUGF0aExvY2F0aW9uU3RyYXRlZ3lgLCB5b3UgbXVzdCBwcm92aWRlIGEge1xcQGxpbmsgQVBQX0JBU0VfSFJFRn1cbiAqIG9yIGFkZCBhIGJhc2UgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQuIFRoaXMgVVJMIHByZWZpeCB0aGF0IHdpbGwgYmUgcHJlc2VydmVkXG4gKiB3aGVuIGdlbmVyYXRpbmcgYW5kIHJlY29nbml6aW5nIFVSTHMuXG4gKlxuICogRm9yIGluc3RhbmNlLCBpZiB5b3UgcHJvdmlkZSBhbiBgQVBQX0JBU0VfSFJFRmAgb2YgYCcvbXkvYXBwJ2AgYW5kIGNhbGxcbiAqIGBsb2NhdGlvbi5nbygnL2ZvbycpYCwgdGhlIGJyb3dzZXIncyBVUkwgd2lsbCBiZWNvbWVcbiAqIGBleGFtcGxlLmNvbS9teS9hcHAvZm9vYC5cbiAqXG4gKiBTaW1pbGFybHksIGlmIHlvdSBhZGQgYDxiYXNlIGhyZWY9Jy9teS9hcHAnLz5gIHRvIHRoZSBkb2N1bWVudCBhbmQgY2FsbFxuICogYGxvY2F0aW9uLmdvKCcvZm9vJylgLCB0aGUgYnJvd3NlcidzIFVSTCB3aWxsIGJlY29tZVxuICogYGV4YW1wbGUuY29tL215L2FwcC9mb29gLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL2xvY2F0aW9uL3RzL3BhdGhfbG9jYXRpb25fY29tcG9uZW50LnRzIHJlZ2lvbj0nTG9jYXRpb25Db21wb25lbnQnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgUGF0aExvY2F0aW9uU3RyYXRlZ3kgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFBhdGhMb2NhdGlvblN0cmF0ZWd5LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX3BsYXRmb3JtTG9jYXRpb25cbiAgICAgKiBAcGFyYW0gez89fSBocmVmXG4gICAgICovXG4gICAgZnVuY3Rpb24gUGF0aExvY2F0aW9uU3RyYXRlZ3koX3BsYXRmb3JtTG9jYXRpb24sIGhyZWYpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3BsYXRmb3JtTG9jYXRpb24gPSBfcGxhdGZvcm1Mb2NhdGlvbjtcbiAgICAgICAgaWYgKGhyZWYgPT0gbnVsbCkge1xuICAgICAgICAgICAgaHJlZiA9IF90aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmdldEJhc2VIcmVmRnJvbURPTSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChocmVmID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGJhc2UgaHJlZiBzZXQuIFBsZWFzZSBwcm92aWRlIGEgdmFsdWUgZm9yIHRoZSBBUFBfQkFTRV9IUkVGIHRva2VuIG9yIGFkZCBhIGJhc2UgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLl9iYXNlSHJlZiA9IGhyZWY7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBmblxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGF0aExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLm9uUG9wU3RhdGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vblBvcFN0YXRlKGZuKTtcbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5vbkhhc2hDaGFuZ2UoZm4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQYXRoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUuZ2V0QmFzZUhyZWYgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9iYXNlSHJlZjsgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGludGVybmFsXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQYXRoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUucHJlcGFyZUV4dGVybmFsVXJsID0gZnVuY3Rpb24gKGludGVybmFsKSB7XG4gICAgICAgIHJldHVybiBMb2NhdGlvbi5qb2luV2l0aFNsYXNoKHRoaXMuX2Jhc2VIcmVmLCBpbnRlcm5hbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez89fSBpbmNsdWRlSGFzaFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGF0aExvY2F0aW9uU3RyYXRlZ3kucHJvdG90eXBlLnBhdGggPSBmdW5jdGlvbiAoaW5jbHVkZUhhc2gpIHtcbiAgICAgICAgaWYgKGluY2x1ZGVIYXNoID09PSB2b2lkIDApIHsgaW5jbHVkZUhhc2ggPSBmYWxzZTsgfVxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBwYXRobmFtZSA9IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgTG9jYXRpb24ubm9ybWFsaXplUXVlcnlQYXJhbXModGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBoYXNoID0gdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5oYXNoO1xuICAgICAgICByZXR1cm4gaGFzaCAmJiBpbmNsdWRlSGFzaCA/IFwiXCIgKyBwYXRobmFtZSArIGhhc2ggOiBwYXRobmFtZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcbiAgICAgKiBAcGFyYW0gez99IHRpdGxlXG4gICAgICogQHBhcmFtIHs/fSB1cmxcbiAgICAgKiBAcGFyYW0gez99IHF1ZXJ5UGFyYW1zXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQYXRoTG9jYXRpb25TdHJhdGVneS5wcm90b3R5cGUucHVzaFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCB0aXRsZSwgdXJsLCBxdWVyeVBhcmFtcykge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBleHRlcm5hbFVybCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHVybCArIExvY2F0aW9uLm5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSk7XG4gICAgICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgZXh0ZXJuYWxVcmwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxuICAgICAqIEBwYXJhbSB7P30gdGl0bGVcbiAgICAgKiBAcGFyYW0gez99IHVybFxuICAgICAqIEBwYXJhbSB7P30gcXVlcnlQYXJhbXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBhdGhMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHRpdGxlLCB1cmwsIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGV4dGVybmFsVXJsID0gdGhpcy5wcmVwYXJlRXh0ZXJuYWxVcmwodXJsICsgTG9jYXRpb24ubm9ybWFsaXplUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpKTtcbiAgICAgICAgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCBleHRlcm5hbFVybCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBhdGhMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5mb3J3YXJkID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmZvcndhcmQoKTsgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBhdGhMb2NhdGlvblN0cmF0ZWd5LnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLmJhY2soKTsgfTtcbiAgICByZXR1cm4gUGF0aExvY2F0aW9uU3RyYXRlZ3k7XG59KExvY2F0aW9uU3RyYXRlZ3kpKTtcblBhdGhMb2NhdGlvblN0cmF0ZWd5LmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5QYXRoTG9jYXRpb25TdHJhdGVneS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFBsYXRmb3JtTG9jYXRpb24sIH0sXG4gICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IE9wdGlvbmFsIH0sIHsgdHlwZTogSW5qZWN0LCBhcmdzOiBbQVBQX0JBU0VfSFJFRixdIH0sXSB9LFxuXTsgfTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAYWJzdHJhY3RcbiAqL1xudmFyIE5nTG9jYWxpemF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZ0xvY2FsaXphdGlvbigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdMb2NhbGl6YXRpb24ucHJvdG90eXBlLmdldFBsdXJhbENhdGVnb3J5ID0gZnVuY3Rpb24gKHZhbHVlKSB7IH07XG4gICAgcmV0dXJuIE5nTG9jYWxpemF0aW9uO1xufSgpKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcGx1cmFsIGNhdGVnb3J5IGZvciBhIGdpdmVuIHZhbHVlLlxuICogLSBcIj12YWx1ZVwiIHdoZW4gdGhlIGNhc2UgZXhpc3RzLFxuICogLSB0aGUgcGx1cmFsIGNhdGVnb3J5IG90aGVyd2lzZVxuICpcbiAqIFxcQGludGVybmFsXG4gKiBAcGFyYW0gez99IHZhbHVlXG4gKiBAcGFyYW0gez99IGNhc2VzXG4gKiBAcGFyYW0gez99IG5nTG9jYWxpemF0aW9uXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBnZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZSwgY2FzZXMsIG5nTG9jYWxpemF0aW9uKSB7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8ga2V5ID0gXCI9XCIgKyB2YWx1ZTtcbiAgICBpZiAoY2FzZXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAga2V5ID0gbmdMb2NhbGl6YXRpb24uZ2V0UGx1cmFsQ2F0ZWdvcnkodmFsdWUpO1xuICAgIGlmIChjYXNlcy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBpZiAoY2FzZXMuaW5kZXhPZignb3RoZXInKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiAnb3RoZXInO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBwbHVyYWwgbWVzc2FnZSBmb3VuZCBmb3IgdmFsdWUgXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIik7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHBsdXJhbCBjYXNlIGJhc2VkIG9uIHRoZSBsb2NhbGVcbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIE5nTG9jYWxlTG9jYWxpemF0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhOZ0xvY2FsZUxvY2FsaXphdGlvbiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGxvY2FsZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE5nTG9jYWxlTG9jYWxpemF0aW9uKGxvY2FsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdMb2NhbGVMb2NhbGl6YXRpb24ucHJvdG90eXBlLmdldFBsdXJhbENhdGVnb3J5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHBsdXJhbCA9IGdldFBsdXJhbENhc2UodGhpcy5sb2NhbGUsIHZhbHVlKTtcbiAgICAgICAgc3dpdGNoIChwbHVyYWwpIHtcbiAgICAgICAgICAgIGNhc2UgUGx1cmFsLlplcm86XG4gICAgICAgICAgICAgICAgcmV0dXJuICd6ZXJvJztcbiAgICAgICAgICAgIGNhc2UgUGx1cmFsLk9uZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ29uZSc7XG4gICAgICAgICAgICBjYXNlIFBsdXJhbC5Ud286XG4gICAgICAgICAgICAgICAgcmV0dXJuICd0d28nO1xuICAgICAgICAgICAgY2FzZSBQbHVyYWwuRmV3OlxuICAgICAgICAgICAgICAgIHJldHVybiAnZmV3JztcbiAgICAgICAgICAgIGNhc2UgUGx1cmFsLk1hbnk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdtYW55JztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdvdGhlcic7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBOZ0xvY2FsZUxvY2FsaXphdGlvbjtcbn0oTmdMb2NhbGl6YXRpb24pKTtcbk5nTG9jYWxlTG9jYWxpemF0aW9uLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5OZ0xvY2FsZUxvY2FsaXphdGlvbi5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHVuZGVmaW5lZCwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbTE9DQUxFX0lELF0gfSxdIH0sXG5dOyB9O1xudmFyIFBsdXJhbCA9IHt9O1xuUGx1cmFsLlplcm8gPSAwO1xuUGx1cmFsLk9uZSA9IDE7XG5QbHVyYWwuVHdvID0gMjtcblBsdXJhbC5GZXcgPSAzO1xuUGx1cmFsLk1hbnkgPSA0O1xuUGx1cmFsLk90aGVyID0gNTtcblBsdXJhbFtQbHVyYWwuWmVyb10gPSBcIlplcm9cIjtcblBsdXJhbFtQbHVyYWwuT25lXSA9IFwiT25lXCI7XG5QbHVyYWxbUGx1cmFsLlR3b10gPSBcIlR3b1wiO1xuUGx1cmFsW1BsdXJhbC5GZXddID0gXCJGZXdcIjtcblBsdXJhbFtQbHVyYWwuTWFueV0gPSBcIk1hbnlcIjtcblBsdXJhbFtQbHVyYWwuT3RoZXJdID0gXCJPdGhlclwiO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwbHVyYWwgY2FzZSBiYXNlZCBvbiB0aGUgbG9jYWxlXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAcGFyYW0gez99IGxvY2FsZVxuICogQHBhcmFtIHs/fSBuTGlrZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gZ2V0UGx1cmFsQ2FzZShsb2NhbGUsIG5MaWtlKSB7XG4gICAgLy8gVE9ETyh2aWNiKTogbGF6eSBjb21wdXRlXG4gICAgaWYgKHR5cGVvZiBuTGlrZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbkxpa2UgPSBwYXJzZUludCgvKiogQHR5cGUgez99ICovIChuTGlrZSksIDEwKTtcbiAgICB9XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbiA9IChuTGlrZSk7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbkRlY2ltYWwgPSBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKTtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSk7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdiA9IG5EZWNpbWFsLmxlbmd0aDtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBmID0gcGFyc2VJbnQobkRlY2ltYWwsIDEwKTtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB0ID0gcGFyc2VJbnQobi50b1N0cmluZygpLnJlcGxhY2UoL15bXi5dKlxcLj98MCskL2csICcnKSwgMTApIHx8IDA7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbGFuZyA9IGxvY2FsZS5zcGxpdCgnLScpWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgc3dpdGNoIChsYW5nKSB7XG4gICAgICAgIGNhc2UgJ2FmJzpcbiAgICAgICAgY2FzZSAnYXNhJzpcbiAgICAgICAgY2FzZSAnYXonOlxuICAgICAgICBjYXNlICdiZW0nOlxuICAgICAgICBjYXNlICdiZXonOlxuICAgICAgICBjYXNlICdiZyc6XG4gICAgICAgIGNhc2UgJ2JyeCc6XG4gICAgICAgIGNhc2UgJ2NlJzpcbiAgICAgICAgY2FzZSAnY2dnJzpcbiAgICAgICAgY2FzZSAnY2hyJzpcbiAgICAgICAgY2FzZSAnY2tiJzpcbiAgICAgICAgY2FzZSAnZWUnOlxuICAgICAgICBjYXNlICdlbCc6XG4gICAgICAgIGNhc2UgJ2VvJzpcbiAgICAgICAgY2FzZSAnZXMnOlxuICAgICAgICBjYXNlICdldSc6XG4gICAgICAgIGNhc2UgJ2ZvJzpcbiAgICAgICAgY2FzZSAnZnVyJzpcbiAgICAgICAgY2FzZSAnZ3N3JzpcbiAgICAgICAgY2FzZSAnaGEnOlxuICAgICAgICBjYXNlICdoYXcnOlxuICAgICAgICBjYXNlICdodSc6XG4gICAgICAgIGNhc2UgJ2pnbyc6XG4gICAgICAgIGNhc2UgJ2ptYyc6XG4gICAgICAgIGNhc2UgJ2thJzpcbiAgICAgICAgY2FzZSAna2snOlxuICAgICAgICBjYXNlICdra2onOlxuICAgICAgICBjYXNlICdrbCc6XG4gICAgICAgIGNhc2UgJ2tzJzpcbiAgICAgICAgY2FzZSAna3NiJzpcbiAgICAgICAgY2FzZSAna3knOlxuICAgICAgICBjYXNlICdsYic6XG4gICAgICAgIGNhc2UgJ2xnJzpcbiAgICAgICAgY2FzZSAnbWFzJzpcbiAgICAgICAgY2FzZSAnbWdvJzpcbiAgICAgICAgY2FzZSAnbWwnOlxuICAgICAgICBjYXNlICdtbic6XG4gICAgICAgIGNhc2UgJ25iJzpcbiAgICAgICAgY2FzZSAnbmQnOlxuICAgICAgICBjYXNlICduZSc6XG4gICAgICAgIGNhc2UgJ25uJzpcbiAgICAgICAgY2FzZSAnbm5oJzpcbiAgICAgICAgY2FzZSAnbnluJzpcbiAgICAgICAgY2FzZSAnb20nOlxuICAgICAgICBjYXNlICdvcic6XG4gICAgICAgIGNhc2UgJ29zJzpcbiAgICAgICAgY2FzZSAncHMnOlxuICAgICAgICBjYXNlICdybSc6XG4gICAgICAgIGNhc2UgJ3JvZic6XG4gICAgICAgIGNhc2UgJ3J3ayc6XG4gICAgICAgIGNhc2UgJ3NhcSc6XG4gICAgICAgIGNhc2UgJ3NlaCc6XG4gICAgICAgIGNhc2UgJ3NuJzpcbiAgICAgICAgY2FzZSAnc28nOlxuICAgICAgICBjYXNlICdzcSc6XG4gICAgICAgIGNhc2UgJ3RhJzpcbiAgICAgICAgY2FzZSAndGUnOlxuICAgICAgICBjYXNlICd0ZW8nOlxuICAgICAgICBjYXNlICd0ayc6XG4gICAgICAgIGNhc2UgJ3RyJzpcbiAgICAgICAgY2FzZSAndWcnOlxuICAgICAgICBjYXNlICd1eic6XG4gICAgICAgIGNhc2UgJ3ZvJzpcbiAgICAgICAgY2FzZSAndnVuJzpcbiAgICAgICAgY2FzZSAnd2FlJzpcbiAgICAgICAgY2FzZSAneG9nJzpcbiAgICAgICAgICAgIGlmIChuID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnYWsnOlxuICAgICAgICBjYXNlICdsbic6XG4gICAgICAgIGNhc2UgJ21nJzpcbiAgICAgICAgY2FzZSAncGEnOlxuICAgICAgICBjYXNlICd0aSc6XG4gICAgICAgICAgICBpZiAobiA9PT0gTWF0aC5mbG9vcihuKSAmJiBuID49IDAgJiYgbiA8PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnYW0nOlxuICAgICAgICBjYXNlICdhcyc6XG4gICAgICAgIGNhc2UgJ2JuJzpcbiAgICAgICAgY2FzZSAnZmEnOlxuICAgICAgICBjYXNlICdndSc6XG4gICAgICAgIGNhc2UgJ2hpJzpcbiAgICAgICAgY2FzZSAna24nOlxuICAgICAgICBjYXNlICdtcic6XG4gICAgICAgIGNhc2UgJ3p1JzpcbiAgICAgICAgICAgIGlmIChpID09PSAwIHx8IG4gPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdhcic6XG4gICAgICAgICAgICBpZiAobiA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLlplcm87XG4gICAgICAgICAgICBpZiAobiA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChuID09PSAyKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuVHdvO1xuICAgICAgICAgICAgaWYgKG4gJSAxMDAgPT09IE1hdGguZmxvb3IobiAlIDEwMCkgJiYgbiAlIDEwMCA+PSAzICYmIG4gJSAxMDAgPD0gMTApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICBpZiAobiAlIDEwMCA9PT0gTWF0aC5mbG9vcihuICUgMTAwKSAmJiBuICUgMTAwID49IDExICYmIG4gJSAxMDAgPD0gOTkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5NYW55O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnYXN0JzpcbiAgICAgICAgY2FzZSAnY2EnOlxuICAgICAgICBjYXNlICdkZSc6XG4gICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgY2FzZSAnZXQnOlxuICAgICAgICBjYXNlICdmaSc6XG4gICAgICAgIGNhc2UgJ2Z5JzpcbiAgICAgICAgY2FzZSAnZ2wnOlxuICAgICAgICBjYXNlICdpdCc6XG4gICAgICAgIGNhc2UgJ25sJzpcbiAgICAgICAgY2FzZSAnc3YnOlxuICAgICAgICBjYXNlICdzdyc6XG4gICAgICAgIGNhc2UgJ3VyJzpcbiAgICAgICAgY2FzZSAneWknOlxuICAgICAgICAgICAgaWYgKGkgPT09IDEgJiYgdiA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2JlJzpcbiAgICAgICAgICAgIGlmIChuICUgMTAgPT09IDEgJiYgIShuICUgMTAwID09PSAxMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSBNYXRoLmZsb29yKG4gJSAxMCkgJiYgbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDQgJiZcbiAgICAgICAgICAgICAgICAhKG4gJSAxMDAgPj0gMTIgJiYgbiAlIDEwMCA8PSAxNCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSAwIHx8IG4gJSAxMCA9PT0gTWF0aC5mbG9vcihuICUgMTApICYmIG4gJSAxMCA+PSA1ICYmIG4gJSAxMCA8PSA5IHx8XG4gICAgICAgICAgICAgICAgbiAlIDEwMCA9PT0gTWF0aC5mbG9vcihuICUgMTAwKSAmJiBuICUgMTAwID49IDExICYmIG4gJSAxMDAgPD0gMTQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5NYW55O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnYnInOlxuICAgICAgICAgICAgaWYgKG4gJSAxMCA9PT0gMSAmJiAhKG4gJSAxMDAgPT09IDExIHx8IG4gJSAxMDAgPT09IDcxIHx8IG4gJSAxMDAgPT09IDkxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChuICUgMTAgPT09IDIgJiYgIShuICUgMTAwID09PSAxMiB8fCBuICUgMTAwID09PSA3MiB8fCBuICUgMTAwID09PSA5MikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5Ud287XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSBNYXRoLmZsb29yKG4gJSAxMCkgJiYgKG4gJSAxMCA+PSAzICYmIG4gJSAxMCA8PSA0IHx8IG4gJSAxMCA9PT0gOSkgJiZcbiAgICAgICAgICAgICAgICAhKG4gJSAxMDAgPj0gMTAgJiYgbiAlIDEwMCA8PSAxOSB8fCBuICUgMTAwID49IDcwICYmIG4gJSAxMDAgPD0gNzkgfHxcbiAgICAgICAgICAgICAgICAgICAgbiAlIDEwMCA+PSA5MCAmJiBuICUgMTAwIDw9IDk5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIGlmICghKG4gPT09IDApICYmIG4gJSAxZTYgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5NYW55O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnYnMnOlxuICAgICAgICBjYXNlICdocic6XG4gICAgICAgIGNhc2UgJ3NyJzpcbiAgICAgICAgICAgIGlmICh2ID09PSAwICYmIGkgJSAxMCA9PT0gMSAmJiAhKGkgJSAxMDAgPT09IDExKSB8fCBmICUgMTAgPT09IDEgJiYgIShmICUgMTAwID09PSAxMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IE1hdGguZmxvb3IoaSAlIDEwKSAmJiBpICUgMTAgPj0gMiAmJiBpICUgMTAgPD0gNCAmJlxuICAgICAgICAgICAgICAgICEoaSAlIDEwMCA+PSAxMiAmJiBpICUgMTAwIDw9IDE0KSB8fFxuICAgICAgICAgICAgICAgIGYgJSAxMCA9PT0gTWF0aC5mbG9vcihmICUgMTApICYmIGYgJSAxMCA+PSAyICYmIGYgJSAxMCA8PSA0ICYmXG4gICAgICAgICAgICAgICAgICAgICEoZiAlIDEwMCA+PSAxMiAmJiBmICUgMTAwIDw9IDE0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2NzJzpcbiAgICAgICAgY2FzZSAnc2snOlxuICAgICAgICAgICAgaWYgKGkgPT09IDEgJiYgdiA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChpID09PSBNYXRoLmZsb29yKGkpICYmIGkgPj0gMiAmJiBpIDw9IDQgJiYgdiA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIGlmICghKHYgPT09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuTWFueTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2N5JzpcbiAgICAgICAgICAgIGlmIChuID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuWmVybztcbiAgICAgICAgICAgIGlmIChuID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgaWYgKG4gPT09IDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5Ud287XG4gICAgICAgICAgICBpZiAobiA9PT0gMylcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIGlmIChuID09PSA2KVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuTWFueTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2RhJzpcbiAgICAgICAgICAgIGlmIChuID09PSAxIHx8ICEodCA9PT0gMCkgJiYgKGkgPT09IDAgfHwgaSA9PT0gMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdkc2InOlxuICAgICAgICBjYXNlICdoc2InOlxuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwMCA9PT0gMSB8fCBmICUgMTAwID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwMCA9PT0gMiB8fCBmICUgMTAwID09PSAyKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuVHdvO1xuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwMCA9PT0gTWF0aC5mbG9vcihpICUgMTAwKSAmJiBpICUgMTAwID49IDMgJiYgaSAlIDEwMCA8PSA0IHx8XG4gICAgICAgICAgICAgICAgZiAlIDEwMCA9PT0gTWF0aC5mbG9vcihmICUgMTAwKSAmJiBmICUgMTAwID49IDMgJiYgZiAlIDEwMCA8PSA0KVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuRmV3O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnZmYnOlxuICAgICAgICBjYXNlICdmcic6XG4gICAgICAgIGNhc2UgJ2h5JzpcbiAgICAgICAgY2FzZSAna2FiJzpcbiAgICAgICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdmaWwnOlxuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgKGkgPT09IDEgfHwgaSA9PT0gMiB8fCBpID09PSAzKSB8fFxuICAgICAgICAgICAgICAgIHYgPT09IDAgJiYgIShpICUgMTAgPT09IDQgfHwgaSAlIDEwID09PSA2IHx8IGkgJSAxMCA9PT0gOSkgfHxcbiAgICAgICAgICAgICAgICAhKHYgPT09IDApICYmICEoZiAlIDEwID09PSA0IHx8IGYgJSAxMCA9PT0gNiB8fCBmICUgMTAgPT09IDkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnZ2EnOlxuICAgICAgICAgICAgaWYgKG4gPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAobiA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLlR3bztcbiAgICAgICAgICAgIGlmIChuID09PSBNYXRoLmZsb29yKG4pICYmIG4gPj0gMyAmJiBuIDw9IDYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICBpZiAobiA9PT0gTWF0aC5mbG9vcihuKSAmJiBuID49IDcgJiYgbiA8PSAxMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk1hbnk7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdnZCc6XG4gICAgICAgICAgICBpZiAobiA9PT0gMSB8fCBuID09PSAxMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChuID09PSAyIHx8IG4gPT09IDEyKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuVHdvO1xuICAgICAgICAgICAgaWYgKG4gPT09IE1hdGguZmxvb3IobikgJiYgKG4gPj0gMyAmJiBuIDw9IDEwIHx8IG4gPj0gMTMgJiYgbiA8PSAxOSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdndic6XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5Ud287XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIChpICUgMTAwID09PSAwIHx8IGkgJSAxMDAgPT09IDIwIHx8IGkgJSAxMDAgPT09IDQwIHx8IGkgJSAxMDAgPT09IDYwIHx8IGkgJSAxMDAgPT09IDgwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIGlmICghKHYgPT09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuTWFueTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2hlJzpcbiAgICAgICAgICAgIGlmIChpID09PSAxICYmIHYgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMiAmJiB2ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuVHdvO1xuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgIShuID49IDAgJiYgbiA8PSAxMCkgJiYgbiAlIDEwID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuTWFueTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ2lzJzpcbiAgICAgICAgICAgIGlmICh0ID09PSAwICYmIGkgJSAxMCA9PT0gMSAmJiAhKGkgJSAxMDAgPT09IDExKSB8fCAhKHQgPT09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAna3NoJzpcbiAgICAgICAgICAgIGlmIChuID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuWmVybztcbiAgICAgICAgICAgIGlmIChuID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAna3cnOlxuICAgICAgICBjYXNlICduYXEnOlxuICAgICAgICBjYXNlICdzZSc6XG4gICAgICAgIGNhc2UgJ3Ntbic6XG4gICAgICAgICAgICBpZiAobiA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChuID09PSAyKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuVHdvO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnbGFnJzpcbiAgICAgICAgICAgIGlmIChuID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuWmVybztcbiAgICAgICAgICAgIGlmICgoaSA9PT0gMCB8fCBpID09PSAxKSAmJiAhKG4gPT09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnbHQnOlxuICAgICAgICAgICAgaWYgKG4gJSAxMCA9PT0gMSAmJiAhKG4gJSAxMDAgPj0gMTEgJiYgbiAlIDEwMCA8PSAxOSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSBNYXRoLmZsb29yKG4gJSAxMCkgJiYgbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDkgJiZcbiAgICAgICAgICAgICAgICAhKG4gJSAxMDAgPj0gMTEgJiYgbiAlIDEwMCA8PSAxOSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICBpZiAoIShmID09PSAwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk1hbnk7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdsdic6XG4gICAgICAgIGNhc2UgJ3ByZyc6XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSAwIHx8IG4gJSAxMDAgPT09IE1hdGguZmxvb3IobiAlIDEwMCkgJiYgbiAlIDEwMCA+PSAxMSAmJiBuICUgMTAwIDw9IDE5IHx8XG4gICAgICAgICAgICAgICAgdiA9PT0gMiAmJiBmICUgMTAwID09PSBNYXRoLmZsb29yKGYgJSAxMDApICYmIGYgJSAxMDAgPj0gMTEgJiYgZiAlIDEwMCA8PSAxOSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLlplcm87XG4gICAgICAgICAgICBpZiAobiAlIDEwID09PSAxICYmICEobiAlIDEwMCA9PT0gMTEpIHx8IHYgPT09IDIgJiYgZiAlIDEwID09PSAxICYmICEoZiAlIDEwMCA9PT0gMTEpIHx8XG4gICAgICAgICAgICAgICAgISh2ID09PSAyKSAmJiBmICUgMTAgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdtayc6XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IDEgfHwgZiAlIDEwID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnbXQnOlxuICAgICAgICAgICAgaWYgKG4gPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAobiA9PT0gMCB8fCBuICUgMTAwID09PSBNYXRoLmZsb29yKG4gJSAxMDApICYmIG4gJSAxMDAgPj0gMiAmJiBuICUgMTAwIDw9IDEwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuRmV3O1xuICAgICAgICAgICAgaWYgKG4gJSAxMDAgPT09IE1hdGguZmxvb3IobiAlIDEwMCkgJiYgbiAlIDEwMCA+PSAxMSAmJiBuICUgMTAwIDw9IDE5KVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuTWFueTtcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ3BsJzpcbiAgICAgICAgICAgIGlmIChpID09PSAxICYmIHYgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IE1hdGguZmxvb3IoaSAlIDEwKSAmJiBpICUgMTAgPj0gMiAmJiBpICUgMTAgPD0gNCAmJlxuICAgICAgICAgICAgICAgICEoaSAlIDEwMCA+PSAxMiAmJiBpICUgMTAwIDw9IDE0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIGlmICh2ID09PSAwICYmICEoaSA9PT0gMSkgJiYgaSAlIDEwID09PSBNYXRoLmZsb29yKGkgJSAxMCkgJiYgaSAlIDEwID49IDAgJiYgaSAlIDEwIDw9IDEgfHxcbiAgICAgICAgICAgICAgICB2ID09PSAwICYmIGkgJSAxMCA9PT0gTWF0aC5mbG9vcihpICUgMTApICYmIGkgJSAxMCA+PSA1ICYmIGkgJSAxMCA8PSA5IHx8XG4gICAgICAgICAgICAgICAgdiA9PT0gMCAmJiBpICUgMTAwID09PSBNYXRoLmZsb29yKGkgJSAxMDApICYmIGkgJSAxMDAgPj0gMTIgJiYgaSAlIDEwMCA8PSAxNClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk1hbnk7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdwdCc6XG4gICAgICAgICAgICBpZiAobiA9PT0gTWF0aC5mbG9vcihuKSAmJiBuID49IDAgJiYgbiA8PSAyICYmICEobiA9PT0gMikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdybyc6XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSAmJiB2ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgaWYgKCEodiA9PT0gMCkgfHwgbiA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICEobiA9PT0gMSkgJiYgbiAlIDEwMCA9PT0gTWF0aC5mbG9vcihuICUgMTAwKSAmJiBuICUgMTAwID49IDEgJiYgbiAlIDEwMCA8PSAxOSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLkZldztcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgICAgIGNhc2UgJ3J1JzpcbiAgICAgICAgY2FzZSAndWsnOlxuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwID09PSAxICYmICEoaSAlIDEwMCA9PT0gMTEpKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwID09PSBNYXRoLmZsb29yKGkgJSAxMCkgJiYgaSAlIDEwID49IDIgJiYgaSAlIDEwIDw9IDQgJiZcbiAgICAgICAgICAgICAgICAhKGkgJSAxMDAgPj0gMTIgJiYgaSAlIDEwMCA8PSAxNCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5GZXc7XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAgPT09IDAgfHxcbiAgICAgICAgICAgICAgICB2ID09PSAwICYmIGkgJSAxMCA9PT0gTWF0aC5mbG9vcihpICUgMTApICYmIGkgJSAxMCA+PSA1ICYmIGkgJSAxMCA8PSA5IHx8XG4gICAgICAgICAgICAgICAgdiA9PT0gMCAmJiBpICUgMTAwID09PSBNYXRoLmZsb29yKGkgJSAxMDApICYmIGkgJSAxMDAgPj0gMTEgJiYgaSAlIDEwMCA8PSAxNClcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk1hbnk7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdzaGknOlxuICAgICAgICAgICAgaWYgKGkgPT09IDAgfHwgbiA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLk9uZTtcbiAgICAgICAgICAgIGlmIChuID09PSBNYXRoLmZsb29yKG4pICYmIG4gPj0gMiAmJiBuIDw9IDEwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuRmV3O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAnc2knOlxuICAgICAgICAgICAgaWYgKG4gPT09IDAgfHwgbiA9PT0gMSB8fCBpID09PSAwICYmIGYgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICBjYXNlICdzbCc6XG4gICAgICAgICAgICBpZiAodiA9PT0gMCAmJiBpICUgMTAwID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT25lO1xuICAgICAgICAgICAgaWYgKHYgPT09IDAgJiYgaSAlIDEwMCA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gUGx1cmFsLlR3bztcbiAgICAgICAgICAgIGlmICh2ID09PSAwICYmIGkgJSAxMDAgPT09IE1hdGguZmxvb3IoaSAlIDEwMCkgJiYgaSAlIDEwMCA+PSAzICYmIGkgJSAxMDAgPD0gNCB8fCAhKHYgPT09IDApKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbHVyYWwuRmV3O1xuICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PdGhlcjtcbiAgICAgICAgY2FzZSAndHptJzpcbiAgICAgICAgICAgIGlmIChuID09PSBNYXRoLmZsb29yKG4pICYmIG4gPj0gMCAmJiBuIDw9IDEgfHwgbiA9PT0gTWF0aC5mbG9vcihuKSAmJiBuID49IDExICYmIG4gPD0gOTkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsdXJhbC5PbmU7XG4gICAgICAgICAgICByZXR1cm4gUGx1cmFsLk90aGVyO1xuICAgICAgICAvLyBXaGVuIHRoZXJlIGlzIG5vIHNwZWNpZmljYXRpb24sIHRoZSBkZWZhdWx0IGlzIGFsd2F5cyBcIm90aGVyXCJcbiAgICAgICAgLy8gU3BlYzogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvaW5kZXgvY2xkci1zcGVjL3BsdXJhbC1ydWxlc1xuICAgICAgICAvLyA+IG90aGVyIChyZXF1aXJlZOKAlGdlbmVyYWwgcGx1cmFsIGZvcm0g4oCUIGFsc28gdXNlZCBpZiB0aGUgbGFuZ3VhZ2Ugb25seSBoYXMgYSBzaW5nbGUgZm9ybSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBQbHVyYWwuT3RoZXI7XG4gICAgfVxufVxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqIEBwYXJhbSB7P30gY29va2llU3RyXG4gKiBAcGFyYW0gez99IG5hbWVcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQ29va2llVmFsdWUoY29va2llU3RyLCBuYW1lKSB7XG4gICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gY29va2llU3RyLnNwbGl0KCc7Jyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBfYVtfaV07XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGVxSW5kZXggPSBjb29raWUuaW5kZXhPZignPScpO1xuICAgICAgICB2YXIgX2IgPSBlcUluZGV4ID09IC0xID8gW2Nvb2tpZSwgJyddIDogW2Nvb2tpZS5zbGljZSgwLCBlcUluZGV4KSwgY29va2llLnNsaWNlKGVxSW5kZXggKyAxKV0sIGNvb2tpZU5hbWUgPSBfYlswXSwgY29va2llVmFsdWUgPSBfYlsxXTtcbiAgICAgICAgaWYgKGNvb2tpZU5hbWUudHJpbSgpID09PSBuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKlxuICogXFxAd2hhdEl0RG9lcyBBZGRzIGFuZCByZW1vdmVzIENTUyBjbGFzc2VzIG9uIGFuIEhUTUwgZWxlbWVudC5cbiAqXG4gKiBcXEBob3dUb1VzZVxuICogYGBgXG4gKiAgICAgPHNvbWUtZWxlbWVudCBbbmdDbGFzc109XCInZmlyc3Qgc2Vjb25kJ1wiPi4uLjwvc29tZS1lbGVtZW50PlxuICpcbiAqICAgICA8c29tZS1lbGVtZW50IFtuZ0NsYXNzXT1cIlsnZmlyc3QnLCAnc2Vjb25kJ11cIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqXG4gKiAgICAgPHNvbWUtZWxlbWVudCBbbmdDbGFzc109XCJ7J2ZpcnN0JzogdHJ1ZSwgJ3NlY29uZCc6IHRydWUsICd0aGlyZCc6IGZhbHNlfVwiPi4uLjwvc29tZS1lbGVtZW50PlxuICpcbiAqICAgICA8c29tZS1lbGVtZW50IFtuZ0NsYXNzXT1cInN0cmluZ0V4cHxhcnJheUV4cHxvYmpFeHBcIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqXG4gKiAgICAgPHNvbWUtZWxlbWVudCBbbmdDbGFzc109XCJ7J2NsYXNzMSBjbGFzczIgY2xhc3MzJyA6IHRydWV9XCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiBgYGBcbiAqXG4gKiBcXEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBDU1MgY2xhc3NlcyBhcmUgdXBkYXRlZCBhcyBmb2xsb3dzLCBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgdGhlIGV4cHJlc3Npb24gZXZhbHVhdGlvbjpcbiAqIC0gYHN0cmluZ2AgLSB0aGUgQ1NTIGNsYXNzZXMgbGlzdGVkIGluIHRoZSBzdHJpbmcgKHNwYWNlIGRlbGltaXRlZCkgYXJlIGFkZGVkLFxuICogLSBgQXJyYXlgIC0gdGhlIENTUyBjbGFzc2VzIGRlY2xhcmVkIGFzIEFycmF5IGVsZW1lbnRzIGFyZSBhZGRlZCxcbiAqIC0gYE9iamVjdGAgLSBrZXlzIGFyZSBDU1MgY2xhc3NlcyB0aGF0IGdldCBhZGRlZCB3aGVuIHRoZSBleHByZXNzaW9uIGdpdmVuIGluIHRoZSB2YWx1ZVxuICogICAgICAgICAgICAgIGV2YWx1YXRlcyB0byBhIHRydXRoeSB2YWx1ZSwgb3RoZXJ3aXNlIHRoZXkgYXJlIHJlbW92ZWQuXG4gKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBOZ0NsYXNzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IF9pdGVyYWJsZURpZmZlcnNcbiAgICAgKiBAcGFyYW0gez99IF9rZXlWYWx1ZURpZmZlcnNcbiAgICAgKiBAcGFyYW0gez99IF9uZ0VsXG4gICAgICogQHBhcmFtIHs/fSBfcmVuZGVyZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOZ0NsYXNzKF9pdGVyYWJsZURpZmZlcnMsIF9rZXlWYWx1ZURpZmZlcnMsIF9uZ0VsLCBfcmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5faXRlcmFibGVEaWZmZXJzID0gX2l0ZXJhYmxlRGlmZmVycztcbiAgICAgICAgdGhpcy5fa2V5VmFsdWVEaWZmZXJzID0gX2tleVZhbHVlRGlmZmVycztcbiAgICAgICAgdGhpcy5fbmdFbCA9IF9uZ0VsO1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IF9yZW5kZXJlcjtcbiAgICAgICAgdGhpcy5faW5pdGlhbENsYXNzZXMgPSBbXTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nQ2xhc3MucHJvdG90eXBlLCBcImtsYXNzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gdlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlJbml0aWFsQ2xhc3Nlcyh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxDbGFzc2VzID0gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdi5zcGxpdCgvXFxzKy8pIDogW107XG4gICAgICAgICAgICB0aGlzLl9hcHBseUluaXRpYWxDbGFzc2VzKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5Q2xhc3Nlcyh0aGlzLl9yYXdDbGFzcywgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmdDbGFzcy5wcm90b3R5cGUsIFwibmdDbGFzc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IHZcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXBDbGFzc2VzKHRoaXMuX3Jhd0NsYXNzKTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZXJhYmxlRGlmZmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2tleVZhbHVlRGlmZmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3Jhd0NsYXNzID0gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdi5zcGxpdCgvXFxzKy8pIDogdjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yYXdDbGFzcykge1xuICAgICAgICAgICAgICAgIGlmICjJtWlzTGlzdExpa2VJdGVyYWJsZSh0aGlzLl9yYXdDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlcmFibGVEaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZCh0aGlzLl9yYXdDbGFzcykuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlWYWx1ZURpZmZlciA9IHRoaXMuX2tleVZhbHVlRGlmZmVycy5maW5kKHRoaXMuX3Jhd0NsYXNzKS5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdDbGFzcy5wcm90b3R5cGUubmdEb0NoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlcmFibGVEaWZmZXIpIHtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGl0ZXJhYmxlQ2hhbmdlcyA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVyLmRpZmYoLyoqIEB0eXBlIHs/fSAqLyAodGhpcy5fcmF3Q2xhc3MpKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseUl0ZXJhYmxlQ2hhbmdlcyhpdGVyYWJsZUNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2tleVZhbHVlRGlmZmVyKSB7XG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBrZXlWYWx1ZUNoYW5nZXMgPSB0aGlzLl9rZXlWYWx1ZURpZmZlci5kaWZmKC8qKiBAdHlwZSB7P30gKi8gKHRoaXMuX3Jhd0NsYXNzKSk7XG4gICAgICAgICAgICBpZiAoa2V5VmFsdWVDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlLZXlWYWx1ZUNoYW5nZXMoa2V5VmFsdWVDaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSByYXdDbGFzc1ZhbFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdDbGFzcy5wcm90b3R5cGUuX2NsZWFudXBDbGFzc2VzID0gZnVuY3Rpb24gKHJhd0NsYXNzVmFsKSB7XG4gICAgICAgIHRoaXMuX2FwcGx5Q2xhc3NlcyhyYXdDbGFzc1ZhbCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2FwcGx5SW5pdGlhbENsYXNzZXMoZmFsc2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBjaGFuZ2VzXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ0NsYXNzLnByb3RvdHlwZS5fYXBwbHlLZXlWYWx1ZUNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oZnVuY3Rpb24gKHJlY29yZCkgeyByZXR1cm4gX3RoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oZnVuY3Rpb24gKHJlY29yZCkgeyByZXR1cm4gX3RoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oZnVuY3Rpb24gKHJlY29yZCkge1xuICAgICAgICAgICAgaWYgKHJlY29yZC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RvZ2dsZUNsYXNzKHJlY29yZC5rZXksIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nQ2xhc3MucHJvdG90eXBlLl9hcHBseUl0ZXJhYmxlQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlY29yZC5pdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIF90aGlzLl90b2dnbGVDbGFzcyhyZWNvcmQuaXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZ0NsYXNzIGNhbiBvbmx5IHRvZ2dsZSBDU1MgY2xhc3NlcyBleHByZXNzZWQgYXMgc3RyaW5ncywgZ290IFwiICsgybVzdHJpbmdpZnkocmVjb3JkLml0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKGZ1bmN0aW9uIChyZWNvcmQpIHsgcmV0dXJuIF90aGlzLl90b2dnbGVDbGFzcyhyZWNvcmQuaXRlbSwgZmFsc2UpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gaXNDbGVhbnVwXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ0NsYXNzLnByb3RvdHlwZS5fYXBwbHlJbml0aWFsQ2xhc3NlcyA9IGZ1bmN0aW9uIChpc0NsZWFudXApIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5faW5pdGlhbENsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoa2xhc3MpIHsgcmV0dXJuIF90aGlzLl90b2dnbGVDbGFzcyhrbGFzcywgIWlzQ2xlYW51cCk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSByYXdDbGFzc1ZhbFxuICAgICAqIEBwYXJhbSB7P30gaXNDbGVhbnVwXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ0NsYXNzLnByb3RvdHlwZS5fYXBwbHlDbGFzc2VzID0gZnVuY3Rpb24gKHJhd0NsYXNzVmFsLCBpc0NsZWFudXApIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHJhd0NsYXNzVmFsKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdDbGFzc1ZhbCkgfHwgcmF3Q2xhc3NWYWwgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAoKHJhd0NsYXNzVmFsKSkuZm9yRWFjaChmdW5jdGlvbiAoa2xhc3MpIHsgcmV0dXJuIF90aGlzLl90b2dnbGVDbGFzcyhrbGFzcywgIWlzQ2xlYW51cCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmF3Q2xhc3NWYWwpLmZvckVhY2goZnVuY3Rpb24gKGtsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXdDbGFzc1ZhbFtrbGFzc10gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl90b2dnbGVDbGFzcyhrbGFzcywgIWlzQ2xlYW51cCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30ga2xhc3NcbiAgICAgKiBAcGFyYW0gez99IGVuYWJsZWRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nQ2xhc3MucHJvdG90eXBlLl90b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChrbGFzcywgZW5hYmxlZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBrbGFzcyA9IGtsYXNzLnRyaW0oKTtcbiAgICAgICAgaWYgKGtsYXNzKSB7XG4gICAgICAgICAgICBrbGFzcy5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uIChrbGFzcykgeyBfdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKF90aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsIGtsYXNzLCAhIWVuYWJsZWQpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE5nQ2xhc3M7XG59KCkpO1xuTmdDbGFzcy5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ1tuZ0NsYXNzXScgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5OZ0NsYXNzLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogSXRlcmFibGVEaWZmZXJzLCB9LFxuICAgIHsgdHlwZTogS2V5VmFsdWVEaWZmZXJzLCB9LFxuICAgIHsgdHlwZTogRWxlbWVudFJlZiwgfSxcbiAgICB7IHR5cGU6IFJlbmRlcmVyLCB9LFxuXTsgfTtcbk5nQ2xhc3MucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2tsYXNzJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsnY2xhc3MnLF0gfSxdLFxuICAgICduZ0NsYXNzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogSW5zdGFudGlhdGVzIGEgc2luZ2xlIHtcXEBsaW5rIENvbXBvbmVudH0gdHlwZSBhbmQgaW5zZXJ0cyBpdHMgSG9zdCBWaWV3IGludG8gY3VycmVudCBWaWV3LlxuICogYE5nQ29tcG9uZW50T3V0bGV0YCBwcm92aWRlcyBhIGRlY2xhcmF0aXZlIGFwcHJvYWNoIGZvciBkeW5hbWljIGNvbXBvbmVudCBjcmVhdGlvbi5cbiAqXG4gKiBgTmdDb21wb25lbnRPdXRsZXRgIHJlcXVpcmVzIGEgY29tcG9uZW50IHR5cGUsIGlmIGEgZmFsc3kgdmFsdWUgaXMgc2V0IHRoZSB2aWV3IHdpbGwgY2xlYXIgYW5kXG4gKiBhbnkgZXhpc3RpbmcgY29tcG9uZW50IHdpbGwgZ2V0IGRlc3Ryb3llZC5cbiAqXG4gKiAjIyMgRmluZSB0dW5lIGNvbnRyb2xcbiAqXG4gKiBZb3UgY2FuIGNvbnRyb2wgdGhlIGNvbXBvbmVudCBjcmVhdGlvbiBwcm9jZXNzIGJ5IHVzaW5nIHRoZSBmb2xsb3dpbmcgb3B0aW9uYWwgYXR0cmlidXRlczpcbiAqXG4gKiAqIGBuZ0NvbXBvbmVudE91dGxldEluamVjdG9yYDogT3B0aW9uYWwgY3VzdG9tIHtcXEBsaW5rIEluamVjdG9yfSB0aGF0IHdpbGwgYmUgdXNlZCBhcyBwYXJlbnQgZm9yXG4gKiB0aGUgQ29tcG9uZW50LiBEZWZhdWx0cyB0byB0aGUgaW5qZWN0b3Igb2YgdGhlIGN1cnJlbnQgdmlldyBjb250YWluZXIuXG4gKlxuICogKiBgbmdDb21wb25lbnRPdXRsZXRDb250ZW50YDogT3B0aW9uYWwgbGlzdCBvZiBwcm9qZWN0YWJsZSBub2RlcyB0byBpbnNlcnQgaW50byB0aGUgY29udGVudFxuICogc2VjdGlvbiBvZiB0aGUgY29tcG9uZW50LCBpZiBleGlzdHMuXG4gKlxuICogKiBgbmdDb21wb25lbnRPdXRsZXROZ01vZHVsZUZhY3RvcnlgOiBPcHRpb25hbCBtb2R1bGUgZmFjdG9yeSB0byBhbGxvdyBkeW5hbWljYWxseSBsb2FkaW5nIG90aGVyXG4gKiBtb2R1bGUsIHRoZW4gbG9hZCBhIGNvbXBvbmVudCBmcm9tIHRoYXQgbW9kdWxlLlxuICpcbiAqICMjIyBTeW50YXhcbiAqXG4gKiBTaW1wbGVcbiAqIGBgYFxuICogPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJjb21wb25lbnRUeXBlRXhwcmVzc2lvblwiPjwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogQ3VzdG9taXplZCBpbmplY3Rvci9jb250ZW50XG4gKiBgYGBcbiAqIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiY29tcG9uZW50VHlwZUV4cHJlc3Npb247XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0b3I6IGluamVjdG9yRXhwcmVzc2lvbjtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50Tm9kZXNFeHByZXNzaW9uO1wiPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBDdXN0b21pemVkIG5nTW9kdWxlRmFjdG9yeVxuICogYGBgXG4gKiA8bmctY29udGFpbmVyICpuZ0NvbXBvbmVudE91dGxldD1cImNvbXBvbmVudFR5cGVFeHByZXNzaW9uO1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nTW9kdWxlRmFjdG9yeTogbW9kdWxlRmFjdG9yeTtcIj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL25nQ29tcG9uZW50T3V0bGV0L3RzL21vZHVsZS50cyByZWdpb249J1NpbXBsZUV4YW1wbGUnfVxuICpcbiAqIEEgbW9yZSBjb21wbGV0ZSBleGFtcGxlIHdpdGggYWRkaXRpb25hbCBvcHRpb25zOlxuICpcbiAqIHtcXEBleGFtcGxlIGNvbW1vbi9uZ0NvbXBvbmVudE91dGxldC90cy9tb2R1bGUudHMgcmVnaW9uPSdDb21wbGV0ZUV4YW1wbGUnfVxuICogQSBtb3JlIGNvbXBsZXRlIGV4YW1wbGUgd2l0aCBuZ01vZHVsZUZhY3Rvcnk6XG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL25nQ29tcG9uZW50T3V0bGV0L3RzL21vZHVsZS50cyByZWdpb249J05nTW9kdWxlRmFjdG9yeUV4YW1wbGUnfVxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgTmdDb21wb25lbnRPdXRsZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX3ZpZXdDb250YWluZXJSZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOZ0NvbXBvbmVudE91dGxldChfdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmID0gX3ZpZXdDb250YWluZXJSZWY7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vZHVsZVJlZiA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gY2hhbmdlc1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdDb21wb25lbnRPdXRsZXQucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZ0NvbXBvbmVudE91dGxldCkge1xuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gZWxJbmplY3RvciA9IHRoaXMubmdDb21wb25lbnRPdXRsZXRJbmplY3RvciB8fCB0aGlzLl92aWV3Q29udGFpbmVyUmVmLnBhcmVudEluamVjdG9yO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXNbJ25nQ29tcG9uZW50T3V0bGV0TmdNb2R1bGVGYWN0b3J5J10pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9kdWxlUmVmKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVSZWYuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5nQ29tcG9uZW50T3V0bGV0TmdNb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHBhcmVudE1vZHVsZSA9IGVsSW5qZWN0b3IuZ2V0KE5nTW9kdWxlUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlUmVmID0gdGhpcy5uZ0NvbXBvbmVudE91dGxldE5nTW9kdWxlRmFjdG9yeS5jcmVhdGUocGFyZW50TW9kdWxlLmluamVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZVJlZiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gY29tcG9uZW50RmFjdG9yeVJlc29sdmVyID0gdGhpcy5fbW9kdWxlUmVmID8gdGhpcy5fbW9kdWxlUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA6XG4gICAgICAgICAgICAgICAgZWxJbmplY3Rvci5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGNvbXBvbmVudEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5uZ0NvbXBvbmVudE91dGxldCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmxlbmd0aCwgZWxJbmplY3RvciwgdGhpcy5uZ0NvbXBvbmVudE91dGxldENvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nQ29tcG9uZW50T3V0bGV0LnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vZHVsZVJlZilcbiAgICAgICAgICAgIHRoaXMuX21vZHVsZVJlZi5kZXN0cm95KCk7XG4gICAgfTtcbiAgICByZXR1cm4gTmdDb21wb25lbnRPdXRsZXQ7XG59KCkpO1xuTmdDb21wb25lbnRPdXRsZXQuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3sgc2VsZWN0b3I6ICdbbmdDb21wb25lbnRPdXRsZXRdJyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbk5nQ29tcG9uZW50T3V0bGV0LmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogVmlld0NvbnRhaW5lclJlZiwgfSxcbl07IH07XG5OZ0NvbXBvbmVudE91dGxldC5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbmdDb21wb25lbnRPdXRsZXQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ25nQ29tcG9uZW50T3V0bGV0SW5qZWN0b3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ25nQ29tcG9uZW50T3V0bGV0Q29udGVudCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbmdDb21wb25lbnRPdXRsZXROZ01vZHVsZUZhY3RvcnknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIE5nRm9yT2ZDb250ZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99ICRpbXBsaWNpdFxuICAgICAqIEBwYXJhbSB7P30gbmdGb3JPZlxuICAgICAqIEBwYXJhbSB7P30gaW5kZXhcbiAgICAgKiBAcGFyYW0gez99IGNvdW50XG4gICAgICovXG4gICAgZnVuY3Rpb24gTmdGb3JPZkNvbnRleHQoJGltcGxpY2l0LCBuZ0Zvck9mLCBpbmRleCwgY291bnQpIHtcbiAgICAgICAgdGhpcy4kaW1wbGljaXQgPSAkaW1wbGljaXQ7XG4gICAgICAgIHRoaXMubmdGb3JPZiA9IG5nRm9yT2Y7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmdGb3JPZkNvbnRleHQucHJvdG90eXBlLCBcImZpcnN0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaW5kZXggPT09IDA7IH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOZ0Zvck9mQ29udGV4dC5wcm90b3R5cGUsIFwibGFzdFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmluZGV4ID09PSB0aGlzLmNvdW50IC0gMTsgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nRm9yT2ZDb250ZXh0LnByb3RvdHlwZSwgXCJldmVuXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaW5kZXggJSAyID09PSAwOyB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmdGb3JPZkNvbnRleHQucHJvdG90eXBlLCBcIm9kZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiAhdGhpcy5ldmVuOyB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gTmdGb3JPZkNvbnRleHQ7XG59KCkpO1xuLyoqXG4gKiBUaGUgYE5nRm9yT2ZgIGRpcmVjdGl2ZSBpbnN0YW50aWF0ZXMgYSB0ZW1wbGF0ZSBvbmNlIHBlciBpdGVtIGZyb20gYW4gaXRlcmFibGUuIFRoZSBjb250ZXh0XG4gKiBmb3IgZWFjaCBpbnN0YW50aWF0ZWQgdGVtcGxhdGUgaW5oZXJpdHMgZnJvbSB0aGUgb3V0ZXIgY29udGV4dCB3aXRoIHRoZSBnaXZlbiBsb29wIHZhcmlhYmxlXG4gKiBzZXQgdG8gdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBpdGVyYWJsZS5cbiAqXG4gKiAjIyMgTG9jYWwgVmFyaWFibGVzXG4gKlxuICogYE5nRm9yT2ZgIHByb3ZpZGVzIHNldmVyYWwgZXhwb3J0ZWQgdmFsdWVzIHRoYXQgY2FuIGJlIGFsaWFzZWQgdG8gbG9jYWwgdmFyaWFibGVzOlxuICpcbiAqIC0gYCRpbXBsaWNpdDogVGA6IFRoZSB2YWx1ZSBvZiB0aGUgaW5kaXZpZHVhbCBpdGVtcyBpbiB0aGUgaXRlcmFibGUgKGBuZ0Zvck9mYCkuXG4gKiAtIGBuZ0Zvck9mOiBOZ0l0ZXJhYmxlPFQ+YDogVGhlIHZhbHVlIG9mIHRoZSBpdGVyYWJsZSBleHByZXNzaW9uLiBVc2VmdWwgd2hlbiB0aGUgZXhwcmVzc2lvbiBpc1xuICogbW9yZSBjb21wbGV4IHRoZW4gYSBwcm9wZXJ0eSBhY2Nlc3MsIGZvciBleGFtcGxlIHdoZW4gdXNpbmcgdGhlIGFzeW5jIHBpcGUgKGB1c2VyU3RyZWFtcyB8XG4gKiBhc3luY2ApLlxuICogLSBgaW5kZXg6IG51bWJlcmA6IFRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpdGVtIGluIHRoZSBpdGVyYWJsZS5cbiAqIC0gYGZpcnN0OiBib29sZWFuYDogVHJ1ZSB3aGVuIHRoZSBpdGVtIGlzIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBpdGVyYWJsZS5cbiAqIC0gYGxhc3Q6IGJvb2xlYW5gOiBUcnVlIHdoZW4gdGhlIGl0ZW0gaXMgdGhlIGxhc3QgaXRlbSBpbiB0aGUgaXRlcmFibGUuXG4gKiAtIGBldmVuOiBib29sZWFuYDogVHJ1ZSB3aGVuIHRoZSBpdGVtIGhhcyBhbiBldmVuIGluZGV4IGluIHRoZSBpdGVyYWJsZS5cbiAqIC0gYG9kZDogYm9vbGVhbmA6IFRydWUgd2hlbiB0aGUgaXRlbSBoYXMgYW4gb2RkIGluZGV4IGluIHRoZSBpdGVyYWJsZS5cbiAqXG4gKiBgYGBcbiAqIDxsaSAqbmdGb3I9XCJsZXQgdXNlciBvZiB1c2VyT2JzZXJ2YWJsZSB8IGFzeW5jIGFzIHVzZXJzOyBpbmRleCBhcyBpOyBmaXJzdCBhcyBpc0ZpcnN0XCI+XG4gKiAgICB7e2l9fS97e3VzZXJzLmxlbmd0aH19LiB7e3VzZXJ9fSA8c3BhbiAqbmdJZj1cImlzRmlyc3RcIj5kZWZhdWx0PC9zcGFuPlxuICogPC9saT5cbiAqIGBgYFxuICpcbiAqICMjIyBDaGFuZ2UgUHJvcGFnYXRpb25cbiAqXG4gKiBXaGVuIHRoZSBjb250ZW50cyBvZiB0aGUgaXRlcmF0b3IgY2hhbmdlcywgYE5nRm9yT2ZgIG1ha2VzIHRoZSBjb3JyZXNwb25kaW5nIGNoYW5nZXMgdG8gdGhlIERPTTpcbiAqXG4gKiAqIFdoZW4gYW4gaXRlbSBpcyBhZGRlZCwgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHRlbXBsYXRlIGlzIGFkZGVkIHRvIHRoZSBET00uXG4gKiAqIFdoZW4gYW4gaXRlbSBpcyByZW1vdmVkLCBpdHMgdGVtcGxhdGUgaW5zdGFuY2UgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00uXG4gKiAqIFdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCwgdGhlaXIgcmVzcGVjdGl2ZSB0ZW1wbGF0ZXMgYXJlIHJlb3JkZXJlZCBpbiB0aGUgRE9NLlxuICogKiBPdGhlcndpc2UsIHRoZSBET00gZWxlbWVudCBmb3IgdGhhdCBpdGVtIHdpbGwgcmVtYWluIHRoZSBzYW1lLlxuICpcbiAqIEFuZ3VsYXIgdXNlcyBvYmplY3QgaWRlbnRpdHkgdG8gdHJhY2sgaW5zZXJ0aW9ucyBhbmQgZGVsZXRpb25zIHdpdGhpbiB0aGUgaXRlcmF0b3IgYW5kIHJlcHJvZHVjZVxuICogdGhvc2UgY2hhbmdlcyBpbiB0aGUgRE9NLiBUaGlzIGhhcyBpbXBvcnRhbnQgaW1wbGljYXRpb25zIGZvciBhbmltYXRpb25zIGFuZCBhbnkgc3RhdGVmdWxcbiAqIGNvbnRyb2xzIChzdWNoIGFzIGA8aW5wdXQ+YCBlbGVtZW50cyB3aGljaCBhY2NlcHQgdXNlciBpbnB1dCkgdGhhdCBhcmUgcHJlc2VudC4gSW5zZXJ0ZWQgcm93cyBjYW5cbiAqIGJlIGFuaW1hdGVkIGluLCBkZWxldGVkIHJvd3MgY2FuIGJlIGFuaW1hdGVkIG91dCwgYW5kIHVuY2hhbmdlZCByb3dzIHJldGFpbiBhbnkgdW5zYXZlZCBzdGF0ZVxuICogc3VjaCBhcyB1c2VyIGlucHV0LlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgaWRlbnRpdGllcyBvZiBlbGVtZW50cyBpbiB0aGUgaXRlcmF0b3IgdG8gY2hhbmdlIHdoaWxlIHRoZSBkYXRhIGRvZXMgbm90LlxuICogVGhpcyBjYW4gaGFwcGVuLCBmb3IgZXhhbXBsZSwgaWYgdGhlIGl0ZXJhdG9yIHByb2R1Y2VkIGZyb20gYW4gUlBDIHRvIHRoZSBzZXJ2ZXIsIGFuZCB0aGF0XG4gKiBSUEMgaXMgcmUtcnVuLiBFdmVuIGlmIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCB0aGUgc2Vjb25kIHJlc3BvbnNlIHdpbGwgcHJvZHVjZSBvYmplY3RzIHdpdGhcbiAqIGRpZmZlcmVudCBpZGVudGl0aWVzLCBhbmQgQW5ndWxhciB3aWxsIHRlYXIgZG93biB0aGUgZW50aXJlIERPTSBhbmQgcmVidWlsZCBpdCAoYXMgaWYgYWxsIG9sZFxuICogZWxlbWVudHMgd2VyZSBkZWxldGVkIGFuZCBhbGwgbmV3IGVsZW1lbnRzIGluc2VydGVkKS4gVGhpcyBpcyBhbiBleHBlbnNpdmUgb3BlcmF0aW9uIGFuZCBzaG91bGRcbiAqIGJlIGF2b2lkZWQgaWYgcG9zc2libGUuXG4gKlxuICogVG8gY3VzdG9taXplIHRoZSBkZWZhdWx0IHRyYWNraW5nIGFsZ29yaXRobSwgYE5nRm9yT2ZgIHN1cHBvcnRzIGB0cmFja0J5YCBvcHRpb24uXG4gKiBgdHJhY2tCeWAgdGFrZXMgYSBmdW5jdGlvbiB3aGljaCBoYXMgdHdvIGFyZ3VtZW50czogYGluZGV4YCBhbmQgYGl0ZW1gLlxuICogSWYgYHRyYWNrQnlgIGlzIGdpdmVuLCBBbmd1bGFyIHRyYWNrcyBjaGFuZ2VzIGJ5IHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uLlxuICpcbiAqICMjIyBTeW50YXhcbiAqXG4gKiAtIGA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGluZGV4IGFzIGk7IHRyYWNrQnk6IHRyYWNrQnlGblwiPi4uLjwvbGk+YFxuICogLSBgPGxpIHRlbXBsYXRlPVwibmdGb3IgbGV0IGl0ZW0gb2YgaXRlbXM7IGluZGV4IGFzIGk7IHRyYWNrQnk6IHRyYWNrQnlGblwiPi4uLjwvbGk+YFxuICpcbiAqIFdpdGggYDxuZy10ZW1wbGF0ZT5gIGVsZW1lbnQ6XG4gKlxuICogYGBgXG4gKiA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIiBsZXQtaT1cImluZGV4XCIgW25nRm9yVHJhY2tCeV09XCJ0cmFja0J5Rm5cIj5cbiAqICAgPGxpPi4uLjwvbGk+XG4gKiA8L25nLXRlbXBsYXRlPlxuICogYGBgXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBTZWUgYSBbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9LVnVYeERwMHFpbkdEeW8zMDdRVz9wPXByZXZpZXcpIGZvciBhIG1vcmUgZGV0YWlsZWRcbiAqIGV4YW1wbGUuXG4gKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBOZ0Zvck9mID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IF92aWV3Q29udGFpbmVyXG4gICAgICogQHBhcmFtIHs/fSBfdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0gez99IF9kaWZmZXJzXG4gICAgICovXG4gICAgZnVuY3Rpb24gTmdGb3JPZihfdmlld0NvbnRhaW5lciwgX3RlbXBsYXRlLCBfZGlmZmVycykge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyID0gX3ZpZXdDb250YWluZXI7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gX3RlbXBsYXRlO1xuICAgICAgICB0aGlzLl9kaWZmZXJzID0gX2RpZmZlcnM7XG4gICAgICAgIHRoaXMuX2RpZmZlciA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOZ0Zvck9mLnByb3RvdHlwZSwgXCJuZ0ZvclRyYWNrQnlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fdHJhY2tCeUZuOyB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBmblxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSAmJiBmbiAhPSBudWxsICYmIHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE8odmljYik6IHVzZSBhIGxvZyBzZXJ2aWNlIG9uY2UgdGhlcmUgaXMgYSBwdWJsaWMgb25lIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgIGlmICgoY29uc29sZSkgJiYgKGNvbnNvbGUud2FybikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidHJhY2tCeSBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCByZWNlaXZlZCBcIiArIEpTT04uc3RyaW5naWZ5KGZuKSArIFwiLiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNlZSBodHRwczovL2FuZ3VsYXIuaW8vZG9jcy90cy9sYXRlc3QvYXBpL2NvbW1vbi9pbmRleC9OZ0Zvci1kaXJlY3RpdmUuaHRtbCMhI2NoYW5nZS1wcm9wYWdhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJhY2tCeUZuID0gZm47XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOZ0Zvck9mLnByb3RvdHlwZSwgXCJuZ0ZvclRlbXBsYXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBUT0RPKFRTMi4xKTogbWFrZSBUZW1wbGF0ZVJlZjxQYXJ0aWFsPE5nRm9yUm93T2Y8VD4+PiBvbmNlIHdlIG1vdmUgdG8gVFMgdjIuMVxuICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgdHlwZSBpcyB0b28gcmVzdHJpY3RpdmU7IGEgdGVtcGxhdGUgdGhhdCBqdXN0IHVzZXMgaW5kZXgsIGZvciBleGFtcGxlLFxuICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGFjY2VwdGFibGUuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nRm9yT2YucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCduZ0Zvck9mJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBSZWFjdCBvbiBuZ0Zvck9mIGNoYW5nZXMgb25seSBvbmNlIGFsbCBpbnB1dHMgaGF2ZSBiZWVuIGluaXRpYWxpemVkXG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB2YWx1ZSA9IGNoYW5nZXNbJ25nRm9yT2YnXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpZmZlciAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZCh2YWx1ZSkuY3JlYXRlKHRoaXMubmdGb3JUcmFja0J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgYSBkaWZmZXIgc3VwcG9ydGluZyBvYmplY3QgJ1wiICsgdmFsdWUgKyBcIicgb2YgdHlwZSAnXCIgKyBnZXRUeXBlTmFtZUZvckRlYnVnZ2luZyh2YWx1ZSkgKyBcIicuIE5nRm9yIG9ubHkgc3VwcG9ydHMgYmluZGluZyB0byBJdGVyYWJsZXMgc3VjaCBhcyBBcnJheXMuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ0Zvck9mLnByb3RvdHlwZS5uZ0RvQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIpIHtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLm5nRm9yT2YpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nRm9yT2YucHJvdG90eXBlLl9hcHBseUNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBpbnNlcnRUdXBsZXMgPSBbXTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKGZ1bmN0aW9uIChpdGVtLCBhZGp1c3RlZFByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdmlldyA9IF90aGlzLl92aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhfdGhpcy5fdGVtcGxhdGUsIG5ldyBOZ0Zvck9mQ29udGV4dCgvKiogQHR5cGUgez99ICovICgobnVsbCkpLCBfdGhpcy5uZ0Zvck9mLCAtMSwgLTEpLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHR1cGxlID0gbmV3IFJlY29yZFZpZXdUdXBsZShpdGVtLCB2aWV3KTtcbiAgICAgICAgICAgICAgICBpbnNlcnRUdXBsZXMucHVzaCh0dXBsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl92aWV3Q29udGFpbmVyLnJlbW92ZShhZGp1c3RlZFByZXZpb3VzSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdmlldyA9ICgoX3RoaXMuX3ZpZXdDb250YWluZXIuZ2V0KGFkanVzdGVkUHJldmlvdXNJbmRleCkpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdmlld0NvbnRhaW5lci5tb3ZlKHZpZXcsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdHVwbGUgPSBuZXcgUmVjb3JkVmlld1R1cGxlKGl0ZW0sIC8qKiBAdHlwZSB7P30gKi8gKHZpZXcpKTtcbiAgICAgICAgICAgICAgICBpbnNlcnRUdXBsZXMucHVzaCh0dXBsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKHZhciAvKiogQHR5cGUgez99ICovIGkgPSAwOyBpIDwgaW5zZXJ0VHVwbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wZXJWaWV3Q2hhbmdlKGluc2VydFR1cGxlc1tpXS52aWV3LCBpbnNlcnRUdXBsZXNbaV0ucmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciAvKiogQHR5cGUgez99ICovIGkgPSAwLCAvKiogQHR5cGUgez99ICovIGlsZW4gPSB0aGlzLl92aWV3Q29udGFpbmVyLmxlbmd0aDsgaSA8IGlsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdmlld1JlZiA9ICh0aGlzLl92aWV3Q29udGFpbmVyLmdldChpKSk7XG4gICAgICAgICAgICB2aWV3UmVmLmNvbnRleHQuaW5kZXggPSBpO1xuICAgICAgICAgICAgdmlld1JlZi5jb250ZXh0LmNvdW50ID0gaWxlbjtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJZGVudGl0eUNoYW5nZShmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB2aWV3UmVmID0gKF90aGlzLl92aWV3Q29udGFpbmVyLmdldChyZWNvcmQuY3VycmVudEluZGV4KSk7XG4gICAgICAgICAgICB2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0ID0gcmVjb3JkLml0ZW07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2aWV3XG4gICAgICogQHBhcmFtIHs/fSByZWNvcmRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nRm9yT2YucHJvdG90eXBlLl9wZXJWaWV3Q2hhbmdlID0gZnVuY3Rpb24gKHZpZXcsIHJlY29yZCkge1xuICAgICAgICB2aWV3LmNvbnRleHQuJGltcGxpY2l0ID0gcmVjb3JkLml0ZW07XG4gICAgfTtcbiAgICByZXR1cm4gTmdGb3JPZjtcbn0oKSk7XG5OZ0Zvck9mLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7IHNlbGVjdG9yOiAnW25nRm9yXVtuZ0Zvck9mXScgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5OZ0Zvck9mLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogVmlld0NvbnRhaW5lclJlZiwgfSxcbiAgICB7IHR5cGU6IFRlbXBsYXRlUmVmLCB9LFxuICAgIHsgdHlwZTogSXRlcmFibGVEaWZmZXJzLCB9LFxuXTsgfTtcbk5nRm9yT2YucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ25nRm9yT2YnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ25nRm9yVHJhY2tCeSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbmdGb3JUZW1wbGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG52YXIgUmVjb3JkVmlld1R1cGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHJlY29yZFxuICAgICAqIEBwYXJhbSB7P30gdmlld1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlY29yZFZpZXdUdXBsZShyZWNvcmQsIHZpZXcpIHtcbiAgICAgICAgdGhpcy5yZWNvcmQgPSByZWNvcmQ7XG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgfVxuICAgIHJldHVybiBSZWNvcmRWaWV3VHVwbGU7XG59KCkpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCBmcm9tIHY0LjAuMCAtIFVzZSBOZ0Zvck9mIGluc3RlYWQuXG4gKi9cbnZhciBOZ0ZvciA9IE5nRm9yT2Y7XG4vKipcbiAqIEBwYXJhbSB7P30gdHlwZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZSkge1xuICAgIHJldHVybiB0eXBlWyduYW1lJ10gfHwgdHlwZW9mIHR5cGU7XG59XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIENvbmRpdGlvbmFsbHkgaW5jbHVkZXMgYSB0ZW1wbGF0ZSBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgYW4gYGV4cHJlc3Npb25gLlxuICpcbiAqIGBuZ0lmYCBldmFsdWF0ZXMgdGhlIGBleHByZXNzaW9uYCBhbmQgdGhlbiByZW5kZXJzIHRoZSBgdGhlbmAgb3IgYGVsc2VgIHRlbXBsYXRlIGluIGl0cyBwbGFjZVxuICogd2hlbiBleHByZXNzaW9uIGlzIHRydXRoeSBvciBmYWxzeSByZXNwZWN0aXZlbHkuIFR5cGljYWxseSB0aGU6XG4gKiAgLSBgdGhlbmAgdGVtcGxhdGUgaXMgdGhlIGlubGluZSB0ZW1wbGF0ZSBvZiBgbmdJZmAgdW5sZXNzIGJvdW5kIHRvIGEgZGlmZmVyZW50IHZhbHVlLlxuICogIC0gYGVsc2VgIHRlbXBsYXRlIGlzIGJsYW5rIHVubGVzcyBpdCBpcyBib3VuZC5cbiAqXG4gKiAjIyBNb3N0IGNvbW1vbiB1c2FnZVxuICpcbiAqIFRoZSBtb3N0IGNvbW1vbiB1c2FnZSBvZiB0aGUgYG5nSWZgIGRpcmVjdGl2ZSBpcyB0byBjb25kaXRpb25hbGx5IHNob3cgdGhlIGlubGluZSB0ZW1wbGF0ZSBhc1xuICogc2VlbiBpbiB0aGlzIGV4YW1wbGU6XG4gKiB7XFxAZXhhbXBsZSBjb21tb24vbmdJZi90cy9tb2R1bGUudHMgcmVnaW9uPSdOZ0lmU2ltcGxlJ31cbiAqXG4gKiAjIyBTaG93aW5nIGFuIGFsdGVybmF0aXZlIHRlbXBsYXRlIHVzaW5nIGBlbHNlYFxuICpcbiAqIElmIGl0IGlzIG5lY2Vzc2FyeSB0byBkaXNwbGF5IGEgdGVtcGxhdGUgd2hlbiB0aGUgYGV4cHJlc3Npb25gIGlzIGZhbHN5IHVzZSB0aGUgYGVsc2VgIHRlbXBsYXRlXG4gKiBiaW5kaW5nIGFzIHNob3duLiBOb3RlIHRoYXQgdGhlIGBlbHNlYCBiaW5kaW5nIHBvaW50cyB0byBhIGA8bmctdGVtcGxhdGU+YCBsYWJlbGVkIGAjZWxzZUJsb2NrYC5cbiAqIFRoZSB0ZW1wbGF0ZSBjYW4gYmUgZGVmaW5lZCBhbnl3aGVyZSBpbiB0aGUgY29tcG9uZW50IHZpZXcgYnV0IGlzIHR5cGljYWxseSBwbGFjZWQgcmlnaHQgYWZ0ZXJcbiAqIGBuZ0lmYCBmb3IgcmVhZGFiaWxpdHkuXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL25nSWYvdHMvbW9kdWxlLnRzIHJlZ2lvbj0nTmdJZkVsc2UnfVxuICpcbiAqICMjIFVzaW5nIG5vbi1pbmxpbmVkIGB0aGVuYCB0ZW1wbGF0ZVxuICpcbiAqIFVzdWFsbHkgdGhlIGB0aGVuYCB0ZW1wbGF0ZSBpcyB0aGUgaW5saW5lZCB0ZW1wbGF0ZSBvZiB0aGUgYG5nSWZgLCBidXQgaXQgY2FuIGJlIGNoYW5nZWQgdXNpbmdcbiAqIGEgYmluZGluZyAoanVzdCBsaWtlIGBlbHNlYCkuIEJlY2F1c2UgYHRoZW5gIGFuZCBgZWxzZWAgYXJlIGJpbmRpbmdzLCB0aGUgdGVtcGxhdGUgcmVmZXJlbmNlcyBjYW5cbiAqIGNoYW5nZSBhdCBydW50aW1lIGFzIHNob3duIGluIHRoaXMgZXhhbXBsZS5cbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vbmdJZi90cy9tb2R1bGUudHMgcmVnaW9uPSdOZ0lmVGhlbkVsc2UnfVxuICpcbiAqICMjIFN0b3JpbmcgY29uZGl0aW9uYWwgcmVzdWx0IGluIGEgdmFyaWFibGVcbiAqXG4gKiBBIGNvbW1vbiBwYXR0ZXJuIGlzIHRoYXQgd2UgbmVlZCB0byBzaG93IGEgc2V0IG9mIHByb3BlcnRpZXMgZnJvbSB0aGUgc2FtZSBvYmplY3QuIElmIHRoZVxuICogb2JqZWN0IGlzIHVuZGVmaW5lZCwgdGhlbiB3ZSBoYXZlIHRvIHVzZSB0aGUgc2FmZS10cmF2ZXJzYWwtb3BlcmF0b3IgYD8uYCB0byBndWFyZCBhZ2FpbnN0XG4gKiBkZXJlZmVyZW5jaW5nIGEgYG51bGxgIHZhbHVlLiBUaGlzIGlzIGVzcGVjaWFsbHkgdGhlIGNhc2Ugd2hlbiB3YWl0aW5nIG9uIGFzeW5jIGRhdGEgc3VjaCBhc1xuICogd2hlbiB1c2luZyB0aGUgYGFzeW5jYCBwaXBlIGFzIHNob3duIGluIGZvbGxvd2luZyBleGFtcGxlOlxuICpcbiAqIGBgYFxuICogSGVsbG8ge3sgKHVzZXJTdHJlYW18YXN5bmMpPy5sYXN0IH19LCB7eyAodXNlclN0cmVhbXxhc3luYyk/LmZpcnN0IH19IVxuICogYGBgXG4gKlxuICogVGhlcmUgYXJlIHNldmVyYWwgaW5lZmZpY2llbmNpZXMgaW4gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKiAgLSBXZSBjcmVhdGUgbXVsdGlwbGUgc3Vic2NyaXB0aW9ucyBvbiBgdXNlclN0cmVhbWAuIE9uZSBmb3IgZWFjaCBgYXN5bmNgIHBpcGUsIG9yIHR3byBpbiB0aGVcbiAqICAgIGV4YW1wbGUgYWJvdmUuXG4gKiAgLSBXZSBjYW5ub3QgZGlzcGxheSBhbiBhbHRlcm5hdGl2ZSBzY3JlZW4gd2hpbGUgd2FpdGluZyBmb3IgdGhlIGRhdGEgdG8gYXJyaXZlIGFzeW5jaHJvbm91c2x5LlxuICogIC0gV2UgaGF2ZSB0byB1c2UgdGhlIHNhZmUtdHJhdmVyc2FsLW9wZXJhdG9yIGA/LmAgdG8gYWNjZXNzIHByb3BlcnRpZXMsIHdoaWNoIGlzIGN1bWJlcnNvbWUuXG4gKiAgLSBXZSBoYXZlIHRvIHBsYWNlIHRoZSBgYXN5bmNgIHBpcGUgaW4gcGFyZW50aGVzaXMuXG4gKlxuICogQSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMgaXMgdG8gdXNlIGBuZ0lmYCBhbmQgc3RvcmUgdGhlIHJlc3VsdCBvZiB0aGUgY29uZGl0aW9uIGluIGEgbG9jYWxcbiAqIHZhcmlhYmxlIGFzIHNob3duIGluIHRoZSB0aGUgZXhhbXBsZSBiZWxvdzpcbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vbmdJZi90cy9tb2R1bGUudHMgcmVnaW9uPSdOZ0lmQXMnfVxuICpcbiAqIE5vdGljZSB0aGF0OlxuICogIC0gV2UgdXNlIG9ubHkgb25lIGBhc3luY2AgcGlwZSBhbmQgaGVuY2Ugb25seSBvbmUgc3Vic2NyaXB0aW9uIGdldHMgY3JlYXRlZC5cbiAqICAtIGBuZ0lmYCBzdG9yZXMgdGhlIHJlc3VsdCBvZiB0aGUgYHVzZXJTdHJlYW18YXN5bmNgIGluIHRoZSBsb2NhbCB2YXJpYWJsZSBgdXNlcmAuXG4gKiAgLSBUaGUgbG9jYWwgYHVzZXJgIGNhbiB0aGVuIGJlIGJvdW5kIHJlcGVhdGVkbHkgaW4gYSBtb3JlIGVmZmljaWVudCB3YXkuXG4gKiAgLSBObyBuZWVkIHRvIHVzZSB0aGUgc2FmZS10cmF2ZXJzYWwtb3BlcmF0b3IgYD8uYCB0byBhY2Nlc3MgcHJvcGVydGllcyBhcyBgbmdJZmAgd2lsbCBvbmx5XG4gKiAgICBkaXNwbGF5IHRoZSBkYXRhIGlmIGB1c2VyU3RyZWFtYCByZXR1cm5zIGEgdmFsdWUuXG4gKiAgLSBXZSBjYW4gZGlzcGxheSBhbiBhbHRlcm5hdGl2ZSB0ZW1wbGF0ZSB3aGlsZSB3YWl0aW5nIGZvciB0aGUgZGF0YS5cbiAqXG4gKiAjIyMgU3ludGF4XG4gKlxuICogU2ltcGxlIGZvcm06XG4gKiAtIGA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uXCI+Li4uPC9kaXY+YFxuICogLSBgPGRpdiB0ZW1wbGF0ZT1cIm5nSWYgY29uZGl0aW9uXCI+Li4uPC9kaXY+YFxuICogLSBgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbmRpdGlvblwiPjxkaXY+Li4uPC9kaXY+PC9uZy10ZW1wbGF0ZT5gXG4gKlxuICogRm9ybSB3aXRoIGFuIGVsc2UgYmxvY2s6XG4gKiBgYGBcbiAqIDxkaXYgKm5nSWY9XCJjb25kaXRpb247IGVsc2UgZWxzZUJsb2NrXCI+Li4uPC9kaXY+XG4gKiA8bmctdGVtcGxhdGUgI2Vsc2VCbG9jaz4uLi48L25nLXRlbXBsYXRlPlxuICogYGBgXG4gKlxuICogRm9ybSB3aXRoIGEgYHRoZW5gIGFuZCBgZWxzZWAgYmxvY2s6XG4gKiBgYGBcbiAqIDxkaXYgKm5nSWY9XCJjb25kaXRpb247IHRoZW4gdGhlbkJsb2NrIGVsc2UgZWxzZUJsb2NrXCI+PC9kaXY+XG4gKiA8bmctdGVtcGxhdGUgI3RoZW5CbG9jaz4uLi48L25nLXRlbXBsYXRlPlxuICogPG5nLXRlbXBsYXRlICNlbHNlQmxvY2s+Li4uPC9uZy10ZW1wbGF0ZT5cbiAqIGBgYFxuICpcbiAqIEZvcm0gd2l0aCBzdG9yaW5nIHRoZSB2YWx1ZSBsb2NhbGx5OlxuICogYGBgXG4gKiA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uIGFzIHZhbHVlOyBlbHNlIGVsc2VCbG9ja1wiPnt7dmFsdWV9fTwvZGl2PlxuICogPG5nLXRlbXBsYXRlICNlbHNlQmxvY2s+Li4uPC9uZy10ZW1wbGF0ZT5cbiAqIGBgYFxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgTmdJZiA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBfdmlld0NvbnRhaW5lclxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVSZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOZ0lmKF92aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZikge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyID0gX3ZpZXdDb250YWluZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgTmdJZkNvbnRleHQoKTtcbiAgICAgICAgdGhpcy5fdGhlblRlbXBsYXRlUmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZWxzZVRlbXBsYXRlUmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGhlblZpZXdSZWYgPSBudWxsO1xuICAgICAgICB0aGlzLl9lbHNlVmlld1JlZiA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RoZW5UZW1wbGF0ZVJlZiA9IHRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmdJZi5wcm90b3R5cGUsIFwibmdJZlwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IGNvbmRpdGlvblxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LiRpbXBsaWNpdCA9IHRoaXMuX2NvbnRleHQubmdJZiA9IGNvbmRpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nSWYucHJvdG90eXBlLCBcIm5nSWZUaGVuXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVSZWZcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICB0aGlzLl90aGVuVGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcbiAgICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gbnVsbDsgLy8gY2xlYXIgcHJldmlvdXMgdmlldyBpZiBhbnkuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOZ0lmLnByb3RvdHlwZSwgXCJuZ0lmRWxzZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IHRlbXBsYXRlUmVmXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgdGhpcy5fZWxzZVRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XG4gICAgICAgICAgICB0aGlzLl9lbHNlVmlld1JlZiA9IG51bGw7IC8vIGNsZWFyIHByZXZpb3VzIHZpZXcgaWYgYW55LlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nSWYucHJvdG90eXBlLl91cGRhdGVWaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdGhlblZpZXdSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxzZVZpZXdSZWYgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90aGVuVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGhlblZpZXdSZWYgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGhlblRlbXBsYXRlUmVmLCB0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Vsc2VWaWV3UmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RoZW5WaWV3UmVmID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxzZVRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vsc2VWaWV3UmVmID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX2Vsc2VUZW1wbGF0ZVJlZiwgdGhpcy5fY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTmdJZjtcbn0oKSk7XG5OZ0lmLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7IHNlbGVjdG9yOiAnW25nSWZdJyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbk5nSWYuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBWaWV3Q29udGFpbmVyUmVmLCB9LFxuICAgIHsgdHlwZTogVGVtcGxhdGVSZWYsIH0sXG5dOyB9O1xuTmdJZi5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbmdJZic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbmdJZlRoZW4nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ25nSWZFbHNlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBOZ0lmQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmdJZkNvbnRleHQoKSB7XG4gICAgICAgIHRoaXMuJGltcGxpY2l0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZ0lmID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIE5nSWZDb250ZXh0O1xufSgpKTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbnZhciBTd2l0Y2hWaWV3ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IF92aWV3Q29udGFpbmVyUmVmXG4gICAgICogQHBhcmFtIHs/fSBfdGVtcGxhdGVSZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTd2l0Y2hWaWV3KF92aWV3Q29udGFpbmVyUmVmLCBfdGVtcGxhdGVSZWYpIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IF92aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZVJlZiA9IF90ZW1wbGF0ZVJlZjtcbiAgICAgICAgdGhpcy5fY3JlYXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFN3aXRjaFZpZXcucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgU3dpdGNoVmlldy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFN3aXRjaFZpZXcucHJvdG90eXBlLmVuZm9yY2VTdGF0ZSA9IGZ1bmN0aW9uIChjcmVhdGVkKSB7XG4gICAgICAgIGlmIChjcmVhdGVkICYmICF0aGlzLl9jcmVhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFjcmVhdGVkICYmIHRoaXMuX2NyZWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3dpdGNoVmlldztcbn0oKSk7XG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIFxcQHdoYXRJdERvZXMgQWRkcyAvIHJlbW92ZXMgRE9NIHN1Yi10cmVlcyB3aGVuIHRoZSBuZXN0IG1hdGNoIGV4cHJlc3Npb25zIG1hdGNoZXMgdGhlIHN3aXRjaFxuICogICAgICAgICAgICAgZXhwcmVzc2lvbi5cbiAqXG4gKiBcXEBob3dUb1VzZVxuICogYGBgXG4gKiAgICAgPGNvbnRhaW5lci1lbGVtZW50IFtuZ1N3aXRjaF09XCJzd2l0Y2hfZXhwcmVzc2lvblwiPlxuICogICAgICAgPHNvbWUtZWxlbWVudCAqbmdTd2l0Y2hDYXNlPVwibWF0Y2hfZXhwcmVzc2lvbl8xXCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiAgICAgICA8c29tZS1lbGVtZW50ICpuZ1N3aXRjaENhc2U9XCJtYXRjaF9leHByZXNzaW9uXzJcIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqICAgICAgIDxzb21lLW90aGVyLWVsZW1lbnQgKm5nU3dpdGNoQ2FzZT1cIm1hdGNoX2V4cHJlc3Npb25fM1wiPi4uLjwvc29tZS1vdGhlci1lbGVtZW50PlxuICogICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwibWF0Y2hfZXhwcmVzc2lvbl8zXCI+XG4gKiAgICAgICAgIDwhLS0gdXNlIGEgbmctY29udGFpbmVyIHRvIGdyb3VwIG11bHRpcGxlIHJvb3Qgbm9kZXMgLS0+XG4gKiAgICAgICAgIDxpbm5lci1lbGVtZW50PjwvaW5uZXItZWxlbWVudD5cbiAqICAgICAgICAgPGlubmVyLW90aGVyLWVsZW1lbnQ+PC9pbm5lci1vdGhlci1lbGVtZW50PlxuICogICAgICAgPC9uZy1jb250YWluZXI+XG4gKiAgICAgICA8c29tZS1lbGVtZW50ICpuZ1N3aXRjaERlZmF1bHQ+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiAgICAgPC9jb250YWluZXItZWxlbWVudD5cbiAqIGBgYFxuICogXFxAZGVzY3JpcHRpb25cbiAqXG4gKiBgTmdTd2l0Y2hgIHN0YW1wcyBvdXQgbmVzdGVkIHZpZXdzIHdoZW4gdGhlaXIgbWF0Y2ggZXhwcmVzc2lvbiB2YWx1ZSBtYXRjaGVzIHRoZSB2YWx1ZSBvZiB0aGVcbiAqIHN3aXRjaCBleHByZXNzaW9uLlxuICpcbiAqIEluIG90aGVyIHdvcmRzOlxuICogLSB5b3UgZGVmaW5lIGEgY29udGFpbmVyIGVsZW1lbnQgKHdoZXJlIHlvdSBwbGFjZSB0aGUgZGlyZWN0aXZlIHdpdGggYSBzd2l0Y2ggZXhwcmVzc2lvbiBvbiB0aGVcbiAqIGBbbmdTd2l0Y2hdPVwiLi4uXCJgIGF0dHJpYnV0ZSlcbiAqIC0geW91IGRlZmluZSBpbm5lciB2aWV3cyBpbnNpZGUgdGhlIGBOZ1N3aXRjaGAgYW5kIHBsYWNlIGEgYCpuZ1N3aXRjaENhc2VgIGF0dHJpYnV0ZSBvbiB0aGUgdmlld1xuICogcm9vdCBlbGVtZW50cy5cbiAqXG4gKiBFbGVtZW50cyB3aXRoaW4gYE5nU3dpdGNoYCBidXQgb3V0c2lkZSBvZiBhIGBOZ1N3aXRjaENhc2VgIG9yIGBOZ1N3aXRjaERlZmF1bHRgIGRpcmVjdGl2ZXMgd2lsbFxuICogYmUgcHJlc2VydmVkIGF0IHRoZSBsb2NhdGlvbi5cbiAqXG4gKiBUaGUgYG5nU3dpdGNoQ2FzZWAgZGlyZWN0aXZlIGluZm9ybXMgdGhlIHBhcmVudCBgTmdTd2l0Y2hgIG9mIHdoaWNoIHZpZXcgdG8gZGlzcGxheSB3aGVuIHRoZVxuICogZXhwcmVzc2lvbiBpcyBldmFsdWF0ZWQuXG4gKiBXaGVuIG5vIG1hdGNoaW5nIGV4cHJlc3Npb24gaXMgZm91bmQgb24gYSBgbmdTd2l0Y2hDYXNlYCB2aWV3LCB0aGUgYG5nU3dpdGNoRGVmYXVsdGAgdmlldyBpc1xuICogc3RhbXBlZCBvdXQuXG4gKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBOZ1N3aXRjaCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmdTd2l0Y2goKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRVc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nhc2VDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RDYXNlQ2hlY2tJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RDYXNlc01hdGNoZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nU3dpdGNoLnByb3RvdHlwZSwgXCJuZ1N3aXRjaFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IG5ld1ZhbHVlXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbmdTd2l0Y2ggPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYXNlQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEZWZhdWx0Q2FzZXModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFxcQGludGVybmFsXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1N3aXRjaC5wcm90b3R5cGUuX2FkZENhc2UgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9jYXNlQ291bnQrKzsgfTtcbiAgICAvKipcbiAgICAgKiBcXEBpbnRlcm5hbFxuICAgICAqIEBwYXJhbSB7P30gdmlld1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdTd2l0Y2gucHJvdG90eXBlLl9hZGREZWZhdWx0ID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kZWZhdWx0Vmlld3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRWaWV3cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RlZmF1bHRWaWV3cy5wdXNoKHZpZXcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogXFxAaW50ZXJuYWxcbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1N3aXRjaC5wcm90b3R5cGUuX21hdGNoQ2FzZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBtYXRjaGVkID0gdmFsdWUgPT0gdGhpcy5fbmdTd2l0Y2g7XG4gICAgICAgIHRoaXMuX2xhc3RDYXNlc01hdGNoZWQgPSB0aGlzLl9sYXN0Q2FzZXNNYXRjaGVkIHx8IG1hdGNoZWQ7XG4gICAgICAgIHRoaXMuX2xhc3RDYXNlQ2hlY2tJbmRleCsrO1xuICAgICAgICBpZiAodGhpcy5fbGFzdENhc2VDaGVja0luZGV4ID09PSB0aGlzLl9jYXNlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURlZmF1bHRDYXNlcyghdGhpcy5fbGFzdENhc2VzTWF0Y2hlZCk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2FzZUNoZWNrSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5fbGFzdENhc2VzTWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB1c2VEZWZhdWx0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1N3aXRjaC5wcm90b3R5cGUuX3VwZGF0ZURlZmF1bHRDYXNlcyA9IGZ1bmN0aW9uICh1c2VEZWZhdWx0KSB7XG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Vmlld3MgJiYgdXNlRGVmYXVsdCAhPT0gdGhpcy5fZGVmYXVsdFVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRVc2VkID0gdXNlRGVmYXVsdDtcbiAgICAgICAgICAgIGZvciAodmFyIC8qKiBAdHlwZSB7P30gKi8gaSA9IDA7IGkgPCB0aGlzLl9kZWZhdWx0Vmlld3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBkZWZhdWx0VmlldyA9IHRoaXMuX2RlZmF1bHRWaWV3c1tpXTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0Vmlldy5lbmZvcmNlU3RhdGUodXNlRGVmYXVsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBOZ1N3aXRjaDtcbn0oKSk7XG5OZ1N3aXRjaC5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ1tuZ1N3aXRjaF0nIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuTmdTd2l0Y2guY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbk5nU3dpdGNoLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICduZ1N3aXRjaCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIFxcQHdoYXRJdERvZXMgQ3JlYXRlcyBhIHZpZXcgdGhhdCB3aWxsIGJlIGFkZGVkL3JlbW92ZWQgZnJvbSB0aGUgcGFyZW50IHtcXEBsaW5rIE5nU3dpdGNofSB3aGVuIHRoZVxuICogICAgICAgICAgICAgZ2l2ZW4gZXhwcmVzc2lvbiBldmFsdWF0ZSB0byByZXNwZWN0aXZlbHkgdGhlIHNhbWUvZGlmZmVyZW50IHZhbHVlIGFzIHRoZSBzd2l0Y2hcbiAqICAgICAgICAgICAgIGV4cHJlc3Npb24uXG4gKlxuICogXFxAaG93VG9Vc2VcbiAqIGBgYFxuICogPGNvbnRhaW5lci1lbGVtZW50IFtuZ1N3aXRjaF09XCJzd2l0Y2hfZXhwcmVzc2lvblwiPlxuICogICA8c29tZS1lbGVtZW50ICpuZ1N3aXRjaENhc2U9XCJtYXRjaF9leHByZXNzaW9uXzFcIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqIDwvY29udGFpbmVyLWVsZW1lbnQ+XG4gKiBgYGBcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogSW5zZXJ0IHRoZSBzdWItdHJlZSB3aGVuIHRoZSBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgZW5jbG9zaW5nIHN3aXRjaFxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBJZiBtdWx0aXBsZSBtYXRjaCBleHByZXNzaW9ucyBtYXRjaCB0aGUgc3dpdGNoIGV4cHJlc3Npb24gdmFsdWUsIGFsbCBvZiB0aGVtIGFyZSBkaXNwbGF5ZWQuXG4gKlxuICogU2VlIHtcXEBsaW5rIE5nU3dpdGNofSBmb3IgbW9yZSBkZXRhaWxzIGFuZCBleGFtcGxlLlxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgTmdTd2l0Y2hDYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHZpZXdDb250YWluZXJcbiAgICAgKiBAcGFyYW0gez99IHRlbXBsYXRlUmVmXG4gICAgICogQHBhcmFtIHs/fSBuZ1N3aXRjaFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE5nU3dpdGNoQ2FzZSh2aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZiwgbmdTd2l0Y2gpIHtcbiAgICAgICAgdGhpcy5uZ1N3aXRjaCA9IG5nU3dpdGNoO1xuICAgICAgICBuZ1N3aXRjaC5fYWRkQ2FzZSgpO1xuICAgICAgICB0aGlzLl92aWV3ID0gbmV3IFN3aXRjaFZpZXcodmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nU3dpdGNoQ2FzZS5wcm90b3R5cGUubmdEb0NoZWNrID0gZnVuY3Rpb24gKCkgeyB0aGlzLl92aWV3LmVuZm9yY2VTdGF0ZSh0aGlzLm5nU3dpdGNoLl9tYXRjaENhc2UodGhpcy5uZ1N3aXRjaENhc2UpKTsgfTtcbiAgICByZXR1cm4gTmdTd2l0Y2hDYXNlO1xufSgpKTtcbk5nU3dpdGNoQ2FzZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ1tuZ1N3aXRjaENhc2VdJyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbk5nU3dpdGNoQ2FzZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFZpZXdDb250YWluZXJSZWYsIH0sXG4gICAgeyB0eXBlOiBUZW1wbGF0ZVJlZiwgfSxcbiAgICB7IHR5cGU6IE5nU3dpdGNoLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBIb3N0IH0sXSB9LFxuXTsgfTtcbk5nU3dpdGNoQ2FzZS5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbmdTd2l0Y2hDYXNlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBcXEB3aGF0SXREb2VzIENyZWF0ZXMgYSB2aWV3IHRoYXQgaXMgYWRkZWQgdG8gdGhlIHBhcmVudCB7XFxAbGluayBOZ1N3aXRjaH0gd2hlbiBubyBjYXNlIGV4cHJlc3Npb25zXG4gKiBtYXRjaCB0aGVcbiAqICAgICAgICAgICAgIHN3aXRjaCBleHByZXNzaW9uLlxuICpcbiAqIFxcQGhvd1RvVXNlXG4gKiBgYGBcbiAqIDxjb250YWluZXItZWxlbWVudCBbbmdTd2l0Y2hdPVwic3dpdGNoX2V4cHJlc3Npb25cIj5cbiAqICAgPHNvbWUtZWxlbWVudCAqbmdTd2l0Y2hDYXNlPVwibWF0Y2hfZXhwcmVzc2lvbl8xXCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKiAgIDxzb21lLW90aGVyLWVsZW1lbnQgKm5nU3dpdGNoRGVmYXVsdD4uLi48L3NvbWUtb3RoZXItZWxlbWVudD5cbiAqIDwvY29udGFpbmVyLWVsZW1lbnQ+XG4gKiBgYGBcbiAqXG4gKiBcXEBkZXNjcmlwdGlvblxuICpcbiAqIEluc2VydCB0aGUgc3ViLXRyZWUgd2hlbiBubyBjYXNlIGV4cHJlc3Npb25zIGV2YWx1YXRlIHRvIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBlbmNsb3Npbmcgc3dpdGNoXG4gKiBleHByZXNzaW9uLlxuICpcbiAqIFNlZSB7XFxAbGluayBOZ1N3aXRjaH0gZm9yIG1vcmUgZGV0YWlscyBhbmQgZXhhbXBsZS5cbiAqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIE5nU3dpdGNoRGVmYXVsdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2aWV3Q29udGFpbmVyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVJlZlxuICAgICAqIEBwYXJhbSB7P30gbmdTd2l0Y2hcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOZ1N3aXRjaERlZmF1bHQodmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYsIG5nU3dpdGNoKSB7XG4gICAgICAgIG5nU3dpdGNoLl9hZGREZWZhdWx0KG5ldyBTd2l0Y2hWaWV3KHZpZXdDb250YWluZXIsIHRlbXBsYXRlUmVmKSk7XG4gICAgfVxuICAgIHJldHVybiBOZ1N3aXRjaERlZmF1bHQ7XG59KCkpO1xuTmdTd2l0Y2hEZWZhdWx0LmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7IHNlbGVjdG9yOiAnW25nU3dpdGNoRGVmYXVsdF0nIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuTmdTd2l0Y2hEZWZhdWx0LmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogVmlld0NvbnRhaW5lclJlZiwgfSxcbiAgICB7IHR5cGU6IFRlbXBsYXRlUmVmLCB9LFxuICAgIHsgdHlwZTogTmdTd2l0Y2gsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEhvc3QgfSxdIH0sXG5dOyB9O1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBcXEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqXG4gKiBcXEB3aGF0SXREb2VzIEFkZHMgLyByZW1vdmVzIERPTSBzdWItdHJlZXMgYmFzZWQgb24gYSBudW1lcmljIHZhbHVlLiBUYWlsb3JlZCBmb3IgcGx1cmFsaXphdGlvbi5cbiAqXG4gKiBcXEBob3dUb1VzZVxuICogYGBgXG4gKiA8c29tZS1lbGVtZW50IFtuZ1BsdXJhbF09XCJ2YWx1ZVwiPlxuICogICA8bmctdGVtcGxhdGUgbmdQbHVyYWxDYXNlPVwiPTBcIj50aGVyZSBpcyBub3RoaW5nPC9uZy10ZW1wbGF0ZT5cbiAqICAgPG5nLXRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIj0xXCI+dGhlcmUgaXMgb25lPC9uZy10ZW1wbGF0ZT5cbiAqICAgPG5nLXRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cImZld1wiPnRoZXJlIGFyZSBhIGZldzwvbmctdGVtcGxhdGU+XG4gKiA8L3NvbWUtZWxlbWVudD5cbiAqIGBgYFxuICpcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogRGlzcGxheXMgRE9NIHN1Yi10cmVlcyB0aGF0IG1hdGNoIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbiB2YWx1ZSwgb3IgZmFpbGluZyB0aGF0LCBET00gc3ViLXRyZWVzXG4gKiB0aGF0IG1hdGNoIHRoZSBzd2l0Y2ggZXhwcmVzc2lvbidzIHBsdXJhbGl6YXRpb24gY2F0ZWdvcnkuXG4gKlxuICogVG8gdXNlIHRoaXMgZGlyZWN0aXZlIHlvdSBtdXN0IHByb3ZpZGUgYSBjb250YWluZXIgZWxlbWVudCB0aGF0IHNldHMgdGhlIGBbbmdQbHVyYWxdYCBhdHRyaWJ1dGVcbiAqIHRvIGEgc3dpdGNoIGV4cHJlc3Npb24uIElubmVyIGVsZW1lbnRzIHdpdGggYSBgW25nUGx1cmFsQ2FzZV1gIHdpbGwgZGlzcGxheSBiYXNlZCBvbiB0aGVpclxuICogZXhwcmVzc2lvbjpcbiAqIC0gaWYgYFtuZ1BsdXJhbENhc2VdYCBpcyBzZXQgdG8gYSB2YWx1ZSBzdGFydGluZyB3aXRoIGA9YCwgaXQgd2lsbCBvbmx5IGRpc3BsYXkgaWYgdGhlIHZhbHVlXG4gKiAgIG1hdGNoZXMgdGhlIHN3aXRjaCBleHByZXNzaW9uIGV4YWN0bHksXG4gKiAtIG90aGVyd2lzZSwgdGhlIHZpZXcgd2lsbCBiZSB0cmVhdGVkIGFzIGEgXCJjYXRlZ29yeSBtYXRjaFwiLCBhbmQgd2lsbCBvbmx5IGRpc3BsYXkgaWYgZXhhY3RcbiAqICAgdmFsdWUgbWF0Y2hlcyBhcmVuJ3QgZm91bmQgYW5kIHRoZSB2YWx1ZSBtYXBzIHRvIGl0cyBjYXRlZ29yeSBmb3IgdGhlIGRlZmluZWQgbG9jYWxlLlxuICpcbiAqIFNlZSBodHRwOi8vY2xkci51bmljb2RlLm9yZy9pbmRleC9jbGRyLXNwZWMvcGx1cmFsLXJ1bGVzXG4gKlxuICogXFxAZXhwZXJpbWVudGFsXG4gKi9cbnZhciBOZ1BsdXJhbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBfbG9jYWxpemF0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gTmdQbHVyYWwoX2xvY2FsaXphdGlvbikge1xuICAgICAgICB0aGlzLl9sb2NhbGl6YXRpb24gPSBfbG9jYWxpemF0aW9uO1xuICAgICAgICB0aGlzLl9jYXNlVmlld3MgPSB7fTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nUGx1cmFsLnByb3RvdHlwZSwgXCJuZ1BsdXJhbFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3dpdGNoVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7P30gc3dpdGNoVmlld1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdQbHVyYWwucHJvdG90eXBlLmFkZENhc2UgPSBmdW5jdGlvbiAodmFsdWUsIHN3aXRjaFZpZXcpIHsgdGhpcy5fY2FzZVZpZXdzW3ZhbHVlXSA9IHN3aXRjaFZpZXc7IH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1BsdXJhbC5wcm90b3R5cGUuX3VwZGF0ZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyVmlld3MoKTtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gY2FzZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jYXNlVmlld3MpO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBrZXkgPSBnZXRQbHVyYWxDYXRlZ29yeSh0aGlzLl9zd2l0Y2hWYWx1ZSwgY2FzZXMsIHRoaXMuX2xvY2FsaXphdGlvbik7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlVmlldyh0aGlzLl9jYXNlVmlld3Nba2V5XSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nUGx1cmFsLnByb3RvdHlwZS5fY2xlYXJWaWV3cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVZpZXcpXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVWaWV3LmRlc3Ryb3koKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmlld1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdQbHVyYWwucHJvdG90eXBlLl9hY3RpdmF0ZVZpZXcgPSBmdW5jdGlvbiAodmlldykge1xuICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVmlldyA9IHZpZXc7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVWaWV3LmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTmdQbHVyYWw7XG59KCkpO1xuTmdQbHVyYWwuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3sgc2VsZWN0b3I6ICdbbmdQbHVyYWxdJyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbk5nUGx1cmFsLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogTmdMb2NhbGl6YXRpb24sIH0sXG5dOyB9O1xuTmdQbHVyYWwucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ25nUGx1cmFsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKlxuICogXFxAd2hhdEl0RG9lcyBDcmVhdGVzIGEgdmlldyB0aGF0IHdpbGwgYmUgYWRkZWQvcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnQge1xcQGxpbmsgTmdQbHVyYWx9IHdoZW4gdGhlXG4gKiAgICAgICAgICAgICBnaXZlbiBleHByZXNzaW9uIG1hdGNoZXMgdGhlIHBsdXJhbCBleHByZXNzaW9uIGFjY29yZGluZyB0byBDTERSIHJ1bGVzLlxuICpcbiAqIFxcQGhvd1RvVXNlXG4gKiBgYGBcbiAqIDxzb21lLWVsZW1lbnQgW25nUGx1cmFsXT1cInZhbHVlXCI+XG4gKiAgIDxuZy10ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCI9MFwiPi4uLjwvbmctdGVtcGxhdGU+XG4gKiAgIDxuZy10ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCJvdGhlclwiPi4uLjwvbmctdGVtcGxhdGU+XG4gKiA8L3NvbWUtZWxlbWVudD5cbiAqIGBgYFxuICpcbiAqIFNlZSB7XFxAbGluayBOZ1BsdXJhbH0gZm9yIG1vcmUgZGV0YWlscyBhbmQgZXhhbXBsZS5cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIE5nUGx1cmFsQ2FzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0gez99IHZpZXdDb250YWluZXJcbiAgICAgKiBAcGFyYW0gez99IG5nUGx1cmFsXG4gICAgICovXG4gICAgZnVuY3Rpb24gTmdQbHVyYWxDYXNlKHZhbHVlLCB0ZW1wbGF0ZSwgdmlld0NvbnRhaW5lciwgbmdQbHVyYWwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB2YXIgaXNBTnVtYmVyID0gIWlzTmFOKE51bWJlcih2YWx1ZSkpO1xuICAgICAgICBuZ1BsdXJhbC5hZGRDYXNlKGlzQU51bWJlciA/IFwiPVwiICsgdmFsdWUgOiB2YWx1ZSwgbmV3IFN3aXRjaFZpZXcodmlld0NvbnRhaW5lciwgdGVtcGxhdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIE5nUGx1cmFsQ2FzZTtcbn0oKSk7XG5OZ1BsdXJhbENhc2UuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3sgc2VsZWN0b3I6ICdbbmdQbHVyYWxDYXNlXScgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5OZ1BsdXJhbENhc2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEF0dHJpYnV0ZSwgYXJnczogWyduZ1BsdXJhbENhc2UnLF0gfSxdIH0sXG4gICAgeyB0eXBlOiBUZW1wbGF0ZVJlZiwgfSxcbiAgICB7IHR5cGU6IFZpZXdDb250YWluZXJSZWYsIH0sXG4gICAgeyB0eXBlOiBOZ1BsdXJhbCwgZGVjb3JhdG9yczogW3sgdHlwZTogSG9zdCB9LF0gfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICpcbiAqIFxcQHdoYXRJdERvZXMgVXBkYXRlIGFuIEhUTUwgZWxlbWVudCBzdHlsZXMuXG4gKlxuICogXFxAaG93VG9Vc2VcbiAqIGBgYFxuICogPHNvbWUtZWxlbWVudCBbbmdTdHlsZV09XCJ7J2ZvbnQtc3R5bGUnOiBzdHlsZUV4cH1cIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqXG4gKiA8c29tZS1lbGVtZW50IFtuZ1N0eWxlXT1cInsnbWF4LXdpZHRoLnB4Jzogd2lkdGhFeHB9XCI+Li4uPC9zb21lLWVsZW1lbnQ+XG4gKlxuICogPHNvbWUtZWxlbWVudCBbbmdTdHlsZV09XCJvYmpFeHBcIj4uLi48L3NvbWUtZWxlbWVudD5cbiAqIGBgYFxuICpcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIHN0eWxlcyBhcmUgdXBkYXRlZCBhY2NvcmRpbmcgdG8gdGhlIHZhbHVlIG9mIHRoZSBleHByZXNzaW9uIGV2YWx1YXRpb246XG4gKiAtIGtleXMgYXJlIHN0eWxlIG5hbWVzIHdpdGggYW4gb3B0aW9uYWwgYC48dW5pdD5gIHN1ZmZpeCAoaWUgJ3RvcC5weCcsICdmb250LXN0eWxlLmVtJyksXG4gKiAtIHZhbHVlcyBhcmUgdGhlIHZhbHVlcyBhc3NpZ25lZCB0byB0aG9zZSBwcm9wZXJ0aWVzIChleHByZXNzZWQgaW4gdGhlIGdpdmVuIHVuaXQpLlxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgTmdTdHlsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBfZGlmZmVyc1xuICAgICAqIEBwYXJhbSB7P30gX25nRWxcbiAgICAgKiBAcGFyYW0gez99IF9yZW5kZXJlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE5nU3R5bGUoX2RpZmZlcnMsIF9uZ0VsLCBfcmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5fZGlmZmVycyA9IF9kaWZmZXJzO1xuICAgICAgICB0aGlzLl9uZ0VsID0gX25nRWw7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyID0gX3JlbmRlcmVyO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmdTdHlsZS5wcm90b3R5cGUsIFwibmdTdHlsZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IHZcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX25nU3R5bGUgPSB2O1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaWZmZXIgJiYgdikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZCh2KS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1N0eWxlLnByb3RvdHlwZS5uZ0RvQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIpIHtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9uZ1N0eWxlKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIE5nU3R5bGUucHJvdG90eXBlLl9hcHBseUNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbShmdW5jdGlvbiAocmVjb3JkKSB7IHJldHVybiBfdGhpcy5fc2V0U3R5bGUocmVjb3JkLmtleSwgbnVsbCk7IH0pO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oZnVuY3Rpb24gKHJlY29yZCkgeyByZXR1cm4gX3RoaXMuX3NldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oZnVuY3Rpb24gKHJlY29yZCkgeyByZXR1cm4gX3RoaXMuX3NldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gbmFtZUFuZFVuaXRcbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBOZ1N0eWxlLnByb3RvdHlwZS5fc2V0U3R5bGUgPSBmdW5jdGlvbiAobmFtZUFuZFVuaXQsIHZhbHVlKSB7XG4gICAgICAgIHZhciBfYSA9IG5hbWVBbmRVbml0LnNwbGl0KCcuJyksIG5hbWUgPSBfYVswXSwgdW5pdCA9IF9hWzFdO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlICE9IG51bGwgJiYgdW5pdCA/IFwiXCIgKyB2YWx1ZSArIHVuaXQgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgbmFtZSwgLyoqIEB0eXBlIHs/fSAqLyAodmFsdWUpKTtcbiAgICB9O1xuICAgIHJldHVybiBOZ1N0eWxlO1xufSgpKTtcbk5nU3R5bGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3sgc2VsZWN0b3I6ICdbbmdTdHlsZV0nIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuTmdTdHlsZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEtleVZhbHVlRGlmZmVycywgfSxcbiAgICB7IHR5cGU6IEVsZW1lbnRSZWYsIH0sXG4gICAgeyB0eXBlOiBSZW5kZXJlciwgfSxcbl07IH07XG5OZ1N0eWxlLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICduZ1N0eWxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKlxuICogXFxAd2hhdEl0RG9lcyBJbnNlcnRzIGFuIGVtYmVkZGVkIHZpZXcgZnJvbSBhIHByZXBhcmVkIGBUZW1wbGF0ZVJlZmBcbiAqXG4gKiBcXEBob3dUb1VzZVxuICogYGBgXG4gKiA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVSZWZFeHA7IGNvbnRleHQ6IGNvbnRleHRFeHBcIj48L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogWW91IGNhbiBhdHRhY2ggYSBjb250ZXh0IG9iamVjdCB0byB0aGUgYEVtYmVkZGVkVmlld1JlZmAgYnkgc2V0dGluZyBgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XWAuXG4gKiBgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XWAgc2hvdWxkIGJlIGFuIG9iamVjdCwgdGhlIG9iamVjdCdzIGtleXMgd2lsbCBiZSBhdmFpbGFibGUgZm9yIGJpbmRpbmdcbiAqIGJ5IHRoZSBsb2NhbCB0ZW1wbGF0ZSBgbGV0YCBkZWNsYXJhdGlvbnMuXG4gKlxuICogTm90ZTogdXNpbmcgdGhlIGtleSBgJGltcGxpY2l0YCBpbiB0aGUgY29udGV4dCBvYmplY3Qgd2lsbCBzZXQgaXQncyB2YWx1ZSBhcyBkZWZhdWx0LlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vbmdUZW1wbGF0ZU91dGxldC90cy9tb2R1bGUudHMgcmVnaW9uPSdOZ1RlbXBsYXRlT3V0bGV0J31cbiAqXG4gKiBcXEBleHBlcmltZW50YWxcbiAqL1xudmFyIE5nVGVtcGxhdGVPdXRsZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX3ZpZXdDb250YWluZXJSZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBOZ1RlbXBsYXRlT3V0bGV0KF92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYgPSBfdmlld0NvbnRhaW5lclJlZjtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5nVGVtcGxhdGVPdXRsZXQucHJvdG90eXBlLCBcIm5nT3V0bGV0Q29udGV4dFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZGVwcmVjYXRlZCB2NC4wLjAgLSBSZW5hbWVkIHRvIG5nVGVtcGxhdGVPdXRsZXRDb250ZXh0LlxuICAgICAgICAgKiBAcGFyYW0gez99IGNvbnRleHRcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNvbnRleHQpIHsgdGhpcy5uZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCA9IGNvbnRleHQ7IH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gY2hhbmdlc1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTmdUZW1wbGF0ZU91dGxldC5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAodGhpcy5fdmlld1JlZikge1xuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUodGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX3ZpZXdSZWYpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5uZ1RlbXBsYXRlT3V0bGV0KSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5uZ1RlbXBsYXRlT3V0bGV0LCB0aGlzLm5nVGVtcGxhdGVPdXRsZXRDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE5nVGVtcGxhdGVPdXRsZXQ7XG59KCkpO1xuTmdUZW1wbGF0ZU91dGxldC5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ1tuZ1RlbXBsYXRlT3V0bGV0XScgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5OZ1RlbXBsYXRlT3V0bGV0LmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogVmlld0NvbnRhaW5lclJlZiwgfSxcbl07IH07XG5OZ1RlbXBsYXRlT3V0bGV0LnByb3BEZWNvcmF0b3JzID0ge1xuICAgICduZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbmdUZW1wbGF0ZU91dGxldCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbmdPdXRsZXRDb250ZXh0JzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIEFuZ3VsYXIgZGlyZWN0aXZlcyB0aGF0IGFyZSBsaWtlbHkgdG8gYmUgdXNlZCBpbiBlYWNoIGFuZCBldmVyeSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbi5cbiAqL1xudmFyIENPTU1PTl9ESVJFQ1RJVkVTID0gW1xuICAgIE5nQ2xhc3MsXG4gICAgTmdDb21wb25lbnRPdXRsZXQsXG4gICAgTmdGb3JPZixcbiAgICBOZ0lmLFxuICAgIE5nVGVtcGxhdGVPdXRsZXQsXG4gICAgTmdTdHlsZSxcbiAgICBOZ1N3aXRjaCxcbiAgICBOZ1N3aXRjaENhc2UsXG4gICAgTmdTd2l0Y2hEZWZhdWx0LFxuICAgIE5nUGx1cmFsLFxuICAgIE5nUGx1cmFsQ2FzZSxcbl07XG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBkZXByZWNhdGVkIGRpcmVjdGl2ZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIHBhcnQgb2YgdGhlIGNvcmUgbW9kdWxlLlxuICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEBwYXJhbSB7P30gdHlwZVxuICogQHBhcmFtIHs/fSB2YWx1ZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKHR5cGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIEVycm9yKFwiSW52YWxpZFBpcGVBcmd1bWVudDogJ1wiICsgdmFsdWUgKyBcIicgZm9yIHBpcGUgJ1wiICsgybVzdHJpbmdpZnkodHlwZSkgKyBcIidcIik7XG59XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG52YXIgT2JzZXJ2YWJsZVN0cmF0ZWd5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlU3RyYXRlZ3koKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gYXN5bmNcbiAgICAgKiBAcGFyYW0gez99IHVwZGF0ZUxhdGVzdFZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlU3RyYXRlZ3kucHJvdG90eXBlLmNyZWF0ZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIChhc3luYywgdXBkYXRlTGF0ZXN0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLnN1YnNjcmliZSh7IG5leHQ6IHVwZGF0ZUxhdGVzdFZhbHVlLCBlcnJvcjogZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlU3RyYXRlZ3kucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlU3RyYXRlZ3kucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHsgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVTdHJhdGVneTtcbn0oKSk7XG52YXIgUHJvbWlzZVN0cmF0ZWd5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcm9taXNlU3RyYXRlZ3koKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gYXN5bmNcbiAgICAgKiBAcGFyYW0gez99IHVwZGF0ZUxhdGVzdFZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBQcm9taXNlU3RyYXRlZ3kucHJvdG90eXBlLmNyZWF0ZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIChhc3luYywgdXBkYXRlTGF0ZXN0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jLnRoZW4odXBkYXRlTGF0ZXN0VmFsdWUsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBzdWJzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFByb21pc2VTdHJhdGVneS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHsgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUHJvbWlzZVN0cmF0ZWd5LnByb3RvdHlwZS5vbkRlc3Ryb3kgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7IH07XG4gICAgcmV0dXJuIFByb21pc2VTdHJhdGVneTtcbn0oKSk7XG52YXIgX3Byb21pc2VTdHJhdGVneSA9IG5ldyBQcm9taXNlU3RyYXRlZ3koKTtcbnZhciBfb2JzZXJ2YWJsZVN0cmF0ZWd5ID0gbmV3IE9ic2VydmFibGVTdHJhdGVneSgpO1xuLyoqXG4gKiBcXEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIFxcQHdoYXRJdERvZXMgVW53cmFwcyBhIHZhbHVlIGZyb20gYW4gYXN5bmNocm9ub3VzIHByaW1pdGl2ZS5cbiAqIFxcQGhvd1RvVXNlIGBvYnNlcnZhYmxlX29yX3Byb21pc2VfZXhwcmVzc2lvbiB8IGFzeW5jYFxuICogXFxAZGVzY3JpcHRpb25cbiAqIFRoZSBgYXN5bmNgIHBpcGUgc3Vic2NyaWJlcyB0byBhbiBgT2JzZXJ2YWJsZWAgb3IgYFByb21pc2VgIGFuZCByZXR1cm5zIHRoZSBsYXRlc3QgdmFsdWUgaXQgaGFzXG4gKiBlbWl0dGVkLiBXaGVuIGEgbmV3IHZhbHVlIGlzIGVtaXR0ZWQsIHRoZSBgYXN5bmNgIHBpcGUgbWFya3MgdGhlIGNvbXBvbmVudCB0byBiZSBjaGVja2VkIGZvclxuICogY2hhbmdlcy4gV2hlbiB0aGUgY29tcG9uZW50IGdldHMgZGVzdHJveWVkLCB0aGUgYGFzeW5jYCBwaXBlIHVuc3Vic2NyaWJlcyBhdXRvbWF0aWNhbGx5IHRvIGF2b2lkXG4gKiBwb3RlbnRpYWwgbWVtb3J5IGxlYWtzLlxuICpcbiAqXG4gKiAjIyBFeGFtcGxlc1xuICpcbiAqIFRoaXMgZXhhbXBsZSBiaW5kcyBhIGBQcm9taXNlYCB0byB0aGUgdmlldy4gQ2xpY2tpbmcgdGhlIGBSZXNvbHZlYCBidXR0b24gcmVzb2x2ZXMgdGhlXG4gKiBwcm9taXNlLlxuICpcbiAqIHtcXEBleGFtcGxlIGNvbW1vbi9waXBlcy90cy9hc3luY19waXBlLnRzIHJlZ2lvbj0nQXN5bmNQaXBlUHJvbWlzZSd9XG4gKlxuICogSXQncyBhbHNvIHBvc3NpYmxlIHRvIHVzZSBgYXN5bmNgIHdpdGggT2JzZXJ2YWJsZXMuIFRoZSBleGFtcGxlIGJlbG93IGJpbmRzIHRoZSBgdGltZWAgT2JzZXJ2YWJsZVxuICogdG8gdGhlIHZpZXcuIFRoZSBPYnNlcnZhYmxlIGNvbnRpbnVvdXNseSB1cGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGN1cnJlbnQgdGltZS5cbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvYXN5bmNfcGlwZS50cyByZWdpb249J0FzeW5jUGlwZU9ic2VydmFibGUnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgQXN5bmNQaXBlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IF9yZWZcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1BpcGUoX3JlZikge1xuICAgICAgICB0aGlzLl9yZWYgPSBfcmVmO1xuICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9vYmogPSBudWxsO1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9ICgobnVsbCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEFzeW5jUGlwZS5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBvYmpcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEFzeW5jUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoIXRoaXMuX29iaikge1xuICAgICAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZShvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xuICAgICAgICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKC8qKiBAdHlwZSB7P30gKi8gKG9iaikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sYXRlc3RWYWx1ZSA9PT0gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgICByZXR1cm4gV3JhcHBlZFZhbHVlLndyYXAodGhpcy5fbGF0ZXN0VmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBvYmpcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEFzeW5jUGlwZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fb2JqID0gb2JqO1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9IHRoaXMuX3NlbGVjdFN0cmF0ZWd5KG9iaik7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVN1YnNjcmlwdGlvbihvYmosIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuX3VwZGF0ZUxhdGVzdFZhbHVlKG9iaiwgdmFsdWUpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gb2JqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBBc3luY1BpcGUucHJvdG90eXBlLl9zZWxlY3RTdHJhdGVneSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKMm1aXNQcm9taXNlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBfcHJvbWlzZVN0cmF0ZWd5O1xuICAgICAgICB9XG4gICAgICAgIGlmICjJtWlzT2JzZXJ2YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gX29ic2VydmFibGVTdHJhdGVneTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoQXN5bmNQaXBlLCBvYmopO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBBc3luY1BpcGUucHJvdG90eXBlLl9kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdHJhdGVneS5kaXNwb3NlKC8qKiBAdHlwZSB7P30gKi8gKCh0aGlzLl9zdWJzY3JpcHRpb24pKSk7XG4gICAgICAgIHRoaXMuX2xhdGVzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX29iaiA9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGFzeW5jXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgQXN5bmNQaXBlLnByb3RvdHlwZS5fdXBkYXRlTGF0ZXN0VmFsdWUgPSBmdW5jdGlvbiAoYXN5bmMsIHZhbHVlKSB7XG4gICAgICAgIGlmIChhc3luYyA9PT0gdGhpcy5fb2JqKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNQaXBlO1xufSgpKTtcbkFzeW5jUGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ2FzeW5jJywgcHVyZTogZmFsc2UgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5Bc3luY1BpcGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBDaGFuZ2VEZXRlY3RvclJlZiwgfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFRyYW5zZm9ybXMgdGV4dCB0byBsb3dlcmNhc2UuXG4gKlxuICoge1xcQGV4YW1wbGUgIGNvbW1vbi9waXBlcy90cy9sb3dlcnVwcGVyX3BpcGUudHMgcmVnaW9uPSdMb3dlclVwcGVyUGlwZScgfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgTG93ZXJDYXNlUGlwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG93ZXJDYXNlUGlwZSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTG93ZXJDYXNlUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoTG93ZXJDYXNlUGlwZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIExvd2VyQ2FzZVBpcGU7XG59KCkpO1xuTG93ZXJDYXNlUGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ2xvd2VyY2FzZScgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5Mb3dlckNhc2VQaXBlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4vKipcbiAqIEhlbHBlciBtZXRob2QgdG8gdHJhbnNmb3JtIGEgc2luZ2xlIHdvcmQgdG8gdGl0bGVjYXNlLlxuICpcbiAqIFxcQHN0YWJsZVxuICogQHBhcmFtIHs/fSB3b3JkXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiB0aXRsZUNhc2VXb3JkKHdvcmQpIHtcbiAgICBpZiAoIXdvcmQpXG4gICAgICAgIHJldHVybiB3b3JkO1xuICAgIHJldHVybiB3b3JkWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xufVxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRleHQgdG8gdGl0bGVjYXNlLlxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgVGl0bGVDYXNlUGlwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGl0bGVDYXNlUGlwZSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgVGl0bGVDYXNlUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoVGl0bGVDYXNlUGlwZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5zcGxpdCgvXFxiL2cpLm1hcChmdW5jdGlvbiAod29yZCkgeyByZXR1cm4gdGl0bGVDYXNlV29yZCh3b3JkKTsgfSkuam9pbignJyk7XG4gICAgfTtcbiAgICByZXR1cm4gVGl0bGVDYXNlUGlwZTtcbn0oKSk7XG5UaXRsZUNhc2VQaXBlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBQaXBlLCBhcmdzOiBbeyBuYW1lOiAndGl0bGVjYXNlJyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cblRpdGxlQ2FzZVBpcGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogVHJhbnNmb3JtcyB0ZXh0IHRvIHVwcGVyY2FzZS5cbiAqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIFVwcGVyQ2FzZVBpcGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVwcGVyQ2FzZVBpcGUoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFVwcGVyQ2FzZVBpcGUucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKFVwcGVyQ2FzZVBpcGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICB9O1xuICAgIHJldHVybiBVcHBlckNhc2VQaXBlO1xufSgpKTtcblVwcGVyQ2FzZVBpcGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IFBpcGUsIGFyZ3M6IFt7IG5hbWU6ICd1cHBlcmNhc2UnIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuVXBwZXJDYXNlUGlwZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xudmFyIE51bWJlckZvcm1hdFN0eWxlID0ge307XG5OdW1iZXJGb3JtYXRTdHlsZS5EZWNpbWFsID0gMDtcbk51bWJlckZvcm1hdFN0eWxlLlBlcmNlbnQgPSAxO1xuTnVtYmVyRm9ybWF0U3R5bGUuQ3VycmVuY3kgPSAyO1xuTnVtYmVyRm9ybWF0U3R5bGVbTnVtYmVyRm9ybWF0U3R5bGUuRGVjaW1hbF0gPSBcIkRlY2ltYWxcIjtcbk51bWJlckZvcm1hdFN0eWxlW051bWJlckZvcm1hdFN0eWxlLlBlcmNlbnRdID0gXCJQZXJjZW50XCI7XG5OdW1iZXJGb3JtYXRTdHlsZVtOdW1iZXJGb3JtYXRTdHlsZS5DdXJyZW5jeV0gPSBcIkN1cnJlbmN5XCI7XG52YXIgTnVtYmVyRm9ybWF0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOdW1iZXJGb3JtYXR0ZXIoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gbnVtXG4gICAgICogQHBhcmFtIHs/fSBsb2NhbGVcbiAgICAgKiBAcGFyYW0gez99IHN0eWxlXG4gICAgICogQHBhcmFtIHs/PX0gb3B0c1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTnVtYmVyRm9ybWF0dGVyLmZvcm1hdCA9IGZ1bmN0aW9uIChudW0sIGxvY2FsZSwgc3R5bGUsIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgdmFyIG1pbmltdW1JbnRlZ2VyRGlnaXRzID0gb3B0cy5taW5pbXVtSW50ZWdlckRpZ2l0cywgbWluaW11bUZyYWN0aW9uRGlnaXRzID0gb3B0cy5taW5pbXVtRnJhY3Rpb25EaWdpdHMsIG1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IG9wdHMubWF4aW11bUZyYWN0aW9uRGlnaXRzLCBjdXJyZW5jeSA9IG9wdHMuY3VycmVuY3ksIF9hID0gb3B0cy5jdXJyZW5jeUFzU3ltYm9sLCBjdXJyZW5jeUFzU3ltYm9sID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2E7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbWluaW11bUludGVnZXJEaWdpdHMsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG1pbmltdW1GcmFjdGlvbkRpZ2l0cyxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbWF4aW11bUZyYWN0aW9uRGlnaXRzLFxuICAgICAgICAgICAgc3R5bGU6IE51bWJlckZvcm1hdFN0eWxlW3N0eWxlXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChzdHlsZSA9PSBOdW1iZXJGb3JtYXRTdHlsZS5DdXJyZW5jeSkge1xuICAgICAgICAgICAgb3B0aW9ucy5jdXJyZW5jeSA9IHR5cGVvZiBjdXJyZW5jeSA9PSAnc3RyaW5nJyA/IGN1cnJlbmN5IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgb3B0aW9ucy5jdXJyZW5jeURpc3BsYXkgPSBjdXJyZW5jeUFzU3ltYm9sID8gJ3N5bWJvbCcgOiAnY29kZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChudW0pO1xuICAgIH07XG4gICAgcmV0dXJuIE51bWJlckZvcm1hdHRlcjtcbn0oKSk7XG52YXIgREFURV9GT1JNQVRTX1NQTElUID0gLygoPzpbXnlNTGRIaG1zYXpaRXdHakonXSspfCg/OicoPzpbXiddfCcnKSonKXwoPzpFK3x5K3xNK3xMK3xkK3xIK3xoK3xKK3xqK3xtK3xzK3xhfHp8WnxHK3x3KykpKC4qKS87XG52YXIgUEFUVEVSTl9BTElBU0VTID0ge1xuICAgIC8vIEtleXMgYXJlIHF1b3RlZCBzbyB0aGV5IGRvIG5vdCBnZXQgcmVuYW1lZCBkdXJpbmcgY2xvc3VyZSBjb21waWxhdGlvbi5cbiAgICAneU1NTWRqbXMnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShbXG4gICAgICAgIGRpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMSksXG4gICAgICAgIG5hbWVDb25kaXRpb24oJ21vbnRoJywgMyksXG4gICAgICAgIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKSxcbiAgICAgICAgZGlnaXRDb25kaXRpb24oJ2hvdXInLCAxKSxcbiAgICAgICAgZGlnaXRDb25kaXRpb24oJ21pbnV0ZScsIDEpLFxuICAgICAgICBkaWdpdENvbmRpdGlvbignc2Vjb25kJywgMSksXG4gICAgXSkpLFxuICAgICd5TWRqbSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShjb21iaW5lKFtcbiAgICAgICAgZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSwgZGlnaXRDb25kaXRpb24oJ21vbnRoJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKSxcbiAgICAgICAgZGlnaXRDb25kaXRpb24oJ2hvdXInLCAxKSwgZGlnaXRDb25kaXRpb24oJ21pbnV0ZScsIDEpXG4gICAgXSkpLFxuICAgICd5TU1NTUVFRUVkJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGNvbWJpbmUoW1xuICAgICAgICBkaWdpdENvbmRpdGlvbigneWVhcicsIDEpLCBuYW1lQ29uZGl0aW9uKCdtb250aCcsIDQpLCBuYW1lQ29uZGl0aW9uKCd3ZWVrZGF5JywgNCksXG4gICAgICAgIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKVxuICAgIF0pKSxcbiAgICAneU1NTU1kJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGNvbWJpbmUoW2RpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMSksIG5hbWVDb25kaXRpb24oJ21vbnRoJywgNCksIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKV0pKSxcbiAgICAneU1NTWQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShbZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSwgbmFtZUNvbmRpdGlvbignbW9udGgnLCAzKSwgZGlnaXRDb25kaXRpb24oJ2RheScsIDEpXSkpLFxuICAgICd5TWQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShbZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSwgZGlnaXRDb25kaXRpb24oJ21vbnRoJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKV0pKSxcbiAgICAnam1zJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGNvbWJpbmUoW2RpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdzZWNvbmQnLCAxKSwgZGlnaXRDb25kaXRpb24oJ21pbnV0ZScsIDEpXSkpLFxuICAgICdqbSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShjb21iaW5lKFtkaWdpdENvbmRpdGlvbignaG91cicsIDEpLCBkaWdpdENvbmRpdGlvbignbWludXRlJywgMSldKSlcbn07XG52YXIgREFURV9GT1JNQVRTID0ge1xuICAgIC8vIEtleXMgYXJlIHF1b3RlZCBzbyB0aGV5IGRvIG5vdCBnZXQgcmVuYW1lZC5cbiAgICAneXl5eSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbigneWVhcicsIDQpKSxcbiAgICAneXknOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ3llYXInLCAyKSksXG4gICAgJ3knOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSksXG4gICAgJ01NTU0nOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignbW9udGgnLCA0KSksXG4gICAgJ01NTSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdtb250aCcsIDMpKSxcbiAgICAnTU0nOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ21vbnRoJywgMikpLFxuICAgICdNJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdtb250aCcsIDEpKSxcbiAgICAnTExMTCc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdtb250aCcsIDQpKSxcbiAgICAnTCc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdtb250aCcsIDEpKSxcbiAgICAnZGQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ2RheScsIDIpKSxcbiAgICAnZCc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignZGF5JywgMSkpLFxuICAgICdISCc6IGRpZ2l0TW9kaWZpZXIoaG91ckV4dHJhY3RvcihkYXRlUGFydEdldHRlckZhY3RvcnkoaG91cjEyTW9kaWZ5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMiksIGZhbHNlKSkpKSxcbiAgICAnSCc6IGhvdXJFeHRyYWN0b3IoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGhvdXIxMk1vZGlmeShkaWdpdENvbmRpdGlvbignaG91cicsIDEpLCBmYWxzZSkpKSxcbiAgICAnaGgnOiBkaWdpdE1vZGlmaWVyKGhvdXJFeHRyYWN0b3IoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGhvdXIxMk1vZGlmeShkaWdpdENvbmRpdGlvbignaG91cicsIDIpLCB0cnVlKSkpKSxcbiAgICAnaCc6IGhvdXJFeHRyYWN0b3IoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGhvdXIxMk1vZGlmeShkaWdpdENvbmRpdGlvbignaG91cicsIDEpLCB0cnVlKSkpLFxuICAgICdqaic6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignaG91cicsIDIpKSxcbiAgICAnaic6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignaG91cicsIDEpKSxcbiAgICAnbW0nOiBkaWdpdE1vZGlmaWVyKGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignbWludXRlJywgMikpKSxcbiAgICAnbSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignbWludXRlJywgMSkpLFxuICAgICdzcyc6IGRpZ2l0TW9kaWZpZXIoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdzZWNvbmQnLCAyKSkpLFxuICAgICdzJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdzZWNvbmQnLCAxKSksXG4gICAgLy8gd2hpbGUgSVNPIDg2MDEgcmVxdWlyZXMgZnJhY3Rpb25zIHRvIGJlIHByZWZpeGVkIHdpdGggYC5gIG9yIGAsYFxuICAgIC8vIHdlIGNhbiBiZSBqdXN0IHNhZmVseSByZWx5IG9uIHVzaW5nIGBzc3NgIHNpbmNlIHdlIGN1cnJlbnRseSBkb24ndCBzdXBwb3J0IHNpbmdsZSBvciB0d28gZGlnaXRcbiAgICAvLyBmcmFjdGlvbnNcbiAgICAnc3NzJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdzZWNvbmQnLCAzKSksXG4gICAgJ0VFRUUnOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignd2Vla2RheScsIDQpKSxcbiAgICAnRUVFJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ3dlZWtkYXknLCAzKSksXG4gICAgJ0VFJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ3dlZWtkYXknLCAyKSksXG4gICAgJ0UnOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignd2Vla2RheScsIDEpKSxcbiAgICAnYSc6IGhvdXJDbG9ja0V4dHJhY3RvcihkYXRlUGFydEdldHRlckZhY3RvcnkoaG91cjEyTW9kaWZ5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSksIHRydWUpKSksXG4gICAgJ1onOiB0aW1lWm9uZUdldHRlcignc2hvcnQnKSxcbiAgICAneic6IHRpbWVab25lR2V0dGVyKCdsb25nJyksXG4gICAgJ3d3JzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KHt9KSxcbiAgICAvLyBmaXJzdCBUaHVyc2RheSBvZiB0aGUgeWVhci4gbm90IHN1cHBvcnQgP1xuICAgICd3JzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KHt9KSxcbiAgICAvLyBvZiB0aGUgeWVhciBub3Qgc3VwcG9ydCA/XG4gICAgJ0cnOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignZXJhJywgMSkpLFxuICAgICdHRyc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdlcmEnLCAyKSksXG4gICAgJ0dHRyc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdlcmEnLCAzKSksXG4gICAgJ0dHR0cnOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignZXJhJywgNCkpXG59O1xuLyoqXG4gKiBAcGFyYW0gez99IGlubmVyXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBkaWdpdE1vZGlmaWVyKGlubmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcmVzdWx0ID0gaW5uZXIoZGF0ZSwgbG9jYWxlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT0gMSA/ICcwJyArIHJlc3VsdCA6IHJlc3VsdDtcbiAgICB9O1xufVxuLyoqXG4gKiBAcGFyYW0gez99IGlubmVyXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBob3VyQ2xvY2tFeHRyYWN0b3IoaW5uZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkgeyByZXR1cm4gaW5uZXIoZGF0ZSwgbG9jYWxlKS5zcGxpdCgnICcpWzFdOyB9O1xufVxuLyoqXG4gKiBAcGFyYW0gez99IGlubmVyXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBob3VyRXh0cmFjdG9yKGlubmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHsgcmV0dXJuIGlubmVyKGRhdGUsIGxvY2FsZSkuc3BsaXQoJyAnKVswXTsgfTtcbn1cbi8qKlxuICogQHBhcmFtIHs/fSBkYXRlXG4gKiBAcGFyYW0gez99IGxvY2FsZVxuICogQHBhcmFtIHs/fSBvcHRpb25zXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBpbnRsRGF0ZUZvcm1hdChkYXRlLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoZGF0ZSkucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gdGltZXpvbmVcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIHRpbWVab25lR2V0dGVyKHRpbWV6b25lKSB7XG4gICAgLy8gVG8gd29ya2Fyb3VuZCBgSW50bGAgQVBJIHJlc3RyaWN0aW9uIGZvciBzaW5nbGUgdGltZXpvbmUgbGV0IGZvcm1hdCB3aXRoIDI0IGhvdXJzXG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gb3B0aW9ucyA9IHsgaG91cjogJzItZGlnaXQnLCBob3VyMTI6IGZhbHNlLCB0aW1lWm9uZU5hbWU6IHRpbWV6b25lIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcmVzdWx0ID0gaW50bERhdGVGb3JtYXQoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKTtcbiAgICAgICAgLy8gVGhlbiBleHRyYWN0IGZpcnN0IDMgbGV0dGVycyB0aGF0IHJlbGF0ZWQgdG8gaG91cnNcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdC5zdWJzdHJpbmcoMykgOiAnJztcbiAgICB9O1xufVxuLyoqXG4gKiBAcGFyYW0gez99IG9wdGlvbnNcbiAqIEBwYXJhbSB7P30gdmFsdWVcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGhvdXIxMk1vZGlmeShvcHRpb25zLCB2YWx1ZSkge1xuICAgIG9wdGlvbnMuaG91cjEyID0gdmFsdWU7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gcHJvcFxuICogQHBhcmFtIHs/fSBsZW5cbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGRpZ2l0Q29uZGl0aW9uKHByb3AsIGxlbikge1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdFtwcm9wXSA9IGxlbiA9PT0gMiA/ICcyLWRpZ2l0JyA6ICdudW1lcmljJztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBAcGFyYW0gez99IHByb3BcbiAqIEBwYXJhbSB7P30gbGVuXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBuYW1lQ29uZGl0aW9uKHByb3AsIGxlbikge1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIHJlc3VsdCA9IHt9O1xuICAgIGlmIChsZW4gPCA0KSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGxlbiA+IDEgPyAnc2hvcnQnIDogJ25hcnJvdyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHRbcHJvcF0gPSAnbG9uZyc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gb3B0aW9uc1xuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gY29tYmluZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIG9wdCkgeyByZXR1cm4gKE9iamVjdC5hc3NpZ24oe30sIG1lcmdlZCwgb3B0KSk7IH0sIHt9KTtcbn1cbi8qKlxuICogQHBhcmFtIHs/fSByZXRcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShyZXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkgeyByZXR1cm4gaW50bERhdGVGb3JtYXQoZGF0ZSwgbG9jYWxlLCByZXQpOyB9O1xufVxudmFyIERBVEVfRk9STUFUVEVSX0NBQ0hFID0gbmV3IE1hcCgpO1xuLyoqXG4gKiBAcGFyYW0gez99IGZvcm1hdFxuICogQHBhcmFtIHs/fSBkYXRlXG4gKiBAcGFyYW0gez99IGxvY2FsZVxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihmb3JtYXQsIGRhdGUsIGxvY2FsZSkge1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIGZuID0gUEFUVEVSTl9BTElBU0VTW2Zvcm1hdF07XG4gICAgaWYgKGZuKVxuICAgICAgICByZXR1cm4gZm4oZGF0ZSwgbG9jYWxlKTtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBjYWNoZUtleSA9IGZvcm1hdDtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBwYXJ0cyA9IERBVEVfRk9STUFUVEVSX0NBQ0hFLmdldChjYWNoZUtleSk7XG4gICAgaWYgKCFwYXJ0cykge1xuICAgICAgICBwYXJ0cyA9IFtdO1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBtYXRjaCA9IHZvaWQgMDtcbiAgICAgICAgREFURV9GT1JNQVRTX1NQTElULmV4ZWMoZm9ybWF0KTtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgd2hpbGUgKF9mb3JtYXQpIHtcbiAgICAgICAgICAgIG1hdGNoID0gREFURV9GT1JNQVRTX1NQTElULmV4ZWMoX2Zvcm1hdCk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChtYXRjaC5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgX2Zvcm1hdCA9ICgocGFydHMucG9wKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goX2Zvcm1hdCk7XG4gICAgICAgICAgICAgICAgX2Zvcm1hdCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgREFURV9GT1JNQVRURVJfQ0FDSEUuc2V0KGNhY2hlS2V5LCBwYXJ0cyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRleHQsIHBhcnQpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gZm4gPSBEQVRFX0ZPUk1BVFNbcGFydF07XG4gICAgICAgIHJldHVybiB0ZXh0ICsgKGZuID8gZm4oZGF0ZSwgbG9jYWxlKSA6IHBhcnRUb1RpbWUocGFydCkpO1xuICAgIH0sICcnKTtcbn1cbi8qKlxuICogQHBhcmFtIHs/fSBwYXJ0XG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBwYXJ0VG9UaW1lKHBhcnQpIHtcbiAgICByZXR1cm4gcGFydCA9PT0gJ1xcJ1xcJycgPyAnXFwnJyA6IHBhcnQucmVwbGFjZSgvKF4nfCckKS9nLCAnJykucmVwbGFjZSgvJycvZywgJ1xcJycpO1xufVxudmFyIERhdGVGb3JtYXR0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGVGb3JtYXR0ZXIoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZGF0ZVxuICAgICAqIEBwYXJhbSB7P30gbG9jYWxlXG4gICAgICogQHBhcmFtIHs/fSBwYXR0ZXJuXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBEYXRlRm9ybWF0dGVyLmZvcm1hdCA9IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUsIHBhdHRlcm4pIHtcbiAgICAgICAgcmV0dXJuIGRhdGVGb3JtYXR0ZXIocGF0dGVybiwgZGF0ZSwgbG9jYWxlKTtcbiAgICB9O1xuICAgIHJldHVybiBEYXRlRm9ybWF0dGVyO1xufSgpKTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbnZhciBfTlVNQkVSX0ZPUk1BVF9SRUdFWFAgPSAvXihcXGQrKT9cXC4oKFxcZCspKC0oXFxkKykpPyk/JC87XG4vKipcbiAqIEBwYXJhbSB7P30gcGlwZVxuICogQHBhcmFtIHs/fSBsb2NhbGVcbiAqIEBwYXJhbSB7P30gdmFsdWVcbiAqIEBwYXJhbSB7P30gc3R5bGVcbiAqIEBwYXJhbSB7Pz19IGRpZ2l0c1xuICogQHBhcmFtIHs/PX0gY3VycmVuY3lcbiAqIEBwYXJhbSB7Pz19IGN1cnJlbmN5QXNTeW1ib2xcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihwaXBlLCBsb2NhbGUsIHZhbHVlLCBzdHlsZSwgZGlnaXRzLCBjdXJyZW5jeSwgY3VycmVuY3lBc1N5bWJvbCkge1xuICAgIGlmIChjdXJyZW5jeSA9PT0gdm9pZCAwKSB7IGN1cnJlbmN5ID0gbnVsbDsgfVxuICAgIGlmIChjdXJyZW5jeUFzU3ltYm9sID09PSB2b2lkIDApIHsgY3VycmVuY3lBc1N5bWJvbCA9IGZhbHNlOyB9XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIC8vIENvbnZlcnQgc3RyaW5ncyB0byBudW1iZXJzXG4gICAgdmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGlzTnVtZXJpYyh2YWx1ZSkgPyArdmFsdWUgOiB2YWx1ZTtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IocGlwZSwgdmFsdWUpO1xuICAgIH1cbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBtaW5JbnQgPSB1bmRlZmluZWQ7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbWluRnJhY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbWF4RnJhY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgaWYgKHN0eWxlICE9PSBOdW1iZXJGb3JtYXRTdHlsZS5DdXJyZW5jeSkge1xuICAgICAgICAvLyByZWx5IG9uIEludGwgZGVmYXVsdCBmb3IgY3VycmVuY3lcbiAgICAgICAgbWluSW50ID0gMTtcbiAgICAgICAgbWluRnJhY3Rpb24gPSAwO1xuICAgICAgICBtYXhGcmFjdGlvbiA9IDM7XG4gICAgfVxuICAgIGlmIChkaWdpdHMpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcGFydHMgPSBkaWdpdHMubWF0Y2goX05VTUJFUl9GT1JNQVRfUkVHRVhQKTtcbiAgICAgICAgaWYgKHBhcnRzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGlnaXRzICsgXCIgaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mbyBmb3IgbnVtYmVyIHBpcGVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0c1sxXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtaW5JbnQgPSBwYXJzZUludEF1dG9SYWRpeChwYXJ0c1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzWzNdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1pbkZyYWN0aW9uID0gcGFyc2VJbnRBdXRvUmFkaXgocGFydHNbM10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0c1s1XSAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXhGcmFjdGlvbiA9IHBhcnNlSW50QXV0b1JhZGl4KHBhcnRzWzVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gTnVtYmVyRm9ybWF0dGVyLmZvcm1hdCgvKiogQHR5cGUgez99ICovICh2YWx1ZSksIGxvY2FsZSwgc3R5bGUsIHtcbiAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IG1pbkludCxcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5GcmFjdGlvbixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBtYXhGcmFjdGlvbixcbiAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgICBjdXJyZW5jeUFzU3ltYm9sOiBjdXJyZW5jeUFzU3ltYm9sLFxuICAgIH0pO1xufVxuLyoqXG4gKiBcXEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIFxcQHdoYXRJdERvZXMgRm9ybWF0cyBhIG51bWJlciBhY2NvcmRpbmcgdG8gbG9jYWxlIHJ1bGVzLlxuICogXFxAaG93VG9Vc2UgYG51bWJlcl9leHByZXNzaW9uIHwgbnVtYmVyWzpkaWdpdEluZm9dYFxuICpcbiAqIEZvcm1hdHMgYSBudW1iZXIgYXMgdGV4dC4gR3JvdXAgc2l6aW5nIGFuZCBzZXBhcmF0b3IgYW5kIG90aGVyIGxvY2FsZS1zcGVjaWZpY1xuICogY29uZmlndXJhdGlvbnMgYXJlIGJhc2VkIG9uIHRoZSBhY3RpdmUgbG9jYWxlLlxuICpcbiAqIHdoZXJlIGBleHByZXNzaW9uYCBpcyBhIG51bWJlcjpcbiAqICAtIGBkaWdpdEluZm9gIGlzIGEgYHN0cmluZ2Agd2hpY2ggaGFzIGEgZm9sbG93aW5nIGZvcm1hdDogPGJyPlxuICogICAgIDxjb2RlPnttaW5JbnRlZ2VyRGlnaXRzfS57bWluRnJhY3Rpb25EaWdpdHN9LXttYXhGcmFjdGlvbkRpZ2l0c308L2NvZGU+XG4gKiAgIC0gYG1pbkludGVnZXJEaWdpdHNgIGlzIHRoZSBtaW5pbXVtIG51bWJlciBvZiBpbnRlZ2VyIGRpZ2l0cyB0byB1c2UuIERlZmF1bHRzIHRvIGAxYC5cbiAqICAgLSBgbWluRnJhY3Rpb25EaWdpdHNgIGlzIHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZnJhY3Rpb24uIERlZmF1bHRzIHRvIGAwYC5cbiAqICAgLSBgbWF4RnJhY3Rpb25EaWdpdHNgIGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZnJhY3Rpb24uIERlZmF1bHRzIHRvIGAzYC5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgYWNjZXB0YWJsZSByYW5nZSBmb3IgZWFjaCBvZiB0aGVzZSBudW1iZXJzIGFuZCBvdGhlclxuICogZGV0YWlscyBzZWUgeW91ciBuYXRpdmUgaW50ZXJuYXRpb25hbGl6YXRpb24gbGlicmFyeS5cbiAqXG4gKiBXQVJOSU5HOiB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJIHdoaWNoIGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vyc1xuICogYW5kIG1heSByZXF1aXJlIGEgcG9seWZpbGwuIFNlZSBbQnJvd3NlciBTdXBwb3J0XShndWlkZS9icm93c2VyLXN1cHBvcnQpIGZvciBkZXRhaWxzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL251bWJlcl9waXBlLnRzIHJlZ2lvbj0nTnVtYmVyUGlwZSd9XG4gKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBEZWNpbWFsUGlwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBfbG9jYWxlXG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVjaW1hbFBpcGUoX2xvY2FsZSkge1xuICAgICAgICB0aGlzLl9sb2NhbGUgPSBfbG9jYWxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHBhcmFtIHs/PX0gZGlnaXRzXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBEZWNpbWFsUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlLCBkaWdpdHMpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdE51bWJlcihEZWNpbWFsUGlwZSwgdGhpcy5fbG9jYWxlLCB2YWx1ZSwgTnVtYmVyRm9ybWF0U3R5bGUuRGVjaW1hbCwgZGlnaXRzKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWNpbWFsUGlwZTtcbn0oKSk7XG5EZWNpbWFsUGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ251bWJlcicgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5EZWNpbWFsUGlwZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHVuZGVmaW5lZCwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbTE9DQUxFX0lELF0gfSxdIH0sXG5dOyB9O1xuLyoqXG4gKiBcXEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIFxcQHdoYXRJdERvZXMgRm9ybWF0cyBhIG51bWJlciBhcyBhIHBlcmNlbnRhZ2UgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqIFxcQGhvd1RvVXNlIGBudW1iZXJfZXhwcmVzc2lvbiB8IHBlcmNlbnRbOmRpZ2l0SW5mb11gXG4gKlxuICogXFxAZGVzY3JpcHRpb25cbiAqXG4gKiBGb3JtYXRzIGEgbnVtYmVyIGFzIHBlcmNlbnRhZ2UuXG4gKlxuICogLSBgZGlnaXRJbmZvYCBTZWUge1xcQGxpbmsgRGVjaW1hbFBpcGV9IGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbi5cbiAqXG4gKiBXQVJOSU5HOiB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJIHdoaWNoIGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vyc1xuICogYW5kIG1heSByZXF1aXJlIGEgcG9seWZpbGwuIFNlZSBbQnJvd3NlciBTdXBwb3J0XShndWlkZS9icm93c2VyLXN1cHBvcnQpIGZvciBkZXRhaWxzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL251bWJlcl9waXBlLnRzIHJlZ2lvbj0nUGVyY2VudFBpcGUnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgUGVyY2VudFBpcGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX2xvY2FsZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFBlcmNlbnRQaXBlKF9sb2NhbGUpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gX2xvY2FsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Pz19IGRpZ2l0c1xuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgUGVyY2VudFBpcGUucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uICh2YWx1ZSwgZGlnaXRzKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXROdW1iZXIoUGVyY2VudFBpcGUsIHRoaXMuX2xvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLlBlcmNlbnQsIGRpZ2l0cyk7XG4gICAgfTtcbiAgICByZXR1cm4gUGVyY2VudFBpcGU7XG59KCkpO1xuUGVyY2VudFBpcGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IFBpcGUsIGFyZ3M6IFt7IG5hbWU6ICdwZXJjZW50JyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cblBlcmNlbnRQaXBlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtMT0NBTEVfSUQsXSB9LF0gfSxcbl07IH07XG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogXFxAd2hhdEl0RG9lcyBGb3JtYXRzIGEgbnVtYmVyIGFzIGN1cnJlbmN5IHVzaW5nIGxvY2FsZSBydWxlcy5cbiAqIFxcQGhvd1RvVXNlIGBudW1iZXJfZXhwcmVzc2lvbiB8IGN1cnJlbmN5WzpjdXJyZW5jeUNvZGVbOnN5bWJvbERpc3BsYXlbOmRpZ2l0SW5mb11dXWBcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogVXNlIGBjdXJyZW5jeWAgdG8gZm9ybWF0IGEgbnVtYmVyIGFzIGN1cnJlbmN5LlxuICpcbiAqIC0gYGN1cnJlbmN5Q29kZWAgaXMgdGhlIFtJU08gNDIxN10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzQyMTcpIGN1cnJlbmN5IGNvZGUsIHN1Y2hcbiAqICAgIGFzIGBVU0RgIGZvciB0aGUgVVMgZG9sbGFyIGFuZCBgRVVSYCBmb3IgdGhlIGV1cm8uXG4gKiAtIGBzeW1ib2xEaXNwbGF5YCBpcyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRvIHVzZSB0aGUgY3VycmVuY3kgc3ltYm9sIG9yIGNvZGUuXG4gKiAgIC0gYHRydWVgOiB1c2Ugc3ltYm9sIChlLmcuIGAkYCkuXG4gKiAgIC0gYGZhbHNlYChkZWZhdWx0KTogdXNlIGNvZGUgKGUuZy4gYFVTRGApLlxuICogLSBgZGlnaXRJbmZvYCBTZWUge1xcQGxpbmsgRGVjaW1hbFBpcGV9IGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbi5cbiAqXG4gKiBXQVJOSU5HOiB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJIHdoaWNoIGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vyc1xuICogYW5kIG1heSByZXF1aXJlIGEgcG9seWZpbGwuIFNlZSBbQnJvd3NlciBTdXBwb3J0XShndWlkZS9icm93c2VyLXN1cHBvcnQpIGZvciBkZXRhaWxzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL251bWJlcl9waXBlLnRzIHJlZ2lvbj0nQ3VycmVuY3lQaXBlJ31cbiAqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIEN1cnJlbmN5UGlwZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBfbG9jYWxlXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ3VycmVuY3lQaXBlKF9sb2NhbGUpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlID0gX2xvY2FsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Pz19IGN1cnJlbmN5Q29kZVxuICAgICAqIEBwYXJhbSB7Pz19IHN5bWJvbERpc3BsYXlcbiAgICAgKiBAcGFyYW0gez89fSBkaWdpdHNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEN1cnJlbmN5UGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW5jeUNvZGUsIHN5bWJvbERpc3BsYXksIGRpZ2l0cykge1xuICAgICAgICBpZiAoY3VycmVuY3lDb2RlID09PSB2b2lkIDApIHsgY3VycmVuY3lDb2RlID0gJ1VTRCc7IH1cbiAgICAgICAgaWYgKHN5bWJvbERpc3BsYXkgPT09IHZvaWQgMCkgeyBzeW1ib2xEaXNwbGF5ID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE51bWJlcihDdXJyZW5jeVBpcGUsIHRoaXMuX2xvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5LCBkaWdpdHMsIGN1cnJlbmN5Q29kZSwgc3ltYm9sRGlzcGxheSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ3VycmVuY3lQaXBlO1xufSgpKTtcbkN1cnJlbmN5UGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ2N1cnJlbmN5JyB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkN1cnJlbmN5UGlwZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHVuZGVmaW5lZCwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbTE9DQUxFX0lELF0gfSxdIH0sXG5dOyB9O1xuLyoqXG4gKiBAcGFyYW0gez99IHRleHRcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW50QXV0b1JhZGl4KHRleHQpIHtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyByZXN1bHQgPSBwYXJzZUludCh0ZXh0KTtcbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlciBsaXRlcmFsIHdoZW4gcGFyc2luZyAnICsgdGV4dCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gdmFsdWVcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xuICAgIHJldHVybiAhaXNOYU4odmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSk7XG59XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG52YXIgSVNPODYwMV9EQVRFX1JFR0VYID0gL14oXFxkezR9KS0/KFxcZFxcZCktPyhcXGRcXGQpKD86VChcXGRcXGQpKD86Oj8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzpcXC4oXFxkKykpPyk/KT8oWnwoWystXSkoXFxkXFxkKTo/KFxcZFxcZCkpPyk/JC87XG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogXFxAd2hhdEl0RG9lcyBGb3JtYXRzIGEgZGF0ZSBhY2NvcmRpbmcgdG8gbG9jYWxlIHJ1bGVzLlxuICogXFxAaG93VG9Vc2UgYGRhdGVfZXhwcmVzc2lvbiB8IGRhdGVbOmZvcm1hdF1gXG4gKiBcXEBkZXNjcmlwdGlvblxuICpcbiAqIFdoZXJlOlxuICogLSBgZXhwcmVzc2lvbmAgaXMgYSBkYXRlIG9iamVjdCBvciBhIG51bWJlciAobWlsbGlzZWNvbmRzIHNpbmNlIFVUQyBlcG9jaCkgb3IgYW4gSVNPIHN0cmluZ1xuICogKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9OT1RFLWRhdGV0aW1lKS5cbiAqIC0gYGZvcm1hdGAgaW5kaWNhdGVzIHdoaWNoIGRhdGUvdGltZSBjb21wb25lbnRzIHRvIGluY2x1ZGUuIFRoZSBmb3JtYXQgY2FuIGJlIHByZWRlZmluZWQgYXNcbiAqICAgc2hvd24gYmVsb3cgb3IgY3VzdG9tIGFzIHNob3duIGluIHRoZSB0YWJsZS5cbiAqICAgLSBgJ21lZGl1bSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTWRqbXMnYCAoZS5nLiBgU2VwIDMsIDIwMTAsIDEyOjA1OjA4IFBNYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ3Nob3J0J2A6IGVxdWl2YWxlbnQgdG8gYCd5TWRqbSdgIChlLmcuIGA5LzMvMjAxMCwgMTI6MDUgUE1gIGZvciBgZW4tVVNgKVxuICogICAtIGAnZnVsbERhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1NRUVFRWQnYCAoZS5nLiBgRnJpZGF5LCBTZXB0ZW1iZXIgMywgMjAxMGAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdsb25nRGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTU1kJ2AgKGUuZy4gYFNlcHRlbWJlciAzLCAyMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ21lZGl1bURhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1kJ2AgKGUuZy4gYFNlcCAzLCAyMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ3Nob3J0RGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1kJ2AgKGUuZy4gYDkvMy8yMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ21lZGl1bVRpbWUnYDogZXF1aXZhbGVudCB0byBgJ2ptcydgIChlLmcuIGAxMjowNTowOCBQTWAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdzaG9ydFRpbWUnYDogZXF1aXZhbGVudCB0byBgJ2ptJ2AgKGUuZy4gYDEyOjA1IFBNYCBmb3IgYGVuLVVTYClcbiAqXG4gKlxuICogIHwgQ29tcG9uZW50IHwgU3ltYm9sIHwgTmFycm93IHwgU2hvcnQgRm9ybSAgIHwgTG9uZyBGb3JtICAgICAgICAgfCBOdW1lcmljICAgfCAyLWRpZ2l0ICAgfFxuICogIHwtLS0tLS0tLS0tLXw6LS0tLS0tOnwtLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tfFxuICogIHwgZXJhICAgICAgIHwgICBHICAgIHwgRyAoQSkgIHwgR0dHIChBRCkgICAgIHwgR0dHRyAoQW5ubyBEb21pbmkpfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgeWVhciAgICAgIHwgICB5ICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCB5ICgyMDE1KSAgfCB5eSAoMTUpICAgfFxuICogIHwgbW9udGggICAgIHwgICBNICAgIHwgTCAoUykgIHwgTU1NIChTZXApICAgIHwgTU1NTSAoU2VwdGVtYmVyKSAgfCBNICg5KSAgICAgfCBNTSAoMDkpICAgfFxuICogIHwgZGF5ICAgICAgIHwgICBkICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBkICgzKSAgICAgfCBkZCAoMDMpICAgfFxuICogIHwgd2Vla2RheSAgIHwgICBFICAgIHwgRSAoUykgIHwgRUVFIChTdW4pICAgIHwgRUVFRSAoU3VuZGF5KSAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgaG91ciAgICAgIHwgICBqICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBqICgxIFBNKSAgfCBqaiAoMSBQTSkgfFxuICogIHwgaG91cjEyICAgIHwgICBoICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBoICgxKSAgICAgfCBoaCAoMDEpICAgfFxuICogIHwgaG91cjI0ICAgIHwgICBIICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBIICgxMykgICAgfCBISCAoMTMpICAgfFxuICogIHwgbWludXRlICAgIHwgICBtICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBtICg1KSAgICAgfCBtbSAoMDUpICAgfFxuICogIHwgc2Vjb25kICAgIHwgICBzICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBzICg5KSAgICAgfCBzcyAoMDkpICAgfFxuICogIHwgdGltZXpvbmUgIHwgICB6ICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgeiAoUGFjaWZpYyBTdGFuZGFyZCBUaW1lKXwgLSAgfCAtICAgICAgICAgfFxuICogIHwgdGltZXpvbmUgIHwgICBaICAgIHwgLSAgICAgIHwgWiAoR01ULTg6MDApIHwgLSAgICAgICAgICAgICAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgdGltZXpvbmUgIHwgICBhICAgIHwgLSAgICAgIHwgYSAoUE0pICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICpcbiAqIEluIGphdmFzY3JpcHQsIG9ubHkgdGhlIGNvbXBvbmVudHMgc3BlY2lmaWVkIHdpbGwgYmUgcmVzcGVjdGVkIChub3QgdGhlIG9yZGVyaW5nLFxuICogcHVuY3R1YXRpb25zLCAuLi4pIGFuZCBkZXRhaWxzIG9mIHRoZSBmb3JtYXR0aW5nIHdpbGwgYmUgZGVwZW5kZW50IG9uIHRoZSBsb2NhbGUuXG4gKlxuICogVGltZXpvbmUgb2YgdGhlIGZvcm1hdHRlZCB0ZXh0IHdpbGwgYmUgdGhlIGxvY2FsIHN5c3RlbSB0aW1lem9uZSBvZiB0aGUgZW5kLXVzZXIncyBtYWNoaW5lLlxuICpcbiAqIFdoZW4gdGhlIGV4cHJlc3Npb24gaXMgYSBJU08gc3RyaW5nIHdpdGhvdXQgdGltZSAoZS5nLiAyMDE2LTA5LTE5KSB0aGUgdGltZSB6b25lIG9mZnNldCBpcyBub3RcbiAqIGFwcGxpZWQgYW5kIHRoZSBmb3JtYXR0ZWQgdGV4dCB3aWxsIGhhdmUgdGhlIHNhbWUgZGF5LCBtb250aCBhbmQgeWVhciBvZiB0aGUgZXhwcmVzc2lvbi5cbiAqXG4gKiBXQVJOSU5HUzpcbiAqIC0gdGhpcyBwaXBlIGlzIG1hcmtlZCBhcyBwdXJlIGhlbmNlIGl0IHdpbGwgbm90IGJlIHJlLWV2YWx1YXRlZCB3aGVuIHRoZSBpbnB1dCBpcyBtdXRhdGVkLlxuICogICBJbnN0ZWFkIHVzZXJzIHNob3VsZCB0cmVhdCB0aGUgZGF0ZSBhcyBhbiBpbW11dGFibGUgb2JqZWN0IGFuZCBjaGFuZ2UgdGhlIHJlZmVyZW5jZSB3aGVuIHRoZVxuICogICBwaXBlIG5lZWRzIHRvIHJlLXJ1biAodGhpcyBpcyB0byBhdm9pZCByZWZvcm1hdHRpbmcgdGhlIGRhdGUgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBydW5cbiAqICAgd2hpY2ggd291bGQgYmUgYW4gZXhwZW5zaXZlIG9wZXJhdGlvbikuXG4gKiAtIHRoaXMgcGlwZSB1c2VzIHRoZSBJbnRlcm5hdGlvbmFsaXphdGlvbiBBUEkuIFRoZXJlZm9yZSBpdCBpcyBvbmx5IHJlbGlhYmxlIGluIENocm9tZSBhbmQgT3BlcmFcbiAqICAgYnJvd3NlcnMuXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogQXNzdW1pbmcgYGRhdGVPYmpgIGlzICh5ZWFyOiAyMDE1LCBtb250aDogNiwgZGF5OiAxNSwgaG91cjogMjEsIG1pbnV0ZTogNDMsIHNlY29uZDogMTEpXG4gKiBpbiB0aGUgX2xvY2FsXyB0aW1lIGFuZCBsb2NhbGUgaXMgJ2VuLVVTJzpcbiAqXG4gKiBgYGBcbiAqICAgICB7eyBkYXRlT2JqIHwgZGF0ZSB9fSAgICAgICAgICAgICAgIC8vIG91dHB1dCBpcyAnSnVuIDE1LCAyMDE1J1xuICogICAgIHt7IGRhdGVPYmogfCBkYXRlOidtZWRpdW0nIH19ICAgICAgLy8gb3V0cHV0IGlzICdKdW4gMTUsIDIwMTUsIDk6NDM6MTEgUE0nXG4gKiAgICAge3sgZGF0ZU9iaiB8IGRhdGU6J3Nob3J0VGltZScgfX0gICAvLyBvdXRwdXQgaXMgJzk6NDMgUE0nXG4gKiAgICAge3sgZGF0ZU9iaiB8IGRhdGU6J21tc3MnIH19ICAgICAgICAvLyBvdXRwdXQgaXMgJzQzOjExJ1xuICogYGBgXG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL2RhdGVfcGlwZS50cyByZWdpb249J0RhdGVQaXBlJ31cbiAqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIERhdGVQaXBlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IF9sb2NhbGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEYXRlUGlwZShfbG9jYWxlKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsZSA9IF9sb2NhbGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcGFyYW0gez89fSBwYXR0ZXJuXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBEYXRlUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlLCBwYXR0ZXJuKSB7XG4gICAgICAgIGlmIChwYXR0ZXJuID09PSB2b2lkIDApIHsgcGF0dGVybiA9ICdtZWRpdW1EYXRlJzsgfVxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBkYXRlO1xuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkgfHwgdmFsdWUgIT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgZGF0ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAvXihcXGR7NH0tXFxkezEsMn0tXFxkezEsMn0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRm9yIElTTyBTdHJpbmdzIHdpdGhvdXQgdGltZSB0aGUgZGF5LCBtb250aCBhbmQgeWVhciBtdXN0IGJlIGV4dHJhY3RlZCBmcm9tIHRoZSBJU08gU3RyaW5nXG4gICAgICAgICAgICAgKiBiZWZvcmUgRGF0ZSBjcmVhdGlvbiB0byBhdm9pZCB0aW1lIG9mZnNldCBhbmQgZXJyb3JzIGluIHRoZSBuZXcgRGF0ZS5cbiAgICAgICAgICAgICAqIElmIHdlIG9ubHkgcmVwbGFjZSAnLScgd2l0aCAnLCcgaW4gdGhlIElTTyBTdHJpbmcgKFwiMjAxNSwwMSwwMVwiKSwgYW5kIHRyeSB0byBjcmVhdGUgYSBuZXdcbiAgICAgICAgICAgICAqIGRhdGUsIHNvbWUgYnJvd3NlcnMgKGUuZy4gSUUgOSkgd2lsbCB0aHJvdyBhbiBpbnZhbGlkIERhdGUgZXJyb3JcbiAgICAgICAgICAgICAqIElmIHdlIGxlYXZlIHRoZSAnLScgKFwiMjAxNS0wMS0wMVwiKSBhbmQgdHJ5IHRvIGNyZWF0ZSBhIG5ldyBEYXRlKFwiMjAxNS0wMS0wMVwiKSB0aGUgdGltZW9mZnNldFxuICAgICAgICAgICAgICogaXMgYXBwbGllZFxuICAgICAgICAgICAgICogTm90ZTogSVNPIG1vbnRocyBhcmUgMCBmb3IgSmFudWFyeSwgMSBmb3IgRmVicnVhcnksIC4uLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgX2EgPSB2YWx1ZS5zcGxpdCgnLScpLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBwYXJzZUludCh2YWwsIDEwKTsgfSksIHkgPSBfYVswXSwgbSA9IF9hWzFdLCBkID0gX2FbMl07XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gbWF0Y2ggPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpICYmIChtYXRjaCA9IHZhbHVlLm1hdGNoKElTTzg2MDFfREFURV9SRUdFWCkpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IGlzb1N0cmluZ1RvRGF0ZShtYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoRGF0ZVBpcGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRGF0ZUZvcm1hdHRlci5mb3JtYXQoZGF0ZSwgdGhpcy5fbG9jYWxlLCBEYXRlUGlwZS5fQUxJQVNFU1twYXR0ZXJuXSB8fCBwYXR0ZXJuKTtcbiAgICB9O1xuICAgIHJldHVybiBEYXRlUGlwZTtcbn0oKSk7XG4vKipcbiAqIFxcQGludGVybmFsXG4gKi9cbkRhdGVQaXBlLl9BTElBU0VTID0ge1xuICAgICdtZWRpdW0nOiAneU1NTWRqbXMnLFxuICAgICdzaG9ydCc6ICd5TWRqbScsXG4gICAgJ2Z1bGxEYXRlJzogJ3lNTU1NRUVFRWQnLFxuICAgICdsb25nRGF0ZSc6ICd5TU1NTWQnLFxuICAgICdtZWRpdW1EYXRlJzogJ3lNTU1kJyxcbiAgICAnc2hvcnREYXRlJzogJ3lNZCcsXG4gICAgJ21lZGl1bVRpbWUnOiAnam1zJyxcbiAgICAnc2hvcnRUaW1lJzogJ2ptJ1xufTtcbkRhdGVQaXBlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBQaXBlLCBhcmdzOiBbeyBuYW1lOiAnZGF0ZScsIHB1cmU6IHRydWUgfSxdIH0sXG5dO1xuLyoqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5EYXRlUGlwZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IHVuZGVmaW5lZCwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbTE9DQUxFX0lELF0gfSxdIH0sXG5dOyB9O1xuLyoqXG4gKiBAcGFyYW0gez99IG9ialxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gaXNCbGFuayhvYmopIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgfHwgb2JqID09PSAnJztcbn1cbi8qKlxuICogQHBhcmFtIHs/fSBvYmpcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZShvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4ob2JqLnZhbHVlT2YoKSk7XG59XG4vKipcbiAqIEBwYXJhbSB7P30gbWF0Y2hcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGlzb1N0cmluZ1RvRGF0ZShtYXRjaCkge1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB0ekhvdXIgPSAwO1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIHR6TWluID0gMDtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBkYXRlU2V0dGVyID0gbWF0Y2hbOF0gPyBkYXRlLnNldFVUQ0Z1bGxZZWFyIDogZGF0ZS5zZXRGdWxsWWVhcjtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB0aW1lU2V0dGVyID0gbWF0Y2hbOF0gPyBkYXRlLnNldFVUQ0hvdXJzIDogZGF0ZS5zZXRIb3VycztcbiAgICBpZiAobWF0Y2hbOV0pIHtcbiAgICAgICAgdHpIb3VyID0gdG9JbnQobWF0Y2hbOV0gKyBtYXRjaFsxMF0pO1xuICAgICAgICB0ek1pbiA9IHRvSW50KG1hdGNoWzldICsgbWF0Y2hbMTFdKTtcbiAgICB9XG4gICAgZGF0ZVNldHRlci5jYWxsKGRhdGUsIHRvSW50KG1hdGNoWzFdKSwgdG9JbnQobWF0Y2hbMl0pIC0gMSwgdG9JbnQobWF0Y2hbM10pKTtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBoID0gdG9JbnQobWF0Y2hbNF0gfHwgJzAnKSAtIHR6SG91cjtcbiAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBtID0gdG9JbnQobWF0Y2hbNV0gfHwgJzAnKSAtIHR6TWluO1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIHMgPSB0b0ludChtYXRjaFs2XSB8fCAnMCcpO1xuICAgIHZhciAvKiogQHR5cGUgez99ICovIG1zID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KCcwLicgKyAobWF0Y2hbN10gfHwgMCkpICogMTAwMCk7XG4gICAgdGltZVNldHRlci5jYWxsKGRhdGUsIGgsIG0sIHMsIG1zKTtcbiAgICByZXR1cm4gZGF0ZTtcbn1cbi8qKlxuICogQHBhcmFtIHs/fSBzdHJcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIHRvSW50KHN0cikge1xuICAgIHJldHVybiBwYXJzZUludChzdHIsIDEwKTtcbn1cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbnZhciBfSU5URVJQT0xBVElPTl9SRUdFWFAgPSAvIy9nO1xuLyoqXG4gKiBcXEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIFxcQHdoYXRJdERvZXMgTWFwcyBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgcGx1cmFsaXplcyB0aGUgdmFsdWUgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqIFxcQGhvd1RvVXNlIGBleHByZXNzaW9uIHwgaTE4blBsdXJhbDptYXBwaW5nYFxuICogXFxAZGVzY3JpcHRpb25cbiAqXG4gKiAgV2hlcmU6XG4gKiAgLSBgZXhwcmVzc2lvbmAgaXMgYSBudW1iZXIuXG4gKiAgLSBgbWFwcGluZ2AgaXMgYW4gb2JqZWN0IHRoYXQgbWltaWNzIHRoZSBJQ1UgZm9ybWF0LCBzZWVcbiAqICAgIGh0dHA6Ly91c2VyZ3VpZGUuaWN1LXByb2plY3Qub3JnL2Zvcm1hdHBhcnNlL21lc3NhZ2VzXG4gKlxuICogICMjIEV4YW1wbGVcbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvaTE4bl9waXBlLnRzIHJlZ2lvbj0nSTE4blBsdXJhbFBpcGVDb21wb25lbnQnfVxuICpcbiAqIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSTE4blBsdXJhbFBpcGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gX2xvY2FsaXphdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEkxOG5QbHVyYWxQaXBlKF9sb2NhbGl6YXRpb24pIHtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uID0gX2xvY2FsaXphdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7P30gcGx1cmFsTWFwXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBJMThuUGx1cmFsUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlLCBwbHVyYWxNYXApIHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGlmICh0eXBlb2YgcGx1cmFsTWFwICE9PSAnb2JqZWN0JyB8fCBwbHVyYWxNYXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IGludmFsaWRQaXBlQXJndW1lbnRFcnJvcihJMThuUGx1cmFsUGlwZSwgcGx1cmFsTWFwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBrZXkgPSBnZXRQbHVyYWxDYXRlZ29yeSh2YWx1ZSwgT2JqZWN0LmtleXMocGx1cmFsTWFwKSwgdGhpcy5fbG9jYWxpemF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHBsdXJhbE1hcFtrZXldLnJlcGxhY2UoX0lOVEVSUE9MQVRJT05fUkVHRVhQLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9O1xuICAgIHJldHVybiBJMThuUGx1cmFsUGlwZTtcbn0oKSk7XG5JMThuUGx1cmFsUGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ2kxOG5QbHVyYWwnLCBwdXJlOiB0cnVlIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuSTE4blBsdXJhbFBpcGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBOZ0xvY2FsaXphdGlvbiwgfSxcbl07IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFxcQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogXFxAd2hhdEl0RG9lcyBHZW5lcmljIHNlbGVjdG9yIHRoYXQgZGlzcGxheXMgdGhlIHN0cmluZyB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUuXG4gKiBcXEBob3dUb1VzZSBgZXhwcmVzc2lvbiB8IGkxOG5TZWxlY3Q6bWFwcGluZ2BcbiAqIFxcQGRlc2NyaXB0aW9uXG4gKlxuICogIFdoZXJlIGBtYXBwaW5nYCBpcyBhbiBvYmplY3QgdGhhdCBpbmRpY2F0ZXMgdGhlIHRleHQgdGhhdCBzaG91bGQgYmUgZGlzcGxheWVkXG4gKiAgZm9yIGRpZmZlcmVudCB2YWx1ZXMgb2YgdGhlIHByb3ZpZGVkIGBleHByZXNzaW9uYC5cbiAqICBJZiBub25lIG9mIHRoZSBrZXlzIG9mIHRoZSBtYXBwaW5nIG1hdGNoIHRoZSB2YWx1ZSBvZiB0aGUgYGV4cHJlc3Npb25gLCB0aGVuIHRoZSBjb250ZW50XG4gKiAgb2YgdGhlIGBvdGhlcmAga2V5IGlzIHJldHVybmVkIHdoZW4gcHJlc2VudCwgb3RoZXJ3aXNlIGFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqXG4gKiAgIyMgRXhhbXBsZVxuICpcbiAqIHtcXEBleGFtcGxlIGNvbW1vbi9waXBlcy90cy9pMThuX3BpcGUudHMgcmVnaW9uPSdJMThuU2VsZWN0UGlwZUNvbXBvbmVudCd9XG4gKlxuICogIFxcQGV4cGVyaW1lbnRhbFxuICovXG52YXIgSTE4blNlbGVjdFBpcGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEkxOG5TZWxlY3RQaXBlKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHBhcmFtIHs/fSBtYXBwaW5nXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBJMThuU2VsZWN0UGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlLCBtYXBwaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAodHlwZW9mIG1hcHBpbmcgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IGludmFsaWRQaXBlQXJndW1lbnRFcnJvcihJMThuU2VsZWN0UGlwZSwgbWFwcGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcHBpbmcuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwcGluZ1t2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcHBpbmcuaGFzT3duUHJvcGVydHkoJ290aGVyJykpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXBwaW5nWydvdGhlciddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuICAgIHJldHVybiBJMThuU2VsZWN0UGlwZTtcbn0oKSk7XG5JMThuU2VsZWN0UGlwZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogUGlwZSwgYXJnczogW3sgbmFtZTogJ2kxOG5TZWxlY3QnLCBwdXJlOiB0cnVlIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuSTE4blNlbGVjdFBpcGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBcXEB3aGF0SXREb2VzIENvbnZlcnRzIHZhbHVlIGludG8gSlNPTiBzdHJpbmcuXG4gKiBcXEBob3dUb1VzZSBgZXhwcmVzc2lvbiB8IGpzb25gXG4gKiBcXEBkZXNjcmlwdGlvblxuICpcbiAqIENvbnZlcnRzIHZhbHVlIGludG8gc3RyaW5nIHVzaW5nIGBKU09OLnN0cmluZ2lmeWAuIFVzZWZ1bCBmb3IgZGVidWdnaW5nLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvanNvbl9waXBlLnRzIHJlZ2lvbj0nSnNvblBpcGUnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgSnNvblBpcGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpzb25QaXBlKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHZhbHVlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBKc29uUGlwZS5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMik7IH07XG4gICAgcmV0dXJuIEpzb25QaXBlO1xufSgpKTtcbkpzb25QaXBlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBQaXBlLCBhcmdzOiBbeyBuYW1lOiAnanNvbicsIHB1cmU6IGZhbHNlIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuSnNvblBpcGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogXFxAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBcXEB3aGF0SXREb2VzIENyZWF0ZXMgYSBuZXcgTGlzdCBvciBTdHJpbmcgY29udGFpbmluZyBhIHN1YnNldCAoc2xpY2UpIG9mIHRoZSBlbGVtZW50cy5cbiAqIFxcQGhvd1RvVXNlIGBhcnJheV9vcl9zdHJpbmdfZXhwcmVzc2lvbiB8IHNsaWNlOnN0YXJ0WzplbmRdYFxuICogXFxAZGVzY3JpcHRpb25cbiAqXG4gKiBXaGVyZSB0aGUgaW5wdXQgZXhwcmVzc2lvbiBpcyBhIGBMaXN0YCBvciBgU3RyaW5nYCwgYW5kOlxuICogLSBgc3RhcnRgOiBUaGUgc3RhcnRpbmcgaW5kZXggb2YgdGhlIHN1YnNldCB0byByZXR1cm4uXG4gKiAgIC0gKiphIHBvc2l0aXZlIGludGVnZXIqKjogcmV0dXJuIHRoZSBpdGVtIGF0IGBzdGFydGAgaW5kZXggYW5kIGFsbCBpdGVtcyBhZnRlclxuICogICAgIGluIHRoZSBsaXN0IG9yIHN0cmluZyBleHByZXNzaW9uLlxuICogICAtICoqYSBuZWdhdGl2ZSBpbnRlZ2VyKio6IHJldHVybiB0aGUgaXRlbSBhdCBgc3RhcnRgIGluZGV4IGZyb20gdGhlIGVuZCBhbmQgYWxsIGl0ZW1zIGFmdGVyXG4gKiAgICAgaW4gdGhlIGxpc3Qgb3Igc3RyaW5nIGV4cHJlc3Npb24uXG4gKiAgIC0gKippZiBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRoZSBzaXplIG9mIHRoZSBleHByZXNzaW9uKio6IHJldHVybiBhbiBlbXB0eSBsaXN0IG9yIHN0cmluZy5cbiAqICAgLSAqKmlmIG5lZ2F0aXZlIGFuZCBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgdGhlIGV4cHJlc3Npb24qKjogcmV0dXJuIGVudGlyZSBsaXN0IG9yIHN0cmluZy5cbiAqIC0gYGVuZGA6IFRoZSBlbmRpbmcgaW5kZXggb2YgdGhlIHN1YnNldCB0byByZXR1cm4uXG4gKiAgIC0gKipvbWl0dGVkKio6IHJldHVybiBhbGwgaXRlbXMgdW50aWwgdGhlIGVuZC5cbiAqICAgLSAqKmlmIHBvc2l0aXZlKio6IHJldHVybiBhbGwgaXRlbXMgYmVmb3JlIGBlbmRgIGluZGV4IG9mIHRoZSBsaXN0IG9yIHN0cmluZy5cbiAqICAgLSAqKmlmIG5lZ2F0aXZlKio6IHJldHVybiBhbGwgaXRlbXMgYmVmb3JlIGBlbmRgIGluZGV4IGZyb20gdGhlIGVuZCBvZiB0aGUgbGlzdCBvciBzdHJpbmcuXG4gKlxuICogQWxsIGJlaGF2aW9yIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBiZWhhdmlvciBvZiB0aGUgSmF2YVNjcmlwdCBBUEkgYEFycmF5LnByb3RvdHlwZS5zbGljZSgpYFxuICogYW5kIGBTdHJpbmcucHJvdG90eXBlLnNsaWNlKClgLlxuICpcbiAqIFdoZW4gb3BlcmF0aW5nIG9uIGEgW0xpc3RdLCB0aGUgcmV0dXJuZWQgbGlzdCBpcyBhbHdheXMgYSBjb3B5IGV2ZW4gd2hlbiBhbGxcbiAqIHRoZSBlbGVtZW50cyBhcmUgYmVpbmcgcmV0dXJuZWQuXG4gKlxuICogV2hlbiBvcGVyYXRpbmcgb24gYSBibGFuayB2YWx1ZSwgdGhlIHBpcGUgcmV0dXJucyB0aGUgYmxhbmsgdmFsdWUuXG4gKlxuICogIyMgTGlzdCBFeGFtcGxlXG4gKlxuICogVGhpcyBgbmdGb3JgIGV4YW1wbGU6XG4gKlxuICoge1xcQGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL3NsaWNlX3BpcGUudHMgcmVnaW9uPSdTbGljZVBpcGVfbGlzdCd9XG4gKlxuICogcHJvZHVjZXMgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAgICAgPGxpPmI8L2xpPlxuICogICAgIDxsaT5jPC9saT5cbiAqXG4gKiAjIyBTdHJpbmcgRXhhbXBsZXNcbiAqXG4gKiB7XFxAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvc2xpY2VfcGlwZS50cyByZWdpb249J1NsaWNlUGlwZV9zdHJpbmcnfVxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgU2xpY2VQaXBlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTbGljZVBpcGUoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcGFyYW0gez99IHN0YXJ0XG4gICAgICogQHBhcmFtIHs/PX0gZW5kXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBTbGljZVBpcGUucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKFNsaWNlUGlwZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5zbGljZShzdGFydCwgZW5kKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gb2JqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBTbGljZVBpcGUucHJvdG90eXBlLnN1cHBvcnRzID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShvYmopOyB9O1xuICAgIHJldHVybiBTbGljZVBpcGU7XG59KCkpO1xuU2xpY2VQaXBlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBQaXBlLCBhcmdzOiBbeyBuYW1lOiAnc2xpY2UnLCBwdXJlOiBmYWxzZSB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cblNsaWNlUGlwZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgc2V0IG9mIGNvbW1vbiBQaXBlcy5cbiAqL1xuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgQW5ndWxhciBwaXBlcyB0aGF0IGFyZSBsaWtlbHkgdG8gYmUgdXNlZCBpbiBlYWNoIGFuZCBldmVyeSBhcHBsaWNhdGlvbi5cbiAqL1xudmFyIENPTU1PTl9QSVBFUyA9IFtcbiAgICBBc3luY1BpcGUsXG4gICAgVXBwZXJDYXNlUGlwZSxcbiAgICBMb3dlckNhc2VQaXBlLFxuICAgIEpzb25QaXBlLFxuICAgIFNsaWNlUGlwZSxcbiAgICBEZWNpbWFsUGlwZSxcbiAgICBQZXJjZW50UGlwZSxcbiAgICBUaXRsZUNhc2VQaXBlLFxuICAgIEN1cnJlbmN5UGlwZSxcbiAgICBEYXRlUGlwZSxcbiAgICBJMThuUGx1cmFsUGlwZSxcbiAgICBJMThuU2VsZWN0UGlwZSxcbl07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIFRoZSBtb2R1bGUgdGhhdCBpbmNsdWRlcyBhbGwgdGhlIGJhc2ljIEFuZ3VsYXIgZGlyZWN0aXZlcyBsaWtlIHtcXEBsaW5rIE5nSWZ9LCB7XFxAbGluayBOZ0Zvck9mfSwgLi4uXG4gKlxuICogXFxAc3RhYmxlXG4gKi9cbnZhciBDb21tb25Nb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbW1vbk1vZHVsZSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIENvbW1vbk1vZHVsZTtcbn0oKSk7XG5Db21tb25Nb2R1bGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW0NPTU1PTl9ESVJFQ1RJVkVTLCBDT01NT05fUElQRVNdLFxuICAgICAgICAgICAgICAgIGV4cG9ydHM6IFtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTXSxcbiAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBOZ0xvY2FsaXphdGlvbiwgdXNlQ2xhc3M6IE5nTG9jYWxlTG9jYWxpemF0aW9uIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKlxuICogQG5vY29sbGFwc2VcbiAqL1xuQ29tbW9uTW9kdWxlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEEgREkgVG9rZW4gcmVwcmVzZW50aW5nIHRoZSBtYWluIHJlbmRlcmluZyBjb250ZXh0LiBJbiBhIGJyb3dzZXIgdGhpcyBpcyB0aGUgRE9NIERvY3VtZW50LlxuICpcbiAqIE5vdGU6IERvY3VtZW50IG1pZ2h0IG5vdCBiZSBhdmFpbGFibGUgaW4gdGhlIEFwcGxpY2F0aW9uIENvbnRleHQgd2hlbiBBcHBsaWNhdGlvbiBhbmQgUmVuZGVyaW5nXG4gKiBDb250ZXh0cyBhcmUgbm90IHRoZSBzYW1lIChlLmcuIHdoZW4gcnVubmluZyB0aGUgYXBwbGljYXRpb24gaW50byBhIFdlYiBXb3JrZXIpLlxuICpcbiAqIFxcQHN0YWJsZVxuICovXG52YXIgRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0RvY3VtZW50VG9rZW4nKTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbnZhciBQTEFURk9STV9CUk9XU0VSX0lEID0gJ2Jyb3dzZXInO1xudmFyIFBMQVRGT1JNX1NFUlZFUl9JRCA9ICdzZXJ2ZXInO1xudmFyIFBMQVRGT1JNX1dPUktFUl9BUFBfSUQgPSAnYnJvd3NlcldvcmtlckFwcCc7XG52YXIgUExBVEZPUk1fV09SS0VSX1VJX0lEID0gJ2Jyb3dzZXJXb3JrZXJVaSc7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBhIHBsYXRmb3JtIGlkIHJlcHJlc2VudHMgYSBicm93c2VyIHBsYXRmb3JtLlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAcGFyYW0gez99IHBsYXRmb3JtSWRcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpIHtcbiAgICByZXR1cm4gcGxhdGZvcm1JZCA9PT0gUExBVEZPUk1fQlJPV1NFUl9JRDtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIGEgcGxhdGZvcm0gaWQgcmVwcmVzZW50cyBhIHNlcnZlciBwbGF0Zm9ybS5cbiAqIFxcQGV4cGVyaW1lbnRhbFxuICogQHBhcmFtIHs/fSBwbGF0Zm9ybUlkXG4gKiBAcmV0dXJuIHs/fVxuICovXG5mdW5jdGlvbiBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpIHtcbiAgICByZXR1cm4gcGxhdGZvcm1JZCA9PT0gUExBVEZPUk1fU0VSVkVSX0lEO1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgYSBwbGF0Zm9ybSBpZCByZXByZXNlbnRzIGEgd2ViIHdvcmtlciBhcHAgcGxhdGZvcm0uXG4gKiBcXEBleHBlcmltZW50YWxcbiAqIEBwYXJhbSB7P30gcGxhdGZvcm1JZFxuICogQHJldHVybiB7P31cbiAqL1xuZnVuY3Rpb24gaXNQbGF0Zm9ybVdvcmtlckFwcChwbGF0Zm9ybUlkKSB7XG4gICAgcmV0dXJuIHBsYXRmb3JtSWQgPT09IFBMQVRGT1JNX1dPUktFUl9BUFBfSUQ7XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciBhIHBsYXRmb3JtIGlkIHJlcHJlc2VudHMgYSB3ZWIgd29ya2VyIFVJIHBsYXRmb3JtLlxuICogXFxAZXhwZXJpbWVudGFsXG4gKiBAcGFyYW0gez99IHBsYXRmb3JtSWRcbiAqIEByZXR1cm4gez99XG4gKi9cbmZ1bmN0aW9uIGlzUGxhdGZvcm1Xb3JrZXJVaShwbGF0Zm9ybUlkKSB7XG4gICAgcmV0dXJuIHBsYXRmb3JtSWQgPT09IFBMQVRGT1JNX1dPUktFUl9VSV9JRDtcbn1cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIHB1YmxpYyBBUElzIG9mIHRoZSBjb21tb24gcGFja2FnZS5cbiAqL1xuLyoqXG4gKiBcXEBzdGFibGVcbiAqL1xudmFyIFZFUlNJT04gPSBuZXcgVmVyc2lvbignNC4zLjUnKTtcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIHB1YmxpYyBBUElzIG9mIHRoZSBjb21tb24gcGFja2FnZS5cbiAqL1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIEVudHJ5IHBvaW50IGZvciBhbGwgcHVibGljIEFQSXMgb2YgdGhlIGNvbW1vbiBwYWNrYWdlLlxuICovXG4vLyBUaGlzIGZpbGUgb25seSByZWV4cG9ydHMgY29udGVudCBvZiB0aGUgYHNyY2AgZm9sZGVyLiBLZWVwIGl0IHRoYXQgd2F5LlxuLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuZXhwb3J0IHsgTmdMb2NhbGVMb2NhbGl6YXRpb24sIE5nTG9jYWxpemF0aW9uLCBwYXJzZUNvb2tpZVZhbHVlIGFzIMm1cGFyc2VDb29raWVWYWx1ZSwgQ29tbW9uTW9kdWxlLCBOZ0NsYXNzLCBOZ0ZvciwgTmdGb3JPZiwgTmdGb3JPZkNvbnRleHQsIE5nSWYsIE5nSWZDb250ZXh0LCBOZ1BsdXJhbCwgTmdQbHVyYWxDYXNlLCBOZ1N0eWxlLCBOZ1N3aXRjaCwgTmdTd2l0Y2hDYXNlLCBOZ1N3aXRjaERlZmF1bHQsIE5nVGVtcGxhdGVPdXRsZXQsIE5nQ29tcG9uZW50T3V0bGV0LCBET0NVTUVOVCwgQXN5bmNQaXBlLCBEYXRlUGlwZSwgSTE4blBsdXJhbFBpcGUsIEkxOG5TZWxlY3RQaXBlLCBKc29uUGlwZSwgTG93ZXJDYXNlUGlwZSwgQ3VycmVuY3lQaXBlLCBEZWNpbWFsUGlwZSwgUGVyY2VudFBpcGUsIFNsaWNlUGlwZSwgVXBwZXJDYXNlUGlwZSwgVGl0bGVDYXNlUGlwZSwgUExBVEZPUk1fQlJPV1NFUl9JRCBhcyDJtVBMQVRGT1JNX0JST1dTRVJfSUQsIFBMQVRGT1JNX1NFUlZFUl9JRCBhcyDJtVBMQVRGT1JNX1NFUlZFUl9JRCwgUExBVEZPUk1fV09SS0VSX0FQUF9JRCBhcyDJtVBMQVRGT1JNX1dPUktFUl9BUFBfSUQsIFBMQVRGT1JNX1dPUktFUl9VSV9JRCBhcyDJtVBMQVRGT1JNX1dPUktFUl9VSV9JRCwgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIsIGlzUGxhdGZvcm1Xb3JrZXJBcHAsIGlzUGxhdGZvcm1Xb3JrZXJVaSwgVkVSU0lPTiwgUGxhdGZvcm1Mb2NhdGlvbiwgTE9DQVRJT05fSU5JVElBTElaRUQsIExvY2F0aW9uU3RyYXRlZ3ksIEFQUF9CQVNFX0hSRUYsIEhhc2hMb2NhdGlvblN0cmF0ZWd5LCBQYXRoTG9jYXRpb25TdHJhdGVneSwgTG9jYXRpb24sIENPTU1PTl9ESVJFQ1RJVkVTIGFzIMm1YSwgQ09NTU9OX1BJUEVTIGFzIMm1YiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbW9uLmVzNS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9AYW5ndWxhci9jb21tb24vQGFuZ3VsYXIvY29tbW9uLmVzNS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudFBsdXMge1xuICBpbml0O1xuICBnZXQ7XG4gIHBvc3Q7XG4gIGRlbGV0ZTtcbiAgcHV0O1xuICBwYXRjaDtcbiAgZ2V0VG9rZW47XG4gIHNldFRva2VuO1xuICByZW1vdmVUb2tlbjtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbmctaHR0cC1jbGllbnQtcGx1cy9zcmMvX2NvbnN0cnVjdG9yL2NvbnN0cnVjdG9yLnRzIiwiZXhwb3J0IGRlZmF1bHQgWydnZXQnLCAnZGVsZXRlJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ107XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L25nLWh0dHAtY2xpZW50LXBsdXMvc3JjL2h0dHAtd3JhcHBlcnMvX2xpYi9odHRwLWNsaWVudC1tZXRob2RzLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge0h0dHBQYXJhbXN9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IGh0dHBDbGllbnRNZXRob2RzIGZyb20gJy4vX2xpYi9odHRwLWNsaWVudC1tZXRob2RzJztcblxuZXhwb3J0IGRlZmF1bHQgaHR0cENsaWVudE1ldGhvZHMucmVkdWNlKChwcm90b3R5cGVFeHRlbnNpb24sIG1ldGhvZCkgPT4ge1xuICBwcm90b3R5cGVFeHRlbnNpb25bbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgYm9keSwgb3B0aW9ucykge1xuICAgIGxldCB7Y29uZmlncyA9IHt0b2tlbk5hbWU6IG51bGwsIGJhc2VVcmw6IG51bGx9fSA9IHRoaXM7XG4gICAgbGV0IHt0b2tlbk5hbWUsIGJhc2VVcmx9ID0gY29uZmlncztcbiAgICBsZXQgdG9rZW4gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRva2VuTmFtZSk7XG5cbiAgICBpZih1cmwuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgdXJsID0gKGJhc2VVcmwgfHwgJycpICsgdXJsO1xuICAgIH1cbiAgICBcbiAgICBpZihbJ2dldCcsICdkZWxldGUnXS5pbmRleE9mKG1ldGhvZCkgIT09IC0xKSB7XG4gICAgICBpZihib2R5KSB7XG4gICAgICAgIGxldCB7cGFyYW1zfSA9IGJvZHk7XG4gICAgICAgIGlmKHBhcmFtcyAmJiAhKHBhcmFtcyBpbnN0YW5jZW9mIEh0dHBQYXJhbXMpKSB7XG4gICAgICAgICAgcGFyYW1zID0gXy5yZWR1Y2UocGFyYW1zLCAocGFyYW1zLCB2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0sIG5ldyBIdHRwUGFyYW1zKCkpO1xuICAgICAgICAgIFxuICAgICAgICAgIF8uZXh0ZW5kKGJvZHksIHtwYXJhbXN9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZih0b2tlbikge1xuICAgICAgICBpZighYm9keSkge1xuICAgICAgICAgIGJvZHkgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoIWJvZHkucGFyYW1zKSB7XG4gICAgICAgICAgYm9keS5wYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBib2R5LnBhcmFtcyA9IGJvZHkucGFyYW1zLmFwcGVuZCgndG9rZW4nLCB0b2tlbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHRva2VuKSB7XG4gICAgICAgIGlmKCFib2R5KSB7XG4gICAgICAgICAgYm9keSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfLmV4dGVuZChib2R5LCB7dG9rZW59KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRoaXMuaHR0cFttZXRob2RdKHVybCwgYm9keSwgb3B0aW9ucyk7XG4gIH1cbiAgXG4gIHJldHVybiBwcm90b3R5cGVFeHRlbnNpb247XG59LCB7fSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L25nLWh0dHAtY2xpZW50LXBsdXMvc3JjL2h0dHAtd3JhcHBlcnMvaHR0cC13cmFwcGVycy50cyIsImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uZmlncykge1xuICBfLmV4dGVuZCh0aGlzLCB7Y29uZmlnc30pOyAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L25nLWh0dHAtY2xpZW50LXBsdXMvc3JjL2luaXRpYWxpemVyL2luaXRpYWxpemVyLnRzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHRoaXMuY29uZmlncy50b2tlbk5hbWUpOyAgXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L25nLWh0dHAtY2xpZW50LXBsdXMvc3JjL3Rva2VuLWdldHRlci90b2tlbi1nZXR0ZXIudHMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmNvbmZpZ3MudG9rZW5OYW1lKTsgIFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy90b2tlbi1yZW1vdmVyL3Rva2VuLXJlbW92ZXIudHMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0b2tlbikge1xuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uZmlncy50b2tlbk5hbWUsIHRva2VuKTsgIFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9uZy1odHRwLWNsaWVudC1wbHVzL3NyYy90b2tlbi1zZXR0ZXIvdG9rZW4tc2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtjb25maWdzfSBmcm9tICcuLi8uLi9fbGliL3ZhcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBfLmRlYm91bmNlKCgpID0+IHtcbiAgY2xlYXJUaW1lb3V0KGNvbmZpZ3MudGltZW91dCk7XG4gIGNvbmZpZ3MudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbmZpZ3MuZ3VhcmRpYW4ubG9nb3V0KCk7XG4gIH0sIGNvbmZpZ3MubG9nb3V0VGltZW91dCAqIDYwMDAwKTtcbn0sIDUwMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXV0by1sb2dvdXQtc2V0dGVyL19saWIvYXV0by1sb2dvdXQtaGFuZGxlci50cyIsImV4cG9ydCBkZWZhdWx0IGd1YXJkaWFuID0+IHtcbiAgbGV0IHtwYXRobmFtZX0gPSBsb2NhdGlvbjtcbiAgaWYocGF0aG5hbWUgIT09ICcvJykge1xuICAgIGd1YXJkaWFuLnJlZGlyZWN0VXJsID0gcGF0aG5hbWU7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcmVkaXJlY3QtY2FwdHVyZXIvcmVkaXJlY3QtY2FwdHVyZXIudHMiLCJpbXBvcnQgKiBhcyBfICAgICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCByb3V0ZVRvUm9sZUxpbmtlciBmcm9tICcuL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyJztcblxuZXhwb3J0IGRlZmF1bHQgZ3VhcmRpYW4gPT4ge1xuICBfLmVhY2goZ3VhcmRpYW4ucm91dGVyLmNvbmZpZywgcm91dGUgPT4gcm91dGVUb1JvbGVMaW5rZXIocm91dGUpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvbGVzLWFzc2VtYmxlci50cyIsImltcG9ydCAqIGFzIF8gICAgICAgICAgZnJvbSAnbG9kYXNoJztcbmltcG9ydCByb3V0ZVN0ZXJpbGl6ZXIgZnJvbSAnLi9yb3V0ZS1zdGVyaWxpemVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVHZXR0ZXIocGF0aHMsIHJvbGVSb3V0ZSwgbWFpblJvdXRlLCByb2xlTmFtZSkge1xuICBsZXQgcGF0aCA9IHBhdGhzLnNoaWZ0KCk7XG4gIFxuICBpZighcGF0aCkge1xuICAgIHJldHVybiByb2xlUm91dGU7XG4gIH1cbiAgXG4gIGxldCBbcm9sZUNoaWxkLCBtYWluQ2hpbGRdID0gW3JvbGVSb3V0ZSwgbWFpblJvdXRlXS5tYXAocm91dGUgPT4ge1xuICAgIHJldHVybiBfLmZpbHRlcihyb3V0ZS5jaGlsZHJlbiwge3BhdGh9KVswXTtcbiAgfSk7XG5cbiAgaWYoIXJvbGVDaGlsZCkge1xuICAgIHJvbGVDaGlsZCA9IHJvdXRlU3RlcmlsaXplcihtYWluQ2hpbGQsIHJvbGVOYW1lKTtcbiAgICByb2xlUm91dGUuY2hpbGRyZW4ucHVzaChyb2xlQ2hpbGQpO1xuICB9XG4gIFxuICByZXR1cm4gcm91dGVHZXR0ZXIocGF0aHMsIHJvbGVDaGlsZCwgbWFpbkNoaWxkLCByb2xlTmFtZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL19saWIvcm91dGUtZ2V0dGVyLnRzIiwiaW1wb3J0ICogYXMgXyAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtyb2xlc30gICAgICAgICBmcm9tICcuLi8uLi8uLi9fbGliL3ZhcnMnO1xuaW1wb3J0IHJvdXRlR2V0dGVyICAgICBmcm9tICcuL19saWIvcm91dGUtZ2V0dGVyJztcbmltcG9ydCByb3V0ZVN0ZXJpbGl6ZXIgZnJvbSAnLi9fbGliL3JvdXRlLXN0ZXJpbGl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZVRvUm9sZUxpbmtlcihyb3V0ZSwgbWFpblJvdXRlPywgcGFyZW50Um91dGU/LCBwYXRocyA9IFtdKSB7XG4gIGxldCB7cm9sZTogcm91dGVSb2xlTmFtZSwgcGF0aCwgZGVmYXVsdDogX2RlZmF1bHR9ID0gcm91dGU7XG4gIGxldCB7cm9sZTogcGFyZW50Um9sZU5hbWV9ID0gcGFyZW50Um91dGUgfHwge3JvbGU6IG51bGx9O1xuICBsZXQge2NoaWxkcmVufSA9IHJvdXRlO1xuICBsZXQgY2hpbGRsZXNzUm91dGUgPSBfLm9taXQocm91dGUsIFsnY2hpbGRyZW4nXSk7XG5cbiAgaWYoX2RlZmF1bHQpIHtcbiAgICByb2xlc1tyb3V0ZVJvbGVOYW1lXS5fZGVmYXVsdCA9IFsnJ10uY29uY2F0KHBhdGhzLCBwYXRoKS5qb2luKCcvJyk7XG4gIH1cblxuICBpZighcm91dGVSb2xlTmFtZSAmJiAhcGFyZW50Um9sZU5hbWUpIHtcbiAgICByb3V0ZVJvbGVOYW1lID0gJ2FsbCc7XG4gIH1cblxuICBpZighcGFyZW50Um9sZU5hbWUpIHtcbiAgICByb2xlc1tyb3V0ZVJvbGVOYW1lXS5yb3V0ZXMucHVzaChjaGlsZGxlc3NSb3V0ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYocm91dGVSb2xlTmFtZSAhPT0gcGFyZW50Um9sZU5hbWUpIHtcbiAgICAgIGxldCByb290Um9sZU5hbWUgPSBwYXRocy5zaGlmdCgpO1xuICAgICAgbGV0IHtyb3V0ZXN9ID0gcm9sZXNbcm91dGVSb2xlTmFtZV07XG4gICAgICBsZXQgcm9sZVJvdXRlID0gXy5maWx0ZXIocm91dGVzLCB7cGF0aDogcm9vdFJvbGVOYW1lfSlbMF07XG5cbiAgICAgIGlmKCFyb2xlUm91dGUpIHtcbiAgICAgICAgcm9sZVJvdXRlID0gcm91dGVTdGVyaWxpemVyKG1haW5Sb3V0ZSwgcm91dGVSb2xlTmFtZSk7XG4gICAgICAgIHJvdXRlcy5wdXNoKHJvbGVSb3V0ZSk7XG4gICAgICB9XG5cbiAgICAgIHJvbGVSb3V0ZSA9IHJvdXRlR2V0dGVyKHBhdGhzLCByb2xlUm91dGUsIG1haW5Sb3V0ZSwgcm91dGVSb2xlTmFtZSk7XG4gICAgICByb2xlUm91dGUuY2hpbGRyZW4ucHVzaChjaGlsZGxlc3NSb3V0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB7Y2hpbGRyZW4gPSBbXX0gPSBwYXJlbnRSb3V0ZTtcbiAgICAgIFxuICAgICAgaWYoXy5pc0VtcHR5KGNoaWxkcmVuKSkge1xuICAgICAgICBfLmV4dGVuZChwYXJlbnRSb3V0ZSwge2NoaWxkcmVufSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRsZXNzUm91dGUpO1xuICAgIH1cbiAgfVxuICBcbiAgXy5lYWNoKGNoaWxkcmVuLCBjaGlsZCA9PiB7XG4gICAgbGV0IHtyb2xlID0gcm91dGVSb2xlTmFtZSB8fCBwYXJlbnRSb2xlTmFtZX0gPSBjaGlsZDtcbiAgICBfLmV4dGVuZChjaGlsZCwge3JvbGV9KTtcbiAgICByb3V0ZVRvUm9sZUxpbmtlcihjaGlsZCwgbWFpblJvdXRlIHx8IHJvdXRlLCBjaGlsZGxlc3NSb3V0ZSwgcGF0aHMuY29uY2F0KHBhdGgpKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5pdGlhbGl6ZXIvcm9sZXMtYXNzZW1ibGVyL3JvdXRlLXRvLXJvbGUtbGlua2VyL3JvdXRlLXRvLXJvbGUtbGlua2VyLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rc0dlbmVyYXRvcihyb3V0ZXMsIHBhdGhzID0gW10sIGxpbmtzID0gW10pIHtcbiAgXy5lYWNoKHJvdXRlcywgcm91dGUgPT4ge1xuICAgIGxldCB7cGF0aCwgbGluaywgbGFiZWwsIGxpbmtMYWJlbCwgY2hpbGRyZW59ID0gcm91dGU7XG4gICAgbGV0IGNoaWxkcmVuTGlua3MgPSBsaW5rc0dlbmVyYXRvcihjaGlsZHJlbiwgcGF0aHMuY29uY2F0KHBhdGgpKTtcbiAgICBcbiAgICBpZihsaW5rKSB7XG4gICAgICBpZighbGlua0xhYmVsKSB7XG4gICAgICAgIGxpbmtMYWJlbCA9IGxhYmVsIHx8IHBhdGg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHBhdGggPSBbJyddLmNvbmNhdChwYXRocywgcGF0aCkuam9pbignLycpO1xuICAgICAgXG4gICAgICBsZXQgbGlua1JlY29yZFByb3BlcnRpZXMgPSBfLm9taXQocm91dGUsIFsncGF0aCcsICdjb21wb25lbnQnXSk7ICAgICBcbiAgICAgIGxldCBsaW5rUmVjb3JkID0gXy5leHRlbmQoe2xhYmVsOiBsaW5rTGFiZWwsIHBhdGh9LCBsaW5rUmVjb3JkUHJvcGVydGllcyk7XG4gICAgICBcbiAgICAgIGlmKCFfLmlzRW1wdHkoY2hpbGRyZW5MaW5rcykpIHtcbiAgICAgICAgXy5leHRlbmQobGlua1JlY29yZCwge2NoaWxkcmVuOiBjaGlsZHJlbkxpbmtzfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxpbmtzLnB1c2gobGlua1JlY29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmtzLnB1c2goLi4uY2hpbGRyZW5MaW5rcyk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBsaW5rcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yb2xlLXNldHRlci9saW5rcy1nZW5lcmF0b3IvbGlua3MtZ2VuZXJhdG9yLnRzIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXNGaWx0ZXJlcihyb3V0ZXMsIGFwcHJvdmVkUm91dGVzLCByb2xlLCBwYXRocyA9IFtdLCBuZXdSb3V0ZXMgPSBbXSkge1xuICBfLmVhY2goYXBwcm92ZWRSb3V0ZXMsIGFwcHJvdmVkUm91dGUgPT4ge1xuICAgIGxldCB7cGF0aCwgY2hpbGRyZW4sIGRlZmF1bHQ6IF9kZWZhdWx0fSA9IGFwcHJvdmVkUm91dGU7XG4gICAgbGV0IHJvdXRlID0gXy5maWx0ZXIocm91dGVzLCB7cGF0aH0pWzBdO1xuICAgIFxuICAgIGlmKHJvdXRlKSB7XG4gICAgICBsZXQgbmV3Um91dGUgPSBfLm9taXQocm91dGUsIFsnY2hpbGRyZW4nXSk7XG4gICAgICBcbiAgICAgIGlmKF9kZWZhdWx0KSB7XG4gICAgICAgIF9kZWZhdWx0ID0gWycnXS5jb25jYXQocGF0aHMsIHBhdGgpLmpvaW4oJy8nKTtcbiAgICAgICAgXy5leHRlbmQocm9sZSwge19kZWZhdWx0fSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmKGNoaWxkcmVuKSB7XG4gICAgICAgIHBhdGhzID0gcGF0aHMuY29uY2F0KHBhdGgpO1xuICAgICAgICBuZXdSb3V0ZS5jaGlsZHJlbiA9IHJvdXRlc0ZpbHRlcmVyKHJvdXRlLmNoaWxkcmVuLCBjaGlsZHJlbiwgcm9sZSwgcGF0aHMpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBuZXdSb3V0ZXMucHVzaChuZXdSb3V0ZSk7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBuZXdSb3V0ZXM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm9sZS1zZXR0ZXIvcm91dGVzLWZpbHRlcmVyL3JvdXRlcy1maWx0ZXJlci50cyIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpYmVyJyk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIElubmVyU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKElubmVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbm5lclN1YnNjcmliZXIocGFyZW50LCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5vdXRlclZhbHVlID0gb3V0ZXJWYWx1ZTtcbiAgICAgICAgdGhpcy5vdXRlckluZGV4ID0gb3V0ZXJJbmRleDtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgfVxuICAgIElubmVyU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQubm90aWZ5TmV4dCh0aGlzLm91dGVyVmFsdWUsIHZhbHVlLCB0aGlzLm91dGVySW5kZXgsIHRoaXMuaW5kZXgrKywgdGhpcyk7XG4gICAgfTtcbiAgICBJbm5lclN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlFcnJvcihlcnJvciwgdGhpcyk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIElubmVyU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlDb21wbGV0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIElubmVyU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbmV4cG9ydHMuSW5uZXJTdWJzY3JpYmVyID0gSW5uZXJTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5uZXJTdWJzY3JpYmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL0lubmVyU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL1N1YnNjcmliZXInKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgT3V0ZXJTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT3V0ZXJTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE91dGVyU3Vic2NyaWJlcigpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgfTtcbiAgICBPdXRlclN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeUVycm9yID0gZnVuY3Rpb24gKGVycm9yLCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICAgIE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAoaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIE91dGVyU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbmV4cG9ydHMuT3V0ZXJTdWJzY3JpYmVyID0gT3V0ZXJTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T3V0ZXJTdWJzY3JpYmVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL091dGVyU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaXNBcnJheV8xID0gcmVxdWlyZSgnLi91dGlsL2lzQXJyYXknKTtcbnZhciBpc09iamVjdF8xID0gcmVxdWlyZSgnLi91dGlsL2lzT2JqZWN0Jyk7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZSgnLi91dGlsL2lzRnVuY3Rpb24nKTtcbnZhciB0cnlDYXRjaF8xID0gcmVxdWlyZSgnLi91dGlsL3RyeUNhdGNoJyk7XG52YXIgZXJyb3JPYmplY3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9lcnJvck9iamVjdCcpO1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3JfMSA9IHJlcXVpcmUoJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJyk7XG4vKipcbiAqIFJlcHJlc2VudHMgYSBkaXNwb3NhYmxlIHJlc291cmNlLCBzdWNoIGFzIHRoZSBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZS4gQVxuICogU3Vic2NyaXB0aW9uIGhhcyBvbmUgaW1wb3J0YW50IG1ldGhvZCwgYHVuc3Vic2NyaWJlYCwgdGhhdCB0YWtlcyBubyBhcmd1bWVudFxuICogYW5kIGp1c3QgZGlzcG9zZXMgdGhlIHJlc291cmNlIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHN1YnNjcmlwdGlvbnMgbWF5IGJlIGdyb3VwZWQgdG9nZXRoZXIgdGhyb3VnaCB0aGUgYGFkZCgpYFxuICogbWV0aG9kLCB3aGljaCB3aWxsIGF0dGFjaCBhIGNoaWxkIFN1YnNjcmlwdGlvbiB0byB0aGUgY3VycmVudCBTdWJzY3JpcHRpb24uXG4gKiBXaGVuIGEgU3Vic2NyaXB0aW9uIGlzIHVuc3Vic2NyaWJlZCwgYWxsIGl0cyBjaGlsZHJlbiAoYW5kIGl0cyBncmFuZGNoaWxkcmVuKVxuICogd2lsbCBiZSB1bnN1YnNjcmliZWQgYXMgd2VsbC5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaXB0aW9uXG4gKi9cbnZhciBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW3Vuc3Vic2NyaWJlXSBBIGZ1bmN0aW9uIGRlc2NyaWJpbmcgaG93IHRvXG4gICAgICogcGVyZm9ybSB0aGUgZGlzcG9zYWwgb2YgcmVzb3VyY2VzIHdoZW4gdGhlIGB1bnN1YnNjcmliZWAgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24odW5zdWJzY3JpYmUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoaXMgU3Vic2NyaXB0aW9uIGhhcyBhbHJlYWR5IGJlZW4gdW5zdWJzY3JpYmVkLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl91bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2VzIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLiBNYXksIGZvciBpbnN0YW5jZSwgY2FuY2VsXG4gICAgICogYW4gb25nb2luZyBPYnNlcnZhYmxlIGV4ZWN1dGlvbiBvciBjYW5jZWwgYW55IG90aGVyIHR5cGUgb2Ygd29yayB0aGF0XG4gICAgICogc3RhcnRlZCB3aGVuIHRoZSBTdWJzY3JpcHRpb24gd2FzIGNyZWF0ZWQuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzLCBfdW5zdWJzY3JpYmUgPSBfYS5fdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zID0gX2EuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIC8vIG51bGwgb3V0IF9zdWJzY3JpcHRpb25zIGZpcnN0IHNvIGFueSBjaGlsZCBzdWJzY3JpcHRpb25zIHRoYXQgYXR0ZW1wdFxuICAgICAgICAvLyB0byByZW1vdmUgdGhlbXNlbHZlcyBmcm9tIHRoaXMgc3Vic2NyaXB0aW9uIHdpbGwgbm9vcFxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHZhciBsZW4gPSBfcGFyZW50cyA/IF9wYXJlbnRzLmxlbmd0aCA6IDA7XG4gICAgICAgIC8vIGlmIHRoaXMuX3BhcmVudCBpcyBudWxsLCB0aGVuIHNvIGlzIHRoaXMuX3BhcmVudHMsIGFuZCB3ZVxuICAgICAgICAvLyBkb24ndCBoYXZlIHRvIHJlbW92ZSBvdXJzZWx2ZXMgZnJvbSBhbnkgcGFyZW50IHN1YnNjcmlwdGlvbnMuXG4gICAgICAgIHdoaWxlIChfcGFyZW50KSB7XG4gICAgICAgICAgICBfcGFyZW50LnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMuX3BhcmVudHMgaXMgbnVsbCBvciBpbmRleCA+PSBsZW4sXG4gICAgICAgICAgICAvLyB0aGVuIF9wYXJlbnQgaXMgc2V0IHRvIG51bGwsIGFuZCB0aGUgbG9vcCBleGl0c1xuICAgICAgICAgICAgX3BhcmVudCA9ICsraW5kZXggPCBsZW4gJiYgX3BhcmVudHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIHZhciB0cmlhbCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yID9cbiAgICAgICAgICAgICAgICAgICAgZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZS5lcnJvcnMpIDogW2Vycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5XzEuaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICAgICAgICAgIHZhciBzdWIgPSBfc3Vic2NyaXB0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0XzEuaXNPYmplY3Qoc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJpYWwgPSB0cnlDYXRjaF8xLnRyeUNhdGNoKHN1Yi51bnN1YnNjcmliZSkuY2FsbChzdWIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRXJyb3JzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHRlYXIgZG93biB0byBiZSBjYWxsZWQgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSgpIG9mIHRoaXNcbiAgICAgKiBTdWJzY3JpcHRpb24uXG4gICAgICpcbiAgICAgKiBJZiB0aGUgdGVhciBkb3duIGJlaW5nIGFkZGVkIGlzIGEgc3Vic2NyaXB0aW9uIHRoYXQgaXMgYWxyZWFkeVxuICAgICAqIHVuc3Vic2NyaWJlZCwgaXMgdGhlIHNhbWUgcmVmZXJlbmNlIGBhZGRgIGlzIGJlaW5nIGNhbGxlZCBvbiwgb3IgaXNcbiAgICAgKiBgU3Vic2NyaXB0aW9uLkVNUFRZYCwgaXQgd2lsbCBub3QgYmUgYWRkZWQuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHN1YnNjcmlwdGlvbiBpcyBhbHJlYWR5IGluIGFuIGBjbG9zZWRgIHN0YXRlLCB0aGUgcGFzc2VkXG4gICAgICogdGVhciBkb3duIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RlYXJkb3duTG9naWN9IHRlYXJkb3duIFRoZSBhZGRpdGlvbmFsIGxvZ2ljIHRvIGV4ZWN1dGUgb25cbiAgICAgKiB0ZWFyZG93bi5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpcHRpb259IFJldHVybnMgdGhlIFN1YnNjcmlwdGlvbiB1c2VkIG9yIGNyZWF0ZWQgdG8gYmVcbiAgICAgKiBhZGRlZCB0byB0aGUgaW5uZXIgc3Vic2NyaXB0aW9ucyBsaXN0LiBUaGlzIFN1YnNjcmlwdGlvbiBjYW4gYmUgdXNlZCB3aXRoXG4gICAgICogYHJlbW92ZSgpYCB0byByZW1vdmUgdGhlIHBhc3NlZCB0ZWFyZG93biBsb2dpYyBmcm9tIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zXG4gICAgICogbGlzdC5cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICBpZiAoIXRlYXJkb3duIHx8ICh0ZWFyZG93biA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVhcmRvd24gPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0ZWFyZG93bjtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdGVhcmRvd24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRlYXJkb3duKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbi5jbG9zZWQgfHwgdHlwZW9mIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50ICE9PSAnZnVuY3Rpb24nIC8qIHF1YWNrIHF1YWNrICovKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLl9zdWJzY3JpcHRpb25zID0gW3RtcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0ZWFyZG93biAnICsgdGVhcmRvd24gKyAnIGFkZGVkIHRvIFN1YnNjcmlwdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmlwdGlvbnMgfHwgKHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXSk7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICBzdWJzY3JpcHRpb24uX2FkZFBhcmVudCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBTdWJzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWwgbGlzdCBvZiBzdWJzY3JpcHRpb25zIHRoYXQgd2lsbFxuICAgICAqIHVuc3Vic2NyaWJlIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUgcHJvY2VzcyBvZiB0aGlzIFN1YnNjcmlwdGlvbi5cbiAgICAgKiBAcGFyYW0ge1N1YnNjcmlwdGlvbn0gc3Vic2NyaXB0aW9uIFRoZSBzdWJzY3JpcHRpb24gdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb25JbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbkluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cztcbiAgICAgICAgaWYgKCFfcGFyZW50IHx8IF9wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHBhcmVudCwgb3IgdGhlIG5ldyBwYXJlbnQgaXMgdGhlIHNhbWUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IHBhcmVudCwgdGhlbiBzZXQgdGhpcy5fcGFyZW50IHRvIHRoZSBuZXcgcGFyZW50LlxuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFfcGFyZW50cykge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhbHJlYWR5IG9uZSBwYXJlbnQsIGJ1dCBub3QgbXVsdGlwbGUsIGFsbG9jYXRlIGFuIEFycmF5IHRvXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVzdCBvZiB0aGUgcGFyZW50IFN1YnNjcmlwdGlvbnMuXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRzID0gW3BhcmVudF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX3BhcmVudHMuaW5kZXhPZihwYXJlbnQpID09PSAtMSkge1xuICAgICAgICAgICAgLy8gT25seSBhZGQgdGhlIG5ldyBwYXJlbnQgdG8gdGhlIF9wYXJlbnRzIGxpc3QgaWYgaXQncyBub3QgYWxyZWFkeSB0aGVyZS5cbiAgICAgICAgICAgIF9wYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uIChlbXB0eSkge1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydHMuU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uO1xuZnVuY3Rpb24gZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVycm9ycykge1xuICAgIHJldHVybiBlcnJvcnMucmVkdWNlKGZ1bmN0aW9uIChlcnJzLCBlcnIpIHsgcmV0dXJuIGVycnMuY29uY2F0KChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikgPyBlcnIuZXJyb3JzIDogZXJyKTsgfSwgW10pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL1N1YnNjcmlwdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZhYmxlJyk7XG52YXIgU2NhbGFyT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9TY2FsYXJPYnNlcnZhYmxlJyk7XG52YXIgRW1wdHlPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL0VtcHR5T2JzZXJ2YWJsZScpO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKCcuLi91dGlsL2lzU2NoZWR1bGVyJyk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xudmFyIEFycmF5T2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFycmF5T2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBcnJheU9ic2VydmFibGUoYXJyYXksIHNjaGVkdWxlcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgaWYgKCFzY2hlZHVsZXIgJiYgYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gYXJyYXlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXJyYXlPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChhcnJheSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKGFycmF5LCBzY2hlZHVsZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgc29tZSB2YWx1ZXMgeW91IHNwZWNpZnkgYXMgYXJndW1lbnRzLFxuICAgICAqIGltbWVkaWF0ZWx5IG9uZSBhZnRlciB0aGUgb3RoZXIsIGFuZCB0aGVuIGVtaXRzIGEgY29tcGxldGUgbm90aWZpY2F0aW9uLlxuICAgICAqXG4gICAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIHRoZSBhcmd1bWVudHMgeW91IHByb3ZpZGUsIHRoZW4gY29tcGxldGVzLlxuICAgICAqIDwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvb2YucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAgICogZW1pdHMgdGhlIGFyZ3VtZW50cyBnaXZlbiwgYW5kIHRoZSBjb21wbGV0ZSBub3RpZmljYXRpb24gdGhlcmVhZnRlci4gSXQgY2FuXG4gICAgICogYmUgdXNlZCBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXIgT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgd2l0aCB7QGxpbmsgY29uY2F0fS5cbiAgICAgKiBCeSBkZWZhdWx0LCBpdCB1c2VzIGEgYG51bGxgIElTY2hlZHVsZXIsIHdoaWNoIG1lYW5zIHRoZSBgbmV4dGBcbiAgICAgKiBub3RpZmljYXRpb25zIGFyZSBzZW50IHN5bmNocm9ub3VzbHksIGFsdGhvdWdoIHdpdGggYSBkaWZmZXJlbnQgSVNjaGVkdWxlclxuICAgICAqIGl0IGlzIHBvc3NpYmxlIHRvIGRldGVybWluZSB3aGVuIHRob3NlIG5vdGlmaWNhdGlvbnMgd2lsbCBiZSBkZWxpdmVyZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IDEwLCAyMCwgMzAsIHRoZW4gJ2EnLCAnYicsICdjJywgdGhlbiBzdGFydCB0aWNraW5nIGV2ZXJ5IHNlY29uZC48L2NhcHRpb24+XG4gICAgICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLm9mKDEwLCAyMCwgMzApO1xuICAgICAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKTtcbiAgICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIHZhciByZXN1bHQgPSBudW1iZXJzLmNvbmNhdChsZXR0ZXJzKS5jb25jYXQoaW50ZXJ2YWwpO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAgICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLlR9IHZhbHVlcyBBcmd1bWVudHMgdGhhdCByZXByZXNlbnQgYG5leHRgIHZhbHVlcyB0byBiZSBlbWl0dGVkLlxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICAgKiB0aGUgZW1pc3Npb25zIG9mIHRoZSBgbmV4dGAgbm90aWZpY2F0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgZWFjaCBnaXZlbiBpbnB1dCB2YWx1ZS5cbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAbmFtZSBvZlxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgQXJyYXlPYnNlcnZhYmxlLm9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFycmF5W19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIoc2NoZWR1bGVyKSkge1xuICAgICAgICAgICAgYXJyYXkucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShhcnJheSwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW4gPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2NhbGFyT2JzZXJ2YWJsZV8xLlNjYWxhck9ic2VydmFibGUoYXJyYXlbMF0sIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVtcHR5T2JzZXJ2YWJsZV8xLkVtcHR5T2JzZXJ2YWJsZShzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBcnJheU9ic2VydmFibGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gc3RhdGUuYXJyYXksIGluZGV4ID0gc3RhdGUuaW5kZXgsIGNvdW50ID0gc3RhdGUuY291bnQsIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyO1xuICAgICAgICBpZiAoaW5kZXggPj0gY291bnQpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlbaW5kZXhdKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc3RhdGUpO1xuICAgIH07XG4gICAgQXJyYXlPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICAgICAgdmFyIGNvdW50ID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoQXJyYXlPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgICAgICAgICAgYXJyYXk6IGFycmF5LCBpbmRleDogaW5kZXgsIGNvdW50OiBjb3VudCwgc3Vic2NyaWJlcjogc3Vic2NyaWJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50ICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFycmF5T2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuQXJyYXlPYnNlcnZhYmxlID0gQXJyYXlPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJyYXlPYnNlcnZhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL09ic2VydmFibGUnKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG52YXIgRW1wdHlPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW1wdHlPYnNlcnZhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVtcHR5T2JzZXJ2YWJsZShzY2hlZHVsZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIgYW5kIGltbWVkaWF0ZWx5XG4gICAgICogZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SnVzdCBlbWl0cyAnY29tcGxldGUnLCBhbmQgbm90aGluZyBlbHNlLlxuICAgICAqIDwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvZW1wdHkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAgICogZW1pdHMgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyXG4gICAgICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gY29tcGxldGUuPC9jYXB0aW9uPlxuICAgICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmVtcHR5KCkuc3RhcnRXaXRoKDcpO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgYW5kIGZsYXR0ZW4gb25seSBvZGQgbnVtYmVycyB0byB0aGUgc2VxdWVuY2UgJ2EnLCAnYicsICdjJzwvY2FwdGlvbj5cbiAgICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIHZhciByZXN1bHQgPSBpbnRlcnZhbC5tZXJnZU1hcCh4ID0+XG4gICAgICogICB4ICUgMiA9PT0gMSA/IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJykgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAgICAgKiApO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmcgdG8gdGhlIGNvbnNvbGU6XG4gICAgICogLy8geCBpcyBlcXVhbCB0byB0aGUgY291bnQgb24gdGhlIGludGVydmFsIGVnKDAsMSwyLDMsLi4uKVxuICAgICAqIC8vIHggd2lsbCBvY2N1ciBldmVyeSAxMDAwbXNcbiAgICAgKiAvLyBpZiB4ICUgMiBpcyBlcXVhbCB0byAxIHByaW50IGFiY1xuICAgICAqIC8vIGlmIHggJSAyIGlzIG5vdCBlcXVhbCB0byAxIG5vdGhpbmcgd2lsbCBiZSBvdXRwdXRcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICAgKiBAc2VlIHtAbGluayBuZXZlcn1cbiAgICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICAgKiBAc2VlIHtAbGluayB0aHJvd31cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBJU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICAgKiB0aGUgZW1pc3Npb24gb2YgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBcImVtcHR5XCIgT2JzZXJ2YWJsZTogZW1pdHMgb25seSB0aGUgY29tcGxldGVcbiAgICAgKiBub3RpZmljYXRpb24uXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgZW1wdHlcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEVtcHR5T2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlKHNjaGVkdWxlcik7XG4gICAgfTtcbiAgICBFbXB0eU9ic2VydmFibGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gYXJnLnN1YnNjcmliZXI7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9O1xuICAgIEVtcHR5T2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShFbXB0eU9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHsgc3Vic2NyaWJlcjogc3Vic2NyaWJlciB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEVtcHR5T2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuRW1wdHlPYnNlcnZhYmxlID0gRW1wdHlPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlPYnNlcnZhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL09ic2VydmFibGUnKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG52YXIgU2NhbGFyT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNjYWxhck9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2NhbGFyT2JzZXJ2YWJsZSh2YWx1ZSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU2NhbGFyT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAodmFsdWUsIHNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gbmV3IFNjYWxhck9ic2VydmFibGUodmFsdWUsIHNjaGVkdWxlcik7XG4gICAgfTtcbiAgICBTY2FsYXJPYnNlcnZhYmxlLmRpc3BhdGNoID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBkb25lID0gc3RhdGUuZG9uZSwgdmFsdWUgPSBzdGF0ZS52YWx1ZSwgc3Vic2NyaWJlciA9IHN0YXRlLnN1YnNjcmliZXI7XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuZG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc3RhdGUpO1xuICAgIH07XG4gICAgU2NhbGFyT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShTY2FsYXJPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsIHZhbHVlOiB2YWx1ZSwgc3Vic2NyaWJlcjogc3Vic2NyaWJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFNjYWxhck9ic2VydmFibGU7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLlNjYWxhck9ic2VydmFibGUgPSBTY2FsYXJPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2NhbGFyT2JzZXJ2YWJsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9vYnNlcnZhYmxlL1NjYWxhck9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEFycmF5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9BcnJheU9ic2VydmFibGUnKTtcbmV4cG9ydHMub2YgPSBBcnJheU9ic2VydmFibGVfMS5BcnJheU9ic2VydmFibGUub2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9vYnNlcnZhYmxlL29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBtZXJnZU1hcF8xID0gcmVxdWlyZSgnLi9tZXJnZU1hcCcpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSB3aGljaCBpcyBtZXJnZWQgaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSwgaW4gYSBzZXJpYWxpemVkIGZhc2hpb24gd2FpdGluZyBmb3IgZWFjaCBvbmUgdG8gY29tcGxldGUgYmVmb3JlXG4gKiBtZXJnaW5nIHRoZSBuZXh0LlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5NYXBzIGVhY2ggdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSwgdGhlbiBmbGF0dGVucyBhbGwgb2ZcbiAqIHRoZXNlIGlubmVyIE9ic2VydmFibGVzIHVzaW5nIHtAbGluayBjb25jYXRBbGx9Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbmNhdE1hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIChzby1jYWxsZWQgXCJpbm5lclwiKSBPYnNlcnZhYmxlLiBFYWNoIG5ldyBpbm5lciBPYnNlcnZhYmxlIGlzXG4gKiBjb25jYXRlbmF0ZWQgd2l0aCB0aGUgcHJldmlvdXMgaW5uZXIgT2JzZXJ2YWJsZS5cbiAqXG4gKiBfX1dhcm5pbmc6X18gaWYgc291cmNlIHZhbHVlcyBhcnJpdmUgZW5kbGVzc2x5IGFuZCBmYXN0ZXIgdGhhbiB0aGVpclxuICogY29ycmVzcG9uZGluZyBpbm5lciBPYnNlcnZhYmxlcyBjYW4gY29tcGxldGUsIGl0IHdpbGwgcmVzdWx0IGluIG1lbW9yeSBpc3N1ZXNcbiAqIGFzIGlubmVyIE9ic2VydmFibGVzIGFtYXNzIGluIGFuIHVuYm91bmRlZCBidWZmZXIgd2FpdGluZyBmb3IgdGhlaXIgdHVybiB0b1xuICogYmUgc3Vic2NyaWJlZCB0by5cbiAqXG4gKiBOb3RlOiBgY29uY2F0TWFwYCBpcyBlcXVpdmFsZW50IHRvIGBtZXJnZU1hcGAgd2l0aCBjb25jdXJyZW5jeSBwYXJhbWV0ZXIgc2V0XG4gKiB0byBgMWAuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Rm9yIGVhY2ggY2xpY2sgZXZlbnQsIHRpY2sgZXZlcnkgc2Vjb25kIGZyb20gMCB0byAzLCB3aXRoIG5vIGNvbmN1cnJlbmN5PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3MuY29uY2F0TWFwKGV2ID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSg0KSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZzpcbiAqIC8vIChyZXN1bHRzIGFyZSBub3QgY29uY3VycmVudClcbiAqIC8vIEZvciBldmVyeSBjbGljayBvbiB0aGUgXCJkb2N1bWVudFwiIGl0IHdpbGwgZW1pdCB2YWx1ZXMgMCB0byAzIHNwYWNlZFxuICogLy8gb24gYSAxMDAwbXMgaW50ZXJ2YWxcbiAqIC8vIG9uZSBjbGljayA9IDEwMDBtcy0+IDAgLTEwMDBtcy0+IDEgLTEwMDBtcy0+IDIgLTEwMDBtcy0+IDNcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3RNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCA/aW5kZXg6IG51bWJlcik6IE9ic2VydmFibGVJbnB1dH0gcHJvamVjdCBBIGZ1bmN0aW9uXG4gKiB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYW4gaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmV0dXJucyBhblxuICogT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpOiBhbnl9IFtyZXN1bHRTZWxlY3Rvcl1cbiAqIEEgZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGJhc2VkIG9uIHRoZSB2YWx1ZXNcbiAqIGFuZCB0aGUgaW5kaWNlcyBvZiB0aGUgc291cmNlIChvdXRlcikgZW1pc3Npb24gYW5kIHRoZSBpbm5lciBPYnNlcnZhYmxlXG4gKiBlbWlzc2lvbi4gVGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBhcmU6XG4gKiAtIGBvdXRlclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVyVmFsdWVgOiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiAtIGBvdXRlckluZGV4YDogdGhlIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHNvdXJjZVxuICogLSBgaW5uZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gKGFuZCB0aGUgb3B0aW9uYWwgYHJlc3VsdFNlbGVjdG9yYCkgdG8gZWFjaCBpdGVtIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgdGFraW5nIHZhbHVlcyBmcm9tIGVhY2ggcHJvamVjdGVkIGlubmVyXG4gKiBPYnNlcnZhYmxlIHNlcXVlbnRpYWxseS5cbiAqIEBtZXRob2QgY29uY2F0TWFwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBjb25jYXRNYXAocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBtZXJnZU1hcF8xLk1lcmdlTWFwT3BlcmF0b3IocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIDEpKTtcbn1cbmV4cG9ydHMuY29uY2F0TWFwID0gY29uY2F0TWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uY2F0TWFwLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29wZXJhdG9yL2NvbmNhdE1hcC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpYmVyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBGaWx0ZXIgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgb25seSBlbWl0dGluZyB0aG9zZSB0aGF0XG4gKiBzYXRpc2Z5IGEgc3BlY2lmaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZVxuICogW0FycmF5LnByb3RvdHlwZS5maWx0ZXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKSxcbiAqIGl0IG9ubHkgZW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgaWYgaXQgcGFzc2VzIGEgY3JpdGVyaW9uIGZ1bmN0aW9uLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2ZpbHRlci5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsLWtub3duIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QsIHRoaXMgb3BlcmF0b3JcbiAqIHRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcGFzc2VzIHRoZW0gdGhyb3VnaCBhIGBwcmVkaWNhdGVgXG4gKiBmdW5jdGlvbiBhbmQgb25seSBlbWl0cyB0aG9zZSB2YWx1ZXMgdGhhdCB5aWVsZGVkIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgY2xpY2sgZXZlbnRzIHdob3NlIHRhcmdldCB3YXMgYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzT25EaXZzID0gY2xpY2tzLmZpbHRlcihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBpZ25vcmVFbGVtZW50c31cbiAqIEBzZWUge0BsaW5rIHBhcnRpdGlvbn1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBpdCByZXR1cm5zIGB0cnVlYCxcbiAqIHRoZSB2YWx1ZSBpcyBlbWl0dGVkLCBpZiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBub3QgcGFzc2VkIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlXG4gKiBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXJcbiAqIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSB0aGF0IHdlcmVcbiAqIGFsbG93ZWQgYnkgdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpKTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xudmFyIEZpbHRlck9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIEZpbHRlck9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRmlsdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRmlsdGVyT3BlcmF0b3I7XG59KCkpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBGaWx0ZXJTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmlsdGVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGaWx0ZXJTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgfVxuICAgIC8vIHRoZSB0cnkgY2F0Y2ggYmxvY2sgYmVsb3cgaXMgbGVmdCBzcGVjaWZpY2FsbHkgZm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGFuZCBwZXJmIHJlYXNvbnMuIGEgdHJ5Q2F0Y2hlciBpcyBub3QgbmVjZXNzYXJ5IGhlcmUuXG4gICAgRmlsdGVyU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlLmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZpbHRlclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvb3BlcmF0b3IvZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbi8qKlxuICogQXBwbGllcyBhIGdpdmVuIGBwcm9qZWN0YCBmdW5jdGlvbiB0byBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgYW5kIGVtaXRzIHRoZSByZXN1bHRpbmcgdmFsdWVzIGFzIGFuIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2UgW0FycmF5LnByb3RvdHlwZS5tYXAoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKSxcbiAqIGl0IHBhc3NlcyBlYWNoIHNvdXJjZSB2YWx1ZSB0aHJvdWdoIGEgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gdG8gZ2V0XG4gKiBjb3JyZXNwb25kaW5nIG91dHB1dCB2YWx1ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWFwLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwga25vd24gYEFycmF5LnByb3RvdHlwZS5tYXBgIGZ1bmN0aW9uLCB0aGlzIG9wZXJhdG9yXG4gKiBhcHBsaWVzIGEgcHJvamVjdGlvbiB0byBlYWNoIHZhbHVlIGFuZCBlbWl0cyB0aGF0IHByb2plY3Rpb24gaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgY2xpY2sgdG8gdGhlIGNsaWVudFggcG9zaXRpb24gb2YgdGhhdCBjbGljazwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG9zaXRpb25zID0gY2xpY2tzLm1hcChldiA9PiBldi5jbGllbnRYKTtcbiAqIHBvc2l0aW9ucy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWFwVG99XG4gKiBAc2VlIHtAbGluayBwbHVja31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogUn0gcHJvamVjdCBUaGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIHRvIGVhY2ggYHZhbHVlYCBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzXG4gKiB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggZW1pc3Npb24gdGhhdCBoYXMgaGFwcGVuZWQgc2luY2UgdGhlXG4gKiBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRlZmluZSB3aGF0IGB0aGlzYCBpcyBpbiB0aGVcbiAqIGBwcm9qZWN0YCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB0cmFuc2Zvcm1lZCBieSB0aGUgZ2l2ZW4gYHByb2plY3RgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBtYXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uLiBBcmUgeW91IGxvb2tpbmcgZm9yIGBtYXBUbygpYD8nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgTWFwT3BlcmF0b3IocHJvamVjdCwgdGhpc0FyZykpO1xufVxuZXhwb3J0cy5tYXAgPSBtYXA7XG52YXIgTWFwT3BlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICB9XG4gICAgTWFwT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNYXBTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFwT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0cy5NYXBPcGVyYXRvciA9IE1hcE9wZXJhdG9yO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBNYXBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFwU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYXBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgdGhpcztcbiAgICB9XG4gICAgLy8gTk9URTogVGhpcyBsb29rcyB1bm9wdGltaXplZCwgYnV0IGl0J3MgYWN0dWFsbHkgcHVycG9zZWZ1bGx5IE5PVFxuICAgIC8vIHVzaW5nIHRyeS9jYXRjaCBvcHRpbWl6YXRpb25zLlxuICAgIE1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmNvdW50KyspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiBNYXBTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29wZXJhdG9yL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBzdWJzY3JpYmVUb1Jlc3VsdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCcpO1xudmFyIE91dGVyU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vT3V0ZXJTdWJzY3JpYmVyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBQcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBpbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5NYXBzIGVhY2ggdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSwgdGhlbiBmbGF0dGVucyBhbGwgb2ZcbiAqIHRoZXNlIGlubmVyIE9ic2VydmFibGVzIHVzaW5nIHtAbGluayBtZXJnZUFsbH0uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2VNYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgYmFzZWQgb24gYXBwbHlpbmcgYSBmdW5jdGlvbiB0aGF0IHlvdVxuICogc3VwcGx5IHRvIGVhY2ggaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hlcmUgdGhhdCBmdW5jdGlvblxuICogcmV0dXJucyBhbiBPYnNlcnZhYmxlLCBhbmQgdGhlbiBtZXJnaW5nIHRob3NlIHJlc3VsdGluZyBPYnNlcnZhYmxlcyBhbmRcbiAqIGVtaXR0aW5nIHRoZSByZXN1bHRzIG9mIHRoaXMgbWVyZ2VyLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBhbmQgZmxhdHRlbiBlYWNoIGxldHRlciB0byBhbiBPYnNlcnZhYmxlIHRpY2tpbmcgZXZlcnkgMSBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgbGV0dGVycyA9IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJyk7XG4gKiB2YXIgcmVzdWx0ID0gbGV0dGVycy5tZXJnZU1hcCh4ID0+XG4gKiAgIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkubWFwKGkgPT4geCtpKVxuICogKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogLy8gUmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nOlxuICogLy8gYTBcbiAqIC8vIGIwXG4gKiAvLyBjMFxuICogLy8gYTFcbiAqIC8vIGIxXG4gKiAvLyBjMVxuICogLy8gY29udGludWVzIHRvIGxpc3QgYSxiLGMgd2l0aCByZXNwZWN0aXZlIGFzY2VuZGluZyBpbnRlZ2Vyc1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3RNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCA/aW5kZXg6IG51bWJlcik6IE9ic2VydmFibGVJbnB1dH0gcHJvamVjdCBBIGZ1bmN0aW9uXG4gKiB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYW4gaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmV0dXJucyBhblxuICogT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpOiBhbnl9IFtyZXN1bHRTZWxlY3Rvcl1cbiAqIEEgZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGJhc2VkIG9uIHRoZSB2YWx1ZXNcbiAqIGFuZCB0aGUgaW5kaWNlcyBvZiB0aGUgc291cmNlIChvdXRlcikgZW1pc3Npb24gYW5kIHRoZSBpbm5lciBPYnNlcnZhYmxlXG4gKiBlbWlzc2lvbi4gVGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBhcmU6XG4gKiAtIGBvdXRlclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVyVmFsdWVgOiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiAtIGBvdXRlckluZGV4YDogdGhlIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHNvdXJjZVxuICogLSBgaW5uZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gKGFuZCB0aGUgb3B0aW9uYWwgYHJlc3VsdFNlbGVjdG9yYCkgdG8gZWFjaCBpdGVtIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgbWVyZ2luZyB0aGUgcmVzdWx0cyBvZiB0aGUgT2JzZXJ2YWJsZXMgb2J0YWluZWRcbiAqIGZyb20gdGhpcyB0cmFuc2Zvcm1hdGlvbi5cbiAqIEBtZXRob2QgbWVyZ2VNYXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZOyB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IE1lcmdlTWFwT3BlcmF0b3IocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpKTtcbn1cbmV4cG9ydHMubWVyZ2VNYXAgPSBtZXJnZU1hcDtcbnZhciBNZXJnZU1hcE9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXJnZU1hcE9wZXJhdG9yKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHsgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTsgfVxuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdG9yID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgICAgIHRoaXMuY29uY3VycmVudCA9IGNvbmN1cnJlbnQ7XG4gICAgfVxuICAgIE1lcmdlTWFwT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAob2JzZXJ2ZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTWVyZ2VNYXBTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByb2plY3QsIHRoaXMucmVzdWx0U2VsZWN0b3IsIHRoaXMuY29uY3VycmVudCkpO1xuICAgIH07XG4gICAgcmV0dXJuIE1lcmdlTWFwT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0cy5NZXJnZU1hcE9wZXJhdG9yID0gTWVyZ2VNYXBPcGVyYXRvcjtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG52YXIgTWVyZ2VNYXBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWVyZ2VNYXBTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1lcmdlTWFwU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgcHJvamVjdCwgcmVzdWx0U2VsZWN0b3IsIGNvbmN1cnJlbnQpIHtcbiAgICAgICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvbmN1cnJlbnQgPSBjb25jdXJyZW50O1xuICAgICAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IDA7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cbiAgICBNZXJnZU1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA8IHRoaXMuY29uY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5fdHJ5TmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTWVyZ2VNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fdHJ5TmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QodmFsdWUsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmUrKztcbiAgICAgICAgdGhpcy5faW5uZXJTdWIocmVzdWx0LCB2YWx1ZSwgaW5kZXgpO1xuICAgIH07XG4gICAgTWVyZ2VNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5faW5uZXJTdWIgPSBmdW5jdGlvbiAoaXNoLCB2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHRfMS5zdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBpc2gsIHZhbHVlLCBpbmRleCkpO1xuICAgIH07XG4gICAgTWVyZ2VNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXJnZU1hcFN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeU5leHQgPSBmdW5jdGlvbiAob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX25vdGlmeVJlc3VsdFNlbGVjdG9yKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZXJnZU1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9ub3RpZnlSZXN1bHRTZWxlY3RvciA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnJlc3VsdFNlbGVjdG9yKG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIE1lcmdlTWFwU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAoaW5uZXJTdWIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgICAgIHRoaXMuYWN0aXZlLS07XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dChidWZmZXIuc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5oYXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE1lcmdlTWFwU3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyXzEuT3V0ZXJTdWJzY3JpYmVyKSk7XG5leHBvcnRzLk1lcmdlTWFwU3Vic2NyaWJlciA9IE1lcmdlTWFwU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL29wZXJhdG9yL21lcmdlTWFwLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbmZ1bmN0aW9uIHN5bWJvbEl0ZXJhdG9yUG9ueWZpbGwocm9vdCkge1xuICAgIHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICAgICAgU3ltYm9sLml0ZXJhdG9yID0gU3ltYm9sKCdpdGVyYXRvciBwb2x5ZmlsbCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTeW1ib2wuaXRlcmF0b3I7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBbZm9yIE1vemlsbGEgR2Vja28gMjctMzU6XShodHRwczovL216bC5sYS8yZXdFMXpDKVxuICAgICAgICB2YXIgU2V0XzEgPSByb290LlNldDtcbiAgICAgICAgaWYgKFNldF8xICYmIHR5cGVvZiBuZXcgU2V0XzEoKVsnQEBpdGVyYXRvciddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgICAgICB9XG4gICAgICAgIHZhciBNYXBfMSA9IHJvb3QuTWFwO1xuICAgICAgICAvLyByZXF1aXJlZCBmb3IgY29tcGF0YWJpbGl0eSB3aXRoIGVzNi1zaGltXG4gICAgICAgIGlmIChNYXBfMSkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhNYXBfMS5wcm90b3R5cGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgLy8gYWNjb3JkaW5nIHRvIHNwZWMsIE1hcC5wcm90b3R5cGVbQEBpdGVyYXRvcl0gYW5kIE1hcC5vcm90b3R5cGUuZW50cmllcyBtdXN0IGJlIGVxdWFsLlxuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJiBNYXBfMS5wcm90b3R5cGVba2V5XSA9PT0gTWFwXzEucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdAQGl0ZXJhdG9yJztcbiAgICB9XG59XG5leHBvcnRzLnN5bWJvbEl0ZXJhdG9yUG9ueWZpbGwgPSBzeW1ib2xJdGVyYXRvclBvbnlmaWxsO1xuZXhwb3J0cy5pdGVyYXRvciA9IHN5bWJvbEl0ZXJhdG9yUG9ueWZpbGwocm9vdF8xLnJvb3QpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgaXRlcmF0b3IgaW5zdGVhZFxuICovXG5leHBvcnRzLiQkaXRlcmF0b3IgPSBleHBvcnRzLml0ZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBvbmUgb3IgbW9yZSBlcnJvcnMgaGF2ZSBvY2N1cnJlZCBkdXJpbmcgdGhlXG4gKiBgdW5zdWJzY3JpYmVgIG9mIGEge0BsaW5rIFN1YnNjcmlwdGlvbn0uXG4gKi9cbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5zdWJzY3JpcHRpb25FcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIHZhciBlcnIgPSBFcnJvci5jYWxsKHRoaXMsIGVycm9ycyA/XG4gICAgICAgICAgICBlcnJvcnMubGVuZ3RoICsgXCIgZXJyb3JzIG9jY3VycmVkIGR1cmluZyB1bnN1YnNjcmlwdGlvbjpcXG4gIFwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiAoKGkgKyAxKSArIFwiKSBcIiArIGVyci50b1N0cmluZygpKTsgfSkuam9pbignXFxuICAnKSA6ICcnKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gVW5zdWJzY3JpcHRpb25FcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuVW5zdWJzY3JpcHRpb25FcnJvciA9IFVuc3Vic2NyaXB0aW9uRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VbnN1YnNjcmlwdGlvbkVycm9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInOyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXJyYXkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvdXRpbC9pc0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy91dGlsL2lzQXJyYXlMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1Byb21pc2UuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvdXRpbC9pc1Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnNjaGVkdWxlID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc1NjaGVkdWxlciA9IGlzU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNTY2hlZHVsZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvdXRpbC9pc1NjaGVkdWxlci5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi9yb290Jyk7XG52YXIgaXNBcnJheUxpa2VfMSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKTtcbnZhciBpc1Byb21pc2VfMSA9IHJlcXVpcmUoJy4vaXNQcm9taXNlJyk7XG52YXIgaXNPYmplY3RfMSA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZhYmxlJyk7XG52YXIgaXRlcmF0b3JfMSA9IHJlcXVpcmUoJy4uL3N5bWJvbC9pdGVyYXRvcicpO1xudmFyIElubmVyU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vSW5uZXJTdWJzY3JpYmVyJyk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vc3ltYm9sL29ic2VydmFibGUnKTtcbmZ1bmN0aW9uIHN1YnNjcmliZVRvUmVzdWx0KG91dGVyU3Vic2NyaWJlciwgcmVzdWx0LCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSB7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gbmV3IElubmVyU3Vic2NyaWJlcl8xLklubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpO1xuICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkge1xuICAgICAgICBpZiAocmVzdWx0Ll9pc1NjYWxhcikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzY3JpYmUoZGVzdGluYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlXzEuaXNBcnJheUxpa2UocmVzdWx0KSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGxlbiAmJiAhZGVzdGluYXRpb24uY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1Byb21pc2VfMS5pc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gZGVzdGluYXRpb24uZXJyb3IoZXJyKTsgfSlcbiAgICAgICAgICAgIC50aGVuKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIC8vIEVzY2FwaW5nIHRoZSBQcm9taXNlIHRyYXA6IGdsb2JhbGx5IHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICAgIHJvb3RfMS5yb290LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtpdGVyYXRvcl8xLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSByZXN1bHRbaXRlcmF0b3JfMS5pdGVyYXRvcl0oKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5kb25lKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQoaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIG9icyA9IHJlc3VsdFtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnMuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBvYmplY3QgZG9lcyBub3QgY29ycmVjdGx5IGltcGxlbWVudCBTeW1ib2wub2JzZXJ2YWJsZScpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKG5ldyBJbm5lclN1YnNjcmliZXJfMS5Jbm5lclN1YnNjcmliZXIob3V0ZXJTdWJzY3JpYmVyLCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGlzT2JqZWN0XzEuaXNPYmplY3QocmVzdWx0KSA/ICdhbiBpbnZhbGlkIG9iamVjdCcgOiBcIidcIiArIHJlc3VsdCArIFwiJ1wiO1xuICAgICAgICB2YXIgbXNnID0gKFwiWW91IHByb3ZpZGVkIFwiICsgdmFsdWUgKyBcIiB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWQuXCIpXG4gICAgICAgICAgICArICcgWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIEFycmF5LCBvciBJdGVyYWJsZS4nO1xuICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgVHlwZUVycm9yKG1zZykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuc3Vic2NyaWJlVG9SZXN1bHQgPSBzdWJzY3JpYmVUb1Jlc3VsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjcmliZVRvUmVzdWx0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbnZhciBPYnNlcnZlcl8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2ZXInKTtcbmZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIoT2JzZXJ2ZXJfMS5lbXB0eSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG5leHBvcnRzLnRvU3Vic2NyaWJlciA9IHRvU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvU3Vic2NyaWJlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy91dGlsL3RvU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZXJyb3JPYmplY3RfMSA9IHJlcXVpcmUoJy4vZXJyb3JPYmplY3QnKTtcbnZhciB0cnlDYXRjaFRhcmdldDtcbmZ1bmN0aW9uIHRyeUNhdGNoZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRyeUNhdGNoVGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZSA9IGU7XG4gICAgICAgIHJldHVybiBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeUNhdGNoKGZuKSB7XG4gICAgdHJ5Q2F0Y2hUYXJnZXQgPSBmbjtcbiAgICByZXR1cm4gdHJ5Q2F0Y2hlcjtcbn1cbmV4cG9ydHMudHJ5Q2F0Y2ggPSB0cnlDYXRjaDtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyeUNhdGNoLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL3V0aWwvdHJ5Q2F0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzYwX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiUnhcIixcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzYxX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOltcIm5nXCIsXCJyb3V0ZXJcIl0sXCJjb21tb25qc1wiOlwiQGFuZ3VsYXIvcm91dGVyXCIsXCJjb21tb25qczJcIjpcIkBhbmd1bGFyL3JvdXRlclwiLFwiYW1kXCI6XCJAYW5ndWxhci9yb3V0ZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIF8gICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge05nTW9kdWxlfSAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFBsdXNNb2R1bGV9IGZyb20gJ25nLWh0dHAtY2xpZW50LXBsdXMnO1xuaW1wb3J0IHtHdWFyZGlhbn0gICAgICAgICAgICAgZnJvbSAnLi9fY29uc3RydWN0b3IvY29uc3RydWN0b3InO1xuaW1wb3J0IGluaXQgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9pbml0aWFsaXplci9pbml0aWFsaXplcic7XG5pbXBvcnQgbG9naW4gICAgICAgICAgICAgICAgICBmcm9tICcuL2xvZ2luLXByb2Nlc3Nvci9sb2dpbi1wcm9jZXNzb3InO1xuaW1wb3J0IGxvZ291dCAgICAgICAgICAgICAgICAgZnJvbSAnLi9sb2dvdXQtcHJvY2Vzc29yL2xvZ291dC1wcm9jZXNzb3InO1xuaW1wb3J0IGxpbmtzICAgICAgICAgICAgICAgICAgZnJvbSAnLi9saW5rcy1nZXR0ZXIvbGlua3MtZ2V0dGVyJztcbmltcG9ydCByb2xlICAgICAgICAgICAgICAgICAgIGZyb20gJy4vcm9sZS1nZXR0ZXIvcm9sZS1nZXR0ZXInO1xuXG5fLmV4dGVuZChHdWFyZGlhbi5wcm90b3R5cGUsIHtcbiAgaW5pdCxcbiAgbG9naW4sXG4gIGxvZ291dCxcbiAgbGlua3MsXG4gIHJvbGVcbn0pO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudFBsdXNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtHdWFyZGlhbl1cbn0pIFxuY2xhc3MgR3VhcmRpYW5Nb2R1bGUge31cblxuZXhwb3J0IHtcbiAgR3VhcmRpYW4sXG4gIEd1YXJkaWFuTW9kdWxlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL25nLWd1YXJkaWFuLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==