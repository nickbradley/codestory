"use strict";
var Util_1 = require("../Util");
var RouteHandler = (function () {
    function RouteHandler() {
    }
    RouteHandler.postSnippet = function (req, res, next) {
        Util_1.default.trace('Server::storeSnippet(...) - params: ' + JSON.stringify(req.params));
        try {
            var snippet = req.body;
            var result = { code: 200, body: "all good" };
            Util_1.default.trace('Server::storeSnippet(...) - responding ' + result.code);
            res.json(result.code, result.body);
        }
        catch (err) {
            Util_1.default.error('Server::storeSnippet(...) - responding 400');
            res.json(400, { error: err.message });
        }
        return next();
    };
    return RouteHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map