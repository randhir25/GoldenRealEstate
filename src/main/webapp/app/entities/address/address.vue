<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('goldenRealEstateApp.address.home.title')" id="address-heading">Addresses</span>
            <router-link :to="{name: 'AddressCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-address">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('goldenRealEstateApp.address.home.createLabel')">
                    Create a new Address
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
        <div class="alert alert-warning" v-if="!isFetching && addresses && addresses.length === 0">
            <span v-text="$t('goldenRealEstateApp.address.home.notFound')">No addresses found</span>
        </div>
        <div class="table-responsive" v-if="addresses && addresses.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.address.streetName')">Street Name</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.address.postalCode')">Postal Code</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.address.city')">City</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.address.stateProvince')">State Province</span></th>
                    <th><span v-text="$t('goldenRealEstateApp.address.country')">Country</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="address in addresses"
                    :key="address.id">
                    <td>
                        <router-link :to="{name: 'AddressView', params: {addressId: address.id}}">{{address.id}}</router-link>
                    </td>
                    <td>{{address.streetName}}</td>
                    <td>{{address.postalCode}}</td>
                    <td>{{address.city}}</td>
                    <td>{{address.stateProvince}}</td>
                    <td>
                        <div v-if="address.country">
                            <router-link :to="{name: 'CountryView', params: {countryId: address.country.id}}">{{address.country.countryName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AddressView', params: {addressId: address.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AddressEdit', params: {addressId: address.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(address)"
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
            <span slot="modal-title"><span id="goldenRealEstateApp.address.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-address-heading" v-text="$t('goldenRealEstateApp.address.delete.question', {'id': removeId})">Are you sure you want to delete this Address?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-address" v-text="$t('entity.action.delete')" v-on:click="removeAddress()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./address.component.ts">
</script>
