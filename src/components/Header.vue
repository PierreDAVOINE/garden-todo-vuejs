<script setup lang="ts">
import { useUserStore } from '../stores/user';

const user = useUserStore()

</script>

<template>
    <header class="header">
        <!-- Logo garden todo -->
        <div className="header__logo">
            <router-link to="/">
                <img className="header__logo-img" src="../assets/gardentodo-logo1.png" alt="Garden to do logo"
                    title="GardenTodo" />
            </router-link>
        </div>

        <!-- ==============================-->
        <!-- ========= MENU MOBILE ======== -->
        <!-- ==============================-->

        <!-- mobile burger button -->
        <button aria-label="Mobile menu" class="hamburger hamburger--3dxy" type="button" title="Menu mobile">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>

        <!-- ================================-->
        <!-- ========= MENU DESKTOP ========= -->
        <!-- ================================-->

        <!-- Nav login desktop -->
        <nav v-if="!user.isLogged" className="desktop-menu-user-links">
            <button className="link--dia link">
                <v-icon name="co-user" />Inscription
            </button>

            <button className="link--dia link">
                <v-icon name="bi-key" />Connexion
            </button>
        </nav>

        <nav v-else className="desktop-menu-user-links">
            <router-link to="/mon-compte" relative="path" className="link--dia link">
                <v-icon name="co-user" /> Mon compte
            </router-link>
            <button className="link--dia link">
                <v-icon name="co-user" /> Déconnexion
            </button>
        </nav>

        <!-- Navigation principale desktop -->
        <nav className="desktop-menu">
            <router-link to="/" relative="path" className="link--io link">
                Accueil
            </router-link>
            <router-link to="/plantes" relative="path" className="link--io link">
                Liste des plantes
            </router-link>
            <router-link to="/mon-espace-vert" relative="path" className="link--io link">
                Mon espace vert
            </router-link>
            <router-link to="/a-propos" relative="path" className="link--io link">
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

.hamburger.is-active {
    transform: translateX(82vw);

    @media screen and (min-width: 550px) {
        transform: translateX(85vw);
    }
}

.hamburger:hover {
    opacity: 0.7;
}

.hamburger.is-active:hover {
    opacity: 0.7;
}

.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
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

.hamburger--3dxy.is-active .hamburger-inner {
    background-color: transparent !important;
    transform: rotateX(180deg) rotateY(180deg);
}

.hamburger--3dxy.is-active .hamburger-inner::before {
    transform: translate3d(0, 10px, 0) rotate(45deg);
}

.hamburger--3dxy.is-active .hamburger-inner::after {
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
