import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', {
  state: () => {
    return { menuIsOpen: false };
  },
  actions: {
    switch() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
});
