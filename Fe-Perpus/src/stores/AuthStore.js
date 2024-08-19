import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { customApi } from '@/api'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('counter', () => {

  const router = useRouter();

  const tokenUser = ref(localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null)

  const currentUser = ref(localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null)

  const isError = ref(false)
  const errorMessage = ref('')

  const loginUser = async (inputData) => {
    try {
      isError.value = false
      errorMessage.value = ''

      const { email, password } = inputData

      const { data } = await customApi.post('/auth/login', {
        email: email,
        password: password,
      },)

      const { token, user } = data

      // console.log(token, user);

      //store pinia
      tokenUser.value = token
      currentUser.value = user

      //localstorage
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))

      isError.value = false;
      errorMessage.value = '';

      router.push({ name: 'home' })
    } catch (error) {
      isError.value = true;
      errorMessage.value = error.response.statusText;
    }
  };

  const registerUser = async (inputData) => {
    try {
      isError.value = false
      errorMessage.value = ''

      const { name, email, password, password_confirmation } = inputData

      const { data } = await customApi.post('/auth/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      })

      const { token, user } = data

      tokenUser.value = token
      currentUser.value = user

      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))

      isError.value = false;
      errorMessage.value = '';

      router.push({ name: 'home' })
    } catch (error) {
      isError.value = true;
      errorMessage.value = error.response.statusText;
      console.log(error);
      
    }
  };

  const logoutUser = async () => {
    try {
      const response = await customApi.post('/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`
        }
      });

      tokenUser.value = null;
      currentUser.value = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      router.push({ name: 'home' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (inputData) => {
    try {
      isError.value = false;
      errorMessage.value = '';

      const { name } = inputData;

      const { data } = await customApi.post('/auth/update-user', {
        name: name
      },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`
          }
        });

      // console.log(data);
      router.push({name: 'profile'})
    } catch (error) {
      console.log(error);
    }
  }

  return { loginUser, tokenUser, currentUser, registerUser, logoutUser, updateUser, errorMessage, isError}
})
