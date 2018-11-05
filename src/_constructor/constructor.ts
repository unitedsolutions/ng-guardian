import {HttpClientPlus}  from 'ng-http-client-plus';
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
  history = [];
  linksPublisher = new BehaviorSubject([]);
  sessionStatus = new BehaviorSubject<string>('');
  auth;
  
  constructor(public http: HttpClientPlus, public router: Router) {}
}
