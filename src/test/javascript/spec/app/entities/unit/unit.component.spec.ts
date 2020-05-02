/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import UnitComponent from '@/entities/unit/unit.vue';
import UnitClass from '@/entities/unit/unit.component';
import UnitService from '@/entities/unit/unit.service';

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
  describe('Unit Management Component', () => {
    let wrapper: Wrapper<UnitClass>;
    let comp: UnitClass;
    let unitServiceStub: SinonStubbedInstance<UnitService>;

    beforeEach(() => {
      unitServiceStub = sinon.createStubInstance<UnitService>(UnitService);
      unitServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<UnitClass>(UnitComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          unitService: () => unitServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      unitServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllUnits();
      await comp.$nextTick();

      // THEN
      expect(unitServiceStub.retrieve.called).toBeTruthy();
      expect(comp.units[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      unitServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeUnit();
      await comp.$nextTick();

      // THEN
      expect(unitServiceStub.delete.called).toBeTruthy();
      expect(unitServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
