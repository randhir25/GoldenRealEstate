import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBuilding } from '@/shared/model/building.model';
import BuildingService from './building.service';

@Component
export default class BuildingDetails extends Vue {
  @Inject('buildingService') private buildingService: () => BuildingService;
  public building: IBuilding = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.buildingId) {
        vm.retrieveBuilding(to.params.buildingId);
      }
    });
  }

  public retrieveBuilding(buildingId) {
    this.buildingService()
      .find(buildingId)
      .then(res => {
        this.building = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
