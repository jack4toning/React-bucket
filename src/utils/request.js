import {hashHistory} from 'react-router';

export default function request(method,url,body) {
    method = method.toUpperCase();
    if(method === 'GET'){
        //fetch��GET��������body������ֻ�ܷ���url�С�
        body = undefined;
    }else{
        body = body&&JSON.stringify(body);
    }

    return fetch(url,{
        method,
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Token':sessionStorage.getItem('access_token')||''//��sessionStorage�л�ȡaccess token
        },
        body
    })
}