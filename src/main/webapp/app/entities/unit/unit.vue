<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('goldenRealEstateApp.unit.home.title')" id="unit-heading">Units</span>
            <router-link :to="{name: 'UnitCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-unit">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('goldenRealEstateApp.unit.home.createLabel')">
                    Create a new Unit
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
        <div class="alert alert-warning" v-if="!isFetching && units && units.length === 0">
            <span v-text="$t('goldenRealEstateApp.unit.home.notFound')">No units found</span>
        </div>
        <div class="table-responsive" v-if="units && units.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.unit.unitTitle')">Unit Title</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.unit.unitType')">Unit Type</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.unit.floorNo')">Floor No</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.unit.building')">Building</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="unit in units"
                    :key="unit.id">
                    <td>
                        <router-link :to="{name: 'UnitView', params: {unitId: unit.id}}">{{unit.id}}</router-link>
                    </td>
                    <td>{{unit.unitTitle}}</td>
                    <td>{{unit.unitType}}</td>
                    <td>{{unit.floorNo}}</td>
                    <td>
                        <div v-if="unit.building">
                            <router-link :to="{name: 'BuildingView', params: {buildingId: unit.building.id}}">{{unit.building.buildingName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'UnitView', params: {unitId: unit.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'UnitEdit', params: {unitId: unit.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(unit)"
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
            <span slot="modal-title"><span id="goldenRealEstateApp.unit.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-unit-heading" v-text="$t('goldenRealEstateApp.unit.delete.question', {'id': removeId})">Are you sure you want to delete this Unit?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-unit" v-text="$t('entity.action.delete')" v-on:click="removeUnit()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./unit.component.ts">
</script>
