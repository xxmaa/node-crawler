# nodejs写的爬虫
用到了superagent，cheerio, async三个库来进行爬取
>1.superagent

是nodejs中一个非常好用的客户端请求代理模块。
[中文文档](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd)

>2.cheerio

简单说就是nodejs端的jquery，可以对页面上的各种元素操作，各种api和jquery的非常接近。
[中文文档](https://cnodejs.org/topic/5203a71844e76d216a727d2e)

>3.async

没有找到中文文档，附上官方英文原版api，
[官方API](http://caolan.github.io/async/docs.html#series)

# 数据保存

直接通过node的fs模块写入文件中
``` javascript
fs.writeFile(__dirname + '/test.json', JSON.stringify({
        name: 'douban-book-top250',
        book: books
    }, null, 4), function(err){
        if (err) console.log('文件写入出错');
        else console.log('文件写出成功');
    });
```
[数据具体查看](douban-book-250/test.json)

# 总结
另外一个[项目](https://github.com/xxmaa/easybook)需要用到豆瓣图书top250，然后我发现并没有api接口，只能自己通过爬虫爬取了，一直就有这个想法，这次付诸实践，收获很多，只有多实践才会遇到问题，解决问题后，会得到很多。

以后还会爬取更多自己想要的数据。