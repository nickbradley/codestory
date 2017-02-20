import restify = require("restify");
import fs = require("fs");

import Log from "../Util";
import Server from "./Server";
import RedisManager from "../controller/RedisManager";

export default class RouteHandler {


  public static async getSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace("Server::getSnippet(..) - id: " + JSON.stringify(req.params.id));
      try {
        let key: string = req.params.id;
        let redis: RedisManager = new RedisManager();

        await redis.client.connect();
        let body = await redis.client.get(key);

        Log.info("Server::getSnippet(..) - responding 200");
        res.json(200, body);
      } catch (err) {
          Log.error("Server::getSnippet(..) - responding 200 OK (Soft 404)");
          Log.error("error is" + err);
          console.log("ERROR ", err);
          res.json(200, {});
      }
      return next();
  }


  public static async postSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace("Server::postSnippet(...) - id: " + JSON.stringify(req.params.hash));
      console.log("req.params", req.params);
      console.log("typeof req.params", typeof req.params);
      console.log("req.params.hash", req.params.hash);
      console.log("req.params.story", req.params.story);
      try {
        let key: string = req.params.hash;
        let snippet = req.params.story;
        let redis: RedisManager = new RedisManager();

        await redis.client.connect();
        await redis.client.set(key, snippet);

        Log.trace("Server::postSnippet(...) - responding 201 empty body");
        res.json(201, "");
      } catch(err) {
        Log.error("Server::postSnippet(...) - responding 500 ERROR: " + err.message);
        res.json(500, {error: err.message});
      }
      return next();
    }


}
