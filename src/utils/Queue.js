class Queue {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(value) {
    this.storage[this.tail] = value;
    this.tail++;
    return this.size();
  }

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

  dequeueAll() {
    const ids = [];
    while (this.tail > this.head) {
      ids.push(this.dequeue());
    }
    return ids;
  }

  size() {
    return this.tail - this.head;
  }
}

export default Queue;
