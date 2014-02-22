
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.game_titles = function(db) {
    return function(req, res) {
        var collection = db.get('title');
        collection.find({},{},function(e,docs){
            res.render('game_titles', {
                "game_titles" : docs
            });
        });
    };
};