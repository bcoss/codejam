
/*
 * GET home page.
 */
var app = require("../app.js");

exports.index = function(req, res){
    app.db.gametitles.find(function(err, results) {
        var index = Math.floor(Math.random() * results.length);

        res.render('index', {
            "extralink": "Generate game concept",
            "extraloc": "/generator",
            "gametitle" : results[index].title
        });
    });
};