//var express = require('express'),
 //   app = express(),
  //  router = express.Router(),
var app = require('express')(),
    mongoose = require('mongoose'),
    mongourl = 'mongodb://localhost/article',
    URL = require('url');
mongoose.connect(mongourl);
var Schema = mongoose.Schema,
    Model,
    resdata = {},
    schema = new Schema({
        title   : String,
        linkUrl : String,
        fromUrl : String,
        author  : String,
        pubDate : String,
        des     : String
    });
Model = mongoose.model('lists', schema);
app.get('/article/lists',function(req,res){
//router.get('/article/lists',function(req,res){
    res.writeHead(200,{'Content-Type':'text/javascript;charset=utf-8'});
    var p = URL.parse(req.url,true),
        ps = Number(p.query.ps),
        pn = Number(p.query.pn),
        resdata;
    Model.count({}, function(err, count) {
        if(err){
            console.log(err)
        }else{
            var count = Math.ceil(count/pn);
            if(ps == 1){
                Model.find({},null).limit(pn).exec(function(err,docs){
                    if(err){
                        console.log(err);
                    }else{
                        res.end(JSON.stringify({"count":count,"data":docs}));
                    }
                })
            }else{
                Model.find({},null).skip((ps-1)*pn).limit(pn).exec(function(err,docs){
                    if(err){
                        console.log(err);
                    }else{
                        res.end(JSON.stringify({"count":count,"data":docs}));
                    }
                })
            }
        }
    })
})
//app.use(router);
app.listen(8080);
