import {createStore} from 'redux'
const store = createStore(counter);

//声明Reducer
function counter(state=0,action) {
    switch(action.type){
        case 'INCREASE' : return state+1;
        case 'DECREASE' : return state-1;
        default : return state;
    }
}

//监听Store的更新
store.subscribe(()=>{
    setCount(store.getState());
});

function setCount(count) {
    document.getElementById('value').innerHTML = count;
}


//使用store.dispatch来触发传入的action
document.getElementById('btn_increase').addEventListener('click',function () {
   store.dispatch({type:'INCREASE'});
});

document.getElementById('btn_decrease').addEventListener('click',function () {
    store.dispatch({type:'DECREASE'});
});