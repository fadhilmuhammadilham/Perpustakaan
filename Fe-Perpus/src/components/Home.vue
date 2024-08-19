<template>
    <div class="flex justify-center items-center min-h-screen" v-if="loading">
        <span class="loading loading-dots loading-lg"></span>
    </div>

    <div v-if="!loading" class="flex flex-col items-center mt-5">
        <div class="w-5/6 mt-10">
            <p class="uppercase font-bold flex justify-center text-3xl">Buku</p>
            <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="book in books.slice(0, 4)" :key="book.id" class="card shadow-xl">
                    <figure class="px-10 pt-10">
                        <img :src="book.image" alt="Book Image" class="rounded-xl w-full h-48 object-cover" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ book.title }}</h2>
                        <p>{{ panjangSummary(book.summary) }}</p>
                        <div class="card-actions">
                            <RouterLink :to="{ name: 'detailBook', params: { id: book.id } }"
                                class="bg-teal-500 py-2 px-4 rounded-full text-white font-semibold hover:bg-teal-400 hover:font-bold">
                                Detail
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center items-center mt-10">
                <p class="text-xl text-gray-500">Tidak ada buku yang tersedia.</p>
            </div>
        </div>

        <p class="uppercase font-bold flex justify-center text-3xl mt-10">Kategori</p>
        <div v-if="categoris.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10">
            <div v-for="categori in categoris" :key="categori.id" class="card w-96 shadow-xl">
                <div class="card-body">
                    <div class="flex justify-between">
                        <h2 class="card-title text-2xl">{{ categori.name }}</h2>
                        <div class="card-actions justify-end">
                        </div>
                    </div>
                    <div class="flex justify-end gap-1 mt-5 font">
                        <div class="card-actions justify-center">
                            <RouterLink :to="{ name: 'detailCategori', params: { id: categori.id } }"
                                class="btn bg-teal-500 hover:bg-teal-400 hover:font-bold text-white">Detail
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center mt-10 mb-10">
            <p class="text-xl text-gray-500">Tidak ada kategori yang tersedia.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { customApi } from '@/api';
import { RouterLink } from 'vue-router';

const books = ref([]);
const categoris = ref([]);
const loading = ref(true);

const fetchBooks = async () => {
    try {
        const response = await customApi.get('/book');
        books.value = response.data.body;
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loading.value = false;
    }
};

const fetchCategori = async () => {
    try {
        const response = await customApi.get('/categori');
        categoris.value = response.data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchBooks();
    fetchCategori();
});

const panjangSummary = (summary, maxLength = 100) => {
    if (summary.length > maxLength) {
        return summary.substring(0, maxLength) + '...';
    }
    return summary;
};
</script>
