import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Project = () => import('../entities/project/project.vue');
// prettier-ignore
const ProjectUpdate = () => import('../entities/project/project-update.vue');
// prettier-ignore
const ProjectDetails = () => import('../entities/project/project-details.vue');
// prettier-ignore
const Building = () => import('../entities/building/building.vue');
// prettier-ignore
const BuildingUpdate = () => import('../entities/building/building-update.vue');
// prettier-ignore
const BuildingDetails = () => import('../entities/building/building-details.vue');
// prettier-ignore
const Unit = () => import('../entities/unit/unit.vue');
// prettier-ignore
const UnitUpdate = () => import('../entities/unit/unit-update.vue');
// prettier-ignore
const UnitDetails = () => import('../entities/unit/unit-details.vue');
// prettier-ignore
const Todos = () => import('../entities/todos/todos.vue');
// prettier-ignore
const TodosUpdate = () => import('../entities/todos/todos-update.vue');
// prettier-ignore
const TodosDetails = () => import('../entities/todos/todos-details.vue');
// prettier-ignore
const Task = () => import('../entities/task/task.vue');
// prettier-ignore
const TaskUpdate = () => import('../entities/task/task-update.vue');
// prettier-ignore
const TaskDetails = () => import('../entities/task/task-details.vue');
// prettier-ignore
const Region = () => import('../entities/region/region.vue');
// prettier-ignore
const RegionUpdate = () => import('../entities/region/region-update.vue');
// prettier-ignore
const RegionDetails = () => import('../entities/region/region-details.vue');
// prettier-ignore
const Country = () => import('../entities/country/country.vue');
// prettier-ignore
const CountryUpdate = () => import('../entities/country/country-update.vue');
// prettier-ignore
const CountryDetails = () => import('../entities/country/country-details.vue');
// prettier-ignore
const Address = () => import('../entities/address/address.vue');
// prettier-ignore
const AddressUpdate = () => import('../entities/address/address-update.vue');
// prettier-ignore
const AddressDetails = () => import('../entities/address/address-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here
const TodosReport = () => import('../report/todos-report.vue');
Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/project',
      name: 'Project',
      component: Project,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/project/new',
      name: 'ProjectCreate',
      component: ProjectUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/project/:projectId/edit',
      name: 'ProjectEdit',
      component: ProjectUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/project/:projectId/view',
      name: 'ProjectView',
      component: ProjectDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/building',
      name: 'Building',
      component: Building,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/building/new',
      name: 'BuildingCreate',
      component: BuildingUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/building/:buildingId/edit',
      name: 'BuildingEdit',
      component: BuildingUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/building/:buildingId/view',
      name: 'BuildingView',
      component: BuildingDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/unit',
      name: 'Unit',
      component: Unit,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/unit/new',
      name: 'UnitCreate',
      component: UnitUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/unit/:unitId/edit',
      name: 'UnitEdit',
      component: UnitUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/unit/:unitId/view',
      name: 'UnitView',
      component: UnitDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/todos',
      name: 'Todos',
      component: Todos,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/todos/new',
      name: 'TodosCreate',
      component: TodosUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/todos/:todosId/edit',
      name: 'TodosEdit',
      component: TodosUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/todos/:todosId/view',
      name: 'TodosView',
      component: TodosDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/task',
      name: 'Task',
      component: Task,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/task/new',
      name: 'TaskCreate',
      component: TaskUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/task/:taskId/edit',
      name: 'TaskEdit',
      component: TaskUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/task/:taskId/view',
      name: 'TaskView',
      component: TaskDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/region',
      name: 'Region',
      component: Region,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/region/new',
      name: 'RegionCreate',
      component: RegionUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/region/:regionId/edit',
      name: 'RegionEdit',
      component: RegionUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/region/:regionId/view',
      name: 'RegionView',
      component: RegionDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/country',
      name: 'Country',
      component: Country,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/country/new',
      name: 'CountryCreate',
      component: CountryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/country/:countryId/edit',
      name: 'CountryEdit',
      component: CountryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/country/:countryId/view',
      name: 'CountryView',
      component: CountryDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/new',
      name: 'AddressCreate',
      component: AddressUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/:addressId/edit',
      name: 'AddressEdit',
      component: AddressUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/address/:addressId/view',
      name: 'AddressView',
      component: AddressDetails,
      meta: { authorities: [Authority.USER] }
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
    {
      path: '/todosreport',
      name: 'TodosReport',
      component: TodosReport,
      meta: { authorities: [Authority.USER] }
    },
  ]
});
