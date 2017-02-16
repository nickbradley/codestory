/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require('restify');

import Log from "../Util";
import RouteHandler from "./RouteHandler";
import * as redis from 'redis';

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;
    public redisClient: redis.RedisClient

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
        this.redisClient = redis.createClient();
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'codestory'
                });

                that.rest.get('/', function (req: restify.Request, res: restify.Response, next: restify.Next) {
                    res.send(200);
                    return next();
                });

                that.rest.post('/', restify.bodyParser(), RouteHandler.postSnippet);



                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                //that.rest.get('/echo/:msg', Server.echo);

                // Other endpoints will go here
                that.rest.get('/so/123', Server.stackoverflow);



                that.rest.listen(that.port, function () {
                  that.redisClient.on('connect', () => {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                  });
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }




    public static stackoverflow(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('Server::stackoverflow(..) - params: ' + JSON.stringify(req.params));
        try {
            let result = {
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
            }
            Log.info('Server::stackoverflow(..) - responding ' + result.code);
            res.json(result.code, result.body);
        } catch (err) {
            Log.error('Server::stackoverflow(..) - responding 400');
            res.json(400, {error: err.message});
        }
        return next();
    }

}
