<script setup lang="ts">


</script>

<template>
    <div className="home">
        <div className="about">
            <div className="about__img"></div>
            <div className="about__content">
                <h1>Qui sommes nous ?</h1>
                <p>
                    Destiné à tous les férus de plantes, Garden to-do est un service de
                    to-do list accompagné de son jardin en ligne. Garden to-to vous
                    permettra de suivre jour après jour les tâches à effectuer pour
                    garder vos plantes en bonne santé. La todo list vous permet de créer
                    des tâches. En vous connectant au site, vous recevrez les
                    notifications des tâches à effectuer : arrosage, rempotage, semis...
                    Vous pouvez ajouter à votre jardin toutes les plantes de votre
                    choix, il suffit de les sélectionner dans la
                    <router-link to="/plantes">liste des plantes</router-link>. D'autres fonctionnalités
                    seront ajoutées très bientôt, n'hésitez pas à repasser nous voir !
                </p>
                <div className="about__button-wrap">
                    <button>
                        S'inscrire
                    </button>
                    <button>
                        Se connecter
                    </button>
                </div>
            </div>
        </div>

        <div className="icones-container">
            <div className="icone-container-unity">
                <img className="icone" src="/src/assets/icon-todo.svg" alt="icone to do list" />
                <p>To-do list</p>
            </div>

            <div className="icone-container-unity">
                <img className="icone" src="/src/assets/icon-flower.svg" alt="icone de fleur" />
                <p>Jardin virtuel</p>
            </div>
            <div className="icone-container-unity">
                <img className="icone" src="/src/assets/icon-book.svg" alt="icone de livre" />
                <p>Guide</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem 1rem 1rem;
    min-height: 810px;

    h1 {
        font-size: 1.5em;
        margin-top: 1rem;
    }

    a {
        color: #296047;
        text-decoration: none;
    }

    a:hover,
    a:focus {
        color: rgb(0, 0, 0);
    }

    @media screen and (min-width: 1024px) {
        width: 80%;
        margin: 0 auto;
    }

    div {
        width: 100%;
        box-sizing: border-box;
    }
}

$screen-size: 1400px;
$screen-size-big: 1980px;

// ======================= //
// ======== ABOUT ======== //
// ======================= //
.about {
    background-color: #799f7a;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
    border-radius: 10px;

    @media screen and (min-width: $screen-size) {
        display: flex;
        align-items: stretch;
    }

    &__img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: url('/src/assets/presentation.jpg') center center/cover no-repeat;
        width: 100px;
        height: auto;

        @media screen and (min-width: $screen-size) {
            width: 50%;
            border-top-left-radius: 10px;
            border-top-right-radius: 0px;
            border-bottom-left-radius: 10px;
        }

        @media screen and (min-width: $screen-size-big) {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-top-right-radius: 0px;
            width: 50%;
        }
    }

    h1,
    p,
    &__button-wrap {
        padding: 1.5rem;

        @media screen and (min-width: 600px) {
            padding: 1.5rem 3rem;
        }
    }
}

// =================================== //
// ============= BUTTONS ============= //
// =================================== //

.about {
    &__button-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;

        button {
            background-color: black;
            font-size: 1.5rem;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            margin-right: 1rem;
            align-items: center;
            border-radius: 10px;
            width: 15rem;
        }
    }

    button:hover {
        cursor: pointer;
        transition: 0.3s;
        background-color: #c2ffc7;
        color: black;
    }
}

// ==================================== //
// ============== ICONS ============== //
// =================================== //

.icones-container .icone {
    max-width: 80%;
    height: 3.5rem;
    margin: 1rem;
    display: flex;
}

.icones-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    text-align: center;
}

.icone-container-unity {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 1.3rem;
        line-height: 1.1;
    }
}
</style>
