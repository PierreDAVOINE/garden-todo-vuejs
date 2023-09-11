import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return { isLogged: false };
  },
  //   actions: {
  //     increment() {
  //       this.count++;
  //     },
  //   },
});
