<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="unit">
                <h2 class="jh-entity-heading"><span v-text="$t('goldenRealEstateApp.unit.detail.title')">Unit</span> {{unit.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.unit.unitTitle')">Unit Title</span>
                    </dt>
                    <dd>
                        <span>{{unit.unitTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.unit.unitType')">Unit Type</span>
                    </dt>
                    <dd>
                        <span>{{unit.unitType}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.unit.floorNo')">Floor No</span>
                    </dt>
                    <dd>
                        <span>{{unit.floorNo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.unit.building')">Building</span>
                    </dt>
                    <dd>
                        <div v-if="unit.building">
                            <router-link :to="{name: 'BuildingView', params: {buildingId: unit.building.id}}">{{unit.building.buildingName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="unit.id" :to="{name: 'UnitEdit', params: {unitId: unit.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./unit-details.component.ts">
</script>
