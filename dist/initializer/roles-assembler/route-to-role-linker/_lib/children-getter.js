import * as _ from 'lodash';
export default function childrenGetter(paths, children) {
    var path = paths.shift();
    if (!path) {
        return children;
    }
    var route = _.filter(children, { path: path })[0];
    childrenGetter(paths, route.children);
}
//# sourceMappingURL=children-getter.js.map