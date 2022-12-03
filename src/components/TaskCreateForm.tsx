import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Label from './Label';
import Frequency from '../types/Frequency';
import Task from '../types/Task';
import * as firebase from '../services/firebase';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TaskCreateForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<Frequency>(Frequency.Daily);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  function addTask(event: React.FormEvent) {
    const newTask: Task = { title, description, frequency };
    event.preventDefault();
    firebase.addTask(newTask, () => {
      resetForm();
      setShowSuccessMessage(true);
    });
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setFrequency(Frequency.Daily);
  }

  // clear showSuccessMessage after a few seconds
  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [showSuccessMessage]);

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
      {showSuccessMessage && (
        <div className="alert alert-success">Success! Task created.</div>
      )}
    </Form>
  );
}

export default TaskCreateForm;
