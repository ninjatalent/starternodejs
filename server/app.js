var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

if(process.env.ENV == 'Test') {
   db = mongoose.connect('mongodb://localhost/MaxProjectTrackingStaging');
}
else
{
   db = mongoose.connect('mongodb://localhost/MaxProjectTracking');
}

var issueWebsiteModel = require('./models/issueWebsiteModel');

var app = express();
app.use(cors());

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

issueWebsiteRouter = require('./route/issueWebsiteRoute')(issueWebsiteModel); // inject Issue into the issueRoute function



app.use('/api/issue', issueWebsiteRouter); // appRouter called when /api/issue is reached, should be issueRouter refactor
// app.use('/api/project', projectRouter);







app.get('/', function(req,res){
   res.send('welcome to my api'); // sends text
});

app.listen(port,function(){
   console.log('gulp is running ' + port);
});


