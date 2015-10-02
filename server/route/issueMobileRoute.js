var express = require('express');

var route = function(Issue){

    var issueController = require('../controllers/issueWebsiteController')(Issue)  // putting elements in controllers to make it easier for unit testing etc, inject mongoose Issue model
    var appRouter = express.Router();
    appRouter.route('/')
        .post(issueController.post)
        .get(issueController.get);

    // this is some middleware we are injecting when we are looking at an id we see if there is a book, we add it to request and next moves us to the next method
    appRouter.use('/:id', function(req,res,next){
        Issue.findById(req.params.id, function(error,issue){
            if(error)
            {
                res.status(500).send(error);
            }
            else if(issue)
            {
                req.issue = issue;
                next();

            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });
    appRouter.route('/:id')

        .get(function(req,res){


            res.json(req.issue);// we wont get here if there is a 404 from above


        })
        .put(function(req,res){

            req.issue.url = req.body.url;
            req.issue.reporter = req.body.reporter;
            req.issue.title = req.body.title;
            req.issue.description = req.body.description;
            req.issue.browser = req.body.browser;
            req.issue.device = req.body.device;
            req.issue.save(function(error){ // on saving if error display error otherwise send back saved element
                if(error)
                {
                    res.status(500).send(error);
                }
                else
                {
                    res.json(req.issue);
                }
            });

        })
        .patch(function(req,res){
            if(req.body._id)
            {
                delete req.body._id;
            }
            for(var p in req.body) // for every key in req.body
            {
                req.issue[p] = req.body[p]; // we are assigning everything in req.issue to req.body
            }
            req.issue.save(function(error){ // on saving if error display error otherwise send back saved element
                if(error){
                    res.status(500).send(error);
                }
                else
                {
                    res.json(req.issue);
                }
            });
        })
        .delete(function(req,res){
           req.issue.remove(function(error){
               if(error)
               {
                   res.status(500).send(error);
               }
               else
               {
                   res.status(204).send('Removed'); // 204 means removed
               }
           }); // take whatever is found in middleware and remove it
        });
    return appRouter;
};

module.exports = route;