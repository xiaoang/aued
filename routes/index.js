const router = require('koa-router')(),
    mongoose = require('mongoose'),
    mongourl = 'mongodb://localhost/article';
mongoose.Promise = global.Promise;
mongoose.connect(mongourl);
const Schema = mongoose.Schema,
    schema = new Schema({
        title   : String,
        linkUrl : String,
        fromUrl : String,
        author  : String,
        pubDate : String,
        des     : String
    });
var resdata;
var Model = mongoose.model('lists', schema);
router.get('/', async (ctx,next) => {
    var ps,pn,pagenum;
    function getdata(){
        return new Promise((resolve,reject) =>{
            let p = ctx.query;
            ps = Number(p.ps)||1,
            pn = Number(p.pn)||10;
            Model.count({}, function(err, count) {
                if(err){
                    console.log(err)
                }else{
                    pagenum = Math.ceil(count/pn);
                    if(ps == 1){
                        Model.find({},null).limit(pn).exec(function(err,docs){
                            if(err){
                                console.log(err);
                            }else{
                                resdata={"count":pagenum,"data":docs};
                                resolve(resdata);
                            }
                        })
                    }else{
                        Model.find({},null).skip((ps-1)*pn).limit(pn).exec(function(err,docs){
                            if(err){
                                console.log(err);
                            }else{
                                resdata={"count":pagenum,"data":docs};
                                resolve(resdata);
                            }
                        })
                    }
                }
            })
       })
    }

    var re = await getdata();
    await ctx.render('index', {
        articles:re,
        ps:ps,
        pn:pn,
        pagenum:pagenum
    })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
