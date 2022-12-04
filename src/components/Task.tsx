import React from 'react';
import styled from 'styled-components';
import TaskProps from '../types/Task';
import { deleteTask } from '../services/firebase';
import TaskForm from './TaskCreateForm';
import Modal from './Modal';

const ColorSwatch = styled.div<{ background: string }>`
  height: 25px;
  width: 25px;
  background: ${(props) => props.background};
  border-radius: 5px;
`;
function Task({ title, description, frequency, rule, color, id }: TaskProps) {
  const task = { title, description, frequency, rule, color, id };
  function deleteTaskFromFirebase() {
    if (id) {
      deleteTask(
        id,
        () => {
          console.log('success!');
        },
        () => {
          console.log('error sad boi');
        }
      );
    }
  }
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{frequency}</td>
      <td>{rule}</td>
      <td>
        <ColorSwatch background={color} />
      </td>
      <td>
        <Modal
          buttonText="✏️"
          modalId="editTaskModal"
          modalTitle="Edit task"
          modalBody={<TaskForm task={task} />}
        />
      </td>
      <td>
        <button className="btn" onClick={deleteTaskFromFirebase}>
          🗑️
        </button>
      </td>
    </tr>
  );
}

export default Task;
