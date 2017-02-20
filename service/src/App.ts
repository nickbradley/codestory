/**
 * Starts the server. It is unlikely you will have to change anything here.
 */
import Server from "./rest/Server";
import Log from "./Util";

import RedisManager from "./controller/RedisManager";

/**
 * Starts the server; doesn"t listen to whether the start was successful.
 */
export default class App {
    private server: Server;


    public async initServer(port: number) {
        Log.info("App::initServer( " + port + " ) - server starting");
        try {
          this.server = new Server(port);
          let status = await this.server.start();
          Log.info("App::initServer() - started: " + status);
        }
        catch (err) {
          Log.error("App::initServer() - Error: " + err.message);
          throw err;
        }
    }


    public async stopServer() {
      Log.info("App::stopServer() - server stopping");
      try {
        let status = await this.server.stop();
        Log.info("App::stopServer() - stopped: " + status);
      }
      catch (err) {
        Log.error("App::stopServer() - ERROR: " + err.message);
        throw err;
      }
    }


    public async disconectRedisClient() {
      Log.info("App::disconnectRedisClient() - disconnecting");
      try {
        let r = new RedisManager();
        let status = await r.client.disconnect();
        Log.info("App::disconnectRedisClient() - disconnected: " + status);
      }
      catch (err) {
        Log.error("App::disconnectRedisClient() - ERROR: " + err.message);
        throw err;
      }
    }
}

// This ends up starting the whole system and listens on a hardcoded port (4321)
Log.info("App - starting...");
let app = new App();
app.initServer(4321);


// process.on("SIGINT", async () => {
//   Log.info("App - terminating...");
//   try {
//     await app.stopServer();
//     await app.disconectRedisClient();
//     Log.info("App - Successfully terminated.");
//   }
//   catch (err) {
//     Log.error("App - Unable to terminate: " + err.messge);
//   }
// });
