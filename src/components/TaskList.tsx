import React, { useEffect, useState } from 'react';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../services/firebase';
import TaskType from '../types/Task';
import Task from './Task';

function TaskList() {
  const [value, loading, error] = useCollection(collection(db, 'tasks'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [taskList, setTaskList] = useState<TaskType[]>([]);

  useEffect(() => {
    if (value) {
      setTaskList(value.docs.map((doc) => doc.data()) as TaskType[]);
      console.table(taskList);
    }
  }, [value]);

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        // <span>
        //   Collection:{' '}
        //   {value.docs.map((doc) => (
        //     <React.Fragment key={doc.id}>
        //       {JSON.stringify(doc.data())},{' '}
        //     </React.Fragment>
        //   ))}
        // </span>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Frequency</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <Task {...task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
