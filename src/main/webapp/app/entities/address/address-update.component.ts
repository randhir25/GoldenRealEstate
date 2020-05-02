import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CountryService from '../country/country.service';
import { ICountry } from '@/shared/model/country.model';

import ProjectService from '../project/project.service';
import { IProject } from '@/shared/model/project.model';

import AlertService from '@/shared/alert/alert.service';
import { IAddress, Address } from '@/shared/model/address.model';
import AddressService from './address.service';

const validations: any = {
  address: {
    streetName: {},
    postalCode: {
      required
    },
    city: {},
    stateProvince: {}
  }
};

@Component({
  validations
})
export default class AddressUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('addressService') private addressService: () => AddressService;
  public address: IAddress = new Address();

  @Inject('countryService') private countryService: () => CountryService;

  public countries: ICountry[] = [];

  @Inject('projectService') private projectService: () => ProjectService;

  public projects: IProject[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.addressId) {
        vm.retrieveAddress(to.params.addressId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.address.id) {
      this.addressService()
        .update(this.address)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.address.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.addressService()
        .create(this.address)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.address.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAddress(addressId): void {
    this.addressService()
      .find(addressId)
      .then(res => {
        this.address = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.countryService()
      .retrieve()
      .then(res => {
        this.countries = res.data;
      });
    this.projectService()
      .retrieve()
      .then(res => {
        this.projects = res.data;
      });
  }
}
