import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Input from './components/Input';

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

const Container = styled.div`
  background-color: #1a1d23;
  color: #f1f0ea;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  max-width: 800px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

enum Frequency {
  daily,
  weekly,
  biweekly,
  monthly,
  quarterly,
  biannual,
  annual,
}
interface TaskProps {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
  frequency?: Frequency;
}

function Task({ title }: TaskProps) {
  return <div>{title}</div>;
}

function App() {
  //FIXME: there's a crazy loop happening here right now
  // const q = query(collection(db, 'tasks'));
  // onSnapshot(q, (querySnapshot) => {
  //   const tasks: any[] = [];
  //   querySnapshot.forEach((doc) => {
  //     tasks.push(doc.data().title);
  //   });
  //   setTasks(tasks);
  //   console.log('Current tasks: ', tasks.join(', '));
  // });

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  function addTask(event: React.FormEvent) {
    const newTask: TaskProps = { title: inputValue };
    event.preventDefault();
    if (inputValue !== '') {
      try {
        addDoc(collection(db, 'tasks'), newTask);
        setInputValue('');
        console.log('hi');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  }

  function handleChange(event: React.SyntheticEvent<EventTarget>) {
    setInputValue((event.target as HTMLInputElement).value);
  }

  return (
    <Container>
      <Header>
        <h1>Tasks ✅</h1>
      </Header>
      <Main>
        <Form onSubmit={addTask}>
          <Input onChange={handleChange} value={inputValue} required />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </Form>
        {tasks.map((task) => (
          <Task {...task} />
        ))}
        <Calendar />
      </Main>
    </Container>
  );
}

export default App;
