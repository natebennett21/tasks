// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  // query,
  // where,
  addDoc,
  doc,
  runTransaction,
  deleteDoc,
  // onSnapshot,
} from 'firebase/firestore';

import Task from '../types/Task';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

// add task
export function addTask(task: Task, onSuccess: Function, onError: Function) {
  try {
    addDoc(collection(db, 'tasks'), task);
    onSuccess();
  } catch (e) {
    console.error('Error adding task: ', e);
    onError();
  }
}

// update task
export async function updateTask(
  task: Task,
  onSuccess: Function,
  onError: Function
) {
  if (task.id) {
    try {
      const docRef = doc(db, 'tasks', task.id);
      if (docRef) {
        try {
          await runTransaction(db, async (transaction) => {
            const taskRef = await transaction.get(docRef);
            if (!taskRef.exists()) {
              throw Error('Task does not exist!');
            }

            transaction.update(docRef, { ...task });
          });
          console.log('Transaction successfully committed!');
        } catch (e) {
          console.log('Transaction failed: ', e);
        }
      }
      onSuccess();
    } catch (e) {
      console.error('Error adding task: ', e);
      onError();
    }
  } else {
    console.error('No task id exists.');
    onError();
  }
}

// delete task
export async function deleteTask(
  id: string,
  onSuccess: Function,
  onError: Function
) {
  try {
    await deleteDoc(doc(db, 'tasks', id));
    onSuccess();
  } catch (e) {
    console.error('Error deleting task: ', e);
    onError();
  }
}
