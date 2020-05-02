<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="project">
                <h2 class="jh-entity-heading"><span v-text="$t('goldenRealEstateApp.project.detail.title')">Project</span> {{project.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.project.projectName')">Project Name</span>
                    </dt>
                    <dd>
                        <span>{{project.projectName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.project.address')">Address</span>
                    </dt>
                    <dd>
                        <div v-if="project.address">
                            <router-link :to="{name: 'AddressView', params: {addressId: project.address.id}}">{{project.address.streetName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="project.id" :to="{name: 'ProjectEdit', params: {projectId: project.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./project-details.component.ts">
</script>
