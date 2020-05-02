import { IBuilding } from '@/shared/model/building.model';
import { IAddress } from '@/shared/model/address.model';

export interface IProject {
  id?: number;
  projectName?: string;
  buildings?: IBuilding[];
  address?: IAddress;
}

export class Project implements IProject {
  constructor(public id?: number, public projectName?: string, public buildings?: IBuilding[], public address?: IAddress) {}
}
