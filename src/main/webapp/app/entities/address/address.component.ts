import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAddress } from '@/shared/model/address.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import AddressService from './address.service';

@Component
export default class Address extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('addressService') private addressService: () => AddressService;
  private removeId: number = null;

  public addresses: IAddress[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllAddresss();
  }

  public clear(): void {
    this.retrieveAllAddresss();
  }

  public retrieveAllAddresss(): void {
    this.isFetching = true;

    this.addressService()
      .retrieve()
      .then(
        res => {
          this.addresses = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IAddress): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAddress(): void {
    this.addressService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.address.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllAddresss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
