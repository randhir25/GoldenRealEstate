import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITodos } from '@/shared/model/todos.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TodosReportService from './todos-report.service';

@Component
export default class TodosReport extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('todosReportService') private todosReportService: () => TodosReportService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public assignedTo = '';
  public buildingName = '';
  public projectName = '';

  public todos: ITodos[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTodoss();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllTodoss();
  }

  public retrieveAllTodoss(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    this.todosReportService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.todos = res.data;
          if (this.assignedTo.length > 0) {
            // alert(this.assignedTo)
            this.todos = this.todos.filter(todo => { return todo.assinedTo.toLowerCase().indexOf(this.assignedTo.toLowerCase()) > -1; })
          } else if (this.buildingName.length > 0) {
            // alert(this.buildingName)      
            this.todos = this.todos.filter(todo => {
              // alert(todo.unit.building.buildingName.toLowerCase().indexOf(this.buildingName.toLowerCase()))
              return todo.unit.building.buildingName.toLowerCase().indexOf(this.buildingName.toLowerCase()) > -1;
            })
          } else if (this.projectName.length > 0) {
            // alert(this.projectName)
            this.todos = this.todos.filter(todo => { return todo.unit.building.project.projectName.toLowerCase().indexOf(this.projectName.toLowerCase()) > -1; })
          }
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }


  public prepareRemove(instance: ITodos): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }
  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllTodoss();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
  public filterBy(): Array<any> {
    this.retrieveAllTodoss();
    return this.todos.filter(todo => {
      return todo.assinedTo.indexOf(this.assignedTo) > -1;
    })
  }
}
