<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col  gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <p class="text-center font-bold text-2xl"> Edit Profile Anda </p>
                <form @submit.prevent="handleUpdate()" action="" >
                    <input type="text" placeholder="Masukan Age" class="input input-bordered w-full mb-3" v-model="userInput.age"/>
                    <input type="text" placeholder="Masukan Bio" class="input input-bordered w-full mb-3" v-model="userInput.bio"/>
                    <div class="flex justify-end items-center px-1">
                        <div class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            <input type="submit">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customApi } from '@/api';
import { useAuthStore } from '@/stores/AuthStore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore();

const userInput = reactive({
    age: '',
    bio: '',
}); 

const handleUpdate = async () => {
    try {
        const formData = new FormData();
        formData.append('age', userInput.age);
        formData.append('bio', userInput.bio);

        await customApi.post('/profile', formData, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`,
            }
        })
        router.push({name: 'profile'})
    } catch (error) {
        console.log(error);
        
    }
}
</script>