<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('goldenRealEstateApp.todos.home.title')" id="todos-heading">Todos</span>
            <router-link :to="{name: 'TodosCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-todos">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('goldenRealEstateApp.todos.home.createLabel')">
                    Create a new Todos
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && todos && todos.length === 0">
            <span v-text="$t('goldenRealEstateApp.todos.home.notFound')">No todos found</span>
        </div>
        <div class="table-responsive" v-if="todos && todos.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('assinedTo')"><span v-text="$t('goldenRealEstateApp.todos.assinedTo')">Assined To</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'assinedTo'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('completed')"><span v-text="$t('goldenRealEstateApp.todos.completed')">Completed</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'completed'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('statust')"><span v-text="$t('goldenRealEstateApp.todos.statust')">Statust</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'statust'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('remarks')"><span v-text="$t('goldenRealEstateApp.todos.remarks')">Remarks</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'remarks'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('startDate')"><span v-text="$t('goldenRealEstateApp.todos.startDate')">Start Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'startDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('endDate')"><span v-text="$t('goldenRealEstateApp.todos.endDate')">End Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'endDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('unit.unitTitle')"><span v-text="$t('goldenRealEstateApp.todos.unit')">Unit</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'unit.unitTitle'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('task.title')"><span v-text="$t('goldenRealEstateApp.todos.task')">Task</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'task.title'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="todos in todos"
                    :key="todos.id">
                    <td>
                        <router-link :to="{name: 'TodosView', params: {todosId: todos.id}}">{{todos.id}}</router-link>
                    </td>
                    <td>{{todos.assinedTo}}</td>
                    <td>{{todos.completed}}</td>
                    <td>{{todos.statust}}</td>
                    <td>{{todos.remarks}}</td>
                    <td>{{todos.startDate ? $d(Date.parse(todos.startDate), 'short') : ''}}</td>
                    <td>{{todos.endDate ? $d(Date.parse(todos.endDate), 'short') : ''}}</td>
                    <td>
                        <div v-if="todos.unit">
                            <router-link :to="{name: 'UnitView', params: {unitId: todos.unit.id}}">{{todos.unit.unitTitle}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="todos.task">
                            <router-link :to="{name: 'TaskView', params: {taskId: todos.task.id}}">{{todos.task.title}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TodosView', params: {todosId: todos.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TodosEdit', params: {todosId: todos.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(todos)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="goldenRealEstateApp.todos.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-todos-heading" v-text="$t('goldenRealEstateApp.todos.delete.question', {'id': removeId})">Are you sure you want to delete this Todos?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-todos" v-text="$t('entity.action.delete')" v-on:click="removeTodos()">Delete</button>
            </div>
        </b-modal>
        <div v-show="todos && todos.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./todos.component.ts">
</script>
