<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';
import { removeUserDataFromLocalStorage } from '../utils/user';
import { useRouter } from 'vue-router';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

const router = useRouter();

const setModalIsOpen = (isSignUp: boolean) => {
    interfaceState.switchModal();
    interfaceState.setIsSignUp(isSignUp);
}

const handleClickDisconnect = (): void => {
    interfaceState.setMenu(false);
    removeUserDataFromLocalStorage();
    userState.setIsLogged(false);
    router.push('/');
}

</script>

<template>
    <header class="header">
        <!-- ==============================-->
        <!-- ========= MENU MOBILE ======== -->
        <!-- ==============================-->

        <!-- mobile burger button -->
        <button aria-label="Mobile menu" class="hamburger hamburger--3dxy" :class="{
            isActive: interfaceState.menuIsOpen
        }" type="button" title="Menu mobile" @click="interfaceState.switchMenu">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>

        <!-- mobile menu -->
        <div v-if="interfaceState.menuIsOpen" class="header__mobile-link-nav">
            <img class="header__mobile-link-nav-logo-img" src="../assets/gardentodo-logo1.png" alt="Garden to do logo"
                title="GardenTodo" />
            <nav class="header__mobile-link-nav-main">
                <router-link to="/" relative="path" class="link--io link">
                    Accueil
                </router-link>
                <router-link to="/plantes" relative="path" class="link--io link">
                    Liste des plantes
                </router-link>
                <router-link v-if="userState.isLogged" to="/mon-espace-vert" relative="path" class="link--io link">
                    Mon espace vert
                </router-link>
                <router-link to="/a-propos" relative="path" class="link--io link">
                    À propos
                </router-link>
            </nav>

            <!-- mobile nav login -->
            <!-- Si l'utilisateur n'est pas connecté on lui propose de se connecter ou de créer un compte -->
            <nav v-if="!userState.isLogged" class="header__mobile-menu-user-links">
                <li>
                    <button class="link--dia link">
                        Inscription
                    </button>
                </li>
                <li>
                    <button class="link--dia link">
                        Connexion
                    </button>
                </li>
            </nav>


            <!-- A l'inverse, si l'utilisateur est connecté on lui propose d'accéder à ses informations personnelles ou de se déconnecter -->
            <nav v-else class="header__mobile-menu-user-links">
                <li>
                    {/* On laisse un link ici car "mon compte" et une page et il faudra une url */}
                    <router-link to="/mon-compte" relative="path" class="link--dia link">
                        Mon compte
                    </router-link>
                </li>
                <li>
                    <button class="link--dia link" @click="handleClickDisconnect">
                        Déconnexion
                    </button>
                </li>
            </nav>
        </div>



        <!-- ======================== -->
        <!-- === Logo Garden todo === -->
        <!-- ======================== -->

        <div class="header__logo">
            <router-link to="/">
                <img class="header__logo-img" src="../assets/gardentodo-logo1.png" alt="Garden to do logo"
                    title="GardenTodo" />
            </router-link>
        </div>

        <!-- ================================ -->
        <!-- ========= MENU DESKTOP ========= -->
        <!-- ================================ -->

        <!-- Nav login desktop -->
        <nav v-if="!userState.isLogged" class="desktop-menu-user-links">
            <button class="link--dia link" @click="setModalIsOpen(false)">
                <v-icon name="co-user" />Inscription
            </button>

            <button class="link--dia link" @click="setModalIsOpen(true)">
                <v-icon name="bi-key" />Connexion
            </button>
        </nav>

        <nav v-else class="desktop-menu-user-links">
            <router-link to="/mon-compte" relative="path" className="link--dia link">
                <v-icon name="co-user" /> Mon compte
            </router-link>
            <button class="link--dia link" @click="handleClickDisconnect">
                <v-icon name="co-user" /> Déconnexion
            </button>
        </nav>

        <!-- Navigation principale desktop -->
        <nav class="desktop-menu">
            <router-link to="/" relative="path" class="link--io link">
                Accueil
            </router-link>
            <router-link to="/plantes" relative="path" class="link--io link">
                Liste des plantes
            </router-link>
            <router-link v-if="userState.isLogged" to="/mon-espace-vert" relative="path" class="link--io link">
                Mon espace vert
            </router-link>
            <router-link to="/a-propos" relative="path" class="link--io link">
                À propos
            </router-link>
        </nav>

    </header>
</template>

