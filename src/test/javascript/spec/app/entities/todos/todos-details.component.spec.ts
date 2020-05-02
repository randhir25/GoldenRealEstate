/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TodosDetailComponent from '@/entities/todos/todos-details.vue';
import TodosClass from '@/entities/todos/todos-details.component';
import TodosService from '@/entities/todos/todos.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Todos Management Detail Component', () => {
    let wrapper: Wrapper<TodosClass>;
    let comp: TodosClass;
    let todosServiceStub: SinonStubbedInstance<TodosService>;

    beforeEach(() => {
      todosServiceStub = sinon.createStubInstance<TodosService>(TodosService);

      wrapper = shallowMount<TodosClass>(TodosDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { todosService: () => todosServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTodos = { id: 123 };
        todosServiceStub.find.resolves(foundTodos);

        // WHEN
        comp.retrieveTodos(123);
        await comp.$nextTick();

        // THEN
        expect(comp.todos).toBe(foundTodos);
      });
    });
  });
});
