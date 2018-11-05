import * as _ from 'lodash';

export default function childrenGetter(paths, children) {
  let path = paths.shift();
  
  if(!path) {
    return children;
  }
  
  let [route] = _.filter(children, {path});
  
  childrenGetter(paths, route.children);
}
