import { Task } from "../entities/task";
import { TaskRepository } from "./task-repository";

export class InMemoryDatabaseTaskRepository implements TaskRepository {
  tasks: Task[];

  constructor() {
    this.tasks = [
      {
        date: new Date(),
        description: "Essa é a primeira tarefa cadastrada",
        finished: false,
        id: "1",
        title: "Teste de criação ",
      },
      {
        id: '456',
        title: 'Task 123456766767',
        date: new Date('2022-12-23T09:30:44.244Z'),
        finished: false,
        description: "",
      },
      {
        id: '454356',
        title: 'Task finalizada',
        date: new Date('2022-12-23T09:30:44.244Z'),
        finished: true,
        description: "",
      }
    ];
  }

  async create(task: Task) {
    this.tasks.push(task);

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

  async getAll() {
    console.log(this.tasks);

    return this.tasks;

    // return await new Promise((resolve, reject) => {
    //   reject({})
    // })
  };
}