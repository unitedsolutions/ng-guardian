import * as _ from 'lodash';

export default (route, roleName) => {
  route = _.omit(route, ['children']);
  return _.extend(route, {children: [], role: roleName});
};
