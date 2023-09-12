import { defineStore } from 'pinia';
import { IUserData } from '../@types/user';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogged: false,
      userFormData: {
        name: '',
        city: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      userData: {
        id: 0,
        name: '',
      },
    };
  },
  actions: {
    resetUserFormData() {
      this.userFormData = {
        name: '',
        city: '',
        email: '',
        password: '',
        passwordConfirm: '',
      };
    },
    resetUserData() {
      this.userData = {
        id: 0,
        name: '',
      };
    },
    setUserData(data: IUserData) {
      this.userData = data;
    },
    setIsLogged(value: boolean) {
      this.isLogged = value;
    },
  },
});
