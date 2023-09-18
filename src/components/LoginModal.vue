<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useInterfaceStore } from '../stores/interface';
import { dataUserValidation, dataUserValidationLogin } from '../utils/validate';
import { computed, ref, watch } from 'vue';
import { axiosInstance } from '../utils/axios';
import jwtDecode from 'jwt-decode';
import { getUserDataFromApi } from '../utils/user';

const userState = useUserStore();
const interfaceState = useInterfaceStore();

const errorMessage = ref('')
const isSamePassword = ref(false);

// Gestion du formulaire
const handleSubmit = (e: Event) => {
    e.preventDefault();

    const errors = interfaceState.isSignUp ? dataUserValidationLogin(userState.userFormData) : dataUserValidation(userState.userFormData);
    if (errors.length > 0) {
        errorMessage.value = errors[0];
    } else {
        if (interfaceState.isSignUp) {
            // Gestion de la connexion
            loginUser();
        } else {
            // Gestion de l'inscription
            signUpUser();
        }
    }
}

// Gestion de l'inscription
const signUpUser = async () => {
    try {
        const response = await axiosInstance.post('/users/signup', {
            user_name: userState.userFormData.name,
            city: userState.userFormData.city,
            email: userState.userFormData.email,
            user_password: userState.userFormData.password,
        });
        //Si la réponse de l'API est différente de 200, alors il y a eu une erreur lors de la création de compte
        if (response.status !== 200) {
            response.data.message
                ? errorMessage.value = response.data.message
                : errorMessage.value = 'Notre serveur à "planté" ! Essayez à nouveau dans quelques instant.';
        } else {
            // Si tout est ok, on reset le formulaire d'inscription et on passe la modale en mode connexion
            userState.resetUserFormData();
            interfaceState.switchIsSignUp();
        }
    } catch (error) {
        console.error(error)
        errorMessage.value = "Une erreur s'est produite, veuillez réessayer dans quelques instants.";
    }
};

