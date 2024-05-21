"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRepositoryHashmap = void 0;
const rxjs_1 = require("rxjs");
class UrlRepositoryHashmap {
    constructor() {
        this.hashMap = new Map();
    }
    get(hash) {
        return (0, rxjs_1.of)(this.hashMap.get(hash));
    }
    put(hash, url) {
        return (0, rxjs_1.of)(this.hashMap.set(hash, url).get(hash));
    }
}
exports.UrlRepositoryHashmap = UrlRepositoryHashmap;
//# sourceMappingURL=url.repository.hashmap.js.map