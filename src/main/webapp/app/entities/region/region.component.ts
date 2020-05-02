import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRegion } from '@/shared/model/region.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import RegionService from './region.service';

@Component
export default class Region extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('regionService') private regionService: () => RegionService;
  private removeId: number = null;

  public regions: IRegion[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRegions();
  }

  public clear(): void {
    this.retrieveAllRegions();
  }

  public retrieveAllRegions(): void {
    this.isFetching = true;

    this.regionService()
      .retrieve()
      .then(
        res => {
          this.regions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IRegion): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRegion(): void {
    this.regionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.region.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllRegions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
