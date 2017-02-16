"use strict";
var restify = require("restify");
var Util_1 = require("../Util");
var Server = (function () {
    function Server(port) {
        Util_1.default.info("Server::<init>( " + port + " )");
        this.port = port;
    }
    Server.prototype.stop = function () {
        Util_1.default.info('Server::close()');
        var that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    };
    Server.prototype.start = function () {
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Util_1.default.info('Server::start() - start');
                that.rest = restify.createServer({
                    name: 'insightUBC'
                });
                that.rest.get('/', function (req, res, next) {
                    res.send(200);
                    return next();
                });
                that.rest.get('/so/123', Server.stackoverflow);
                that.rest.listen(that.port, function () {
                    Util_1.default.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });
                that.rest.on('error', function (err) {
                    Util_1.default.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            }
            catch (err) {
                Util_1.default.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    };
    Server.stackoverflow = function (req, res, next) {
        Util_1.default.trace('Server::stackoverflow(..) - params: ' + JSON.stringify(req.params));
        try {
            var result = {
                code: 200,
                body: {
                    "origin": "CodeStory",
                    "originalSelection": "last_nom",
                    "questionUrl": "http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript",
                    "questionContent": "\n\nI have an array of JavaScript objects:\n\nvar objs = [ \n    { first_nom: 'Lazslo', last_nom: 'Jamf'     },\n    { first_nom: 'Pig',    last_nom: 'Bodine'   },\n    { first_nom: 'Pirate', last_nom: 'Prentice' }\n];\n\nHow can I sort them by the value of last_nom in JavaScript?\n\nI know about sort(a,b), but that only seems to work on strings and numbers. Do I need to add a toString method to my objects?\n    ",
                    "answerUrl": "http://stackoverflow.com//a/1129270/1105907",
                    "accessTime": 1486431788128,
                    "fullCodeSnippet": "function compare(a,b) {\n  if (a.last_nom < b.last_nom)\n    return -1;\n  if (a.last_nom > b.last_nom)\n    return 1;\n  return 0;\n}\n\nobjs.sort(compare);",
                    "answerContent": "\nIt's easy enough to write your own comparison function:\n\nfunction compare(a,b) {\n  if (a.last_nom < b.last_nom)\n    return -1;\n  if (a.last_nom > b.last_nom)\n    return 1;\n  return 0;\n}\n\nobjs.sort(compare);\n\nOr inline (c/o Marco Demaio): \n\nobjs.sort(function(a,b) {return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);} ); \n    ",
                    "votes": 1749,
                    "accepted": true
                }
            };
            Util_1.default.info('Server::stackoverflow(..) - responding ' + result.code);
            res.json(result.code, result.body);
        }
        catch (err) {
            Util_1.default.error('Server::stackoverflow(..) - responding 400');
            res.json(400, { error: err.message });
        }
        return next();
    };
    return Server;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map