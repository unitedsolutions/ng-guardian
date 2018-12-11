import * as _ from 'lodash';
import { roles } from '../_lib/vars';
import routesFilterer from './routes-filterer/routes-filterer';
import linksGenerator from './links-generator/links-generator';
import { NavItem } from '../_constructor/constructor';
export default function (roleName, navigate, approvedRoutes) {
    if (navigate === void 0) { navigate = true; }
    var role = roles[roleName];
    var _a = roles.all, allRoutes = _a.routes, allDefault = _a._default;
    var _b = this, linksPublisher = _b.linksPublisher, navLinks = _b.navLinks, router = _b.router, redirectUrl = _b.redirectUrl;
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
    router.resetConfig(routes);
    if (navigate) {
        delete this.redirectUrl;
        router.navigate([redirectUrl || _default], { replaceUrl: true });
    }
}
;
//# sourceMappingURL=role-setter.js.map