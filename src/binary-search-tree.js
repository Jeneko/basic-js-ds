const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(node) {
    this._root = node ? node : null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (this._root === null) {
      this._root = new Node(data);
      return;
    }

    let curNode = this._root;

    while ((data < curNode.data && curNode.left !== null) || (data >= curNode.data && curNode.right !== null)) {
      curNode = (data < curNode.data) ? curNode.left : curNode.right;
    }

    if (data < curNode.data) {
      curNode.left = new Node(data);
      return;
    }

    curNode.right = new Node(data);
    return;
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data, curNode = this._root) {
    if (curNode === null) return null;

    if (curNode.data === data) return curNode;

    if (curNode.data > data) {
      return this.find(data, curNode.left);
    }

    if (curNode.data < data) {
      return this.find(data, curNode.right);
    }
  }

  remove(data) {
    let parentNode = this._root;
    let curNode = this._root;

    if (curNode === null) {
      throw new ReferenceError('Can\'t remove node. Tree is empty.');
    }

    // FINDING NODE TO REMOVE AND IT'S PARENT NODE
    while(curNode.data !== data) {

      // IF NODE TO REMOVE WASN'T FOUND
      if (curNode.left === null && curNode.right === null) {
        throw new ReferenceError('Can\'t remove node. Node is not found.');
      }

      parentNode = curNode;
      curNode = curNode.data > data ? curNode.left : curNode.right;
    }

    const positionInParent = parentNode.left === curNode ? 'left' : 'right';

    // IF REMOVING NODE HAS NO SUBTREE
    if (curNode.left === null && curNode.right === null) {
      parentNode[positionInParent] = null;
      return;
    }

    // IF REMOVING NODE HAS ONLY RIGHT SUBTREE
    if (curNode.left === null && curNode.right !== null) {
      parentNode[positionInParent] = curNode.right;
      return;
    }

    // IF REMOVING NODE HAS ONLY LEFT SUBTREE
    if (curNode.left !== null && curNode.right === null) {
      parentNode[positionInParent] = curNode.left;
      return;
    }

    // IF REMOVING NODE HAS BOTH SUBTREE
    if (curNode.left !== null && curNode.right !== null) {
      // FIND MINIMAL VALUE IN RIGHT SUBTREE
      const replacement = this.min(curNode.right);
      // REMOVE NODE WITH THIS VALUE FROM TREE
      this.remove(replacement);
      // REPLACE DATA IN REMOVING NODE WITH THIS VALUE
      curNode.data = replacement;
      return;
    }
  }

  min(curNode = this._root) {
    if (!curNode) return null;

    while (curNode.left) {
      curNode = curNode.left;
    }
    
    return curNode.data;
  }

  max(curNode = this._root) {
    if (!curNode) return null;

    while (curNode.right) {
      curNode = curNode.right;
    }
    
    return curNode.data;
  }
}

module.exports = {
  BinarySearchTree
};