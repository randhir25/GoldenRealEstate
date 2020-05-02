import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UnitService from '../unit/unit.service';
import { IUnit } from '@/shared/model/unit.model';

import TaskService from '../task/task.service';
import { ITask } from '@/shared/model/task.model';

import AlertService from '@/shared/alert/alert.service';
import { ITodos, Todos } from '@/shared/model/todos.model';
import TodosService from './todos.service';

const validations: any = {
  todos: {
    assinedTo: {},
    completed: {},
    statust: {},
    remarks: {},
    startDate: {},
    endDate: {}
  }
};

@Component({
  validations
})
export default class TodosUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('todosService') private todosService: () => TodosService;
  public todos: ITodos = new Todos();

  @Inject('unitService') private unitService: () => UnitService;

  public units: IUnit[] = [];

  @Inject('taskService') private taskService: () => TaskService;

  public tasks: ITask[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todosId) {
        vm.retrieveTodos(to.params.todosId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.todos.id) {
      this.todosService()
        .update(this.todos)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.todos.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.todosService()
        .create(this.todos)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('goldenRealEstateApp.todos.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.todos[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.todos[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.todos[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.todos[field] = null;
    }
  }

  public retrieveTodos(todosId): void {
    this.todosService()
      .find(todosId)
      .then(res => {
        res.startDate = new Date(res.startDate);
        res.endDate = new Date(res.endDate);
        this.todos = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.unitService()
      .retrieve()
      .then(res => {
        this.units = res.data;
      });
    this.taskService()
      .retrieve()
      .then(res => {
        this.tasks = res.data;
      });
  }
}
