<script setup lang="ts">
// import { useUserStore } from '../stores/user';
import { ref, toRefs, watch, onMounted } from 'vue';
import { PlantAllProps } from '../@types/plants';
import { useInterfaceStore } from '../stores/interface';
import { useRoute, useRouter } from 'vue-router';
import { axiosInstance } from '../utils/axios';

const route = useRoute();
const router = useRouter();

// const userState = useUserStore();
const interfaceState = useInterfaceStore();

// isOpen permet de savoir si on développe toute les infos de la plante ou non
const isOpen = ref(false);

const handleOpenWindow = () => {
    isOpen.value = !isOpen.value;
}

// plant stock toutes les infos de la plante à afficher
const plant = ref(<PlantAllProps>{});

// Au chargement de la page on attends une milliseconde pour s'assurer que le store n'est pas mis à jour avec une plante
// Sans le setTimeout, onMounted s'éxecute avant la mise à jour de state
onMounted(() => {
    setTimeout(() => {
        if (!interfaceState.plantPage.plant_name) {
            // Si toujours pas de plante on récupére ses infos auprès de l'API
            getPlantData();
        }
    }, 1);
})

// Grâce à toRefs on peu watch uniquement une valeur du store ici plantPage
const { plantPage } = toRefs(interfaceState);

// Si plantPage est mis à jour, on stock cette plante dans le state : plant
watch(plantPage, (newValue) => {
    if (newValue.plant_name) {
        plant.value = interfaceState.plantPage;
    } else {
        getPlantData();
    }
});

// getPlantData récupère les informations de la plante auprès de l'API
const getPlantData = async () => {
    const response = await axiosInstance.get(`/plants/${route.params.plantSlug}`);
    if (response.status !== 200) {
        // addNewNotification(response.data.message, false);
        router.push('/404');
    } else {
        plant.value = response.data;
    }
}

</script>

