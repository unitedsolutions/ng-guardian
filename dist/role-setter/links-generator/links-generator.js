import * as _ from 'lodash';
export default function linksGenerator(routes, paths, links) {
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
//# sourceMappingURL=links-generator.js.map