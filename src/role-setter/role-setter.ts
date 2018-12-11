import * as _         from 'lodash';
import {roles}        from '../_lib/vars';
import routesFilterer from './routes-filterer/routes-filterer';
import linksGenerator from './links-generator/links-generator';
import { NavItem } from '../_constructor/constructor';

export default function(roleName, navigate = true, approvedRoutes?) {
  let role = roles[roleName];
  let {routes: allRoutes, _default: allDefault} = roles.all;
  let {linksPublisher, navLinks, router, redirectUrl} = this;
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
  
  let links = linksGenerator(routes);
  linksPublisher.next({role: roleName, links: links});

  // Generate navLinks
  const authValidRoutes = [];
  links.forEach(element => {
    if (element.children) {
      element.children.forEach(route => {
        if (route.link) {
          let path = route.path.length > 0 ? route.path : element.path;
          authValidRoutes.push( new NavItem(route.group, route.label, path));
        }
      });
    } else {
      if (element.link) {
        authValidRoutes.push( new NavItem(element.group, element.label, element.path));
      }
    }
  });
  const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  const navLinksData = groupBy(authValidRoutes, 'parent');
  navLinks.next(navLinksData);

  router.resetConfig(routes);

  if(navigate) {
    delete this.redirectUrl;
    router.navigate([redirectUrl || _default], {replaceUrl: true});
  }
};
