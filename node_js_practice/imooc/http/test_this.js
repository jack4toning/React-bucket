window.val = 1;
var obj = {
    val: 2,
    dbl: function () {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    }
};
// ˵�������������
obj.dbl();
var func = obj.dbl;
func();