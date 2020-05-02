<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="goldenRealEstateApp.address.home.createOrEditLabel" v-text="$t('goldenRealEstateApp.address.home.createOrEditLabel')">Create or edit a Address</h2>
                <div>
                    <div class="form-group" v-if="address.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="address.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.address.streetName')" for="address-streetName">Street Name</label>
                        <input type="text" class="form-control" name="streetName" id="address-streetName"
                            :class="{'valid': !$v.address.streetName.$invalid, 'invalid': $v.address.streetName.$invalid }" v-model="$v.address.streetName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.address.postalCode')" for="address-postalCode">Postal Code</label>
                        <input type="text" class="form-control" name="postalCode" id="address-postalCode"
                            :class="{'valid': !$v.address.postalCode.$invalid, 'invalid': $v.address.postalCode.$invalid }" v-model="$v.address.postalCode.$model"  required/>
                        <div v-if="$v.address.postalCode.$anyDirty && $v.address.postalCode.$invalid">
                            <small class="form-text text-danger" v-if="!$v.address.postalCode.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.address.city')" for="address-city">City</label>
                        <input type="text" class="form-control" name="city" id="address-city"
                            :class="{'valid': !$v.address.city.$invalid, 'invalid': $v.address.city.$invalid }" v-model="$v.address.city.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.address.stateProvince')" for="address-stateProvince">State Province</label>
                        <input type="text" class="form-control" name="stateProvince" id="address-stateProvince"
                            :class="{'valid': !$v.address.stateProvince.$invalid, 'invalid': $v.address.stateProvince.$invalid }" v-model="$v.address.stateProvince.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('goldenRealEstateApp.address.country')" for="address-country">Country</label>
                        <select class="form-control" id="address-country" name="country" v-model="address.country">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="address.country && countryOption.id === address.country.id ? address.country : countryOption" v-for="countryOption in countries" :key="countryOption.id">{{countryOption.countryName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.address.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./address-update.component.ts">
</script>
