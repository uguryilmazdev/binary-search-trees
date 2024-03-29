import Node from './node';

export default class Tree {
  constructor(array) {
    // we must remove duplicates and sort array for creating sorted binary search tree
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    // build sorted binary search tree
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    // base case
    if (array.length === 0) return null;

    // get the middle element of the array and make it root
    let middle = Math.floor(array.length / 2);
    const root = new Node(array[middle]);

    // recursively build left and right subtrees
    root.left = this.buildTree(array.slice(0, middle));
    root.right = this.buildTree(array.slice(middle + 1));

    return root;
  }

  search(root, key) {
    // base cases: root is null or key is present at root
    if (root === null) return 'Key is not available';
    if (root.data === key) return `${root.data} is available`;

    // key is greater than root's key
    if (root.data < key) {
      return this.search(root.right, key);
    }
    // key is smaller than root's key
    else {
      return this.search(root.left, key);
    }
  }

  insert(root, key) {
    // base case: if the tree is empty, return a new node (insert new node to leaf)
    if (root === null) {
      root = new Node(key);
      return root;
    }

    // otherwise, recur down the tree
    if (key < root.data) {
      root.left = this.insert(root.left, key);
    } else if (key > root.data) {
      root.right = this.insert(root.right, key);
    }

    return root;
  }

  deleteNode(root, key) {
    // base case: if the tree is empty
    if (root === null) return 'Tree is empty';

    // otherwise, recursively down the tree
    if (key < root.data) {
      root.left = this.deleteNode(root.left, key);
      return root;
    } else if (key > root.data) {
      root.right = this.deleteNode(root.right, key);
      return root;

      // this is the node to be deleted
    } else {
      // node with only one child or no child
      if (root.right === null && root.left === null) return null;
      else if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      else {
        // node with two children: Get the inorder
        // successor (smallest in the right subtree)
        root.data = this.minValue(root.right);

        // Delete the inorder successor
        root.right = this.deleteNode(root.right, root.data);
      }
    }
    return root;
  }

  minValue(root) {
    let minv = root.data;

    // recur down to end of left edge
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  }

  printLevelOrder() {
    // queue method
    let queue = [];
    queue.push(this.root);

    while (queue.length != 0) {
      let tempNode = queue.shift();
      console.log(tempNode);

      // enqueue left child
      if (tempNode.left != null) {
        queue.push(tempNode.left);
      }

      // enqueue right child
      if (tempNode.right != null) {
        queue.push(tempNode.right);
      }
    }
  }

  printInorder(root) {
    if (root === null) return;

    // first recur on left child
    this.printInorder(root.left);

    // print the data of node
    console.log(root.data);

    // now recur on right child
    this.printInorder(root.right);
  }

  printPreorder(root) {
    if (root) {
      // first, print the data
      console.log(root.data);

      // then recur on left side
      this.printPreorder(root.left);

      // finally recur on right side
      this.printPreorder(root.right);
    }
  }

  printPostorder(root) {
    if (root === null) return;

    // first recur on left side
    this.printPostorder(root.left);

    // then recur on right side
    this.printPostorder(root.right);

    // finallyi write the node
    console.log(root.data);
  }

  // Height is defined as the number of edges in longest path from a given node to a leaf node
  height(root) {
    if (!root) return 0;
    return 1 + Math.max(this.height(root.left), this.height(root.right));
  }

  isBalanced(root) {
    // base condition
    if (!root) return true;

    // for left and right subtree height
    let lh = this.height(root.left);
    let rh = this.height(root.right);

    // allowed values 1, -1, 0
    if (
      Math.abs(lh - rh) <= 1 &&
      this.isBalanced(root.right) === true &&
      this.isBalanced(root.left) === true
    )
      return true;

    // tree is not height-balanced tree
    return false;
  }

  rebalance(root) {
    // first, traverse the tree in-order and stroe the values in an array
    const values = [];
    function inorderTraverse(root) {
      if (root === null) return;
      inorderTraverse(root.left);
      values.push(root.data);
      inorderTraverse(root.right);
    }

    inorderTraverse(root);

    // then, build a new balanced tree from the sorted array of values
    return this.buildTree(values);
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
