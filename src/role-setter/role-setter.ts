import * as _         from 'lodash';
import {roles}        from '../_lib/vars';
import routesFilterer from './routes-filterer/routes-filterer';
import linksGenerator from './links-generator/links-generator';

export default function(roleName, navigate = true, approvedRoutes?) {
  let role = roles[roleName];
  let {routes: allRoutes, _default: allDefault} = roles.all;
  let {linksPublisher, router, redirectUrl} = this;
  let {routes, _default} = role;

  if(approvedRoutes) {
    let _defaultHolder = {_default: ''};
    routes = routesFilterer(routes, approvedRoutes, _defaultHolder);
    ({_default} = _defaultHolder);
  }
  
  if(!_default) {
    _default = allDefault;
  }
  
  if(!_default) {
    throw new Error('each role should have a default route');
  }
  
  _.extend(this, {status: roleName, defaultUrl: _default});

  if(!_.filter(routes, {path: ''}).length) {
    routes.push(...allRoutes);
    routes.push({path: '', pathMatch: 'full', redirectTo: _default});
    routes.push({path: '**', redirectTo: _default});
  }
  
  linksPublisher.next({role: roleName, links: linksGenerator(routes)});
  router.resetConfig(routes);

  if(navigate) {
    delete this.redirectUrl;
    router.navigate([redirectUrl || _default], {replaceUrl: true});
  }
};
