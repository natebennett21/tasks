import Frequency from './Frequency';
import Rule from './Rule';

interface Task {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
  frequency: Frequency;
  rule: Rule;
  color: string;
}

export default Task;
