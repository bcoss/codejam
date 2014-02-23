var app = require('../app.js');


exports.index = function(req, res){
    app.db.genres.find(function(err, genres) {
        var gIndex = Math.floor(Math.random() * genres.length);
        app.db.nouns.find(function(err, nouns) {
            var nIndex = Math.floor(Math.random() * nouns.length);
            app.db.actions.find(function(err, actions) {
                var aIndex = Math.floor(Math.random() * actions.length);
                res.render('index',
                    {
			"current": "/generator",
                        "extralink": "Clone this game",
                        "extraloc": "/",
                        "gametitle" : genres[gIndex].title + " game where " + nouns[nIndex].title + " " + actions[aIndex].title + "."
                    });
            });
        });
    });
}
