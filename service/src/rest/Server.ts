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

              // support CORS
              this.rest.use(
                function crossOrigin(req: restify.Request, res: restify.Response, next: restify.Next){
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Headers", "X-Requested-With");
                  return next();
              });


              this.rest.get("/:id", RouteHandler.getSnippet);

              this.rest.post("/:id", restify.bodyParser(), RouteHandler.postSnippet);


              this.rest.listen(this.port, () => {
                Log.info("Server::start() - restify listening: " + this.rest.url);
                fulfill(true);
              });

              this.rest.on("error", (err: string) => {
                Log.info("Server::start() - restify ERROR: " + err);
                reject(err);
              });

          } catch (err) {
              Log.error("Server::start() - ERROR: " + err);
              reject(err);
          }
      });
    }
}
