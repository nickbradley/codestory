"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Util_1 = require("../Util");
var RedisManager_1 = require("../controller/RedisManager");
var RouteHandler = (function () {
    function RouteHandler() {
    }
    RouteHandler.getSnippet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var key, redis, body, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.default.trace("Server::getSnippet(..) - id: " + JSON.stringify(req.params.id));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        key = req.params.id;
                        redis = new RedisManager_1.default();
                        return [4 /*yield*/, redis.client.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, redis.client.get(key)];
                    case 3:
                        body = _a.sent();
                        Util_1.default.info("Server::getSnippet(..) - responding 200");
                        res.json(200, body);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        Util_1.default.error("Server::getSnippet(..) - responding 400");
                        res.json(400, { error: err_1.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, next()];
                }
            });
        });
    };
    RouteHandler.postSnippet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var key, snippet, redis, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.default.trace("Server::postSnippet(...) - id: " + JSON.stringify(req.params.id));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        key = req.params.id;
                        snippet = req.body;
                        redis = new RedisManager_1.default();
                        return [4 /*yield*/, redis.client.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, redis.client.set(key, snippet)];
                    case 3:
                        _a.sent();
                        Util_1.default.trace("Server::postSnippet(...) - responding 201");
                        res.json(201, "");
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        Util_1.default.error("Server::postSnippet(...) - responding 400");
                        res.json(400, { error: err_2.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, next()];
                }
            });
        });
    };
    return RouteHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map