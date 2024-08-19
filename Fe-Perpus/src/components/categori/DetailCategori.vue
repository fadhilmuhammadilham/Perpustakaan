<template>
    <div class="flex flex-col items-center mt-5">
        <span v-if="loading" class="loading loading-dots loading-lg mt-40"></span>
        <div v-if="!loading" class="w-5/6 mt-10 shadow-xl pt-5 pb-10 px-7 rounded-lg">
            <p class="font-bold text-3xl uppercase ">{{ categori.name }}</p>
            <div v-if="categori" class="mt-5">
                <p class="font-semibold text-lg">List Buku :</p>
                <div class="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <div v-for="book in categori.book" :key="book.id" class="shadow-lg p-5 rounded-lg">
                        <div class="flex gap-5">
                            <img :src="book.image" alt="bookImg" class="w-32 h-36 object-cover rounded-lg">
                            <div class="flex flex-col gap-2">
                                <p class="font-semibold text-2xl">{{ book.title }}</p>
                                <p class="font-semibold">Stok: {{ book.stok }}</p>
                            </div>
                        </div>
                        <p class="font-semibold mt-3">
                            {{ book.summary.length > 100 ? book.summary.substring(0, 100) + '...' : book.summary }}
                        </p>
                        <button class="mt-3 bg-teal-500 py-2 px-4 font-semibold text-white rounded-lg hover:bg-teal-400 hover:font-bold">
                            Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customApi } from '@/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const categori = ref({});
const route = useRoute();
const loading = ref(true);

const fetchCategorie = async () => {
    try {
        const { data } = await customApi.get(`/categori/${route.params.id}`);
        categori.value = data.data;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchCategorie();
})
</script>
