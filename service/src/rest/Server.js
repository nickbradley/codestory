"use strict";
var restify = require("restify");
var Util_1 = require("../Util");
var RouteHandler_1 = require("./RouteHandler");
var Server = (function () {
    function Server(port) {
        Util_1.default.info("Server::<init>( " + port + " )");
        this.port = port;
    }
    Server.prototype.stop = function () {
        Util_1.default.info("Server::close()");
        var that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    };
    Server.prototype.start = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            try {
                Util_1.default.info("Server::start() - start");
                _this.rest = restify.createServer({
                    name: "codestory"
                });
                _this.rest.get("/:id", RouteHandler_1.default.getSnippet);
                _this.rest.post("/:id", restify.bodyParser(), RouteHandler_1.default.postSnippet);
                _this.rest.listen(_this.port, function () {
                    Util_1.default.info("Server::start() - restify listening: " + _this.rest.url);
                    fulfill(true);
                });
                _this.rest.on("error", function (err) {
                    Util_1.default.info("Server::start() - restify ERROR: " + err);
                    reject(err);
                });
            }
            catch (err) {
                Util_1.default.error("Server::start() - ERROR: " + err);
                reject(err);
            }
        });
    };
    return Server;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map