<script setup lang="ts">
import Garden from "../components/Garden.vue";
import Todo from "../components/Todolist.vue";
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

const setModalIsOpen = (isSignUp: boolean) => {
    interfaceState.switchModal();
    interfaceState.setIsSignUp(isSignUp);
}
</script>

<template>
    <div className="my-space">
        <div v-if="userState.isLogged">
            <Garden />
            <Todo />
        </div>

        <div className="my-space__not-connected">
            <h2 className="my-space__not-connected-title">
                Vous devez vous connecter pour accéder à votre jardin !
            </h2>
            <button className="my-space__not-connected-button" @click="setModalIsOpen(false)">
                S'inscrire
            </button>
            <button className="my-space__not-connected-button" @click="setModalIsOpen(true)">
                Se connecter
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.my-space {
    margin: 0 auto;
    width: 100%;

    &__not-connected {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 48vh;

        &-title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        &-button {
            margin-top: 1rem;
            padding: 0.5rem 1.5rem;
            width: 20rem;
            background: black;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 2rem;
            cursor: pointer;

            &:hover {
                background: #799f7a;
                color: black;
            }
        }
    }

    @media screen and (min-width: 1500px) {
        display: flex;
        justify-content: center;
        width: 85%;
    }

    @media screen and (min-width: 1900px) {
        width: 80%;
    }
}
</style>
