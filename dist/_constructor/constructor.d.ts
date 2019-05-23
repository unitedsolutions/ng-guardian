import { HttpClientPlus } from 'ng-http-client-plus';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
export declare class Guardian {
    http: HttpClientPlus;
    router: Router;
    init: any;
    login: any;
    logout: any;
    unlock: any;
    links: any;
    role: any;
    configs: any;
    defaultUrl: any;
    redirectUrl: any;
    history: any[];
    linksPublisher: BehaviorSubject<any>;
    sessionStatus: BehaviorSubject<string>;
    navLinks: BehaviorSubject<any>;
    auth: any;
    data: BehaviorSubject<any>;
    constructor(http: HttpClientPlus, router: Router);
}
export declare class NavItem {
    parent: string;
    label: string;
    path: string;
    constructor(parent: string, label: string, path: string);
}
