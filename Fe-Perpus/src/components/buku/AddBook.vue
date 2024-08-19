<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <p class="text-center font-bold text-2xl">Tambah Buku</p>
                <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                    <input type="text" placeholder="Masukkan Nama" class="input input-bordered w-full mb-3" v-model="userInput.title" />
                    <input type="text" placeholder="Masukkan Summary" class="input input-bordered w-full mb-3" v-model="userInput.summary" />
                    <input type="number" placeholder="Masukkan Stok" class="input input-bordered w-full mb-3" v-model="userInput.stok" />
                    <select v-model="userInput.category_id" class="select select-bordered w-full mb-3">
                        <option disabled value="">Pilih Kategori</option>
                        <option v-for="categori in categories" :value="categori.id" :key="categori.id">{{ categori.name }}</option>
                    </select>
                    <input type="file" @change="handleFileUpload" class="file-input file-input-bordered w-full mb-3" />
                    <div class="flex justify-end items-center px-1">
                        <button type="submit" class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            Tambah Buku
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
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore();
const categories = ref([]);

const userInput = reactive({
    title: '',
    summary: '',
    image: null,
    stok: '',
    category_id: '',
});

const handleFileUpload = (event) => {
    userInput.image = event.target.files[0];
};

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('title', userInput.title);
        formData.append('summary', userInput.summary);
        formData.append('image', userInput.image);
        formData.append('stok', userInput.stok);
        formData.append('category_id', userInput.category_id);

        await customApi.post('book', formData, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        router.push({name: 'allBook'});
    } catch (error) {
        console.log(error);
    }
};

const fetchCategories = async () => {
    try {
        const {data} = await customApi.get('/categori');
        categories.value = data.data;
        console.log(data.data);
        
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchCategories();
});
</script>
