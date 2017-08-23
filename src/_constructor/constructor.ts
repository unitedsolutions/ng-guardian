import {HttpClientPlus}  from 'ng-http-plus';
import {Router}          from '@angular/router';
import {Injectable}      from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable() 
export class Guardian {
  init;
  login;
  logout;
  links;
  role;
  configs;
  defaultUrl;
  redirectUrl;
  linksPublisher = new BehaviorSubject([]);
  
  constructor(public http: HttpClientPlus, public router: Router) {}
}
