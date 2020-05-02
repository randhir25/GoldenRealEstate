import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITodos } from '@/shared/model/todos.model';
import TodosService from './todos.service';

@Component
export default class TodosDetails extends Vue {
  @Inject('todosService') private todosService: () => TodosService;
  public todos: ITodos = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todosId) {
        vm.retrieveTodos(to.params.todosId);
      }
    });
  }

  public retrieveTodos(todosId) {
    this.todosService()
      .find(todosId)
      .then(res => {
        this.todos = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
