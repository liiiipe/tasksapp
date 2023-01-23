import { Task } from "../../entities/task";

export interface TaskRepository {
  create: (task: Task) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getAll: () => Promise<Task[]>;
  attFinished: (id: string, isFinished: boolean) => Promise<void>;
}