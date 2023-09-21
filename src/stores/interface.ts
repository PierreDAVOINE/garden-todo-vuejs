import { defineStore } from 'pinia';
import { PlantAllProps } from '../@types/plants';

export const useInterfaceStore = defineStore('interface', {
  state: () => {
    return {
      menuIsOpen: false,
      modalIsOpen: false,
      isSignUp: false,
      isDeleteModalOpen: false,
      isEditFormAccount: {
        name: false,
        city: false,
        email: false,
        password: false,
      },
      plantPage: <PlantAllProps>{},
    };
  },
  actions: {
    switchMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    setMenu(value: boolean) {
      this.menuIsOpen = value;
    },
    switchModal() {
      this.modalIsOpen = !this.modalIsOpen;
    },
    setIsSignUp(value: boolean) {
      this.isSignUp = value;
    },
    switchIsSignUp() {
      this.isSignUp = !this.isSignUp;
    },
    switchIsEditFormAccount(field: keyof typeof this.isEditFormAccount) {
      this.isEditFormAccount[field] = !this.isEditFormAccount[field];
    },
    resetEditFormAccount() {
      this.isEditFormAccount = {
        name: false,
        city: false,
        email: false,
        password: false,
      };
    },
    setIsDeleteModalOpen(value: boolean) {
      this.isDeleteModalOpen = value;
    },
    setPlantPage(plant: PlantAllProps) {
      this.plantPage = plant;
    },
  },
});
