import { UrlRepository } from './url.repository';
import { Observable } from 'rxjs';
export declare class UrlRepositoryHashmap implements UrlRepository {
    private readonly hashMap;
    constructor();
    get(hash: string): Observable<string>;
    put(hash: string, url: string): Observable<string>;
}
