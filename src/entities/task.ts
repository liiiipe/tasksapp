import { TaskRepository } from "../database/repositories/task-repository";

export type Task = {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  finished: boolean;
  created_at?: Date;
}

export const createTask = async (task: Task, taskRepository: TaskRepository): Promise<any> => {
  await taskRepository.create(task);
}

export const removeTask = async (id: string, taskRepository: TaskRepository): Promise<any> => {
  // verificar se a task existe

  await taskRepository.remove(id);
}

export const getAllTasks = async (taskRepository: TaskRepository): Promise<any> => {
  // verificar se a task existe

  return await taskRepository.getAll();
}