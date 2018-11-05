import * as _ from 'lodash';
import { roles } from '../../../_lib/vars';
import childrenGetter from './_lib/children-getter';
import routeGetter from './_lib/route-getter';
import routeSterilizer from './_lib/route-sterilizer';
export default function routeToRoleLinker(route, mainRoute, parentRoute, paths) {
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
//# sourceMappingURL=route-to-role-linker.js.map