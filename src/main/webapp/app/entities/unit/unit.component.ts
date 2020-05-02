import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IUnit } from '@/shared/model/unit.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import UnitService from './unit.service';

@Component
export default class Unit extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('unitService') private unitService: () => UnitService;
  private removeId: number = null;

  public units: IUnit[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllUnits();
  }

  public clear(): void {
    this.retrieveAllUnits();
  }

  public retrieveAllUnits(): void {
    this.isFetching = true;

    this.unitService()
      .retrieve()
      .then(
        res => {
          this.units = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IUnit): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeUnit(): void {
    this.unitService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.unit.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllUnits();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
