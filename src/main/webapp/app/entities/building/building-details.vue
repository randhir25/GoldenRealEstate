<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="building">
                <h2 class="jh-entity-heading"><span v-text="$t('goldenRealEstateApp.building.detail.title')">Building</span> {{building.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.building.buildingName')">Building Name</span>
                    </dt>
                    <dd>
                        <span>{{building.buildingName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.building.project')">Project</span>
                    </dt>
                    <dd>
                        <div v-if="building.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: building.project.id}}">{{building.project.projectName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="building.id" :to="{name: 'BuildingEdit', params: {buildingId: building.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./building-details.component.ts">
</script>
