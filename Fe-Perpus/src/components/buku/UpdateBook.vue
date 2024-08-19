<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <p class="text-center font-bold text-2xl">Update Buku</p>
                <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                    <input 
                        v-model="userInput.title" 
                        type="text" 
                        placeholder="Masukkan Nama" 
                        class="input input-bordered w-full mb-3" 
                    />
                    <input 
                        v-model="userInput.summary" 
                        type="text" 
                        placeholder="Masukkan Summary" 
                        class="input input-bordered w-full mb-3"
                    />
                    <input 
                        v-model="userInput.stok" 
                        type="number" 
                        placeholder="Masukkan Stok" 
                        class="input input-bordered w-full mb-3"
                    />
                    <select v-model="userInput.category_id" class="select select-bordered w-full mb-3">
                        <option disabled value="">Pilih Kategori</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <input 
                        @change="handleFileChange" 
                        type="file" 
                        class="file-input file-input-bordered w-full mb-3" 
                    />
                    <p v-if="userInput.imageUrl" class="text-sm text-gray-500">Gambar Asli: {{ userInput.imageUrl }}</p>
                    <div class="flex justify-end items-center px-1">
                        <button type="submit" class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            Update Buku
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
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const userInput = reactive({
    title: '',
    summary: '',
    stok: '',
    category_id: '',
    image: null,
    imageUrl: '',
}); 

const categories = ref([]);

const fetchCategories = async () => {
    try {
        const { data } = await customApi.get('/categori');
        categories.value = data.data;
    } catch (error) {
        console.log(error);
    }
};

const fetchBook = async () => {
    try {
        const { data } = await customApi.get(`/book/${route.params.id}`);
        userInput.title = data.title;
        userInput.summary = data.summary;
        userInput.stok = data.stok;
        userInput.category_id = data.category_id;
        userInput.imageUrl = data.image;
        userInput.image = null;
    } catch (error) {
        console.log(error);
    }
};

const handleFileChange = (event) => {
    userInput.image = event.target.files[0];
};

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('title', userInput.title);
        formData.append('summary', userInput.summary);
        formData.append('stok', userInput.stok);
        formData.append('category_id', userInput.category_id);
        if (userInput.image) {
            formData.append('image', userInput.image);
        }

        await customApi.post(`/book/${route.params.id}?_method=PUT`, formData, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`,
            }
        });

        router.push('/all-book');

    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchCategories();
    fetchBook();
});
</script>
