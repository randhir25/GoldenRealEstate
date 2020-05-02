import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import UnitService from '../unit/unit.service';
import { IUnit } from '@/shared/model/unit.model';

import ProjectService from '../project/project.service';
import { IProject } from '@/shared/model/project.model';

import AlertService from '@/shared/alert/alert.service';
import { IBuilding, Building } from '@/shared/model/building.model';
import BuildingService from './building.service';

const validations: any = {
  building: {
    buildingName: {}
  }
};

@Component({
  validations
})
export default class BuildingUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('buildingService') private buildingService: () => BuildingService;
  public building: IBuilding = new Building();

  @Inject('unitService') private unitService: () => UnitService;

  public units: IUnit[] = [];

  @Inject('projectService') private projectService: () => ProjectService;

  public projects: IProject[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.buildingId) {
        vm.retrieveBuilding(to.params.buildingId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.building.id) {
      this.buildingService()
        .update(this.building)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.building.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.buildingService()
        .create(this.building)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.building.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBuilding(buildingId): void {
    this.buildingService()
      .find(buildingId)
      .then(res => {
        this.building = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.unitService()
      .retrieve()
      .then(res => {
        this.units = res.data;
      });
    this.projectService()
      .retrieve()
      .then(res => {
        this.projects = res.data;
      });
  }
}