// Gestion de la connexion
const loginUser = async () => {
    try {
        const response = await axiosInstance.post('/users/login', {
            email: userState.userFormData.email,
            user_password: userState.userFormData.password,
        });
        if (response.status !== 200) {
            response.data.message
                ? errorMessage.value = response.data.message
                : errorMessage.value = 'Notre serveur à "planté" ! Essayez à nouveau dans quelques instant.';
        } else if (response.data.logged) {
            // Si tout est ok, on reset le formulaire de connexion, on ferme la modale, on récupére les infos du token et on les stocke dans le store
            userState.resetUserFormData();
            interfaceState.switchModal();

            const { id } = jwtDecode(response.data.token) as { id: number };

            userState.setIsLogged(true);
            userState.getUserDataFromApi(id);

            // Pour sauvegarde les informations, on transforme l'objet en JSON string
            // On stock le tout dans le localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    } catch (error) {
        console.error(error)
        errorMessage.value = "Une erreur s'est produite, veuillez réessayer dans quelques instants.";
    }
};

// Vérification de la confirmation du mot de passe
watch(userState.userFormData, (newFormData) => {
    if (newFormData.password === newFormData.passwordConfirm) {
        isSamePassword.value = true;
    } else {
        isSamePassword.value = false;
    }
});

// Gestion du style
const handleErrorStyle = computed(() => ({
    // Si isSamePassword est false ET que l'input de confirmation n'est pas vide alors on met du rouge
    inputError: !isSamePassword.value && userState.userFormData.passwordConfirm !== '',
    // Sinon si isSamePassword est true ET que l'input de confirmation n'est pas vide alors on met du vert
    inputGood: isSamePassword.value && userState.userFormData.passwordConfirm !== '',
}));

</script>

<template>
    <!-- Fond gris -->
    <div class="login-modal">
        <!-- Fenêtre fond blanc -->
        <div class="login-modal__window">
            <!-- Bouton de femeture de la modale -->
            <button class="login-modal__close" @click="interfaceState.switchModal">
                <v-icon name="io-close" />
            </button>

            <img src="/src/assets/gardentodo-logo1.png" alt="Gardern to do logo" />
            <h2>{{ interfaceState.isSignUp ? 'Connexion' : 'Inscription' }}</h2>
            <p>
                Connectez-vous afin d'accéder à votre jardin
            </p>

            <!-- Switch pour passer de la modale "inscription" à la modale "connexion" et inversement -->
            <p>
                {{ interfaceState.isSignUp ? 'Pas encore inscrit ?' : 'Déjà inscrit ?' }}
                <button class="login-modal__link" @click="interfaceState.switchIsSignUp">
                    {{ interfaceState.isSignUp ? "S'inscrire" : 'Se connecter' }}
                </button>
            </p>

            <!-- ==== Notification d'erreur ==== -->
            <div v-if="errorMessage" className="errorMessage">{{ errorMessage }}</div>

            <!-- ==== Formulaire ==== -->
            <form @submit="(e) => handleSubmit(e)">
                <!-- Si isSignup est false on affiche pas l'input name, city et passwordConfirm -->
                <label v-if="!interfaceState.isSignUp" htmlFor="name">Nom :</label>
                <input v-if="!interfaceState.isSignUp" v-model="userState.userFormData.name" type="text" name="name"
                    id="name" placeholder="Ex : Dupont" required />
                <label v-if="!interfaceState.isSignUp" htmlFor="city">Ville (optionnel) :</label>
                <input v-if="!interfaceState.isSignUp" v-model="userState.userFormData.city" type="text" name="city"
                    id="city" placeholder="Ex : Quimper" />
                <label htmlFor="email">Email</label>
                <input v-model="userState.userFormData.email" type="email" name="email" id="email"
                    placeholder="Ex : dupont@dupond.fr" required />
                <label htmlFor="password">Mot de passe :</label>
                <input v-model="userState.userFormData.password" type="password" name="password" id="password" required />
                <!-- Sinon :  -->
                <!-- Si isSamePassword est false ET que l'input de confirmation n'est pas vide alors on met du rouge
                    Sinon si isSamePassword est true ET que l'input de confirmation n'est pas vide alors on met du vert
                    Sinon on n'applique pas de couleur particulière, on attend que l'utilisateur commence a saisir
                    quelque chose. -->
                <label v-if="!interfaceState.isSignUp" htmlFor="confirmPassword">
                    Confirmer votre mot de passe :
                </label>
                <input v-if="!interfaceState.isSignUp" v-model="userState.userFormData.passwordConfirm" type="password"
                    name="passwordConfirm" id="passwordConfirm" :class="handleErrorStyle" />
                <button type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
$screenSizeModal: 800px;

// Le fond
.login-modal {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(128, 128, 128, 0.671);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;

    // La fenêtre fond blanc
    &__window {
        position: absolute;
        width: 85%;
        max-height: 90%;
        margin-right: 1rem;
        padding: 1.5rem;
        background: white;
        border-radius: 10px;
        text-align: center;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        @media screen and (min-width: $screenSizeModal) {
            width: 700px;
        }

        img {
            width: 9rem;
        }

        h2 {
            font-weight: 700;
            font-size: 2rem;
        }

        p {
            font-size: 1.3;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        form {
            display: flex;
            flex-direction: column;
            width: 80%;
            margin: 0 auto;
            line-height: 1.2;

            label {
                text-align: left;
                margin-bottom: 0.1rem;
            }

            input {
                margin-bottom: 0.8rem;
                padding: 0.5rem 1rem;
                font-size: 1.3rem;
                border-radius: 5px;

                &.inputError {
                    outline: 3px solid red;
                }

                &.inputGood {
                    outline: 3px solid green;
                }
            }

            button {
                margin: 1rem auto;
                padding: 0.5rem 1rem;
                border: none;
                background: #6558f5;
                color: white;
                font-size: 1.5rem;
                border-radius: 10px;
                cursor: pointer;

                &:hover {
                    transition: 0.2s;
                    background: #9990ff;
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                }
            }
        }
    }

    // Les boutons/liens pour switcher entre login / sign-in
    &__link {
        background-color: transparent;
        border: none;
        color: rgb(0, 98, 255);
        text-decoration: underline;
        cursor: pointer;
        font-size: 1.5rem;
    }

    // Le bouton de fermeture
    &__close {
        background: none;
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: 50%;
        border: 2px solid black;
        padding: 0.2rem 0rem 0rem 0rem;
        cursor: pointer;

        @media screen and (min-width: $screenSizeModal) {
            top: 1rem;
            right: 1rem;
        }

        &:hover {
            transform: scale(1.1);
            transition: 0.1s;
        }
    }
}

// Message d'erreur dans la modale
.errorMessage {
    margin: 0 auto 0.8rem auto;
    padding: 0.5rem 0.2rem;
    width: 80%;
    background-color: rgba(228, 56, 56, 0.553);
    color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 1.2;
}
</style>
