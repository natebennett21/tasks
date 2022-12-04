import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../services/firebase';
import TaskType from '../types/Task';
import Task from './Task';

const FullWidthContainer = styled.div`
  width: 100%;
`;
const Table = styled.table`
  color: #f1f0ea;
  background-color: #2b303b;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #666565;
  max-height: 80%;
  overflow-y: scroll;
`;
const TBody = styled.tbody`
  background-color: #363d4b;
`;
function TaskList() {
  const [value, loading, error] = useCollection(collection(db, 'tasks'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [taskList, setTaskList] = useState<TaskType[]>([]);

  useEffect(() => {
    if (value) {
      setTaskList(value.docs.map((doc) => doc.data()) as TaskType[]);
    }
  }, [value]);

  return (
    <FullWidthContainer>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Notes/Description</th>
              <th>Frequency</th>
              <th>Rule</th>
              <th>Color</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <TBody>
            {taskList.map((task) => (
              <Task {...task} />
            ))}
          </TBody>
        </Table>
      )}
    </FullWidthContainer>
  );
}

export default TaskList;
