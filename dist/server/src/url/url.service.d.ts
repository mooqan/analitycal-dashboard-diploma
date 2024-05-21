import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Observable } from 'rxjs';
import { UrlRepository } from './url.repository';
export declare class UrlService {
    private readonly urlRepository;
    constructor(urlRepository: UrlRepository);
    shorten(url: string): Observable<string>;
    retrieve(hash: string): Observable<string>;
    create(createUrlDto: CreateUrlDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUrlDto): string;
    remove(id: number): string;
}
