import { Task } from "../../entities/task";
import { getRealm } from "../realm";
import { TaskRepository } from "./task-repository";

export class RealmTaskRepository implements TaskRepository {
  constructor() {
  }

  async create(task: Task) {
    const realm = await getRealm();

    realm.write(() => {
      const task_created = realm.create<Task>("Task", {
        _id: "",
        ...task,
        created_at: new Date()
      });

      console.log("Task cadastrada com sucesso: ", task_created);
    })

    realm.close();
  }

  async remove(id: string) {
    const realm = await getRealm();

    realm.write(() => {
      let task = realm.objects("Task").filtered(`_id = '${id}'`)[0];
      realm.delete(task);
      console.log("Task removida com sucesso: ", task);
      task = null;
    });

    realm.close();
  }

  async getAll() {
    const realm = await getRealm();
    const tasks = realm.objects<Task[]>("Task").toJSON();
    realm.close();
    
    console.log("Tasks obtidas com sucesso: ", tasks);
    return tasks;
  }
}