import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Input from './components/Input';

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

// enum Frequency {
//   daily,
//   weekly,
//   biweekly,
//   monthly,
//   quarterly,
//   biannual,
//   annual,
// }
interface TaskProps {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
}

function Task({ title }: TaskProps) {
  return <div>{title}</div>;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    if (inputValue !== '') {
      setTasks([...tasks, { title: inputValue }]);
      setInputValue('');
    }
  }

  function handleChange(event: React.SyntheticEvent<EventTarget>) {
    setInputValue((event.target as HTMLInputElement).value);
    console.log(inputValue);
  }

  return (
    <Container>
      <Header>
        <h1>Tasks ✅</h1>
      </Header>
      <Main>
        <Form onSubmit={addTask}>
          <Input
            onChange={handleChange}
            value={inputValue}
            className="form-control"
          />
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
