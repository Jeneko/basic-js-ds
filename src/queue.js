const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  constructor(value) {
    this._head = value ? new ListNode(value) : null;
    this._tail = this._head;
  }

  getUnderlyingList() {
    return this._head;
  }

  enqueue(value) {
    let newNode = new ListNode(value);
    
    if (this._head === null) {
      this._head = newNode;
      this._tail = this._head;
      return;
    }

    this._tail.next = newNode;
    this._tail = newNode;
  }

  dequeue() {
    let firstNode = this._head;

    this._head = this._head.next;

    return firstNode.value;
  }
}

module.exports = {
  Queue
};
