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
var _this = this;
var Server_1 = require("./rest/Server");
var Util_1 = require("./Util");
var Redis_1 = require("./controller/Redis");
var App = (function () {
    function App() {
    }
    App.prototype.initServer = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.default.info("App::initServer( " + port + " ) - server starting");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.server = new Server_1.default(port);
                        return [4 /*yield*/, this.server.start()];
                    case 2:
                        status_1 = _a.sent();
                        Util_1.default.info("App::initServer() - started: " + status_1);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        Util_1.default.error("App::initServer() - Error: " + err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.stopServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.default.info("App::stopServer() - server stopping");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.server.stop()];
                    case 2:
                        status_2 = _a.sent();
                        Util_1.default.info("App::stopServer() - stopped: " + status_2);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        Util_1.default.error("App::stopServer() - ERROR: " + err_2.message);
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.disconectRedisClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r, status_3, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Util_1.default.info("App::disconnectRedisClient() - disconnecting");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        r = new Redis_1.default();
                        return [4 /*yield*/, r.client.disconnect()];
                    case 2:
                        status_3 = _a.sent();
                        Util_1.default.info("App::disconnectRedisClient() - disconnected: " + status_3);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        Util_1.default.error("App::disconnectRedisClient() - ERROR: " + err_3.message);
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
Util_1.default.info("App - starting...");
var app = new App();
app.initServer(4321);
process.on("SIGINT", function () { return __awaiter(_this, void 0, void 0, function () {
    var err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Util_1.default.info("App - terminating...");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, app.stopServer()];
            case 2:
                _a.sent();
                return [4 /*yield*/, app.disconectRedisClient()];
            case 3:
                _a.sent();
                Util_1.default.info("App - Successfully terminated.");
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                Util_1.default.error("App - Unable to terminate: " + err_4.messge);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=App.js.map