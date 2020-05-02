<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="todos">
                <h2 class="jh-entity-heading"><span v-text="$t('goldenRealEstateApp.todos.detail.title')">Todos</span> {{todos.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.assinedTo')">Assined To</span>
                    </dt>
                    <dd>
                        <span>{{todos.assinedTo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.completed')">Completed</span>
                    </dt>
                    <dd>
                        <span>{{todos.completed}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.statust')">Statust</span>
                    </dt>
                    <dd>
                        <span>{{todos.statust}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.remarks')">Remarks</span>
                    </dt>
                    <dd>
                        <span>{{todos.remarks}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.startDate')">Start Date</span>
                    </dt>
                    <dd>
                        <span v-if="todos.startDate">{{$d(Date.parse(todos.startDate), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.endDate')">End Date</span>
                    </dt>
                    <dd>
                        <span v-if="todos.endDate">{{$d(Date.parse(todos.endDate), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.unit')">Unit</span>
                    </dt>
                    <dd>
                        <div v-if="todos.unit">
                            <router-link :to="{name: 'UnitView', params: {unitId: todos.unit.id}}">{{todos.unit.unitTitle}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.todos.task')">Task</span>
                    </dt>
                    <dd>
                        <div v-if="todos.task">
                            <router-link :to="{name: 'TaskView', params: {taskId: todos.task.id}}">{{todos.task.title}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="todos.id" :to="{name: 'TodosEdit', params: {todosId: todos.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./todos-details.component.ts">
</script>
