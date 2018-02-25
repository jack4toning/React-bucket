import {hashHistory} from 'react-router';

export default function request(method,url,body) {
    method = method.toUpperCase();
    if(method === 'GET'){
        //fetch的GET不允许有body，参数只能放在url中。
        body = undefined;
    }else{
        body = body&&JSON.stringify(body);
    }

    return fetch(url,{
        method,
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Token':sessionStorage.getItem('access_token')||''//从sessionStorage中获取access token
        },
        body
    })
}