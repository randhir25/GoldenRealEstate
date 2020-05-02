/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import UnitUpdateComponent from '@/entities/unit/unit-update.vue';
import UnitClass from '@/entities/unit/unit-update.component';
import UnitService from '@/entities/unit/unit.service';

import TodosService from '@/entities/todos/todos.service';

import BuildingService from '@/entities/building/building.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Unit Management Update Component', () => {
    let wrapper: Wrapper<UnitClass>;
    let comp: UnitClass;
    let unitServiceStub: SinonStubbedInstance<UnitService>;

    beforeEach(() => {
      unitServiceStub = sinon.createStubInstance<UnitService>(UnitService);

      wrapper = shallowMount<UnitClass>(UnitUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          unitService: () => unitServiceStub,

          todosService: () => new TodosService(),

          buildingService: () => new BuildingService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.unit = entity;
        unitServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(unitServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.unit = entity;
        unitServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(unitServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
