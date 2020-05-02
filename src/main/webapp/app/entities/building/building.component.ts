import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBuilding } from '@/shared/model/building.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BuildingService from './building.service';

@Component
export default class Building extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('buildingService') private buildingService: () => BuildingService;
  private removeId: number = null;

  public buildings: IBuilding[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBuildings();
  }

  public clear(): void {
    this.retrieveAllBuildings();
  }

  public retrieveAllBuildings(): void {
    this.isFetching = true;

    this.buildingService()
      .retrieve()
      .then(
        res => {
          this.buildings = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBuilding): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBuilding(): void {
    this.buildingService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.building.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBuildings();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
