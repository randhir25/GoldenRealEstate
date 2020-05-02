<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="goldenRealEstateApp.todos.home.createOrEditLabel" v-text="$t('goldenRealEstateApp.todos.home.createOrEditLabel')">Create or edit a Todos</h2>
                <div>
                    <div class="form-group" v-if="todos.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="todos.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.assinedTo')" for="todos-assinedTo">Assined To</label>
                        <input type="text" class="form-control" name="assinedTo" id="todos-assinedTo"
                            :class="{'valid': !$v.todos.assinedTo.$invalid, 'invalid': $v.todos.assinedTo.$invalid }" v-model="$v.todos.assinedTo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.completed')" for="todos-completed">Completed</label>
                        <input type="number" class="form-control" name="completed" id="todos-completed"
                            :class="{'valid': !$v.todos.completed.$invalid, 'invalid': $v.todos.completed.$invalid }" v-model.number="$v.todos.completed.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.statust')" for="todos-statust">Statust</label>
                        <input type="checkbox" class="form-check" name="statust" id="todos-statust"
                            :class="{'valid': !$v.todos.statust.$invalid, 'invalid': $v.todos.statust.$invalid }" v-model="$v.todos.statust.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.remarks')" for="todos-remarks">Remarks</label>
                        <input type="text" class="form-control" name="remarks" id="todos-remarks"
                            :class="{'valid': !$v.todos.remarks.$invalid, 'invalid': $v.todos.remarks.$invalid }" v-model="$v.todos.remarks.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.startDate')" for="todos-startDate">Start Date</label>
                        <div class="d-flex">
                            <input id="todos-startDate" type="datetime-local" class="form-control" name="startDate" :class="{'valid': !$v.todos.startDate.$invalid, 'invalid': $v.todos.startDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.todos.startDate.$model)"
                            @change="updateInstantField('startDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.endDate')" for="todos-endDate">End Date</label>
                        <div class="d-flex">
                            <input id="todos-endDate" type="datetime-local" class="form-control" name="endDate" :class="{'valid': !$v.todos.endDate.$invalid, 'invalid': $v.todos.endDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.todos.endDate.$model)"
                            @change="updateInstantField('endDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.unit')" for="todos-unit">Unit</label>
                        <select class="form-control" id="todos-unit" name="unit" v-model="todos.unit">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="todos.unit && unitOption.id === todos.unit.id ? todos.unit : unitOption" v-for="unitOption in units" :key="unitOption.id">{{unitOption.unitTitle}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.todos.task')" for="todos-task">Task</label>
                        <select class="form-control" id="todos-task" name="task" v-model="todos.task">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="todos.task && taskOption.id === todos.task.id ? todos.task : taskOption" v-for="taskOption in tasks" :key="taskOption.id">{{taskOption.title}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.todos.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./todos-update.component.ts">
</script>
