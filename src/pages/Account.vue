<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';
import DeleteUserModal from '../components/DeleteUserModal.vue';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

// Gestion du submit du formulaire
const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("submit!");

};

</script>

<template>
    <div className="account">
        <div v-if="!userState.isLogged">
            <h2>
                Oups tu as du te planter !
            </h2>
            <h3>Tu dois d'abord te connecter pour accéder à ton compte !</h3>
        </div>

        <div v-else>

            <DeleteUserModal v-if="interfaceState.isDeleteModalOpen" />

            <h2>
                <Sun class="rotate" /> Bienvenue
                <span class="name">{{ userState.userData.name }}</span>
            </h2>
            <h3>Vos informations :</h3>
            <div class="account__container">
                <form @submit="(e) => handleSubmit(e)">
                    <!-- Edit name -->
                    <div class="content__container">
                        <span class="label-item">
                            <v-icon name="co-user" /> Prénom :
                        </span>

                        <input v-if="interfaceState.isEditFormAccount.name" type="text"
                            v-model="userState.userFormDataAccount.name" />

                        <span v-else>{{ userState.userData.name }}</span>

                        <div class="wrapper-btn">
                            <button @click="interfaceState.switchIsEditFormAccount('name')" type="button"
                                title="Éditer mon nom">
                                <v-icon name="la-edit-solid" /> Éditer
                            </button>

                            <button v-if="interfaceState.isEditFormAccount.name" type="submit"
                                title="Valider les modifications">
                                <v-icon name="la-check-circle" />Valider
                            </button>

                        </div>
                    </div>

                    <!-- Edit city -->
                    <div class="content__container">
                        <span class="label-item">
                            <v-icon name="la-map-marked-alt-solid" /> Ville :
                        </span>

                        <input v-if="interfaceState.isEditFormAccount.city" type="text"
                            v-model="userState.userFormDataAccount.city" />
                        <span v-else class="user-infos">
                            {{ userState.userData.city }}
                        </span>

                        <div class="wrapper-btn">
                            <button @click="interfaceState.switchIsEditFormAccount('city')" type="button"
                                title="Éditer ma ville">
                                <v-icon name="la-edit-solid" /> Éditer
                            </button>

                            <button v-if="interfaceState.isEditFormAccount.city" type="submit"
                                title="Valider les modifications">
                                <v-icon name="la-check-circle" /> Valider
                            </button>
                        </div>
                    </div>

                    <!-- Edit email -->
                    <div class="content__container">
                        <span class="label-item">
                            <v-icon name="la-envelope-open-text-solid" /> Email :
                        </span>
                        <input v-if="interfaceState.isEditFormAccount.email" type="email"
                            v-model="userState.userFormDataAccount.email" />

                        <span v-else class="user-infos">
                            {{ userState.userData.email }}
                        </span>

                        <div class="wrapper-btn">
                            <button @click="interfaceState.switchIsEditFormAccount('email')" type="button"
                                title="Éditer mon email">
                                <v-icon name="la-edit-solid" /> Éditer
                            </button>

                            <button v-if="interfaceState.isEditFormAccount.email" type="submit"
                                title="Valider les modifications">
                                <v-icon name="la-check-circle" /> Valider
                            </button>

                        </div>
                    </div>

                    <!-- Edit password -->
                    <div class="content__container password-element">
                        <span class="label-item">
                            <v-icon name="la-lock-solid" />
                            Mot de passe :
                        </span>


                        <div v-if="interfaceState.isEditFormAccount.password" class="password-check__container">
                            <div>
                                <label>Nouveau mot de passe :</label>
                                <input type="password" placeholder="Nouveau mot de passe"
                                    v-model="userState.userFormDataAccount.password" />
                            </div>
                            <div>
                                <label>Confirmation :</label>
                                <input type="password" placeholder="Confirmer le mot de passe"
                                    v-model="userState.userFormDataAccount.passwordConfirm" />
                            </div>
                        </div>

                        <span v-else class="user-infos">********</span>

                        <div class="wrapper-btn">
                            <button @click="interfaceState.switchIsEditFormAccount('password')" type="button"
                                title="Éditer mon mot de passe">
                                <v-icon name="la-edit-solid" /> Éditer
                            </button>

                            <button v-if="interfaceState.isEditFormAccount.password" type="submit"
                                title="Valider les modifications">
                                <v-icon name="la-check-circle" /> Valider
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
// ======== ================== ============ //
// ============== ** Account ** =========== //
// ======== ================== ============ //

.account {
    width: 90%;
    min-height: 810px;
    margin: 0 auto;
    padding: 3rem;
    color: white;
    text-align: left;
    border-radius: 8px;
    background: url('https://res.cloudinary.com/dtzbumqvq/image/upload/c_scale,w_1200/v1683099279/pexels-alena-yanovich-11425770_ed5aus.jpg') no-repeat;
    background-color: #799f7a;
    background-position: right 0px bottom 0px;
    background-size: contain;

    h2 {
        font-weight: 700;
        font-size: 2rem;
        margin: 1rem 0 1.5rem 0;
    }

    .rotate {
        animation: rotation 5s infinite linear;
        color: #ffc348;
    }

    h3 {
        border-bottom: 1px solid #fff;
        width: fit-content;
    }

    input {
        padding: 0.8rem;
        margin: 1rem 0;
        border-radius: 8px;
        outline: none;
        border: none;
        font-size: 1.2rem;
    }

    input:focus {
        outline: none;
        box-shadow: 2px 2px 15px 5px #304b40;
    }

    .name {
        color: #d9ffee;
        text-shadow: 1px 1px 3px #295129;
    }

    .user-infos {
        font-family: 'Playfair Display', 'Roboto', serif;
        font-weight: 400;
    }

    .input-validated {
        border: 4px solid #9fffd4;
    }

    .label-item {
        font-weight: 700;
        color: #1a322e;
    }

    .content__container {
        display: flex;
        align-items: center;
        gap: 0 1rem;
    }

    .wrapper-btn {
        display: flex;
        width: fit-content;
    }

    button {
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

    button:hover {
        fill: #6aca9f;
        color: #6aca9f;
        background-color: #1b3b2c;
    }

    button svg {
        transform: scale(1.1);
    }

    button:disabled {
        background-color: dimgrey;
        color: rgb(255, 255, 255);
        cursor: not-allowed;
    }

    .yes:hover,
    .yes:focus {
        background-color: rgb(80, 10, 2);
        color: rgb(255, 220, 220);
    }

    .error-msg {
        background-color: rgb(255 159 149);
        color: #272b29;
        padding: 0.6rem;
        border-radius: 8px;
        font-size: 0.8em;
    }

    .password-check__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 1rem;
    }

    .password-check__container label {
        margin-right: 0.8rem;
    }

    .password-element {
        gap: 0.5rem;
        align-content: flex-start;
        align-items: flex-start;
    }

    @media screen and (min-width: 900px) {
        width: 80%;
    }
}

@media screen and (max-width: 2570px) {
    .account {
        .password-check__container {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
        }

        .password-element {
            flex-direction: column;
        }
    }
}

@media screen and (max-width: 1345px) {
    .account {
        background-image: none;
    }
}

@media screen and (max-width: 800px) {
    .account {
        button {
            margin-left: 0;
        }

        .password-check__container {
            justify-content: flex-start;
        }

        .content__container {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }

        .wrapper-btn {
            display: flex;
            width: fit-content;
            flex-direction: column;
        }
    }
}

.hide {
    display: none;
}

.error {
    border: 4px solid rgb(174, 48, 48);
}

.good {
    border: 4px solid rgb(76, 146, 79);
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>
