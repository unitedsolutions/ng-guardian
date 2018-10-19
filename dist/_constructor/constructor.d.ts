import { HttpClientPlus } from 'ng-http-client-plus';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
export declare class Guardian {
    http: HttpClientPlus;
    router: Router;
    init: any;
    login: any;
    logout: any;
    links: any;
    role: any;
    configs: any;
    defaultUrl: any;
    redirectUrl: any;
    history: any[];
    linksPublisher: BehaviorSubject<any[]>;
    auth: any;
    constructor(http: HttpClientPlus, router: Router);
}
