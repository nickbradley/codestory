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
      return new Promise((fulfill, reject) => {
            try {
                Log.info('Server::start() - start');

                this.rest = restify.createServer({
                    name: 'codestory'
                });

                this.redisClient = redis.createClient();

                this.rest.get('/:hash', RouteHandler.getSnippet);

                this.rest.post('/', restify.bodyParser(), RouteHandler.postSnippet);



                // provides the echo service
                // curl -is  http://localhost:4321/echo/myMessage
                //that.rest.get('/echo/:msg', Server.echo);

                // Other endpoints will go here
                // this.rest.get('/so/123', Server.stackoverflow);



                let promises: Promise<any>[] = [];
                promises.push(new Promise((fulfill, rejct) => {
                  this.redisClient.on('connect', () => {
                    fulfill();
                  });
                  this.redisClient.on('error', (err: string) => {
                    reject(err);
                  })
                }));

                promises.push(new Promise((fulfill, reject) => {
                  this.rest.listen(this.port, () => {
                    fulfill();
                  });
                  this.rest.on('error', (err: string) => {
                    reject(err);
                  });
                }));

                // Wait until both the redis client and the restify listener are
                // ready.
                Promise.all(promises).then(() => {
                  Log.info('Server::start() - restify listening: ' + this.rest.url);
                  fulfill(true);
                }).catch((err) => {
                  Log.info('Server::start() - restify ERROR: ' + err);
                  reject(err);
                })

            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }
}
