const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {

    return this.treeRoot;
  }

  add(data) {

    let newNode = new Node(data);
    if (this.root() == null){
      this.treeRoot = newNode;
    }
    else{
      let node = this.root();
      while (node!==null){
        if (node.data > data){
          if (node.left == null) { 
            node.left = newNode; 
            return newNode;
          };
          node = node.left;
        } else {
          if (node.right == null) {
            node.right = newNode;
            return newNode;
          };
          node = node.right
        };
      }
    }
  }

  has(data) {
    let node = this.root();
     while (node!==null){
       if (node.data == data) return true;
       if(node.data > data){
         node = node.left; 
       } else node = node.right;
     }
     return false;
  }

  find(data) {

     let node = this.root();
     while (node !== null) {
       if (node.data == data) return node;
       if (node.data > data) {
         node = node.left;
       } else node = node.right;
     }
     return null;
  }

  remove(data) {

    // if tree is empty
    if (this.root() === null) return null;
    // init values to search from root;
    let currentNode = this.root();
    let parentNode = this.root();
    let direction;
    //find null (element doesn't exit) or parent and Node with data;
    while ( currentNode.data !== null && currentNode.data !== data){
      parentNode = currentNode;
      if( currentNode.data > data ){
        currentNode = currentNode.left;
        direction = "left";
      }
      else{
        currentNode = currentNode.right;
        direction="right";
      }
    };
    // exit when data didn't match tree
    if (currentNode === null) return null;
    //replace node by branch if it doesn't have right or left child
    if( currentNode.right === null) {
      if (parentNode===currentNode) {
        this.treeRoot = currentNode.left;
        }
      else{
        parentNode[direction] = currentNode.left;
      }
    }
    else if (currentNode.left === null) 
    {
      if (parentNode === currentNode) {
        this.treeRoot = currentNode.right;
      } else {
        parentNode[direction] = currentNode.right;
      }
    }
    // find leftest value in right subtree to replace deleting value;
    else{
      let forReplaceNode = currentNode.right;
      let forReplaceNodeParent = currentNode.right;
      while (forReplaceNode.left!==null){
        if (forReplaceNode.left.left!==null) forReplaceNodeParent = forReplaceNodeParent.left;
        forReplaceNode = forReplaceNode.left;

      };
      forReplaceNodeParent.left = forReplaceNode.right;
      forReplaceNode.left = currentNode.left;
      forReplaceNode.right = currentNode.right;
      if (parentNode.left === currentNode ){
        parentNode.left = forReplaceNode;
      }
      else{
        parentNode.right = forReplaceNode;
      }
      if (this.root() === currentNode) this.treeRoot = forReplaceNode;


    }


  }

  min() {

    let node = this.root();
    if ( node === null ) return null;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {

    let node = this.root();
    if (node === null) return null;
    while (node.right!==null){
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};