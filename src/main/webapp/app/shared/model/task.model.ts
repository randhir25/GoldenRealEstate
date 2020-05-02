import { ITodos } from '@/shared/model/todos.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  expert?: string;
  todos?: ITodos[];
}

export class Task implements ITask {
  constructor(public id?: number, public title?: string, public description?: string, public expert?: string, public todos?: ITodos[]) {}
}
