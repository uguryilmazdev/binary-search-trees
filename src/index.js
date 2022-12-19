import Node from './node';
import Tree from './binaryTree';

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree);
console.log(tree.search(tree.root, 67));
console.log('This is the initial tree');
tree.prettyPrint(tree.root);

console.log('Insert 50');
tree.insert(tree.root, 50);
tree.prettyPrint(tree.root);
console.log('Insert 30');
tree.insert(tree.root, 30);
tree.prettyPrint(tree.root);
console.log('Insert 40');
tree.insert(tree.root, 40);
tree.prettyPrint(tree.root);
console.log('Insert 35');
tree.insert(tree.root, 35);
tree.prettyPrint(tree.root);
console.log('Delete 4');
tree.deleteNode(tree.root, 4);
tree.prettyPrint(tree.root);
console.log('Delete 23');
tree.deleteNode(tree.root, 23);
tree.prettyPrint(tree.root);
console.log(tree.search(tree.root, 40));
console.log(tree.search(tree.root, 23));
console.log(tree.search(tree.root, 100));
//tree.printInorder(tree.root);
//tree.printPreorder(tree.root);
tree.printPostorder(tree.root);
const height = tree.height(tree.root);
console.log(`Height is ${height}`);
const balance = tree.isBalanced(tree.root);
console.log(balance);
tree.root = tree.rebalance(tree.root);
console.log(tree);
tree.prettyPrint(tree.root);
