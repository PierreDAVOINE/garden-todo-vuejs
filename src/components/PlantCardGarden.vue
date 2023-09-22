<script setup lang="ts">
import { ref } from 'vue';
import { PlantAllProps } from '../@types/plants';
import drops from '/img/drops.svg';

defineProps({
    plant: {
        type: Object as () => PlantAllProps,
        required: true
    },
})

const isNeedWater = ref(false);

</script>

<template>
    <div class="plant-card">
        <span :class="{ droplets: isNeedWater, hide: !isNeedWater }">
            <img src={{drops}} alt="Il est l'heure d'arroser !" title="Il est l'heure d'arroser !" />
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
            <button class="garden-plant-btn" title="Supprimer une plante de mon jardin">
                <!-- <MinusCircle /> -->
                SUPPRIMER
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.garden {
    .plant-card {
        height: auto;
        padding-bottom: 1rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        h3 {
            line-height: normal;
            color: darkslategrey;
        }

        .wrapper-btn {
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .garden-plant-btn {
            background-color: #ffffff;
            border: none;
            color: #1b3b2c;
            cursor: pointer;
            margin: 0.5rem;
            right: 0px;
            bottom: 0px;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid #1b3b2c;
            border-radius: 8px;
            font-weight: 700;
            letter-spacing: 1px;
            text-align: center;
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
}
</style>
