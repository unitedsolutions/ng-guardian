import * as _ from "lodash";
import autoLockSetter from "../auto-lock-setter/auto-lock-setter";
import {configs} from '../_lib/vars';

export default function(credentials) {
  if (configs.gettingSettingsFromServer === true) {
    if (configs.serverSettngs) {
      credentials['serverSettngs'] = configs.serverSettngs;
    } 
  }
  return new Promise((resolve, reject) => {
    if (configs.lockDownEnabled === false) {
      return resolve({message: 'lockDown functionality is dissabled (configs.lockDownEnabled = false)'})
    }
    if (configs.unlockUrl === null || configs.unlockUrl.length < 1) {
      return resolve({message: 'configs.unlockUrl is not defined,'})
    }
    this.http.post(configs.unlockUrl, credentials).subscribe(
      data => {
        this.sessionStatus.next('LOGGED_IN');
        // reset lockDown
        autoLockSetter("remove");
        configs.lockDown=null;
        autoLockSetter("add");
        if (data) {
          return resolve(data);
        } else {
          return resolve({ok: 1});
        }
      },
      err => {
        reject(err);
      }
    );
  });
}
