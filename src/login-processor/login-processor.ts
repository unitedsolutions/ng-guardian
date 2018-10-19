import * as _ from "lodash";
import autoLogoutSetter from "../auto-logout-setter/auto-logout-setter";
import roleSetter from "../role-setter/role-setter";

export default function(credentials) {
  return new Promise((resolve, reject) => {
    this.http.post(this.configs.loginUrl, credentials).subscribe(
      data => {
        let fields = ["routes", "token", "result"];
        let { routes, token, result } = _.pick(data, fields);
        this.auth = result;
        this.http.setToken(token);
        data = _.omit(data, fields);

        _.extend(this, { data });
        roleSetter.call(this, "auth", true, routes);
        autoLogoutSetter("add");
        resolve({auth: (result ? result : 'ok'), data: data});
      },
      err => {
        reject(err);
      }
    );
  });
}
