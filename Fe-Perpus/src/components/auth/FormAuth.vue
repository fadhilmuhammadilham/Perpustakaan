<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col  gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <div v-if="authstore.isError" role="alert" class="alert bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ authstore.errorMessage }}</span>
                </div>
                <p class="text-center font-bold text-2xl"> {{ props.title }} </p>
                <form @submit.prevent="handelAuth()" action="">
                    <div v-if="isRegister">
                        <label class="input input-bordered flex flex-wrap items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" class="grow" placeholder="Masukan username" v-model="userInput.name" />
                        </label>
                    </div>
                    <label class="input input-bordered flex flex-wrap items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" class="grow" placeholder="Masukan Email" v-model="userInput.email" />
                    </label>
                    <label class="input input-bordered flex flex-wrap items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="h-4 w-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="password" class="grow" placeholder="Masukan Password"
                            v-model="userInput.password" />
                    </label>
                    <label v-if="isRegister" class="input input-bordered flex flex-wrap items-center gap-1 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="h-4 w-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="password" class="grow" placeholder="Masukan Ulang Password"
                            v-model="userInput.password_confirmation" />
                    </label>
                    <div class="flex justify-between items-center px-1">
                        <div v-if="isRegister">
                            <RouterLink to="/login">
                                <p class="flex items-center font-medium hover:font-bold hover:text-teal-700">
                                    Login
                                </p>
                            </RouterLink>
                        </div>
                        <div v-else>
                            <RouterLink to="/register">
                                <p class="flex items-center font-medium hover:font-bold hover:text-teal-700">
                                    Blm Memiliki akun?
                                </p>
                            </RouterLink>
                        </div>
                        <div class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            <input type="submit" :value="props.title">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { reactive } from 'vue';

const authstore = useAuthStore();

const { loginUser } = authstore;

const userInput = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const handelAuth = () => {
    if (props.isRegister) {
        authstore.registerUser(userInput)
    } else {
        authstore.loginUser(userInput)
    }
}

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isRegister: {
        type: Boolean,
        default: false
    }
});
</script>
