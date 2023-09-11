<script setup lang="ts">
import { useInterfaceStore } from '../stores/interface';

const interfaceState = useInterfaceStore();

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
            <!-- <div v-if="errorMessage" className="errorMessage">{{errorMessage}}</div> -->

            <!-- ==== Formulaire ==== -->
            <form>
                <!-- Si isSignup est false on affiche pas l'input name, city et passwordConfirm -->
                <label htmlFor="name">Nom :</label>
                <input type="text" name="name" id="name" placeholder="Ex : Dupont" required />
                <label htmlFor="city">Ville (optionnel) :</label>
                <input type="text" name="city" id="city" placeholder="Ex : Quimper" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Ex : dupont@dupond.fr" required />
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" name="password" id="password" required />

                <!-- Sinon :  -->
                <label htmlFor="confirmPassword">
                    Confirmer votre mot de passe :
                </label>

                <!-- Si isSamePassword est false ET que l'input de confirmation n'est pas vide alors on met du rouge
                    Sinon si isSamePassword est true ET que l'input de confirmation n'est pas vide alors on met du vert
                    Sinon on n'applique pas de couleur particulière, on attend que l'utilisateur commence a saisir
                    quelque chose. -->

                <input type="password" name="passwordConfirm" id="passwordConfirm" />
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
