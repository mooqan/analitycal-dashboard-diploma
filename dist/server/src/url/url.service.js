"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const url_repository_1 = require("./url.repository");
let UrlService = class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    shorten(url) {
        const hash = Math.random().toString(36).slice(7);
        return this.urlRepository.put(hash, url).pipe((0, rxjs_1.map)(() => `http://localhost:3001/api/shorten/${hash}`));
    }
    retrieve(hash) {
        return this.urlRepository.get(hash);
    }
    create(createUrlDto) {
        return 'This action adds a new url';
    }
    findAll() {
        return `This action returns all url`;
    }
    findOne(id) {
        return `This action returns a #${id} url`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} url`;
    }
    remove(id) {
        return `This action removes a #${id} url`;
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(url_repository_1.UrlRepositoryTag)),
    __metadata("design:paramtypes", [Object])
], UrlService);
//# sourceMappingURL=url.service.js.map