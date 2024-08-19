<template>
    <div class="flex flex-col items-center mt-10">
        <div class="w-3/4 shadow-xl p-5 rounded-xl border mt-10">
            <p class="uppercase font-bold flex justify-start">Buku yang Dipinjam</p>
            <span v-if="loading" class="loading loading-dots loading-lg"></span>
            <div v-if="profile.book && profile.book.length > 0 && !loading" class="mt-3">
                <div v-for="book in profile.book" :key="book.id" class="flex items-center border-b py-2">
                    <img :src="book.image" alt="Book Image" class="w-20 h-30 object-cover mr-4">
                    <div class="flex flex-col">
                        <p class="font-bold">{{ book.title }}</p>
                        <p class="text-gray-600">{{ book.summary }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Tidak ada buku yang dipinjam.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customApi } from '@/api';
import { useAuthStore } from '@/stores/AuthStore';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const profile = ref({});
const loading = ref(true);

const fetchProfile = async () => {
    try {
        const { data } = await customApi.get('auth/me', {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`
            }
        });
        profile.value = data.data;
        console.log(data.data);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchProfile();
});
</script>