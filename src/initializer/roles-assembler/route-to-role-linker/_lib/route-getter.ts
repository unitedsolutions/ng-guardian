import * as _          from 'lodash';
import routeSterilizer from './route-sterilizer';

export default function routeGetter(paths, roleRoute, mainRoute, roleName) {
  let path = paths.shift();

  if(!path) {
    return roleRoute;
  }
  
  let [roleChild, mainChild] = [roleRoute, mainRoute].map(route => {
    return _.filter(route.children, {path})[0];
  });

  if(!roleChild) {
    roleChild = routeSterilizer(mainChild, roleName);
    roleRoute.children.push(roleChild);
  }
  
  return routeGetter(paths, roleChild, mainChild, roleName);
}
