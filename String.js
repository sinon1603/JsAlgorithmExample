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

//获取url参数
function geturlparam() {
    let that = this
    // window.location.href 获取地址
    let url = 'https://xxxx.com/xxx/demo?type=1&id=2#/main?d=4&e=5'
    let p = url.split('?') //没有【1】
    let obj = {};
    for(let i=1;i<p.length;i++){ //i=1
        let keyValue = p[i].split('&').map(item=>  item.split('#')[0]  );
        for (let i = 0; i < keyValue.length; i++) {
            let item = keyValue[i].split('=');
            let key = item[0];
            let value = item[1];
            obj[key] = value;
        }
    }
    console.log(obj);      //  {type:'1',id:'2'}
}
geturlparam()

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

//买卖股票最佳时机（给定初始资金1000）
var maxProfit = function(prices) {
    const len = prices.length;
    const dp = new Array(len).fill(0).map(v => new Array(2).fill(0));
    dp[0][0] = 1000
    dp[0][1] = 1000 % parseInt(prices[0])
    dp[0][2] = Math.floor(1000 / parseInt(prices[0]))
    for (let i = 1; i < len; ++i) {
        dp[i][0] = Math.max(dp[i - 1][0], (dp[i - 1][1] + parseInt(prices[i]) * dp[i-1][2]));
        if(dp[i - 1][1] < dp[i - 1][0] - parseInt(prices[i]) * dp[i-1][2]) {
            dp[i][1] = dp[i - 1][0] % parseInt(prices[i])
            dp[i][2] = Math.floor(dp[i - 1][0] / parseInt(prices[i]))
        }else{
            dp[i][1] = dp[i-1][1]
            dp[i][2] = dp[i-1][2]
        }
    }
    // console.log(dp)
    return dp[len - 1][0];
};
console.log(maxProfit([100,101,100,102,103]))






