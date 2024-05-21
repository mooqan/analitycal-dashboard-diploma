import { Url } from 'server/src/url/entities/url.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    urls: Url[];
    createdAt: Date;
    updatedAt: Date;
}
