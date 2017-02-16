/**
 * Created by rtholmes on 2016-06-14.
 */
import restify = require('restify');
import fs = require('fs');

import Log from '../Util';

export default class RouteHandler {

    public static postSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace('Server::storeSnippet(...) - params: ' + JSON.stringify(req.params));
      try {
        // snippet.origin == stackoverflow
        // req.param.hash ->
        let snippet = req.body;
        let result = {code: 200, body: "all good"};
        Log.trace('Server::storeSnippet(...) - responding ' + result.code);
        res.json(result.code, result.body);
      } catch(err) {
        Log.error('Server::storeSnippet(...) - responding 400');
        res.json(400, {error: err.message});
      }
      return next();
    }


}
