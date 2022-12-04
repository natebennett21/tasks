import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Task from '../types/Task';

export function convertDocToTask(doc: QueryDocumentSnapshot<DocumentData>) {
  const task: Task = doc.data() as Task;
  task.id = doc.id;
  return task;
}
