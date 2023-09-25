<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';
import { PlantAllProps } from '../@types/plants';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

defineProps({
    plant: {
        type: Object as () => PlantAllProps,
        required: true
    }
})

</script>

<template>
    <div className="plant-card" @click="interfaceState.setPlantPage(plant)">
        <!-- <Link to={`/plantes/${plant.slug_name}`} relative="path"> -->
        <router-link :to="'/plantes/' + plant.slug_name" relative="path">
            <picture>
                <source :srcSet="plant.url_image" media="(max-width: 840px)">
                <img :src="plant.url_image" :alt="plant.plant_name" :title="plant.plant_name" />
            </picture>

            <div class="titles">
                <h2>{{ plant.plant_name }}</h2>
                <h4>{{ plant.latin_plant_name }}</h4>
            </div>
        </router-link>

        <!-- {isLogged && isAddableToGarden && ( -->
        <button v-if="userState.isLogged" className="add-plant-btn" title="ajouter une plante à mon espace vert"
            @click="userState.addFromHasPLant(plant)">
            AJOUTER À MON JARDIN
        </button>

        <!-- {isLogged && !isAddableToGarden && ( -->
        <!-- <button className="add-plant-btn in-garden" title="Retirer une plante à mon espace vert">
            PLANTE DEJA DANS MON JARDIN
        </button> -->
    </div>
</template>

<style scoped lang="scss">
.plant-card {
    background-color: rgb(235, 235, 235);
    box-shadow: 1px 1px 3px 1px #9e9e9e;
    transform: scale(1);
    transition: all 0.2s ease;
    border-radius: 8px;
    overflow: hidden;
    width: 24rem;

    .titles {
        padding: 0 1rem;
    }

    h4 {
        text-align: left;
        font-size: 1.2rem;
        margin: 0 0 1rem 1rem;
    }

    a:focus,
    a:hover {
        color: #296047;
        opacity: 0.8;
    }

    a,
    img {
        text-decoration: none;
        color: #0d2118;
        opacity: 1;
        transition: all 0.2s ease;
    }

    img,
    picture {
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    &:hover,
    &:focus {
        transform: scale(1.04);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    & img,
    & picture {
        border-radius: 8px 8px 0 0;
        max-height: 384px; // 500px
    }

    & img {
        width: 100%;
        object-fit: cover;
    }

    & a {
        text-decoration: none;
        color: #0d2118;
        opacity: 1;
        transition: all 0.2s ease;
    }

    & a:hover,
    & a:focus {
        color: #296047;
        opacity: 0.8;
    }

    .add-plant-btn {
        background-color: #ffffff;
        border: none;
        color: #1b3b2c;
        cursor: pointer;
        margin: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.6rem;
        border: 1px solid #1b3b2c;
        border-radius: 8px;
        font-weight: 700;
        letter-spacing: 1px;
    }

    .add-plant-btn:hover {
        fill: #6aca9f;
        color: #6aca9f;
        background-color: #1b3b2c;
    }

    .add-plant-btn svg {
        transform: scale(1.5);
        fill: #ffffff;
    }

    .add-plant-btn {
        z-index: 99;
    }

    .in-garden {
        background-color: #e5f5e6;
    }

    .in-garden svg {
        fill-opacity: 0;
    }
}

@media screen and (max-width: 740px) {
    .plant-card {
        max-width: 95%;
    }
}
</style>
