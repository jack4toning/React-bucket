let EventEmitter = require('events').EventEmitter;
let life = new EventEmitter();
life.setMaxListeners(11);

function comforting(who){
    console.log('Please comfort '+who);
}

//on������addListener�����棬����������һ����
life.on('comfort',comforting);

life.on('comfort', function (who) {
    console.log('Please apple-polish '+who);
});

life.on('comfort', function (who) {
    console.log('Please beat '+who);
});

life.on('comfort', function (who) {
    console.log('Please kill '+who);
});

life.on('comfort', function (who) {
    console.log('Please kiss '+who);
});

life.on('comfort', function (who) {
    console.log('Please touch '+who);
});

life.on('comfort', function (who) {
    console.log('Please hug '+who);
});

life.on('comfort', function (who) {
    console.log('Please talk with '+who);
});

life.on('comfort', function (who) {
    console.log('Please play with '+who);
});

life.on('comfort', function (who) {
    console.log('Please cook for '+who);
});


life.on('buy', function (who) {
    console.log('buy cloth for '+who);
});

life.on('buy', function (who) {
    console.log('buy gift for '+who);
});


//life.removeEventListener('comfort',comforting);//�Ѿ��������ˣ������ˡ�

life.removeAllListeners();  //ȥ�����м����¼�
life.removeAllListeners('buy');  //ȥ��buy�¼��ļ���

console.log(life.listeners('comfort').length);
console.log(EventEmitter.listenerCount(life,'buy'));
console.log(life.listeners().length);

let hasComfortListened = life.emit('comfort','Moe');
let hasBuyListened = life.emit('buy','Bunny');
let hasPlayListened = life.emit('play','Bunny and Moe');



//life.emit('comfort','Moe');
//life.emit('buy','Bunny');



/*
console.log(hasComfortListened); //true
console.log(hasBuyListened); //true
console.log(hasPlayListened); //false*/
