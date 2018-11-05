import * as _ from 'lodash';
export default function routesFilterer(routes, approvedRoutes, role, paths, newRoutes) {
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
//# sourceMappingURL=routes-filterer.js.map