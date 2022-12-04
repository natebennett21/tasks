import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: #1a1d23;
  border: 1px solid #666565;
  max-height: 80vh;
  overflow-y: scroll;
`;
const ModalHeader = styled.div`
  border-bottom: 1px solid #666565;
`;
const ModalFooter = styled.div`
  border-top: 1px solid #666565;
`;
interface ModalProps {
  buttonText: string;
  modalId: string;
  modalTitle: string;
  modalBody: React.ReactNode;
}
function Modal({ buttonText, modalId, modalTitle, modalBody }: ModalProps) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {buttonText}
      </button>

      <div className="modal fade" id={modalId}>
        <div className="modal-dialog">
          <ModalContainer className="modal-content">
            <ModalHeader className="modal-header">
              <h1 className="modal-title fs-5">{modalTitle}</h1>
            </ModalHeader>
            <div className="modal-body">{modalBody}</div>
            <ModalFooter className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </ModalFooter>
          </ModalContainer>
        </div>
      </div>
    </>
  );
}

export default Modal;
