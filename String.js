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