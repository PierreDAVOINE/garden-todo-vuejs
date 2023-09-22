<script setup lang="ts">
import PlantCardGarden from "../components/PlantCardGarden.vue";
import PlantModal from "../components/PlantModal.vue";
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

</script>

<template>
    <div className="garden">
        <PlantModal v-show="interfaceState.isPlantModalOpen" />

        <h2>Mon espace vert</h2>

        <div v-if="userState.hasPlant.length === 0">
            <p>
                Oh non votre jardin est vide !
                <Frown />
            </p>
            <Link to="/plantes">
            <PlusCircle />
            Ajouter une plante
            </Link>
        </div>
        <div v-else className="wrapper-plants">
            <!-- {/* Si l'utilisateur est connecté ET a une ou des plantes */} -->
            <PlantCardGarden v-for="plant of userState.hasPlant" :plant="plant" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.garden {
    background-color: #799f7a;
    color: #fff;
    margin: 1.5rem;
    text-align: center;
    border-radius: 8px;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    flex-grow: 1;

    @media screen and (min-width: 1500px) {
        max-width: 45%;
    }

    @media screen and (min-width: 1800px) {
        max-width: 55%;
    }

    h2::before {
        content: '';
        background-image: url('https://res.cloudinary.com/dtzbumqvq/image/upload/v1684141082/leaf_ye4efs.svg');
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        margin-right: 1rem;
        background-repeat: no-repeat;
        color: darkslategray;
        fill: #fff;
    }

    h2 {
        text-align: center;
        font-size: 1.5em;
    }

    .wrapper-plants {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 2rem;
        margin-top: 1rem;
    }

    .plant-card {
        max-width: 270px;
        height: 400px;

        @media screen and (min-width: 620) {
            max-width: 240px;
        }
    }

    .droplets {
        /*content: "";
        background-image: url(/public/img/drops.svg);*/
        background-repeat: no-repeat;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        padding: 0 0.6rem;
        border-radius: 50%;
        text-shadow: 1px 1px 1px #3b3b3b;
    }

    .droplets img {
        fill: #ffffff;
    }
}
</style>
