import React from 'react';
import TaskProps from '../types/Task';

function Task({ title }: TaskProps) {
  return <div>{title}</div>;
}

export default Task;
