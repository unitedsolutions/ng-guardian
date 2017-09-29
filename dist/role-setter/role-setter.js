import * as _ from 'lodash';
import { roles } from '../_lib/vars';
import routesFilterer from './routes-filterer/routes-filterer';
import linksGenerator from './links-generator/links-generator';
export default function (roleName, navigate, approvedRoutes) {
    if (navigate === void 0) { navigate = true; }
    var role = roles[roleName];
    var _a = roles.all, allRoutes = _a.routes, allDefault = _a._default;
    var _b = this, linksPublisher = _b.linksPublisher, router = _b.router, redirectUrl = _b.redirectUrl;
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
    linksPublisher.next({ role: roleName, links: linksGenerator(routes) });
    router.resetConfig(routes);
    if (navigate) {
        delete this.redirectUrl;
        router.navigate([redirectUrl || _default], { replaceUrl: true });
    }
}
;
//# sourceMappingURL=role-setter.js.map