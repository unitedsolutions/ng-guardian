import {HttpClient}      from '@angular/common/http';
import {Router}          from '@angular/router';
import {BehaviorSubject} from 'rxjs';

export declare class Guardian {
  http: HttpClient;
  router: Router;
  init: any;
  login: any;
  logout: any;
  links: any;
  role: any;
  get: any;
  post: any;
  delete: any;
  put: any;
  patch: any;
  token: any;
  configs: any;
  defaultUrl: any;
  redirectUrl: any;
  linksPublisher: BehaviorSubject<any[]>;
  
  constructor(http: HttpClient, router: Router);
}
