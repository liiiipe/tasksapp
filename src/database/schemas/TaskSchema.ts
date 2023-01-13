export const TaskSchema = {
  name: "Task",
  properties: {
    _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    title: "string",
    description: "string",
    date: "date",
    finished: "bool",
    created_at: "date"
  },
  primaryKey: "_id",
};