/**
 * Defines a Queue
 */
class Queue {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  /**
   * Enqueues a value
   *
   * @param value The value to enqueue
   */
  enqueue(value) {
    this.storage[this.tail] = value;
    this.tail++;
    return this.size();
  }

  /**
   * Dequeues a next value
   */
  dequeue() {
    if (this.tail > this.head) {
      const value = this.storage[this.head];
      delete this.storage[this.head];
      this.head++;
      return value;
    } else {
      return null;
    }
  }

  /**
   * Dequeues all values
   */
  dequeueAll() {
    const ids = [];
    while (this.tail > this.head) {
      ids.push(this.dequeue());
    }
    return ids;
  }

  /**
   * Gets current size of queue
   */
  size() {
    return this.tail - this.head;
  }
}

export default Queue;
