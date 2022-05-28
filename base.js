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

//链式计算+闭包
const pipe=function(){
    return (x)=>{
        for(let i=0;i<arguments.length;i++){
            x=arguments[i](x)
        }
        return x
    }
}
const add=x=>x+2
const mul=x=>x*3
const del=x=>x-1
const chain=pipe(add,mul,del)
console.log(chain(1))

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

//迭代方法扁平化2
function flatten2(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
        // 从栈里取出
        const next = stack.pop();
        if (Array.isArray(next)) {
            // 把next扁平化，然后放入stack中
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    // reverse to restore input order
    return res.reverse();
}
console.log(flatten2(arr))

//利用Generator数组扁平化
function* flatten3(arr) {
    let length = arr.length;
    for (let i=0; i<length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
            yield* flatten3(item);
        } else {
            yield item;
        }
    }
}

let res = [];
for (let f of flatten3 (arr)) {
    res.push(f);
}
console.log(res)

/**
 * --- 问题描述 ---
 * 给出一组异步任务方法，和允许同时执行的个数，实现一个方法，用于并发执行异步任务
 * --- 说明 ---
 * - 当有任务执行完毕后，自动补充任务，始终保持正在执行的任务有 `concurrency` 个
 * - 返回 { resolved: [], rejected: [] }
 *
 */
function parallel(tasks, concurrency) {
    const resolved = [];
    const rejected = [];
    let index = 0;
    let finished = 0;

    async function runner(resolve) {
        if (index < tasks.length) {
            let fn = tasks[index];
            let i = index++;

            try {
                const result = await fn();
                resolved.push({ status: 'fulfiled', index: i, result });
            } catch (reason) {
                rejected.push({ status: 'rejected', index: i, reason });
            }

            finished++;
            runner(resolve);
        }

        if (finished === tasks.length) {
            resolve({
                resolved: resolved.sort((a, b) => a.index - b.index),
                rejected: rejected.sort((a, b) => a.index - b.index)
            });
        }
    }

    return new Promise(resolve => {
        while (concurrency-- > 0) {
            runner(resolve);
        }
    });
}
//
// //图片懒加载
// var imgs = document.querySelectorAll('img');
//
// //offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
// //offsetParent就是距离该子元素最近的进行过定位的父元素,如果其父元素中不存在定位则offsetParent为：body元素
// function getTop(e) {
//     var T = e.offsetTop;
//     while(e = e.offsetParent) {
//         T += e.offsetTop;
//     }
//     return T;
// }
//
// function lazyLoad(imgs) {
//     var H = document.documentElement.clientHeight;//获取可视区域高度
//     var S = document.documentElement.scrollTop || document.body.scrollTop;
//     for (var i = 0; i < imgs.length; i++) {
//         if (H + S > getTop(imgs[i])) {
//             imgs[i].src = imgs[i].getAttribute('data-src');
//         }
//     }
// }
//
// window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
//     lazyLoad(imgs);
// }

//找出数组中求和等于目标数的组合
function findArray( arr ,  num ) {
    // write code here
    let map=new Map()
    map.set(0,[])
    for(const val of arr){
        const tmp=[]
        for(const item of map.entries()) {
            tmp.push(item)
        }
        for(const [key,value] of tmp){
            if(!map.has(key+val) || (map.has(key+val) && map.get(key+val).length > value.length+1)){
                map.set(key+val,value.concat([val]))
            }
        }
    }
    return map.get(num)?map.get(num):[]
}
console.log(findArray([1,-7,6,-2,-1],-2))












