<script setup lang="ts">
import PlantCard from "../components/PlantCard.vue"
import { ref, onMounted } from 'vue';
import { axiosInstance } from "../utils/axios";

const plantsList = ref()

onMounted(() => {
    fetchPlants();
})

// fetchPlants() récupère toutes les plantes et les enregistre au state
const fetchPlants = async () => {
    const response = await axiosInstance.get('/plants');
    if (response.status != 200) {
        // errMessage.value = "Une erreur est survenue lors de la mise à jour de vos informations.";
        console.log("Impossible de charger les plantes depuis l'API.")
    } else {
        plantsList.value = response.data;
    }
};

</script>

<template>
    <div className="plants">
        <h1>Liste des plantes</h1>
        <!-- <PlantForm fetchOnePlant={searchPlant} inputSearchbar={inputSearchbar} setinputSearchbar={setinputSearchbar} /> -->
        <!-- {/* On affiche le nombre de plante trouvée ou on informe que la recherche n'a rien donnée */} -->
        <!-- {searchResultMessage && <h3>{searchResultMessage}</h3>} -->

        <section class="plant-results">
            <PlantCard v-for="plant of plantsList" :plant="plant" />
        </section>
    </div>
</template>

<style scoped lang="scss">
.plants {
    max-width: 85vw;
    margin: 0 auto;

    h1 {
        background-color: #eee;
        border-radius: 10px 10px 0 0;
        font-size: 1.5em;
    }
}

.plants a {
    text-decoration: none;
    color: #0d2118;
}

.plants a:hover,
.plants a:focus {
    color: #296047;
    opacity: 0.8;
}

.plants label {
    font-weight: 700;
}

.plants select {
    min-width: 300px;
    padding: 1rem;
    font-size: 0.8em;
}

.plants option {
    padding: 1rem;
}

// ======== ================== ============ //
// ========      RESULTS       ============ //
// ======== ================== ============ //

.plants h3 {
    font-style: italic;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
}

.plant-results h2,
.plants h3 {
    margin: 0 1rem;
}

.plant-results {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
}

.plant-results h2 {
    font-weight: 700;
}

// ======== ================== ============ //
// ========        FORM        ============ //
// ======== ================== ============ //

.plant-form {
    padding: 1rem;
    background-color: #eee;
    border-radius: 0 0 8px 8px;
}

.plant-form h2 {
    text-align: center;
}

.plant-form label {
    font-size: 1rem;
    color: slategrey;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    align-items: flex-start;
}

.plant-main-searchbyname {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 3rem;
}

.plant-main-searchbyname a {
    font-size: 0.8em;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
}

.plant-main-searchbyname input,
.plant-main-searchbyname button {
    padding: 1rem;
    border-radius: 8px;
    min-width: 350px;
    font-size: 1.2rem;
}

.plant-main-searchbyname input[type='text']:focus {
    outline: 5px solid #7bc799;
}

.plant-main-searchbyname button {
    background-color: #296047;
    color: #fff;
    margin: 0 0 0 1rem;
    text-shadow: 1px 1px 1px #0d2118;
    cursor: pointer;
}

.plant-main-searchbyname button:focus,
.plant-main-searchbyname button:hover {
    background-color: #7bc799;
    border: 2px solid #439470;
}

// ======== ================== ============ //
// ========      DETAILS       ============ //
// ======== ================== ============ //

.plant-form details {
    border: 1px solid #aaa;
    border-radius: 4px;
    /*padding: 0.5em 0.5em 0;*/
    background-color: rgb(255 255 255);
}

.plant-form summary:before {
    content: url('../../../public/img/chevron-down.svg');
    float: left;
    margin: 10px 5px 0 0;
}

.plant-form summary {
    font-weight: 400;
    font-size: 0.8em;
    margin: 0.1em 0.4em 0em 0.1em;
    padding: 0.2em;
    display: flex;
    align-items: center;
}

.plant-form summary svg {
    margin: 0 1rem 0 0;
    fill: #ffee5d;
    color: #a5a5a5;
}

.plant-form summary span svg {
    fill: none;
    color: #0d2118;
    margin: 0.6rem 0 0 0.5rem;
}

.plant-form details summary {
    cursor: pointer;
    font-size: 0.8em;
}

.plant-form details label {
    color: #545454;
    font-weight: 400;
}

.plant-form details[open] {
    padding: 0 0.5em;
}

details>summary::-webkit-details-marker {
    display: none;
}

.plant-form details[open] summary:before {
    content: url('../../../public/img/chevron-up.svg');
}

.plant-form details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
    padding: 0.5rem 1rem 0.5rem 1rem;
}

/* IE anterior version does not support detail tag */
@supports not (-ms-ime-align: auto) {
    details summary {
        cursor: pointer;
    }

    details summary>* {
        display: inline;
    }
}

// ======== ================== ============ //
// ========  MOBILE VERSION    ============ //
// ======== ================== ============ //

@media screen and (max-width: 900px) {
    .plants {
        max-width: 95%;
        margin: 0 auto;
        padding: 0;
    }

    .plant-form {
        max-width: 100%;
        overflow: hidden;

        .plant-main-searchbyname {
            max-width: 100%;
        }

        .plant-main-searchbyname button {
            margin: 0;
        }
    }

    .plant-results {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 100%;
    }

    .plant-results h2 {
        font-size: 2rem;
    }

    .plant-main-searchbyname,
    .wrapper {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 100%;
    }
}
</style>
