import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JOrderItem } from './j-order-item.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JOrderItemService {

    private resourceUrl = 'api/j-order-items';

    constructor(private http: Http) { }

    create(jOrderItem: JOrderItem): Observable<JOrderItem> {
        const copy = this.convert(jOrderItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(jOrderItem: JOrderItem): Observable<JOrderItem> {
        const copy = this.convert(jOrderItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<JOrderItem> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(jOrderItem: JOrderItem): JOrderItem {
        const copy: JOrderItem = Object.assign({}, jOrderItem);
        return copy;
    }
}
