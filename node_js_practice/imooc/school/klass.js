var student = require('./student');
var teacher = require('./teacher');


function add(teacherName,students){
    teacher.add(teacherName)

    students.forEach((item,index)=>{
        student.add(item);
    })
}


exports.add = add;


/*
//以下两句是等效的

如果想让你的模块成为一个特别的对象类型，就用module.exports = add;

如果你想让你的模块成为一个传统的模块实例，就用exports.add = add;

*/
