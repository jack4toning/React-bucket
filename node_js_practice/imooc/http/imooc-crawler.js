const http = require('http');
const url = 'http://www.runoob.com';

http.get(url,(res)=>{
    let html = '';
    res.on('data',(data)=>{
        html +=data;
    });

    res.on('end',()=>{
        console.log(html)
    })
}).on('error',()=>{
    console.log('��ȡ�γ����ݳ���')
});