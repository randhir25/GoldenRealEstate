<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('goldenRealEstateApp.building.home.title')" id="building-heading">Buildings</span>
            <router-link :to="{name: 'BuildingCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-building">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('goldenRealEstateApp.building.home.createLabel')">
                    Create a new Building
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
        <div class="alert alert-warning" v-if="!isFetching && buildings && buildings.length === 0">
            <span v-text="$t('goldenRealEstateApp.building.home.notFound')">No buildings found</span>
        </div>
        <div class="table-responsive" v-if="buildings && buildings.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.building.buildingName')">Building Name</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.building.project')">Project</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="building in buildings"
                    :key="building.id">
                    <td>
                        <router-link :to="{name: 'BuildingView', params: {buildingId: building.id}}">{{building.id}}</router-link>
                    </td>
                    <td>{{building.buildingName}}</td>
                    <td>
                        <div v-if="building.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: building.project.id}}">{{building.project.projectName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BuildingView', params: {buildingId: building.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BuildingEdit', params: {buildingId: building.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(building)"
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
            <span slot="modal-title"><span id="goldenRealEstateApp.building.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-building-heading" v-text="$t('goldenRealEstateApp.building.delete.question', {'id': removeId})">Are you sure you want to delete this Building?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-building" v-text="$t('entity.action.delete')" v-on:click="removeBuilding()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./building.component.ts">
</script>
