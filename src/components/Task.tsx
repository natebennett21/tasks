import React from 'react';
import TaskProps from '../types/Task';

function Task({ title, description, frequency, rule }: TaskProps) {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{frequency}</td>
      <td>{rule}</td>
    </tr>
  );
}

export default Task;
