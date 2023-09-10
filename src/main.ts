import { createApp } from 'vue';
import './reset.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import PlantsList from './pages/PlantsList.vue';
import MySpace from './pages/MySpace.vue';
import Us from './pages/Us.vue';
import Error404 from './pages/Error404.vue';

const app = createApp(App);

// Définition des routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  { path: '/plantes', name: 'plantes', component: PlantsList },
  { path: '/mon-espace-vert', name: 'garden', component: MySpace },
  { path: '/a-propos', name: 'us', component: Us },
  { path: '/404', name: 'NotFound', component: Error404 },
  { path: '/:catchAll(.*)', redirect: '/404' }, // Redirection pour toutes les autres URL
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Utilisation du router
app.use(router);

app.mount('#app');
