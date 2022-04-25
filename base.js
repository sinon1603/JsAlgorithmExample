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

//节流：在n秒时间内，不停的被触发，只执行
// 第一次
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