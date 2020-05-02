import { ITodos } from '@/shared/model/todos.model';
import { IBuilding } from '@/shared/model/building.model';

export interface IUnit {
  id?: number;
  unitTitle?: string;
  unitType?: string;
  floorNo?: number;
  todos?: ITodos[];
  building?: IBuilding;
}

export class Unit implements IUnit {
  constructor(
    public id?: number,
    public unitTitle?: string,
    public unitType?: string,
    public floorNo?: number,
    public todos?: ITodos[],
    public building?: IBuilding
  ) {}
}
