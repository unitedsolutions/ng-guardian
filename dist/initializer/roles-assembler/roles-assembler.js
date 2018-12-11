import * as _ from 'lodash';
import routeToRoleLinker from './route-to-role-linker/route-to-role-linker';
export default (function (guardian) {
    _.each(guardian.router.config, function (route) { return routeToRoleLinker(route); });
});
//# sourceMappingURL=roles-assembler.js.map