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
          Log.error("Server::getSnippet(..) - responding 200: empty body");
          Log.error("error is" + err);
          console.log("ERROR ", err);
          res.json(200, {});
      }
      return next();
  }


  public static async postSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace("Server::postSnippet(...) - id: " + JSON.stringify(req.params.id));
      console.log("req.params", req.params);
      console.log("req.body", req.body);
      try {
        let key: string = req.params.id;
        let snippet = req.body;
        let redis: RedisManager = new RedisManager();

        await redis.client.connect();
        await redis.client.set(key, snippet);

        Log.trace("Server::postSnippet(...) - responding 201");
        res.json(201, "");
      } catch(err) {
        Log.error("Server::postSnippet(...) - responding 400");
        Log.error("error is" + err);
        console.log("ERROR ", err);
        res.json(500, {error: err});
      }
      return next();
    }


}
