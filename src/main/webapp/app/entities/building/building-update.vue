<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="goldenRealEstateApp.building.home.createOrEditLabel" v-text="$t('goldenRealEstateApp.building.home.createOrEditLabel')">Create or edit a Building</h2>
                <div>
                    <div class="form-group" v-if="building.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="building.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.building.buildingName')" for="building-buildingName">Building Name</label>
                        <input type="text" class="form-control" name="buildingName" id="building-buildingName"
                            :class="{'valid': !$v.building.buildingName.$invalid, 'invalid': $v.building.buildingName.$invalid }" v-model="$v.building.buildingName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.building.project')" for="building-project">Project</label>
                        <select class="form-control" id="building-project" name="project" v-model="building.project">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="building.project && projectOption.id === building.project.id ? building.project : projectOption" v-for="projectOption in projects" :key="projectOption.id">{{projectOption.projectName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.building.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./building-update.component.ts">
</script>
