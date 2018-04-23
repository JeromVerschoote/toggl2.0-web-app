import uniqid from "uniqid";
import {decorate, observable} from 'mobx';

class Todo {
  constructor(task, time, deadline) {
    this.id = uniqid();
    this.task = task;
    this.time = time;
    this.deadline = deadline;
    this.hidden = false;
  }
}

decorate(Todo, {
  task: observable,
  time: observable,
  deadline: observable
});

export default Todo;
