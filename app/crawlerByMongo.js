var http = require('http'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    mongoose = require('mongoose'),
    mongourl = 'mongodb://localhost/article',
    pageUrls = [],
    pageNum = 16;
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
mongoose.connect(mongourl);
var Schema = mongoose.Schema;
//骨架模版
var movieSchema = new Schema({
    title   : String,
    linkUrl : String,
    fromUrl : String,
    author  : String,
    pubDate : String,
    des     : String
})
//模型
var Movie = mongoose.model('lists', movieSchema);
//存储数据
pageUrls.forEach(function(pageUrl){
    superagent.get(pageUrl)
    .end(function(err,page){
        var $ = cheerio.load(page.text);
        var articles = $('article.post');
        //var quoteUrls = $('.entry-content blockquote a');
        for(var i = 0;i < articles.length; i++){
            //var articalUrl = quoteUrls.eq(i).attr("href");
            var title = articles.eq(i).children('h1.title').children('a').html(),
                linkUrl = 'http://www.75team.com' + articles.eq(i).children('h1.title').children('a').attr('href'),
                descont = articles.eq(i).children('.entry-content'),
                fromUrl = descont.find('a').attr('href'),
                author = articles.eq(i).find('span.author').html(),
                pubDate = articles.eq(i).find('span.date').html();
                descont.children('blockquote').remove();
            var des = descont.html();

            moive = new Movie({
                title   : title,
                linkUrl : linkUrl,
                fromUrl : fromUrl,
                author  : author,
                pubDate : pubDate,
                des     : des
            })
            //保存数据库
            moive.save(function(err) {
                if (err) {
                    console.log('保存失败')
                    return;
                }
                console.log('meow');
            })
        }
    })
})
