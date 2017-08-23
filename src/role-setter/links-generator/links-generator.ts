import * as _ from 'lodash';

export default function linksGenerator(routes, paths = [], links = []) {
  _.each(routes, route => {
    let {path, link, label, linkLabel, children} = route;
    let childrenLinks = linksGenerator(children, paths.concat(path));
    
    if(link) {
      if(!linkLabel) {
        linkLabel = label || path;
      }
      
      path = [''].concat(paths, path).join('/');
      
      let linkRecordProperties = _.omit(route, ['path', 'component']);     
      let linkRecord = _.extend({label: linkLabel, path}, linkRecordProperties);
      
      if(!_.isEmpty(childrenLinks)) {
        _.extend(linkRecord, {children: childrenLinks});
      }
      
      links.push(linkRecord);
    } else {
      links.push(...childrenLinks);
    }
  });
  
  return links;
}
