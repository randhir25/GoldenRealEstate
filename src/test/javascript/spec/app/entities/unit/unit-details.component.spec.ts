/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import UnitDetailComponent from '@/entities/unit/unit-details.vue';
import UnitClass from '@/entities/unit/unit-details.component';
import UnitService from '@/entities/unit/unit.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Unit Management Detail Component', () => {
    let wrapper: Wrapper<UnitClass>;
    let comp: UnitClass;
    let unitServiceStub: SinonStubbedInstance<UnitService>;

    beforeEach(() => {
      unitServiceStub = sinon.createStubInstance<UnitService>(UnitService);

      wrapper = shallowMount<UnitClass>(UnitDetailComponent, { store, i18n, localVue, provide: { unitService: () => unitServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUnit = { id: 123 };
        unitServiceStub.find.resolves(foundUnit);

        // WHEN
        comp.retrieveUnit(123);
        await comp.$nextTick();

        // THEN
        expect(comp.unit).toBe(foundUnit);
      });
    });
  });
});
