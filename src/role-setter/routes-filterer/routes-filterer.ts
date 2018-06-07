import * as _ from 'lodash';

export default function routesFilterer(routes, approvedRoutes, role, paths = [], newRoutes = []) {
  _.each(approvedRoutes, approvedRoute => {
    let {path, children, default: _default} = approvedRoute;
    let route = _.filter(routes, {path})[0];
    
    if(route) {
      let newRoute = _.omit(route, ['children']);
      
      if(_default) {
        _default = [''].concat(paths, path).join('/');
        _.extend(role, {_default});
      }
      
      if(children) {
        paths = paths.concat(path);
        newRoute.children = routesFilterer(route.children, children, role, paths);
        paths = [];
      }
      
      newRoutes.push(newRoute);
    }
  });
    
  return newRoutes;
}
