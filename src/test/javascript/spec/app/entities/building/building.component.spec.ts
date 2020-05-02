/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BuildingComponent from '@/entities/building/building.vue';
import BuildingClass from '@/entities/building/building.component';
import BuildingService from '@/entities/building/building.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {}
  }
};

describe('Component Tests', () => {
  describe('Building Management Component', () => {
    let wrapper: Wrapper<BuildingClass>;
    let comp: BuildingClass;
    let buildingServiceStub: SinonStubbedInstance<BuildingService>;

    beforeEach(() => {
      buildingServiceStub = sinon.createStubInstance<BuildingService>(BuildingService);
      buildingServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<BuildingClass>(BuildingComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          buildingService: () => buildingServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      buildingServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllBuildings();
      await comp.$nextTick();

      // THEN
      expect(buildingServiceStub.retrieve.called).toBeTruthy();
      expect(comp.buildings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      buildingServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeBuilding();
      await comp.$nextTick();

      // THEN
      expect(buildingServiceStub.delete.called).toBeTruthy();
      expect(buildingServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
