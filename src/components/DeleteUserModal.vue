<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';
import { axiosInstance } from '../utils/axios';
import { removeUserDataFromLocalStorage } from '../utils/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userState = useUserStore();
const interfaceState = useInterfaceStore();

// Gestion de la suppression du compte
const handleDeleteUser = async () => {
    const deleteResponse = await axiosInstance.delete(`/users/${userState.userData.id}`);
    if (deleteResponse.status != 200) {
        console.log(
            "Une erreur est survenue lors de la suppression de votre compte."
        );
    } else {
        removeUserDataFromLocalStorage(); // fonction pour retirer le token jwt
        userState.setIsLogged(false);
        userState.resetUserData();
        interfaceState.resetEditFormAccount();
        userState.resetUserFormDataAccount();
        interfaceState.setIsDeleteModalOpen(false);
        console.log(`utilisateur supprimé`);
        router.push('/');
    }
}
</script>

<template>
    <div class="modale-delete-user">
        <div class="content-modale">
            <button class="close-btn" title="fermer la fenêtre" @click="interfaceState.setIsDeleteModalOpen(false)">
                <v-icon name="io-close" scale="2" />
            </button>
            <div>
                <h1>
                    <v-icon name="io-warning" scale="2" />
                    Suppression du compte
                    <v-icon name="io-warning" scale="2" />
                </h1>
                <p>Êtes-vous sûr(e) de vouloir supprimer votre compte définitivement ?</p>
                <div class="btn-wrapper">
                    <button class="yes" @click="handleDeleteUser">
                        <v-icon name="io-close" /> SUPPRIMER MON COMPTE
                    </button>
                    <button class="no" @click="interfaceState.setIsDeleteModalOpen(false)">
                        <v-icon name="co-user" /> CONSERVER MON COMPTE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modale-delete-user {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(128, 128, 128, 0.671);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-modale {
        position: absolute;
        width: 85%;
        max-height: 90%;
        margin-right: 1rem;
        padding: 1.5rem;
        background: white;
        color: rgb(35, 35, 35);
        border-radius: 10px;
        text-align: center;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        h1 {
            font-size: 1.5em;
            color: #bb4242;
        }
    }

    .close-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: 50%;
        border: 2px solid black;
        cursor: pointer;

        @media screen and (min-width: 800px) {
            top: 1rem;
            right: 1rem;
        }

        &:hover {
            transform: scale(1.1);
            transition: 0.1s;
        }
    }

    .yes {
        background-color: rgb(235, 109, 95);
        color: black;
    }

    .yes:hover,
    .yes:focus {
        background-color: rgb(80, 10, 2);
    }

    .no {
        background-color: rgb(112, 195, 140);

        &:hover,
        &:focus {
            background-color: rgb(20, 186, 76);
        }
    }

    .btn-wrapper {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;

        button {
            padding: 0.7rem 1rem;
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 700px) {
    .content-modale {
        width: 95%;
        margin: 0;
        margin-right: 0rem;
        padding: 2rem 0.5rem 0.5rem 0.5rem;

        h1 {
            line-height: 1.2;
            margin-top: 1rem;
        }

        div {
            display: flex;
            align-items: center;
            flex-direction: column
        }

        .close-btn {
            position: absolute;
            top: 0;
            right: 0;
            padding: 0.2rem;
        }
    }

    .modale-delete-user {
        .btn-wrapper {
            display: flex;
            gap: 1rem;
            max-width: 100%;
            flex-direction: column;
            align-items: center
        }
    }
}
</style>
