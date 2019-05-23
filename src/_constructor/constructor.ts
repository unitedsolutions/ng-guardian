import {HttpClientPlus}  from 'ng-http-client-plus';
import {Router}          from '@angular/router';
import {Injectable}      from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable() 
export class Guardian {
  init;
  login;
  logout;
  unlock;
  links;
  role;
  configs;
  defaultUrl;
  redirectUrl;
  history = [];
  linksPublisher = new BehaviorSubject<any>(null);
  sessionStatus = new BehaviorSubject<string>('');
  navLinks = new BehaviorSubject<any>(null);
  auth;
  data;
  
  constructor(public http: HttpClientPlus, public router: Router) {}
}

export class NavItem {
  parent: string;
  label: string;
  path: string;
  constructor(parent: string, label: string, path: string) {
    this.parent = parent ? parent : 'undefined';
    this.path = path ? path : '';
    this.label = label ? label : path;
  }
}

