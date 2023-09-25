<script setup lang="ts">
import { ref } from 'vue';
import { PlantAllProps } from '../@types/plants';
import drops from '../assets/drops.svg';
import { useUserStore } from '../stores/user';
// import { useInterfaceStore } from '../stores/interface';

const userState = useUserStore();
// const interfaceState = useInterfaceStore();

const isNeedWater = ref(false);

defineProps({
    plant: {
        type: Object as () => PlantAllProps,
        required: true
    },
})

</script>

<template>
    <div class="plant-card-garden">
        <span :class="{ droplets: isNeedWater, hide: !isNeedWater }">
            <img :src="drops" alt="Il est l'heure d'arroser !" title="Il est l'heure d'arroser !" />
        </span>

        <picture>
            <source :srcSet="plant.url_image" media="(max-width: 840px)" />
            <img :src="plant.url_image" :alt="plant.plant_name" :title="plant.plant_name" class="garden-plant-card-img" />
        </picture>
        <h3>{{ plant.plant_name }}</h3>

        <div class="wrapper-btn">
            <button class="garden-plant-btn" :name="plant.plant_name" title="voir la plante">
                <!-- <Eye /> -->
                CONSULTER
            </button>
            <button class="garden-plant-btn" title="Supprimer une plante de mon jardin"
                @click="userState.deleteFromHasPlant(plant.plant_id)">
                <!-- <MinusCircle /> -->
                SUPPRIMER
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.plant-card-garden {
    background-color: rgb(235, 235, 235);
    box-shadow: 1px 1px 3px 1px #9e9e9e;
    transform: scale(1);
    transition: all 0.2s ease;
    border-radius: 8px;
    overflow: hidden;
    width: 20rem;

    img,
    picture {
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: auto;
        max-height: 320px;
        object-fit: cover;
    }

    h3 {
        line-height: normal;
        color: darkslategrey;
    }

    &:hover,
    &:focus {
        transform: scale(1.04);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .wrapper-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0 1rem 0;
    }

    .garden-plant-btn {
        background-color: #ffffff;
        border: none;
        color: #1b3b2c;
        cursor: pointer;
        margin: 0.5rem;
        display: flex;
        justify-content: center;
        padding: 0.5rem 0.7rem;
        border: 1px solid #1b3b2c;
        border-radius: 8px;
        font-weight: 700;
        letter-spacing: 1px;
        width: 160px;
    }

    .garden-plant-btn:hover {
        fill: #6aca9f;
        color: #6aca9f;
        background-color: #1b3b2c;
    }

    .garden-plant-btn svg {
        transform: scale(1.5);
        fill: #ffffff;
    }

    span {
        fill: #ffffff;
        color: #6aca9f;
    }
}

.garden-plant-card-img {
    height: 15rem;
}

.hide {
    display: none;
}
</style>
