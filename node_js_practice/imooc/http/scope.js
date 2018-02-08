let globalVariable = 'This is global variable';

let globalFunc = ()=>{
  let localVariable = 'This is local variable';
    console.log('Visit global/local variable');
    console.log(globalVariable);
    console.log(localVariable);

    globalVariable = 'This is changed variable';
    console.log(globalVariable);
    let localFunc = ()=>{
        let innerLocalVariable = 'This is inner local variable';
        console.log('Visit global/local/innerLocal variable');
        console.log(globalVariable);
        console.log(localVariable);
        console.log(innerLocalVariable);
    };
    localFunc();
};

globalFunc();