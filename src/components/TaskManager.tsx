import React from 'react';
import styled from 'styled-components';
import TaskCreateForm from './TaskCreateForm';
import Modal from './Modal';
import TaskList from './TaskList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function TaskManager() {
  return (
    <Container>
      <TaskList />
      <Modal
        buttonText="New task"
        modalId="newTaskModal"
        modalTitle="Create new task"
        modalBody={<TaskCreateForm />}
      />
    </Container>
  );
}
export default TaskManager;
