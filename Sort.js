/**快速排序**/
var quickSort=function(array) {
    var i = 0
    var j = array.length - 1
    var Sort = function(i, j){
// 结束条件
    if(i == j){ return }
    var key = array[i]
    var tempi = i
// 记录开始位置
    var tempj = j
// 记录结束位置
    while(j > i){
// j <<-------------- 向前查找
        if(array[j] >= key){ j-- }
        else{
            array[i] = array[j]
            //i++ ------------>>向后查找
            while(j > ++i){ if(array[i] > key){
                array[j] = array[i]
                break
            }
            }
        }
    } // 如果第一个取出的 key 是最小的数
    if(tempi == i){
        Sort(++i, tempj)
        return
    }
// 最后一个空位留给key
    array[i] = key
// 递归
    Sort(tempi, i)
    Sort(j, tempj)
    }
    Sort(i, j)
    return array
}

/**归并排序**/
function mergeSort(array) {
    if(array.length == 1) return array;
    /* 首先将无序数组划分为两个数组 */
    var mid = Math.floor(array.length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid);
    /* 递归分别对左右两部分数组进行排序合并 */
    return merge(mergeSort(left), mergeSort(right));
}
/* 排序并合并*/
function merge(left, right) {
    var re = [];
    while(left.length > 0 && right.length > 0) {
        if(left[0] < right[0]) {
            re.push(left.shift());
        } else {
            re.push(right.shift());
        }
    }
    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
    return re.concat(left).concat(right);
}

/**希尔排序**/
var shellSort=function(array){
    var tempArr = [1750, 701, 301, 132, 57, 23, 10, 4, 1];
//较小数组的步长选择
//var tempArr = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 836, 182, 34, 9, 1]
//针对大数组的步长选择
    var i = 0
    var tempArrLength = tempArr.length
    var len = array.length
    var len2 = Math.floor(len/2)
    for(;i < tempArrLength; i++){
        if(tempArr[i] > len2){ continue }
        tempSort(tempArr[i])
    }
// 排序一个步长
    function tempSort(temp){
        var i = 0, j = 0, f, tem, key;
        var tempLen = len%temp > 0 ? parseInt(len/temp) + 1 : len/temp;
        for(;i < temp; i++){
// 依次循环列
            for(j=1;/*j < tempLen && */temp * j + i < len; j++){
//依次循环每列的每行进行插入排序
                tem = f = temp * j + i; key = array[f];
                while((tem-=temp) >= 0){
// 依次向上查找
                    if(array[tem] > key){
                        array[tem+temp] = array[tem];
                    }else{ break;
                    }
                } array[tem + temp ] = key;
            }
        }
    }
    return array
}

/**插入排序**/
var insertSort=function(array){
    var i = 1, j, temp, key, len = array.length;
    for(; i < len; i++){
        temp = j = i; key = array[j]; while(--j > -1){
            if(array[j] > key){ array[j+1] = array[j]; }else{ break;
            }
        }
        array[j+1] = key;
    } return array;
}

/**构造最大堆**/
class MaxHeap {
    constructor(array=[]) {
        this.A = array
    }
    size() {
        return this.A.length
    }
    left(i) {
        return 2 * i + 1
    }
    right(i) {
        return 2 * i + 2
    }
    parent(i) {
        return i > 0 ? (i - 1) >>> 1 : -1
    }
    isEmpty() {
        return this.size() === 0;
    }
    heapifyDown(i,size = this.size()) {
        let p = i
        const l = this.left(i), r = this.right(i)
        if (l < size && this.compare(l, p)) p = l
        if (r < size && this.compare(r, p)) p = r
        if (p !== i) {
            this.exchange(i, p)
            this.heapifyDown(p,size)
        }
    }
    heapifyUp(i) {
        const p = this.parent(i)
        if (p >= 0 && this.compare(i, p)) {
            this.exchange(i, p)
            this.heapifyUp(p)
        }
    }
    exchange(x, y) {
        const temp = this.A[x]
        this.A[x] = this.A[y]
        this.A[y] = temp
    }
    compare(a,b) {
        if(this.A[a]-this.A[b]>0) return true
        else return false
    }
}
/**堆排序**/
/**@param {MaxHeap} A**/
function heapSort(A) {
    // 初始化大顶堆，从第一个非叶子结点开始
    for(let i = Math.floor(A.size()/2-1); i>=0; i--) {
        A.heapifyDown(i)
    }
    // 排序，每一次for循环找出一个当前最大值，数组长度减一
    for(let i = A.size()-1; i>0; i--) {
        A.exchange(0, i); // 根节点与最后一个节点交换
        A.heapifyDown(0,i);
        // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
    }
}
/**优先队列**/
class priority_queue extends MaxHeap {
    //node[0]权值，node[1]下标
    enqueue(node) {
        this.A.push(node)
        this.heapifyUp(this.size() - 1)
    }
    dequeue() {
        const first = this.A[0]
        const last = this.A.pop()
        if (first !== last) {
            this.A[0] = last
            this.heapifyDown(0)
        }
        return first
    }
    // compare(x, y) {
    //     // 如果权重相等，比较数组下标
    //     if (this.A[x][0] === this.A[y][0]) {
    //         return this.A[x][1] < this.A[y][1]
    //     }
    //     return this.A[x][0] < this.A[y][0]
    // }
}

var arr=new priority_queue()
arr.enqueue(60)
arr.enqueue(70)
arr.enqueue(80)
arr.enqueue(90)
arr.enqueue(100)
arr.enqueue(85)
console.log(arr)

// var data=[{
//     key:'name',
//     value:'a'
// },{
//     key:'age',
//     value:'11'
// },{
//     key:'sex',
//     value:'female'
// }]
// arr=[1,2,3,2]
// console.log(Array.from(new Set(arr)))
// console.log(data.reduce((obj,{key,value})=>({...obj,[key]:value}),{}))