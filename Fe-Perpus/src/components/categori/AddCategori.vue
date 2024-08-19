<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <p class="text-center font-bold text-2xl">Tambah Categori</p>
                <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                    <input type="text" placeholder="Masukkan Nama" class="input input-bordered w-full mb-3" v-model="userInput.name" />
                    <div class="flex justify-end items-center px-1">
                        <button type="submit" class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            Tambah Categori
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customApi } from '@/api';
import { useAuthStore } from '@/stores/AuthStore';
import { reactive} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore();

const userInput = reactive({
    name: '',
});

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('name', userInput.name);

        await customApi.post('categori', formData, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`,
            },
        });

        router.push({name: 'allCategori'});
    } catch (error) {
        console.log(error);
    }
};
</script>
