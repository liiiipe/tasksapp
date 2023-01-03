import { Task } from "../entities/task";
import { TaskRepository } from "./task-repository";

export class InMemoryDatabaseTaskRepository implements TaskRepository {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async create(task: Task) {
    this.tasks.push(task);
    console.log(this.tasks);
    
    // return await new Promise((resolve, reject) => {
    //   reject({})
    // })
  }

  async remove(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log(this.tasks);

    // return await new Promise((resolve, reject) => {
    //   reject({})
    // })
  }
}