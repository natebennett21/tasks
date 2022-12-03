import Frequency from './Frequency';

interface Task {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
  frequency?: Frequency;
}

export default Task;
