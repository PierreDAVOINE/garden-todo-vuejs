import { defineStore } from 'pinia';
import { IUserData } from '../@types/user';
import { axiosInstance } from '../utils/axios';
import { PlantAllProps } from '../@types/plants';

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
      userFormDataAccount: {
        id: 0,
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
      hasPlant: [] as PlantAllProps[],
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
    resetUserFormDataAccount() {
      this.userFormDataAccount = {
        id: 0,
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
      this.setUserDataAccount(data);
    },
    setIsLogged(value: boolean) {
      this.isLogged = value;
    },
    async getUserDataFromApi(userId: number) {
      const response = await axiosInstance.get(`/users/${userId}`);
      this.setUserData({
        id: response.data[0].id,
        name: response.data[0].user_name,
        city: response.data[0].city || '',
        email: response.data[0].email,
      });
      const userPlants = await axiosInstance.get(`/garden/${userId}`);
      if (userPlants.status !== 200) {
        console.error('Une erreur est survenue : ', userPlants.data.message);
        // userPlants.data.message
        //   ? addNewNotification(response.data.message, true)
        //   : addNewNotification('Une erreur est survenue', true);
      } else {
        this.hasPlant = userPlants.data;
      }
    },
    setUserDataAccount(data: IUserData) {
      this.userFormDataAccount = {
        id: data.id,
        name: data.name,
        city: data.city,
        email: data.email,
        password: '',
        passwordConfirm: '',
      };
    },
    updateUserData() {
      this.userData = {
        id: this.userFormDataAccount.id,
        name: this.userFormDataAccount.name,
        city: this.userFormDataAccount.city,
        email: this.userFormDataAccount.email,
      };
    },
  },
});
