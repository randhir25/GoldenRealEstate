import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import TodosService from '../todos/todos.service';
import { ITodos } from '@/shared/model/todos.model';

import BuildingService from '../building/building.service';
import { IBuilding } from '@/shared/model/building.model';

import AlertService from '@/shared/alert/alert.service';
import { IUnit, Unit } from '@/shared/model/unit.model';
import UnitService from './unit.service';

const validations: any = {
  unit: {
    unitTitle: {},
    unitType: {},
    floorNo: {}
  }
};

@Component({
  validations
})
export default class UnitUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('unitService') private unitService: () => UnitService;
  public unit: IUnit = new Unit();

  @Inject('todosService') private todosService: () => TodosService;

  public todos: ITodos[] = [];

  @Inject('buildingService') private buildingService: () => BuildingService;

  public buildings: IBuilding[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.unitId) {
        vm.retrieveUnit(to.params.unitId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.unit.id) {
      this.unitService()
        .update(this.unit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.unit.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.unitService()
        .create(this.unit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.unit.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveUnit(unitId): void {
    this.unitService()
      .find(unitId)
      .then(res => {
        this.unit = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.todosService()
      .retrieve()
      .then(res => {
        this.todos = res.data;
      });
    this.buildingService()
      .retrieve()
      .then(res => {
        this.buildings = res.data;
      });
  }
}
