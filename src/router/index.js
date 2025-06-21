import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from '../pages/PageIndex.vue'
import Portafolio from '../pages/Portafolio.vue'
import Login from '../pages/auth/Login.vue'
import SelectRol from '../pages/auth/Register/SelectRol.vue'
import RegisterOrganization from '../pages/auth/Register/RegisterOrganization.vue'
import RegisterVolunteer from '../pages/auth/Register/RegisterVolunteer.vue'
import EnrolledMaintance from '../components/Organization/Enrollees/EnrolledMaintance.vue'
import DashboardOrganizationMaintance from '../components/Organization/DashboardOrganizationMaintance.vue'
import ProposalsNew from '../components/Organization/Proposals/ProposalsNew.vue'
import ProposalsMaintance from '../components/Organization/Proposals/ProposalsMaintance.vue'
import ProfileOrganizationMaintance from '../components/Organization/ProfileOrganizationMaintance.vue'
import ConfigurationOrganizationMaintance from '../components/Organization/ConfigurationOrganizationMaintance.vue'

import Cataloge from '../components/Volunteer/Proposals/Cataloge.vue'
import CatalogeDetalle from '../components/Volunteer/Proposals/CatalogeDetalle.vue'
import RegistrationsMaintance from '../components/Volunteer/RegistrationsMaintance.vue'
import DashboardMaintance from '../components/Volunteer/DashboardMaintance.vue'
import ProfileMaintance from '../components/Volunteer/ProfileMaintance.vue'
import ConfigurationMaintance from '../components/Volunteer/ConfigurationMaintance.vue'
import EnrolledDetail from '../components/Organization/Enrollees/EnrolledDetail.vue'

const routes = [
  { path: '/', component: PageIndex },
  { path: '/portafolio', component: Portafolio },
  // { path: '/portafolio/detalle', component: CatalogeDetalle },
  { path: '/login', component: Login },
  { path: '/register', component: SelectRol },
  { path: '/registro-organizacion', component: RegisterOrganization },
  { path: '/registro-voluntario', component: RegisterVolunteer },
  { path: '/portal/Organizacion/Propuestas', component: ProposalsMaintance },
  { path: '/portal/Organizacion/Propuestas/Nuevo', component: ProposalsNew },
  { path: '/portal/Organizacion/Propuestas/Editar/:id', component: ProposalsNew },
  { path: '/portal/Organizacion/Inscritos', component: EnrolledMaintance },
  { path: '/portal/Organizacion/Inscritos/Postulantes/:id', component: EnrolledDetail },
  { path: '/portal/Organizacion/Dashboard', component: DashboardOrganizationMaintance },
  { path: '/portal/Organizacion/Perfil', component: ProfileOrganizationMaintance },
  { path: '/portal/Organizacion/Perfil/Editar/:id', component: ProfileOrganizationMaintance },
  { path: '/portal/Organizacion/Configuracion', component: ConfigurationOrganizationMaintance },
  { path: '/portal/Voluntario/Propuestas', component: Cataloge },
  { path: '/portal/Voluntario/Propuestas/Detalle/:id', component: CatalogeDetalle },
  { path: '/portal/Voluntario/Incripciones', component: RegistrationsMaintance },
  { path: '/portal/Voluntario/Dashboard', component: DashboardMaintance },
  { path: '/portal/Voluntario/Perfil', component: ProfileMaintance },
  { path: '/portal/Voluntario/Perfil/Editar/:id', component: ProfileMaintance },
  { path: '/portal/Voluntario/Configuracion', component: ConfigurationMaintance },
];

const router = createRouter({
  history: createWebHistory('/causaviva/'), // o solo '/' si tu app está en la raíz
  routes,
})

export default router
//#region primer commit