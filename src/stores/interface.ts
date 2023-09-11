import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', {
  state: () => {
    return { menuIsOpen: false, modalIsOpen: false, isSignUp: false };
  },
  actions: {
    switchMenu() {
      this.menuIsOpen = !this.menuIsOpen;
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
  },
});
