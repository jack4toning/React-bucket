//<script src='a.js'></script>
//<script src='b.js'></script>
//<script src='c.js'></script>

//let i = 0;
//while(true){
//    i++
//}

let c = 0;

let printIt = (c)=>{
    console.log(c);
};

let plus = (callback)=>{
    setTimeout(()=>{
        c+=1;
        callback(c);
    },1000);
};

plus(printIt);
