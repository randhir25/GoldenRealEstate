/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BuildingDetailComponent from '@/entities/building/building-details.vue';
import BuildingClass from '@/entities/building/building-details.component';
import BuildingService from '@/entities/building/building.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Building Management Detail Component', () => {
    let wrapper: Wrapper<BuildingClass>;
    let comp: BuildingClass;
    let buildingServiceStub: SinonStubbedInstance<BuildingService>;

    beforeEach(() => {
      buildingServiceStub = sinon.createStubInstance<BuildingService>(BuildingService);

      wrapper = shallowMount<BuildingClass>(BuildingDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { buildingService: () => buildingServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBuilding = { id: 123 };
        buildingServiceStub.find.resolves(foundBuilding);

        // WHEN
        comp.retrieveBuilding(123);
        await comp.$nextTick();

        // THEN
        expect(comp.building).toBe(foundBuilding);
      });
    });
  });
});
