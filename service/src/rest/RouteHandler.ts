/**
 * Created by rtholmes on 2016-06-14.
 */
import restify = require('restify');
import fs = require('fs');

import Log from '../Util';
import Server from './Server';

export default class RouteHandler {

  public static getSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace('Server::getSnippet(..) - params: ' + JSON.stringify(req.params));
      // param ?hash=###
      try {
        let hash: string = req.params.hash;
        
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
          Log.info('Server::getSnippet(..) - responding ' + result.code);
          res.json(result.code, result.body);
      } catch (err) {
          Log.error('Server::getSnippet(..) - responding 400');
          res.json(400, {error: err.message});
      }
      return next();
  }

    public static postSnippet(req: restify.Request, res: restify.Response, next: restify.Next) {
      Log.trace('Server::postSnippet(...) - params: ' + JSON.stringify(req.params));
      try {
        // snippet.origin == stackoverflow
        // req.param.hash ->
        let snippet = req.body;
        let result = {code: 200, body: "all good"};
        Log.trace('Server::postSnippet(...) - responding ' + result.code);
        res.json(result.code, result.body);
      } catch(err) {
        Log.error('Server::postSnippet(...) - responding 400');
        res.json(400, {error: err.messag});
      }
      return next();
    }


}
