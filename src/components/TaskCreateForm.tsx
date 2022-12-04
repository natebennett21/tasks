import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Label from './Label';
import Select from './Select';
import Frequency from '../types/Frequency';
import Rule from '../types/Rule';
import Task from '../types/Task';
import * as firebase from '../services/firebase';
import { SwatchesPicker } from 'react-color';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // this is so dumb but I don't want the color picker to have a background
  > div > div > div > div > div {
    background: #1a1d23;
  }
  > div:nth-child(2) {
    margin-bottom: 10px;
  }
`;
const ColorSwatch = styled.div<{ background: string }>`
  border-radius: 5px;
  border: 1px solid #208aae;
  height: 36px;
  width: 100%;
  background: ${(props) => props.background};
  margin-bottom: 10px;
  cursor: pointer;
`;
const Message = styled.div`
  margin-top: 5px;
`;

interface TaskFormProps {
  task?: Task;
}
function TaskForm({ task }: TaskFormProps) {
  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(
    task?.description || ''
  );
  const [frequency, setFrequency] = useState<Frequency>(
    task?.frequency || Frequency.Daily
  );
  const [rule, setRule] = useState<Rule>(task?.rule || Rule.Alternate);
  const [color, setColor] = useState(task?.color || '#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  function addTask(event: React.FormEvent) {
    const newTask: Task = { title, description, frequency, rule, color };
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
  function editTask(event: React.FormEvent) {
    event.preventDefault();

    const newTask: Task = { title, description, frequency, rule, color };
    newTask.id = task?.id;

    firebase.updateTask(
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

  function selectColor(hex: string) {
    setColor(hex);
    setShowColorPicker(false);
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
    <Form onSubmit={task ? editTask : addTask}>
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
        Notes/Description
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
            <option value={freq} key={freq}>
              {freq}
            </option>
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
            <option value={rule} key={rule}>
              {rule}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Color
        <ColorContainer>
          <ColorSwatch
            onClick={(e) => setShowColorPicker(true)}
            background={color}
          />
          {showColorPicker && (
            <SwatchesPicker onChange={(color) => selectColor(color.hex)} />
          )}
        </ColorContainer>
      </Label>
      <button type="submit" className="btn btn-primary">
        {task ? 'Save task' : 'Create task'}
      </button>
      {showSuccessMessage && (
        <Message className="alert alert-success">
          Success! Task {task ? 'updated' : 'created'}.
        </Message>
      )}
      {showErrorMessage && (
        <Message className="alert alert-danger">
          Uh oh, something went wrong.
        </Message>
      )}
    </Form>
  );
}

export default TaskForm;
