// Controller for our headlines
// ============================

var scrape = require("../scripts/scrape");
var makedate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
  fetch: function(cb) {
      scrape(function(data) {
        var articles = data;
        for (var i=0; i< articles.length; i++){
          articles[i].date = makeDate();
          articles[i].saves = false;
        }
        Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
          cd(err, docs);
        });
    });
  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query)
    .sort({_id: -1})
    .exec(function(err, doc){
      cb(doc);
    });
  },
  update: function(query, cb){
    Headline.update({_id: query._id},
      {$set: query}, {}, cb);
  }

}
