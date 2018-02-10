let http = require('http');
let queryString = require('querystring');

let postData = queryString.stringify({
    content:'讲的很好，不过组件的思想还真的需要多多学习呢',
    mid:16514
});

let options = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
         'Accept':'application/json, text/javascript, */*; q=0.01',
         'Accept-Encoding':'gzip, deflate',
         'Accept-Language':'zh-CN,zh;q=0.8',
         'Connection':'keep-alive',
         'Content-Length':postData.length,
         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
         'Cookie':'imooc_uuid=31d2b703-6d86-42af-8ad0-5b87c674f8de; imooc_isnew_ct=1512211682; loginstate=1; apsid=Y0MjQ5NTUxMzg4YTllZWI4ZmUwYjZiOTk4YzRiNmMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjM0ODMzNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NDIwMDgzNzVAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGQ1OTYwZTlmNjMwODliZTRjNWI5YzJiNWUyYTc5OGRkadhiWmnYYlo%3DMD; PHPSESSID=23nua12ourmq25bvdvgaa33dl2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1516427352,1518183029,1518252914,1518265701; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1518268556; imooc_isnew=2; cvde=5a7ee564a1276-25',
         'Host':'www.imooc.com',
         'Origin':'https://www.imooc.com',
         'Referer':'https://www.imooc.com/video/16514',
         'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0',
         'X-Requested-With':'XMLHttpRequest'
    }
};
let req = http.request(options, function (res) {
    console.log('Status: '+res.statusCode);
    console.log('Headers: '+JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });
    res.on('end', function () {
        console.log('评论完毕!')
    });
});

req.on('error',function(e){
    console.log('Error: '+e.message)
});
req.write(postData);

req.end();