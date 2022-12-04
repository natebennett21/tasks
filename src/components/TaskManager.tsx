import React from 'react';
import styled from 'styled-components';
import TaskCreateForm from './TaskCreateForm';
import TaskList from './TaskList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Modal = styled.div`
  background-color: #1a1d23;
  border: 1px solid #666565;
`;
const ModalHeader = styled.div`
  border-bottom: 1px solid #666565;
`;
const ModalFooter = styled.div`
  border-top: 1px solid #666565;
`;
function TaskManager() {
  return (
    <Container>
      <TaskList />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskFormModal"
      >
        New task
      </button>

      <div
        className="modal fade"
        id="taskFormModal"
        aria-labelledby="taskFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <Modal className="modal-content">
            <ModalHeader className="modal-header">
              <h1 className="modal-title fs-5" id="taskFormModalLabel">
                Modal title
              </h1>
            </ModalHeader>
            <div className="modal-body">
              <TaskCreateForm />
            </div>
            <ModalFooter className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Container>
  );
}
export default TaskManager;
