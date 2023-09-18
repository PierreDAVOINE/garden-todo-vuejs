import { defineStore } from 'pinia';
import { IUserData } from '../@types/user';
import { axiosInstance } from '../utils/axios';

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
        city: '',
        email: '',
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
        city: '',
        email: '',
      };
    },
    setUserData(data: IUserData) {
      this.userData = data;
    },
    setIsLogged(value: boolean) {
      this.isLogged = value;
    },
    async getUserDataFromApi(userId: number) {
      console.log('récupération du user. Son id est : ', userId);
      const response = await axiosInstance.get(`/users/${userId}`);
      this.setUserData({
        id: response.data[0].id,
        name: response.data[0].user_name,
        city: response.data[0].city || '',
        email: response.data[0].email,
      });
    },
  },
});
