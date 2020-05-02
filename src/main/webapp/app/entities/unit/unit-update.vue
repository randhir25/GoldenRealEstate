<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="goldenRealEstateApp.unit.home.createOrEditLabel" v-text="$t('goldenRealEstateApp.unit.home.createOrEditLabel')">Create or edit a Unit</h2>
                <div>
                    <div class="form-group" v-if="unit.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="unit.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.unit.unitTitle')" for="unit-unitTitle">Unit Title</label>
                        <input type="text" class="form-control" name="unitTitle" id="unit-unitTitle"
                            :class="{'valid': !$v.unit.unitTitle.$invalid, 'invalid': $v.unit.unitTitle.$invalid }" v-model="$v.unit.unitTitle.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.unit.unitType')" for="unit-unitType">Unit Type</label>
                        <input type="text" class="form-control" name="unitType" id="unit-unitType"
                            :class="{'valid': !$v.unit.unitType.$invalid, 'invalid': $v.unit.unitType.$invalid }" v-model="$v.unit.unitType.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.unit.floorNo')" for="unit-floorNo">Floor No</label>
                        <input type="number" class="form-control" name="floorNo" id="unit-floorNo"
                            :class="{'valid': !$v.unit.floorNo.$invalid, 'invalid': $v.unit.floorNo.$invalid }" v-model.number="$v.unit.floorNo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.unit.building')" for="unit-building">Building</label>
                        <select class="form-control" id="unit-building" name="building" v-model="unit.building">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="unit.building && buildingOption.id === unit.building.id ? unit.building : buildingOption" v-for="buildingOption in buildings" :key="buildingOption.id">{{buildingOption.buildingName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.unit.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./unit-update.component.ts">
</script>
