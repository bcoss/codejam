
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.codejam = function(db) {
    return function(req, res) {
        var collection = db.get('gametitles');
        collection.find({},{},function(e,docs){
            res.render('gametitles', {
                "codejam" : docs
            });
        });
    };
};