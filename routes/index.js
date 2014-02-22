
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.titlelist = function(db) {
    return function(req, res) {
        var collection = db.get('gametitles');
        collection.find({},{},function(e,docs){
            res.render('titlelist', {
                "titlelist" : docs
            });
        });
    };
};