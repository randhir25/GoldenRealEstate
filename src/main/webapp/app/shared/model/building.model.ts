import { IUnit } from '@/shared/model/unit.model';
import { IProject } from '@/shared/model/project.model';

export interface IBuilding {
  id?: number;
  buildingName?: string;
  units?: IUnit[];
  project?: IProject;
}

export class Building implements IBuilding {
  constructor(public id?: number, public buildingName?: string, public units?: IUnit[], public project?: IProject) {}
}
