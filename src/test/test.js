let promise = new Promise(function (resolve,reject) {
    console.log('Promise');
    resolve();
});

promise.then(function () {
    console.log('resolved.');
});

console.log('Hi!');

//��������У�Promise �½�������ִ�У����������������Promise��Ȼ��then����ָ���Ļص����������ڵ�ǰ�ű�����ͬ������ִ����Ż�ִ�У�����resolved��������

//�������첽����ͼƬ�����ӡ