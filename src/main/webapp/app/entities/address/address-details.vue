<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="address">
                <h2 class="jh-entity-heading"><span v-text="$t('goldenRealEstateApp.address.detail.title')">Address</span> {{address.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.address.streetName')">Street Name</span>
                    </dt>
                    <dd>
                        <span>{{address.streetName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.address.postalCode')">Postal Code</span>
                    </dt>
                    <dd>
                        <span>{{address.postalCode}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.address.city')">City</span>
                    </dt>
                    <dd>
                        <span>{{address.city}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.address.stateProvince')">State Province</span>
                    </dt>
                    <dd>
                        <span>{{address.stateProvince}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('goldenRealEstateApp.address.country')">Country</span>
                    </dt>
                    <dd>
                        <div v-if="address.country">
                            <router-link :to="{name: 'CountryView', params: {countryId: address.country.id}}">{{address.country.countryName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="address.id" :to="{name: 'AddressEdit', params: {addressId: address.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./address-details.component.ts">
</script>
