import { TaskRepository } from "../repositories/task-repository";

export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  finished: boolean;
}

export const createTask = async (task: Task, taskRepository: TaskRepository): Promise<any> => {
  await taskRepository.create(task);
}