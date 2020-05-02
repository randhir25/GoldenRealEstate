import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITask } from '@/shared/model/task.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TaskService from './task.service';

@Component
export default class Task extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('taskService') private taskService: () => TaskService;
  private removeId: number = null;

  public tasks: ITask[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTasks();
  }

  public clear(): void {
    this.retrieveAllTasks();
  }

  public retrieveAllTasks(): void {
    this.isFetching = true;

    this.taskService()
      .retrieve()
      .then(
        res => {
          this.tasks = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITask): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTask(): void {
    this.taskService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('goldenRealEstateApp.task.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTasks();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
