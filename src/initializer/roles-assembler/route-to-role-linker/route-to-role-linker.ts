import * as _          from 'lodash';
import {roles}         from '../../../_lib/vars';
import routeGetter     from './_lib/route-getter';
import routeSterilizer from './_lib/route-sterilizer';

export default function routeToRoleLinker(route, mainRoute?, parentRoute?, paths = []) {
  let {role: routeRoleName, path, default: _default} = route;
  let {role: parentRoleName} = parentRoute || {role: null};
  let {children} = route;
  let childlessRoute = _.omit(route, ['children']);

  if(_default) {
    roles[routeRoleName]._default = [''].concat(paths, path).join('/');
  }

  if(!routeRoleName && !parentRoleName) {
    routeRoleName = 'all';
  }

  if(!parentRoleName) {
    roles[routeRoleName].routes.push(childlessRoute);
  } else {
    if(routeRoleName !== parentRoleName) {
      let rootRoleName = paths.shift();
      let {routes} = roles[routeRoleName];
      let roleRoute = _.filter(routes, {path: rootRoleName})[0];

      if(!roleRoute) {
        roleRoute = routeSterilizer(mainRoute, routeRoleName);
        routes.push(roleRoute);
      }

      roleRoute = routeGetter(paths, roleRoute, mainRoute, routeRoleName);
      roleRoute.children.push(childlessRoute);
    } else {
      let {children = []} = parentRoute;
      
      if(_.isEmpty(children)) {
        _.extend(parentRoute, {children});
      }
      
      children.push(childlessRoute);
    }
  }
  
  _.each(children, child => {
    let {role = routeRoleName || parentRoleName} = child;
    _.extend(child, {role});
    routeToRoleLinker(child, mainRoute || route, childlessRoute, paths.concat(path));
  });
}
