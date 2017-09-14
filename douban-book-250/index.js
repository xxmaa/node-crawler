var http = require('http'),
    fs = require('fs'),
    async = require('async'),
    superagent = require('superagent'),
    cheerio = require('cheerio');
var doubanURL = 'https://book.douban.com/top250?start=';
var books = [];
var pageURLs = [];
// 获取top250书籍的10个页面
for (var i = 0; i < 250; i += 25) {
    pageURLs.push(doubanURL + i);
}
// 获取豆瓣图书大图片
function getImage(str) {
    return str.replace(/spic/g, "lpic");
}
// 获取图书id
function getId(str) {
    return str.replace(/[\S]*\/([\d]*)\//g, '$1');
}
// 获取图书的标题
function getTitle(str) {
    return str.replace(/([\S]*)[\n\s:,]*([\S]*)/g, function(match, p1, p2){
        if (p2) {
            return p1 + "-" + p2;
        }
        return p1;
    });
}
// 请求数据的函数
function getData(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url)
        .end(function(err, res){
            if (err) console.log('发生错误：'+err);
            resolve(res.text);
        });
    })
}
// 返回10个获取页面数据函数
var func = pageURLs.map(function(pageURL, index){
    return function(callback) {    
        getData(pageURL).then((res) => {
            console.log('请求地址为:'+pageURL);
            callback(null, res);
        })
    }
});
// async的series按数组的顺序执行函数,j结果传入回调函数中(results为10个结果数组)
async.series(func,function(err, results){
    results.forEach(function(item, index) {
        var $ = cheerio.load(item);
        // 提取关键信息
        $('.article .item').each(function(i, ele){
            var image = $(this).find('.nbg img').attr('src');
            var title = $(this).find('.pl2 a').text().trim();
            var origin_title = $(this).find('.pl2 span').text().trim();
            var idx = $(this).find('.pl2 a').attr('href');
            var author = $(this).find('.pl').text().split('/')[0]; 
            // 数据存入数组保存
            books.push({
                image: getImage(image),
                title: getTitle(title),
                origin_title: origin_title,
                id: getId(idx),
                author: author,
            });
        });
    }); 
    // 将文件写入本地文件中
    fs.writeFile(__dirname + '/test.json', JSON.stringify({
        name: 'douban-book-top250',
        book: books
    }, null, 4), function(err){
        if (err) console.log('文件写入出错');
        else console.log('文件写出成功');
    });
});

    
   





