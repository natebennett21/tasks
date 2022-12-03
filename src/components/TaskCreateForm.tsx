import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Input from './Input';
import Label from './Label';
import Frequency from '../types/Frequency';
import Task from '../types/Task';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  // query,
  // where,
  addDoc,
  // doc,
  // onSnapshot,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC57tF3Vb6l8ms97Dbwwe2lzqDIiWtXGdI',
  authDomain: 'tasks-dfe9b.firebaseapp.com',
  projectId: 'tasks-dfe9b',
  storageBucket: 'tasks-dfe9b.appspot.com',
  messagingSenderId: '1095585592',
  appId: '1:1095585592:web:70ee7016e5183b6f983bcd',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TaskCreateForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<Frequency>(Frequency.Daily);

  function addTask(event: React.FormEvent) {
    const newTask: Task = { title, description, frequency };
    event.preventDefault();
    try {
      addDoc(collection(db, 'tasks'), newTask);
      resetForm();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setFrequency(Frequency.Daily);
  }

  return (
    <Form onSubmit={addTask}>
      <Label>
        Title
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Vacuum main bedroom"
          required
        />
      </Label>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </Form>
  );
}

export default TaskCreateForm;
