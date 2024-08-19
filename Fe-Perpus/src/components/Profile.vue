<template>
    <div class="flex flex-col items-center mt-10">
        <div class="w-3/4 shadow-xl p-5 rounded-xl border">
            <div class="flex justify-between">
                <p class="uppercase font-bold">Data Diri Anda</p>
                <div class="flex gap-2">
                    <RouterLink :to="{ name: 'updateUser' }">
                        <div class="flex border py-2 px-4 rounded-full gap-3 fill-gray-500 cursor-pointer">
                            <p class="font-semibold text-gray-500 hover:font-bold">Edit Nama</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                class="w-4 current-fill hover:w-5">
                                <path
                                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                            </svg>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'updateProfile' }">
                        <div class="flex border py-2 px-4 rounded-full gap-3 fill-gray-500 cursor-pointer">
                            <p class="font-semibold text-gray-500 hover:font-bold">Edit Profile</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                class="w-4 current-fill hover:w-5">
                                <path
                                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                            </svg>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="mt-5">
                <div v-if="profile.profile" class="px-7">
                    <div class="flex justify-between">
                        <div class="flex flex-col items-start w-60">
                            <label class="font-bold text-gray-400">Nama</label>
                            <p class="font-bold text-lg">{{ profile.name }}</p>
                        </div>
                        <div class="flex flex-col items-start w-60">
                            <label class="font-bold text-gray-400">Umur</label>
                            <p class="font-bold text-lg">{{ profile.profile[0].age }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-start w-60 mt-5">
                        <label class="font-bold text-gray-400">Email</label>
                        <p class="font-bold text-lg">{{ profile.email }}</p>
                    </div>
                    <div class="flex flex-col items-start w-full mt-5">
                        <label class="font-bold text-gray-400">Bio</label>
                        <p class="font-bold text-lg">{{ profile.profile[0].bio }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>Data profile tidak ada</p>
                </div>
            </div>
        </div>
        <div class="w-3/4 shadow-xl p-5 rounded-xl border mt-10">
            <p class="uppercase font-bold flex justify-start">Buku yang Dipinjam</p>
            <div v-if="profile.book && profile.book.length > 0" class="mt-3">
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
