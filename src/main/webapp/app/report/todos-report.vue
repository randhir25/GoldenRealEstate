<template>
  <div>
    <div class="row">
      <div class="col-md-7">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              v-text="$t('goldenRealEstateApp.project.home.title')"
            >Project</span>
          </div>
          <input
            type="text"
            class="form-control"
            name="projectName"
            v-model="projectName"
            v-on:change="transition()"
            required
          />
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              v-text="$t('goldenRealEstateApp.building.home.title')"
            >Building Name</span>
          </div>
          <input
            type="text"
            class="form-control"
            name="buldingName"
            v-model="buildingName"
            v-on:change="transition()"
            required
          />
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              v-text="$t('goldenRealEstateApp.todos.assinedTo')"
            >Assigned To</span>
          </div>
          <input
            type="text"
            class="form-control"
            name="assignedTo"
            v-model="assignedTo"
            v-on:change="transition()"
            required
          />
        </div>
      </div>
    </div>
    <div class="alert alert-warning" v-if="!isFetching && todos && todos.length === 0">
      <span v-text="$t('goldenRealEstateApp.todos.home.notFound')">No todos found</span>
    </div>
    <div class="table-responsive" v-if="todos && todos.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('assinedTo')">
              <span v-text="$t('goldenRealEstateApp.todos.assinedTo')">Assined To</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'assinedTo'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('completed')">
              <span v-text="$t('goldenRealEstateApp.todos.completed')">Completed</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'completed'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('statust')">
              <span v-text="$t('goldenRealEstateApp.todos.statust')">Statust</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'statust'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('remarks')">
              <span v-text="$t('goldenRealEstateApp.todos.remarks')">Remarks</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'remarks'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('startDate')">
              <span v-text="$t('goldenRealEstateApp.todos.startDate')">Start Date</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'startDate'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('endDate')">
              <span v-text="$t('goldenRealEstateApp.todos.endDate')">End Date</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'endDate'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('unit.unitTitle')">
              <span v-text="$t('goldenRealEstateApp.todos.unit')">Unit</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'unit.unitTitle'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('task.title')">
              <span v-text="$t('goldenRealEstateApp.todos.task')">Task</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'task.title'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('task.title')">
              <span v-text="$t('goldenRealEstateApp.building.buildingName')">Building Name</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'task.title'"
              ></jhi-sort-indicator>
            </th>
            <th v-on:click="changeOrder('task.title')">
              <span v-text="$t('goldenRealEstateApp.project.projectName')">Project Name</span>
              <jhi-sort-indicator
                :current-order="propOrder"
                :reverse="reverse"
                :field-name="'task.title'"
              ></jhi-sort-indicator>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todos in todos" :key="todos.id">
            <td>
              <router-link :to="{name: 'TodosView', params: {todosId: todos.id}}">{{todos.id}}</router-link>
            </td>
            <td>{{todos.assinedTo}}</td>
            <td>{{todos.completed}}</td>
            <td v-if="todos.statust===true">Done</td>
            <td v-else>Pending</td>
            <td>{{todos.remarks}}</td>
            <td>{{todos.startDate ? $d(Date.parse(todos.startDate), 'short') : ''}}</td>
            <td>{{todos.endDate ? $d(Date.parse(todos.endDate), 'short') : ''}}</td>
            <td>
              <div v-if="todos.unit">{{todos.unit.unitTitle}}</div>
            </td>
            <td>
              <div v-if="todos.task">{{todos.task.title}}</div>
            </td>
            <td>
              <div v-if="todos.unit">
                <div v-if="todos.unit.building">{{todos.unit.building.buildingName}}</div>
              </div>
            </td>
            <td>
              <div v-if="todos.unit">
                <div v-if="todos.unit.building">
                  <div v-if="todos.unit.building.project">{{todos.unit.building.project.projectName}}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="todos && todos.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination
          size="md"
          :total-rows="totalItems"
          v-model="page"
          :per-page="itemsPerPage"
          :change="loadPage(page)"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./todos-report.component.ts">
</script>
