import { Observable } from 'rxjs';
export interface UrlRepository {
    put(hash: string, url: string): Observable<string>;
    get(hash: string): Observable<string>;
}
export declare const UrlRepositoryTag = "UrlRepository";
