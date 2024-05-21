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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
const rxjs_1 = require("rxjs");
const update_url_dto_1 = require("./dto/update-url.dto");
const crypto_1 = require("crypto");
const url_dto_1 = require("./dto/url.dto");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    shorten(url) {
        if (!url) {
            return (0, rxjs_1.of)({ error: `No url provided. Please provide in the body. E.g. {'url':'https://google.com'}`, code: 400 });
        }
        return this.urlService.shorten(url.url).pipe((0, rxjs_1.map)(hash => ({ hash })));
    }
    retrieveAndRedirect(hash) {
        return this.urlService.retrieve(hash).pipe((0, rxjs_1.map)(url => ({ url })));
    }
    update(id, updateUserDto) {
        return this.urlService.update(+crypto_1.hash, updateUserDto);
    }
    remove(id) {
        return this.urlService.remove(+crypto_1.hash);
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [url_dto_1.UrlDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UrlController.prototype, "shorten", null);
__decorate([
    (0, common_1.Get)(':hash'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UrlController.prototype, "retrieveAndRedirect", null);
__decorate([
    (0, common_1.Patch)(':hash'),
    __param(0, (0, common_1.Param)('hash')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_url_dto_1.UpdateUrlDto]),
    __metadata("design:returntype", void 0)
], UrlController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':hash'),
    __param(0, (0, common_1.Param)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrlController.prototype, "remove", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('shorten'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map