const http = require('http');
var fs = require('fs');
var request = require('request');

http
    .createServer(function (req,res) {
/*
            //��ͨ��ʽ
            fs.readFile('../Buffer/girl.png', function (err,data) {
            if(err){
                res.end('file not exist!');
            }else{
                res.writeHeader(200,{'Context-Type':'text/html'});
                res.end(data);
            }
        });
*/

/*        //readStream��ʽ
        fs.createReadStream('../Buffer/girl.png').pipe(res);
*/
        request('https://www.imooc.com/static/img/index/logo_new.png')
        .pipe(res);

    })
    .listen(8090,()=>{
        console.log(`Server running`);
    });

