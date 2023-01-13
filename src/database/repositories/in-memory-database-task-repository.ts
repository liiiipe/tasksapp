import { Task } from "../../entities/task";
import { TaskRepository } from "./task-repository";

export class InMemoryDatabaseTaskRepository implements TaskRepository {
  tasks: Task[];

  constructor() {
    this.tasks = [
      {
        _id: "1",
        title: "Teste de criação ",
        date: new Date(),
        finished: false,
        description: "Essa é a primeira tarefa cadastrada",
      },
      {
        _id: '456',
        title: 'Task 123456766767',
        date: new Date('2022-12-23T09:30:44.244Z'),
        finished: false,
        description: "",
      },
      {
        _id: '454356',
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
    this.tasks = this.tasks.filter(task => task._id !== id);
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