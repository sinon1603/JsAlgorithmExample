/**
 * 字符串全排列
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
    if (s.length === 1) {
        return Array.from(s)
    } else {
        let resArr = permutation(s.slice(1, s.length))
        let newResArr = new Set()
        resArr.forEach(str => {
            for (let i = 0; i <= str.length; i++) {
                let newStr = str.slice(0, i) + s[0] + str.slice(i, str.length)
                if (!newResArr.has(newStr)) {
                    newResArr.add(newStr)
                }
            }
        })
        return [...newResArr]
    }
};

//给定两个数组，求是否存在相等元素和，若存在多个求最小（0-1背包，动态规划）
var canPartition = function(nums,nums1) {
    const target = nums.reduce((total,num) => total+num)
    const target1 = nums1.reduce((total,num) => total+num)
    const dp =  new Array(target + 1, false);
    const dp1 = new Array(target1 + 1, false);
    dp[0] = true;
    dp1[0] = true;
    for (const num of nums) {
        for (let j = target; j >= num ; j--) {
            dp[j] = dp[j] | dp[j - num];
        }
    }
    for (const num1 of nums1) {
        for (let j = target1; j >= num1 ; j--) {
            dp1[j] = dp1[j] | dp1[j - num1];
        }
    }
    for(let i=1;i<=target && i<=target1;i++){
        if(dp[i] == dp1[i] && dp[i]) return i
    }
    return "no"
};
let arr1=[2,5,18,21]
let arr2=[6,14,19,8]
console.log(canPartition(arr1,arr2))

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