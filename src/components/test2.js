fetch('../../db.json',{
    headers:new Headers({
    })
})
    .then((res)=>{
        return res.json();  //res.json()���ص���һ��resolved with json��response body�����������ɵ�json����promise
    })
    .then((res)=>{
       console.log(res);
    });

//fetch ���ص���һ��resolved with response���������õ�����Ӧ����promise