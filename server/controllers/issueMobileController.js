var issueController = function(Issue){

    var post = function(req,res){
        var myissue = new Issue(req.body);

        if(!req.body.url){
            res.status(400);
            res.send('Url is required');
        }
        else{
            myissue.save();
            res.status(201);
            res.send(myissue);
        }


    }



    var get = function(req,res){

        var query = {};
        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }

        Issue.find(query, function(error,issue){
            if(error)
            {
                res.status(500).send(error);
            }
            else
            {
                res.json(issue);
            }
        });

    }

    // we need to expose these functions to the outside world
    return{
        post: post,
        get: get
    }
}

module.exports = issueController;
