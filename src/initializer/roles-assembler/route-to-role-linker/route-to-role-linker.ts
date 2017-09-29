import * as _          from 'lodash';
import {roles}         from '../../../_lib/vars';
import childrenGetter  from './_lib/children-getter';
import routeGetter     from './_lib/route-getter';
import routeSterilizer from './_lib/route-sterilizer';

export default function routeToRoleLinker(route, mainRoute?, parentRoute?, paths = []) {
  let {role: routeRoleName, path, default: _default} = route;
  let {role: parentRoleName} = parentRoute || {role: null};
  let {children} = route;
  let childlessRoute = _.omit(route, ['children']);

  if(!routeRoleName) {
    routeRoleName = parentRoleName || 'all';
  }

  if(_default) {
    roles[routeRoleName]._default = [''].concat(paths, path).join('/');
  }

  if(!parentRoleName) {
    roles[routeRoleName].routes.push(childlessRoute);
  } else {
    if(routeRoleName !== parentRoleName) {
      let rootRoleName = paths.shift();
      let {routes} = roles[routeRoleName];
      let [roleRoute] = _.filter(routes, {path: rootRoleName});

      if(!roleRoute) {
        roleRoute = routeSterilizer(mainRoute, routeRoleName);
        routes.push(roleRoute);
      }

      roleRoute = routeGetter(paths.slice(), roleRoute, mainRoute, routeRoleName);
      roleRoute.children.push(childlessRoute);
      
      let children = childrenGetter(paths, mainRoute.children);
      let [emptyMainRoute] = _.filter(children, {path: ''});
      let [emptyRoleRoute] = _.filter(roleRoute.children, {path: ''});
      
      if(emptyMainRoute && !emptyRoleRoute) {
        roleRoute.children.unshift({path: '', redirectTo: path, pathMatch: 'full'});
      }
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
