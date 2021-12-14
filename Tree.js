/**树状数组/二叉索引树**/
//可以解决大部分基于区间上的更新以及求和问题。
//tree[i] = A[i - 2^k+1] + A[i - 2^k+2] + ... + A[i]
//A[i] 包含于 tree[i + 2^k1]、tree[(i + 2^k1) + 2^k2]...
//SUMi = tree[i] + tree[i-2^k1] + tree[(i - 2^k1) - 2^k2] + ...
class BIT {
    constructor(length) {
        this.n = length;
        this.tree = new Array(length + 1).fill(0);
    }
    //求x中2的最大次方因子，即x的二进制从右边数起第k位开始不为0（2^k）
    lowbit(x) {
        return x & (-x);
    }

    save(i, val) { // 单点更新
        for ( i++; i <= this.n; i += this.lowbit(i))
            this.tree[i] += val;
    }

    query(i) { // 区间求和
        let res = 0;
        for ( i++; i > 0; i -= this.lowbit(i))
            res += this.tree[i];
        return res;
    }
}

/**二叉搜索树**/
const INSERT_RECURSIVE = Symbol('BST#recursiveInsert')
const REMOVE_NODE_RECURSIVE = Symbol('BST#recursiveRemove')
const SEARCH_RECURSIVE = Symbol('BST#recursiveSearch')
const PRE_ORDER_TRAVERSE_RECURSIVE = Symbol('BST#recursiveTraverse')
const DESTROY_RECURSIVE = Symbol('BST#recursiveDestroy')
class BST {
    constructor() {
        this.root = null; // 初始化根节点
        this.count = 0; // 记录二叉搜索的节点数量
        /**
         * 实例化一个 node 节点，在 insert 方法中你会看到
         */
        this.Node = function (value) {
            return {
                value, // 节点值
                count: 1, // 节点数量，允许节点重复
                left: null, // 左侧子节点
                right: null, // 右侧子节点
            }
        }
    }

    /**
     * 二叉搜索树插入元素
     * @param { Number } value
     */
    insert(value) {
        this.root = this[INSERT_RECURSIVE](this.root, value);
    }
    /**
     * 递归插入
     * 插入过程和链表类似，建议先学习链表会更容易理解
     * @param { Object } node
     * @param { Number } value
     */
    [INSERT_RECURSIVE](node, value) {
        // {1} 如果当前节点为空，创建一个新节点（递归到底）
        if (node === null) {
            this.count++; // 节点数加 1
            return new this.Node(value);
        }
        // {2} 节点数不变，说明要更新的值等于二叉树中的某个节点值
        if (value === node.value) {
            node.count++; // 节点数加 1
        } else if (value < node.value) { // {3} 新插入子节点在二叉树左边，继续递归插入
            node.left = this[INSERT_RECURSIVE](node.left, value);
        } else if (value > node.value) { // {4} 新插入子节点在二叉树右边，继续递归插入
            node.right = this[INSERT_RECURSIVE](node.right, value);
        }
        return node
    }

    /**
     * 二叉树中搜索节点
     * @param { Number } value
     * @return { Boolean } [true|false]
     */
    search(value) {
        return this[SEARCH_RECURSIVE](this.root, value);
    }
    /**
     * 递归搜索
     * @param { Object } node
     * @param { Number } value
     */
    [SEARCH_RECURSIVE](node, value) {
        if (node === null) { // {1} 节点为 null
            return false;
        } else if (value === node.value) { // {2} 找到节点
            return true;
        } else if (value < node.value) { // {3} 从左侧节点搜索
            return this[SEARCH_RECURSIVE](node.left, value);
        } else { // {4} 从右侧节点搜索
            return this[SEARCH_RECURSIVE](node.right, value);
        }
    }

