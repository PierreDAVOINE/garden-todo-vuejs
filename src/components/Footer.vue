<script setup lang="ts">


</script>

<template>
    <div className='footer'>
        <router-link to="/mentions-legales" class='link--io link'>
            Mentions légales
        </router-link>
        <router-link to="/a-propos" class='link--io link'>
            À propos
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.footer {
    position: relative;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-top: 2.5rem;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: lightgray;

    @media screen and (min-width: 900px) {
        justify-content: center;
        gap: 20rem;
        position: relative;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }

    a {
        color: black;
        display: block;
        text-decoration: none;
        font-family: 'Playfair Display', 'Roboto', serif;

    }

    a:hover,
    a:focus {
        color: #296047;
    }
}
</style>
