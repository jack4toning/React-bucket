const http = require('https');
const url = 'https://www.imooc.com/learn/944';



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