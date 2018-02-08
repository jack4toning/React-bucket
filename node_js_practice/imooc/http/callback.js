let learn = (something)=>{
    console.log(something);
};

let we = (callback,something)=>{
    something += ' is cool';
    callback(something);
};

we(learn,'Nodejs');

we((something)=>{
    console.log(something);
},'Moe');