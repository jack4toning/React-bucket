fetch('../../db.json',{
    headers:new Headers({
    })
})
    .then((res)=>{
        return res.json();  //res.json()返回的是一个resolved with json（response body正文所解析成的json）的promise
    })
    .then((res)=>{
       console.log(res);
    });

//fetch 返回的是一个resolved with response（请求所得到的响应）的promise