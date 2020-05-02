import { ICountry } from '@/shared/model/country.model';
import { IProject } from '@/shared/model/project.model';

export interface IAddress {
  id?: number;
  streetName?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  country?: ICountry;
  projects?: IProject[];
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public streetName?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public country?: ICountry,
    public projects?: IProject[]
  ) {}
}
