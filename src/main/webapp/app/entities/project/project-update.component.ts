import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import BuildingService from '../building/building.service';
import { IBuilding } from '@/shared/model/building.model';

import AddressService from '../address/address.service';
import { IAddress } from '@/shared/model/address.model';

import AlertService from '@/shared/alert/alert.service';
import { IProject, Project } from '@/shared/model/project.model';
import ProjectService from './project.service';

const validations: any = {
  project: {
    projectName: {}
  }
};

@Component({
  validations
})
export default class ProjectUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('projectService') private projectService: () => ProjectService;
  public project: IProject = new Project();

  @Inject('buildingService') private buildingService: () => BuildingService;

  public buildings: IBuilding[] = [];

  @Inject('addressService') private addressService: () => AddressService;

  public addresses: IAddress[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.projectId) {
        vm.retrieveProject(to.params.projectId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.project.id) {
      this.projectService()
        .update(this.project)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.project.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.projectService()
        .create(this.project)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.project.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProject(projectId): void {
    this.projectService()
      .find(projectId)
      .then(res => {
        this.project = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.buildingService()
      .retrieve()
      .then(res => {
        this.buildings = res.data;
      });
    this.addressService()
      .retrieve()
      .then(res => {
        this.addresses = res.data;
      });
  }
}