<template>
    <div v-if="plant" class="plant">

        <h1>{{ plant.plant_name }}</h1>
        <div class="desktop__fiche__plante__principale">
            <div class="desktop__fiche__plante__1">
                <img :src="plant.url_image" :alt="plant.plant_name" :title="plant.plant_name" />
                <p class="plant__latin__name">{{ plant.latin_plant_name }}</p>
            </div>
            <div class="plant__description">
                <p>{{ plant.plant_description }}</p>
            </div>
            <div class="plant__caracs" :class="{ open: isOpen }">
                <div class="plant__caracs__column__1">
                    <p>
                        <span class="plant__caracs_specs">Type : </span>
                        {{ plant.plant_type }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Habitat : </span>
                        {{ plant.is_plant_ext ? 'Extérieur' : 'Intérieur' }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Origine : </span>
                        {{ plant.origin }}
                    </p>
                    <p>
                        <span classe="plant__caracs_specs">Vivace : </span>
                        {{ plant.is_perennial ? 'Oui' : 'Non' }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Rustique : </span>
                        {{ plant.is_rustic ? 'Oui' : 'Non' }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Ensoleillement : </span>
                        {{ plant.sunshine }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Toxique : </span>
                        {{ plant.toxicity }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Comestible : </span>
                        {{ plant.is_edible ? 'Oui' : 'Non' }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Période de plantation :
                        </span>
                        {{ plant.seed_month_planting }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Période de récolte :
                        </span>
                        {{ plant.harvest_time }} jours
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Fréquence d'arrosage : </span>
                        {{ plant.watering_frequency }}
                    </p>
                </div>
                <div class="plant__caracs__column">
                    <p>
                        <span class="plant__caracs_specs">
                            Fréquence engrais :
                        </span>
                        {{ plant.fertilizer_frequency }} jours
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Intervalle de rempottage :
                        </span>
                        {{ plant.repotting_interval }} jours
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Intervalle d'arrosage :
                        </span>
                        {{ plant.watering_interval }} jours
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Fréquence d'arrosage :
                        </span>
                        {{ plant.watering_frequency }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Couleur :</span>
                        {{ plant.color }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Type de sol : </span>
                        {{ plant.soil_type }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">Humidité : </span>
                        {{ plant.humidity }}
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Température minimale :
                        </span>
                        {{ plant.min_temp }} °
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Température maximale :
                        </span>
                        {{ plant.max_temp }} °
                    </p>
                    <p>
                        <span class="plant__caracs_specs">
                            Taille maximale :
                        </span>
                        {{ plant.max_height }} cm
                    </p>
                </div>

                <button @click="handleOpenWindow" class="btn-window">
                    {{ isOpen ? '▲ Réduire ▲ ' : '▼ Agrandir ▼ ' }}
                </button>
            </div>
        </div>

        <!-- {isLogged && isAddableToGarden && (
        <div>
            <button class="plant__button" onClick={handleAddPlant}>
                <PlusCircle />
                Ajouter à mon Jardin
            </button>
        </div>

        {isLogged && !isAddableToGarden && (
        <button class="add-plant-btn in-garden" title="Retirer une plante à mon espace vert" onClick={()=>
            navigate('/mon-espace-vert')}>
            <Check />
            PLANTE DEJA DANS MON JARDIN
        </button> -->

    </div>
</template>

<style scoped lang="scss">
// ======== ================== ============ //
// ========    Partie Plante  ============ //
// ======== ================== ============ //
.plant {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 95%;

    .btn-window {
        cursor: pointer;
    }
}

.plant__latin__name {
    font-size: 1rem;
    font-style: italic;
    text-align: center;
    font-family: 'Playfair Display', 'Roboto', serif;
    letter-spacing: 1px;
}

.plant__description.open {
    display: none;
    align-items: center;
}

.plant img {
    max-width: 100%;
    display: block;
    border-radius: 10px;
    // max-width: 500px;
    // max-height: 500px;

}

.desktop__fiche__plante__principale {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0rem 2rem 0 2rem;

}

.desktop__fiche__plante__1 {
    justify-content: center;
    align-items: center;
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

// }
// ======== ================== ============ //
// ========    Partie Caracs ============ //
// ======== ================== ============ //

.plant__caracs__column__1 p:nth-child(odd),
.plant__caracs__column p:nth-child(odd) {
    background-color: #8eac8f;
}

.plant__caracs__column,
.plant__caracs__column__1 {
    width: 100%;
}

.plant__caracs {
    padding: 2rem;
    background-color: #799f7a;
    color: white;
    border-radius: 10px;
    font-size: 1.3rem;
    max-height: 20vh;
    position: relative;
    overflow: hidden;
    width: 100%;
}

.plant__caracs_specs {
    font-weight: 700;
    color: #26573c;
}

.plant__caracs.open {
    max-height: none;
}

.plant__caracs button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border: none;
    background-color: #799f7a;
    color: #133514;
}

.plant__caracs button:hover {
    cursor: pointer;
}

.plant__caracs p {
    font-size: 1rem;
    padding: 0 1rem;
}

h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
}

// ======== ================== ============ //
// ========    Partie Bouton Ajouter ============ //
// ======== ================== ============ //

.plant__button {
    align-items: center;
    gap: 1rem;
    border: none;
    background-color: white;
    display: flex;
    justify-content: center;
    margin: 2rem auto;
    font-size: 1.5rem;
    padding: 1rem;
    border-style: double;
    border-radius: 10px;
}

.plant__button:hover {
    color: white;
    background-color: #799f7a;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
}

// ======== ================== ============ //
// ========    MEDIA QUERY POUR DESKTOP   ============ //
// ======== ================== ============ //

@media screen and (min-width: 1024px) {
    .plant {
        h1 {
            text-align: center;
            text-decoration: underline;
            color: white;
            margin-bottom: 2rem;
            max-width: 95%;
        }

        p {
            color: white;
        }

        .plant__caracs__column,
        .plant__caracs__column__1 {
            width: 50%;
        }
    }

    .desktop__fiche__plante__principale {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        justify-content: center;
    }

    .desktop__fiche__plante__1 {


        align-items: center;
        padding: 0 2rem;


    }

    .plant__caracs {
        display: flex;
        flex-direction: row;
        text-align: justify;
        justify-content: center;
        // display: flex;
        // flex-direction: column;
        //! ici
        // width: 90%;
        width: 95%;
        max-height: fit-content;

        //! ici
        text-align: left;
        border: 1px solid #133514;
        border-style: dashed;
        margin: 0rem 2rem 0 2rem;

        p {
            font-size: 0.9rem;
        }
    }

    .plant {
        background-color: #799f7a;
        border-radius: 10px;
        flex-direction: column;
        display: flex;
        align-items: center;
    }

    .desktop__fiche__plante__1 img {
        border-radius: 10px;
        max-width: 100%;
    }

    .plant__caracs button {
        display: none;
        margin: 0rem 2rem 0 2rem;
    }

    .plant__description {
        order: 3;
        width: 95%;
        margin: 2rem;
    }
}

//! 1200 px +

@media screen and (min-width: 1200px) {
    .plant__caracs {

        // max-height: 500px;
        p {
            font-size: 1.1rem;
        }
    }
}

@media screen and (min-width: 1650px) {
    .desktop__fiche__plante__principale {
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;

    }

    .plant__caracs {
        display: flex;
        flex-direction: row;
        text-align: justify;
        justify-content: center;
        width: 95%;
        margin: 0rem 2rem 0 2rem;
    }

    .plant__caracs__column__1 {
        p {
            margin-right: 2rem;
        }
    }

    .plant__description {
        padding: 2rem;
        word-wrap: break-word;
    }

    .desktop__fiche__plante__1 {
        margin-bottom: 2rem;
    }
}
</style>
