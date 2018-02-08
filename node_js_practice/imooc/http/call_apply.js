var pet = {
    words:'...',
    speak: function (say) {
        console.log(say+' '+this.words)
    }
};

//pet.speak('Speak');

var dog = {
    words:'Wang'
};

//通过call改变执行上下文为dog
pet.speak.call(dog,'Speak');