<style scoped lang="scss">
.header {
    margin: 1rem 1rem 0 1rem;

    &__logo {
        margin: 0 auto;
        width: 12rem;
    }

    &__logo-img {
        width: 100%;
    }

    &__logo-img:hover,
    &__logo-img:focus {
        transform: scale(1.1);
        transition: all 0.2s ease;
    }

    &__mobile-link-nav {
        background-color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        /*top: 0;*/
        height: 100%;
        bottom: 0;
        z-index: 2;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
    }

    &__mobile-link-nav-logo-img {
        max-width: 40%;
        margin: 0 auto;
        display: block;
    }

    &__mobile-link-nav nav {
        align-items: start;
        margin: 2rem 5rem;
        color: #000;
        background-color: #fff;
    }

    &__mobile-menu-user-links,
    &__mobile-link-nav-main {
        display: flex;
    }

    &__mobile-link-nav-main {
        flex-direction: column;
    }

    &__mobile-menu-user-links {
        flex-direction: column;
    }

    &__mobile-menu-user-links li {
        margin: 0.8rem 0;
        display: flex;
        align-items: center;
    }

    &__mobile-menu-user-links button {
        background: none;
        border: none;
        margin: 0 0.8rem;
        cursor: pointer;
    }

    &__mobile-link-nav nav a {
        text-decoration: none;
        color: #000;
        line-height: 1.2;
    }

    &__mobile-link-nav-main a {
        font-size: 2.8rem;
        font-weight: 700;
        margin: 0.8rem 0;
    }

    &__mobile-menu-user-links a,
    &__mobile-menu-user-links button {
        font-size: 1.2rem;
        font-weight: 400;
        margin: 0;
    }
}

header li {
    list-style-type: none;
}

.header__mobile-link-nav nav a,
.desktop-menu-user-links a,
.desktop-menu a {
    text-decoration: none;
    color: #000;
}

.header__mobile-link-nav nav a:hover,
.header__mobile-link-nav nav a:focus,
.header__mobile-menu-user-links button:hover,
.header__mobile-menu-user-links button:focus,
.desktop-menu-user-links button:hover,
.desktop-menu-user-links button:focus,
.desktop-menu-user-links a:hover,
.desktop-menu-user-links a:focus,
.desktop-menu a:hover,
.desktop-menu a:focus {
    color: rgb(6, 126, 92);
}

.desktop-menu-user-links,
.desktop-menu {
    display: none;
}

// ======== ================== ============ //
// ======== BURGER MENU BUTTON ============ //
// ======== ================== ============ //

.hamburger {
    display: inline-block;
    position: sticky;
    z-index: 4;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
}

.hamburger.isActive {
    transform: translateX(82vw);

    @media screen and (min-width: 550px) {
        transform: translateX(85vw);
    }
}

.hamburger:hover {
    opacity: 0.7;
}

.hamburger.isActive:hover {
    opacity: 0.7;
}

.hamburger.isActive .hamburger-inner,
.hamburger.isActive .hamburger-inner::before,
.hamburger.isActive .hamburger-inner::after {
    background-color: #000;
}

.hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;

}

.hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
    width: 40px;
    height: 4px;
    background-color: #000;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
}

.hamburger-inner::before,
.hamburger-inner::after {
    content: '';
    display: block;
}

.hamburger-inner::before {
    top: -10px;
}

.hamburger-inner::after {
    bottom: -10px;
}

.hamburger--3dxy .hamburger-box {
    perspective: 80px;
    z-index: 5;
}

.hamburger--3dxy .hamburger-inner {
    transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
        background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hamburger--3dxy .hamburger-inner::before,
.hamburger--3dxy .hamburger-inner::after {
    transition: transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hamburger--3dxy.isActive .hamburger-inner {
    background-color: transparent !important;
    transform: rotateX(180deg) rotateY(180deg);
}

.hamburger--3dxy.isActive .hamburger-inner::before {
    transform: translate3d(0, 10px, 0) rotate(45deg);
}

.hamburger--3dxy.isActive .hamburger-inner::after {
    transform: translate3d(0, -10px, 0) rotate(-45deg);
}

/* one size for mini screens */
@media screen and (max-width: 520px) {
    .header__mobile-link-nav-main a {
        font-size: 1.5em;
    }
}

// ======== ================== ============ //
// ========    DESKTOP MENU    ============ //
// ======== ================== ============ //

@media screen and (min-width: 780px) {

    .hamburger,
    .header__mobile-link-nav,
    .header__mobile-link-nav-logo-img {
        display: none;
    }

    .desktop-menu-user-links,
    .desktop-menu {
        display: block;
        text-align: center;
        font-family: 'Roboto', sans-serif;
    }

    .desktop-menu {
        margin: 1.5rem;
    }

    .desktop-menu a:hover,
    .desktop-menu a:focus {
        color: #0a1711;
    }

    .desktop-menu a {
        margin: 1rem;
        font-size: 1em;
        margin: 1rem 0.5rem;
        color: #296047;
        padding: 0.5rem;
        transition: all 0.1s ease;

        @media screen and (min-width: 900px) {
            margin: 1rem 1.5rem;
        }

        @media screen and (min-width: 1024px) {
            margin: 1rem 2rem;
        }
    }

    .desktop-menu-user-links {
        position: absolute;
        top: 1em;
        right: 1em;
        display: flex;
        align-items: center;
    }

    .desktop-menu-user-links button,
    .desktop-menu-user-links a {
        background: none;
        border: none;
        margin: 1rem 0.5rem;
        font-size: 0.8em;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .desktop-menu-user-links svg {
        max-width: 1em;
    }
}
</style>
