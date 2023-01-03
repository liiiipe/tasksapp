import { Task } from "../entities/task";

export interface TaskRepository {
  create: (task: Task) => Promise<any>;
  remove: (id: string) => Promise<any>;
}