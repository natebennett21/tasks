import React from 'react';
import styled from 'styled-components';
import TaskCreateForm from './TaskCreateForm';
import TaskList from './TaskList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function TaskManager() {
  return (
    <Container>
      <TaskCreateForm />
      <TaskList />
    </Container>
  );
}
export default TaskManager;
