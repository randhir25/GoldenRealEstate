import { Component, Vue, Inject } from 'vue-property-decorator';

import { IUnit } from '@/shared/model/unit.model';
import UnitService from './unit.service';

@Component
export default class UnitDetails extends Vue {
  @Inject('unitService') private unitService: () => UnitService;
  public unit: IUnit = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.unitId) {
        vm.retrieveUnit(to.params.unitId);
      }
    });
  }

  public retrieveUnit(unitId) {
    this.unitService()
      .find(unitId)
      .then(res => {
        this.unit = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
