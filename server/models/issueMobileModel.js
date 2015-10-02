var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var issueModel = new Schema({
    url:
    {
        type: String
    },
    reporter:
    {
        type: String
    },
    title:
    {
        type: String
    },
    description:
    {
        type: String
    },
    browser:
    {
        type: String
    },
    device:
    {
        type: String
    }

});

module.exports = mongoose.model('Issue', issueModel);