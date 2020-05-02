import { IUnit } from '@/shared/model/unit.model';
import { ITask } from '@/shared/model/task.model';

export interface ITodos {
  id?: number;
  assinedTo?: string;
  completed?: number;
  statust?: boolean;
  remarks?: string;
  startDate?: Date;
  endDate?: Date;
  unit?: IUnit;
  task?: ITask;
}

export class Todos implements ITodos {
  constructor(
    public id?: number,
    public assinedTo?: string,
    public completed?: number,
    public statust?: boolean,
    public remarks?: string,
    public startDate?: Date,
    public endDate?: Date,
    public unit?: IUnit,
    public task?: ITask
  ) {
    this.statust = this.statust || false;
  }
}
