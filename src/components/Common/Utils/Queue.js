export default class Queue {
  timmer = null;
  pending = [];

  constructor(flushAction, maxPedding = 50) {
    this.flushAction = flushAction;
    this.maxPedding = maxPedding;
  }

  pendingContains(teacherId) {
    return this.pending.indexOf(teacherId) !== -1;
  }

  push(teacherId) {
    if (this.pendingContains(teacherId)) return;

    if (this.pending.length > this.maxPedding) {
      this.flush();
    }

    this.pending.push(teacherId);

    if (!this.timmer) {
      this.timmer = setTimeout(this.flush, 300);
    }
  }

  flush = () => {
    this.flushAction(this.pending);
    this.pending = [];

    if (this.timmer) {
      clearTimeout(this.timmer);
      this.timmer = null;
    }
  };
}
