import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Label from './Label';
import Select from './Select';
import Frequency from '../types/Frequency';
import Rule from '../types/Rule';
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
  const [rule, setRule] = useState<Rule>(Rule.Alternate);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  function addTask(event: React.FormEvent) {
    const newTask: Task = { title, description, frequency, rule };
    event.preventDefault();
    firebase.addTask(
      newTask,
      () => {
        resetForm();
        setShowSuccessMessage(true);
      },
      () => setShowErrorMessage(true)
    );
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setFrequency(Frequency.Daily);
    setRule(Rule.Alternate);
  }

  // clear showSuccessMessage after a few seconds
  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [showSuccessMessage]);

  // clear showErrorMessage after a few seconds
  useEffect(() => {
    if (showErrorMessage) {
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  }, [showErrorMessage]);

  return (
    <Form onSubmit={addTask}>
      <Label>
        Title
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Vacuum main bedroom"
          className="form-control"
          required
        />
      </Label>
      <Label>
        Description
        <Input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Make sure to get all the corners"
          className="form-control"
        />
      </Label>
      <Label>
        Frequency
        <Select
          onChange={(e) => setFrequency(e.target.value as Frequency)}
          value={frequency}
          className="form-select"
        >
          {Object.keys(Frequency).map((freq) => (
            <option value={freq}>{freq}</option>
          ))}
        </Select>
      </Label>
      <Label>
        Rule
        <Select
          onChange={(e) => setRule(e.target.value as Rule)}
          value={rule}
          className="form-select"
        >
          {Object.keys(Rule).map((rule) => (
            <option value={rule}>{rule}</option>
          ))}
        </Select>
      </Label>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
      {showSuccessMessage && (
        <div className="alert alert-success">Success! Task created.</div>
      )}
      {showErrorMessage && (
        <div className="alert alert-danger">Uh oh, something went wrong.</div>
      )}
    </Form>
  );
}

export default TaskCreateForm;
