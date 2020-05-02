import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITodos } from '@/shared/model/todos.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TodosService from './todos.service';

@Component
export default class Todos extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('todosService') private todosService: () => TodosService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

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
    this.todosService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.todos = res.data;
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

  public removeTodos(): void {
    this.todosService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.todos.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTodoss();
        this.closeDialog();
      });
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
}
