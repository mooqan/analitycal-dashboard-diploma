import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlDto } from './dto/url.dto';
interface ShortenResponse {
    hash: string;
}
interface ErrorResponse {
    error: string;
    code: number;
}
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    shorten(url: UrlDto): Observable<ShortenResponse | ErrorResponse>;
    retrieveAndRedirect(hash: any): Observable<{
        url: string;
    }>;
    update(id: string, updateUserDto: UpdateUrlDto): string;
    remove(id: string): string;
}
export {};
