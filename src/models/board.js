class Board {
  constructor(tags, name, index, tasks = []) {
    this.tags = tags;
    this.name = name;
    this.index = index;
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

export { Board };
