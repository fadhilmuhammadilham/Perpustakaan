<template>
    <div class="flex flex-col items-center mt-10">
      <span v-if="loading" class="loading loading-dots loading-lg mt-40"></span>
      <div v-if="!loading" class="card w-3/4 lg:card-side  shadow-xl">
        <figure>
          <img :src="buku.image" alt="Book Image" class="object-cover h-64 w-60" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ buku.title }}</h2>
          <p class="text-gray-700">{{ buku.summary }}</p>
          <div class="mt-2">
            <span class="font-bold">Stok:</span> {{ buku.stok }}
          </div>
          <div class="mt-2">
            <span class="font-bold">Kategori:</span> {{ buku.categori?.name || 'Tidak ada kategori' }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { customApi } from '@/api';
  
  const route = useRoute();
  const buku = ref({});
  const loading = ref(true);
  
  const fetchBooksById = async () => {
    try {
      const { data } = await customApi.get(`book/${route.params.id}`);
      buku.value = data.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchBooksById();
  });
  </script>
  