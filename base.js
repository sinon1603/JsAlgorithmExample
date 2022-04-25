//防抖
let timer;
function shake(param) {
    console.log(timer, "111")
    if (timer) {
        console.log(timer, "222")
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        console.log('防抖')
    }, 1000)
}

//节流：在n秒时间内，不停的被触发，只执行第一次
function throttle(param) {
    if (timer) return
    timer = setTimeout(() => {
        console.log('节流')
        timer = null;
    }, 1000)
}

//链式调用，模拟sql语句的where和orderBy
class find{
    constructor(data){
        this.data= data
    }
}
find.prototype.where=function (rules){
    this.data=this.data.filter(item => item.name.match(rules.name))
    return this
}
find.prototype.orderBy=function (key,order){
    const flag= order == 'desc'? -1: 1
    if(key == 'name') this.data.sort((a,b)=> {return a.name> b.name? flag: -flag})
    if(key == 'price') this.data.sort((a,b)=> (a.price- b.price)* flag)
    return this
}
find.prototype.print=function (){
    console.log(this.data)
}

let data=[{'price':10,'name':"A_qwe"},{'price':8,'name':"B_qwe"},{'price':15,'name':"A_awe"},{'price':89,'name':"C_qwe"},{'price':50,'name':"A_qpe"}]
let obj=new find(data).where({'name':/^A/}).orderBy('price','desc').where({'name':/we$/})
obj.print()

//万能的类型检测方法
const checkType = (arr) => {
    return Object.prototype.toString.call(arr).slice(8, -1);
}
//自定义flat方法，注意：不可以使用箭头函数，使用后内部的this会指向window
Array.prototype.myFlat = function (num) {
    //判断第一层数组的类型
    let type = checkType(this);
    //创建一个新数组，用于保存拆分后的数组
    let result = [];
    //若当前对象非数组则返回undefined
    if (!Object.is(type, "Array")) {
        return;
    }
    //遍历所有子元素并判断类型，若为数组则继续递归，若不为数组则直接加入新数组
    this.forEach((item) => {
        let cellType = checkType(item);
        if (Object.is(cellType, "Array")) {
            //形参num，表示当前需要拆分多少层数组，传入Infinity则将多维直接降为一维
            num--;
            if (num < 0) {
                let newArr = result.push(item);
                return newArr;
            }
            //使用三点运算符解构，递归函数返回的数组，并加入新数组
            result.push(...item.myFlat(num));
        } else {
            result.push(item);
        }
    })
    return result;
}
let arr = [1, [2, 3, [4, 5, [12, 3, "zs"], 7, [8, 9, [10, 11, [1, 2, [3, 4]]]]]]];
console.log(arr.myFlat(Infinity));