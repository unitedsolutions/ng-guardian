import * as _            from 'lodash';
import routeToRoleLinker from './route-to-role-linker/route-to-role-linker';

export default guardian => {
  _.each(guardian.router.config, route => routeToRoleLinker(route));
};
