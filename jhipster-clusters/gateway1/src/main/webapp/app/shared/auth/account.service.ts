import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccountService  {
    constructor(private http: Http) { }

    get(): Observable<any> {
        return this.http.get('uuaservice/api/account').map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post('uuaservice/api/account', account);
    }
}
