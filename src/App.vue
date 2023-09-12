<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Pages from './pages/Index.vue'
import LoginModal from './components/LoginModal.vue';
import { useUserStore } from './stores/user';
import { useInterfaceStore } from './stores/interface';
import { onMounted } from 'vue';
import jwtDecode from 'jwt-decode';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from './utils/user';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

// Au chargement de App, on vérifie si un token existe dans le localStorage
onMounted(() => {
    // On récupère les données stockées dans le localStorage
    const localUser = getUserDataFromLocalStorage();
    if (localUser) {
        try {
            // Si un token existe, on vérifie s'il n'est pas expiré
            const { id, exp } = jwtDecode(localUser.token) as {
                id: number;
                exp: number;
            };
            // On calcule le timestamp de la date et heure actuelle
            const now = Math.floor(Date.now() / 1000);
            // Si le token est expiré, on passe isLogged à false et on supprime les données du LocalStorage avec la fonction removeUserDataFromLocalStorage
            if (now >= exp) {
                userState.setIsLogged(false);
                removeUserDataFromLocalStorage();
            } else {
                // S'il y a un token encore valide, on passer isLogged à true.
                userState.setIsLogged(true);
                userState.setUserData({
                    id,
                    name: "localUser.name",
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
});

</script>

<template>
    <LoginModal v-if="interfaceState.modalIsOpen" />
    <Header />
    <Pages />
    <Footer />
</template>

<style scoped lang="scss"></style>
