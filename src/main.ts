import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './reset.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import PlantsList from './pages/PlantsList.vue';
import PlantPage from './pages/PlantPage.vue';
import Account from './pages/Account.vue';
import MySpace from './pages/MySpace.vue';
import Us from './pages/Us.vue';
import Notice from './pages/Notice.vue';
import Error404 from './pages/Error404.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  CoUser,
  BiKey,
  LaDoorOpenSolid,
  IoClose,
  LaEditSolid,
  LaCheckCircle,
  LaMapMarkedAltSolid,
  LaEnvelopeOpenTextSolid,
  LaLockSolid,
  IoWarning,
} from 'oh-vue-icons/icons';

const pinia = createPinia();
const app = createApp(App);

// Définition des routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  { path: '/plantes', name: 'plantes', component: PlantsList },
  { path: '/plantes/:plantSlug', name: 'plante', component: PlantPage },
  { path: '/mon-compte', name: 'account', component: Account },
  { path: '/mon-espace-vert', name: 'garden', component: MySpace },
  { path: '/a-propos', name: 'us', component: Us },
  { path: '/mentions-legales', name: 'notice', component: Notice },
  { path: '/404', name: 'NotFound', component: Error404 },
  { path: '/:catchAll(.*)', redirect: '/404' }, // Redirection pour toutes les autres URL
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ajout des icônes
addIcons(
  CoUser,
  BiKey,
  LaDoorOpenSolid,
  IoClose,
  LaEditSolid,
  LaCheckCircle,
  LaMapMarkedAltSolid,
  LaEnvelopeOpenTextSolid,
  LaLockSolid,
  IoWarning
);
app.component('v-icon', OhVueIcon);

// Utilisation du router
app.use(router);

// Utilisation du store
app.use(pinia);

app.mount('#app');
