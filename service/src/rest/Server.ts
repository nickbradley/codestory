/**
 * This is the REST entry point for the project.
 * Restify is configured here.
 */

import restify = require("restify");

import Log from "../Util";
import RouteHandler from "./RouteHandler";
import * as redis from "redis";

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private rest: restify.Server;

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info("Server::close()");
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
      return new Promise((fulfill, reject) => {
          try {
              Log.info("Server::start() - start");
              this.rest = restify.createServer({
                  name: "codestory"
              });
              this.rest.pre(restify.pre.sanitizePath());

              // support CORS
              this.rest.use(
                function crossOrigin(req: restify.Request, res: restify.Response, next: restify.Next){
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Headers", "*");
                  res.header("Access-Control-Allow-Methods", "*");
                  return next();
              });

              // rest api endpoints
              this.rest.get("/codestory/rest/:id", RouteHandler.getSnippet);

              this.rest.post("/codestory/rest", restify.bodyParser({mapParams: true}), RouteHandler.postSnippet);

              // Handle URLs: /codestory/<FILENAME>
              this.rest.get("/codestory/.+\.[html|css|js]$", restify.serveStatic({
                directory: __dirname + "/frontend/",
                default: "index.html"
              }));

              // Handle URLs: /codestory/<HASH>
              this.rest.get("/codestory/[a-zA-Z0-9]+", restify.serveStatic({
                directory: __dirname + "/frontend/codestory/",
                file: "index.html"
              }));

              // catch-all
              this.rest.get("/\/.*\//", restify.serveStatic({
                  directory: __dirname + "/frontend/",
                  file: "index.html"
              }));

              this.rest.get("/", restify.serveStatic({
                  directory: __dirname + "/frontend/",
                  file: "index.html"
              }));


              this.rest.listen(this.port, () => {
                Log.info("Server::start() - restify listening: " + this.rest.url);
                fulfill(true);
              });

              this.rest.on("error", (err: string) => {
                Log.info("Server::start() - restify ERROR: " + err);
                reject(err);
              });

              this.rest.on('after', (req: restify.Request, res: restify.Response, route: restify.Route, err: Error) => {
                if (err) {
                  Log.error("Sever - ROUTE ERROR " + err.message);
                }
                Log.trace("Server - ROUTE " + route.spec.method + " " + res.statusCode + " " + req.url + " => " + route.spec.path);
              });

          } catch (err) {
              Log.error("Server::start() - ERROR: " + err);
              reject(err);
          }
      });
    }
}
