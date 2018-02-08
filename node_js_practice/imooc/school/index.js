var klass = require('./klass');

exports.add = (klasses)=>{
    klasses.forEach((item,index)=>{
        var  _klass = item;
        var teacherName = item.teacherName;
        var students = item.students;
        klass.add(teacherName,students);
    });
};