    /**
     * 先序遍历（前序遍历）
     * @param { Function } cb
     */
    preOrderTraverse(cb) {
        return this[PRE_ORDER_TRAVERSE_RECURSIVE](this.root, cb);
    }
    /**
     * 先序遍历递归调用
     * @param { Object } node
     * @param { Function } cb
     */
    [PRE_ORDER_TRAVERSE_RECURSIVE](node, cb) {
        if (node !== null) {
            cb(node.value); // {1} 先访问节点本身（从树的顶端开始）
            this[PRE_ORDER_TRAVERSE_RECURSIVE](node.left, cb); // {2} 访问左侧节点
            this[PRE_ORDER_TRAVERSE_RECURSIVE](node.right, cb); // {3} 访问右侧节点
        }
    }
    /**打印数组**/
    print(){
        var arr=[]
        var cb=function (num){
            arr.push(num)
        }
        this.preOrderTraverse(cb)
        console.log(arr)
    }

    /**
     * 二叉树销毁，利用后续遍历特性实现
     */
    destroy(){
        this.root = this[DESTROY_RECURSIVE](this.root);
    }
    /**
     * 销毁二叉搜索树递归调用
     * @param { Object } node
     */
    [DESTROY_RECURSIVE](node) {
        if (node !== null) {
            this[DESTROY_RECURSIVE](node.left);
            this[DESTROY_RECURSIVE](node.right);

            node = null;
            this.count--;
            return node;
        }
    }

    /**
     * 求二叉树中最小节点值
     * @return value
     */
    minNodeValue() {
        const result = this.minNode(this.root);
        return result !== null ? result.value : null;
    }
    /**
     * 求最小节点
     */
    minNode(node) {
        if (node === null) {
            return node;
        }
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }
    /**
     * 求二叉树中最大节点值
     */
    maxNodeValue() {
        let node = this.root;
        if (node === null) {
            return node;
        }
        while(node && node.right !== null) {
            node = node.right;
        }
        return node.value;
    }

    /**
     * 删除节点
     * 若删除节点为 n，找到删除节点的后继 s = min(n->right)
     */
    removeNode(value) {
        this.root = this[REMOVE_NODE_RECURSIVE](this.root, value);
    }
    /**
     * 删除一个节点递归调用
     * @param { Object } node
     * @param { Number } value
     */
    [REMOVE_NODE_RECURSIVE](node, value) {
        // {1} 未查找到直接返回 null
        if (node === null) {
            return node;
        }

        // {2} 左侧节点递归删除
        if (value < node.value) {
            node.left = this[REMOVE_NODE_RECURSIVE](node.left, value);
            return node;
        }

        // {3} 右侧节点递归删除
        if (value > node.value) {
            node.right = this[REMOVE_NODE_RECURSIVE](node.right, value);
            return node;
        }

        // {4} value === node.value 节点找到

        // {4.1} 当前节点即无左侧节点又无右侧节点，直接删除，返回 null
        if (node.left === null && node.right === null) {
            node = null;
            this.count--;
            return node;
        }

        // {4.2} 若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
        if (node.left === null) {
            node = node.right;
            this.count--;
            return node;
        }

        // {4.3} 若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
        if (node.right === null) {
            node = node.left;
            this.count--;
            return node;
        }

        // {4.4} 若左侧节点、右侧节点都不为空情况
        // s = min(n->right)
        if (node.left !== null && node.right !== null) {
            // 找到最小节点，切断对象引用，复制一个新对象 s
            const s = new this.Node(this.minNode(node.right).value);
            this.count++;
            s.left = node.left;
            s.right = this[REMOVE_NODE_RECURSIVE](node.right, s.value); // 删除最小节点
            node = null;
            this.count--;
            return s; // 返回 s 节点替换掉 node 节点
        }
    }
}

const bST = new BST();

bST.insert(30);
bST.insert(25);
bST.insert(36);
bST.insert(20);
bST.insert(28);
bST.insert(32);
bST.insert(40);

bST.removeNode(25)
console.log(bST.root)
