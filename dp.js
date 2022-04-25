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