import * as _ from 'lodash';
export default function (route, roleName) {
    route = _.omit(route, ['children']);
    return _.extend(route, { children: [], role: roleName });
};
//# sourceMappingURL=route-sterilizer.js.map